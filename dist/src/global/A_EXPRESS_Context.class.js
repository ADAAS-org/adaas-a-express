"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.A_EXPRESS_Context = exports.A_EXPRESS_ContextClass = void 0;
const a_auth_1 = require("@adaas/a-auth");
const a_sdk_types_1 = require("@adaas/a-sdk-types");
const errors_constants_1 = require("../constants/errors.constants");
/**
 * Global AUTH Context for the A-Account SDKs
 */
class A_EXPRESS_ContextClass extends a_auth_1.A_AUTH_ContextClass {
    constructor() {
        super({
            namespace: 'a-express',
            errors: errors_constants_1.A_EXPRESS_CONSTANTS__DEFAULT_ERRORS
        });
        this.accountContextAllowedProperties = [
            ...this.authContextAllowedProperties,
        ];
    }
    getConfigurationProperty(property) {
        if (this.accountContextAllowedProperties.includes(property))
            return this[property];
        else
            this.Errors.throw(a_sdk_types_1.A_SDK_CONSTANTS__ERROR_CODES.CONFIGURATION_PROPERTY_NOT_EXISTS_OR_NOT_ALLOWED_TO_READ);
    }
}
exports.A_EXPRESS_ContextClass = A_EXPRESS_ContextClass;
exports.A_EXPRESS_Context = new A_EXPRESS_ContextClass();
//# sourceMappingURL=A_EXPRESS_Context.class.js.map