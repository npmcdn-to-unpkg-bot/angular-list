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
    server: ['./src/web.js', './src/package.json'],
    html: ['./src/public/**/*.html', '!./src/public/modules/**/*.html'],  
    style: './src/public/scss/style.scss', 
    js: './src/public/js/**/*.js',
    img: ['./src/public/img/**/*.png', './src/public/img/**/*.jpg', './src/public/img/**/*.svg'],
    userfiles: ['./src/public/userfiles/**/*.png', './src/public/userfiles/**/*.jpg', './src/public/userfiles/**/*.svg'],
    fonts: './src/public/fonts/**/*.*'
  },
  watch: { 
    html: './src/public/**/*.html',  
    style: './src/public/scss/**/*.scss', 
    js: './src/public/js/**/*.js',
    img: ['./src/public/img/**/*.png', './src/public/img/**/*.jpg', './src/public/img/**/*.svg'],
    userfiles: ['./src/public/userfiles/**/*.png', './src/public/userfiles/**/*.jpg', './src/public/userfiles/**/*.svg'],
    fonts: './src/public/fonts/**/*.*'
  },
  build: {
    server: './build/',
    html: './build/public/',
    css: './build/public/style/',
    js: './build/public/js/',
    img: './build/public/img/',
    userfiles: './build/public/userfiles/',
    fonts: './build/public/fonts/'
  }
};


//-----Server----
gulp.task('server', function() {
  return gulp.src(options.src.server)
    .pipe(plumber())
    .pipe(gulp.dest(options.build.server));
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
    //.pipe(stripDebug())
    //.pipe(uglify())
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
      baseDir: './build',
      directoty: true
    },
    notify: false
  });

  gulp.watch(options.watch.html, ['html']);
  gulp.watch(options.watch.style, ['style']);
  gulp.watch(options.watch.js, ['js']);
});

//----Default----
gulp.task('default', ['server', 'style', 'js', 'html', 'img', 'userfiles', 'fonts']);

