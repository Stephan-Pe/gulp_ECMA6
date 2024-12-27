import gulp from "gulp";
import gulpIf from "gulp-if";
import htmlmin from "gulp-htmlmin";
import htmlreplace from "gulp-html-replace";
import fileinclude from "gulp-file-include";
import minifyInline from "gulp-minify-inline";
/*if you work with google maps or mapbox i recommend using gulp-minify-inline 
and place the map script inside your document*/

const isProd = process.env.NODE_ENV === "prod";
const { dest } = gulp;

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
                    src: "js/main.js",
                    tpl: "<script type='module' src='%s'></script>"
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

export default processHTML;