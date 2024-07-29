"use strict";
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
exports.A_EXPRESS_Controller = void 0;
const a_sdk_types_1 = require("@adaas/a-sdk-types");
const A_EXPRESS_Controller_defaults_1 = require("../defaults/A_EXPRESS_Controller.defaults");
class A_EXPRESS_Controller {
    constructor(context, config) {
        this.logAlias = "a-express@abstract-controller";
        this.CUSTOM_CONFIG = {};
        this._constructorConfig = config;
        this.context = context;
    }
    get config() {
        if (!this._compiledConfig)
            this._compiledConfig = a_sdk_types_1.A_SDK_CommonHelper.deepMerge(a_sdk_types_1.A_SDK_CommonHelper.deepMerge(Object.assign({}, A_EXPRESS_Controller_defaults_1.A_EXPRESS_DEFAULTS__CONTROLLER_CONFIG), this._constructorConfig || {}), this.CUSTOM_CONFIG);
        return this._compiledConfig;
    }
    get(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return next(this.context.Errors
                .getError(a_sdk_types_1.A_SDK_CONSTANTS__ERROR_CODES.METHOD_NOT_IMPLEMENTED));
        });
    }
    post(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return next(this.context.Errors
                .getError(a_sdk_types_1.A_SDK_CONSTANTS__ERROR_CODES.METHOD_NOT_IMPLEMENTED));
        });
    }
    put(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return next(this.context.Errors
                .getError(a_sdk_types_1.A_SDK_CONSTANTS__ERROR_CODES.METHOD_NOT_IMPLEMENTED));
        });
    }
    delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return next(this.context.Errors
                .getError(a_sdk_types_1.A_SDK_CONSTANTS__ERROR_CODES.METHOD_NOT_IMPLEMENTED));
        });
    }
    list(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return next(this.context.Errors
                .getError(a_sdk_types_1.A_SDK_CONSTANTS__ERROR_CODES.METHOD_NOT_IMPLEMENTED));
        });
    }
}
exports.A_EXPRESS_Controller = A_EXPRESS_Controller;
//# sourceMappingURL=A_EXPRESS_Controller.class.js.map