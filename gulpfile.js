var gulp = require('gulp'),
    less = require('gulp-less'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    pump = require('pump'),
    cleanCSS = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    watch = require('gulp-watch'),
        sequence = require('gulp-watch-sequence');

var config = {
    src: "./assets/src/",
    dist: "./assets/dist/"
};

gulp.task('default', ['minify-markdown', 'minify-main', 'lessify','docs-css', 'images', 'fontawesome-css', 'fontawesome-fonts']);

//Compile LESS and minify JS
gulp.task('minify-markdown', function(cb) {
    pump([
            gulp.src(['./bower_components/moment/min/moment.min.js', './bower_components/showdown/dist/showdown.min.js']),
            concat('moment_showdown.min.js'),
            uglify(),
            gulp.dest(config.dist + 'js')
        ],
        cb
    );
});

gulp.task('minify-main', function(cb) {
    pump([
            gulp.src(['./bower_components/jquery/dist/jquery.min.js', config.src + '/js/bootstrap.min.js', './bower_components/jquery.scrollTo/jquery.scrollTo.js', config.src + '/js/docs.min.js']),
            concat('main.min.js'),
            uglify(),
            gulp.dest(config.dist + 'js')
        ],
        cb
    );
});

gulp.task('lessify', function(cb) {
    pump([
            gulp.src( config.src + 'less/style.less'),
            less({
                paths: ['./assets/src/less/bootstrap-3.3.6/']
            }),
            gulp.dest(config.dist + 'css')
        ],
        cb);
});

gulp.task('images', function(cb) {
    pump([gulp.src(config.src + '/images/**/*'),
            gulp.dest(config.dist + '/images')
        ],
        cb);
});

gulp.task('docs-css', function(cb) {
    pump([
        gulp.src(config.src+'css/docs.css'),
        cleanCSS({compatibility: 'ie8'}),
        rename("docs.min.css"),
        gulp.dest(config.dist+'css')
    ],
cb);
});

gulp.task('watch', function () {
  var queue = sequence(300);

  watch(config.src+'/**/*.js', {
    name      : 'JS',
    emitOnGlob: false
}, queue.getHandler('minify-main'));

  watch(config.src+'less/**/*.less', {
    name      : 'CSS',
    emitOnGlob: false
}, queue.getHandler('lessify'));
});

//Copy FontAwesome
gulp.task('fontawesome-css', function(cb) {
    pump([gulp.src('./bower_components/font-awesome/css/font-awesome.min.css'),
            gulp.dest(config.dist + 'css')
        ],
        cb);
});

gulp.task('fontawesome-fonts', function(cb) {
    pump([gulp.src('./bower_components/font-awesome/fonts/**/*.{ttf,woff,eof,svg,woff2}'),
            gulp.dest(config.dist + 'fonts')

        ],
        cb);
});
