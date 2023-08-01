/* eslint-disable import/no-extraneous-dependencies */
const hook = require('css-modules-require-hook');
const sass = require('node-sass');

module.exports = {
  extension: ['ts', 'scss'],
  require: 'ts-node/register',
  loader: 'ts-node/esm',
  spec: 'src/**/*.spec.ts',
  'es-module-specifier-resolution': 'node',
  recursive: true,
  timeout: 5000,
  reporter: 'spec',
  bail: true,
  colors: true,
};

hook({
  extensions: ['.scss'],
  preprocessCss: (data) => sass.renderSync({ data }).css,
});
