const { JSDOM } = require('jsdom');

// /* eslint-disable import/no-extraneous-dependencies */
// const hook = require('css-modules-require-hook');
// const sass = require('node-sass');
// hook({
//   extensions: ['.scss'],
//   generateScopedName: '[name]__[local]___[hash:base64:5]',
//   preprocessCss: (data, filename) =>
//     sass.renderSync({
//       data,
//       file: filename,
//     }).css,
// });

const { window } = new JSDOM('<div id="app"></div>', {
  url: 'http://localhost:5173',
});

global.window = window;
global.document = window.document;
global.DocumentFragment = window.DocumentFragment;

// require.extensions['.hbs'] = function (module, filename) {
//   const contents = fs.readFileSync(filename, 'utf-8');

//   module.exports = Handlebars.compile(contents);
// };

require.extensions['.scss'] = function () {
  module.exports = () => ({});
};

module.exports = {
  extension: ['ts'],
  require: ['ts-node/register', '.mochaConfig.cjs'],
  loader: 'ts-node/esm',
  spec: 'src/**/*.test.ts',
  'watch-files': ['src'],
  'node-option': [
    'loader=ts-node/esm',
    'experimental-specifier-resolution=node',
    'es-module-specifier-resolution=node',
  ],
  recursive: true,
  timeout: 5000,
  reporter: 'spec',
  bail: true,
  colors: true,
};
