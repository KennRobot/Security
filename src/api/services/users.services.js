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
 
module.exports = {
  GetAllUsers,
  CreateUser
};