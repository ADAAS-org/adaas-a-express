import { Request, Response, NextFunction } from 'express';
import { A_SDK_App, A_SDK_User } from '@adaas/a-sdk';


export interface A_EXPRESS_TYPES__IRequestQueryParams {
    page?: number,
    pageSize?: number
    search?: string
}

export interface A_EXPRESS_TYPES__IRequestParams {
    aseid: string
    id: string
}

export interface A_EXPRESS_TYPES__IResponse<_ResponseType = any> extends Response<_ResponseType, any> {
}


export interface A_EXPRESS_TYPES__ControllerConfig {
    identifierType: 'ASEID' | 'ID',
    type: 'None' | 'AppInteractions' | 'ServerCommands' | 'ServerDelegate'
    entity: string,
}



export interface A_EXPRESS_TYPES__IRequest<
    _ReqBodyType = any,
    T extends A_EXPRESS_TYPES__IRequestQueryParams = A_EXPRESS_TYPES__IRequestQueryParams,
    P extends A_EXPRESS_TYPES__IRequestParams = A_EXPRESS_TYPES__IRequestParams
> extends Request<P, any, _ReqBodyType, T> {
    params: P,
    query: T,
    adaas: {
        user: A_SDK_User
        app: A_SDK_App,

        /**
         * the selected Scope ASEID that used to access the resources
         */
        scope: string,
        /**
         * A set of all roles ASEIDs that attached to actor
         */
        roles: Array<string>,

        arc?: Partial<{
            resources: Array<string>
        }>
    }
    agentHash?: string
}


export interface A_EXPRESS_TYPES__IController {

    logAlias: string
    // dataSource: DataSource

    get(req: A_EXPRESS_TYPES__IRequest<any, A_EXPRESS_TYPES__IRequestQueryParams, A_EXPRESS_TYPES__IRequestParams>, res: Response, next: NextFunction): void
    post(req: A_EXPRESS_TYPES__IRequest<any, A_EXPRESS_TYPES__IRequestQueryParams, A_EXPRESS_TYPES__IRequestParams>, res: Response, next: NextFunction): void
    put(req: A_EXPRESS_TYPES__IRequest<any, A_EXPRESS_TYPES__IRequestQueryParams, A_EXPRESS_TYPES__IRequestParams>, res: Response, next: NextFunction): void
    delete(req: A_EXPRESS_TYPES__IRequest<any, A_EXPRESS_TYPES__IRequestQueryParams, A_EXPRESS_TYPES__IRequestParams>, res: Response, next: NextFunction): void
}
