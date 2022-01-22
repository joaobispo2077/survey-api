module.exports = {
  '(src|tests)/**/*.ts': [
    'prettier --write',
    'eslint --fix',
    'npm run test:staged',
  ],
};
