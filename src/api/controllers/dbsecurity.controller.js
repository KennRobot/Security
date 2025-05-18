const cds = require('@sap/cds');
const { GetAllCatalogs, CatalogosDeleteById, GetCatalogsByApplicationId, GetCatalogsByValueId } = require('../services/catalogs.services');
const { GetAllProcess, UpdateProcesByCompanyId } = require('../services/process.services');
const { GetAllUsers } = require('../services/users.services');
const { GetAllViews, UpdateViewByCompanyId } = require('../services/views.services');
const { GetAllRoles, getRoleWithUsers } = require('../services/roles.services');


module.exports = class dbsecurityClass extends cds.ApplicationService {
    async init() {
        //****************** PARA CATALOGS ***********************/
        this.on('GetAllCatalogs', async (req) => {
            return await GetAllCatalogs(req);
        });
        this.on('CatalogosDeleteById', async (req) => {
            return await CatalogosDeleteById(req);
        });
        
        this.on('GetCatalogsByApplicationId', async (req) => {
            return await GetCatalogsByApplicationId(req);
        });
   
        this.on('GetCatalogsByValueId', async (req) => {
            return await GetCatalogsByValueId(req);
        });
         //****************** PARA PROCESS ***********************/
        this.on('GetAllProcess', async (req) => {
            return await GetAllProcess(req);
        });

        this.on('UpdateProcesByCompanyId', async (req) => {
            return await UpdateProcesByCompanyId(req);
        });

         //****************** PARA USERS ***********************/
        this.on('GetAllUsers', async (req) => {
            return await GetAllUsers(req);
        });

         //****************** PARA VIEWS ***********************/
        this.on('GetAllViews', async (req) => {
            return await GetAllViews(req);
        });

        this.on('UpdateViewByCompanyId', async (req) => {
            return await UpdateViewByCompanyId(req);
        });

        //****************** PARA ROLES ***********************/
        this.on('GetAllRoles', async (req) => {
            return await GetAllRoles(req);
        });

        //****************** PARA ROLES CON USUARIOS ***********************/
        this.on('GetRoleWithUsers', async (req) => {
            const { roleid } = req.data;
            return await getRoleWithUsers(roleid);
        });
        

        return super.init();
    }
};