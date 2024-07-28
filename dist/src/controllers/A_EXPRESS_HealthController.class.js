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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.A_EXPRESS_HealthController = void 0;
const A_EXPRESS_Context_class_1 = require("../global/A_EXPRESS_Context.class");
const errors_constants_1 = require("../constants/errors.constants");
const A_EXPRESS_Controller_class_1 = require("../global/A_EXPRESS_Controller.class");
const Methods_decorator_1 = require("../decorators/Methods.decorator");
const a_sdk_types_1 = require("@adaas/a-sdk-types");
const A_EXPRESS_Controller_defaults_1 = require("../defaults/A_EXPRESS_Controller.defaults");
class A_EXPRESS_HealthController extends A_EXPRESS_Controller_class_1.A_EXPRESS_Controller {
    constructor(config) {
        super(config);
        this.CUSTOM_CONFIG = {};
    }
    get config() {
        if (!this._compiledConfig)
            this._compiledConfig = a_sdk_types_1.A_SDK_CommonHelper.deepMerge(a_sdk_types_1.A_SDK_CommonHelper.deepMerge(Object.assign({}, A_EXPRESS_Controller_defaults_1.A_EXPRESS_DEFAULTS__CONTROLLER_CONFIG), this._constructorConfig || {}), this.CUSTOM_CONFIG);
        return this._compiledConfig;
    }
    get(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const packageJSON = yield Promise.resolve(`${this.config.versionPath}`).then(s => __importStar(require(s)));
                // then extract properties defined in config
                return res.status(200).send((_a = this.config.exposedProperties) === null || _a === void 0 ? void 0 : _a.reduce((acc, prop) => {
                    acc[prop] = packageJSON[prop];
                    return acc;
                }, {}));
            }
            catch (error) {
                return next(A_EXPRESS_Context_class_1.A_EXPRESS_Context.Errors.getError(errors_constants_1.A_EXPRESS_CONSTANTS__ERROR_CODES.INCORRECT_VERSION_PATH_FOR_HEALTH_CONTROLLER));
            }
        });
    }
}
exports.A_EXPRESS_HealthController = A_EXPRESS_HealthController;
__decorate([
    (0, Methods_decorator_1.A_EXPRESS_Get)({
        path: '/health',
        config: {
            auth: false,
            identity: false
        }
    })
], A_EXPRESS_HealthController.prototype, "get", null);
//# sourceMappingURL=A_EXPRESS_HealthController.class.js.map