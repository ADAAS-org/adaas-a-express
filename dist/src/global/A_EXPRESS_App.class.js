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
const A_EXPRESS_App_defaults_1 = require("src/default/A_EXPRESS_App.defaults");
const express_1 = __importStar(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const A_EXPRESS_Error_middleware_1 = require("src/middleware/A_EXPRESS_Error.middleware");
const http_1 = require("http");
const Route_decorator_1 = require("../decorators/Route.decorator");
const A_EXPRESS_HealthRouter_class_1 = require("./A_EXPRESS_HealthRouter.class");
const A_EXPRESS_AuthController_class_1 = require("./A_EXPRESS_AuthController.class");
const errors_constants_1 = require("../constants/errors.constants");
const a_arc_1 = require("@adaas/a-arc");
class A_EXPRESS_App extends a_sdk_types_1.A_SDK_ContextClass {
    constructor(config) {
        super({
            namespace: (config === null || config === void 0 ? void 0 : config.namespace) || 'a-express',
            // TODO: fix whenever time comes
            errors: (config === null || config === void 0 ? void 0 : config.errors) || []
        });
        this.app = (0, express_1.default)();
        this.routers = new Map();
        this._permissions = [];
        this.config = a_sdk_types_1.A_SDK_CommonHelper.deepMerge(A_EXPRESS_App_defaults_1.A_EXPRESS_DEFAULTS__APP_CONFIG, config || {});
        //Initialize default router
        this.routers.set(`${this.config.prefix}/v1`, (0, express_1.Router)({
            caseSensitive: true,
            mergeParams: true,
            strict: true
        }));
        this._permissions = this.config.permissions;
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
                process.on('unhandledRejection', (reason, promise) => {
                    this.Logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
                    // Application specific logging, throwing an error, or other logic here
                    this.onExit();
                });
            if (!this.CONFIG_IGNORE_ERRORS)
                process.on('uncaughtException', (error) => {
                    const targetError = new a_sdk_types_1.A_SDK_Error(error);
                    this.Logger.error(targetError);
                    // process.exit(1); // exit application
                    this.onExit(new a_sdk_types_1.A_SDK_Error(targetError));
                });
            this.Logger.log('Before start hook execution...');
            yield this.beforeStart();
            this.Logger.log('Before start hook executed successfully');
            this.Logger.log('Migrating permissions...');
            yield a_arc_1.A_ARC_ServerCommands.Permission.migrate({
                permissions: this._permissions.map(permission => permission.toJSON())
            });
            this.Logger.log('Permissions migrated successfully');
            this.app.use('/', (0, cors_1.default)(this.config.cors.options));
            this.app.use((0, morgan_1.default)('combined', {
                skip: (req) => this.config.defaults.ignoreHealth ? req.baseUrl === '/api/v1/health' : false
            }));
            // app.engine('html', require('ejs').renderFile)
            this.app.use(express_1.default.json());
            this.app.use(express_1.default.urlencoded({ extended: true }));
            this.prepareRoutes();
            for (const [key, router] of this.routers) {
                this.app.use(key, router);
            }
            this.Logger.log('Routes initialized successfully');
            // catch 404 and forward to error handler
            this.app.use((req, res, next) => {
                return next(this.Errors.getError(a_sdk_types_1.A_SDK_CONSTANTS__ERROR_CODES.ROUTE_NOT_FOUND));
            });
            this.app.use(A_EXPRESS_Error_middleware_1.A_EXPRESS_ErrorsMiddleware.handleError);
            return yield (0, http_1.createServer)(this.app)
                .listen(this.config.port, () => __awaiter(this, void 0, void 0, function* () {
                this.Logger.log(`Server running on port ${this.config.port}`);
                yield this.afterStart();
                this.Logger.log('After start hook executed successfully');
            }));
        });
    }
    onExit(error) {
        return __awaiter(this, void 0, void 0, function* () {
            this.Logger.log('Server is shutting down...');
            if (!this.CONFIG_IGNORE_ERRORS)
                process.exit(error ? 1 : 0);
        });
    }
    prepareRoutes() {
        const defaultRouter = this.routers.get(`${this.config.prefix}/v1`);
        if (!defaultRouter)
            this.Errors.throw(errors_constants_1.A_EXPRESS_CONSTANTS__ERROR_CODES.DEFAULT_ROUTER_INITIALIZATION_ERROR);
        if (!this.config.defaults.exclude.health) {
            defaultRouter.use('/health', (0, Route_decorator_1.A_EXPRESS_Routes)([A_EXPRESS_HealthRouter_class_1.A_EXPRESS_HealthController]));
        }
        if (!this.config.defaults.exclude.auth) {
            defaultRouter.use('/auth', (0, Route_decorator_1.A_EXPRESS_Routes)([A_EXPRESS_AuthController_class_1.A_EXPRESS_AuthController]));
        }
        for (const route of this.config.routes) {
            const targetRouter = this.routers.get(`${this.config.prefix}/${route.version}`) || (0, express_1.Router)({
                caseSensitive: true,
                mergeParams: true,
                strict: true
            });
            targetRouter.use('/', (0, Route_decorator_1.A_EXPRESS_Routes)(route.controllers));
            this.routers.set(`${this.config.prefix}/${route.version}`, targetRouter);
        }
    }
}
exports.A_EXPRESS_App = A_EXPRESS_App;
//# sourceMappingURL=A_EXPRESS_App.class.js.map