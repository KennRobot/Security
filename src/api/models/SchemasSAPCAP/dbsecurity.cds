namespace dbsecurity;

entity Catalogos {
    key ID                      : UUID;
        COMPANYID               : String;
        CEDIID                  : String;
        LABELID                 : String;
        LABEL                   : String;
        INDEX                   : String;
        COLLECTION              : String;
        SECTION                 : String;
        SEQUENCE                : Integer;
        IMAGE                   : String;
        DESCRIPTION             : String;

        DETAIL_ROW : {
            ACTIVED            : Boolean default true;
            DELETED            : Boolean default false;

            DETAIL_ROW_REG     : Composition of many CatalogoDetalleReg;
        };

        createdAt               : Timestamp;
        updatedAt               : Timestamp;
}

entity CatalogoDetalleReg {
    CURRENT                    : Boolean default true;
    REGDATE                   : Timestamp;
    REGTIME                   : Timestamp;
    REGUSER                   : String;
}
