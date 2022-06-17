import gulp from "gulp";
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import concat from "gulp-concat";
import cleancss from 'gulp-clean-css'
import imagemin from "gulp-imagemin";
import browserSync from "browser-sync";
import clean from "gulp-clean";
import autoPrefixer from "gulp-autoprefixer";
import minify from "gulp-minify";

const bS = browserSync.create();
const sass = gulpSass(dartSass);

const cleanDist = () => gulp.src('dist/*', { allowEmpty: true })
        .pipe(clean());


const buildStyles = () => gulp.src('./src/styles/**/*')
      .pipe(sass())
      .pipe(concat('styles.min.css'))
      .pipe(gulp.dest('./dist/css'));

const css = () => gulp.src ("./dist/css/*")
      .pipe(cleancss())
      .pipe(autoPrefixer({
        cascade: false
       }))
      .pipe(gulp.dest('./dist/css'));
      
const js = () => gulp.src ("./src/**/*.js")
     .pipe(concat('script.min.js'))
     .pipe(minify())
     .pipe(gulp.dest('./dist/'));

const minImage=() => gulp.src("./src/images/**/*")
     .pipe(imagemin())
     .pipe(gulp.dest('./dist/img'));

 export const build = gulp.series(cleanDist, buildStyles, css, js, minImage)

 export const buildDev = gulp.series(buildStyles, css, js)

 export const dev = gulp.series(buildDev, () => {
    bS.init({
        server: {
            baseDir: "./",
        }
    });

    gulp.watch(['./src/**/*.js', './src/**/*.scss'], gulp.series(buildDev, (done) => {
        bS.reload();
        done();
    }));   
   
 });
