
export enum A_EXPRESS_CONSTANTS__ERROR_CODES {
    OVERRIDE_METHOD_OR_PROVIDE_REPOSITORY = 'ERR-500-0001',
    ENTITY_NOT_FOUND = 'ERR-404-0001',
    SERVICE_CONTROLLER_ENTITY_NOT_SPECIFIED = 'ERR-500-0002',
    INCORRECT_VERSION_PATH_FOR_HEALTH_CONTROLLER = 'ERR-500-0003',
    DEFAULT_ROUTER_INITIALIZATION_ERROR = 'ERR-500-0004',
    AUTH_CONTROLLER_REDIRECT_URL_NOT_SPECIFIED = 'ERR-500-0005',
    INVALID_ROUTE_DECORATOR_PARAMS = 'ERR-500-0006',
    UNABLE_TO_PROXY_REQUEST = 'ERR-500-0007',
    INVALID_TOKEN_TYPE_FOR_APP_INTERACTION = 'ERR-401-0001',
    INVALID_TOKEN_TYPE_FOR_SERVER_COMMANDS = 'ERR-401-0002',
    INVALID_TOKEN_TYPE_FOR_SERVER_DELEGATE = 'ERR-401-0003',
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
        message: 'Version path for the health controller is incorrect.'
    },
    DEFAULT_ROUTER_INITIALIZATION_ERROR: {
        serverCode: 500,
        code: A_EXPRESS_CONSTANTS__ERROR_CODES.DEFAULT_ROUTER_INITIALIZATION_ERROR,
        description: 'The default router initialization error. Please make sure that all necessary parameters are provided and mandatory methods overwritten correctly. ',
        message: 'Oops... Something went wrong'
    },
    AUTH_CONTROLLER_REDIRECT_URL_NOT_SPECIFIED: {
        serverCode: 500,
        code: A_EXPRESS_CONSTANTS__ERROR_CODES.AUTH_CONTROLLER_REDIRECT_URL_NOT_SPECIFIED,
        description: 'The redirect URL is not specified in the auth controller configuration.',
        message: 'Oops... Something went wrong'
    },
    INVALID_ROUTE_DECORATOR_PARAMS: {
        serverCode: 500,
        code: A_EXPRESS_CONSTANTS__ERROR_CODES.INVALID_ROUTE_DECORATOR_PARAMS,
        description: 'The route decorator parameters are invalid.',
        message: 'The route decorator parameters are invalid or not provided.'
    },
    UNABLE_TO_PROXY_REQUEST: {
        serverCode: 500,
        code: A_EXPRESS_CONSTANTS__ERROR_CODES.UNABLE_TO_PROXY_REQUEST,
        description: 'The tyarget request can not be proxied. Please check the request and try again.',
        message: 'The request is unable to be proxied.'
    },
    INVALID_TOKEN_TYPE_FOR_APP_INTERACTION: {
        serverCode: 401,
        code: A_EXPRESS_CONSTANTS__ERROR_CODES.INVALID_TOKEN_TYPE_FOR_APP_INTERACTION,
        description: 'The token type for the app interaction is invalid.',
        message: 'The token is used to access app-interactions method is not for this kind of operations.'
    },
    INVALID_TOKEN_TYPE_FOR_SERVER_COMMANDS: {
        serverCode: 401,
        code: A_EXPRESS_CONSTANTS__ERROR_CODES.INVALID_TOKEN_TYPE_FOR_SERVER_COMMANDS,
        description: 'The token type for the server commands is invalid.',
        message: 'The token is used to access server-commands method is not for this kind of operations.'
    },
    INVALID_TOKEN_TYPE_FOR_SERVER_DELEGATE: {
        serverCode: 401,
        code: A_EXPRESS_CONSTANTS__ERROR_CODES.INVALID_TOKEN_TYPE_FOR_SERVER_DELEGATE,
        description: 'The token type for the server delegate is invalid.',
        message: 'The token is used to access server-delegate method is not for this kind of operations.'
    },

}