const { defaults: tsjPreset } = require('ts-jest/presets');
const { resolve } = require('path');

const root = resolve(__dirname);

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  rootDir: root,
  transform: tsjPreset.transform,
  preset: '@shelf/jest-mongodb',
  testEnvironment: 'node',
  clearMocks: true,
  displayName: 'root-tests',
  testPathIgnorePatterns: ['\\\\node_modules\\\\'],
  collectCoverage: false,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/main/**',
  ],
  coveragePathIgnorePatterns: ['/node_modules/', '/dist/'],
};
