var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var vinylSourceStream = require('vinyl-source-stream');
var vinylBuffer = require('vinyl-buffer');
var ngAnnotate = require('gulp-ng-annotate');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');

gulp.task('default', function () {
    var sources = browserify({
        entries: 'src/entry',
        debug: true
    })
        .transform(babelify.configure({ presets: ["es2015"] }));

    return sources.bundle()
        .pipe(vinylSourceStream('app.min.js'))
        .pipe(vinylBuffer())
        //.pipe(ngAnnotate())
        //.pipe(uglify())
        .pipe(gulp.dest('build/js/'));
});

gulp.task('css', function () {    
    return gulp.src('src/styles/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('build/css/'));
})
