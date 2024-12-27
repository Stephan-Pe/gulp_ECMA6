import gulp from "gulp";
import * as dartSass from 'sass';
import gulpSass from "gulp-sass"; 

// You can still use gulp-sass for integration with the gulp pipeline
import sourcemaps from "gulp-sourcemaps";
import cleanCSS from "gulp-clean-css";

const sass = gulpSass(dartSass);
const { dest } = gulp;
const source = "src/scss/style.scss"

import gulpIf from "gulp-if";

const isProd = process.env.NODE_ENV === "prod";

function processCSS() {

        return gulp
        .src(source)
        .pipe(gulpIf(!isProd, sourcemaps.init()))
        .pipe(
          sass({
            includePaths: ["node_modules"],
          }).on("error", sass.logError)
        )
        .pipe(gulpIf(!isProd, sourcemaps.write()))
        .pipe(gulpIf(isProd, cleanCSS()))
        .pipe(dest("docs/css/"));

}

export default processCSS;