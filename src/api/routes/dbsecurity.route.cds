using {dbsecurity as security} from '../models/SchemasSAPCAP/dbsecurity';

@impl: 'src/api/controllers/dbsecurity.controller.js'

service inversionsRoute @(path: '/api/inv') {
    entity catalogs        as projection on security.Catalogos;
    entity process         as projection on security.Procesos;
    entity users           as projection on security.Usuarios;
    entity views           as projection on security.Views;
    entity roles           as projection on security.Roles;

    //******************* CATALOGS ***********************************
    @Core.Description: 'get-all-catalogs'
    @path            : 'GetAllCatalogs'
    function GetAllCatalogs()   returns array of catalogs;

    @Core.Description: 'deleted-by-id-catalogs'
    @path            : 'CatalogosDeleteById'
    action CatalogosDeleteById(ValueId : String)   returns Boolean ;

    @Core.Description: 'get-catalogs-by-application-id'
    @path            : 'GetCatalogsByApplicationId'
    function GetCatalogsByApplicationId(IdApplication: String) returns array of catalogs;

    @Core.Description: 'get-catalogs-by-valueid'
    @path            : 'GetCatalogsByValueId'
    function GetCatalogsByValueId(ValueId: String) returns array of catalogs;
    //******************* PROCESS ***********************************
    @Core.Description: 'get-all-process'
    @path            : 'GetAllProcess'
    function GetAllProcess()   returns array of process;

    @Core.Description: 'update-process-by-company-id'
    @path: 'UpdateProcesByCompanyId'
    action UpdateProcesByCompanyId(
        COMPANYID: Integer,
        CEDIID: Integer,
        LABELID: String,
        VALUEPAID: String,
        VALUEID: String,
        VALUE: String,
        ALIAS: String,
        SEQUENCE: Integer,
        IMAGE: String,
        VALUESAPID: String,
        DESCRIPTION: String
    ) returns Boolean;

    //******************* USERS ***********************************
    @Core.Description: 'get-all-users'
    @path            : 'GetAllUsers'
    function GetAllUsers()   returns array of users;
    
    @Core.Description: 'crear-usuario-nuevo'
    @path            : 'CreateUser'
    action CreateUser(user: users) returns Boolean;

    //******************* VIEWS ***********************************
    @Core.Description: 'get-all-views'
    @path            : 'GetAllViews'
    function GetAllViews()   returns array of views;

    @Core.Description: 'update-view-by-company-id'
    @path: 'UpdateViewByCompanyId'
    action UpdateViewByCompanyId(
        COMPANYID: Integer,
        CEDIID: Integer,
        LABELID: String,
        VALUEPAID: String,
        VALUEID: String,
        VALUE: String,
        ALIAS: String,
        SEQUENCE: Integer,
        IMAGE: String,
        VALUESAPID: String,
        DESCRIPTION: String,
        ROUTE: String
    ) returns Boolean;


    //******************* ROLES ***********************************
    @Core.Description: 'get-all-Roles'
    @path            : 'GetAllRoles'
    function GetAllRoles()   returns array of roles;

    @Core.Description: 'get-role-with-users-by-roleid'
    @path            : 'GetRoleWithUsers'
    function getRoleWithUsersHandler(roleid: String) returns roles;

    @Core.Description: 'put-role-with-users-by-roleid'
    @path            : 'UpdateRolByRoleID'
    action UpdateRolByRoleID(
        ROLEID: String,
        PROCESSES: array of ProcessInput
        ) returns Boolean;


}

type ProcessInput: {
  PROCESSID: String;
  PROCESSNAME: String;
  VIEWID: String ;
  VIEWNAME: String;
  APPLICATIONID: String; 
  APPLICATIONNAME: String; 
  PRIVILEGES: array of Privilegios;
}

type Privilegios:{
    PRIVILEGEID: String;
    PRIVILEGENAME: String;
}