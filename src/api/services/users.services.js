//************* SERVICIO PARA MONGO DB */
const usersSchema = require('../models/SchemasMongoDB/usuarios');
const rolesSchema = require('../models/SchemasMongoDB/roles');

async function GetAllUsers(req) {
  try {
    let user = await usersSchema.find().lean(); 
    return user;
  } catch (error) {
    return error;
  }
}

// Crear nuevo usuario con validación de roles
async function CreateUser(req) {
  try {
    const data = req.data.user || req.body.user;

    // Validar campos obligatorios
    if (!data.USERID || !data.USERNAME || !data.PASSWORD || !data.EMAIL) {
      return {
        status: 400,
        message: 'Faltan campos obligatorios: USERID, USERNAME, PASSWORD, EMAIL'
      };
    }

    // Verificar si el usuario ya existe
    const existingUser = await usersSchema.findOne({ USERID: data.USERID });
    if (existingUser) {
      return {
        status: 409,
        message: `El usuario con USERID "${data.USERID}" ya existe.`
      };
    }

    // Validar roles si existen
    if (data.ROLES && data.ROLES.length > 0) {
      const roleIds = data.ROLES.map(r => r.ROLEID);
      
      // Buscar todos los roles válidos
      const existingRoles = await rolesSchema.find({ ROLEID: { $in: roleIds } }).lean();
      const existingRoleIds = existingRoles.map(r => r.ROLEID);

      // Verificar si hay alguno inválido
      const invalidRoles = roleIds.filter(r => !existingRoleIds.includes(r));
      if (invalidRoles.length > 0) {
        return {
          status: 400,
          message: `Los siguientes ROLEID no existen en la base de datos: ${invalidRoles.join(', ')}`
        };
      }
    }

    // Crear el nuevo usuario
    const nuevoUsuario = new usersSchema(data);
    await nuevoUsuario.save();

    return {
      status: 201,
      message: 'Usuario creado exitosamente',
      data: nuevoUsuario
    };

  } catch (error) {
    console.error('Error al crear usuario:', error);
    return {
      status: 500,
      message: 'Error interno al crear usuario',
      error: error.message
    };
  }
}
 
async function UpdateUserByUSERID(req) {
  try {
    const { USERID, ROLES } = req.data;

    const usuario = await usersSchema.findOne({ USERID });
    if (!usuario) {
      return { success: false, message: 'No se encontró un usuario con ese USERID.' };
    }

    for (const nuevoRol of ROLES) {
      // Verificar que el rol exista
      const rolValido = await rolesSchema.findOne({ ROLEID: nuevoRol.ROLEID });
      if (!rolValido) {
        return { error: `Rol ${nuevoRol.ROLEID} no encontrado en rolesSchema.` };
      }

      const indexRol = usuario.ROLES.findIndex(r => r.ROLEID === nuevoRol.ROLEID);

      if (indexRol === -1) {
        // Rol no existe, agregar todo el objeto nuevo
        await usersSchema.updateOne(
          { USERID },
          { $push: { ROLES: nuevoRol } }
        );
      } else {
        // Rol existe: actualizar campos básicos
        const existingRol = usuario.ROLES[indexRol];
        const rolUpdate = {
          [`ROLES.${indexRol}.ROLEIDSAP`]: nuevoRol.ROLEIDSAP,
          [`ROLES.${indexRol}.ROLENAME`]: nuevoRol.ROLENAME,
          [`ROLES.${indexRol}.DESCRIPTION`]: nuevoRol.DESCRIPTION
        };

        await usersSchema.updateOne({ USERID }, { $set: rolUpdate });

        // Procesar cada proceso
        for (const nuevoProceso of nuevoRol.PROCESSES || []) {
          const indexProceso = existingRol.PROCESSES.findIndex(
            p => p.PROCESSID === nuevoProceso.PROCESSID
          );

          if (indexProceso === -1) {
            // Si el proceso no existe, lo agregamos
            await usersSchema.updateOne(
              { USERID },
              { $push: { [`ROLES.${indexRol}.PROCESSES`]: nuevoProceso } }
            );
          } else {
            // Proceso existe, actualizar campos básicos
            const procesoUpdate = {
              [`ROLES.${indexRol}.PROCESSES.${indexProceso}.PROCESSNAME`]: nuevoProceso.PROCESSNAME,
              [`ROLES.${indexRol}.PROCESSES.${indexProceso}.VIEWID`]: nuevoProceso.VIEWID,
              [`ROLES.${indexRol}.PROCESSES.${indexProceso}.VIEWNAME`]: nuevoProceso.VIEWNAME,
              [`ROLES.${indexRol}.PROCESSES.${indexProceso}.APPLICATIONID`]: nuevoProceso.APPLICATIONID,
              [`ROLES.${indexRol}.PROCESSES.${indexProceso}.APPLICATIONNAME`]: nuevoProceso.APPLICATIONNAME
            };

            await usersSchema.updateOne({ USERID }, { $set: procesoUpdate });

            // Procesar privilegios
            for (const nuevoPrivilegio of nuevoProceso.PRIVILEGES || []) {
              const privilegioExistente = usuario.ROLES[indexRol].PROCESSES[indexProceso].PRIVILEGES || [];
              const indexPrivilegio = privilegioExistente.findIndex(
                p => p.PRIVILEGEID === nuevoPrivilegio.PRIVILEGEID
              );

              if (indexPrivilegio === -1) {
                await usersSchema.updateOne(
                  { USERID },
                  {
                    $push: {
                      [`ROLES.${indexRol}.PROCESSES.${indexProceso}.PRIVILEGES`]: nuevoPrivilegio
                    }
                  }
                );
              } else {
                // Actualizar nombre del privilegio si ya existe
                await usersSchema.updateOne(
                  { USERID },
                  {
                    $set: {
                      [`ROLES.${indexRol}.PROCESSES.${indexProceso}.PRIVILEGES.${indexPrivilegio}.PRIVILEGENAME`]: nuevoPrivilegio.PRIVILEGENAME
                    }
                  }
                );
              }
            }
          }
        }
      }
    }

    return { success: true, message: 'Usuario actualizados correctamente.' };
  } catch (error) {
    return { success: false, message: 'Error al actualizar el usuario.', error };
  }
}

module.exports = {
  GetAllUsers,
  CreateUser,
  UpdateUserByUSERID
};