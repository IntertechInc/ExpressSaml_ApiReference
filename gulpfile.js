var gulp = require('gulp'),
  nodemon = require('gulp-nodemon');

gulp.task('develop', function() {
  livereload.listen();
  nodemon({
    script: 'bin/www',
    ext: 'js jade',
    nodeArgs: ['--debug']
  });
});

gulp.task('default', ['develop']);