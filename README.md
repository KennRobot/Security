# EndPoints para Catalogos

Endpoint | Route | Description | Finish | Creator
---------|----------|----------|----------|----------
`GET` | /api/inv/GetAllCatalogs | todos los catalogos | Yes | Kennby
`GET` | /api/security/catalogs?labelid=IdApplications | un solo catalogo | No| Kennby
`GET` | /api/security/catalogs?LabelId=IdApplication | filtro catalogos por IdApplication| No| Adolfo
`GET` | /api/security/catalogs?ValueId=IdSecurity | filtro catalogos por ValueId | No| Adolfo
`PUT` | /api/security/catalogs?ValueId=IdSecurity | actualizar catalogo | No| aaron
`DELETE` | /api/security/catalogs?ValueId=IdSecurity | alimnar catalogo | Tes | joya

# EndPoints para Usuarios

Endpoint | Route | Description | Finish | Creator
---------|----------|----------|----------|----------
`GET` | /api/security/users | todos los usuarios | Yes | Kennby
`GET` | /api/security/users?userid=FIBARRAC | un solo usuario | No| Adolfo
`POST` | /api/security/createuser | crear nuevo usuario | No | Aaron
`PATCH` | /api/security/users?userid=CHALMUNOZOR | Actualizar usuario (validar que el rol Exista) | No | Joya
`PATCH` | /api/security/deleteusers?userid=CHALMUNOZOR | Borrado lógico (Usuario Inactivo) | No | Pedro y Jesus
`DELETE` | /api/security/deleteusers?userid=CHALMUNOZOR| Eliminado físico (Usuario Eliminado) | No | Pedro y Jesus

# EndPoints para Roles

Endpoint | Route | Description | Finish| Creator
---------|----------|----------|----------|----------
`GET` | /api/security/roles | Todos los roles con procesos y privilegios | Yes| Kennby
`GET` | /api/security/roles?roleid=IdWarehouseManage | Obtener usuarios por roles | No | Adolfo
`POST` | /api/security/roles | Crear rol (Validar que el privilegio y el proceso existan en la colección correspondiente) | No | Aaron
`PUT` | /api/security/roles?roleid=IdWarehouseManager | Actualizar rol (Validar que el privilegio y el proceso existan) | No| Joya
`PATCH` |  /api/security/deleteroles?roleid=IdSecurityAdministrator | Borrado lógico (Rol Inactivo) | No | Pedro y Jesus
`DELETE` |  /api/security/deleteroles?roleid=IdSecurityAdministrator | Eliminado físico (Rol Eliminado) |No | Pedro y Jesus

# EndPoints para Vistas

Endpoint | Route | Description | Finish| Creator
---------|----------|----------|----------|----------
`POST` | /api/security/view | Nueva vista| No | Aaron
`PUT` | /api/security/view?valueid=IdApplications-IdInversions | actualizar | Yes | Joya
`PATCH` |   /api/security/deleteview?valueid=IdApplications-IdInversions | Borrado lógico (Rol Inactivo) | No | Pedro y Jesus
`DELETE` |  /api/security/deleteview?valueid=IdApplications-IdInversions | Eliminado físico (Rol Eliminado) |No | Pedro y Jesus

# EndPoints para Procesos

Endpoint | Route | Description | Finish| Creator
---------|----------|----------|----------|----------
`POST` | /api/security/processes | Nuevo proceso | No | Aaron
`PUT` | /api/security/values/processes?valueid=IdAllPrivilegesMonitoring | Actualizar | Yes | Joya
`PATCH` |   /api/security/deleteprocesses?valueid=IdSecurityAdministrator | Borrado lógico (Rol Inactivo) | No | Pedro y Jesus
`DELETE` |  /api/security/deleteprocesses?valueid=IdSecurityAdministrator | Eliminado físico (Rol Eliminado) |No | Pedro y Jesus


