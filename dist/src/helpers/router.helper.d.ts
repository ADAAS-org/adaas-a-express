import express from 'express';
export declare class A_EXPRESS_RouterHelper {
    static getRotes(app: express.Application): Array<{
        method: string;
        path: string;
    }>;
    static extractPaths(path: never[] | undefined, layer: any, acc: Array<{
        method: string;
        path: string;
    }>): Array<{
        method: string;
        path: string;
    }>;
    static split(thing: any): any;
}
