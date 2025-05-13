//************* SERVICIO PARA MONGO DB */
const usersSchema = require('../models/SchemasMongoDB/usuarios');


async function GetAllUsers(req) {
  try {
    let user = await usersSchema.find().lean(); 
    return user;
  } catch (error) {
    return error;
  }
}

module.exports = {
  GetAllUsers
};