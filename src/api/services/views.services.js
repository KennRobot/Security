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

async function UpdateViewByCompanyId(req) {
  try {
    const { COMPANYID, ...rest } = req.data;

    // Filtramos solo los campos que realmente se enviaron (no undefined)
    const updateData = {};
    for (const key in rest) {
      if (rest[key] !== undefined) {
        updateData[key] = rest[key];
      }
    }

    const updatedDoc = await viewsSchema.findOneAndUpdate(
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
  GetAllViews,
  UpdateViewByCompanyId
};