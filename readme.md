# Workflow for build web application

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

## Global dependence
You must be installed in the system: `node`, `npm`, `gulp`.

##How working with this project

1. `git clone https://github.com/6thSence/workflow-handlebars-postcss-gulp.git app`
2. `cd app`
3. `npm i`
4. `gulp` 
... or
`NODE_ENV=prodaction gulp`
(for production version)

---

![wow](https://github.com/6thSence/assets-for-any-occasion/raw/master/200 (22).gif)

## File Structure

* `src/` 
    - `fonts/` 
    - `styles/` default styles and fonts styles
    - `templates/`
      - `template/`
        - `assets/` files used template (svg, png)
        - `template.css` the styles template
        - `template.hbs` the template
        - `template.js` the script template
      - `index.css` the styles entry-point (template)
      - `index.hbs` entry-point (template)
      - `index.js`the scripts entry-point (template)
      - `test.json` context for handlebars
* `static/` directory for build 
* `config.js` config file for project 
* `eslintrc.json` rules for eslint
* `stylelintrc.json` rules for eslint
