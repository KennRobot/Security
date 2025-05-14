//************* SERVICIO PARA MONGO DB */
const catalogsSchema = require('../models/SchemasMongoDB/catalogos');


async function GetAllCatalogs(req) {
  try {
    let catalog = await catalogsSchema.find().lean(); 
    return catalog;
  } catch (error) {
    return error;
  }
}

async function CatalogosDeleteById(req) {
  try {
    const { _id } = req.data || req.body;

    if (!_id || typeof _id !== 'string') {
      return {
        status: 400,
        message: 'Debe proporcionar un _id válido (como string)'
      };
    }

    // Verifica si el ID es un ObjectId válido
    const isValidObjectId = require('mongoose').Types.ObjectId.isValid(_id);
    if (!isValidObjectId) {
      return {
        status: 400,
        message: 'El _id proporcionado no tiene un formato válido de ObjectId'
      };
    }

    // Eliminar por _id
    const deleted = await catalogsSchema.findByIdAndDelete(_id).lean();

    if (!deleted) {
      return {
        status: 404,
        message: `No se encontró un registro con el _id "${_id}"`
      };
    }

    return true; // CAP espera normalmente un booleano si el retorno es `Edm.Boolean`
  } catch (error) {
    console.error('Error en CatalogosDeleteById:', error);
    return {
      status: 500,
      message: `Error al eliminar el catálogo: ${error.message}`
    };
  }
}



module.exports = {
  GetAllCatalogs,
  CatalogosDeleteById
};