import { A_EXPRESS_TYPES__INextFunction, A_EXPRESS_TYPES__IRequest } from "../types/A_EXPRESS_Controller.types";
import { A_ARC_MaskQueryBuilder } from "@adaas/a-arc";
import { A_EXPRESS_Controller } from "../global/A_EXPRESS_Controller.class";
export declare function A_EXPRESS_Resources<_ContextType = A_EXPRESS_Controller, _RequestType extends A_EXPRESS_TYPES__IRequest = A_EXPRESS_TYPES__IRequest, _ResourcesKeys extends Array<string> = ['default']>(params: {
    [key in _ResourcesKeys[number]]: (qb: A_ARC_MaskQueryBuilder, self: _ContextType, req: _RequestType, res: any, next: A_EXPRESS_TYPES__INextFunction) => A_ARC_MaskQueryBuilder;
}): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor;
