import { A_EXPRESS_TYPES__IControllerConfig } from "../types/A_EXPRESS_Controller.types";

export const A_EXPRESS_DEFAULTS__CONTROLLER_CONFIG: A_EXPRESS_TYPES__IControllerConfig = {
    id: 'ASEID',
    http: {
        base: '/',
    },
    auth: {
        enable: false,
    },
    arc: {
        enable: true,
    },


} as const