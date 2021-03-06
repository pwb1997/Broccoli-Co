module.exports = {
    roots: ['<rootDir>/src'],

    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },

    setupFilesAfterEnv: [],

    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',

    testEnvironment: 'jest-environment-jsdom',

    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],

    moduleNameMapper: {
        '^lodash-es$': 'lodash',
    },

    collectCoverageFrom: ['src/**/*.{ts,tsx}'],

    coveragePathIgnorePatterns: ['src/App.tsx', 'src/main.tsx', 'd.ts'],

    coverageReporters: ['json-summary', 'text', 'lcov'],
};
