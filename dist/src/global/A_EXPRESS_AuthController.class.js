"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
exports.A_EXPRESS_AuthController = void 0;
const A_EXPRESS_Controller_class_1 = require("./A_EXPRESS_Controller.class");
const a_sdk_types_1 = require("@adaas/a-sdk-types");
const a_auth_1 = require("@adaas/a-auth");
const Route_decorator_1 = require("../decorators/Route.decorator");
class A_EXPRESS_AuthController extends A_EXPRESS_Controller_class_1.A_EXPRESS_Controller {
    getSSOUrl(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const url = yield a_auth_1.A_AUTH_ServerCommands.SSO.getSignInUrl({
                    redirectURL: this.CONFIG_REDIRECT_URL
                });
                return res.status(200).send(url);
            }
            catch (error) {
                return next(new a_sdk_types_1.A_SDK_ServerError(error));
            }
        });
    }
    getToken(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const authData = yield a_auth_1.A_AUTH_ServerCommands.Token.getAccessToken({
                    code: req.body.code
                });
                return res.status(200).send(authData);
            }
            catch (error) {
                return next(new a_sdk_types_1.A_SDK_ServerError(error));
            }
        });
    }
    verifyToken(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield a_auth_1.A_AUTH_ServerCommands.Token.verify({
                    token: req.body.token
                });
                return res.status(200).send({
                    status: 'OK',
                });
            }
            catch (error) {
                return next(new a_sdk_types_1.A_SDK_ServerError(error));
            }
        });
    }
    refreshToken(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const authData = yield a_auth_1.A_AUTH_ServerCommands.Token.refresh({
                    refreshToken: req.body.refreshToken
                });
                return res.status(200).send(authData);
            }
            catch (error) {
                return next(new a_sdk_types_1.A_SDK_ServerError(error));
            }
        });
    }
}
exports.A_EXPRESS_AuthController = A_EXPRESS_AuthController;
__decorate([
    (0, Route_decorator_1.A_EXPRESS_Post)({
        path: '/adaas/url',
        config: {
            identity: false,
            auth: false
        }
    })
], A_EXPRESS_AuthController.prototype, "getSSOUrl", null);
__decorate([
    (0, Route_decorator_1.A_EXPRESS_Post)({
        path: '/token',
        config: {
            identity: false,
            auth: false
        }
    })
], A_EXPRESS_AuthController.prototype, "getToken", null);
__decorate([
    (0, Route_decorator_1.A_EXPRESS_Post)({
        path: '/token/verify',
        config: {
            identity: false,
            auth: false
        }
    })
], A_EXPRESS_AuthController.prototype, "verifyToken", null);
__decorate([
    (0, Route_decorator_1.A_EXPRESS_Post)({
        path: '/token/refresh',
        config: {
            identity: false,
            auth: false
        }
    })
], A_EXPRESS_AuthController.prototype, "refreshToken", null);
//# sourceMappingURL=A_EXPRESS_AuthController.class.js.map