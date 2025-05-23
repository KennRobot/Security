//************* SERVICIO PARA MONGO DB */
const processSchema = require('../models/SchemasMongoDB/procesos');

// Obtener todos los procesos
async function GetAllProcess(req) {
  try {
    let process = await processSchema.find().lean(); 
    return process;
  } catch (error) {
    return error;
  }
}

// Actualizar un proceso por COMPANYID
async function UpdateProcesByCompanyId(req) {
  try {
    const { COMPANYID, ...rest } = req.data;
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

// Borrado físico de un proceso por ID
async function DeleteProcessById(req) {
  try {
    const { ID } = req.data;

    const deletedDoc = await procesoSchema.findByIdAndDelete(ID);

    if (!deletedDoc) {
      return { success: false, message: 'No se encontró un proceso con ese ID.' };
    }

    return { success: true, message: 'Proceso eliminado correctamente.', data: deletedDoc };
  } catch (error) {
    return { success: false, message: 'Error al eliminar el proceso.', error };
  }
}

module.exports = {
  GetAllProcess,
  UpdateProcesByCompanyId,
  DeleteProcessById
};
