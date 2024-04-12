const gulp = require("gulp");
const jshint = require("gulp-jshint");
const nodemon = require("gulp-nodemon");

const jsFiles = ["*.js", "src/**/*.js"];

gulp.task("style", function () {
  return gulp.src(jsFiles).pipe(jshint());
});

gulp.task("inject", function () {
  var wiredep = require("wiredep").stream;
  var inject = require("gulp-inject");

  var injectSrc = gulp.src(["./public/css/*.css", "./public/js/*.js"]);

  var injectOptions = {
    ignorePath: "/public",
  };

  var options = {
    bowerJson: require("./bower.json"),
    directory: "./bower_components",
    ignorePath: "../../bower_components",
  };
  return gulp
    .src("./src/views/*.html")
    .pipe(wiredep(options))
    .pipe(inject(injectSrc, injectOptions))
    .pipe(gulp.dest("./src/views"));
});

/* gulp.task("serve", ["style", "inject"], function () {
  var options = {
    script: "app.js",
    delayTime: 1,
    watch: jsFiles,
  };
  return nodemon(options).on("restart", function (ev) {
    console.log("Restarting Server...");
  });
});
*/
// Define a task named 'serve' with dependencies 'style' and 'inject'
gulp.task(
  "serve",
  gulp.series("style", "inject", function (done) {
    // Configuration options for nodemon
    var options = {
      script: "app.js",
      delayTime: 1,
      watch: jsFiles,
    };

    // Start the server using nodemon
    return nodemon(options)
      .on("restart", function (ev) {
        console.log("Restarting Server...");
      })
      .on("crash", function () {
        console.error("Server has crashed!");
        // Ensure the task fails if the server crashes
        done("Server crashed");
      });
  }),
);
