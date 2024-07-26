import { A_SDK_ContextClass, A_SDK_Error, A_SDK_TYPES__DeepPartial } from "@adaas/a-sdk-types";
import { A_EXPRESS_TYPES__AppConfig } from "../types/A_EXPRESS_App.types";
import express from 'express';
import { Server } from "http";
export declare class A_EXPRESS_App extends A_SDK_ContextClass {
    config: A_EXPRESS_TYPES__AppConfig;
    readonly app: import("express-serve-static-core").Express;
    readonly routers: Map<string, express.Router>;
    private _permissions;
    constructor(config?: A_SDK_TYPES__DeepPartial<A_EXPRESS_TYPES__AppConfig>);
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
    protected afterStart(): Promise<void>;
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
}
