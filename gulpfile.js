var gulp = require('gulp');
var gulp_concat = require('gulp-concat');
var babel = require('gulp-babel');

gulp.task('default', () =>

	gulp.src('src/js/**/*.js')
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(gulp_concat('index.js'))
		.pipe(gulp.dest('dist/js'))

);

gulp.watch('src/js/**/*.js', ['default']);
