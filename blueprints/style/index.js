var fs   = require('fs-extra');
var path = require('path');
var mkdirp = require('mkdirp');
var util = require('util');

module.exports = {
  podsDir: '',

  description: 'Generates a style.scss file',

  beforeInstall: function (options) {
      this.podsDir = this._locals(options).fileMap.__path__.replace('/' + options.entity.name, '');
      this.podsDir = this.podsDir.replace(options.entity.name, '');

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
      //console.log(util.inspect(options.project, false, null));
      var entity = options.entity;

      addScssToImportFile(entity.name, {
          name: entity.name,
          root: options.project.root,
          podsDir: this.podsDir
      });
  }
};

function addScssToImportFile (name, options) {
      var importFile = options.podsDir ? options.podsDir : 'pods',
          filePath = path.join(options.root, 'app/styles'),
          importScssPath = path.join(filePath, importFile + '.scss'),
          podsDir = options.podsDir ? options.podsDir + '/' : '',
          newLine = '@import "' + podsDir + options.name + '/style";\n',
          source;

      if (!fs.existsSync(filePath)) {
        mkdirp(filePath);
      }

      if (!fs.existsSync(importScssPath)) {
          fs.writeFileSync(importScssPath, newLine, 'utf8');
      } else {
          source = fs.readFileSync(importScssPath, 'utf-8');
          source += newLine;
          fs.writeFileSync(importScssPath, source);
      }
  }
