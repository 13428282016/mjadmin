/**
 * Created by wmj on 2015/12/17.
 */

var uglify = require('gulp-uglify'),
    gulp = require('gulp'),
    sourceMaps = require('gulp-sourcemaps'),
    webpack = require('webpack'),
    webpackDevServer = require('webpack-dev-server'),
    webpackConfig = require('./webpack.config'),
    minifyCSS = require('gulp-minify-css'),
    less = require('gulp-less'),
    imageMin = require('gulp-imagemin'),
    autoPrefixer=require('gulp-autoprefixer'),
    concat=require('gulp-concat'),
    rename=require('gulp-reanme');

gulp.task('build:js', function () {

    webpack(webpackConfig);
    gulp.src(['resources/assets/build/js/bundles/**/*.js'])
        .pipe(sourceMaps.init())
        .pipe(uglify())

        .pipe(sourceMaps.write('../../build/js/source_maps'))
        .pipe(rename({extname:'.min.js'}))
        .pipe(gulp.dest('resources/assets/dist/js'))
});


gulp.task('build:css', function () {

    gulp.src('resources/assets/build/css/less/admin-lte/AdminLTE.less')

        .pipe(less())
        .pipe(  autoPrefixer())
        .pipe(sourceMaps.init())

        .pipe(minifyCSS())
        .pipe(sourceMaps.write('../../build/css/source_maps'))
        .pipe(rename({extname:'.min.css'}))
        .pipe(gulp.dest('resources/assets/dist/css'));

    gulp.src('resources/assets/build/css/less/admin-lte/skins/*.less')
        .pipe(less())
        .pipe(  autoPrefixer())
        .pipe(sourceMaps.init())
        .pipe(minifyCSS())
        .pipe(sourceMaps.write('../../../build/css/source_maps'))
        .pipe(rename({extname:'.min.css'}))
        .pipe(gulp.dest('resources/assets/dist/css/skins'));
    gulp.src(['resources/assets/build/css/**/*.css', '!resources/assets/build/css/**/*.min.css','bower_components/normalize-css/normalize.css'])
        .pipe(  autoPrefixer())
        .pipe(sourceMaps.init())
        .pipe(minifyCSS())
        .pipe(sourceMaps.write('../../build/css/source_maps'))
        .pipe(rename({extname:'.min.css'}))
        .pipe(gulp.dest('resources/assets/dist/css'));
    gulp.src('resources/assets/build/css/**/*.min.css')
        .pipe(gulp.dest('resources/assets/dist/css'));

    gulp.src(['resources/assets/dist/css/normalize.css','resources/assets/dist/css/AdminLTE.css','resources/assets/dist/css/bootstrap.min.css','resources/assets/dist/css/font-awesome.min.css','resources/assets/dist/css/ionicons.min.css'])
        .pipe(concat('common.css'))
        .pipe(rename({extname:'.min.css'}))
        .pipe(gulp.dest('resources/assets/dist/css'));



});


gulp.task('build:font', function () {

    gulp.src('resources/assets/build/fonts/*.*').
        pipe(gulp.dest('resources/assets/dist/fonts'))


});

gulp.task('build:image', function () {
    gulp.src('resources/assets/build/img/*.*').
        pipe(imageMin()).
        pipe(gulp.dest('resources/assets/dist/img'))

});


gulp.task('build',['build:js','build:css','build:font','build:image']);
gulp.task('server:webpack', function () {

    new webpackDevServer(webpack(webpackConfig), {
        publicPath: config.output.publicPath,
        hot: true,
        quiet: false,
        historyApiFallback: true,
        noInfo: false,
        stats: {color: true}

    }).listen(8080, 'localhost', function (err, result) {
            if (err) {
                console.log(err);
            }
            console.log('Listening at localhost:8080');
        })


});


/*

 laravel


 */

var elixir = require('laravel-elixir');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

elixir(function (mix) {
    mix.sass('app.scss');
});
