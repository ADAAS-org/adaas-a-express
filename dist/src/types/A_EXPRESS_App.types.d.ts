import { A_SDK_TYPES__ContextConstructor } from "@adaas/a-sdk-types/dist/src/types/A_SDK_Context.types";
import { A_EXPRESS_TYPES__PossibleControllers } from "../decorators/Route.decorator";
import { CorsOptions } from "cors";
import { A_ARC_Permission } from "@adaas/a-arc";
export type A_EXPRESS_TYPES__AppConfig = {
    port: number;
    prefix: string;
    cors: {
        options: CorsOptions;
    };
    permissions: Array<A_ARC_Permission>;
    routes: Array<{
        version: string;
        controllers: Array<A_EXPRESS_TYPES__PossibleControllers>;
    }>;
    defaults: {
        permissions: {
            migrate: boolean;
        };
        health: {
            exclude: boolean;
            versionPath: string;
            verbose: boolean;
        };
        auth: {
            exclude: boolean;
        };
    };
} & A_SDK_TYPES__ContextConstructor;
