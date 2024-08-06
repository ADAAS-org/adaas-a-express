import { A_AUTH_ContextClass } from "@adaas/a-auth";
/**
 * Global AUTH Context for the A-Account SDKs
 */
export declare class A_EXPRESS_ContextClass extends A_AUTH_ContextClass {
    protected accountContextAllowedProperties: readonly ["CONFIG_SDK_VALIDATION", "CONFIG_VERBOSE", "CONFIG_IGNORE_ERRORS", "SSO_LOCATION", "ENABLE_AUTH"];
    constructor();
    getConfigurationProperty<T = any>(property: typeof this.accountContextAllowedProperties[number]): T;
}
export declare const A_EXPRESS_Context: A_EXPRESS_ContextClass;
