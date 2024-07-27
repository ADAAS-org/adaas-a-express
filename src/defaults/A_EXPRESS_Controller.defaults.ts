import { A_EXPRESS_TYPES__ControllerConfig, A_EXPRESS_TYPES__IRequest } from "../types/A_EXPRESS_Controller.types";


export const A_EXPRESS_DEFAULTS__CONTROLLER_CONFIG: A_EXPRESS_TYPES__ControllerConfig = {
    id: 'ASEID',
    http: {
        base: '/',
        expose: ['post', 'get', 'put', 'delete', 'list']
    },
    auth: {
        enable: false,
    },
    arc: {
        enable: true,
    }
}