import gulp             from 'gulp';
import sass             from 'gulp-sass';
import autoprefixer     from 'gulp-autoprefixer';
import sourcemaps       from 'gulp-sourcemaps';
import imagemin         from 'gulp-imagemin';

// Paths
const assets = {
  css: ['src/scss/*.scss'],
  js: ['src/scripts/*.js']
};

// JS
gulp.task('script', () => {
    return gulp.src(assets.js)
      .pipe(gulp.dest('dist/scripts'))
});
 
// Sass
gulp.task('sass', () => {
    return gulp.src(assets.css)
      .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError))
      .pipe(autoprefixer())
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('dist/css'))
});

// Image Optimization
gulp.task('imagemin', () =>
    gulp.src('src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))
);

// Watch
gulp.task('watch', function () {
    return gulp.watch('src/scss/*.scss', ['sass']);
});