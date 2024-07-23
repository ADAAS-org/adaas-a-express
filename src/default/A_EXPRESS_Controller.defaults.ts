import { A_ARC_CONSTANTS__DEFAULT_CRUD_ACTIONS } from "@adaas/a-arc";
import { A_EXPRESS_TYPES__EntityControllerConfig } from "../types/A_EXPRESS_EntityController.types";
import { A_EXPRESS_TYPES__ControllerConfig, A_EXPRESS_TYPES__IRequest } from "../types/A_EXPRESS_Controller.types";
import { A_EXPRESS_Context } from "../global/A_EXPRESS_Context.class";
import { A_EXPRESS_CONSTANTS__ERROR_CODES } from "../constants/errors.constants";
import { A_SDK_CommonHelper } from "@adaas/a-sdk-types";


export const A_EXPRESS_DEFAULTS__CONTROLLER_CONFIG: A_EXPRESS_TYPES__ControllerConfig = {
    base: '',
    auth: false,
    identifierType: 'ASEID',
    ignoreDefaultMethods: [],
}