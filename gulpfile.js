var gulp = require('gulp'),
  gutil = require('gulp-util'),
  config = require('config-file'),
  jeditor = require("gulp-json-editor"),
  minifyCss = require('gulp-minify-css'),
  concat = require('gulp-concat'),
  rename = require('gulp-rename'),
  uglify = require('gulp-uglify'),

  jsHint = require('gulp-jshint'),
  prettify = require('gulp-jsbeautifier'),
  livereload = require('gulp-livereload'),
  bowerFiles = require('main-bower-files'),
  bowerNormalizer = require('gulp-bower-normalize'),
  del = require('del'),
  fs = require('fs'),
  bower = require('gulp-bower'),
  exec = require('child_process').exec;

var testunit = {
  jsrt: './src/test/js'
};

var src = {
  jre: [
    './src/main/js/js/lang/Class.js',
    './src/main/js/js/lang/Object.js',
    './src/main/js/js/lang/Array.js',
    './src/main/js/js/lang/Boolean.js',
    './src/main/js/js/lang/Function.js',
    './src/main/js/js/lang/Number.js',
    './src/main/js/js/lang/RegExp.js',
    './src/main/js/js/lang/String.js',
    './src/main/js/js/lang/Throwable.js',
    './src/main/js/js/lang/Exception.js',
    './src/main/js/js/lang/Error.js',
    './src/main/js/js/lang/ClassNotFoundException.js',
    './src/main/js/js/lang/NoSuchMethodException.js',
    './src/main/js/js/lang/NoSuchFieldException.js',
    './src/main/js/js/lang/InternalError.js',
    './src/main/js/js/lang/ClassLoader.js',
    './src/main/js/js/io/Writer.js',
    './src/main/js/js/io/PrintWriter.js',
    './src/main/js/js/io/Console.js',
    './src/main/js/js/lang/System.js',
    './src/main/js/js/net/URLClassLoader.js',
    './src/main/js/org/seajs/SeaClassLoader.js',
    './src/main/js/js/dom/Document.js',
    './src/main/js/atom/misc/Launcher.js'
  ],
  jsrt: './src/main/js'
};

var dest = {
  jre: '.',
  jsrt: './classes/js',
  lib: './lib/'
};

var settings = config("./pom.json");

/****************tasks***************/
gulp.task('pom', function() {
  switch (gutil.env.t || gutil.env.target || gutil.env.type) {
    case "release":
    case "test":
      settings.debug = false;
      break;
    case "snapshort":
    default:
      settings.debug = true;
      break;
  }

  var version = gutil.env.tv || gutil.env.targetversion;
  if (version) {
    settings.version = version;
  }

  return gulp.src("./pom.json")
    .pipe(jeditor(settings))
    .pipe(gulp.dest("./"));
});

gulp.task('bower', ['pom'], function() {
  return gulp.src("./bower.json")
    .pipe(jeditor(settings))
    .pipe(gulp.dest("./"));
});

gulp.task('npm', ['pom'], function() {
  return gulp.src("./package.json")
    .pipe(jeditor(settings))
    .pipe(gulp.dest("./"));
});

gulp.task('env', ['pom', 'bower', 'npm'], function(cb) {
  cb();
});

gulp.task('pre-clean', ['env'], function(cb) {
  cb();
});

gulp.task('clean', ['pre-clean'], function(cb) {
  var error = del([
    //dest.jre + '/jsvm.js',
    //dest.jre + '/jsvm.min.js',
    dest.jsrt + '/*',
    dest.lib + '/*'
  ], function(err, deletedFiles) {
    console.log("##################################################");
    console.log("############### gulp clean finished. #############");
    console.log("##################################################");
    cb(err);
  });
});

gulp.task('post-clean', ['clean'], function(cb) {
  cb();
});

gulp.task('jshint', function() {
  return gulp.src([
      src.jsrt + "/**/*.js",
      testunit.jsrt + "/**/*.js"
    ])
    .pipe(jsHint())
    .pipe(jsHint.reporter('default'));
});

gulp.task('validate', ['post-clean'], function(cb) {
  if (settings.debug) {
    exec('gulp jshint', function(err, stdout, stderr) {
      console.log(stdout);
      if (err) {
        return cb(err);
      }
      cb();
    });
  } else {
    cb();
  }
});

gulp.task('dependancy', function() {
  return bower();
});

gulp.task('initialize', ['validate'], function(cb) {
  exec('gulp dependancy', function(err, stdout, stderr) {
    console.log(stdout);
    if (err) {
      return cb(err);
    }
    cb();
  });
});

gulp.task('format-jsrt', function() {
  return gulp.src(src.jsrt + "/**/*.js")
    .pipe(prettify({
      config: './.jsbeautifyrc',
      mode: 'VERIFY_AND_WRITE'
    }))
    .pipe(gulp.dest(src.jsrt));
});

gulp.task('format', ['format-jsrt'], function(cb) {
  cb();
});

gulp.task('generate-sources', ['initialize'], function(cb) {
  if (settings.debug) {
    exec('gulp format', function(err, stdout, stderr) {
      console.log(stdout);
      if (err) {
        return cb(err);
      }
      cb();
    });
  } else {
    cb();
  }
});

gulp.task('process-sources', ['generate-sources'], function() {
  fs.mkdir('bower_components', 0777, function(err) {});
  return gulp.src(bowerFiles(), {
      base: './bower_components'
    })
    .pipe(bowerNormalizer({
      bowerJson: './bower.json'
    }))
    .pipe(gulp.dest(dest.lib));
});

gulp.task('generate-resources', ['process-sources'], function(cb) {
  cb();
});

gulp.task('resources', [], function(cb) {
  cb();
});
gulp.task('process-resources', ['generate-resources'], function(cb) {
  if (settings.debug) {
    cb();
  } else {
    exec('gulp resources', function(err, stdout, stderr) {
      console.log(stdout);
      cb(err)
    });
  }
});

gulp.task('jsrt', function() {
  return gulp.src(src.jsrt + "/**/*.js")
    .pipe(uglify({
      mangle: true
    }))
    .pipe(gulp.dest(dest.jsrt));
});

gulp.task('jre', ["jsrt"], function() {
  return gulp.src(src.jre)
    .pipe(concat("jsvm.js"))
    .pipe(gulp.dest(dest.jre))
    .pipe(uglify({
      mangle: true
    }))
    .pipe(rename("jsvm.min.js"))
    .pipe(gulp.dest(dest.jre));
});


gulp.task('compile', ['process-resources'], function(cb) {
  if (settings.debug) {
    cb();
  } else {
    exec('gulp jre', function(err, stdout, stderr) {
      console.log(stdout);
      if (err) {
        return cb(err);
      }
      cb();
    });
  }
  console.log("###################################################");
  console.log("############## gulp compile finished. #############");
  console.log("###################################################");
});


gulp.task("repack-file", [], function(cb) {
  del([], function(err, deletedFiles) {
    cb(err);
  });
});

gulp.task("repack-jslib", ["repack-file"], function() {
  return gulp.src('./lib/**/*.js')
    .pipe(uglify({
      mangle: true
    }))
    .pipe(gulp.dest('./lib'));
});

gulp.task('process-classes', ['compile'], function(cb) {
  exec('gulp repack-jslib', function(err, stdout, stderr) {
    console.log(stdout);
    if (err) {
      return cb(err);
    }
    cb();
  });
});

gulp.task('testunit', [], function() {
  return gulp.src(testunit.jsrt + "/**/*.js")
    .pipe(prettify({
      config: './.jsbeautifyrc',
      mode: 'VERIFY_AND_WRITE'
    }))
    .pipe(gulp.dest(testunit.jsrt));
});

gulp.task('generate-test-sources', ['process-classes'], function(cb) {
  if (settings.debug) {
    exec('gulp testunit', function(err, stdout, stderr) {
      console.log(stdout);
      if (err) {
        return cb(err);
      }
      cb();
    });
  } else {
    cb();
  }
});

gulp.task('process-test-sources', ['generate-test-sources'], function(cb) {
  cb();
});
gulp.task('generate-test-resources', ['process-test-sources'], function(cb) {
  cb();
});
gulp.task('process-test-resources', ['generate-test-resources'], function(cb) {
  cb();
});


gulp.task('test-compile', ['process-test-resources'], function(cb) {
  cb();
});
gulp.task('process-test-classes', ['test-compile'], function(cb) {
  cb();
});

gulp.task('test', ['process-test-classes'], function(cb) {
  //TODO 自动化单元测试
  console.log("###################################################");
  console.log("############### gulp test finished. ###############");
  console.log("###################################################");
  cb();
});

gulp.task('prepare-package', ['test'], function(cb) {
  cb();
});

gulp.task('package', ['test'], function(cb) {
  //TODO按照bower结构打包
  console.log("###################################################");
  console.log("############# gulp package finished. ##############");
  console.log("###################################################");
  cb();
});

gulp.task('install', ['package'], function(cb) {
  //TODO添加到本地bower cache
  console.log("###################################################");
  console.log("############# gulp install finished. ##############");
  console.log("###################################################");
  cb();
});

gulp.task('deploy', ['install'], function(cb) {
  //TODO注册到bower
  console.log("###################################################");
  console.log("############# gulp deploy finished. ###############");
  console.log("###################################################");
  cb();
});

gulp.task('watch', function() {
  livereload.listen();

  gulp.watch(src.jsrt, ['jre']);
  gulp.watch([testunit.jsrt], ['testunit']);
  gulp.watch('./bower.json', ['dependancy']);
});

gulp.task('default', ['package'], function(cb) {
  //gulp.start('watch');
});
