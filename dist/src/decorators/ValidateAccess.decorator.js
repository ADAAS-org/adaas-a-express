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
exports.A_EXPRESS_ValidateAccess = A_EXPRESS_ValidateAccess;
const a_arc_1 = require("@adaas/a-arc");
const a_auth_1 = require("@adaas/a-auth");
const a_sdk_types_1 = require("@adaas/a-sdk-types");
function A_EXPRESS_ValidateAccess(qb) {
    return function (target, propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = function (req, res, next) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const resultQuery = qb.apply(this, [new a_arc_1.A_ARC_MaskQueryBuilder(), this, req, res, next]);
                    console.log('A_EXPRESS_ValidateAccess');
                    // Perform the external API request
                    yield a_arc_1.A_ARC_ServerDelegate.ACL.verify({
                        mask: resultQuery.toString(),
                    }, {
                        authenticator: a_auth_1.A_AUTH_Context.getAuthenticator(req.adaas.user.aseid)
                    });
                    // Call the original method with the API response data
                    return originalMethod.apply(this, [req, res, next]);
                }
                catch (error) {
                    console.log('A_EXPRESS_ValidateAccess error', error);
                    return next(new a_sdk_types_1.A_SDK_ServerError(error));
                }
            });
        };
        return descriptor;
    };
}
;
//# sourceMappingURL=ValidateAccess.decorator.js.map