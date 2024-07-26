import {
    A_SDK_CommonHelper,
    A_SDK_CONSTANTS__ERROR_CODES,
    A_SDK_ContextClass,
    A_SDK_Error,
    A_SDK_TYPES__DeepPartial
} from "@adaas/a-sdk-types";
import { A_EXPRESS_TYPES__AppConfig } from "../types/A_EXPRESS_App.types";
import { A_EXPRESS_DEFAULTS__APP_CONFIG } from "src/default/A_EXPRESS_App.defaults";
import express, { Router } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { A_EXPRESS_ErrorsMiddleware } from "src/middleware/A_EXPRESS_Error.middleware";
import { createServer, Server } from "http";
import { A_EXPRESS_Routes } from "../decorators/Route.decorator";
import { A_EXPRESS_HealthController } from "./A_EXPRESS_HealthRouter.class";
import { A_EXPRESS_AuthController } from "./A_EXPRESS_AuthController.class";
import { A_EXPRESS_CONSTANTS__ERROR_CODES } from "../constants/errors.constants";


export class A_EXPRESS_App extends A_SDK_ContextClass {

    config!: A_EXPRESS_TYPES__AppConfig

    readonly app = express();
    readonly routers = new Map<string, Router>();


    constructor(config?: A_SDK_TYPES__DeepPartial<A_EXPRESS_TYPES__AppConfig>) {
        super({
            namespace: config?.namespace || 'a-express',
            // TODO: fix whenever time comes
            errors: (config as any)?.errors || []
        })

        this.config = A_SDK_CommonHelper.deepMerge(
            A_EXPRESS_DEFAULTS__APP_CONFIG,
            config || {}
        );

        //Initialize default router
        this.routers.set(`${this.config.prefix}/v1`, Router({
            caseSensitive: true,
            mergeParams: true,
            strict: true
        }));
    }


    /**
     * Method that is executed before the server starts
     * Could be used to set up some initial configurations
     * 
     * @returns 
     */
    protected async beforeStart(): Promise<void> {
        return;
    }


    /**
     * Method that is executed after the server starts
     * Could be used to set up some initial configurations or to run some initial tasks
     * 
     * @returns 
     */
    protected async afterStart(): Promise<void> {
        return;
    }


    /**
     * This method starts the server and executes all the necessary steps such as:
     *  - setting up routes
     *  - setting up error handlers
     *  - setting up middlewares
     *  - setting up logging
     * 
     * @returns 
     */
    async start(): Promise<Server> {

        if (!this.CONFIG_IGNORE_ERRORS)
            process.on('unhandledRejection', (reason, promise) => {
                this.Logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
                // Application specific logging, throwing an error, or other logic here
                this.onExit();
            });

        if (!this.CONFIG_IGNORE_ERRORS)
            process.on('uncaughtException', (error) => {
                const targetError = new A_SDK_Error(error);

                this.Logger.error(targetError);
                // process.exit(1); // exit application
                this.onExit(new A_SDK_Error(targetError));
            });

        await this.beforeStart();

        this.app.use('/', cors());

        this.app.use(morgan('combined', {
            skip: (req) => this.config.defaults.ignoreHealth ? req.baseUrl === '/api/v1/health' : false
        }));

        // app.engine('html', require('ejs').renderFile)

        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));


        this.prepareRoutes();

        for (const [key, router] of this.routers) {
            this.app.use(`/${key}`, router)
        }

        // catch 404 and forward to error handler
        this.app.use((req, res, next) => {
            return next(this.Errors.getError(A_SDK_CONSTANTS__ERROR_CODES.ROUTE_NOT_FOUND));
        });

        this.app.use(A_EXPRESS_ErrorsMiddleware.handleError as any)


        return await createServer(this.app)
            .listen(
                this.config.port,
                async () => {
                    this.Logger.log(`Server running on port ${this.config.port}`)
                    await this.afterStart();
                }
            );
    }

    async onExit(error?: A_SDK_Error) {
        this.Logger.log('Server is shutting down')

        if (!this.CONFIG_IGNORE_ERRORS)
            process.exit(error ? 1 : 0);
    }


    private prepareRoutes() {
        const defaultRouter = this.routers.get(`${this.config.prefix}/v1`);

        if (!defaultRouter)
            this.Errors.throw(A_EXPRESS_CONSTANTS__ERROR_CODES.DEFAULT_ROUTER_INITIALIZATION_ERROR)

        if (!this.config.defaults.exclude.health) {
            defaultRouter.use('/health', A_EXPRESS_Routes([A_EXPRESS_HealthController]));
        }

        if (!this.config.defaults.exclude.auth) {
            defaultRouter.use('/auth', A_EXPRESS_Routes([A_EXPRESS_AuthController]));
        }


        for (const route of this.config.routes) {
            const targetRouter = this.routers.get(`${this.config.prefix}/${route.version}`) || Router({
                caseSensitive: true,
                mergeParams: true,
                strict: true
            });

            targetRouter.use('/', A_EXPRESS_Routes(route.controllers));

            this.routers.set(`${this.config.prefix}/${route.version}`, targetRouter);
        }
    }

}


new A_EXPRESS_App().start()