import {
    A_SDK_CommonHelper,
    A_SDK_ServerError,
    A_SDK_TYPES__DeepPartial,
    A_SDK_TYPES__Dictionary,
    A_SDK_TYPES__Required
} from "@adaas/a-sdk-types";
import {
    A_EXPRESS_TYPES__IControllerRepository,
    A_EXPRESS_TYPES__EntityControllerConfig
} from "../types/A_EXPRESS_EntityController.types";
import { A_EXPRESS_TYPES__INextFunction, A_EXPRESS_TYPES__IRequest, A_EXPRESS_TYPES__IResponse } from "../types/A_EXPRESS_Controller.types"
import { A_EXPRESS_Controller } from "../global/A_EXPRESS_Controller.class"
import { A_EXPRESS_CONSTANTS__ERROR_CODES } from "../constants/errors.constants";
import { A_EXPRESS_Context } from "../global/A_EXPRESS_Context.class";
import { A_EXPRESS_Access } from "../decorators/Access.decorator";
import { A_EXPRESS_Resources } from "../decorators/Resources.decorator";
import { A_EXPRESS_Delete, A_EXPRESS_Get, A_EXPRESS_Post, A_EXPRESS_Put } from "../decorators/Route.decorator";
import { A_EXPRESS_DEFAULT_ENTITY_CONTROLLER_CONFIG } from "src/defaults/A_EXPRESS_EntityController.defaults";



/**
 * 
 * This class exists ONLY to simplify development. It might be used to simplify access to DB via external operations 
 * 
 * So basically it's applicable ONLY for TypeORM provider and NOT for others
 * 
 * Yes, it's possible to override properties and use it anyway. so.... 
 * 
 * 
 * TODO: If any better way would be found -> override or DELETE the class
 * 
 * 
 */

export class A_EXPRESS_EntityController<
    _RequestType extends A_EXPRESS_TYPES__IRequest = A_EXPRESS_TYPES__IRequest,
    _DBEntityType extends A_SDK_TYPES__Dictionary<any> = A_SDK_TYPES__Dictionary<any>,
    _RepositoryType extends A_EXPRESS_TYPES__IControllerRepository<_DBEntityType> = A_EXPRESS_TYPES__IControllerRepository<_DBEntityType>,

>
    extends A_EXPRESS_Controller {

    config!: A_SDK_TYPES__Required<
        A_SDK_TYPES__DeepPartial<A_EXPRESS_TYPES__EntityControllerConfig<_DBEntityType, _RequestType>>,
        ['entity']
    >

    Config!: A_EXPRESS_TYPES__EntityControllerConfig<_DBEntityType, _RequestType>

    protected repository?: _RepositoryType



    constructor(
        config?: A_SDK_TYPES__DeepPartial<A_EXPRESS_TYPES__EntityControllerConfig<_DBEntityType, _RequestType>>
    ) {
        super(A_SDK_CommonHelper.deepMerge({
            ...A_EXPRESS_DEFAULT_ENTITY_CONTROLLER_CONFIG
        }, config || {}));
    }



    @A_EXPRESS_Get({
        config: {
            identity: false
        }
    })
    @A_EXPRESS_Access<A_EXPRESS_EntityController, _RequestType>({
        acl: {
            default: (qb, self, req) => self.Config.list.arc.access(self, qb, req)
        },
        permissions: (self, req) => self.Config.list.arc.permissions(self, req)
    })
    @A_EXPRESS_Resources<A_EXPRESS_EntityController, _RequestType>({
        default: (qb, self, req) => self.Config.list.arc.resources(self, qb, req)
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
                return A_EXPRESS_Context.Errors.throw(A_EXPRESS_CONSTANTS__ERROR_CODES.OVERRIDE_METHOD_OR_PROVIDE_REPOSITORY)

            const data = await this.repository.getPage({
                where: await this.Config.list.where(this, req),
                relations: this.Config.list.relations,
                pagination: {
                    page: req.query.page,
                    pageSize: req.query.pageSize
                },
                search: {
                    pattern: req.query.search,
                    include: this.Config.list.searchFields
                },
                order: this.Config.list.order as any
            });

            return res.status(200).send(data);

        } catch (error) {
            return next(new A_SDK_ServerError(error))
        }
    }


    @A_EXPRESS_Post()
    @A_EXPRESS_Access<A_EXPRESS_EntityController, _RequestType>({
        acl: {
            default: (qb, self, req) => self.Config.post.arc.access(self, qb, req)
        },
        permissions: (self, req) => self.Config.post.arc.permissions(self, req)
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
                return A_EXPRESS_Context.Errors.throw(A_EXPRESS_CONSTANTS__ERROR_CODES.OVERRIDE_METHOD_OR_PROVIDE_REPOSITORY)

            const newEntity = this.repository.create(req.body);

            const savedEntity = await this.repository.save(newEntity);

            const updated = await this.repository.findOneOrFail({
                where: {
                    id: (savedEntity as any).id,
                },
                relations: this.Config.post.relations,
            });

            return res.status(200).send(updated);

        } catch (error) {

            return next(new A_SDK_ServerError(error))
        }
    }




    @A_EXPRESS_Put()
    @A_EXPRESS_Access<A_EXPRESS_EntityController, _RequestType>({
        acl: {
            default: (qb, self, req) => self.Config.put.arc.access(self, qb, req)
        },
        permissions: (self, req) => self.Config.put.arc.permissions(self, req)
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
                return A_EXPRESS_Context.Errors.throw(A_EXPRESS_CONSTANTS__ERROR_CODES.OVERRIDE_METHOD_OR_PROVIDE_REPOSITORY)


            const where = await this.Config.put.where(this, req)

            await this.repository.update(where, req.body);

            const updated = await this.repository.findOneOrFail({
                where,
                relations: this.Config.put.relations,
            });

            return res.status(200).send(updated);

        } catch (error) {

            return next(new A_SDK_ServerError(error))
        }
    }



    @A_EXPRESS_Get()
    @A_EXPRESS_Access<A_EXPRESS_EntityController, _RequestType>({
        acl: {
            default: (qb, self, req) => self.Config.get.arc.access(self, qb, req)
        },
        permissions: (self, req) => self.Config.get.arc.permissions(self, req)
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
                return A_EXPRESS_Context.Errors.throw(A_EXPRESS_CONSTANTS__ERROR_CODES.OVERRIDE_METHOD_OR_PROVIDE_REPOSITORY)

            const entity = await this.repository.findOne({
                where: await this.Config.get.where(this, req),
                relations: this.Config.get.relations,
                order: this.Config.get.order as any
            });

            if (!entity)
                return A_EXPRESS_Context.Errors.throw(A_EXPRESS_CONSTANTS__ERROR_CODES.ENTITY_NOT_FOUND)

            return res.status(200).send(entity)

        } catch (error) {
            return next(new A_SDK_ServerError(error))
        }
    }



    @A_EXPRESS_Delete()
    @A_EXPRESS_Access<A_EXPRESS_EntityController, _RequestType>({
        acl: {
            default: (qb, self, req) => self.Config.delete.arc.access(self, qb, req)
        },
        permissions: (self, req) => self.Config.delete.arc.permissions(self, req)
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
                return A_EXPRESS_Context.Errors.throw(A_EXPRESS_CONSTANTS__ERROR_CODES.OVERRIDE_METHOD_OR_PROVIDE_REPOSITORY)

            await this.repository.delete(await this.Config.delete.where(this, req));

            return res.status(202).send({
                status: 'OK'
            });

        } catch (error) {
            return next(new A_SDK_ServerError(error))
        }
    }
}
