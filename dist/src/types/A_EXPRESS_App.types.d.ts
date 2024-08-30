import { A_SDK_TYPES__ContextConstructor } from "@adaas/a-sdk-types/dist/src/types/A_SDK_Context.types";
import { A_EXPRESS_TYPES__PossibleControllers } from "../decorators/A_EXPRESS_Routes.decorator";
import { CorsOptions } from "cors";
import { A_ARC_Permission } from "@adaas/a-arc";
import { A_EXPRESS_TYPES__IHealthControllerConfig } from "./A_EXPRESS_HealthController.types";
import { A_SDK_TYPES__Dictionary } from "@adaas/a-sdk-types";
import { A_EXPRESS_Proxy } from "../global/A_EXPRESS_Proxy.class";
export type A_EXPRESS_TYPES__AppManifest = {
    /**
     * App information will automatically be added to the manifest
     * and will be used to display information about the app
     */
    app: {
        /**
         * Public Name of the app
         */
        name: string;
        /**
         * Version of the app
         */
        version: string;
        /**
         * Description of the app
         */
        description?: string;
        /**
         * Author of the app
         */
        author?: string;
        /**
         * License of the app
         */
        license?: string;
        /**
         * Repository of the app
         */
        repository?: string;
        /**
         * Logo of the app
         */
        logo?: string;
    };
    /**
     * Configurations for the HTTP Server
     */
    http: {
        port: number;
        prefix: string;
        cors: {
            options: CorsOptions;
        };
    };
    /**
     * Configurations for the Event Stream to enable Server Events
     */
    es: {};
    permissions: Array<A_ARC_Permission>;
    routes: Array<{
        version: string;
        controllers: Array<A_EXPRESS_TYPES__PossibleControllers<any>>;
    }>;
    proxy?: A_SDK_TYPES__Dictionary<string> | Array<A_EXPRESS_Proxy>;
    defaults: {
        permissions: {
            migrate: boolean;
        };
        health: {
            enable: boolean;
            versionPath: string;
            verbose: boolean;
            exposedProperties: A_EXPRESS_TYPES__IHealthControllerConfig['exposedProperties'];
        };
        auth: {
            enable: boolean;
            redirectUrl: string;
        };
        arc: {
            enable: boolean;
        };
        products: {
            /**
             * If Enabled will verify a product by it's API credentials and attach to the application
             */
            enabled: boolean;
        };
    };
    context: A_SDK_TYPES__ContextConstructor;
};
