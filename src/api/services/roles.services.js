 //************* SERVICIO PARA MONGO DB */
const RolesSchema = require('../models/SchemasMongoDB/roles');
const UserSchema = require('../models/SchemasMongoDB/usuarios');
const processSchema = require('../models/SchemasMongoDB/procesos');


//**************  GET ALLL */
async function GetAllRoles(req) {
  try {
    let role = await RolesSchema.find().lean(); 
    return role;
  } catch (error) {
    return error;
  }
}

//************** GET USUARIO */
async function getRoleWithUsers(req) {
    if (!req) throw new Error("Missing roleid");

    const role = await RolesSchema.findOne({ ROLEID: roleid }).lean();
    if (!role) throw new Error("Role not found");

    const users = await UserSchema.find({ ROLEID: roleid }).lean();

    const formattedUsers = users.map(u => ({
        USERID: u.USERID,
        USERNAME: u.USERNAME,
        COMPANYNAME: u.COMPANYNAME,
        DEPARTMENT: u.DEPARTMENT
    }));

    return {
        ...role,
        USERS: formattedUsers
    };
}

async function UpdateRolByRoleID(req) {
  try {
    const { ROLEID, PROCESSES = [], ...rest } = req.data;

    // Buscar el rol actual
    const rol = await RolesSchema.findOne({ ROLEID });
    if (!rol) {
      return { success: false, message: 'No se encontró un documento con ese ROLEID.' };
    }

    // Actualizar campos generales si vienen en la petición
    const camposGenerales = {};
    for (const key in rest) {
      if (rest[key] !== undefined) {
        camposGenerales[key] = rest[key];
      }
    }

    if (Object.keys(camposGenerales).length > 0) {
      await RolesSchema.updateOne({ ROLEID }, { $set: camposGenerales });
    }

    // Clonamos la lista actual de procesos
    const procesosActuales = rol.PROCESSES || [];

    for (const nuevoProceso of PROCESSES) {
      // Validar existencia del proceso
      const procesoValido = await processSchema.findOne({ LABELID: nuevoProceso.PROCESSID });
      if (!procesoValido) {
        return { success: false, message: `Proceso ${nuevoProceso.PROCESSID} no encontrado.` };
      }

      const indexProceso = procesosActuales.findIndex(p => p.PROCESSID === nuevoProceso.PROCESSID);

      if (indexProceso === -1) {
        // Proceso nuevo, agregar completo
        procesosActuales.push(nuevoProceso);
      } else {
        // Proceso existente, actualizar campos básicos
        const procesoExistente = procesosActuales[indexProceso];
        const procesoActualizado = {
          ...procesoExistente,
          ...nuevoProceso
        };

        // Si vienen privilegios en el JSON, actualizar/agregar los correspondientes
        if (Array.isArray(nuevoProceso.PRIVILEGES)) {
          const privilegiosActuales = procesoExistente.PRIVILEGES || [];

          for (const nuevoPrivilegio of nuevoProceso.PRIVILEGES) {
            const indexPrivilegio = privilegiosActuales.findIndex(
              p => p.PRIVILEGEID === nuevoPrivilegio.PRIVILEGEID
            );

            if (indexPrivilegio === -1) {
              privilegiosActuales.push(nuevoPrivilegio);
            } else {
              privilegiosActuales[indexPrivilegio] = {
                ...privilegiosActuales[indexPrivilegio],
                ...nuevoPrivilegio
              };
            }
          }

          procesoActualizado.PRIVILEGES = privilegiosActuales;
        }

        procesosActuales[indexProceso] = procesoActualizado;
      }
    }

    // Guardar los cambios
    const updatedDoc = await RolesSchema.findOneAndUpdate(
      { ROLEID },
      { $set: { PROCESSES: procesosActuales } },
      { new: true }
    );

    return { success: true, data: updatedDoc };
  } catch (error) {
    console.error('Error en UpdateRolByRoleID:', error);
    return { success: false, message: 'Error al actualizar el documento.', error };
  }
}



//Delete Logico de roles 
async function UpdateRoleActivation(req) {
  const { roleid, activated, reguser } = req.data;
  //validaciones
  const result = await RolesSchema.findOneAndUpdate(
    { ROLEID: roleid },
    {
      $set: {
        'DETAIL_ROW.ACTIVED': activated,
        'DETAIL_ROW.DELETED': !activated
      },
      $push: {
        'DETAIL_ROW.DETAIL_ROW_REG': {
          CURRENT: activated,
          REGDATE: new Date(),
          REGTIME: new Date(),
          REGUSER: reguser
        }
      }
    },
    { new: true }
  ).lean();

  if (!result) throw new Error(`Rol ${roleid} no encontrado`);
  return result;               
}

//Delete fisico de roles
async function DeleteRoleById(req) {
  const { roleid } = req.data;
  if (!roleid) {
    throw new Error("Se requiere 'roleid'");
  }
  const result = await RolesSchema.findOneAndDelete({ ROLEID: roleid }).lean();
  if (!result) {
    throw new Error(`Rol con ROLEID=${roleid} no encontrado`);
  }
  return result;
}

module.exports = {
  GetAllRoles,
  getRoleWithUsers,
  UpdateRolByRoleID,
  UpdateRoleActivation,
  DeleteRoleById
};