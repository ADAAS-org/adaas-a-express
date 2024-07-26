"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.A_EXPRESS_CONSTANTS__DEFAULT_ERRORS = exports.A_EXPRESS_CONSTANTS__ERROR_CODES = void 0;
var A_EXPRESS_CONSTANTS__ERROR_CODES;
(function (A_EXPRESS_CONSTANTS__ERROR_CODES) {
    A_EXPRESS_CONSTANTS__ERROR_CODES["OVERRIDE_METHOD_OR_PROVIDE_REPOSITORY"] = "ERR-500-0001";
    A_EXPRESS_CONSTANTS__ERROR_CODES["ENTITY_NOT_FOUND"] = "ERR-404-0001";
    A_EXPRESS_CONSTANTS__ERROR_CODES["SERVICE_CONTROLLER_ENTITY_NOT_SPECIFIED"] = "ERR-500-0002";
    A_EXPRESS_CONSTANTS__ERROR_CODES["INCORRECT_VERSION_PATH_FOR_HEALTH_CONTROLLER"] = "ERR-500-0003";
    A_EXPRESS_CONSTANTS__ERROR_CODES["DEFAULT_ROUTER_INITIALIZATION_ERROR"] = "ERR-500-0004";
    A_EXPRESS_CONSTANTS__ERROR_CODES["INVALID_TOKEN_TYPE_FOR_APP_INTERACTION"] = "ERR-401-0001";
    A_EXPRESS_CONSTANTS__ERROR_CODES["INVALID_TOKEN_TYPE_FOR_SERVER_COMMANDS"] = "ERR-401-0002";
    A_EXPRESS_CONSTANTS__ERROR_CODES["INVALID_TOKEN_TYPE_FOR_SERVER_DELEGATE"] = "ERR-401-0003";
})(A_EXPRESS_CONSTANTS__ERROR_CODES || (exports.A_EXPRESS_CONSTANTS__ERROR_CODES = A_EXPRESS_CONSTANTS__ERROR_CODES = {}));
;
exports.A_EXPRESS_CONSTANTS__DEFAULT_ERRORS = {
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
    DEFAULT_ROUTER_INITIALIZATION_ERROR: {
        serverCode: 500,
        code: A_EXPRESS_CONSTANTS__ERROR_CODES.DEFAULT_ROUTER_INITIALIZATION_ERROR,
        description: 'The default router initialization error. Please make sure that all necessary parameters are provided and mandatory methods overwritten correctly. ',
        message: 'Oops... Something went wrong'
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
};
//# sourceMappingURL=errors.constants.js.map