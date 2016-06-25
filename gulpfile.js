var gulp = require('gulp'),
gp_less = require('gulp-less'),
gp_concat = require('gulp-concat'),
gp_rename = require('gulp-rename'),
gp_uglify = require('gulp-uglify'),
pump = require('pump')
cssnano = require('gulp-cssnano'),
jshint = require('gulp-jshint'),
imagemin = require('gulp-imagemin');

var config = {
    src: "./assets/src/",
    dist: "./assets/dist/"
}

gulp.task('minify-markdown', function (cb) {
  pump([
        gulp.src([config.src+'jquery-1.12.2.min.js', config.src+'/js/bootstrap.min.js', config.src+'/js/docs.min.js']),
        gp_concat('moment_showdown.min.js'),
        uglify(),
        gulp.dest(config.dist+'js')
    ],
    cb
  );
});

gulp.task('minify-main', function (cb) {
  pump([
        gulp.src([config.src+'js/moment.min.js', config.src+'js/showdown.min.js']),
        gp_concat('default.min.js'),
        uglify(),
        gulp.dest(config.dist+'js')
    ],
    cb
  );
});

//TODO Check
gulp.task('less', function (cb) {
    var less_source = config.src+'less/';
    pump([
        gulp.src(less_source+'style.less'),
        gp_less({
          paths: [ less_source+'bootstrap-3.3.6/' ]
        )
    ])
    .pipe(gulp.dest('./assets/src/css'));
});
