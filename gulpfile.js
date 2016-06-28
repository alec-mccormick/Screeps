"use strict";

var gulp = require('gulp');
var ts = require('gulp-typescript');
var _ = require('lodash');

var https = require('https');
var fs = require('fs');
var path = require('path');
var secrets = require('./secrets.js');

gulp.task('compile', function () {
    // return tsproject.src( './tsconfig.json')
    //     .pipe(gulp.dest('./dist'));
    return gulp.src(["./src/**/*.ts", "./typings/**/*.ts", "node_modules/screeps-typescript-declarations/dist/screeps.d.ts"])
        .pipe(ts({
            target: 'ES5',
            module: 'commonjs',
            outFile: 'main.js',
            noExternalResolve: true
        }))
        .pipe(gulp.dest('./dist'));
});

gulp.task('upload-sim', ['compile'], function () {
    console.log("Starting upload");
    var email = secrets.email,
        password = secrets.password,
        data = {
            branch: 'default',
            modules: {
                main: fs.readFileSync('./dist/main.js', { encoding: "utf8" })
            }
        };
    var req = https.request({
        hostname: 'screeps.com',
        port: 443,
        path: '/api/user/code',
        method: 'POST',
        auth: email + ':' + password,
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        }
    }, function(res) {
        console.log("Response: " + res.statusCode);
    });

    req.write(JSON.stringify(data));
    req.end();
});

gulp.task('watch', function() {
    gulp.watch('./src/**/*.ts', ['build', 'references']);
});

gulp.task('build', ['upload-sim']);

gulp.task('default',['build', 'references', 'watch']);



gulp.task('references', function() {
    var destinationFile = './src/_references.d.ts';

    var files = getFiles('./', './src', function(item) {
        return item.indexOf('_references') === -1;
    });

    files.unshift('../typings/tsd.d.ts');
    files.unshift('../node_modules/screeps-typescript-declarations/dist/screeps.d.ts');



    var references = files.map(function(file) {
        return '/// <reference path="' + file + '" />';
    });


    return fs.writeFile(destinationFile, references.join('\n'), function(err) {
        if(err) throw err;
    });
});




// ///////////////////////////////////////////////////////////////////////////////
// --- Image Assets
// ///////////////////////////////////////////////////////////////////////////////
function prepend(str, arr) {
    return _.map(arr, function(el) { return path.join(str, el); });
}

function getFiles(dir, relative, filterFunction) {
    filterFunction = filterFunction || function(){ return true;};

    var folders = _.filter(prepend(dir, fs.readdirSync(path.join(relative, dir))), function(item) {
        return filterFunction(path.join(relative, item));
    });

    var files = _.map(folders, function(item) {
        if(fs.lstatSync(path.join(relative, item)).isDirectory()) {
            return getFiles(item, relative, filterFunction);
        } else {
            return [item];
        }
    });

    return _.flatten(files);
}