const gulp = require('gulp'),
	pug = require('gulp-pug');

const paths = {
	root: './build',
	templates: {
		pages: './src/views/pages/*.pug',
		src: './src/views/**/*.pug',
		dest: './build'
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


exports.templates = templates;
