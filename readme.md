# Workflow for building web application

* [Handelbars](http://handlebarsjs.com/) 
* [PostCSS](https://github.com/postcss/postcss)
    * [Assets](https://github.com/assetsjs/postcss-assets)
    * [Nested](https://github.com/postcss/postcss-nested)
    * [Sorting](https://github.com/hudochenkov/postcss-sorting)
    * [Short](https://github.com/jonathantneal/postcss-short)
    * [StyleLint](https://www.npmjs.com/package/stylelint)
    * [Reporter](https://github.com/postcss/postcss-reporter)
    * [Autoprefixer](https://github.com/postcss/autoprefixer)
* [ESLint](http://eslint.org/)
* [Gulp](http://gulpjs.com/)
* The modular build
* [Browser-sync](https://www.browsersync.io/)

## Global dependencies
You must have installed: `node`, `npm`, `gulp`.

##How to work with this project

1. `git clone https://github.com/6thSence/workflow-handlebars-postcss-gulp.git app`
2. `cd app`
3. `npm i`
4. `gulp` 
... or
`NODE_ENV=production gulp`
(for production version)

---

![wow](https://github.com/6thSence/assets-for-any-occasion/raw/master/200 (22).gif)

## Project structure

* `src/` 
    - `fonts/` 
    - `styles/` default and font styles
    - `templates/`
      - `template/`
        - `assets/` files using template (svg, png)
        - `template.css` template styles
        - `template.hbs` template
        - `template.js` template script
      - `index.css` entry-point styles (template)
      - `index.hbs` entry-point (template)
      - `index.js` entry-point scripts (template)
      - `test.json` handlebars context
* `static/` build directory 
* `config.js` configuration file 
* `eslintrc.json` eslint rules
* `stylelintrc.json` stylilint rules
