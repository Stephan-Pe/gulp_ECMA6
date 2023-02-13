import gulp from "gulp";
import babel from "gulp-babel";
import webpack from "webpack-stream";
const { dest } = gulp;

function processJS() {
    return gulp
        .src("src/js/*.js")
        .pipe(
            babel({
                plugins: ["@babel/transform-runtime"],
                presets: ["@babel/preset-env"],
            })
        )
        .pipe(webpack({
            mode: "production",
            output: {
                filename: "[name].js",
            }

        }))
        .pipe(dest("docs/js"));
}

export default processJS;