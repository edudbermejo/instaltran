var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var vinylSourceStream = require('vinyl-source-stream');
var vinylBuffer = require('vinyl-buffer');

gulp.task('default', function () {
    var sources = browserify({
        entries: 'src/heart.js',
        debug: true
    })
    .transform(babelify.configure({ presets: ["es2015"] }));

    return sources.bundle()
        .pipe(vinylSourceStream('app.min.js'))
        .pipe(vinylBuffer())
        .pipe(gulp.dest('build/js/'));
});
