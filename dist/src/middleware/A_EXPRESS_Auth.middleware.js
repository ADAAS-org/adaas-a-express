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
exports.A_EXPRESS_AuthMiddleware = void 0;
const a_sdk_1 = require("@adaas/a-sdk");
const a_auth_1 = require("@adaas/a-auth");
const A_EXPRESS_Context_class_1 = require("../global/A_EXPRESS_Context.class");
const a_sdk_types_1 = require("@adaas/a-sdk-types");
const errors_constants_1 = require("../constants/errors.constants");
class A_EXPRESS_AuthMiddleware {
    static validateToken(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.headers.authorization)
                return next(A_EXPRESS_Context_class_1.A_EXPRESS_Context.Errors.getError(a_sdk_types_1.A_SDK_CONSTANTS__ERROR_CODES.TOKEN_NOT_PROVIDED));
            try {
                const [bearer, receivedToken] = req.headers.authorization.split(' ');
                /**
                 * This method should return details about the ADAAS Auth in case when APP credentials are not provided
                 * Otherwise, it returns nothings
                 */
                yield a_auth_1.A_AUTH_ServerCommands.Token.verify({
                    token: receivedToken
                });
                return next();
            }
            catch (error) {
                return next(new a_sdk_types_1.A_SDK_ServerError(error));
            }
        });
    }
    static AppInteractions_ValidateToken(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.headers.authorization)
                return next(A_EXPRESS_Context_class_1.A_EXPRESS_Context.Errors.getError(a_sdk_types_1.A_SDK_CONSTANTS__ERROR_CODES.TOKEN_NOT_PROVIDED));
            try {
                const [bearer, receivedToken] = req.headers.authorization.split(' ');
                /**
                 * This method should return details about the ADAAS Auth in case when APP credentials are not provided
                 * Otherwise, it returns nothings
                 */
                const { user, app, scope, roles } = yield a_auth_1.A_AUTH_ServerCommands.Token.verify({
                    token: receivedToken
                });
                if (!user)
                    return next(A_EXPRESS_Context_class_1.A_EXPRESS_Context.Errors.getError(errors_constants_1.A_EXPRESS_CONSTANTS__ERROR_CODES.INVALID_TOKEN_TYPE_FOR_APP_INTERACTION));
                req.adaas.user = new a_sdk_1.A_SDK_User(user);
                /**
                 * In case when API Credentials are used the APP is will be in request as well as roles
                 *
                 */
                req.adaas.scope = scope;
                req.adaas.roles = roles;
                return next();
            }
            catch (error) {
                return next(new a_sdk_types_1.A_SDK_ServerError(error));
            }
        });
    }
    static ServerCommands_ValidateToken(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.headers.authorization)
                return next(A_EXPRESS_Context_class_1.A_EXPRESS_Context.Errors.getError(a_sdk_types_1.A_SDK_CONSTANTS__ERROR_CODES.TOKEN_NOT_PROVIDED));
            try {
                const [bearer, receivedToken] = req.headers.authorization.split(' ');
                /**
                 * This method should return details about the ADAAS Auth in case when APP credentials are not provided
                 * Otherwise, it returns nothings
                 */
                const { api, app, scope, roles } = yield a_auth_1.A_AUTH_ServerCommands.Token.verify({
                    token: receivedToken
                });
                if (!app || !api)
                    return next(A_EXPRESS_Context_class_1.A_EXPRESS_Context.Errors.getError(errors_constants_1.A_EXPRESS_CONSTANTS__ERROR_CODES.INVALID_TOKEN_TYPE_FOR_SERVER_COMMANDS));
                req.adaas.app = new a_sdk_1.A_SDK_App(app);
                req.adaas.api = new a_sdk_1.A_SDK_ApiCredentials(api);
                req.adaas.scope = scope;
                req.adaas.roles = roles;
                return next();
            }
            catch (error) {
                return next(new a_sdk_types_1.A_SDK_ServerError(error));
            }
        });
    }
    static ServerDelegate_ValidateToken(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.headers.authorization)
                return next(A_EXPRESS_Context_class_1.A_EXPRESS_Context.Errors.getError(a_sdk_types_1.A_SDK_CONSTANTS__ERROR_CODES.TOKEN_NOT_PROVIDED));
            try {
                const [bearer, receivedToken] = req.headers.authorization.split(' ');
                /**
                 * This method should return details about the ADAAS Auth in case when APP credentials are not provided
                 * Otherwise, it returns nothings
                 */
                const { api, app, user, scope, roles } = yield a_auth_1.A_AUTH_ServerCommands.Token.verify({
                    token: receivedToken
                });
                if (!app || !api || !user)
                    return next(A_EXPRESS_Context_class_1.A_EXPRESS_Context.Errors.getError(errors_constants_1.A_EXPRESS_CONSTANTS__ERROR_CODES.INVALID_TOKEN_TYPE_FOR_SERVER_DELEGATE));
                req.adaas.app = new a_sdk_1.A_SDK_App(app);
                req.adaas.api = new a_sdk_1.A_SDK_ApiCredentials(api);
                req.adaas.user = new a_sdk_1.A_SDK_User(user);
                req.adaas.scope = scope;
                req.adaas.roles = roles;
                req.adaas.authenticator = a_auth_1.A_AUTH_Context.getAuthenticator(user, scope);
                return next();
            }
            catch (error) {
                return next(new a_sdk_types_1.A_SDK_ServerError(error));
            }
        });
    }
}
exports.A_EXPRESS_AuthMiddleware = A_EXPRESS_AuthMiddleware;
//# sourceMappingURL=A_EXPRESS_Auth.middleware.js.map