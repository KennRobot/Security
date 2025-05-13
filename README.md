# EndPoints para Catalogos

Endpoint | Route | Description | Finish
---------|----------|----------|----------
`GET` | /api/inv/GetAllCatalogs | todos los catalogos | Yes
`GET` | /api/security/catalogs?labelid=IdApplications | un solo catalogo | No
`GET` | /api/security/catalogs?LabelId=IdApplication&ValueId=IdSecurity | filtro catalogos | No

# EndPoints para Usuarios

Endpoint | Route | Description | Finish
---------|----------|----------|----------
`GET` | /api/security/users | todos los usuarios | Yes
`GET` | /api/security/users?userid=FIBARRAC | un solo usuario | No
`POST` | /api/security/createuser | crear nuevo usuario | No
`PATCH` | /api/security/users?userid=CHALMUNOZOR | Actualizar usuario (validar que el rol Exista) | No
`PATCH` | /api/security/deleteusers?userid=CHALMUNOZOR | Borrado lógico (Usuario Inactivo) | No
`DELETE` | /api/security/deleteusers?userid=CHALMUNOZOR| Eliminado físico (Usuario Eliminado) | No

# EndPoints para Roles

Endpoint | Route | Description | Finish
---------|----------|----------|----------
`GET` | /api/security/roles | Todos los roles con procesos y privilegios | Yes
`GET` | /api/security/roles?roleid=IdWarehouseManage | Obtener usuarios por roles | No
`POST` | /api/security/roles | Crear rol (Validar que el privilegio y el proceso existan en la colección correspondiente) | No
`PUT` | /api/security/roles?roleid=IdWarehouseManager | Actualizar rol (Validar que el privilegio y el proceso existan) | No
`PATCH` |  /api/security/deleteroles?roleid=IdSecurityAdministrator | Borrado lógico (Rol Inactivo) | No
`DELETE` |  /api/security/deleteroles?roleid=IdSecurityAdministrator | Eliminado físico (Rol Eliminado) |No

# EndPoints para Vistas y Procesos

Endpoint | Route | Description | Finish
---------|----------|----------|----------
`POST` | /api/security/view | Nueva vista| No
`PUT` | /api/security/view?valueid=IdApplications-IdInversions | actualizar | No
`PATCH` |   /api/security/deleteview?valueid=IdApplications-IdInversions | Borrado lógico (Rol Inactivo) | No
`DELETE` |  /api/security/deleteview?valueid=IdApplications-IdInversions | Eliminado físico (Rol Eliminado) |No
`POST` | /api/security/processes | Nuevo proceso | No
`PUT` | /api/security/values/processes?valueid=IdAllPrivilegesMonitoring | Actualizar | No
`PATCH` |   /api/security/deleteprocesses?valueid=IdSecurityAdministrator | Borrado lógico (Rol Inactivo) | No
`DELETE` |  /api/security/deleteprocesses?valueid=IdSecurityAdministrator | Eliminado físico (Rol Eliminado) |No


