const cds = require('@sap/cds');
const { GetAllCatalogs } = require('../services/catalogs.services');

module.exports = class dbsecurityClass extends cds.ApplicationService {
    async init() {
      //****************** PARA USERS ***********************/
        // Evento para obtener todos los usuarios
        this.on('GetAllCatalogs', async (req) => {
            return await GetAllCatalogs(req);
        });

        return super.init();
    }
};