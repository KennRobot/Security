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

async function GetCatalogOne(req) {
  try {
    const { VALUEID } = req.data;  // Asumiendo que el ID es un parámetro en el cuerpo de la solicitud

    // Buscar el registro en MongoDB
    const catalog = await catalogsSchema.findOne({ VALUEID }).lean();

    if (!catalog) {
      throw new Error(`No se encontró un registro con el VALUEID ${VALUEID}`);
    }

    return catalog;
  } catch (error) {
    throw new Error(`Error al obtener el registro de precios por ID: ${error.message}`);
  }
}


async function CatalogosDeleteById(req) {
  try {
    // Obtener el parámetro directamente desde el body o query (según cómo lo mandes)
    const { ValueId } = req.data || req.body;
    //Valida que el dato existe
    if (!ValueId || typeof ValueId !== 'string') {
      return {
        status: 400,
        message: 'Debe proporcionar un ValueId válido'
      };
    }

    // Buscar y eliminar el documento
    const deleted = await catalogsSchema.findOneAndDelete({ VALUEID: ValueId }).lean();

    if (!deleted) {
      return {
        status: 404,
        message: `No se encontró un registro con el VALUEID "${ValueId}"`
      };
    }

    return true; // Para CAP, si se espera un booleano
  } catch (error) {
    console.error('Error en CatalogosDeleteById:', error);
    return {
      status: 500,
      message: `Error al eliminar el catálogo: ${error.message}`
    };
  }
}

async function GetCatalogsByApplicationId(req) {
    const { IdApplication } = req.data;

    if (!IdApplication) throw new Error("IdApplication is required");

    const results = await catalogsSchema.find({ IdApplication }).lean();

    return results;
}


async function GetCatalogsByValueId(req) {
    const { ValueId } = req.data;

    if (!ValueId) throw new Error("ValueId is required");

    const results = await Catalogo.find({ ValueId }).lean();

    return results;
}


module.exports = {
  GetAllCatalogs,
  CatalogosDeleteById,
  GetCatalogsByApplicationId,
  GetCatalogsByValueId, GetCatalogOne
};