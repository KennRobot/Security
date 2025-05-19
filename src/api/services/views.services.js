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

const CreateViewService = async (req) => {
  try {
    const data = req.data;

    if (!data.updatedAt) {
      data.updatedAt = new Date();
    }

    const newView = new viewsSchema(data); // ← aquí el cambio
    await newView.save();

    return {
      success: true,
      message: 'Vista creada exitosamente'
    };
  } catch (error) {
    console.error('Error al crear la vista:', error);
    return {
      success: false,
      message: 'Error al crear la vista'
    };
  }
};

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
  CreateViewService,
  UpdateViewByCompanyId
};