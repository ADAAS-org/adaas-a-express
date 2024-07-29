import {
    A_SDK_ServerError,
    A_SDK_TYPES__Dictionary,
} from "@adaas/a-sdk-types";
import {
    A_EXPRESS_TYPES__INextFunction,
    A_EXPRESS_TYPES__IRequest,
    A_EXPRESS_TYPES__IResponse
} from "../types/A_EXPRESS_Controller.types"

import {
    A_EXPRESS_TYPES__ICRUDController,
    A_EXPRESS_TYPES__ICRUDControllerConfig,
    A_EXPRESS_TYPES__ICRUDControllerRepository
} from '../types/A_EXPRESS_CRUDController.types';
import {
    A_EXPRESS_Delete, A_EXPRESS_Get,
    A_EXPRESS_Post,
    A_EXPRESS_Put
} from "../decorators/A_EXPRESS_Methods.decorator";
import { A_EXPRESS_App } from "./A_EXPRESS_App.class";
import { A_EXPRESS_Controller } from '../decorators/A_EXPRESS_Controller.decorator';
import { A_EXPRESS_CONSTANTS__ERROR_CODES } from "../constants/errors.constants";
import { A_EXPRESS_Access } from "../decorators/A_EXPRESS_Access.decorator";
import { A_EXPRESS_Resources } from "../decorators/A_EXPRESS_Resources.decorator";
import { A_EXPRESS_Storage, A_EXPRESS_STORAGE__DECORATORS_CONTROLLER_ENTITY_KEY } from "../storage/A_EXPRESS_Decorators.storage";

/**
 * 
 * This class exists ONLY to simplify development. It might be used to simplify access to DB via external operations 
 * 
 */
@A_EXPRESS_Controller()
export class A_EXPRESS_CRUDController<
    _DBEntityType extends A_SDK_TYPES__Dictionary<any> = A_SDK_TYPES__Dictionary<any>,
    _RequestType extends A_EXPRESS_TYPES__IRequest = A_EXPRESS_TYPES__IRequest,
    _RepositoryType extends A_EXPRESS_TYPES__ICRUDControllerRepository<_DBEntityType> = A_EXPRESS_TYPES__ICRUDControllerRepository<_DBEntityType>,
>
    implements A_EXPRESS_TYPES__ICRUDController<_DBEntityType, _RequestType> {

    constructor(
        public context: A_EXPRESS_App,
        public config: A_EXPRESS_TYPES__ICRUDControllerConfig<_DBEntityType, _RequestType>,
        public repository: _RepositoryType,
    ) { }


    get entity(): string {
        const existedMeta = A_EXPRESS_Storage.get(this.constructor) || new Map();

        const entity: string = existedMeta.get(A_EXPRESS_STORAGE__DECORATORS_CONTROLLER_ENTITY_KEY);

        return entity;
    }


    @A_EXPRESS_Get({
        config: {
            identity: false
        }
    })
    @A_EXPRESS_Access<A_EXPRESS_CRUDController, _RequestType>({
        acl: {
            default: (qb, self, req) => self.config.list.arc.access(self, qb, req)
        },
        permissions: (self, req) => self.config.list.arc.permissions(self, req)
    })
    @A_EXPRESS_Resources<A_EXPRESS_CRUDController, _RequestType>({
        default: (qb, self, req) => self.config.list.arc.resources(self, qb, req)
    })
    /**
     * Defines a Default GET method for the controller. Basically it's an endpoint for getting existing entities
     */
    async list(
        req: _RequestType,
        res: A_EXPRESS_TYPES__IResponse,
        next: A_EXPRESS_TYPES__INextFunction
    ): Promise<any> {
        try {
            if (!this.repository)
                return this.context.Errors.throw(A_EXPRESS_CONSTANTS__ERROR_CODES.OVERRIDE_METHOD_OR_PROVIDE_REPOSITORY)

            const data = await this.repository.getPage({
                where: await this.config.list.where(this, req),
                relations: this.config.list.relations,
                pagination: {
                    page: req.query.page,
                    pageSize: req.query.pageSize
                },
                search: {
                    pattern: req.query.search,
                    include: this.config.list.searchFields
                },
                order: this.config.list.order as any
            });

            return res.status(200).send(data);

        } catch (error) {
            return next(new A_SDK_ServerError(error))
        }
    }


    @A_EXPRESS_Post()
    @A_EXPRESS_Access<A_EXPRESS_CRUDController, _RequestType>({
        acl: {
            default: (qb, self, req) => self.config.post.arc.access(self, qb, req)
        },
        permissions: (self, req) => self.config.post.arc.permissions(self, req)
    })
    /**
     * Defines a Default POST method for the controller. Basically it's an endpoint for creating new entities
     */
    async post(
        req: _RequestType,
        res: A_EXPRESS_TYPES__IResponse,
        next: A_EXPRESS_TYPES__INextFunction
    ): Promise<any> {
        try {
            if (!this.repository)
                return this.context.Errors.throw(A_EXPRESS_CONSTANTS__ERROR_CODES.OVERRIDE_METHOD_OR_PROVIDE_REPOSITORY)

            const newEntity = this.repository.create(req.body);

            const savedEntity = await this.repository.save(newEntity);

            const updated = await this.repository.findOneOrFail({
                where: {
                    id: (savedEntity as any).id,
                },
                relations: this.config.post.relations,
            });

            return res.status(200).send(updated);

        } catch (error) {

            return next(new A_SDK_ServerError(error))
        }
    }




    @A_EXPRESS_Put()
    @A_EXPRESS_Access<A_EXPRESS_CRUDController, _RequestType>({
        acl: {
            default: (qb, self, req) => self.config.put.arc.access(self, qb, req)
        },
        permissions: (self, req) => self.config.put.arc.permissions(self, req)
    })
    /**
     * Defines a Default PUT method for the controller. Basically it's an endpoint for updating existing entities
     */
    async put(
        req: _RequestType,
        res: A_EXPRESS_TYPES__IResponse,
        next: A_EXPRESS_TYPES__INextFunction
    ): Promise<any> {
        try {
            if (!this.repository)
                return this.context.Errors.throw(A_EXPRESS_CONSTANTS__ERROR_CODES.OVERRIDE_METHOD_OR_PROVIDE_REPOSITORY)

            const where = await this.config.put.where(this, req)

            await this.repository.update(where, req.body);

            const updated = await this.repository.findOneOrFail({
                where,
                relations: this.config.put.relations,
            });

            return res.status(200).send(updated);

        } catch (error) {

            return next(new A_SDK_ServerError(error))
        }
    }



    @A_EXPRESS_Get()
    @A_EXPRESS_Access<A_EXPRESS_CRUDController, _RequestType>({
        acl: {
            default: (qb, self, req) => self.config.get.arc.access(self, qb, req)
        },
        permissions: (self, req) => self.config.get.arc.permissions(self, req)
    })
    /**
     * Defines a Default GET method for the controller. Basically it's an endpoint for getting existing entities
     */
    async get(
        req: _RequestType,
        res: A_EXPRESS_TYPES__IResponse,
        next: A_EXPRESS_TYPES__INextFunction
    ): Promise<any> {
        try {
            if (!this.repository)
                return this.context.Errors.throw(A_EXPRESS_CONSTANTS__ERROR_CODES.OVERRIDE_METHOD_OR_PROVIDE_REPOSITORY)

            const entity = await this.repository.findOne({
                where: await this.config.get.where(this, req),
                relations: this.config.get.relations,
                order: this.config.get.order
            });

            if (!entity)
                return this.context.Errors.throw(A_EXPRESS_CONSTANTS__ERROR_CODES.ENTITY_NOT_FOUND)

            return res.status(200).send(entity)

        } catch (error) {
            return next(new A_SDK_ServerError(error))
        }
    }



    @A_EXPRESS_Delete()
    @A_EXPRESS_Access<A_EXPRESS_CRUDController, _RequestType>({
        acl: {
            default: (qb, self, req) => self.config.delete.arc.access(self, qb, req)
        },
        permissions: (self, req) => self.config.delete.arc.permissions(self, req)
    })
    /**
     * Defines a Default DELETE method for the controller. Basically it's an endpoint for deleting existing entities
     */
    async delete(
        req: _RequestType,
        res: A_EXPRESS_TYPES__IResponse,
        next: A_EXPRESS_TYPES__INextFunction
    ): Promise<any> {
        try {
            if (!this.repository)
                return this.context.Errors.throw(A_EXPRESS_CONSTANTS__ERROR_CODES.OVERRIDE_METHOD_OR_PROVIDE_REPOSITORY)


            await this.repository.delete(await this.config.delete.where(this, req));

            return res.status(202).send({
                status: 'OK'
            });

        } catch (error) {
            return next(new A_SDK_ServerError(error))
        }
    }
}
