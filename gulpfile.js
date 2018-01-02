// import { request } from "https";

const fs = require("fs");
const minificss = require("gulp-minify-css");
const uglify = require("gulp-uglify");
const concat = require("gulp-concat");
const path = require("path");
const gulp = require("gulp");
const webserver = require("gulp-webserver");
gulp.task("minifycss", () => {
    gulp.src("Content/css/*.css")
        .pipe(concat("add.css"))
        .pipe(minifycss("css.min.css"))
        .pipe(gulp.dest("./css"))
})
gulp.task("server", () => {
    gulp.src('.')
        .pipe(webserver({
            host: "localhost",
            port: 8080,
            fallback: "index.html",
            middleware: (req, res, next) => {
                res.writeHead(200, {
                    "Content-Type": "text/json",
                })
                let pathname = path.join(__dirname);
                fs.readFile(pathname, (err, ret) => {
                    if (err) {
                        res.end("error")
                    } else {
                        res.end(ret);
                    }
                    next()
                })
            }
        }))
})
gulp.task("default", () => {
    gulp.start("server");
})