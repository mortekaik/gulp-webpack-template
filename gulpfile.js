const gulp = require('gulp'),
			pug = require('gulp-pug'),
			postcss = require('gulp-postcss'),
			sourcemaps = require('gulp-sourcemaps'),
			rename = require('gulp-rename'),
			del = require('del');

const paths = {
	root: './build',
	templates: {
		pages: './src/views/pages/*.pug',
		src: './src/views/**/*.pug',
		dest: './build'
	},
	styles: {
		main: './src/assets/styles/main.scss',
		src: './src/assets/styles/**/*.scss',
		dest: './build/assets/styles'
	}
}

// PUG
function templates() {
	return gulp.src(paths.templates.pages)
		.pipe(pug({
			pretty: true
		}))
		.pipe(gulp.dest(paths.root))
}

// SCSS
function styles() {
	return gulp.src(paths.styles.main)
		.pipe(sourcemaps.init())
		.pipe(postcss(require('./postcss.config')))
		.pipe(rename('main.min.css'))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(paths.styles.dest))
}

// CLEAN
function clean() {
	return del(paths.root);
}


exports.templates = templates;
exports.styles = styles;
exports.clean = clean;


// DEFAULT
gulp.task('default', gulp.series(
	clean,
	gulp.parallel(styles, templates)
));
