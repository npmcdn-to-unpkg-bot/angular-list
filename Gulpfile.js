const gulp = require('gulp'), 
      fileinclude = require('gulp-file-include'),  
      sass = require('gulp-sass'), 
      autoprefixer = require('gulp-autoprefixer'),
      filesize = require('gulp-filesize'),
      plumber = require('gulp-plumber'),
      babel = require('gulp-babel'),
      rename = require('gulp-rename'),
      stripDebug = require('gulp-strip-debug'),
      concat = require('gulp-concat'),
      uglify = require('gulp-uglify'),
      browserSync = require('browser-sync'),
      reload = browserSync.reload;

const options = {
  src: { 
    html: ['./src/**/*.html', '!./src/modules/**/*.html'],  
    style: './src/scss/style.scss', 
    js: './src/js/**/*.js',
    img: ['./src/img/**/*.png', './src/img/**/*.jpg', './src/img/**/*.svg'],
    userfiles: ['./src/userfiles/**/*.png', './src/userfiles/**/*.jpg', './src/userfiles/**/*.svg'],
    fonts: './src/fonts/**/*.*',
    json: './src/**/*.json'
  },
  watch: { 
    html: './src/**/*.html',  
    style: './src/scss/**/*.scss', 
    js: './src/js/**/*.js',
    img: ['./src/img/**/*.png', './src/img/**/*.jpg', './src/img/**/*.svg'],
    userfiles: ['./src/userfiles/**/*.png', './src/userfiles/**/*.jpg', './src/userfiles/**/*.svg'],
    fonts: './src/fonts/**/*.*',
    json: './src/**/*.json'
  },
  build: {
    html: './public/',
    css: './public/style/',
    js: './public/js/',
    img: './public/img/',
    userfiles: './public/userfiles/',
    fonts: './public/fonts/',
    json: './public/'
  }
};

//-----JSON-----
gulp.task('json', function() { 
  return gulp.src(options.src.json)
    .pipe(plumber())
    .pipe(gulp.dest(options.build.json))
    .pipe(filesize())
    .pipe(reload({stream: true})); 
});

//-----HTML-----
gulp.task('html', function() { 
  return gulp.src(options.src.html)
    .pipe(plumber())
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest(options.build.html))
    .pipe(filesize())
    .pipe(reload({stream: true})); 
});

//-----Style-----
gulp.task('style', function() { 
  return gulp.src(options.src.style)
    .pipe(plumber())
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest(options.build.css))
    .pipe(filesize())
    .pipe(reload({stream: true})); 
});

//--JavaScript--
gulp.task('js', function() {
  return gulp.src(options.src.js)
    .pipe(plumber())
    .pipe(stripDebug())
//    .pipe(uglify())
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(concat('main.min.js'))
    .pipe(gulp.dest(options.build.js))
    .pipe(filesize())
    .pipe(reload({stream: true}));
});

//-----img-----
gulp.task('img', function() {
  return gulp.src(options.src.img)
    .pipe(plumber())
    .pipe(gulp.dest(options.build.img))
    .pipe(filesize())
    .pipe(reload({stream: true}));
});

//--Userfiles---
gulp.task('userfiles', function() {
  return gulp.src(options.src.userfiles)
    .pipe(plumber())
    .pipe(gulp.dest(options.build.userfiles))
    .pipe(filesize())
    .pipe(reload({stream: true}));
});

//----Fonts-----
gulp.task('fonts', function() {
  return gulp.src(options.src.fonts)
    .pipe(plumber())
    .pipe(gulp.dest(options.build.fonts))
    .pipe(filesize())
    .pipe(reload({stream: true}));
});

gulp.task('watch', ['default'], function() {
  browserSync({ server: {
      baseDir: './public',
      directoty: true
    },
    notify: false
  });

  gulp.watch(options.watch.html, ['html']);
  gulp.watch(options.watch.style, ['style']);
  gulp.watch(options.watch.js, ['js']);
});

//----Default----
gulp.task('default', ['json', 'style', 'js', 'html', 'img', 'userfiles', 'fonts']);

