const config = require('./jest.config');
const { defaults: tsjPreset } = require('ts-jest/presets');

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  ...config,
  displayName: 'integration-tests',
  testMatch: ['<rootDir>/tests/**/*.test.ts'],
  transform: tsjPreset.transform,
  preset: '@shelf/jest-mongodb',
};
