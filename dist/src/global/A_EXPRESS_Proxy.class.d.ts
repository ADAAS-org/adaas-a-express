import { A_EXPRESS_TYPES__INextFunction, A_EXPRESS_TYPES__IRequest, A_EXPRESS_TYPES__IResponse } from '../types/A_EXPRESS_Controller.types';
export declare class A_EXPRESS_Proxy {
    /**
     * The path that should be proxied
     */
    regexp: string;
    /**
     * The target to proxy to
     */
    target: string;
    constructor(
    /**
     * The path that should be proxied
     */
    regexp: string, 
    /**
     * The target to proxy to
     */
    target: string);
    handler(): (req: A_EXPRESS_TYPES__IRequest, res: A_EXPRESS_TYPES__IResponse, next: A_EXPRESS_TYPES__INextFunction) => void;
}
