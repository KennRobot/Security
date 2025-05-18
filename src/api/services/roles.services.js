 //************* SERVICIO PARA MONGO DB */
const RolesSchema = require('../models/SchemasMongoDB/roles');
const UserSchema = require('../models/SchemasMongoDB/usuarios');

//**************  GET ALLL */
async function GetAllRoles(req) {
  try {
    let role = await RolesSchema.find().lean(); 
    return role;
  } catch (error) {
    return error;
  }
}

//************** GET USUAIRO */
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

module.exports = {
  GetAllRoles,
  getRoleWithUsers,
};