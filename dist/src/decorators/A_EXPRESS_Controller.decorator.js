"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.A_EXPRESS_ControllerDefinition = A_EXPRESS_ControllerDefinition;
exports.A_EXPRESS_Controller = A_EXPRESS_Controller;
exports.A_EXPRESS_ServerDelegate = A_EXPRESS_ServerDelegate;
exports.A_EXPRESS_ServerCommands = A_EXPRESS_ServerCommands;
exports.A_EXPRESS_AppInteractions = A_EXPRESS_AppInteractions;
const a_sdk_types_1 = require("@adaas/a-sdk-types");
const A_EXPRESS_Decorators_storage_1 = require("../storage/A_EXPRESS_Decorators.storage");
const A_EXPRESS_CRUDController_defaults_1 = require("../defaults/A_EXPRESS_CRUDController.defaults");
const A_EXPRESS_Controller_defaults_1 = require("../defaults/A_EXPRESS_Controller.defaults");
function A_EXPRESS_ControllerDefinition(entity, repository, config) {
    return function (constructor) {
        const existedMeta = A_EXPRESS_Decorators_storage_1.A_EXPRESS_Storage.get(constructor) || new Map();
        existedMeta.set(A_EXPRESS_Decorators_storage_1.A_EXPRESS_STORAGE__DECORATORS_CONTROLLER_CONFIG_KEY, config);
        existedMeta.set(A_EXPRESS_Decorators_storage_1.A_EXPRESS_STORAGE__DECORATORS_CONTROLLER_REPOSITORY_KEY, repository);
        existedMeta.set(A_EXPRESS_Decorators_storage_1.A_EXPRESS_STORAGE__DECORATORS_CONTROLLER_ENTITY_KEY, entity);
        A_EXPRESS_Decorators_storage_1.A_EXPRESS_Storage.set(constructor, existedMeta);
        return constructor;
    };
}
function A_EXPRESS_Controller(config) {
    return A_EXPRESS_ControllerDefinition(undefined, undefined, a_sdk_types_1.A_SDK_CommonHelper.deepCloneAndMerge(config, A_EXPRESS_Controller_defaults_1.A_EXPRESS_DEFAULTS__CONTROLLER_CONFIG));
}
function A_EXPRESS_ServerDelegate(entity, repository, config) {
    var _a;
    return A_EXPRESS_ControllerDefinition(entity, repository, a_sdk_types_1.A_SDK_CommonHelper.deepCloneAndMerge(Object.assign(Object.assign({}, config), { http: Object.assign(Object.assign({}, (config.http || {})), { base: '/-s-dlg-' + (((_a = config === null || config === void 0 ? void 0 : config.http) === null || _a === void 0 ? void 0 : _a.base) || '') }) }), A_EXPRESS_CRUDController_defaults_1.A_EXPRESS_DEFAULTS__CURD_CONFIG));
}
function A_EXPRESS_ServerCommands(entity, repository, config) {
    var _a;
    return A_EXPRESS_ControllerDefinition(entity, repository, a_sdk_types_1.A_SDK_CommonHelper.deepCloneAndMerge(Object.assign(Object.assign({}, config), { http: Object.assign(Object.assign({}, (config.http || {})), { base: '/-s-cmd-' + (((_a = config === null || config === void 0 ? void 0 : config.http) === null || _a === void 0 ? void 0 : _a.base) || '') }) }), A_EXPRESS_CRUDController_defaults_1.A_EXPRESS_DEFAULTS__CURD_CONFIG));
}
function A_EXPRESS_AppInteractions(entity, repository, config) {
    return A_EXPRESS_ControllerDefinition(entity, repository, a_sdk_types_1.A_SDK_CommonHelper.deepCloneAndMerge(config, A_EXPRESS_CRUDController_defaults_1.A_EXPRESS_DEFAULTS__CURD_CONFIG));
}
//# sourceMappingURL=A_EXPRESS_Controller.decorator.js.map