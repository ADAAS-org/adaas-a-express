import { NextFunction, Request } from "express";
import { A_EXPRESS_TYPES__IRequest, A_EXPRESS_TYPES__IResponse } from "../types/A_EXPRESS_Controller.types";
import { A_ARC_MaskQueryBuilder, A_ARC_ServerDelegate } from "@adaas/a-arc";
import { A_AUTH_Context, A_AUTH_ServerDelegateAuthenticator } from "@adaas/a-auth";
import { A_SDK_ServerError } from "@adaas/a-sdk-types";


export function A_EXPRESS_ValidateAccess<
    _ContextType = any,
    _RequestType extends A_EXPRESS_TYPES__IRequest = A_EXPRESS_TYPES__IRequest,
    _ResponseType extends A_EXPRESS_TYPES__IResponse = A_EXPRESS_TYPES__IResponse
>(
    qb: (
        qb: A_ARC_MaskQueryBuilder,
        self: _ContextType,
        req: _RequestType,
        res: _ResponseType,
        next: NextFunction,

    ) => A_ARC_MaskQueryBuilder
) {

    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;

        descriptor.value = async function (
            req: _RequestType,
            res: _ResponseType,
            next: NextFunction
        ) {
            try {
                const resultQuery = qb.apply(this, [new A_ARC_MaskQueryBuilder(), this as _ContextType, req, res, next]);

                console.log('A_EXPRESS_ValidateAccess')
                // Perform the external API request
                await A_ARC_ServerDelegate.ACL.verify({
                    mask: resultQuery.toString(),
                }, {
                    authenticator: A_AUTH_Context.getAuthenticator(
                        req.adaas.user.aseid,
                        req.adaas.scope
                    ) as A_AUTH_ServerDelegateAuthenticator
                });

                // Call the original method with the API response data
                return originalMethod.apply(this, [req, res, next]);

            } catch (error) {
                console.log('A_EXPRESS_ValidateAccess error', error)
                return next(new A_SDK_ServerError(error))
            }
        };

        return descriptor;
    };
};