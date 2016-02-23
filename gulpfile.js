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
const nested = require('postcss-nested');
const cssShort = require('postcss-short');
const uglify = require('gulp-uglify');
const cssnano = require('cssnano');
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
    templates: 'src/templates/**/*.hbs',
    assets: 'src/**/*.png',
    contextJson: 'src/test.json'
};

switch (config.env) {
    case 'development':
        gulp.task('default', [
            'fonts',
            'scripts',
            'styles',
            'compile',
            'watch',
            'browser-sync'
        ]);
        break;
    case 'production':
        gulp.task('default', [
            'fonts',
            'scripts',
            'styles',
            'compile'
        ]);
        break;
    default:
        break;
}

gulp.task('browser-sync', () => {
    browserSync.init({
        server: {
            baseDir: './static'
        }
    });
});

gulp.task('compile', () => {
    glob(paths.templates, (err, files) => {
        if (!err) {
            const teplatesDir = files.map(item => item.slice(0, item.lastIndexOf('/')));
            const options = {
                ignorePartials: true,
                batch: teplatesDir,
                helpers: {
                    capitals: str => str.toUpperCase()
                }
            };

            gulp.src(`${paths.baseDir}/index.hbs`)
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
    cssShort,
    autoprefixer({ browsers: ['last 2 version'] })
];
if (config.env === 'production') { processors.push(cssnano); }

const lintProcessors = [
    stylelint(rulesStyles),
    reporter({
        clegarMessages: true,
        throwError: false
    })
];

gulp.task('styles', () => {
    gulp.src(paths.styles)
        .pipe(postcss(processors))
        .pipe(concat('styles/bundle.css'))
        .pipe(gulp.dest(paths.buildDir));
});

gulp.task('scripts', () => {
    gulp.src(paths.scripts)
        .pipe(concat('js/script.js'))
        .pipe(gulpif(config.env === 'production', uglify()))
        .pipe(gulp.dest(paths.buildDir));
});

gulp.task('lint', ['eslint', 'stylelint']);

gulp.task('eslint', () => {
    gulp.src(paths.scriptsLint)
        .pipe(eslint(rulesScripts))
        .pipe(eslint.format());
});

gulp.task('stylelint', () => {
    gulp.src(paths.styles)
        .pipe(postcss(lintProcessors));
});

gulp.task('fonts', () => {
    gulp.src('./src/fonts/**/*')
        .pipe(filter(['*.woff', '*.woff2']))
        .pipe(gulp.dest(`${paths.buildDir}/fonts`));
});

gulp.task('assets', () => {
    glob(paths.assets, (err, files) => {
        if (!err) {
            gulp.src(files)
                .pipe(gulp.dest(`${paths.buildDir}/assets`));
        } else {
            throw err;
        }
    });
});

gulp.task('watch', () => {
    gulp.watch(paths.handlebars, ['compile']);
    gulp.watch(paths.styles, ['styles']);
    gulp.watch(paths.scripts, ['scripts']);
    gulp.watch(paths.contextJson)
        .on('change', browserSync.reload);
    gulp.watch(`${paths.buildDir}/**/*`)
        .on('change', browserSync.reload);
});
