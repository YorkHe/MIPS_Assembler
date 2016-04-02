'use strict';

var gulp = require('gulp');
var electron = require('electron-connect').server.create();

gulp.task("serve", function () {
    electron.start();

    gulp.watch('index.js', electron.restart);

    gulp.watch(['js/*.js', 'css/*.css'], electron.reload);

});