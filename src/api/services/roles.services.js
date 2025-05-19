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

    for (const proc of PROCESSES.PRIVILEGES) {
      const proceso = await processSchema.findOne({ LABELID: proc.PROCESSID });
      if (!proceso) {
        return { error: `Proceso ${proc.PROCESSID} no encontrado` };
      }
    }

    // Solo actualizar el campo PROCESSES
    const updatedDoc = await RolesSchema.findOneAndUpdate(
      { ROLEID },
      { $set: { PROCESSES } },
      { new: true }
    );

    if (!updatedDoc) {
      return { success: false, message: 'No se encontró un documento con ese ROLEID.' };
    }

    return { success: true, data: updatedDoc };
  } catch (error) {
    return { success: false, message: 'Error al actualizar el documento.', error };
  }
}



module.exports = {
  GetAllRoles,
  getRoleWithUsers,
  UpdateRolByRoleID,
};