import {
    A_SDK_CommonHelper,
    A_SDK_CONSTANTS__ERROR_CODES,
    A_SDK_Context,
    A_SDK_ContextClass,
    A_SDK_Error,
    A_SDK_ErrorsProvider,
    A_SDK_TYPES__DeepPartial,
    A_SDK_TYPES__Required
} from "@adaas/a-sdk-types";
import { A_EXPRESS_TYPES__AppManifest } from "../types/A_EXPRESS_App.types";
import express, { Router } from 'express';
import cors from 'cors';
import os from 'os';
import process from 'process';
import { createServer, Server } from "http";
import { A_EXPRESS_Routes } from "../decorators/Routes.decorator";
// import { A_EXPRESS_HealthController } from "../controllers/A_EXPRESS_HealthController.class";
// import { A_EXPRESS_AuthController } from "../controllers/A_EXPRESS_AuthController.class";
import { A_EXPRESS_CONSTANTS__ERROR_CODES } from "../constants/errors.constants";
import { A_ARC_Context, A_ARC_Permission, A_ARC_ServerCommands } from "@adaas/a-arc";
import { A_EXPRESS_DEFAULTS__APP_CONFIG } from "../defaults/A_EXPRESS_App.defaults";
import { A_EXPRESS_ErrorsMiddleware } from "../middleware/A_EXPRESS_Error.middleware";
import { A_EXPRESS_RouterHelper } from "../helpers/router.helper";
import { A_EXPRESS_Logger } from "./A_EXPRESS_Logger.class";
import { A_EXPRESS_LoggerMiddleware } from "../middleware/A_EXPRESS_Logger.middleware";
import { A_AUTH_Context } from "@adaas/a-auth";
import { A_EXPRESS_Context } from "./A_EXPRESS_Context.class";




export class A_EXPRESS_App extends A_SDK_ContextClass {

    config!: A_EXPRESS_TYPES__AppManifest

    app = express();
    routers = new Map<string, Router>();

    Logger!: A_EXPRESS_Logger;

    private _permissions: Array<A_ARC_Permission> = [];

    private monitoringInterval: NodeJS.Timeout | null = null;


    constructor(config?: A_SDK_TYPES__Required<
        A_SDK_TYPES__DeepPartial<A_EXPRESS_TYPES__AppManifest>,
        ['app', 'context']
    >) {
        super({
            namespace: config?.context?.namespace || A_EXPRESS_DEFAULTS__APP_CONFIG.context.namespace,
            // TODO: fix whenever time comes
            errors: (config as any)?.errors || A_EXPRESS_DEFAULTS__APP_CONFIG.context.errors
        })

        this.config = A_SDK_CommonHelper.deepMerge(
            A_EXPRESS_DEFAULTS__APP_CONFIG,
            config || {}
        );

        //Initialize default router
        this.routers.set(`${this.config.http.prefix}/v1`, Router({
            caseSensitive: true,
            mergeParams: true,
            strict: true
        }));


        this._permissions = this.config.permissions;

        this.defaultInit()
    }

    protected defaultInit() {
        this.Logger = new A_EXPRESS_Logger({
            verbose: this.CONFIG_VERBOSE,
            ignoreErrors: this.CONFIG_IGNORE_ERRORS,
            namespace: this.namespace
        });

        this.Errors = new A_SDK_ErrorsProvider({
            namespace: this.namespace,
            errors: this.params.errors
        });


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

        // First await rediness of the SDKs
        await A_SDK_Context.ready
        await A_ARC_Context.ready
        await A_AUTH_Context.ready   
        await A_EXPRESS_Context.ready
        
        await this.ready;


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
                this.onExit(new A_SDK_Error(targetError));
            });


        // ==================== Run before start hook

        this.Logger.log('Before start hook execution...')

        await this.beforeStart();

        this.Logger.log('Before start hook executed successfully')

        // ==================== Migrate permissions
        if (this.config.defaults.permissions.migrate && this._permissions.length > 0) {

            this.Logger.log('Migrating permissions...')

            await A_ARC_ServerCommands.Permission.migrate({
                permissions: this._permissions.map(permission => permission.toJSON())
            });

            this.Logger.log('Permissions migrated successfully')
        }

        this.app.use('/', cors(this.config.http.cors.options));

        this.app.use(
            A_EXPRESS_LoggerMiddleware.logRequest({
                ignore: this.config.defaults.health.verbose
                    ? [] : [`${this.config.http.prefix}/v1/health`]
            }) as any
        );

        // app.engine('html', require('ejs').renderFile)

        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));

        // set default handler to pass context

        this.app.use((req, res, next) => {
            (req as any).adaas = {
                context: this
            };
            next();
        });

        // ==================== Prepare routes

        await this.prepareRoutes();

        for (const [key, router] of this.routers) {
            this.app.use(key, router)
        }

        const router = Router()

        router.post('/foo/bar', (req, res) => { res.send('Hello World!') });

        this.app.use('/foo', router)

        const routes = A_EXPRESS_RouterHelper.getRotes(this.app);

        this.Logger.routes(routes);

        this.Logger.log('Routes initialized successfully');

        // catch 404 and forward to error handler
        this.app.use((req, res, next) => {
            return next(this.Errors.getError(A_SDK_CONSTANTS__ERROR_CODES.ROUTE_NOT_FOUND));
        });

        this.app.use(A_EXPRESS_ErrorsMiddleware.handleError as any)


        // this.monitoringInterval = setInterval(() => {
        //     this.displayMonitoringInfo();
        // }, 10000);

        return await createServer(this.app)
            .listen(
                this.config.http.port,
                async () => {

                    await this.afterStart();

                    this.Logger.log('After start hook executed successfully')

                    this.Logger.serverReady({
                        port: this.config.http.port,
                        app:{
                            name: this.config.app.name,
                            version: this.config.app.version
                        }
                    })

                }
            );
    }

    async onExit(error?: A_SDK_Error) {
        this.Logger.log('Server is shutting down...')

        if (this.monitoringInterval)
            clearInterval(this.monitoringInterval);

        if (!this.CONFIG_IGNORE_ERRORS)
            process.exit(error ? 1 : 0);
    }


    private async prepareRoutes() {
        const defaultRouter = this.routers.get(`${this.config.http.prefix}/v1`);

        if (!defaultRouter)
            this.Errors.throw(A_EXPRESS_CONSTANTS__ERROR_CODES.DEFAULT_ROUTER_INITIALIZATION_ERROR)

        if (this.config.defaults.health.enable) {
            const { A_EXPRESS_HealthController } = await import('../controllers/A_EXPRESS_HealthController.class');

            defaultRouter.use('/', A_EXPRESS_Routes([new A_EXPRESS_HealthController({
                versionPath: this.config.defaults.health.versionPath,
                exposedProperties: this.config.defaults.health.exposedProperties
            })], this));
        }

        if (this.config.defaults.auth.enable) {
            const { A_EXPRESS_AuthController } = await import('../controllers/A_EXPRESS_AuthController.class');

            defaultRouter.use('/', A_EXPRESS_Routes([new A_EXPRESS_AuthController({
                redirectUrl: this.config.defaults.auth.redirectUrl
            })], this));
        }



        for (const route of this.config.routes) {
            const targetRouter = this.routers.get(`${this.config.http.prefix}/${route.version}`) || Router({
                caseSensitive: true,
                mergeParams: true,
                strict: true
            });

            targetRouter.use('/', A_EXPRESS_Routes(route.controllers, this));

            this.routers.set(`${this.config.http.prefix}/${route.version}`, targetRouter);
        }
    }




    protected displayMonitoringInfo() {
        const processInfo = this.getNodeProcessInfo();

        this.Logger.log(` Process ID: ${processInfo.processId}
Memory Usage: ${JSON.stringify(processInfo.memoryUsage)}
CPU Load: ${JSON.stringify(processInfo.cpuLoad)}
Uptime: ${processInfo.uptime}
Platform: ${processInfo.platform} `)
    }



    protected getNodeProcessInfo() {
        // Get memory usage
        const memoryUsage = process.memoryUsage();
        const memoryUsageInMB = {
            rss: (memoryUsage.rss / 1024 / 1024).toFixed(2) + ' MB', // Resident Set Size
            heapTotal: (memoryUsage.heapTotal / 1024 / 1024).toFixed(2) + ' MB',
            heapUsed: (memoryUsage.heapUsed / 1024 / 1024).toFixed(2) + ' MB',
            external: (memoryUsage.external / 1024 / 1024).toFixed(2) + ' MB',
        };

        // Get CPU load
        const cpus = os.cpus();
        const cpuLoad = cpus.map((cpu, index) => {
            const times = cpu.times;
            const total = times.user + times.nice + times.sys + times.idle + times.irq;
            return {
                core: index,
                load: {
                    user: ((times.user / total) * 100).toFixed(2) + '%',
                    nice: ((times.nice / total) * 100).toFixed(2) + '%',
                    sys: ((times.sys / total) * 100).toFixed(2) + '%',
                    idle: ((times.idle / total) * 100).toFixed(2) + '%',
                    irq: ((times.irq / total) * 100).toFixed(2) + '%',
                }
            };
        });

        // Get uptime
        const uptime = process.uptime();
        const uptimeInHours = (uptime / 3600).toFixed(2) + ' hours';

        // Get platform and version
        const platform = process.platform;
        const nodeVersion = process.version;

        // Get process ID
        const processId = process.pid;

        // Get process title
        const processTitle = process.title;

        // Get the current working directory
        const cwd = process.cwd();

        // Get environment variables
        const env = process.env;

        return {
            memoryUsage: memoryUsageInMB,
            cpuLoad,
            uptime: uptimeInHours,
            platform,
            nodeVersion,
            processId,
            processTitle,
            cwd,
            env,
        };
    }

}

