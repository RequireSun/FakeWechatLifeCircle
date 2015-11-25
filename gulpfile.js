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
            removeComments: true,               // �Ƴ�ע��
            collapseWhitespace: true,           // �Ƴ��հ�
            conservativeCollapse: true,         // ���пհױ���һ���ո�
            useShortDoctype: true,              // ���� Doctype
            removeScriptTypeAttributes: true,   // �Ƴ� script ��ǩ�� type ����
            removeStyleLinkTypeAttributes: true,// �Ƴ� style ��ǩ�� link ��ǩ�� type ����
            removeIgnored: true,                // �Ƴ� <% %> <? ?> ��ǩ
            minifyJS: true,                     // ѹ�� js
            minifyCSS: true,                    // ѹ�� css
            minifyURLs: true,                   // ѹ�� url
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