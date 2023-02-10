import gulp from 'gulp';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import sourcemaps from "gulp-sourcemaps";
import cleanCSS from "gulp-clean-css";
const sass = gulpSass(dartSass);
const { series, parallel, src, dest, task } = gulp;

import gulpIf from 'gulp-if';
import htmlmin from 'gulp-htmlmin';
import htmlreplace from 'gulp-html-replace';
import fileinclude from 'gulp-file-include';
import minifyInline from 'gulp-minify-inline';
const isProd = process.env.NODE_ENV === 'prod';

import imageMin from './gulp-modules/gulpImageMin.js';
import browser from 'browser-sync';
import { deleteAsync } from 'del';
const browserSync = browser.create();


function processCSS() {
    return gulp
        .src("src/scss/style.scss")
        .pipe(gulpIf(!isProd, sourcemaps.init()))
        .pipe(
            sass({
                includePaths: ["node_modules"],
            }).on("error", sass.logError)
        )
        .pipe(gulpIf(!isProd, sourcemaps.write()))
        .pipe(gulpIf(isProd, cleanCSS()))
        .pipe(gulp.dest("docs/css/"));
}

const htmlFile = ["src/*.html"];

function processHTML() {
    return gulp
        .src(htmlFile)
        .pipe(
            fileinclude({
                prefix: "@@",
                basepath: "@file",
            })
        )
        .pipe(
            htmlreplace({
                css: "css/style.css",
                js: {
                    src: 'js/main.js',
                    tpl: '<script type="module" src="%s"></script>'
                }
            })
        )
        .pipe(
            gulpIf(
                isProd,
                htmlmin({
                    collapseWhitespace: true,
                })
            )
        )
        .pipe(
            gulpIf(
                isProd,
                minifyInline(),
            )
        )
        .pipe(dest("./docs"));
}

function webserver() {
    browserSync.init({
        open: true,
        port: 3000,
        server: './docs'
    });
}


function browserSyncReload(done) {
    browserSync.reload();
    done();
}

function watchFiles() {
    gulp.watch('src/**/*.html', gulp.series(processHTML, browserSyncReload));
    gulp.watch('src/**/*.scss', gulp.series(processCSS, browserSyncReload));
    return;
}

async function runClean(done) {
    await deleteAsync("docs");
    done();
}



task("serve", parallel(processCSS, processHTML, imageMin, webserver, watchFiles));

task("build", series(runClean, parallel(processHTML, processCSS, imageMin)));
