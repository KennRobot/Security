using {dbsecurity as security} from '../models/SchemasSAPCAP/dbsecurity';

@impl: 'src/api/controllers/dbsecurity.controller.js'

service inversionsRoute @(path: '/api/inv') {
    entity catalogs        as projection on security.Catalogos;

    //******************* Users ***********************************
    @Core.Description: 'get-all-catalogs'
    @path            : 'GetAllCatalogs'
    function GetAllCatalogs()   returns array of catalogs;
}