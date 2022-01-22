const { resolve } = require('path');

const root = resolve(__dirname);

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  rootDir: root,
  preset: 'ts-jest',
  testEnvironment: 'node',
  clearMocks: true,
  displayName: 'root-tests',
  testMatch: ['<rootDir>/tests/**/*.spec.ts'],
  testPathIgnorePatterns: ['\\\\node_modules\\\\'],
  collectCoverage: false,
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  coveragePathIgnorePatterns: ['/node_modules/', '/dist/'],
};
