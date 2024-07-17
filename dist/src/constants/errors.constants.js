"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.A_EXPRESS_CONSTANTS__DEFAULT_ERRORS = exports.A_EXPRESS_CONSTANTS__ERROR_CODES = void 0;
var A_EXPRESS_CONSTANTS__ERROR_CODES;
(function (A_EXPRESS_CONSTANTS__ERROR_CODES) {
    A_EXPRESS_CONSTANTS__ERROR_CODES["OVERRIDE_METHOD_OR_PROVIDE_REPOSITORY"] = "ERR-500-0001";
    A_EXPRESS_CONSTANTS__ERROR_CODES["ENTITY_NOT_FOUND"] = "ERR-404-0001";
    A_EXPRESS_CONSTANTS__ERROR_CODES["SERVICE_CONTROLLER_ENTITY_NOT_SPECIFIED"] = "ERR-500-0002";
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
};
//# sourceMappingURL=errors.constants.js.map