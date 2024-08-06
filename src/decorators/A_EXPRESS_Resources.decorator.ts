import { A_EXPRESS_TYPES__IController, A_EXPRESS_TYPES__INextFunction, A_EXPRESS_TYPES__IRequest, A_EXPRESS_TYPES__IResponse } from "../types/A_EXPRESS_Controller.types";
import { A_ARC_MaskQueryBuilder, A_ARC_ServerCommands, A_ARC_ServerDelegate } from "@adaas/a-arc";
import { A_AUTH_Context, A_AUTH_ServerDelegateAuthenticator } from "@adaas/a-auth";
import { A_SDK_ServerError } from "@adaas/a-sdk-types";


export function A_EXPRESS_Resources<
    _ContextType = A_EXPRESS_TYPES__IController,
    _RequestType extends A_EXPRESS_TYPES__IRequest = A_EXPRESS_TYPES__IRequest,
    _ResourcesKeys extends Array<string> = ['default'],
>(
    params: {
        [key in _ResourcesKeys[number]]: (
            qb: A_ARC_MaskQueryBuilder,
            self: _ContextType,
            req: _RequestType,
            res: any,
            next: A_EXPRESS_TYPES__INextFunction,

        ) => A_ARC_MaskQueryBuilder
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
                    !((this as any) as A_EXPRESS_TYPES__IController).config.arc.enable
                        ? true
                        : req.adaas.context.config.defaults.arc.enable
                )
                    // Call the original method with the API response data
                    return originalMethod.apply(this, [req, res, next]);

                const queries = Object.keys(params).reduce((acc, key) => {
                    const qb = params[key].apply(this, [new A_ARC_MaskQueryBuilder(), this as _ContextType, req, res, next]);
                    acc[key] = qb.toString();

                    return acc;
                }, {});

                if (req.adaas.user) {
                    // Perform the external API request
                    const aseids = await A_ARC_ServerDelegate.Resource.list({
                        masks: queries,
                    }, {
                        authenticator: A_AUTH_Context.getAuthenticator(
                            req.adaas.user.aseid,
                            req.adaas.scope
                        ) as A_AUTH_ServerDelegateAuthenticator
                    });

                    req.adaas.arc = {
                        ...req.adaas.arc,
                        resources: aseids as any,
                    };
                } else {
                    // Perform the external API request
                    const aseids = await A_ARC_ServerCommands.Resource.list({
                        masks: queries,
                    });

                    req.adaas.arc = {
                        ...req.adaas.arc,
                        resources: aseids as any,
                    };
                }

                // Call the original method with the API response data
                return originalMethod.apply(this, [req, res, next]);

            } catch (error) {
                return next(new A_SDK_ServerError(error))
            }
        };

        return descriptor;
    };
};

