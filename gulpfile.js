var gulp        = require('gulp');
var browserSync = require('browser-sync');
var sass        = require('gulp-sass');
var prefix      = require('gulp-autoprefixer');
var cp          = require('child_process');
var jade        = require('gulp-jade');
var concat      = require('gulp-concat');
var uglify      = require('gulp-uglify');
var jshint      = require('gulp-jshint');
var deploy      = require("gulp-gh-pages");

// Configs for gulp-imagemin
var imagemin        = require('gulp-imagemin');

var jekyll      = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';
var messages    = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};



/**
 * Build the Jekyll Site
 */
gulp.task('jekyll-build', function (done) {
    browserSync.notify(messages.jekyllBuild);
    return cp.spawn( jekyll , ['build'], {stdio: 'inherit'})
        .on('close', done);
});



/**
 * Rebuild Jekyll & do page reload
 */
gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
    browserSync.reload();
});



/**
 * Wait for jekyll-build, then launch the Server
 */
gulp.task('browser-sync', ['sass', 'jekyll-build'], function() {
    browserSync({
        server: {
            baseDir: '_site'
        }
    });
});



/**
 * Compile files from _scss into both _site/css (for live injecting) and site (for future jekyll builds)
 */
gulp.task('sass', function () {
    return gulp.src('assets/_src/sass/main.sass')
        .pipe(sass({
            includePaths: ['assets/_src/sass/'],
            //Config for Minify the outputed file
            //outputStyle: 'compressed',
            onError: browserSync.notify(messages.sassError)
        }))
        .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(gulp.dest('_site/assets/css'))
        .pipe(browserSync.reload({stream:true}))
        .pipe(gulp.dest('assets/css'));
});



/**
 * Compile .jade files from _jadefiles in .html files into _includes
 */
gulp.task('jade', function () {
    return gulp.src('_jadefiles/*.jade')
        .pipe(jade())
        .pipe(gulp.dest('_includes'));
});


/**
 * Compile all the .js files using UglifyJS
 */
gulp.task('uglify', function() {
    return gulp.src([
        /**
         * If you want to use jQuery, install via Bower
         * and put first in this list to concatenate in just one file.
         * 'assets/_src/bower_components/jquery/dist/jquery.js',
         */
        'assets/_src/js/functions.js'
    ])
    .pipe(concat('scripts.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('assets/js'))
    .pipe(browserSync.reload({stream:true}))
    .pipe(gulp.dest('_site/assets/js'));
});



/**
 * Jshint
 */
gulp.task('jshint', function () {
    return gulp.src(['gulpfile.js','assets/_src/js/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});



/**
 * Imagemin
 */
gulp.task('imagemin', function () {
    return gulp.src('assets/_src/img/**')
    .pipe(imagemin({
        verbose: true
    }))
    .pipe(gulp.dest('assets/img/'));
});



/**
 * Watch scss files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
 */
gulp.task('watch', function () {
    gulp.watch('assets/_src/sass/**', ['sass']);
    gulp.watch(['index.html', '_includes/*.html', '_layouts/*.html', '_posts/*'], ['jekyll-rebuild']);
    gulp.watch('_jadefiles/*.jade', ['jade']);
    gulp.watch('assets/_src/js/**', ['jshint', 'uglify']);
    gulp.watch('gulpfile.js', ['jshint']);
    gulp.watch('assets/_src/img/**', ['imagemin']);
});



/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task('default', ['imagemin', 'uglify', 'sass', 'jade', 'browser-sync', 'watch']);



/**
 * Deploy with Gulp to a gh-pages branch.
 */
gulp.task("deploy", ["jekyll-build"], function () {
    return gulp.src("./_site/**/*")
        .pipe(deploy());
});