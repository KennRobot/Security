//************* SERVICIO PARA MONGO DB */
const processSchema = require('../models/SchemasMongoDB/procesos');



// Obtener todos los procesos
async function GetAllProcess(req) {
  try {
    const allProcesses = await processSchema.find({});
    const cleanedProcesses = allProcesses.map(proc => {
      const { __v, ...cleaned } = proc.toObject();
      return cleaned;
    });

    return cleanedProcesses;
  } catch (error) {
    console.error('Error al obtener todos los procesos:', error);
    return [];
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
// Actualizar un proceso por LABELID
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

// Actualizar un proceso por COMPANYID
async function UpdateProcesByCompanyId(req) {
  try {
    // Filtramos solo los campos que realmente se enviaron (no undefined)
    const { COMPANYID, ...rest } = req.data;
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
  CreateProcessService,
  UpdateProcesByLABELId,
  UpdateProcesByCompanyId,
  DeleteProcessById
};
