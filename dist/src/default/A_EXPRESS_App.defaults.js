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
        health: {
            exclude: false,
            versionPath: '',
            verbose: false
        },
        auth: {
            exclude: false,
            redirectUrl: ''
        },
        permissions: {
            migrate: true
        }
    },
};
//# sourceMappingURL=A_EXPRESS_App.defaults.js.map