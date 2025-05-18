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

async function UpdateProcesByCompanyId(req) {
  try {
    const { COMPANYID, ...rest } = req.data;

    // Filtramos solo los campos que realmente se enviaron (no undefined)
    const updateData = {};
    for (const key in rest) {
      if (rest[key] !== undefined) {
        updateData[key] = rest[key];
      }
    }

    const updatedDoc = await processSchema.findOneAndUpdate(
      { COMPANYID: COMPANYID },
      { $set: updateData },
      { new: true }
    );

    if (!updatedDoc) {
      return { success: false, message: 'No se encontró un documento con ese COMPANYID.' };
    }

    return { success: true, data: updatedDoc };
  } catch (error) {
    return { success: false, message: 'Error al actualizar el documento.', error };
  }
}

module.exports = {
  GetAllProcess,
  UpdateProcesByCompanyId
};