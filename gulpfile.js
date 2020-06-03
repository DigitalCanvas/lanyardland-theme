/**
 * gulpfile.js
 *
 * For use with Gulp 4.
 */

'use strict';

const gulp = require('gulp');
const { series, parallel } = require('gulp');

// Style modules.
const sass = require('gulp-sass');
const sassLint = require('gulp-sass-lint');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const mqCSSpacker = require('css-mqpacker');
const sourcemaps = require('gulp-sourcemaps');
const cssnano = require('gulp-cssnano');

// Script modules.
const terser = require('gulp-terser');
const concat = require('gulp-concat');

// Image modules.
const imagemin = require('gulp-imagemin');

// Utility Modules
const del = require('del');
const beeper = require('beeper');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');

/** ---------- Utility Tasks ---------- */

/**
 * Handle errors and alert the user.
 */
function handleErrors () {
    const args = Array.prototype.slice.call(arguments);

    notify.onError({
        'title': 'Task Failed [<%= error.message %>',
        'message': 'See console.',
        'sound': 'Sosumi' // See: https://github.com/mikaelbr/node-notifier#all-notification-options-with-their-defaults
    }).apply(this, args);

    beeper(); // Beep

    // Prevent the 'watch' task from stopping.
    this.emit('end');
}

/** ---------- CSS Tasks ----------- */

/**
 * Run project SASS through the linter.
 *
 * @param cb
 */
function lintSass(cb) {
    gulp.src([
        'sass/**/*style.scss',
        '!assets/sass/**/_normalize.scss'
    ])
        .pipe(sassLint())

        .pipe(sassLint.format())

        .pipe(sassLint.failOnError());

    cb();
}

/**
 * Clean out old CSS files.
 *
 * @param cb
 */
function cleanCss(cb) {
    del(['css/*.css', 'css/*.min.css']);

    cb();
}

/**
 * Compile CSS from SASS and minify.
 *
 * @param cb
 */
function makeCss(cb) {
    gulp.src('sass/**/*style.scss')
        .pipe(plumber({'errorHandler': handleErrors}))

        .pipe(sourcemaps.init())

        .pipe(sass({
            errLogToConsole: true,
            outputStyle: 'expanded' // Options: nested, expanded, compact, compressed
        }))

        .pipe(postcss([
            autoprefixer({
                cascade: false
            }),
            mqCSSpacker({
                sort: true
            })
        ]))

        .pipe(sourcemaps.write())

        .pipe(gulp.dest('css'))

        .pipe(cssnano({
            safe: true
        }))

        .pipe(rename({suffix: '.min'}))

        .pipe(gulp.dest('css'));

    cb();
}

/** ---------- Script tasks ---------- */

/**
 * Concatenate all the JavaScript.
 *
 * @param cb
 */
function concatJs(cb) {
    gulp.src('js/concat/*.js')
        .pipe(sourcemaps.init())
        .pipe(concat('project.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('js'));

    cb();
}

/**
 * Uglify the JavaScript.
 *
 * @param cb
 */
function uglifyJs(cb) {
    gulp.src([
        'js/*',
        '!js/*.min.js'
    ])
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(terser({
            mangle: false
        }))
        .pipe(gulp.dest('js'));

    cb();
}

/** --------- Image Tasks --------- */

function processImages(cb) {
    gulp.src('images/*')
        .pipe(imagemin({
            'optimizationLevel': 5,
            'progressive': true,
            'interlaced': true
        }))
        .pipe(gulp.dest('images'));

    cb();
}


exports.buildCss = series(cleanCss, makeCss);
exports.lintSass = lintSass;
exports.buildScripts = series(concatJs, uglifyJs);
exports.images = processImages;
exports.build = parallel(
    series(cleanCss, makeCss),
    series(concatJs, uglifyJs),
    processImages
);

exports.watch = exports.default = function () {
    gulp.watch('sass/**/*.scss', series(cleanCss, makeCss));
    gulp.watch([
        'js/*',
        '!js/*.min.js'
    ], series(concatJs, uglifyJs));
};
