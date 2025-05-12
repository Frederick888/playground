/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: 'node',
  preset: 'ts-jest/presets/default-esm',
  testPathIgnorePatterns: ['/dist/', '/node_modules/'],
  testMatch: ['<rootDir>/spec/**/*.spec.ts'],
  coveragePathIgnorePatterns: ['<rootDir>/dist/'],
  transform: {
    '^.+.tsx?$': ['ts-jest', { useESM: true, isolatedModules: true }],
  },
  globalSetup: '<rootDir>/spec/harness/globalSetup.ts',
  globalTeardown: '<rootDir>/spec/harness/globalTeardown.ts',
  setupFilesAfterEnv: [
    '<rootDir>/spec/harness/setupTestRedis.ts'
  ]
}
