var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var Config = require('./gulpfile.config.js');



function dev() {
    function htmlDev() {
        return gulp.src(Config.html.src)
            .pipe(plugins.plumber({
                errorHandle: function() {

                }
            }))
            .pipe(gulp.dest(Config.html.dist))
            .pipe(reload({
                stream: true
            }))
    }
    function assetsDev() {
        return gulp.src(Config.assets.src)
            .pipe(plugins.plumber({
                errorHandle: function() {

                }
            }))
            .pipe(gulp.dest(Config.assets.dist))
            .pipe(reload({
                stream: true
            }))
    }
    function cssDev() {
        return gulp.src(Config.css.src)
            .pipe(plugins.plumber({
                errorHandle: function() {

                }
            }))
            .pipe(gulp.dest(Config.css.dist))
            .pipe(reload({
                stream: true
            }))
    }
    function sassDev() {
        return gulp.src(Config.sass.src)
            .pipe(plugins.plumber({
                errorHandle: function() {

                }
            }))
            .pipe(plugins.sass())
            .pipe(gulp.dest(Config.sass.dist))
            .pipe(reload({
                stream: true
            }))
    }
    function jsDev () {
        return gulp.src(Config.js.src)
            .pipe(plugins.plumber({
                errorHandle: function() {
                }
            }))
            .pipe(gulp.dest(Config.js.dist))
            .pipe(reload({
            stream: true
        }))
    }
    function imagesDev() {
        return gulp.src(Config.img.src)
            .pipe(plugins.plumber({
                errorHandle: function() {

                }
            }))
            .pipe(gulp.dest(Config.img.dist))
            .pipe(reload({
            stream: true
        }))
    }
    gulp.task('images:dev', () => {
        return imagesDev()
    })
    gulp.task('js:dev', () => {
        return jsDev()
    })
    gulp.task('html:dev', () => {
        return htmlDev()
    })
    gulp.task('assets:dev', () => {
        return assetsDev()
    })
    gulp.task('css:dev', () => {
        return cssDev()
    })
    gulp.task('sass:dev', () => {
        return sassDev()
    })
    gulp.task('dev', ['html:dev', 'css:dev', 'sass:dev', 'js:dev', 'assets:dev', 'images:dev'], () => {
        browserSync.init({
            server: {
                baseDir: Config.dist
            }
            , notify: false
        })
        plugins.watch(Config.html.src, htmlDev)
        plugins.watch(Config.css.src, cssDev)
        plugins.watch(Config.sass.src, sassDev)
        plugins.watch(Config.assets.src, assetsDev)
        plugins.watch(Config.js.src, jsDev)
        plugins.watch(Config.img.src, imagesDev)
    });
}
//======= gulp dev 开发环境下 ===============
module.exports = dev;