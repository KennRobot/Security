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
    action CatalogosDeleteById(_id: String)   returns Boolean ;

    //******************* PROCESS ***********************************
    @Core.Description: 'get-all-process'
    @path            : 'GetAllProcess'
    function GetAllProcess()   returns array of process;

    //******************* PROCESS ***********************************
    @Core.Description: 'get-all-users'
    @path            : 'GetAllUsers'
    function GetAllUsers()   returns array of users;

    //******************* VIEWS ***********************************
    @Core.Description: 'get-all-views'
    @path            : 'GetAllViews'
    function GetAllViews()   returns array of views;

    //******************* ROLES ***********************************
    @Core.Description: 'get-all-Roles'
    @path            : 'GetAllRoles'
    function GetAllRoles()   returns array of roles;

    
}