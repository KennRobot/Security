//************* SERVICIO PARA MONGO DB */
const viewsSchema = require('../models/SchemasMongoDB/vistas');


async function GetAllViews(req) {
  try {
    let views = await viewsSchema.find().lean(); 
    return views;
  } catch (error) {
    return error;
  }
}

module.exports = {
  GetAllViews
};