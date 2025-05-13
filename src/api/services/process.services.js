//************* SERVICIO PARA MONGO DB */
const processSchema = require('../models/SchemasMongoDB/procesos');


async function GetAllProcess(req) {
  try {
    let process = await processSchema.find().lean(); 
    return process;
  } catch (error) {
    return error;
  }
}

module.exports = {
  GetAllProcess
};