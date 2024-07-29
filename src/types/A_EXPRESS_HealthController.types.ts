import { A_EXPRESS_TYPES__IControllerConfig } from "./A_EXPRESS_Controller.types";


export interface A_EXPRESS_TYPES__IHealthControllerConfig extends A_EXPRESS_TYPES__IControllerConfig {
    versionPath: string,
    exposedProperties: Array<'version' | 'author' | 'name' | 'description'>
}