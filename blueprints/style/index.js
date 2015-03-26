var fs   = require('fs-extra');
var path = require('path');
var util = require('util');

module.exports = {
  description: 'Generates a style.scss file',

  beforeInstall: function (options) {
      var moduleDirName = this._locals(options).fileMap.__path__.replace('/' + options.entity.name, '');

      console.log(moduleDirName);

      if (!options.taskOptions.pod) {
          throw new Error('You must use pods with ember-cli-sass-pods. Run with --pod.');
      }
  },

  // locals: function(options) {
  //   // Return custom template variables here.
  //   return {
  //     foo: options.entity.options.foo
  //   };
  // }

  afterInstall: function (options) {
      var entity = options.entity;

      this.addScssToPodsFile(entity.name, {
          name: entity.name,
          root: options.project.root,
      });
  },

  addScssToPodsFile: function(name, options) {
      var importScssPath = path.join(options.root, 'app/styles', 'import.scss'),
          newLine = '@import "app/' + options.name + '/style";\n',
          source;

        console.log(importScssPath);

      if (!fs.existsSync(importScssPath)) {
          fs.writeFileSync(importScssPath, newLine, 'utf8');
      } else {
          source = fs.readFileSync(importScssPath, 'utf-8');
          source += newLine;
          fs.writeFileSync(importScssPath, source);
      }
  }
};
