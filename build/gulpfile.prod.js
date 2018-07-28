var gulp = require('gulp')
var plugins = require('gulp-load-plugins')()
var runSequence = require("run-sequence")
var Config = require('./gulpfile.config.js')
function prod() {
    gulp.task('html', () => {
        return gulp.src([Config.html.json, Config.html.src])
            .pipe(plugins.revCollector())
            .pipe(plugins.minifyHtml())
            .pipe(gulp.dest(Config.html.dist))
    })
    gulp.task('assets', () => {
        return gulp.src(Config.assets.src)
            .pipe(gulp.dest(Config.assets.dist));
    })
    gulp.task('sass', () => {
        return gulp.src(Config.sass.src)
            .pipe(plugins.sass())
            .pipe(plugins.autoprefixer('last 2 version'))
            .pipe(plugins.cleanCss())
            .pipe(plugins.rev())
            .pipe(gulp.dest(Config.sass.dist))
            .pipe(plugins.rev.manifest())
            .pipe(gulp.dest(Config.sass.hash))
    })
    gulp.task('js', () => {
        return gulp.src(Config.js.src)
            .pipe(plugins.rev())
            .pipe(gulp.dest(Config.js.dist))
            .pipe(plugins.rev.manifest())
            .pipe(gulp.dest(Config.js.hash))
    })
    gulp.task('images', () => {
        return gulp.src(Config.img.src)
            .pipe(gulp.dest(Config.img.dist))
    })
    gulp.task('clean', () => {
       return gulp.src(Config.dist, {
               read: false
           })
           .pipe(plugins.clean())
    })
    gulp.task('build', () => {
        runSequence("clean", 'sass', 'js', 'html', 'assets', 'images')
    })
}
module.exports = prod;