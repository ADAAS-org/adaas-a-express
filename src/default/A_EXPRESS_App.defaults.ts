import { A_EXPRESS_TYPES__AppConfig } from "../types/A_EXPRESS_App.types";


export const A_EXPRESS_DEFAULTS__APP_CONFIG: A_EXPRESS_TYPES__AppConfig = {
    namespace: 'a-express',
    prefix: '/api',
    cors: {
        options: {}
    },
    permissions: [],
    port: 3000,
    errors: [],
    routes: [],
    defaults: {
        ignoreHealth: true,
        exclude: {
            health: false,
            auth: false,
            metrics: false
        }
    },

}