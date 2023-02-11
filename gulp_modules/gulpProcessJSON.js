import gulp from 'gulp';
import jsonFormat from 'gulp-json-format';
import jsonminify from 'gulp-jsonminify';

function processJson() {
    return gulp.src("src/data/*").pipe(jsonFormat(4)).pipe(jsonminify()).pipe(gulp.dest("docs/data/"));
}

export default processJson;