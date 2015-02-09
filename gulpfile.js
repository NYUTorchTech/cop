// Generated on 2015-02-05 using generator-jekyllized 0.7.1
'use strict';

var gulp = require('gulp');
// Loads the plugins without having to list all of them, but you need
// to call them as $.pluginname
var $ = require('gulp-load-plugins')();
// 'del' is used to clean out directories and such
var del = require('del');
// BrowserSync isn't a gulp package, and needs to be loaded manually
var browserSync = require('browser-sync');
// merge is used to merge the output from two different streams into the same stream
var merge = require('merge-stream');
// Need a command for reloading webpages using BrowserSync
var reload = browserSync.reload;
// And define a variable that BrowserSync uses in it's function
var bs;

var php = require('gulp-connect-php');

// useful file paths
var path = {
  src    : 'src',
  build  : 'serve',
  deploy : 'site',
  bower  : '_bower_components',
  assets : 'assets',
  css    : 'assets/css',
  js     : 'assets/js',
  img    : 'assets/img',
  fonts  : 'assets/fonts'
};

var wiredep = require('wiredep');

// Deletes the directory that is used to serve the site during development
gulp.task('clean:dev', del.bind(null, [path.build]));

// Deletes the directory that the optimized site is output to
gulp.task('clean:prod', del.bind(null, [path.deploy]));

// Runs the build command for Jekyll to compile the site locally
// This will build the site with the production settings
gulp.task('jekyll:dev', $.shell.task('jekyll build'));
gulp.task('jekyll-rebuild', ['jekyll:dev'], function () { reload; });

// Almost identical to the above task, but instead we load in the build configuration
// that overwrites some of the settings in the regular configuration so that you
// don't end up publishing your drafts or future posts
gulp.task('jekyll:prod', $.shell.task('jekyll build --config _config.yml,_config.build.yml'));

// Optimizes the images that exists
gulp.task('images', function () {
  return gulp.src(path.src + '/' + path.img +'/**')
    .pipe($.changed(path.deploy + '/' + path.img))
    .pipe($.imagemin({
      // Lossless conversion to progressive JPGs
      progressive: true,
      // Interlace GIFs for progressive rendering
      interlaced: true
    }))
    .pipe(gulp.dest(path.deploy + '/' + path.img))
    .pipe($.size({title: 'images'}));
});

// Copy over fonts to the path.deploy directory
gulp.task('fonts', function () {
  return gulp.src(path.src + '/' + path.fonts + '/**')
    .pipe(gulp.dest(path.deploy + '/' + path.fonts))
    .pipe($.size({ title: 'fonts' }));
});


// Injecting our bower components and dependencies
gulp.task('loaddeps', function() {

  gulp.src(path.bower + '/font-awesome/fonts/**')
    .pipe(gulp.dest(path.src + '/' + path.fonts));

  gulp.src(wiredep().js).pipe(gulp.dest(path.src + '/' + path.js + '/vendor/'));
  gulp.src(wiredep().css).pipe(gulp.dest(path.src + '/' + path.css  + '/vendor/'));

  gulp.src(path.src + '/_layouts/default.html')
    .pipe(wiredep.stream({
      fileTypes: {
        html: {
          replace: {
            js: function(filePath) {
              return '<script src="/' + path.js + '/vendor/'+ filePath.split('/').pop() + '"></script>';
            },
            css: function(filePath) {
              return '<link rel="stylesheet" href="' + path.css + '/vendor/' + filePath.split('/').pop() + '"/>';
            }
          }
        }
      }
    }))

    .pipe($.inject(
      gulp.src([path.src + '/' + path.js +'/**/*.js'], { read: false }), {
        addRootSlash: false,
        transform: function(filePath, file, i, length) {
          return '<script src="' + filePath.replace(path.src, '') + '"></script>';
        }
      }))

    .pipe($.inject(
      gulp.src([path.src + '/' + path.css +'/**/*.css'], { read: false }), {
        addRootSlash: false,
        transform: function(filePath, file, i, length) {
          return '<link rel="stylesheet" href="' + filePath.replace(path.src, '') + '"/>';
        }
      }))
    .pipe(gulp.dest(path.src + '/_layouts/'));
});

// Copy xml and txt files to the path.deploy directory
gulp.task('copy', function () {
  return gulp.src([path.build + '/*.txt', path.build + '/*.xml'])
    .pipe(gulp.dest(path.deploy))
    .pipe($.size({ title: 'xml & txt' }));
});

// Optimizes all the CSS, HTML and concats the JS etc
gulp.task('html', function () {
  var assets = $.useref.assets({searchPath: path.build});

  return gulp.src(path.build + '/**/*.html')
    .pipe(assets)
    // Concatenate JavaScript files and preserve important comments
    .pipe($.if('*.js', $.uglify({preserveComments: 'some'})))
    // Minify CSS
    .pipe($.if('*.css', $.minifyCss()))
    // Start cache busting the files
    .pipe($.revAll({ ignore: ['.eot', '.svg', '.ttf', '.woff', '.php'] }))
    .pipe(assets.restore())
    // Conctenate your files based on what you specified in _layout/header.html
    .pipe($.useref())
    // Replace the asset names with their cache busted names
    .pipe($.revReplace())
    // Minify HTML
    // .pipe($.if('*.html', $.htmlmin({
    //   removeComments: true,
    //   removeCommentsFromCDATA: true,
    //   removeCDATASectionsFromCDATA: true,
    //   collapseWhitespace: true,
    //   collapseBooleanAttributes: true,
    //   removeRedundantAttributes: true
    // })))
    // Send the output to the correct folder
    .pipe(gulp.dest('site'))
    .pipe($.size({title: 'optimizations'}));
});



// Run JS Lint against your JS
gulp.task('jslint', function () {
  gulp.src('./' + path.build + '/' + path.js + '/*.js')
    // Checks your JS code quality against your .jshintrc file
    .pipe($.jshint('.jshintrc'))
    .pipe($.jshint.reporter());
});

// Runs 'jekyll doctor' on your site to check for errors with your configuration
// and will check for URL errors a well
gulp.task('doctor', $.shell.task('jekyll doctor'));

// BrowserSync will serve our site on a local server for us and other devices to use
// It will also autoreload across all devices as well as keep the viewport synchronized
// between them.
gulp.task('serve:dev', ['jekyll:dev'], function () {
  bs = browserSync({
    notify: true,
    // tunnel: '',
    server: {
      baseDir: path.build
    }
  });
});

// Task to upload your site via Rsync to your server
gulp.task('deploy', function () {
  // Load in the variables needed for our Rsync synchronization
  var secret = require('./._rsync.json');

  return gulp.src('site/**')
    .pipe($.rsync({
      // This uploads the contents of 'root', instead of the folder
      root: 'site',
      // Credentials ignored by repository
      hostname: secret.hostname,
      username: secret.username,
      destination: secret.destination,
      // Incremental uploading, adds a small delay but minimizes the amount of files transferred
      // incremental: true,
      clean: true,
      recursive: true,
      // Shows the progress on your files while uploading
      progress: true
  }));
});

// These tasks will look for files that change while serving and will auto-regenerate or
// reload the website accordingly. Update or add other files you need to be watched.
gulp.task('watch', function () {
  gulp.watch([path.src + '/**/*.md', path.src + '/**/*.html', path.src + '/**/*.xml', path.src + '/**/*.txt', path.src + '/**/*.js', path.src + '/**/*.scss', path.src + '/**/*.yml'], ['jekyll-rebuild']);
  gulp.watch([path.build + '/' + path.css + '/*.css'], reload);
});


gulp.task('connect-sync', function() {
  php.server({}, function (){
    browserSync({
      proxy: 'localhost:8000'
    });
  });

  gulp.watch('**/*.php').on('change', function () {
    browserSync.reload();
  });
});

// Serve the site after optimizations to see that everything looks fine
gulp.task('serve:prod', function () {
  php.server({
    base: path.deploy,
    open: true
  }, function (){
      bs = browserSync({
        proxy: '127.0.0.1:8000',
        notify: false,
        // tunnel: true,
        server: {
          baseDir: path.deploy
        }
    });
  });
});




// Default task, run when just writing 'gulp' in the terminal
gulp.task('default', ['serve:dev', 'watch']);

// Checks your CSS, JS and Jekyll for errors
gulp.task('check', ['jslint', 'doctor'], function () {
  // Better hope nothing is wrong.
});

// Builds the site but doesn't serve it to you
gulp.task('build', ['jekyll:prod'], function () {});

// Builds your site with the 'build' command and then runs all the optimizations on
// it and outputs it to './site'
gulp.task('publish', ['build'], function () {
  gulp.start('html', 'copy', 'images', 'fonts');
});
