/**
 * Created by xiaobxia on 2017/8/11.
 */
const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass');
const del = require('del');
const sourcemaps = require('gulp-sourcemaps');

gulp.task('clean', function () {
  return del('./dist');
});

gulp.task('scss', function () {
  return gulp.src('./scss/index.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist'));
});

gulp.task('server', function (cb) {
  browserSync({
    server: {
      baseDir: './'
    },
    port: 3000,
    notify: false,
    ghostMode: false,
    open: true
  }, cb);
});

gulp.task('build', gulp.series('clean', 'scss'));

gulp.task('watch', function () {
  function serverReload(cb) {
    browserSync.reload();
    cb();
  }

  gulp.watch('./scss', gulp.series('build', serverReload));
});

gulp.task('default', gulp.series('build', 'server', 'watch'));
