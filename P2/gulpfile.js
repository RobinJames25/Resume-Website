var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass')(require('sass'));

// Compile SASS into CSS & auto-inject into browsers
function compileSass() {
    return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'])
        .pipe(sass().on('error', sass.logError)) // Error handling
        .pipe(gulp.dest('src/css'))
        .pipe(browserSync.stream());
}

// Move the JavaScript files into our /src/js folder
function moveJs() {
    return gulp.src([
        'node_modules/bootstrap/dist/js/bootstrap.min.js',
        'node_modules/tether/dist/js/tether.min.js',
        'node_modules/jquery/dist/jquery.min.js'
    ])
    .pipe(gulp.dest('src/js'))
    .pipe(browserSync.stream());
}

// Move font-awesome fonts folder to /src/fonts
function moveFonts() {
    return gulp.src(['node_modules/font-awesome/fonts/*'])
    .pipe(gulp.dest('src/fonts'))
    .pipe(browserSync.stream());
}

// Move font-awesome CSS to /src/css
function moveCss() {
    return gulp.src(['node_modules/font-awesome/css/font-awesome.css'])
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.stream());
}

// Static Server + watching scss/html files
function launchServer() {
    browserSync.init({
        server: "./src"
    });
    gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'node_modules/font-awesome/scss/font-awesome.scss', 'src/scss/*.scss'], compileSass);
    gulp.watch("src/*.html").on('change', browserSync.reload);
}

// Define complex tasks
var build = gulp.series(gulp.parallel(moveJs, moveFonts, moveCss, compileSass), launchServer);

// Export tasks
exports.compileSass = compileSass;
exports.moveJs = moveJs;
exports.moveFonts = moveFonts;
exports.moveCss = moveCss;
exports.launchServer = launchServer;
exports.build = build;
exports.default = build;
