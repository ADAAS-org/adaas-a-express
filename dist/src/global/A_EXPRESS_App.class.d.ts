import { A_SDK_ContextClass, A_SDK_Error, A_SDK_TYPES__DeepPartial, A_SDK_TYPES__Required } from "@adaas/a-sdk-types";
import { A_EXPRESS_TYPES__AppManifest } from "../types/A_EXPRESS_App.types";
import express from 'express';
import { Server } from "http";
import { A_EXPRESS_Logger } from "./A_EXPRESS_Logger.class";
export declare class A_EXPRESS_App extends A_SDK_ContextClass {
    config: A_EXPRESS_TYPES__AppManifest;
    app: import("express-serve-static-core").Express;
    server: Server;
    routers: Map<string, express.Router>;
    Logger: A_EXPRESS_Logger;
    private _permissions;
    private monitoringInterval;
    constructor(config?: A_SDK_TYPES__Required<A_SDK_TYPES__DeepPartial<A_EXPRESS_TYPES__AppManifest>, [
        'app',
        'context'
    ]>);
    protected defaultInit(): void;
    /**
     * Method that is executed before the server starts
     * Could be used to set up some initial configurations
     *
     * @returns
     */
    protected beforeStart(): Promise<void>;
    /**
     * Method that is executed after the server starts
     * Could be used to set up some initial configurations or to run some initial tasks
     *
     * @returns
     */
    protected afterStart(server: Server): Promise<void>;
    /**
     * This method starts the server and executes all the necessary steps such as:
     *  - setting up routes
     *  - setting up error handlers
     *  - setting up middlewares
     *  - setting up logging
     *
     * @returns
     */
    start(): Promise<Server>;
    onExit(error?: A_SDK_Error): Promise<void>;
    private prepareRoutes;
    protected displayMonitoringInfo(): void;
    protected getNodeProcessInfo(): {
        memoryUsage: {
            rss: string;
            heapTotal: string;
            heapUsed: string;
            external: string;
        };
        cpuLoad: {
            core: number;
            load: {
                user: string;
                nice: string;
                sys: string;
                idle: string;
                irq: string;
            };
        }[];
        uptime: string;
        platform: NodeJS.Platform;
        nodeVersion: string;
        processId: number;
        processTitle: string;
        cwd: string;
        env: NodeJS.ProcessEnv;
    };
}
