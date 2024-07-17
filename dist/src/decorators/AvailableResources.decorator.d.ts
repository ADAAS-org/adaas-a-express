import { NextFunction } from "express";
import { A_EXPRESS_TYPES__IRequest, A_EXPRESS_TYPES__IResponse } from "../types/A_EXPRESS_Controller.types";
import { A_ARC_MaskQueryBuilder } from "@adaas/a-arc";
export declare function A_EXPRESS_AvailableResources<_ContextType = any, _RequestType extends A_EXPRESS_TYPES__IRequest = A_EXPRESS_TYPES__IRequest, _ResponseType extends A_EXPRESS_TYPES__IResponse = A_EXPRESS_TYPES__IResponse>(qb: (qb: A_ARC_MaskQueryBuilder, self: _ContextType, req: _RequestType, res: _ResponseType, next: NextFunction) => A_ARC_MaskQueryBuilder): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor;
