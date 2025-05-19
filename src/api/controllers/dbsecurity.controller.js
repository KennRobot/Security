const cds = require('@sap/cds');
const { GetAllCatalogs, CatalogosDeleteById, GetCatalogsByApplicationId, GetCatalogsByValueId } = require('../services/catalogs.services');
const { GetAllProcess, UpdateProcesByCompanyId, CreateProcessService } = require('../services/process.services');
const { GetAllUsers } = require('../services/users.services');
const { GetAllViews, UpdateViewByCompanyId, CreateViewService } = require('../services/views.services');
const { GetAllRoles, getRoleWithUsers, UpdateRolByRoleID, UpdateRoleActivation, DeleteRoleById } = require('../services/roles.services');
const { CreateUser } = require('../services/users.services');



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

        this.on('CreateProcess', async (req) => {
            return await CreateProcessService(req);
          });

        this.on('UpdateProcesByCompanyId', async (req) => {
            return await UpdateProcesByCompanyId(req);
        });

         //****************** PARA USERS ***********************/
        this.on('GetAllUsers', async (req) => {
            return await GetAllUsers(req);
        });

        this.on('CreateUser', async (req) => {
            return await CreateUser(req);
        });
        

         //****************** PARA VIEWS ***********************/
        this.on('GetAllViews', async (req) => {
            return await GetAllViews(req);
        });

        this.on('CreateView', async (req) => {
            return await CreateViewService(req);
          });
          
        this.on('UpdateViewByCompanyId', async (req) => {
            return await UpdateViewByCompanyId(req);
        });

        //****************** PARA ROLES ***********************/
        this.on('GetAllRoles', async (req) => {
            return await GetAllRoles(req);
        });
        
        this.on('UpdateRolByRoleID', async (req) => {
            return await UpdateRolByRoleID(req);
        });

        //Delete logico de roles
        this.on('UpdateRoleActivation', async (req) => {
        return await UpdateRoleActivation(req);
        });

        //Delete fisico de roles
        this.on('DeleteRoleById', async (req) => {
        return await DeleteRoleById(req);
        });
        
        //****************** PARA ROLES CON USUARIOS ***********************/
        this.on('GetRoleWithUsers', async (req) => {
            const { roleid } = req.data;
            return await getRoleWithUsers(roleid);
        });
        
       
        
        return super.init();
    }
};