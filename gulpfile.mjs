import gulp from "gulp";
import eslint from "gulp-eslint";

const { series, parallel, watch, src, dest, task } = gulp;

// import gulpIf from "gulp-if"; /* for later usage */

// const isProd = process.env.NODE_ENV === "prod";

import browser from "browser-sync";
import { deleteAsync } from "del";
const browserSync = browser.create();

import imageMin from "./gulp_modules/gulpImageMin.js";
import processHTML from "./gulp_modules/gulpProcessHTML.js";
import processCSS from "./gulp_modules/gulpProcessCSS.js";
import processJS from "./gulp_modules/gulpProcessJS.js";
import processJson from "./gulp_modules/gulpProcessJSON.js";

// The lint task
gulp.task("eslint", function () {
    return (
        gulp
            // Define the source files
            .src(["src/js/*.js", "!node_modules{,/**}"])
            .pipe(eslint())
            .pipe(eslint.format())
    );
});

function webserver() {
    browserSync.init({
        open: true,
        port: 3000,
        server: "./docs"
    });
}

function browserSyncReload(done) {

    browserSync.reload();
    done();
}

function watchFiles() {
    watch("src/**/*.html", series(processHTML, browserSyncReload));
    watch("src/**/*.scss", series(processCSS, browserSyncReload));
    watch('src/**/*.js', series(processJS, ['eslint'], browserSyncReload));
    watch('src/img/**/*.*', series(imageMin, browserSyncReload));



}
// clean docs or dist folder before publishing your work to production
async function runClean(done) {
    await deleteAsync("docs");
    done();
}

task("serve", parallel(webserver, watchFiles));


task("build", series(runClean, parallel(processHTML, processCSS, processJS, processJson, imageMin)));


task("default", series(runClean, parallel(processHTML, processCSS, processJS, processJson, imageMin)));
