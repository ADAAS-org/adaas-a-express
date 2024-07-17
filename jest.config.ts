import type { Config } from '@jest/types';

// Sync object
const config: Config.InitialOptions = {
    verbose: true,

    transform: {
        '^.+\\.tsx?$': 'ts-jest'
    },
    moduleNameMapper: {
        "@adaas/a-sdk/constants/(.*)": ["<rootDir>/src/constants/$1"],
        "@adaas/a-sdk/decorators/(.*)": ["<rootDir>/src/decorators/$1"],
        "@adaas/a-sdk/global/(.*)": ["<rootDir>/src/global/$1"],
        "@adaas/a-sdk/types/(.*)": ["<rootDir>/src/types/$1"],
        "@adaas/a-sdk/helpers/(.*)": ["<rootDir>/src/helpers/$1"],
    }

};
export default config;