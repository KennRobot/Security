const cds = require('@sap/cds');
const { GetAllCatalogs } = require('../services/catalogs.services');
const { GetAllProcess } = require('../services/process.services');
const { GetAllUsers } = require('../services/users.services');
const { GetAllViews } = require('../services/views.services');
const { GetAllRoles } = require('../services/roles.services');

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

         //****************** PARA VIEWS ***********************/
        this.on('GetAllViews', async (req) => {
            return await GetAllViews(req);
        });

        //****************** PARA ROLES ***********************/
        this.on('GetAllRoles', async (req) => {
            return await GetAllRoles(req);
        });

        return super.init();
    }
};