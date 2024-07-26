"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.A_EXPRESS_DEFAULTS__APP_CONFIG = void 0;
exports.A_EXPRESS_DEFAULTS__APP_CONFIG = {
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
};
//# sourceMappingURL=A_EXPRESS_App.defaults.js.map