const cds = require('@sap/cds');
const { GetAllCatalogs } = require('../services/catalogs.services');
const { GetAllProcess } = require('../services/process.services');
const { GetAllUsers } = require('../services/users.services');

module.exports = class dbsecurityClass extends cds.ApplicationService {
    async init() {
        //****************** PARA CATALOGS ***********************/
        this.on('GetAllCatalogs', async (req) => {
            return await GetAllCatalogs(req);
        });

         //****************** PARA PROCESS ***********************/
        this.on('GetAllProcess', async (req) => {
            return await GetAllProcess(req);
        });
         //****************** PARA PROCESS ***********************/
        this.on('GetAllUsers', async (req) => {
            return await GetAllUsers(req);
        });

        return super.init();
    }
};