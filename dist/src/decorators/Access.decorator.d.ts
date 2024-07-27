import { A_EXPRESS_TYPES__INextFunction, A_EXPRESS_TYPES__IRequest } from "../types/A_EXPRESS_Controller.types";
import { A_ARC_MaskQueryBuilder, A_ARC_Permission } from "@adaas/a-arc";
export declare function A_EXPRESS_Access<_ContextType = any, _RequestType extends A_EXPRESS_TYPES__IRequest = A_EXPRESS_TYPES__IRequest, _AccessKeys extends Array<string> = ['default']>(params: {
    acl?: {
        [key in _AccessKeys[number]]: (qb: A_ARC_MaskQueryBuilder, self: _ContextType, req: _RequestType, res: any, next: A_EXPRESS_TYPES__INextFunction) => A_ARC_MaskQueryBuilder;
    };
    permissions?: (self: _ContextType, req: _RequestType, res: any, next: A_EXPRESS_TYPES__INextFunction) => Array<A_ARC_Permission>;
}): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor;
