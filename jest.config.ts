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
        "@adaas/a-sdk/controllers/(.*)": ["<rootDir>/src/controllers/$1"],
        "@adaas/a-sdk/defaults/(.*)": ["<rootDir>/src/defaults/$1"],
        "@adaas/a-sdk/middleware/(.*)": ["<rootDir>/src/middleware/$1"],
    }

};
export default config;