# EndPoints para Catalogos

Endpoint | Route | Description | Finish | Creator | Body
---------|----------|----------|----------|---------- |----------
`GET` | /api/inv/GetAllCatalogs | todos los catalogos | Yes | Kennby | none
`GET` | /api/security/catalogs?labelid=IdApplications | un solo catalogo | No| Kennby| none
`GET` | /api/security/catalogs?LabelId=IdApplication | filtro catalogos por IdApplication| No| Adolfo | none
`GET` | /api/security/catalogs?ValueId=IdSecurity | filtro catalogos por ValueId | No| Adolfo | none
`PUT` | /api/security/catalogs?ValueId=IdSecurity | actualizar catalogo | No| aaron | none
`DELETE` | /api/security/catalogs?ValueId=IdSecurity | alimnar catalogo | Tes | joya| none

# EndPoints para Usuarios

Endpoint | Route | Description | Finish | Creator | Body
---------|----------|----------|----------|---------- | ---------
`GET` | /api/inv/users | todos los usuarios | Yes | Kennby| none
`GET` | /api/inv/users?userid=FIBARRAC | un solo usuario | No| Adolfo| none
`POST` | /api/inv/CreateUser | crear nuevo usuario | No | Aaron| none
`PATCH` | /api/inv/users?userid=CHALMUNOZOR | Actualizar usuario (validar que el rol Exista) | No | Joya| none
`PATCH` | /api/inv/deleteusers?userid=CHALMUNOZOR | Borrado lógico (Usuario Inactivo) | No | Pedro y Jesus| none
`DELETE` | /api/inv/deleteusers?userid=CHALMUNOZOR| Eliminado físico (Usuario Eliminado) | No | Pedro y Jesus| none

# EndPoints para Roles

Endpoint | Route | Description | Finish| Creator | Body
---------|----------|----------|----------|---------- | ----------
`GET` | /api/security/roles | Todos los roles con procesos y privilegios | Yes| Kennby| none
`GET` | /api/security/roles?roleid=IdWarehouseManage | Obtener usuarios por roles | No | Adolfo| none
`POST` | /api/security/roles | Crear rol (Validar que el privilegio y el proceso existan en la colección correspondiente) | No | Aaron| none
`PUT` | /api/security/roles?roleid=IdWarehouseManager | Actualizar rol (Validar que el privilegio y el proceso existan) | YES | Joya| {"ROLEID": "IdWarehouseManager","PROCESSES": [{"PROCESSID": "IdProcesses","APPLICATIONNAME":"SECURYTY-Update","PRIVILEGES":[{"PRIVILEGEID":	"IdRead","PRIVILEGENAME":	"update-Read"}]}]}
`POST` |  /api/inv/UpdateRoleActivation | Borrado lógico (Rol Inactivo) | Yes | Pedro y Jesus| { "roleid": "IdWarehouseManager", "activated": false}
`PATCH` |   | Borrado lógico (Rol Inactivo) | No | Pedro y Jesus| none
`DELETE` |  /api/security/deleteroles?roleid=IdSecurityAdministrator | Eliminado físico (Rol Eliminado) |No | Pedro y Jesus| none

# EndPoints para Vistas

Endpoint | Route | Description | Finish| Creator | Body
---------|----------|----------|----------|---------- | ----------
`POST` | /api/security/view | Nueva vista| No | Aaron| none
`PUT` | /api/security/view?valueid=IdApplications-IdInversions | actualizar | Yes | Joya| none
`PATCH` |   /api/security/deleteview?valueid=IdApplications-IdInversions | Borrado lógico (Rol Inactivo) | No | Pedro y Jesus| none
`DELETE` |  /api/security/deleteview?valueid=IdApplications-IdInversions | Eliminado físico (Rol Eliminado) |No | Pedro y Jesus| none

# EndPoints para Procesos

Endpoint | Route | Description | Finish| Creator | Body
---------|----------|----------|----------|---------- | ---------
`POST` | /api/inv/CreateProcess | Nuevo proceso | si | Aaron| none
`PUT` | /api/security/values/processes?valueid=IdAllPrivilegesMonitoring | Actualizar | Yes | Joya| none
`PATCH` |   /api/security/deleteprocesses?valueid=IdSecurityAdministrator | Borrado lógico (Rol Inactivo) | No | Pedro y Jesus| none
`DELETE` |  /api/security/deleteprocesses?valueid=IdSecurityAdministrator | Eliminado físico (Rol Eliminado) |No | Pedro y Jesus| none


