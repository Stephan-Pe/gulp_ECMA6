import gulp from 'gulp';
import gulpIf from 'gulp-if';
import imagemin from 'gulp-imagemin';
const isProd = process.env.NODE_ENV === 'prod';
import imageminGifsicle from "imagemin-gifsicle";
import imageminMozjpeg from "imagemin-mozjpeg";
import imageminOptipng from "imagemin-optipng";
import imageminSvgo from "imagemin-svgo";

const imageMin = () => {
    return gulp.src('src/img/**/*.*')
        .pipe(gulpIf(isProd, imagemin([
            imageminGifsicle({ interlaced: true }),
            imageminMozjpeg({ quality: 75, progressive: true }),
            imageminOptipng({ optimizationLevel: 5 }),
            imageminSvgo({
                plugins: [
                    { removeViewBox: true },
                    { cleanupIDs: false }
                ]
            })
        ])))
        .pipe(gulp.dest('docs/img/'));
}

export default imageMin;