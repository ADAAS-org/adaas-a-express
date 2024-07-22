
export enum A_EXPRESS_CONSTANTS__ERROR_CODES {
    OVERRIDE_METHOD_OR_PROVIDE_REPOSITORY = 'ERR-500-0001',
    ENTITY_NOT_FOUND = 'ERR-404-0001',
    SERVICE_CONTROLLER_ENTITY_NOT_SPECIFIED = 'ERR-500-0002',
    INCORRECT_VERSION_PATH_FOR_HEALTH_CONTROLLER = 'ERR-500-0003',
};


export const A_EXPRESS_CONSTANTS__DEFAULT_ERRORS = {
    OVERRIDE_METHOD_OR_PROVIDE_REPOSITORY: {
        serverCode: 500,
        code: A_EXPRESS_CONSTANTS__ERROR_CODES.OVERRIDE_METHOD_OR_PROVIDE_REPOSITORY,
        description: 'You should override the method or provide a repository for the controller.',
        message: 'Oops... Something went wrong'
    },
    ENTITY_NOT_FOUND: {
        serverCode: 404,
        code: A_EXPRESS_CONSTANTS__ERROR_CODES.ENTITY_NOT_FOUND,
        description: 'The entity you\'re looking for is not found.',
        message: 'The target entity is not found.'
    },
    SERVICE_CONTROLLER_ENTITY_NOT_SPECIFIED: {
        serverCode: 500,
        code: A_EXPRESS_CONSTANTS__ERROR_CODES.SERVICE_CONTROLLER_ENTITY_NOT_SPECIFIED,
        description: 'The entity is not specified in the controller configuration.',
        message: 'Oops... Something went wrong'
    },
    INCORRECT_VERSION_PATH_FOR_HEALTH_CONTROLLER: {
        serverCode: 500,
        code: A_EXPRESS_CONSTANTS__ERROR_CODES.INCORRECT_VERSION_PATH_FOR_HEALTH_CONTROLLER,
        description: 'The version path for the health controller is incorrect.',
        message: 'Oops... Something went wrong'
    },
}