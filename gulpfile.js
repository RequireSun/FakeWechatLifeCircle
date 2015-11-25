/**
 * Created by kelvinsun on 2015/11/25.
 */
'use strict';

var path = require('path');
var gulp = require('gulp');

var htmlmin = require('gulp-htmlmin');

var sass = require('gulp-sass'),
    minifyCss = require('gulp-minify-css'),
    autoprefixer = require('gulp-autoprefixer');

var livereload = require('gulp-livereload'),
    liveServer = require('gulp-live-server');

var app = function (inPath) {
    return path.resolve('./app', inPath);
}, dist = function (inPath) {
    return path.resolve('./dist', inPath);
}, bower = function (inPath) {
    return path.resolve('./bower_components', inPath);
};

gulp.task('html', function () {
    gulp.src(app('**/*.html'))
        .pipe(htmlmin({
            removeComments: true,               // ÒÆ³ý×¢ÊÍ
            collapseWhitespace: true,           // ÒÆ³ý¿Õ°×
            conservativeCollapse: true,         // ËùÓÐ¿Õ°×±£ÁôÒ»¸ö¿Õ¸ñ
            useShortDoctype: true,              // Ëõ¶Ì Doctype
            removeScriptTypeAttributes: true,   // ÒÆ³ý script ±êÇ©µÄ type ÊôÐÔ
            removeStyleLinkTypeAttributes: true,// ÒÆ³ý style ±êÇ©ºÍ link ±êÇ©µÄ type ÊôÐÔ
            removeIgnored: true,                // ÒÆ³ý <% %> <? ?> ±êÇ©
            minifyJS: true,                     // Ñ¹Ëõ js
            minifyCSS: true,                    // Ñ¹Ëõ css
            minifyURLs: true,                   // Ñ¹Ëõ url
        }))
        .pipe(gulp.dest(dist('')))
        .pipe(livereload());
});

gulp.task('sass', function () {
    gulp.src(app('styles/**/*.scss'))
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({ browsers: ['last 2 versions', 'ie >= 8'] }))
        .pipe(minifyCss(/*{compatibility: 'ie8'}*/))
        .pipe(gulp.dest(dist('styles')))
        .pipe(livereload());
});

gulp.task('watch', ['html', 'sass'], function () {
    livereload.listen();
    gulp.watch(app('**/*.html'), ['html']);
    gulp.watch(app('styles/**/*.scss'), ['sass']);
    var server = liveServer.static('dist', 10088);
    server.start();
});