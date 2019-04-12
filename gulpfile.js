const gulp = require('gulp');
const gulpSass = require('gulp-sass');
const webserver = require('gulp-webserver');
const babel = require('gulp-babel');
const cleanCss = require('gulp-clean-css');
const uglify = require('gulp-uglify');
// 编译sass
gulp.task('sass', () => {
    return gulp.src('./src/scss/**/*.scss')
        .pipe(gulpSass())
        .pipe(gulp.dest('./src/css'));
});


//启服务
gulp.task('server', () => {
    return gulp.src('./src')
        .pipe(webserver({
            port: 8080,
            livereload: true
        }));
})


// // 编译ES6~ES5
gulp.task('devBabel', () => {
    return gulp.src('./src/js/**/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        })).pipe(gulp.dest('./dist/js'));
})



// // 监听任务
gulp.task('watching', () => {
    return gulp.watch(['./src/scss/**/*.scss', './src/js/**/*.js'], gulp.series('sass', 'devBabel'));

})

// 管理开发任务
gulp.task('default', gulp.series('sass', 'devBabel', 'server', 'watching'));


// 上线任务
// 压缩 CSS - gulp-clean-css   
gulp.task('zipCss', () => {
    return gulp.src('./src/css/**/*.css')
        .pipe(cleanCss({ compatibility: 'ie8' }))
        .pipe(gulp.dest('./dist/css'))
});

// 压缩 JS - uglify  
gulp.task('zipJs', () => {
    return gulp.src('./dist/js/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'))
});


// 管理上线任务  dist
gulp.task('build', gulp.parallel('zipCss', 'zipJs'));