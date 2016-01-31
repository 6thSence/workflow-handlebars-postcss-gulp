const gulp = require('gulp');
const handlebars = require('gulp-compile-handlebars');
const rename = require('gulp-rename');
const glob = require('glob');
const concat = require('gulp-concat');
const filter = require('gulp-filter');
const browserSync = require('browser-sync').create();
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const assets = require('postcss-assets');
const sorting = require('postcss-sorting');
const nested = require('postcss-nested');
const cssShort = require('postcss-short');
const uglify = require('gulp-uglify');
const minifyCss = require('gulp-minify-css');
const gulpif = require('gulp-if');
const stylelint = require('stylelint');
const reporter = require('postcss-reporter');
const eslint = require('gulp-eslint');

const config = require('./config');
const rulesStyles = require('./stylelintrc.json');
const rulesScripts = require('./eslintrc.json');
const templateContext = require('./src/test.json');

const paths = {
    baseDir: './src',
    buildDir: './static',
    handlebars: ['./src/**/*.hbs'],
    styles: ['./src/**/*.css'],
    scripts: ['./src/**/*.js'],
    scriptsLint: ['**/*.js', '!node_modules/**/*', '!static/**/*'],
    templates: 'src/templates/**/*.hbs'
};

switch (config.env) {
    case 'development':
        gulp.task('default', ['fonts', 'scripts', 'styles', 'compile', 'watch', 'browser-sync']);
        break;
    case 'production':
        gulp.task('default', ['fonts', 'scripts', 'styles', 'compile']);
        break;
    default:
        break;
}

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: './static'
        }
    });
});

gulp.task('compile', function() {
    glob(paths.templates, function(err, files) {
        if (!err) {
            const teplatesDir = files.map(item => {
                return item.slice(0, item.lastIndexOf('/'));
            });
            const options = {
                ignorePartials: true,
                batch: teplatesDir,
                helpers: {
                    capitals: function(str) {
                        return str.toUpperCase();
                    }
                }
            };

            gulp.src(paths.baseDir + '/index.hbs')
                .pipe(handlebars(templateContext, options))
                .pipe(rename('index.html'))
                .pipe(gulp.dest(paths.buildDir));
        } else {
            throw err;
        }
    });
});

const processors = [
    assets,
    nested,
    sorting({ 'sort-order': 'csscomb' }),
    cssShort,
    stylelint(rulesStyles),
    reporter({clegarMessages: true, throwError: true}),
    autoprefixer({browsers: ['last 2 version']})
];

gulp.task('styles', function() {
    gulp.src(paths.styles)
        .pipe(postcss(processors))
        .pipe(concat('styles/bundle.css'))
        .pipe(gulpif(config.env === 'production', minifyCss()))
        .pipe(gulp.dest(paths.buildDir));
});

gulp.task('scripts', function() {
    gulp.src(paths.scripts)
        .pipe(concat('js/script.js'))
        .pipe(gulpif(config.env === 'production', uglify()))
        .pipe(gulp.dest(paths.buildDir));

    gulp.src(paths.scriptsLint)
        .pipe(eslint(rulesScripts))
        .pipe(eslint.format());
});

gulp.task('fonts', function() {
    gulp.src('./src/fonts/**/*')
        .pipe(filter(['*.woff', '*.woff2']))
        .pipe(gulp.dest(paths.buildDir + '/fonts'));
});

gulp.task('watch', function() {
    gulp.watch(paths.handlebars, ['compile']);
    gulp.watch(paths.styles, ['styles']);
    gulp.watch(paths.scripts, ['scripts']);
    gulp.watch(paths.buildDir + '/**/*')
        .on('change', browserSync.reload);
});
