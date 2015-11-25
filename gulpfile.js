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
            removeComments: true,               // 移除注释
            collapseWhitespace: true,           // 移除空白
            conservativeCollapse: true,         // 所有空白保留一个空格
            useShortDoctype: true,              // 缩短 Doctype
            removeScriptTypeAttributes: true,   // 移除 script 标签的 type 属性
            removeStyleLinkTypeAttributes: true,// 移除 style 标签和 link 标签的 type 属性
            removeIgnored: true,                // 移除 <% %> <? ?> 标签
            minifyJS: true,                     // 压缩 js
            minifyCSS: true,                    // 压缩 css
            minifyURLs: true,                   // 压缩 url
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

gulp.task('images', function () {
    gulp.src(app('images/**/*.*'))
        .pipe(gulp.dest(dist('images')))
        .pipe(livereload());
});

gulp.task('watch', ['html', 'sass', 'images'], function () {
    livereload.listen();
    gulp.watch(app('**/*.html'), ['html']);
    gulp.watch(app('styles/**/*.scss'), ['sass']);
    gulp.watch(app('images/**/*.*'), ['images']);
    var server = liveServer.static('dist', 3000);
    server.start();
});