import gulp from 'gulp';

const { series, parallel, src, dest, task } = gulp;

// import gulpIf from 'gulp-if'; /* werden später noch gebracht */

// const isProd = process.env.NODE_ENV === 'prod';

import browser from 'browser-sync';
import { deleteAsync } from 'del';
const browserSync = browser.create();

import imageMin from './gulp-modules/gulpImageMin.js';
import processHTML from './gulp-modules/gulpProcessHTML.js';
import processCSS from './gulp-modules/gulpProcessCSS.js';

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
