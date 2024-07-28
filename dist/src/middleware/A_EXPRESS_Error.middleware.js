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
exports.A_EXPRESS_ErrorsMiddleware = void 0;
const a_sdk_types_1 = require("@adaas/a-sdk-types");
class A_EXPRESS_ErrorsMiddleware {
    static handleError(error, req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const serverError = new a_sdk_types_1.A_SDK_ServerError(error);
            req.adaas.context.Logger.error(serverError);
            return res.status(serverError.serverCode).send(serverError);
        });
    }
}
exports.A_EXPRESS_ErrorsMiddleware = A_EXPRESS_ErrorsMiddleware;
//# sourceMappingURL=A_EXPRESS_Error.middleware.js.map