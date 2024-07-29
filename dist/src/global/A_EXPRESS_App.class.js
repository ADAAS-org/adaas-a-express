"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.A_EXPRESS_App = void 0;
const a_sdk_types_1 = require("@adaas/a-sdk-types");
const express_1 = __importStar(require("express"));
const cors_1 = __importDefault(require("cors"));
const os_1 = __importDefault(require("os"));
const process_1 = __importDefault(require("process"));
const http_1 = require("http");
const Routes_decorator_1 = require("../decorators/Routes.decorator");
// import { A_EXPRESS_HealthController } from "../controllers/A_EXPRESS_HealthController.class";
// import { A_EXPRESS_AuthController } from "../controllers/A_EXPRESS_AuthController.class";
const errors_constants_1 = require("../constants/errors.constants");
const a_arc_1 = require("@adaas/a-arc");
const A_EXPRESS_App_defaults_1 = require("../defaults/A_EXPRESS_App.defaults");
const A_EXPRESS_Error_middleware_1 = require("../middleware/A_EXPRESS_Error.middleware");
const router_helper_1 = require("../helpers/router.helper");
const A_EXPRESS_Logger_class_1 = require("./A_EXPRESS_Logger.class");
const A_EXPRESS_Logger_middleware_1 = require("../middleware/A_EXPRESS_Logger.middleware");
const a_auth_1 = require("@adaas/a-auth");
const A_EXPRESS_Context_class_1 = require("./A_EXPRESS_Context.class");
class A_EXPRESS_App extends a_sdk_types_1.A_SDK_ContextClass {
    constructor(config) {
        var _a;
        super({
            namespace: ((_a = config === null || config === void 0 ? void 0 : config.context) === null || _a === void 0 ? void 0 : _a.namespace) || A_EXPRESS_App_defaults_1.A_EXPRESS_DEFAULTS__APP_CONFIG.context.namespace,
            // TODO: fix whenever time comes
            errors: (config === null || config === void 0 ? void 0 : config.errors) || A_EXPRESS_App_defaults_1.A_EXPRESS_DEFAULTS__APP_CONFIG.context.errors
        });
        this.app = (0, express_1.default)();
        this.routers = new Map();
        this._permissions = [];
        this.monitoringInterval = null;
        this.config = a_sdk_types_1.A_SDK_CommonHelper.deepMerge(A_EXPRESS_App_defaults_1.A_EXPRESS_DEFAULTS__APP_CONFIG, config || {});
        //Initialize default router
        this.routers.set(`${this.config.http.prefix}/v1`, (0, express_1.Router)({
            caseSensitive: true,
            mergeParams: true,
            strict: true
        }));
        this._permissions = this.config.permissions;
        this.defaultInit();
    }
    defaultInit() {
        this.Logger = new A_EXPRESS_Logger_class_1.A_EXPRESS_Logger({
            verbose: this.CONFIG_VERBOSE,
            ignoreErrors: this.CONFIG_IGNORE_ERRORS,
            namespace: this.namespace
        });
        this.Errors = new a_sdk_types_1.A_SDK_ErrorsProvider({
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
    beforeStart() {
        return __awaiter(this, void 0, void 0, function* () {
            return;
        });
    }
    /**
     * Method that is executed after the server starts
     * Could be used to set up some initial configurations or to run some initial tasks
     *
     * @returns
     */
    afterStart() {
        return __awaiter(this, void 0, void 0, function* () {
            return;
        });
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
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.CONFIG_IGNORE_ERRORS)
                process_1.default.on('unhandledRejection', (reason, promise) => {
                    this.Logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
                    // Application specific logging, throwing an error, or other logic here
                    this.onExit();
                });
            if (!this.CONFIG_IGNORE_ERRORS)
                process_1.default.on('uncaughtException', (error) => {
                    const targetError = new a_sdk_types_1.A_SDK_Error(error);
                    this.Logger.error(targetError);
                    this.onExit(new a_sdk_types_1.A_SDK_Error(targetError));
                });
            // First await rediness of the SDKs
            yield a_sdk_types_1.A_SDK_Context.ready;
            yield a_arc_1.A_ARC_Context.ready;
            yield a_auth_1.A_AUTH_Context.ready;
            yield A_EXPRESS_Context_class_1.A_EXPRESS_Context.ready;
            yield this.ready;
            // ==================== Run before start hook
            this.Logger.log('Before start hook execution...');
            yield this.beforeStart();
            this.Logger.log('Before start hook executed successfully');
            // ==================== Migrate permissions
            if (this.config.defaults.permissions.migrate && this._permissions.length > 0) {
                this.Logger.log('Migrating permissions...');
                yield a_arc_1.A_ARC_ServerCommands.Permission.migrate({
                    permissions: this._permissions.map(permission => permission.toJSON())
                });
                this.Logger.log('Permissions migrated successfully');
            }
            this.app.use('/', (0, cors_1.default)(this.config.http.cors.options));
            this.app.use(A_EXPRESS_Logger_middleware_1.A_EXPRESS_LoggerMiddleware.logRequest({
                ignore: this.config.defaults.health.verbose
                    ? [] : [`${this.config.http.prefix}/v1/health`]
            }));
            // app.engine('html', require('ejs').renderFile)
            this.app.use(express_1.default.json());
            this.app.use(express_1.default.urlencoded({ extended: true }));
            // set default handler to pass context
            this.app.use((req, res, next) => {
                req.adaas = {
                    context: this
                };
                next();
            });
            // ==================== Prepare routes
            yield this.prepareRoutes();
            for (const [key, router] of this.routers) {
                this.app.use(key, router);
            }
            const routes = router_helper_1.A_EXPRESS_RouterHelper.getRotes(this.app);
            this.Logger.routes(routes);
            this.Logger.log('Routes initialized successfully');
            // catch 404 and forward to error handler
            this.app.use((req, res, next) => {
                return next(this.Errors.getError(a_sdk_types_1.A_SDK_CONSTANTS__ERROR_CODES.ROUTE_NOT_FOUND));
            });
            this.app.use(A_EXPRESS_Error_middleware_1.A_EXPRESS_ErrorsMiddleware.handleError);
            // this.monitoringInterval = setInterval(() => {
            //     this.displayMonitoringInfo();
            // }, 10000);
            return yield (0, http_1.createServer)(this.app)
                .listen(this.config.http.port, () => __awaiter(this, void 0, void 0, function* () {
                yield this.afterStart();
                this.Logger.log('After start hook executed successfully');
                this.Logger.serverReady({
                    port: this.config.http.port,
                    app: {
                        name: this.config.app.name,
                        version: this.config.app.version
                    }
                });
            }));
        });
    }
    onExit(error) {
        return __awaiter(this, void 0, void 0, function* () {
            this.Logger.log('Server is shutting down...');
            if (this.monitoringInterval)
                clearInterval(this.monitoringInterval);
            if (!this.CONFIG_IGNORE_ERRORS)
                process_1.default.exit(error ? 1 : 0);
        });
    }
    prepareRoutes() {
        return __awaiter(this, void 0, void 0, function* () {
            const defaultRouter = this.routers.get(`${this.config.http.prefix}/v1`);
            if (!defaultRouter)
                this.Errors.throw(errors_constants_1.A_EXPRESS_CONSTANTS__ERROR_CODES.DEFAULT_ROUTER_INITIALIZATION_ERROR);
            if (this.config.defaults.health.enable) {
                const { A_EXPRESS_HealthController } = yield Promise.resolve().then(() => __importStar(require('../controllers/A_EXPRESS_HealthController.class')));
                defaultRouter.use('/', (0, Routes_decorator_1.A_EXPRESS_Routes)([new A_EXPRESS_HealthController(this, {
                        versionPath: this.config.defaults.health.versionPath,
                        exposedProperties: this.config.defaults.health.exposedProperties
                    })], this));
            }
            if (this.config.defaults.auth.enable) {
                const { A_EXPRESS_AuthController } = yield Promise.resolve().then(() => __importStar(require('../controllers/A_EXPRESS_AuthController.class')));
                defaultRouter.use('/', (0, Routes_decorator_1.A_EXPRESS_Routes)([new A_EXPRESS_AuthController(this, {
                        redirectUrl: this.config.defaults.auth.redirectUrl
                    })], this));
            }
            for (const route of this.config.routes) {
                const targetRouter = this.routers.get(`${this.config.http.prefix}/${route.version}`) || (0, express_1.Router)({
                    caseSensitive: true,
                    mergeParams: true,
                    strict: true
                });
                targetRouter.use('/', (0, Routes_decorator_1.A_EXPRESS_Routes)(route.controllers, this));
                this.routers.set(`${this.config.http.prefix}/${route.version}`, targetRouter);
            }
        });
    }
    displayMonitoringInfo() {
        const processInfo = this.getNodeProcessInfo();
        this.Logger.log(` Process ID: ${processInfo.processId}
Memory Usage: ${JSON.stringify(processInfo.memoryUsage)}
CPU Load: ${JSON.stringify(processInfo.cpuLoad)}
Uptime: ${processInfo.uptime}
Platform: ${processInfo.platform} `);
    }
    getNodeProcessInfo() {
        // Get memory usage
        const memoryUsage = process_1.default.memoryUsage();
        const memoryUsageInMB = {
            rss: (memoryUsage.rss / 1024 / 1024).toFixed(2) + ' MB', // Resident Set Size
            heapTotal: (memoryUsage.heapTotal / 1024 / 1024).toFixed(2) + ' MB',
            heapUsed: (memoryUsage.heapUsed / 1024 / 1024).toFixed(2) + ' MB',
            external: (memoryUsage.external / 1024 / 1024).toFixed(2) + ' MB',
        };
        // Get CPU load
        const cpus = os_1.default.cpus();
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
        const uptime = process_1.default.uptime();
        const uptimeInHours = (uptime / 3600).toFixed(2) + ' hours';
        // Get platform and version
        const platform = process_1.default.platform;
        const nodeVersion = process_1.default.version;
        // Get process ID
        const processId = process_1.default.pid;
        // Get process title
        const processTitle = process_1.default.title;
        // Get the current working directory
        const cwd = process_1.default.cwd();
        // Get environment variables
        const env = process_1.default.env;
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
exports.A_EXPRESS_App = A_EXPRESS_App;
//# sourceMappingURL=A_EXPRESS_App.class.js.map