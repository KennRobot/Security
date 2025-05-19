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
    const { ROLEID, PROCESSES } = req.data;

    // Validación: verificar que todos los procesos existan
    for (const proc of PROCESSES) {
      const proceso = await processSchema.findOne({ LABELID: proc.PROCESSID });
      if (!proceso) {
        return { error: `Proceso ${proc.PROCESSID} no encontrado` };
      }
    }

    // Solo actualizar el campo PROCESSES
    const updatedDoc = await RolesSchema.findOneAndUpdate(
      { ROLEID },
      { $set: { PROCESSES } }
    );

    if (!updatedDoc) {
      return { success: false, message: 'No se encontró un documento con ese ROLEID.' };
    }

    return { success: true, data: updatedDoc };
  } catch (error) {
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