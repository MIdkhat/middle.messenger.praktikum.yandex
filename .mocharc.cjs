/* eslint-disable import/no-extraneous-dependencies */
const hook = require('css-modules-require-hook');
const sass = require('node-sass');

hook({
  extensions: ['.scss'],
  generateScopedName: '[name]__[local]___[hash:base64:5]',
  preprocessCss: (data, filename) =>
    sass.renderSync({
      data,
      file: filename,
    }).css,
});

module.exports = {
  extension: ['ts'],
  require: ['ts-node/register', '.mocharc.cjs'],
  loader: 'ts-node/esm',
  spec: 'src/**/*.spec.ts',
  'watch-files': ['src'],
  'node-option': [
    'experimental-specifier-resolution=node',
    'loader=ts-node/esm',
    'es-module-specifier-resolution=node',
  ],
  recursive: true,
  timeout: 5000,
  reporter: 'spec',
  bail: true,
  colors: true,
};
