"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.A_EXPRESS_EntityController = void 0;
const a_sdk_types_1 = require("@adaas/a-sdk-types");
const A_EXPRESS_Controller_class_1 = require("./A_EXPRESS_Controller.class");
const errors_constants_1 = require("../constants/errors.constants");
const a_arc_1 = require("@adaas/a-arc");
const A_EXPRESS_Context_class_1 = require("./A_EXPRESS_Context.class");
const ValidateAccess_decorator_1 = require("../decorators/ValidateAccess.decorator");
const AvailableResources_decorator_1 = require("../decorators/AvailableResources.decorator");
const Route_decorator_1 = require("../decorators/Route.decorator");
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
class A_EXPRESS_EntityController extends A_EXPRESS_Controller_class_1.A_EXPRESS_Controller {
    get getConfig() {
        var _a, _b, _c;
        return {
            relations: ((_a = this.config.get) === null || _a === void 0 ? void 0 : _a.relations) || [],
            order: ((_b = this.config.get) === null || _b === void 0 ? void 0 : _b.order) || {
                created_at: 'DESC'
            },
            where: ((_c = this.config.get) === null || _c === void 0 ? void 0 : _c.where) || ((req) => Promise.resolve({}))
        };
    }
    get listConfig() {
        var _a, _b, _c, _d;
        return {
            relations: ((_a = this.config.list) === null || _a === void 0 ? void 0 : _a.relations) || [],
            searchFields: ((_b = this.config.list) === null || _b === void 0 ? void 0 : _b.searchFields) || [],
            order: ((_c = this.config.list) === null || _c === void 0 ? void 0 : _c.order) || {
                created_at: 'DESC'
            },
            where: ((_d = this.config.list) === null || _d === void 0 ? void 0 : _d.where) || ((req) => Promise.resolve({}))
        };
    }
    list(req_1, res_1) {
        return __awaiter(this, arguments, void 0, function* (req, res, next = () => { }) {
            try {
                console.log('WTF?');
                if (!this.repository)
                    return A_EXPRESS_Context_class_1.A_EXPRESS_Context.Errors.throw(errors_constants_1.A_EXPRESS_CONSTANTS__ERROR_CODES.OVERRIDE_METHOD_OR_PROVIDE_REPOSITORY);
                const data = yield this.repository.getPage({
                    where: yield this.listConfig.where(req),
                    relations: this.listConfig.relations,
                    pagination: {
                        page: req.query.page,
                        pageSize: req.query.pageSize
                    },
                    search: {
                        pattern: req.query.search,
                        include: this.listConfig.searchFields
                    },
                    order: this.listConfig.order
                });
                return res.status(200).send(data);
            }
            catch (error) {
                return next(new a_sdk_types_1.A_SDK_ServerError(error));
            }
        });
    }
    post(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this.repository)
                    return A_EXPRESS_Context_class_1.A_EXPRESS_Context.Errors.throw(errors_constants_1.A_EXPRESS_CONSTANTS__ERROR_CODES.OVERRIDE_METHOD_OR_PROVIDE_REPOSITORY);
                const newEntity = this.repository.create(req.body);
                const savedEntity = yield this.repository.save(newEntity);
                const updated = yield this.repository.findOneOrFail({
                    where: {
                        id: savedEntity.id,
                    },
                    relations: this.getConfig.relations,
                });
                return res.status(200).send(updated);
            }
            catch (error) {
                return next(new a_sdk_types_1.A_SDK_ServerError(error));
            }
        });
    }
    put(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this.repository)
                    return A_EXPRESS_Context_class_1.A_EXPRESS_Context.Errors.throw(errors_constants_1.A_EXPRESS_CONSTANTS__ERROR_CODES.OVERRIDE_METHOD_OR_PROVIDE_REPOSITORY);
                const parsed = a_sdk_types_1.A_SDK_CommonHelper.parseASEID(req.params.aseid);
                yield this.repository.update({
                    id: parseInt(req.params.aseid)
                }, req.body);
                const updated = yield this.repository.findOneOrFail({
                    where: {
                        id: isNaN(parseInt(parsed.id)) ? parsed.id : parseInt(parsed.id),
                    },
                    relations: this.getConfig.relations,
                });
                return res.status(200).send(updated);
            }
            catch (error) {
                return next(new a_sdk_types_1.A_SDK_ServerError(error));
            }
        });
    }
    get(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this.repository)
                    return A_EXPRESS_Context_class_1.A_EXPRESS_Context.Errors.throw(errors_constants_1.A_EXPRESS_CONSTANTS__ERROR_CODES.OVERRIDE_METHOD_OR_PROVIDE_REPOSITORY);
                const parsed = a_sdk_types_1.A_SDK_CommonHelper.parseASEID(req.params.aseid);
                const entity = yield this.repository.findOne({
                    where: Object.assign({ id: isNaN(parseInt(parsed.id)) ? parsed.id : parseInt(parsed.id) }, yield this.getConfig.where(req)),
                    relations: this.getConfig.relations,
                    order: this.getConfig.order
                });
                if (!entity)
                    return A_EXPRESS_Context_class_1.A_EXPRESS_Context.Errors.throw(errors_constants_1.A_EXPRESS_CONSTANTS__ERROR_CODES.ENTITY_NOT_FOUND);
                return res.status(200).send(entity);
            }
            catch (error) {
                return next(new a_sdk_types_1.A_SDK_ServerError(error));
            }
        });
    }
    delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this.repository)
                    return A_EXPRESS_Context_class_1.A_EXPRESS_Context.Errors.throw(errors_constants_1.A_EXPRESS_CONSTANTS__ERROR_CODES.OVERRIDE_METHOD_OR_PROVIDE_REPOSITORY);
                const parsed = a_sdk_types_1.A_SDK_CommonHelper.parseASEID(req.params.aseid);
                yield this.repository.delete({
                    id: isNaN(parseInt(parsed.id)) ? parsed.id : parseInt(parsed.id),
                });
                return res.status(202).send({
                    status: 'OK'
                });
            }
            catch (error) {
                return next(new a_sdk_types_1.A_SDK_ServerError(error));
            }
        });
    }
}
exports.A_EXPRESS_EntityController = A_EXPRESS_EntityController;
__decorate([
    (0, Route_decorator_1.A_EXPRESS_Get)({
        config: {
            identity: false
        }
    }),
    (0, ValidateAccess_decorator_1.A_EXPRESS_ValidateAccess)((qb, self, req) => {
        if (!self.config.entity)
            return A_EXPRESS_Context_class_1.A_EXPRESS_Context.Errors.throw(errors_constants_1.A_EXPRESS_CONSTANTS__ERROR_CODES.SERVICE_CONTROLLER_ENTITY_NOT_SPECIFIED);
        return qb
            .entity(self.config.entity)
            .action(a_arc_1.A_ARC_CONSTANTS__DEFAULT_CRUD_ACTIONS.LIST)
            .allow();
    }),
    (0, AvailableResources_decorator_1.A_EXPRESS_AvailableResources)((qb, self, req) => {
        if (!self.config.entity)
            return A_EXPRESS_Context_class_1.A_EXPRESS_Context.Errors.throw(errors_constants_1.A_EXPRESS_CONSTANTS__ERROR_CODES.SERVICE_CONTROLLER_ENTITY_NOT_SPECIFIED);
        return qb
            .entity(self.config.entity)
            .action(a_arc_1.A_ARC_CONSTANTS__DEFAULT_CRUD_ACTIONS.DELETE)
            .allow();
    })
    /**
     * Defines a Default GET method for the controller. Basically it's an endpoint for getting existing entities
     */
], A_EXPRESS_EntityController.prototype, "list", null);
__decorate([
    (0, Route_decorator_1.A_EXPRESS_Post)(),
    (0, ValidateAccess_decorator_1.A_EXPRESS_ValidateAccess)((qb, self, req) => {
        if (!self.config.entity)
            return A_EXPRESS_Context_class_1.A_EXPRESS_Context.Errors.throw(errors_constants_1.A_EXPRESS_CONSTANTS__ERROR_CODES.SERVICE_CONTROLLER_ENTITY_NOT_SPECIFIED);
        const query = qb
            .entity(self.config.entity)
            .action(a_arc_1.A_ARC_CONSTANTS__DEFAULT_CRUD_ACTIONS.CREATE)
            .allow();
        return query;
    })
    /**
     * Defines a Default POST method for the controller. Basically it's an endpoint for creating new entities
     */
], A_EXPRESS_EntityController.prototype, "post", null);
__decorate([
    (0, Route_decorator_1.A_EXPRESS_Put)(),
    (0, ValidateAccess_decorator_1.A_EXPRESS_ValidateAccess)((qb, self, req) => {
        if (!self.config.entity)
            return A_EXPRESS_Context_class_1.A_EXPRESS_Context.Errors.throw(errors_constants_1.A_EXPRESS_CONSTANTS__ERROR_CODES.SERVICE_CONTROLLER_ENTITY_NOT_SPECIFIED);
        const query = qb
            .entity(self.config.entity)
            .action(a_arc_1.A_ARC_CONSTANTS__DEFAULT_CRUD_ACTIONS.UPDATE)
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
], A_EXPRESS_EntityController.prototype, "put", null);
__decorate([
    (0, Route_decorator_1.A_EXPRESS_Get)(),
    (0, ValidateAccess_decorator_1.A_EXPRESS_ValidateAccess)((qb, self, req) => {
        if (!self.config.entity)
            return A_EXPRESS_Context_class_1.A_EXPRESS_Context.Errors.throw(errors_constants_1.A_EXPRESS_CONSTANTS__ERROR_CODES.SERVICE_CONTROLLER_ENTITY_NOT_SPECIFIED);
        const query = qb
            .entity(self.config.entity)
            .action(a_arc_1.A_ARC_CONSTANTS__DEFAULT_CRUD_ACTIONS.READ)
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
], A_EXPRESS_EntityController.prototype, "get", null);
__decorate([
    (0, Route_decorator_1.A_EXPRESS_Delete)(),
    (0, ValidateAccess_decorator_1.A_EXPRESS_ValidateAccess)((qb, self, req) => {
        if (!self.config.entity)
            return A_EXPRESS_Context_class_1.A_EXPRESS_Context.Errors.throw(errors_constants_1.A_EXPRESS_CONSTANTS__ERROR_CODES.SERVICE_CONTROLLER_ENTITY_NOT_SPECIFIED);
        const query = qb
            .entity(self.config.entity)
            .action(a_arc_1.A_ARC_CONSTANTS__DEFAULT_CRUD_ACTIONS.DELETE)
            .allow();
        return query;
    })
    /**
     * Defines a Default DELETE method for the controller. Basically it's an endpoint for deleting existing entities
     */
], A_EXPRESS_EntityController.prototype, "delete", null);
//# sourceMappingURL=A_EXPRESS_EntityController.class.js.map