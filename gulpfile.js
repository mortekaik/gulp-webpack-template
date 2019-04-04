const gulp = require('gulp'),
			plumber = require('gulp-plumber'),
			notify = require('gulp-notify'),
			pug = require('gulp-pug'),
			postcss = require('gulp-postcss'),
			sourcemaps = require('gulp-sourcemaps'),
			rename = require('gulp-rename'),
			del = require('del'),
			named = require('vinyl-named'),
			webpackStream = require('webpack-stream'),
			webpack = webpackStream.webpack,
			webpackConfig = require('./webpack.config'),
			browserSync = require('browser-sync').create();

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
	},
	scripts: {
		src: './src/assets/scripts/*.js',
		dest: './build/assets/scripts'
	}
}

// PUG
function templates() {
	return gulp.src(paths.templates.pages)
		.pipe(pug({
			pretty: true
		}))
		.pipe(gulp.dest(paths.root));
}

// SCSS
function styles() {
	return gulp.src(paths.styles.main)
		.pipe(sourcemaps.init())
		.pipe(postcss(require('./postcss.config')))
		.pipe(rename('main.min.css'))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(paths.styles.dest));
}

// JS, Webpack
function scripts() {
	return gulp.src(paths.scripts.src)
		.pipe(plumber({
			errorHandler: notify.onError(err => ({
				title: 'Webpack',
				message: err.message
			}))
		}))
		.pipe(named())
		.pipe(webpackStream(webpackConfig, webpack))
		.pipe(gulp.dest(paths.scripts.dest));
}

// SERVER
function serve() {
	browserSync.init({
		server: paths.root
	});
	browserSync.watch(paths.root + '/**/*.*', browserSync.reload);
}

// CLEAN
function clean() {
	return del(paths.root);
}

// WATCHER
function watch() {
	gulp.watch(paths.styles.src, styles);
	gulp.watch(paths.templates.src, templates);
	gulp.watch(paths.scripts.src, scripts);
}

gulp.task('build', gulp.series(
	clean,
	gulp.parallel(styles, scripts, templates)
));

exports.templates = templates;
exports.styles = styles;
exports.scripts = scripts;
exports.clean = clean;


// DEFAULT
gulp.task('default',
	gulp.series('build', gulp.parallel(serve, watch))
);
