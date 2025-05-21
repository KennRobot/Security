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

async function CreateProcessService(req) {
  try {
    const data = req.data;

    if (!data.updatedAt) {
      data.updatedAt = new Date();
    }

    const newProcess = new processSchema(data);
    await newProcess.save();

    return {
      success: true,
    message: 'Proceso creado exitosamente'
    };
  } catch (error) {
    console.error('Error al crear el proceso:', error);
    return {
      success: false,
      message: 'Error al crear el proceso'
    };
  }
}



async function UpdateProcesByLABELId(req) {
  try {
    const { LABELID, ...rest } = req.data;

    // Filtramos solo los campos que realmente se enviaron (no undefined)
    const updateData = {};
    for (const key in rest) {
      if (rest[key] !== undefined) {
        updateData[key] = rest[key];
      }
    }

    const updatedDoc = await processSchema.findOneAndUpdate(
      { LABELID },
      { $set: updateData },
      { new: true }
    );

    if (!updatedDoc) {
      return { success: false, message: 'No se encontró un documento con ese LABELID.' };
    }

    return { success: true, data: updatedDoc };
  } catch (error) {
    return { success: false, message: 'Error al actualizar el documento.', error };
  }
}

module.exports = {
  GetAllProcess,
  CreateProcessService,
  UpdateProcesByLABELId
};