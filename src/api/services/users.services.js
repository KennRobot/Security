//************* SERVICIO PARA MONGO DB */
const usersSchema = require('../models/SchemasMongoDB/usuarios');


async function GetAllUsers(req) {
  try {
    let user = await usersSchema.find().lean(); 
    return user;
  } catch (error) {
    return error;
  }
}
//funcion para borrado logico
//eliminacion de usuario
// Cambiar estado ACTIVED y ajustar automáticamente DELETED
const DeleteUserLogical = async (req) => {
  try {
    const { USERID, ACTIVED } = req.data;

    // Validación estricta de tipo booleano
    if (typeof ACTIVED !== 'boolean') {
      return {
        success: false,
        message: 'El campo ACTIVED debe ser booleano (true o false).'
      };
    }

    const updatedUser = await usersSchema.findOneAndUpdate(
      { USERID: USERID },
      {
        $set: {
          'DETAIL_ROW.ACTIVED': ACTIVED,
          'DETAIL_ROW.DELETED': !ACTIVED
        }
      },
      { new: true }
    );

    if (!updatedUser) {
      return {
        success: false,
        message: `No se encontró el usuario con ID: ${USERID}`
      };
    }

    return {
      success: true,
      message: `Usuario ${ACTIVED ? 'activado' : 'desactivado'} correctamente.`,
      USERID: USERID
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'Error al actualizar el estado del usuario.',
      error: error.message
    };
  }
};

// Borrado físico (elimina el documento completamente)
const DeleteUserPhysical = async (req) => {
  try {
    const { USERID } = req.data;
    if (!USERID) {
      return {
        success: false,
        message: 'Se requiere el USERID para eliminar el usuario.'
      };
    }
    const result = await usersSchema.deleteOne({ USERID });
    if (result.deletedCount === 0) {
      return {
        success: false,
        message: `No se encontró el usuario con ID: ${USERID}`
      };
    }
    return {
      success: true,
      message: `Usuario con ID ${USERID} eliminado físicamente.`,
      USERID
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'Error al eliminar el usuario.',
      error: error.message
    };
  }
};

module.exports = {
  GetAllUsers, 
  DeleteUserLogical,
  DeleteUserPhysical
};