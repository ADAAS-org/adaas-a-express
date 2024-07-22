export declare enum A_EXPRESS_CONSTANTS__ERROR_CODES {
    OVERRIDE_METHOD_OR_PROVIDE_REPOSITORY = "ERR-500-0001",
    ENTITY_NOT_FOUND = "ERR-404-0001",
    SERVICE_CONTROLLER_ENTITY_NOT_SPECIFIED = "ERR-500-0002",
    INCORRECT_VERSION_PATH_FOR_HEALTH_CONTROLLER = "ERR-500-0003"
}
export declare const A_EXPRESS_CONSTANTS__DEFAULT_ERRORS: {
    OVERRIDE_METHOD_OR_PROVIDE_REPOSITORY: {
        serverCode: number;
        code: A_EXPRESS_CONSTANTS__ERROR_CODES;
        description: string;
        message: string;
    };
    ENTITY_NOT_FOUND: {
        serverCode: number;
        code: A_EXPRESS_CONSTANTS__ERROR_CODES;
        description: string;
        message: string;
    };
    SERVICE_CONTROLLER_ENTITY_NOT_SPECIFIED: {
        serverCode: number;
        code: A_EXPRESS_CONSTANTS__ERROR_CODES;
        description: string;
        message: string;
    };
    INCORRECT_VERSION_PATH_FOR_HEALTH_CONTROLLER: {
        serverCode: number;
        code: A_EXPRESS_CONSTANTS__ERROR_CODES;
        description: string;
        message: string;
    };
};
