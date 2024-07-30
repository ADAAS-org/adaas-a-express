import url from 'url';
import http from 'http';
import https from 'https';
import express from 'express';
import { A_EXPRESS_TYPES__INextFunction, A_EXPRESS_TYPES__IRequest, A_EXPRESS_TYPES__IResponse } from '../types/A_EXPRESS_Controller.types';
import { A_SDK_ServerError } from '@adaas/a-sdk-types';
import { A_EXPRESS_CONSTANTS__ERROR_CODES } from '../constants/errors.constants';


export class A_EXPRESS_Proxy {

    constructor(
        /**
         * The path that should be proxied
         */
        public regexp: string,
        /**
         * The target to proxy to
         */
        public target: string,
    ) {
    }



    handler(): (req: A_EXPRESS_TYPES__IRequest, res: A_EXPRESS_TYPES__IResponse, next: A_EXPRESS_TYPES__INextFunction) => void {
        // Proxy middleware function
        return (req, res, next) => {
            const targetUrl = `${this.target}${req.originalUrl}`;
            const parsedUrl = url.parse(targetUrl);
            const protocol = parsedUrl.protocol === 'https:' ? https : http;

            req.adaas.context.Logger.proxy({
                original: req.originalUrl,
                destination: targetUrl
            });

            const options = {
                hostname: parsedUrl.hostname,
                port: parsedUrl.port,
                path: parsedUrl.path,
                method: req.method,
                headers: req.headers
            };

            const proxyReq = protocol.request(options, (proxyRes) => {
                res.writeHead(proxyRes.statusCode || 404, proxyRes.headers);
                proxyRes.pipe(res, { end: true });
            });

            req.pipe(proxyReq, { end: true });

            proxyReq.on('error', (err) => {
                req.adaas.context.Logger.error(new A_SDK_ServerError(err));

                return next(req.adaas.context.Errors.getError(A_EXPRESS_CONSTANTS__ERROR_CODES.UNABLE_TO_PROXY_REQUEST));
            });
        };

    }
}