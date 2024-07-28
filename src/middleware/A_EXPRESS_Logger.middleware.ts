import { A_EXPRESS_TYPES__INextFunction, A_EXPRESS_TYPES__IRequest, A_EXPRESS_TYPES__IResponse } from '../types/A_EXPRESS_Controller.types';


export class A_EXPRESS_LoggerMiddleware {

    static logRequest(
        config: {
            ignore: Array<string>
        }
    ) {
        return async (req: A_EXPRESS_TYPES__IRequest, res: A_EXPRESS_TYPES__IResponse, next: A_EXPRESS_TYPES__INextFunction) => {
            const startTime = process.hrtime();

            if (!config.ignore.includes(req.originalUrl))
                res.on('finish', () => {
                    const elapsedTime = process.hrtime(startTime);
                    const elapsedMilliseconds = elapsedTime[0] * 1000 + elapsedTime[1] / 1e6;

                    req.adaas.context.Logger.route({
                        method: req.method,
                        url: req.originalUrl,
                        status: res.statusCode,
                        responseTime: elapsedMilliseconds.toFixed(3)
                    });
                });

            next();
        }
    }
}