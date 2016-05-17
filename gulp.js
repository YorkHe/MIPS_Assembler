/*
 * Copyright (c) 2016 He Yu <kiddmagician@gmail.com>
 * All Rights Reserved.
*/
'use strict';

var gulp = require('gulp');
var electron = require('electron-connect').server.create();

gulp.task("serve", function () {
    electron.start();

    gulp.watch('index.js', electron.restart);

    gulp.watch(['js/*.js', 'css/*.css'], electron.reload);

});