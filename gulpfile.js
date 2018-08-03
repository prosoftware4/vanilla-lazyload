var gulp = require("gulp");
var eslint = require("gulp-eslint");
var rollup = require("gulp-rollup");
var sourcemaps = require("gulp-sourcemaps");
var rename = require("gulp-rename");
var babel = require("gulp-babel");
var uglify = require("gulp-uglify");

var destFolder = "./dist";

gulp.task("lint", function() {
	process.env.NODE_ENV = "release";
	return (
		gulp.
			src("./src/**/*.js").
			// ----------- linting --------------
			pipe(eslint()).
			pipe(eslint.format()).
			pipe(eslint.failAfterError()) // --> failing if errors
	);
});

gulp.task("dist-es", function() {
	process.env.NODE_ENV = "release";
	return (
		gulp.
			src("./src/**/*.js").
			// ----------- rolling up --------------
			pipe(
				rollup({
					output: { name: "LazyLoad", format: "es" },
					input: "./src/lazyload.js"
				})
			).
			pipe(rename("lazyload-es.js")).
			pipe(gulp.dest(destFolder)) // --> writing rolledup
	);
});

gulp.task("dist-cjs", function() {
	process.env.NODE_ENV = "release";
	return (
		gulp.
			src("./src/**/*.js").
			pipe(sourcemaps.init()).
			// ----------- rolling up --------------
			pipe(
				rollup({
					output: { name: "LazyLoad", format: "cjs" },
					input: "./src/lazyload.js"
				})
			).
			// ----------- babelizing --------------
			pipe(babel()).
			pipe(rename("lazyload-cjs.js")).
			pipe(gulp.dest(destFolder)). // --> writing babelized ES5
			// ----------- minifying --------------
			pipe(uglify()).
			pipe(rename("lazyload-cjs.min.js")).
			pipe(sourcemaps.write("")). // --> writing sourcemap
			pipe(gulp.dest(destFolder)) // --> writing uglified
	);
});

gulp.task("dist-amd", function() {
	process.env.NODE_ENV = "release";
	return (
		gulp.
			src("./src/**/*.js").
			pipe(sourcemaps.init()).
			// ----------- rolling up --------------
			pipe(
				rollup({
					output: { name: "LazyLoad", format: "amd" },
					input: "./src/lazyload.js"
				})
			).
			// ----------- babelizing --------------
			pipe(babel()).
			pipe(rename("lazyload-amd.js")).
			pipe(gulp.dest(destFolder)). // --> writing babelized ES5
			// ----------- minifying --------------
			pipe(uglify()).
			pipe(rename("lazyload-amd.min.js")).
			pipe(sourcemaps.write("")). // --> writing sourcemap
			pipe(gulp.dest(destFolder)) // --> writing uglified
	);
});

gulp.task("dist-umd", function() {
	process.env.NODE_ENV = "release";
	return (
		gulp.
			src("./src/**/*.js").
			pipe(sourcemaps.init()).
			// ----------- rolling up --------------
			pipe(
				rollup({
					output: { name: "LazyLoad", format: "umd" },
					input: "./src/lazyload.js"
				})
			).
			// ----------- babelizing --------------
			pipe(babel()).
			pipe(rename("lazyload-umd.js")).
			pipe(gulp.dest(destFolder)). // --> writing babelized ES5
			// ----------- minifying --------------
			pipe(uglify()).
			pipe(rename("lazyload-umd.min.js")).
			pipe(sourcemaps.write("")). // --> writing sourcemap
			pipe(gulp.dest(destFolder)) // --> writing uglified
	);
});

gulp.task("watch", function() {
	gulp.watch("./src/**/*.js", [
		"lint",
		"dist-es",
		"dist-cjs",
		"dist-amd",
		"dist-umd"
	]);
});
