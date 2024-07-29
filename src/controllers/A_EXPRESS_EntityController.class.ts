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
import { A_EXPRESS_Access } from "../decorators/Access.decorator";
import { A_EXPRESS_Resources } from "../decorators/Resources.decorator";
import { A_EXPRESS_Delete, A_EXPRESS_Get, A_EXPRESS_Post, A_EXPRESS_Put } from "../decorators/Methods.decorator";
import { A_EXPRESS_DEFAULTS__ENTITY_CONTROLLER_CONFIG } from "../defaults/A_EXPRESS_EntityController.defaults";
import { A_EXPRESS_App } from "../global/A_EXPRESS_App.class";

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

    protected CUSTOM_CONFIG!: A_SDK_TYPES__Required<
        A_SDK_TYPES__DeepPartial<A_EXPRESS_TYPES__EntityControllerConfig<_DBEntityType, _RequestType>>,
        ['entity']
    >



    constructor(
        context: A_EXPRESS_App,
        config?: A_SDK_TYPES__DeepPartial<A_EXPRESS_TYPES__EntityControllerConfig<_DBEntityType, _RequestType>>
    ) {
        super(context, config);
    }

    protected repository?: _RepositoryType
    protected _compiledConfig?: A_EXPRESS_TYPES__EntityControllerConfig<_DBEntityType, _RequestType>


    get config(): A_EXPRESS_TYPES__EntityControllerConfig<_DBEntityType, _RequestType> {
        if (!this._compiledConfig)
            this._compiledConfig = A_SDK_CommonHelper.deepMerge(
                A_SDK_CommonHelper.deepMerge(
                    {
                        ...A_EXPRESS_DEFAULTS__ENTITY_CONTROLLER_CONFIG
                    },
                    this._constructorConfig || {}
                ),
                this.CUSTOM_CONFIG
            );

        return this._compiledConfig;
    }



    @A_EXPRESS_Get({
        config: {
            identity: false
        }
    })
    @A_EXPRESS_Access<A_EXPRESS_EntityController, _RequestType>({
        acl: {
            default: (qb, self, req) => self.config.list.arc.access(self, qb, req)
        },
        permissions: (self, req) => self.config.list.arc.permissions(self, req)
    })
    @A_EXPRESS_Resources<A_EXPRESS_EntityController, _RequestType>({
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

            const listConfig = A_SDK_CommonHelper.deepMerge({ ...A_EXPRESS_DEFAULTS__ENTITY_CONTROLLER_CONFIG.list }, this.config.list)

            const data = await this.repository.getPage({
                where: await listConfig.where(this, req),
                relations: listConfig.relations,
                pagination: {
                    page: req.query.page,
                    pageSize: req.query.pageSize
                },
                search: {
                    pattern: req.query.search,
                    include: listConfig.searchFields
                },
                order: listConfig.order as any
            });

            return res.status(200).send(data);

        } catch (error) {
            return next(new A_SDK_ServerError(error))
        }
    }


    @A_EXPRESS_Post()
    @A_EXPRESS_Access<A_EXPRESS_EntityController, _RequestType>({
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

            const postConfig = A_SDK_CommonHelper.deepMerge({ ...A_EXPRESS_DEFAULTS__ENTITY_CONTROLLER_CONFIG.post }, this.config.post)

            const updated = await this.repository.findOneOrFail({
                where: {
                    id: (savedEntity as any).id,
                },
                relations: postConfig.relations,
            });

            return res.status(200).send(updated);

        } catch (error) {

            return next(new A_SDK_ServerError(error))
        }
    }




    @A_EXPRESS_Put()
    @A_EXPRESS_Access<A_EXPRESS_EntityController, _RequestType>({
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

            const putConfig = A_SDK_CommonHelper.deepMerge({ ...A_EXPRESS_DEFAULTS__ENTITY_CONTROLLER_CONFIG.put }, this.config.put)

            const where = await putConfig.where(this, req)

            await this.repository.update(where, req.body);

            const updated = await this.repository.findOneOrFail({
                where,
                relations: putConfig.relations,
            });

            return res.status(200).send(updated);

        } catch (error) {

            return next(new A_SDK_ServerError(error))
        }
    }



    @A_EXPRESS_Get()
    @A_EXPRESS_Access<A_EXPRESS_EntityController, _RequestType>({
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

            const getConfig = A_SDK_CommonHelper.deepMerge({ ...A_EXPRESS_DEFAULTS__ENTITY_CONTROLLER_CONFIG.get }, this.config.get)

            const entity = await this.repository.findOne({
                where: await getConfig.where(this, req),
                relations: getConfig.relations,
                order: getConfig.order
            });

            if (!entity)
                return this.context.Errors.throw(A_EXPRESS_CONSTANTS__ERROR_CODES.ENTITY_NOT_FOUND)

            return res.status(200).send(entity)

        } catch (error) {
            return next(new A_SDK_ServerError(error))
        }
    }



    @A_EXPRESS_Delete()
    @A_EXPRESS_Access<A_EXPRESS_EntityController, _RequestType>({
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

            const deleteConfig = A_SDK_CommonHelper.deepMerge({ ...A_EXPRESS_DEFAULTS__ENTITY_CONTROLLER_CONFIG.delete }, this.config.delete)

            await this.repository.delete(await deleteConfig.where(this, req));

            return res.status(202).send({
                status: 'OK'
            });

        } catch (error) {
            return next(new A_SDK_ServerError(error))
        }
    }
}
