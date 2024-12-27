import gulp from "gulp";
import gulpIf from "gulp-if";
import imagemin, { gifsicle, mozjpeg, optipng, svgo } from "gulp-imagemin";

const isProd = process.env.NODE_ENV === "prod";
const { dest } = gulp;
const imgSource = "src/img/**/*.*";
async function imageMin() {
    try {
        return gulp.src([imgSource], {encoding: false})
            .pipe(gulpIf(isProd, imagemin([
                gifsicle({ interlaced: true }),
                mozjpeg({ quality: 75, progressive: true }),
                optipng({ optimizationLevel: 5 }),
                svgo({
                    removeViewBox: true,
                    cleanupIDs: false
                })
            ])))
            .pipe(dest("docs/img/"));
    } catch (error) {
        console.log(error);
    }

}

export default imageMin;