jekyll-gulp-sass-browser-sync
=============================

A starter project including full setup for Jekyll, GulpJS, PUGjs (Jade), SASS, Imagemin & BrowserSync. Modified by Tiagones, forked from Shane Osbourne (https://github.com/shakyShane/jekyll-gulp-sass-browser-sync).

And here's a GIF showing the CSS injecting.

![GIF](http://f.cl.ly/items/373y2E0e0i2p0E2O131g/test-gif.gif)

## System Preparation

To use this starter project, you'll need the following things installed on your machine.

1. On Windows machines, recommended [Chocolatey](https://chocolatey.org/) - The package manager for Windows
2. [Ruby](https://www.ruby-lang.org):
   - Windows: `C:\> choco install ruby` via chocolatey or [RubyInstaller](https://rubyinstaller.org/).
   - Linux: `$ sudo apt-get install ruby-full`
   - MacOS: `$ brew install ruby`
3. [Jekyll](http://jekyllrb.com/) - `gem install jekyll`
4. [NodeJS](http://nodejs.org):
   - Windows: `C:\> choco install nodejs.install`
   - Linux: `$ sudo apt-get install nodejs`
   - MacOS: `$ brew install node`
5. [GulpJS](https://github.com/gulpjs/gulp) - `npm install -g gulp`
6. [BrowserSync](https://browsersync.io/) - `npm install -g browser-sync`

## Local Installation

1. Clone this repo, or download it into a directory of your choice.
2. Inside the directory, run `npm install`.

## Usage

**development mode**

This will give you file watching, browser synchronisation, auto-rebuild, CSS injecting etc etc.

```shell
$ gulp
```

**jekyll**

As this is just a Jekyll project, you can use any of the commands listed in their [docs](http://jekyllrb.com/docs/usage/)

## Deploy with Gulp

You can easily deploy your site build to a gh-pages branch. First, follow the instructions at [gulp-gh-pages](https://github.com/rowoot/gulp-gh-pages) to get your branch prepared for the deployment and to install the module. Then, in `gulpfile.js` you'll want to include something like the code below. `gulp.src()` needs to be the path to your final site folder, which by default will be `_site`. If you change the `destination` in your `_config.yml` file, be sure to reflect that in your gulpfile.

```javascript
var deploy = require("gulp-gh-pages");

gulp.task("deploy", ["jekyll-build"], function () {
    return gulp.src("./_site/**/*")
        .pipe(deploy());
});
```

## TODO

**Upgrades**
- [ ] Upgrade from JADE to PUGjs (Gulp)
- [ ] Add Sourcemaps for CSS and JS files
- [ ] Check best configuration for autoprefixer for 2018 browsers

**Improvments**
- [ ] Study the possibility of using 'gulp-hash' to improve assets cache control.
- [ ] Add support for Bower or Yarn (recommended).
