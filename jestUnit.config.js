const config = require('./jest.config');

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  ...config,
  displayName: 'unit-tests',
  testMatch: ['<rootDir>/tests/**/*.spec.ts'],
};
