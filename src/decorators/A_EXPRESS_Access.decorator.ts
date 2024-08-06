import {
    A_EXPRESS_TYPES__IController,
    A_EXPRESS_TYPES__INextFunction,
    A_EXPRESS_TYPES__IRequest,
} from "../types/A_EXPRESS_Controller.types";
import {
    A_ARC_MaskQueryBuilder, A_ARC_Permission,
    A_ARC_ServerCommands, A_ARC_ServerDelegate
} from "@adaas/a-arc";
import { A_AUTH_Context, A_AUTH_ServerDelegateAuthenticator } from "@adaas/a-auth";
import { A_SDK_Error, A_SDK_ServerError, A_SDK_TYPES__Dictionary } from "@adaas/a-sdk-types";


export function A_EXPRESS_Access<
    _ContextType = A_EXPRESS_TYPES__IController,
    _RequestType extends A_EXPRESS_TYPES__IRequest = A_EXPRESS_TYPES__IRequest,
    _AccessKeys extends Array<string> = ['default'],
>(
    params: {
        acl?: {
            [key in _AccessKeys[number]]: (
                qb: A_ARC_MaskQueryBuilder,
                self: _ContextType,
                req: _RequestType,
                res: any,
                next: A_EXPRESS_TYPES__INextFunction,

            ) => A_ARC_MaskQueryBuilder
        },
        permissions?: (
            self: _ContextType,
            req: _RequestType,
            res: any,
            next: A_EXPRESS_TYPES__INextFunction,
        ) => Array<A_ARC_Permission>
    }
) {

    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;

        descriptor.value = async function (
            req: _RequestType,
            res: any,
            next: A_EXPRESS_TYPES__INextFunction
        ) {
            try {
                if (
                    !(((this as any) as A_EXPRESS_TYPES__IController).config.arc.enable)
                        ? true
                        : req.adaas.context.config.defaults.arc.enable
                )
                    // Call the original method with the API response data
                    return originalMethod.apply(this, [req, res, next]);

                /**
                 * The queries that will be sent to the ARC
                 * It is a combination of ACL and permissions
                 */
                const queries: A_SDK_TYPES__Dictionary<string> = {}

                /**
                 * The permissions that will checked with the ARC
                 */
                let permissions: Array<A_ARC_Permission> = [];

                // deal with acl first
                if (params.acl) {
                    Object.keys(params.acl).forEach(key => {
                        const qb: A_ARC_MaskQueryBuilder = params.acl![key].apply(this, [new A_ARC_MaskQueryBuilder(), this as _ContextType, req, res, next]);
                        queries[key] = qb.toString();
                    });
                }

                // deal with permissions
                if (params.permissions) {

                    permissions = params.permissions.apply(this, [this as _ContextType, req, res, next]);

                    permissions.forEach(permission => {
                        const compiledPermission = permission.toJSON();

                        compiledPermission.Masks.forEach((mask, i) => {
                            queries[`${permission.code}__${i}`] = mask.mask;
                        });
                    });
                }

                let resp: A_SDK_TYPES__Dictionary<boolean> = {};

                if (req.adaas.user) {
                    // Perform the external API request
                    resp = await A_ARC_ServerDelegate.ACL.verify({
                        masks: queries,
                    }, {
                        authenticator: A_AUTH_Context.getAuthenticator(
                            req.adaas.user.aseid,
                            req.adaas.scope
                        ) as A_AUTH_ServerDelegateAuthenticator
                    });
                } else {
                    resp = await A_ARC_ServerCommands.ACL.verify({
                        masks: queries,
                    });
                }

                req.adaas.arc = {
                    ...req.adaas.arc,
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
                    }, { default: false }) : { default: false }
                };

                // Call the original method with the API response data
                return originalMethod.apply(this, [req, res, next]);

            } catch (error) {
                return next(new A_SDK_Error(error))
            }
        };

        return descriptor;
    };
};