const gulp = require("gulp");

const minifycss = require("gulp-csso");
const postcss = require("gulp-postcss");
const stylus = require("gulp-stylus");
const pug = require("gulp-pug");
const autoprefixer = require("autoprefixer");

// объявляем таск с названием "styles"
// первым аргументом — название таска,
// вторым — функция, которая возвращает (`return`),
// обработанным

gulp.task("styles", function() {
  return (
    gulp
      .src("src/styles/*.styl") // через .src() передаём путь до исходника
      .pipe(stylus())
      .pipe(postcss([autoprefixer()])) //  через .pipe() вызываем плагин как функцию
      // .pipe(minifycss()) // и ещё раз
      .pipe(gulp.dest("build/styles"))
  ); // в финальном пайпе через gulp.dest() указываем куда сложить
});

gulp.task("pug", function() {
  return (
    gulp
      .src("src/pages/*.pug")
      //.pipe(pug()) // компиляция в html
      .pipe(pug({ pretty: true })) //без минимизации
      .pipe(gulp.dest("build/"))
  );
});

gulp.task("cook", ["styles", "pug"]);

gulp.task("watch", function() {
  gulp.watch("src/styles/*.styl", ["styles"]);
  gulp.watch("src/pages/*pug", ["pug"]);
});
