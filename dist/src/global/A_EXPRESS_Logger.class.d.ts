import { A_SDK_DefaultLogger } from "@adaas/a-sdk-types";
export declare class A_EXPRESS_Logger extends A_SDK_DefaultLogger {
    metrics(): void;
    routes(routes: Array<{
        method: string;
        path: string;
    }>): void;
    route(route: {
        method: string;
        url: string;
        status: number;
        responseTime: string;
    }): void;
    serverReady(params: {
        port: number;
        app: {
            name: string;
            version: string;
        };
    }): void;
}
