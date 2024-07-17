import { NextFunction } from "express";
import {
    A_SDK_CommonHelper,
    A_SDK_ServerError,
    A_SDK_TYPES__Dictionary,
    A_SDK_TYPES__Required
} from "@adaas/a-sdk-types";
import {
    A_EXPRESS_TYPES__IControllerRepository,
    A_EXPRESS_TYPES__EntityControllerConfig,
    A_EXPRESS_TYPES__EntityController_GetConfig,
    A_EXPRESS_TYPES__EntityController_ListConfig
} from "../types/A_EXPRESS_EntityController.types";
import { A_EXPRESS_TYPES__IRequest, A_EXPRESS_TYPES__IResponse } from "../types/A_EXPRESS_Controller.types"
import { A_EXPRESS_Controller } from "./A_EXPRESS_Controller.class"
import { A_EXPRESS_CONSTANTS__ERROR_CODES } from "../constants/errors.constants";
import { A_ARC_CONSTANTS__DEFAULT_CRUD_ACTIONS } from "@adaas/a-arc";
import { A_EXPRESS_Context } from "./A_EXPRESS_Context.class";
import { A_EXPRESS_ValidateAccess } from "../decorators/ValidateAccess.decorator";
import { A_EXPRESS_AvailableResources } from "../decorators/AvailableResources.decorator";
import { A_EXPRESS_Delete, A_EXPRESS_Get, A_EXPRESS_Post, A_EXPRESS_Put } from "../decorators/Route.decorator";



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
    _RepositoryType extends A_EXPRESS_TYPES__IControllerRepository<_DBEntityType> = A_EXPRESS_TYPES__IControllerRepository<_DBEntityType>
>
    extends A_EXPRESS_Controller {

    config!: A_SDK_TYPES__Required<
        Partial<A_EXPRESS_TYPES__EntityControllerConfig<_DBEntityType>>,
        ['entity']
    >

    protected repository?: _RepositoryType



    protected get getConfig(): A_EXPRESS_TYPES__EntityController_GetConfig<_DBEntityType> {
        return {
            relations: this.config.get?.relations || [],
            order: this.config.get?.order || {
                created_at: 'DESC'
            } as any,
            where: this.config.get?.where || ((req: _RequestType) => Promise.resolve({}))
        };
    }

    protected get listConfig(): A_EXPRESS_TYPES__EntityController_ListConfig<_DBEntityType> {
        return {
            relations: this.config.list?.relations || [],
            searchFields: this.config.list?.searchFields || [],
            order: this.config.list?.order || {
                created_at: 'DESC'
            } as any,
            where: this.config.list?.where || ((req: _RequestType) => Promise.resolve({}))
        };
    }



    @A_EXPRESS_Get({
        config: {
            identity: false
        }
    })
    @A_EXPRESS_ValidateAccess<A_EXPRESS_EntityController, _RequestType>((qb, self, req) => {
        if (!self.config.entity)
            return A_EXPRESS_Context.Errors.throw(A_EXPRESS_CONSTANTS__ERROR_CODES.SERVICE_CONTROLLER_ENTITY_NOT_SPECIFIED)

        return qb
            .entity(self.config.entity)
            .action(A_ARC_CONSTANTS__DEFAULT_CRUD_ACTIONS.LIST)
            .allow();
    })
    @A_EXPRESS_AvailableResources<A_EXPRESS_EntityController, _RequestType>((qb, self, req) => {
        if (!self.config.entity)
            return A_EXPRESS_Context.Errors.throw(A_EXPRESS_CONSTANTS__ERROR_CODES.SERVICE_CONTROLLER_ENTITY_NOT_SPECIFIED)

        return qb
            .entity(self.config.entity)
            .action(A_ARC_CONSTANTS__DEFAULT_CRUD_ACTIONS.DELETE)
            .allow();
    })
    /**
     * Defines a Default GET method for the controller. Basically it's an endpoint for getting existing entities
     */
    async list(
        req: _RequestType,
        res: A_EXPRESS_TYPES__IResponse,
        next: NextFunction = () => { }
    ): Promise<any> {
        try {
            console.log('WTF?')

            if (!this.repository)
                return A_EXPRESS_Context.Errors.throw(A_EXPRESS_CONSTANTS__ERROR_CODES.OVERRIDE_METHOD_OR_PROVIDE_REPOSITORY)

            const data = await this.repository.getPage({
                where: await this.listConfig.where(req),
                relations: this.listConfig.relations,
                pagination: {
                    page: req.query.page,
                    pageSize: req.query.pageSize
                },
                search: {
                    pattern: req.query.search,
                    include: this.listConfig.searchFields
                },
                order: this.listConfig.order as any
            });

            return res.status(200).send(data);

        } catch (error) {
            return next(new A_SDK_ServerError(error))
        }
    }


    @A_EXPRESS_Post()
    @A_EXPRESS_ValidateAccess<A_EXPRESS_EntityController, _RequestType>((qb, self, req) => {
        if (!self.config.entity)
            return A_EXPRESS_Context.Errors.throw(A_EXPRESS_CONSTANTS__ERROR_CODES.SERVICE_CONTROLLER_ENTITY_NOT_SPECIFIED)

        const query = qb
            .entity(self.config.entity)
            .action(A_ARC_CONSTANTS__DEFAULT_CRUD_ACTIONS.CREATE)
            .allow();

        return query;
    })
    /**
     * Defines a Default POST method for the controller. Basically it's an endpoint for creating new entities
     */
    async post(
        req: _RequestType,
        res: A_EXPRESS_TYPES__IResponse,
        next: NextFunction
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
                relations: this.getConfig.relations,
            });

            return res.status(200).send(updated);

        } catch (error) {

            return next(new A_SDK_ServerError(error))
        }
    }




    @A_EXPRESS_Put()
    @A_EXPRESS_ValidateAccess<A_EXPRESS_EntityController, _RequestType>((qb, self, req) => {
        if (!self.config.entity)
            return A_EXPRESS_Context.Errors.throw(A_EXPRESS_CONSTANTS__ERROR_CODES.SERVICE_CONTROLLER_ENTITY_NOT_SPECIFIED)

        const query = qb
            .entity(self.config.entity)
            .action(A_ARC_CONSTANTS__DEFAULT_CRUD_ACTIONS.UPDATE)
            .allow();

        if (self.config.identifierType === 'ID')
            query
                .entity(self.config.entity)
                .id(req.params.id);
        else
            query
                .resource(req.params.aseid);

        return query;
    })
    /**
     * Defines a Default PUT method for the controller. Basically it's an endpoint for updating existing entities
     */
    async put(
        req: _RequestType,
        res: A_EXPRESS_TYPES__IResponse,
        next: NextFunction
    ): Promise<any> {
        try {
            if (!this.repository)
                return A_EXPRESS_Context.Errors.throw(A_EXPRESS_CONSTANTS__ERROR_CODES.OVERRIDE_METHOD_OR_PROVIDE_REPOSITORY)


            const parsed = A_SDK_CommonHelper.parseASEID(req.params.aseid);

            await this.repository.update({
                id: parseInt(req.params.aseid) as any
            }, req.body);

            const updated = await this.repository.findOneOrFail({
                where: {
                    id: isNaN(parseInt(parsed.id)) ? parsed.id : parseInt(parsed.id),
                },
                relations: this.getConfig.relations,
            });

            return res.status(200).send(updated);

        } catch (error) {

            return next(new A_SDK_ServerError(error))
        }
    }



    @A_EXPRESS_Get()
    @A_EXPRESS_ValidateAccess<A_EXPRESS_EntityController, _RequestType>((qb, self, req) => {
        if (!self.config.entity)
            return A_EXPRESS_Context.Errors.throw(A_EXPRESS_CONSTANTS__ERROR_CODES.SERVICE_CONTROLLER_ENTITY_NOT_SPECIFIED)

        const query = qb
            .entity(self.config.entity)
            .action(A_ARC_CONSTANTS__DEFAULT_CRUD_ACTIONS.READ)
            .allow();

        if (self.config.identifierType === 'ID')
            query
                .entity(self.config.entity)
                .id(req.params.id);
        else
            query
                .resource(req.params.aseid);

        return query;
    })
    /**
     * Defines a Default GET method for the controller. Basically it's an endpoint for getting existing entities
     */
    async get(
        req: _RequestType,
        res: A_EXPRESS_TYPES__IResponse,
        next: NextFunction
    ): Promise<any> {
        try {
            if (!this.repository)
                return A_EXPRESS_Context.Errors.throw(A_EXPRESS_CONSTANTS__ERROR_CODES.OVERRIDE_METHOD_OR_PROVIDE_REPOSITORY)


            const parsed = A_SDK_CommonHelper.parseASEID(req.params.aseid);

            const entity = await this.repository.findOne({
                where: {
                    id: isNaN(parseInt(parsed.id)) ? parsed.id : parseInt(parsed.id),
                    ... await this.getConfig.where(req),
                } as any,
                relations: this.getConfig.relations,
                order: this.getConfig.order as any
            });

            if (!entity)
                return A_EXPRESS_Context.Errors.throw(A_EXPRESS_CONSTANTS__ERROR_CODES.ENTITY_NOT_FOUND)

            return res.status(200).send(entity)

        } catch (error) {
            return next(new A_SDK_ServerError(error))
        }
    }



    @A_EXPRESS_Delete()
    @A_EXPRESS_ValidateAccess<A_EXPRESS_EntityController, _RequestType>((qb, self, req) => {
        if (!self.config.entity)
            return A_EXPRESS_Context.Errors.throw(A_EXPRESS_CONSTANTS__ERROR_CODES.SERVICE_CONTROLLER_ENTITY_NOT_SPECIFIED)

        const query = qb
            .entity(self.config.entity)
            .action(A_ARC_CONSTANTS__DEFAULT_CRUD_ACTIONS.DELETE)
            .allow();

        return query;
    })
    /**
     * Defines a Default DELETE method for the controller. Basically it's an endpoint for deleting existing entities
     */
    async delete(
        req: _RequestType,
        res: A_EXPRESS_TYPES__IResponse,
        next: NextFunction
    ): Promise<any> {
        try {
            if (!this.repository)
                return A_EXPRESS_Context.Errors.throw(A_EXPRESS_CONSTANTS__ERROR_CODES.OVERRIDE_METHOD_OR_PROVIDE_REPOSITORY)

            const parsed = A_SDK_CommonHelper.parseASEID(req.params.aseid);


            await this.repository.delete({
                id: isNaN(parseInt(parsed.id)) ? parsed.id : parseInt(parsed.id),
            });

            return res.status(202).send({
                status: 'OK'
            });

        } catch (error) {
            return next(new A_SDK_ServerError(error))
        }
    }
}
