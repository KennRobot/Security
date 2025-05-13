# EndPoints para Catalogos

Endpoint | Route | Description | Finish
---------|----------|----------|----------
`GET` | /api/inv/GetAllCatalogs | todos los catalogos | Yes
`GET` | /api/security/catalogs?labelid=IdApplications | un solo catalogo | No
`GET` | /api/security/catalogs?LabelId=IdApplication&ValueId=IdSecurity | filtro catalogos | No

# EndPoints para Usuarios

Endpoint | Route | Description | Finish
---------|----------|----------|----------
`GET` | /api/security/users | todos los usuarios | No
`GET` | /api/security/users?userid=FIBARRAC | un solo usuario | No
`POST` | /api/security/createuser | crear nuevo usuario | No
`PATCH` | /api/security/users?userid=CHALMUNOZOR | Actualizar usuario (validar que el rol Exista) | No
`PATCH` | /api/security/deleteusers?userid=CHALMUNOZOR | Borrado lógico (Usuario Inactivo) | No
`DELETE` | /api/security/deleteusers?userid=CHALMUNOZOR| Eliminado físico (Usuario Eliminado) | No

# EndPoints para Roles

Endpoint | Route | Description | Finish
---------|----------|----------|----------
`GET` | /api/security/roles | Todos los roles con procesos y privilegios | No
`GET` | /api/security/roles?roleid=IdWarehouseManage | Obtener usuarios por roles | No


