import {
    A_AUTH_TYPES__IAuthenticator,
    A_AUTH_Context,
    A_AUTH_ContextClass
} from "@adaas/a-auth";
import { A_SDK_CONSTANTS__ERROR_CODES } from "@adaas/a-sdk-types";
import { A_EXPRESS_CONSTANTS__DEFAULT_ERRORS } from "../constants/errors.constants";


/**
 * Global AUTH Context for the A-Account SDKs
 */
export class A_EXPRESS_ContextClass extends A_AUTH_ContextClass {


    protected accountContextAllowedProperties = [
        ...this.authContextAllowedProperties,
    ] as const;


    constructor() {
        super({
            namespace: 'a-express',
            errors: A_EXPRESS_CONSTANTS__DEFAULT_ERRORS
        });
    }


    getConfigurationProperty<T = any>(
        property: typeof this.accountContextAllowedProperties[number]
    ): T {
        if (this.accountContextAllowedProperties.includes(property as any))
            return this[property as string] as T;
        else
            this.Errors.throw(A_SDK_CONSTANTS__ERROR_CODES.CONFIGURATION_PROPERTY_NOT_EXISTS_OR_NOT_ALLOWED_TO_READ);
    }


}


export const A_EXPRESS_Context = new A_EXPRESS_ContextClass()