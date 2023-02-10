import gulp from 'gulp';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import sourcemaps from "gulp-sourcemaps";
import cleanCSS from "gulp-clean-css";
const sass = gulpSass(dartSass);

import gulpIf from 'gulp-if';

const isProd = process.env.NODE_ENV === 'prod';


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

export default processCSS;