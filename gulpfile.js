// Generated on 2015-03-20 using generator-jekyllized 0.7.1
'use strict';

var gulp = require('gulp');
// Loads the plugins without having to list all of them, but you need
// to call them as $.pluginname
var $ = require('gulp-load-plugins')();
// "del" is used to clean out directories and such
var del = require('del');
// BrowserSync isn't a gulp package, and needs to be loaded manually
var browserSync = require('browser-sync');
// Need a command for reloading webpages using BrowserSync
var reload = browserSync.reload;
// And define a variable that BrowserSync uses in it's function
var bs;

var php = require('gulp-connect-php');

var path = {
  src   : 'src',
  serve : 'serve',
  site  : 'site'
};

// Deletes the directory that is used to serve the site during development
gulp.task('clean:dev', del.bind(null, [path.serve]));

// Deletes the directory that the optimized site is output to
gulp.task('clean:prod', del.bind(null, [path.site]));

// Runs the build command for Jekyll to compile the site locally
// This will build the site with the production settings
gulp.task('jekyll:build', ['clean:dev'], $.shell.task('jekyll build'));
gulp.task('jekyll:rebuild', ['jekyll:build'], function () { reload; });
gulp.task('jekyll:serve', ['clean:dev'], $.shell.task('jekyll serve'));

gulp.task('jekyll:debug', ['clean:dev', 'clean:prod'], $.shell.task('jekyll serve --verbose --config _config.yml,_config.debug.yml'));

gulp.task('jekyll:prod', ['clean:prod'], $.shell.task('jekyll build --config _config.yml,_config.build.yml'));

// Run JS Lint against your JS
gulp.task('jslint', function () {
  gulp.src('./' + path.serve + '/' + path.js + '/*.js')
    // Checks your JS code quality against your .jshintrc file
    .pipe($.jshint('.jshintrc'))
    .pipe($.jshint.reporter());
});

// Task to upload your site via Rsync to your server
gulp.task('rsync', function () {
  // Load in the variables needed for our Rsync synchronization
  var secret = require('./._rsync.json');

  return gulp.src(path.src + '/**')
    .pipe($.rsync({
      // This uploads the contents of 'root', instead of the folder
      root: path.src + '/mail',
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

// Task to upload your site to your personal GH Pages repo
gulp.task('deploy', function () {
  // Deploys your optimized site, you can change the settings in the html task if you want to
  return gulp.src('./' + path.site + '/**/*')
    .pipe($.ghPages());
});


// Runs "jekyll doctor" on your site to check for errors with your configuration
// and will check for URL errors a well
gulp.task('doctor', $.shell.task('jekyll doctor'));

// BrowserSync will serve our site on a local server for us and other devices to use
// It will also autoreload across all devices as well as keep the viewport synchronized
// between them.
gulp.task('serve:dev', ['jekyll:build'], function () {
  bs = browserSync({
    notify: true,
    // tunnel: '',
    server: {
      baseDir: path.serve
    }
  });
});

// These tasks will look for files that change while serving and will auto-regenerate or
// reload the website accordingly. Update or add other files you need to be watched.
gulp.task('watch', function () {
  gulp.watch([path.src + '/**/*.md', path.src + '/**/*.yml', path.src + '/**/*.html', path.src + '/**/*.xml', path.src + '/**/*.txt', path.src + '/**/*.js', path.src + '/' + path.scss + '/**/*.scss'], ['jekyll:rebuild']);
});

// Serve the site after optimizations to see that everything looks fine
gulp.task('serve:prod', function () {
  php.server({
    base: path.site,
    open: true
  }, function (){
      bs = browserSync({
        proxy: '127.0.0.1:8000',
        notify: false,
        // tunnel: true,
        server: {
          baseDir: path.site
        }
    });
  });
});

// Default task, run when just writing "gulp" in the terminal
gulp.task('default', ['serve:dev', 'watch']);

// Checks your CSS, JS and Jekyll for errors
gulp.task('check', ['jslint', 'doctor'], function () {
  // Better hope nothing is wrong.
});

// Builds the site but doesn't serve it to you
gulp.task('build', ['jekyll:prod'], function () {});

// Builds your site with the "build" command and then runs all the optimizations on
// it and outputs it to "./site"
gulp.task('publish', ['build'], function () {
  gulp.start('html', 'copy', 'images', 'fonts');
});
