# EndPoints para Catalogos

Endpoint | Route | Description | Finish | Creator | Body
---------|----------|----------|----------|---------- |----------
`GET` | /api/inv/GetAllCatalogs | todos los catalogos | Yes | Kennby | none
`GET` | /api/inv/GetCatalogOne | un solo catalogo | Yes| Kennby| {"ValueId":"IdInversions"}
`GET` | /api/security/catalogs?LabelId=IdApplication | filtro catalogos por IdApplication| yes | Adolfo | none
`GET` | /api/security/catalogs?ValueId=IdSecurity | filtro catalogos por ValueId | No| Adolfo | none
`PUT` | /api/security/catalogs?ValueId=IdSecurity | actualizar catalogo | Yes | aaron | {"VALUEID":"IdInvestments","LABEL":"IdApplicationsUpdated",
                                                                                         "INDEX":"INV-2025-NEW",
                                                                                         "COLLECTION":"modulos",
                                                                                         "SECTION":"recomendaciones",
                                                                                         "SEQUENCE":22,
                                                                                         "IMAGE":"https://investmentrecommendation.com/nueva.png",
                                                                                         "DESCRIPTION":"Catálogo actualizado para recomendaciones de inversiones del 2025.",
                                                                                         "REGUSER":"FIBARRAC"}

`DELETE` | /api/security/catalogs?ValueId=IdSecurity | alimnar catalogo | yes | joya| none

# EndPoints para Usuarios

Endpoint | Route | Description | Finish | Creator | Body
---------|----------|----------|----------|---------- | ---------
`GET` | /api/inv/users | todos los usuarios | Yes | Kennby| none
`GET` | /api/inv/users?userid=FIBARRAC | un solo usuario | yes| Adolfo| none
`POST` | /api/inv/CreateUser | crear nuevo usuario | Yes | Aaron| none
`PUT` | /api/inv/UpdateUserByUSERID | Actualizar usuario (validar que el rol Exista) | YES | Joya| {"USERID": "AJOYA","BIRTHDAYDATE": "21.03.2001","ROLES" : [{"ROLEID":"IdWarehouseManager","ROLEIDSAP":"update-prueba","PROCESSES":[{"PROCESSID":"IdProcesses","PROCESSNAME":"proceso-update","PRIVILEGES":[{"PRIVILEGEID":"IdRead","PRIVILEGENAME":"Read"}]}]}]}
`PATCH` | /api/inv/deleteusers?userid=CHALMUNOZOR | Borrado lógico (Usuario Inactivo) | No | Pedro y Jesus| none
`DELETE` | /api/inv/deleteusers?userid=CHALMUNOZOR| Eliminado físico (Usuario Eliminado) | No | Pedro y Jesus| none

# EndPoints para Roles

Endpoint | Route | Description | Finish| Creator | Body
---------|----------|----------|----------|---------- | ----------
`GET` | /api/inv/roles | Todos los roles con procesos y privilegios | Yes| Kennby| none
`GET` | /api/inv/roles?roleid=IdWarehouseManage | Obtener usuarios por roles | yes | Adolfo| none
`POST` | /api/security/roles | Crear rol (Validar que el privilegio y el proceso existan en la colección correspondiente) | yes | Aaron| none
`PUT` | /api/inv/UpdateRolByRoleID | Actualizar rol (Validar que el privilegio y el proceso existan) | YES | Joya| {"ROLEID": "IdWarehouseManager","PROCESSES": [{"PROCESSID": "IdProcesses","APPLICATIONNAME":"SECURYTY-Update","PRIVILEGES":[{"PRIVILEGEID": "IdRead","PRIVILEGENAME": "update-Read"},{"PRIVILEGEID":"IdWrite","PRIVILEGENAME": "updateWrite"}]}]}
`POST` |  /api/inv/DeleteRoleLogical | Borrado lógico (Rol Inactivo) | Yes | Pedro y Jesus| { "roleid": "IdWarehouseManager", "activated": false}
`POST` |  /api/inv/DeleteRoleById | Eliminado físico (Rol Eliminado) | Yes | Pedro y Jesus| { "roleid": "IdWarehouseManagerXDDDDD" }

# EndPoints para Vistas

Endpoint | Route | Description | Finish| Creator | Body
---------|----------|----------|----------|---------- | ----------
`POST` | /api/inv/CreateView | Nueva vista| No | Aaron| none
`PUT` | /api/security/UpdateViewByCompanyId | actualizar | Yes | Joya| {"COMPANYID": 1,"CEDIID": 1,"LABELID":"Nuevo Label","VALUEPAID": "IdViews-IdUserManagementView","VALUEID": "IdAllPrivilegesMonitoring","VALUE": "Monitoreo de Todos los Privilegios","ALIAS": "ALL_PRIV","SEQUENCE": 1,"IMAGE": "https://security_auth.png","VALUESAPID": "Change","DESCRIPTION": "Proceso de monitoreo de todos los privilegios de usuarios en el sistema.","ROUTE":"/nuevaRuta"}
`PATCH` |   /api/security/deleteview?valueid=IdApplications-IdInversions | Borrado lógico (Rol Inactivo) | No | Pedro y Jesus| none
`POST` | /api/inv/DeleteViewByCompanyId | Eliminado físico (Rol Eliminado) | Yes | Pedro y Jesus| { "COMPANYID": 10 }

# EndPoints para Procesos

Endpoint | Route | Description | Finish| Creator | Body
---------|----------|----------|----------|---------- | ---------
`POST` | /api/inv/CreateProcess | Nuevo proceso | yes | Aaron| none
`PUT` | /api/inv/UpdateProcesByLABELId | Actualizar | Yes | Joya| {"COMPANYID": 5,"CEDIID": 1,"LABELID":"IdProcesses","VALUEPAID": "IdViews-IdUserManagementView","VALUEID": "IdAllPrivilegesMonitoring","VALUE": "Monitoreo de Todos los Privilegios","ALIAS": "ALL_PRIV","SEQUENCE": 1,"IMAGE": "https://security_auth.png","VALUESAPID": "Change","DESCRIPTION": "Proceso de monitoreo de todos los privilegios de usuarios en el sistema."}
`PATCH` |   /api/security/deleteprocesses?valueid=IdSecurityAdministrator | Borrado lógico (Rol Inactivo) | No | Pedro y Jesus| none
`DELETE` |  /api/security/deleteprocesses?valueid=IdSecurityAdministrator | Eliminado físico (Rol Eliminado) |No | Pedro y Jesus| none


