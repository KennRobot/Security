//************* SERVICIO PARA MONGO DB */
const RolesSchema = require('../models/SchemasMongoDB/roles');


async function GetAllRoles(req) {
  try {
    let role = await RolesSchema.find().lean(); 
    return role;
  } catch (error) {
    return error;
  }
}

module.exports = {
  GetAllRoles
};