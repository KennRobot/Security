using {dbsecurity as security} from '../models/SchemasSAPCAP/dbsecurity';

@impl: 'src/api/controllers/dbsecurity.controller.js'

service inversionsRoute @(path: '/api/inv') {
    entity catalogs        as projection on security.Catalogos;
    entity process         as projection on security.Procesos;
    entity users         as projection on security.Usuarios;
    entity views        as projection on security.Views;

    //******************* CATALOGS ***********************************
    @Core.Description: 'get-all-catalogs'
    @path            : 'GetAllCatalogs'
    function GetAllCatalogs()   returns array of catalogs;

    //******************* PROCESS ***********************************
    @Core.Description: 'get-all-process'
    @path            : 'GetAllProcess'
    function GetAllProcess()   returns array of process;

    //******************* PROCESS ***********************************
    @Core.Description: 'get-all-users'
    @path            : 'GetAllUsers'
    function GetAllUsers()   returns array of users;

    //******************* PROCESS ***********************************
    @Core.Description: 'get-all-views'
    @path            : 'GetAllViews'
    function GetAllViews()   returns array of views;

    
}