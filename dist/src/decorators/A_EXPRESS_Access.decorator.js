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
exports.A_EXPRESS_Access = A_EXPRESS_Access;
const a_arc_1 = require("@adaas/a-arc");
const a_auth_1 = require("@adaas/a-auth");
const a_sdk_types_1 = require("@adaas/a-sdk-types");
function A_EXPRESS_Access(params) {
    return function (target, propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = function (req, res, next) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const controllerArc = this.config.arc;
                    if (((controllerArc.enable) === false
                        || (controllerArc.enable) === true)
                        ? !controllerArc.enable
                        : !req.adaas.context.config.defaults.arc.enable)
                        // Call the original method with the API response data
                        return originalMethod.apply(this, [req, res, next]);
                    /**
                     * The queries that will be sent to the ARC
                     * It is a combination of ACL and permissions
                     */
                    const queries = {};
                    /**
                     * The permissions that will checked with the ARC
                     */
                    let permissions = [];
                    // deal with acl first
                    if (params.acl) {
                        Object.keys(params.acl).forEach(key => {
                            const qb = params.acl[key].apply(this, [new a_arc_1.A_ARC_MaskQueryBuilder(), this, req, res, next]);
                            queries[key] = qb.toString();
                        });
                    }
                    // deal with permissions
                    if (params.permissions) {
                        permissions = params.permissions.apply(this, [this, req, res, next]);
                        permissions.forEach(permission => {
                            const compiledPermission = permission.toJSON();
                            compiledPermission.Masks.forEach((mask, i) => {
                                queries[`${permission.code}__${i}`] = mask.mask;
                            });
                        });
                    }
                    let resp = {};
                    if (req.adaas.user) {
                        // Perform the external API request
                        resp = yield a_arc_1.A_ARC_ServerDelegate.ACL.verify({
                            masks: queries,
                        }, {
                            authenticator: a_auth_1.A_AUTH_Context.getAuthenticator(req.adaas.user.aseid, req.adaas.scope)
                        });
                    }
                    else {
                        resp = yield a_arc_1.A_ARC_ServerCommands.ACL.verify({
                            masks: queries,
                        });
                    }
                    req.adaas.arc = Object.assign(Object.assign({}, req.adaas.arc), { 
                        /**
                         * compile access field to map to initial acl object
                         */
                        access: params.acl ? Object.keys(params.acl).reduce((acc, key) => {
                            acc[key] = resp[key];
                            return acc;
                        }, { default: false }) : { default: false }, 
                        /**
                         * the compile permissions field to map to initial permissions object
                         * The permissions is True only in case when ALL ACL masks associated with it  are True
                         */
                        permissions: params.permissions ? permissions.reduce((acc, permission, i) => {
                            const compiledPermission = permission.toJSON();
                            acc[permission.code] = compiledPermission.Masks.every((mask, i) => resp[`${permission.code}__${i}`]);
                            return acc;
                        }, { default: false }) : { default: false } });
                    // Call the original method with the API response data
                    return originalMethod.apply(this, [req, res, next]);
                }
                catch (error) {
                    return next(new a_sdk_types_1.A_SDK_Error(error));
                }
            });
        };
        return descriptor;
    };
}
;
//# sourceMappingURL=A_EXPRESS_Access.decorator.js.map