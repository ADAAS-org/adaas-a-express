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
                const { user, app, scope, roles } = yield a_auth_1.A_AUTH_ServerCommands.Token.verify({
                    token: receivedToken
                });
                if (user)
                    req.adaas.user = new a_sdk_1.A_SDK_User(user);
                /**
                 * In case when API Credentials are used the APP is will be in request as well as roles
                 *
                 */
                if (app)
                    req.adaas.app = new a_sdk_1.A_SDK_App(app);
                if (scope)
                    req.adaas.scope = scope;
                if (roles)
                    req.adaas.roles = roles;
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