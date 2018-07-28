var SRC_DIR = './src/';     // 源文件目录
var DIST_DIR = './dist/';   // 文件处理后存放的目录
var DIST_FILES = DIST_DIR + '**'; // 目标路径下的所有文件

var Config = {
    src: SRC_DIR,
    dist: DIST_DIR,
    dist_files: DIST_FILES,
    html: {
        src: SRC_DIR + '*.html',
        dist: DIST_DIR,
        json: DIST_DIR + 'hash/**/*.json'
    },
    assets: {
        src: SRC_DIR + 'assets/**/*',
        dist: DIST_DIR + 'assets'
    },
    css: {
        src: SRC_DIR + 'css/**/*.css',
        dist: DIST_DIR + 'css',
        hash: DIST_DIR + 'hash/css'
    },
    sass: {
        src: SRC_DIR + 'sass/*.scss',
        dist: DIST_DIR + 'css',
        hash: DIST_DIR + 'hash/css'
    },
    js: {
        src: SRC_DIR + 'js/**/*.js',
        dist: DIST_DIR + 'js',
        hash: DIST_DIR + 'hash/js'
    },
    img: {
        src: SRC_DIR + 'img/**/*',
        dist: DIST_DIR + 'img'
    }
};

module.exports = Config;