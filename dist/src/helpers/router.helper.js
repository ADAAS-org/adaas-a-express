"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.A_EXPRESS_RouterHelper = void 0;
class A_EXPRESS_RouterHelper {
    static getRotes(app) {
        return app._router.stack.reduce((acc, layer) => {
            return this.extractPaths([], layer, acc);
        }, []);
    }
    static extractPaths(path = [], layer, acc) {
        if (layer.route) {
            layer.route.stack.forEach((inLayer) => this.extractPaths(path.concat(this.split(layer.route.path)), inLayer, acc));
        }
        else if (layer.name === 'router' && layer.handle.stack) {
            layer.handle.stack.forEach((inLayer) => this.extractPaths(path.concat(this.split(layer.regexp)), inLayer, acc));
        }
        else if (layer.method) {
            acc.push({
                method: layer.method,
                path: path.concat(this.split(layer.regexp)).filter(Boolean).join('/')
            });
        }
        return acc;
    }
    static split(thing) {
        if (typeof thing === 'string') {
            return thing.split('/');
        }
        else if (thing.fast_slash) {
            return '';
        }
        else {
            const match = thing.toString()
                .replace('\\/?', '')
                .replace('(?=\\/|$)', '$')
                .match(/^\/\^((?:\\[.*+?^${}()|[\]\\\/]|[^.*+?^${}()|[\]\\\/])*)\$\//);
            return match
                ? match[1].replace(/\\(.)/g, '$1').split('/')
                : '<complex:' + thing.toString() + '>';
        }
    }
}
exports.A_EXPRESS_RouterHelper = A_EXPRESS_RouterHelper;
//# sourceMappingURL=router.helper.js.map