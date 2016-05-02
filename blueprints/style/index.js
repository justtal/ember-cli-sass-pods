var fs   = require('fs-extra');
var path = require('path');
var mkdirp = require('mkdirp');
var util = require('util');

module.exports = {
  podsDir: '',

  description: 'Generates a style.scss file',

  beforeInstall: function (options, locals) {
      // replace \ with / for compatibility with windows-style nested paths
      this.podsDir = locals.fileMap.__path__.replace(/\\/g, '/');
      this.podsDir = this.podsDir.replace('/' + options.entity.name, '');
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
  },

  afterUninstall: function(options) {
        var entity = options.entity;

        removeScssFromImportFile(entity.name, {
          name: entity.name,
          root: options.project.root,
          podsDir: this.podsDir
        });
    }
};

function setSharedOpts(options) {
    var opts = {};
    opts.importFile = options.podsDir ? options.podsDir.replace(/(\\|\/)$/, '') : 'pods';
    opts.filePath = path.join(options.root, 'app/styles');
    opts.importScssPath = path.join(opts.filePath, opts.importFile + '.scss');
    opts.podsDir = options.podsDir ? opts.importFile + '/' : '';
    opts.newLine = '@import "app/' + opts.podsDir + options.name + '/style";\n';
    return opts;
}

function addScssToImportFile (name, options) {
    var sharedOpts = setSharedOpts(options),
        source;

    if (!fs.existsSync(sharedOpts.filePath)) {
        mkdirp(sharedOpts.filePath);
    }

    if (!fs.existsSync(sharedOpts.importScssPath)) {
        fs.writeFileSync(sharedOpts.importScssPath, sharedOpts.newLine, 'utf8');
    } else {
        source = fs.readFileSync(sharedOpts.importScssPath, 'utf-8');
        source += sharedOpts.newLine;
        fs.writeFileSync(sharedOpts.importScssPath, source);
    }
}

function removeScssFromImportFile(name, options) {
    var sharedOpts = setSharedOpts(options),
        source;

    source = fs.readFileSync(sharedOpts.importScssPath, 'utf-8');
    sourceArray = source.split('\n');
    sourceArrayMatchedIndex = sourceArray.indexOf(sharedOpts.newLine.replace('\n', ''));

    if (sourceArrayMatchedIndex > -1) {
        delete sourceArray[sourceArrayMatchedIndex];
    }
    
    source = sourceArray.filter(Boolean).join('\n').trim() + '\n';
    fs.writeFileSync(sharedOpts.importScssPath, source);
}
