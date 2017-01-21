const gulp = require('gulp');
const b = require('gulp-browserify');
const babel = require('gulp-babel');

function javascript () {
  gulp.src('app.js')
  .pipe(babel({
    presets: ['es2015']
  }))
  .pipe(b())
  .pipe(gulp.dest('build'));
}


gulp.task('javascript', javascript);
gulp.task('default', ['javascript']);
