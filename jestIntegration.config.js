const config = require('./jest.config');

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  ...config,
  displayName: 'integration-tests',
  testMatch: ['<rootDir>/tests/**/*.test.ts'],
};
