import { A_SDK_TYPES__ContextConstructor } from "@adaas/a-sdk-types/dist/src/types/A_SDK_Context.types";
import { A_EXPRESS_TYPES__PossibleControllers } from "../decorators/Route.decorator";


export type A_EXPRESS_TYPES__AppConfig = {
    port: number;
    prefix: string;
    routes: Array<{
        version: string;
        controllers: Array<A_EXPRESS_TYPES__PossibleControllers>
    }>
    defaults: {
        ignoreHealth: boolean;
        exclude: {
            health: boolean;
            auth: boolean;
            metrics: boolean;
        }
    }
} & A_SDK_TYPES__ContextConstructor