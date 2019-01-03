"use strict";

/* -------------------------------------------------- */
/* CONFIG FILES
/* -------------------------------------------------- */

const frameworkFile = "framework.json",
	  configFile = "config.json",
	  revFile = "rev.json",
	  serverFile = "server.json",
	  metadataFile = "metadata.json";

/* -------------------------------------------------- */
/* MODULES
/* -------------------------------------------------- */

// CORE
import gulp from "gulp"; // Core Gulp module.
import hubRegistry from "gulp-hub"; // Register tasks.


// MODULES
import a11y from "gulp-a11y"; // Performs an accessibility audit.
import accessibility from "gulp-accessibility"; // Performs an accessibility audit.
import awsPublish from "gulp-awspublish"; // Push files to AWS S3 Bucket.
import awsSDK from "aws-sdk"; // Official AWS SDK for JavaScript, available for browsers and mobile devices, or Node.js backends.
import browserSync from "browser-sync"; browserSync.create(); // Sync and update changes for local development.
import browserSyncHTMLInjector from "bs-html-injector"; // Plugin to update (inject) HTML changes similar to CSS injection.
import cache from "gulp-cached"; // Keep track and cache files in memory that run through the stream.
import del from "del"; // Delete files and directories.
import deleteEmpty from "delete-empty"; // Delete empty directories.
import ftp from "vinyl-ftp"; // Deploy to server.
import fs from "fs"; // Read, sync and parse JSON files.
import git from "gulp-git"; // Push files to Github.
import gulpif from "gulp-if"; // Allows for conditional operators (if, &&, ||, ==, ===, <, >) in pipe streams.
import gutil from "gulp-util"; // For logging tasks and process streams.
import jsonReplace from "gulp-json-replace"; // Replaces strings from JSON data.
import open from "gulp-open"; // Access and open files in a browser.
import path from "path"; // Resolves pathing issues.
import prompt from "gulp-prompt"; // Allow user inputs.
import removeCode from "gulp-remove-code"; // Remove sections of code from files based on conditions.
import rename from "gulp-rename"; // Rename directories and file names.
import renameExt from "gulp-ext-replace" // Rename file's extension.
import replace from "gulp-replace"; // Find and replace string or text.
import rev from "gulp-rev"; // File revisioning.
import revRewrite from "gulp-rev-rewrite"; // Rewrite occurrences of file names which have been renamed by gulp-rev.
import revDelete from "gulp-rev-delete-original"; // Delete the original file rewritten by gulp-rev or gulp-rev-all.
import revFormat from "gulp-rev-format"; // Formatting options for revisioned files.
import sourcemaps from "gulp-sourcemaps"; // Generate JS or CSS sourcemaps.
import zip from "gulp-zip"; // ZIP compress files.


// FRAMEWORK MODULES
//import foundation from "foundation-sites";
import purgeHtml from "purgecss-from-html" // Removes unused CSS in production files. *Note: This will enable ':hover' states on touch devices.


// HTML MODULES
import concat from "gulp-concat"; // Bundle JS and CSS files.
//import criticalcss from "critical";
import htmlmin from "gulp-htmlmin"; // Minify HTML files.
import htmlreplace from "gulp-html-replace"; // Replace build blocks in HTML files.
import inject from "gulp-inject"; // Inject JS and CSS files.
import noopener from "gulp-noopener"; // Inserts 'rel=noopener' to links that open in a new window.
import panini from "panini"; // Foundation Handlebars templating engine.
import webfontloader from "inject-webfontloader"; // Inject WebFontLoader.


// JS MODULES
import babel from "gulp-babel"; // JavaScript converter and compiler.
import defer from "gulp-defer"; // Moves render blocking JavaScript and CSS files into a deferred loading section.
import jshint from "gulp-jshint"; // Detect errors and potential problems in JavaScript syntax.
import modernizr from "gulp-modernizr"; // Detect browser and device specific features.
import uglify from "gulp-uglify"; // Minify JS files.


// CSS MODULES
import cssbeautify from "gulp-cssbeautify"; // Formats CSS as a readable output.
import csslint from "gulp-csslint"; // Detect errors and potential problems in CSS syntax.
import cleanCSS from "gulp-clean-css"; // Minify CSS files.
import postcss from "gulp-postcss"; // CSS Pre and post processer.
import postcssAutoprefixer from "autoprefixer"; // Adds vendor prefixes using data from caniuse.com.
import postcssCalc from "postcss-calc"; // Reduces calc() references whenever possible.
import postcssCombineDuplicatedSelectors from "postcss-combine-duplicated-selectors"; // Combine similar CSS selectors.
import postcssMQPacker from "css-mqpacker"; // Combine (pack) similar media query rules.
import postcssVariables from "postcss-css-variables"; // Process CSS variables.
import postcssZIndex from "postcss-zindex"; // Reduce z-index values without compromising integrity of stack order and layout.
import purgecss from "gulp-purgecss"; // Removes unused CSS in production files. *Note: This will enable ':hover' states on touch devices.
import sass from "gulp-sass"; // Compile SCSS files.
import sassCompiler from "node-sass"; // SASS Compiler.
import sassGlob from "gulp-sass-glob"; // Glob imports for SASS.


// ASSET MODULES
import imagemin from "gulp-imagemin"; // Compress raster image assets.
import rasterize from "gulp-raster"; // Rasterize (JPG, PNG) SVG assets.
import svg2png from "gulp-svg2png"; // Convert SVG files to PNG files.
import svgmin from "gulp-svgmin"; //Compress SVG assets.
import svgSprite from "gulp-svg-sprites"; // Generate an SVG sprite sheet.
import webp from "gulp-webp"; // Convert image assets to WebP format.


// CACHE / CRAWLING / TRACKING
import fullstory from "inject-fullstory"; // Inject FullStory tracking.
import serviceworker from "inject-serviceworker"; // Inject Service Worker.
import ga from "gulp-ga"; // Inject Google Analytics.
import generateSitemap from "gulp-sitemap"; // Generate a sitemap.
import gtm from "gulp-gtm"; // Inject Google Tag Manager.
import robots from "gulp-robots"; // Generate robots.txt.
import workbox from "workbox-build"; // Integrate Service Worker to leverage precache features.


/* -------------------------------------------------- */
/* FILE PATHS
/* -------------------------------------------------- */

const framework = JSON.parse(fs.readFileSync(frameworkFile)),
	  config = JSON.parse(fs.readFileSync(configFile)),

	  dirJoin = path.join,
	  dirResolve = path.resolve,
	  dirRelative = path.relative,
	  root = dirResolve(__dirname),

	  pathSource = config.path.source,
	  pathJS = config.js.source,
	  pathCSS = config.css.source,
	  pathSCSS = config.scss.source,

	  pathModules = framework.source,

	  pathBuild = config.path.build,
	  pathScripts = config.path.scripts,
	  pathAssets = config.path.assets,

	  pathTemp = "_temp/";


/* -------------------------------------------------- */
/* OPTIONS
/* -------------------------------------------------- */

let production = config.options.production;


/* -------------------------------------------------- */
/* VARS
/* -------------------------------------------------- */

// JS
const uglifyJSOptions = {
		compress: {
				   dead_code: config.optimizations.js.removeDeadCode, // Controls unused code (true).
				   drop_console: config.optimizations.js.dropConsole, // Controls console log (true).
		},
		ie8: config.optimizations.js.ie8Support, // Controls support for IE8 (false).
		keep_fnames: config.optimizations.js.keepfnames, // Prevent discarding or mangling of function names. Useful for code relying on Function.prototype.name (false).
		mangle: config.optimizations.js.mangle, // Controls top level variable and function name mangling and to drop unused variables and functions (false).
		toplevel: config.optimizations.js.toplevel // Controls top level variable and function name mangling and to drop unused variables and functions (false).
};


// CSS
const plugins = [postcssAutoprefixer({
									  add: config.optimizations.css.autoprefix, // Controls use of Visual Cascade, if CSS is uncompressed (true).
									  cascade: config.optimizations.css.cascade, // Controls adding prefixes (true).
									  flexbox: config.optimizations.css.flexbox, // Controls prefixes for flexbox properties. With 'no-2009' value Autoprefixer will add prefixes only for final and IE versions of specification (true).
									  grid: config.optimizations.css.grid, // Controls IE prefixes for Grid Layout properties (true).
									  remove: config.optimizations.css.removeOutdatedPrefixes, // Controls outdated prefixes (true).
									  supports: config.optimizations.css.supports,
									  support: config.optimizations.css.support,
									  //stats: config.optimizations.css.log // Custom usage statistics for > 10% in my stats browsers query.
									}),

				 //postcssCalc({ mediaQueries: false, precision: 5, preserve: false, selectors: false, warnWhenCannotResolve: false }),
				 postcssCombineDuplicatedSelectors({ removeDuplicatedProperties: config.optimizations.css.removeDuplicatedProperties }),
				 //postcssMQPacker(),

				 postcssVariables({
				 				   preserve: config.optimizations.css.preserveVariables, // Preserve variable properties (false).
				 				   preserveInjectedVariables: config.optimizations.css.preserveVariables // Preserve injected variable properties (false).
				 }),
				 postcssZIndex()
				];

const purgeCSSOptions = {
		content: [pathBuild + "**/*.{html,php}",
				  pathBuild + "**/*.js"],
		css: [pathBuild + "**/*.css"]
	  },
	  purgeStyleguideCSSOptions = {
		content: [pathBuild + "**/styleguide.{html,php}",
				  pathBuild + "**/styleguide.js"],
		css: [pathBuild + "**/styleguide.css"]
	  };

const cleanCSSOptions = {
		compatibility: "*",
		rebase: config.optimizations.css.rebase,
		//rebaseTo: "./",
		level: {
				1: {
					all: true,
					replaceMultipleZeros: true, // Contols removing redundant zeros; defaults to (true).
					replaceZeroUnits: false, // Controls replacing zero values with units; defaults to (true).
					specialComments: false
				},
				2: {
					mergeAdjacentRules: false, // Controls mergeing adjacent rules (false). *Note: Might cause unusual results. 
					mergeIntoShorthands: false, // Controls merging properties into shorthands (false). *Note: Might cause unusual results. 
					mergeMedia: true, // Controls merging @media rules (true). *Note: Might cause unusual results.
					mergeNonAdjacentRules: true, // Controls merging non-adjacent rules (true).
					mergeSemantically: false, // Controls semantic merging (false).
					overrideProperties: true, // Controls property overriding based on understandability (true).
					removeEmpty: true, // Controls empty rules and nested blocks (true).
					reduceNonAdjacentRules: true, // Controls non-adjacent rules (true).
					removeDuplicateFontRules: true, // Controls duplicate @font-face (true).
					removeDuplicateMediaBlocks: true, // Controls duplicate @media (true).
					removeDuplicateRules: true, // Controls duplicate rules (true).
					removeUnusedAtRules: false, // Controls unused at rule (false). *Note: Available since 4.1.0.
					restructureRules: true, // Controls rule restructuring (false).
					skipProperties: [] // Controls which properties won't be optimized, defaults to '[]' which means all will be optimized (since 4.1.0).
				}
		}
	 };


// HTML
const htmlminOptions = {
	  caseSensitive:true,
	  collapseBooleanAttributes: true,
	  collapseInlineTagWhitespace: false,
	  collapseWhitespace: true,
	  conservativeCollapse: false,
	  customAttrAssign: [],
	  customAttrCollapse: null,
	  customAttrSurround: [],
	  customEventAttributes: [],
	  decodeEntities: false,
	  html5: true,
	  ignoreCustomComments: [],
	  ignoreCustomFragments: [],
	  includeAutoGeneratedTags: true,
	  keepClosingSlash: false,
	  maxLineLength: null,
	  minifyCSS: true,
	  minifyJS: true,
	  minifyURLs: false,
	  preserveLineBreaks: false,
	  preventAttributeEscaping: false,
	  processConditionalComments: false,
	  processScripts: [],
	  quoteCharacter: '"',
	  removeAttributeQuotes: false,
	  removeComments: true,
	  removeEmptyAttributes: true,
	  removeEmptyElements: false,
	  removeOptionalTags: false,
	  removeRedundantAttributes: true,
	  removeScriptTypeAttributes: true,
	  removeStyleLinkTypeAttributes: true,
	  removeTagWhitespace: false,
	  sortAttributes: true,
	  sortClassName: true,
	  trimCustomFragments: false,
	  useShortDoctype: true
};


// VECTOR (SVG)
const svgminOptions = {
	  addAttributesToSVGElement: true, // Adds attributes to an outer <svg> element (false).
	  addClassesToSVGElement: true, // Add classnames to an outer <svg> element (false).
	  cleanupAttrs: config.images.svg.cleanup, // Cleanup attributes from newlines, trailing, and repeating spaces.
	  cleanupEnableBackground: config.images.svg.cleanup, // Remove or cleanup enable-background attribute when possible.
	  cleanupIDs: config.images.svg.cleanup, // Remove unused and minify used IDs.
	  cleanupListOfValues: config.images.svg.cleanup, // Round numeric values in attributes that take a list of numbers (like viewBox or enable-background).
	  cleanupNumericValues: config.images.svg.cleanup, // Round numeric values to the fixed precision, remove default px units.
	  collapseGroups: config.images.svg.minify, // Collapse useless groups.
	  convertColors: true, // Convert colors (from rgb() to #rrggbb, from #rrggbb to #rgb).
	  convertPathData: config.images.svg.minify, // Convert Path data to relative or absolute (whichever is shorter), convert one segment to another, trim useless delimiters, smart rounding, and much more.
	  convertShapeToPath: config.images.svg.minify, // Convert some basic shapes to <path>.
	  convertStyleToAttrs: true, // Convert styles into attributes.
	  convertTransform: config.images.svg.minify, // Collapse multiple transforms into one, convert matrices to the short aliases, and much more.

	  inlineStyles: true, // Move and merge styles from <style> elements to element style attributes.
	  
	  mergePaths: config.images.svg.minify, // Merge multiple Paths into one.
	  minifyStyles: config.images.svg.minify, // Minify <style> elements content with CSSO.
	  moveElemsAttrsToGroup: true, // Move elements' attributes to their enclosing group.
	  moveGroupAttrsToElems: true, // Move some group attributes to the contained elements.

	  removeAttrs: true, // Remove attributes by pattern (false).
	  removeComments: config.images.svg.minify, // Remove comments.
	  removeDimensions: true, // Remove width/height attributes if viewBox is present; opposite to removeViewBox, disable it first (false).
	  removeDoctype: config.images.svg.cleanup, // Remove doctype declaration.
	  removeDesc: config.images.svg.cleanup, // Remove <desc>.
	  removeEditorsNSData: config.images.svg.minify, // Remove editors namespaces, elements, and attributes.
	  removeElementsByAttr: config.images.svg.minify, // Remove arbitrary elements by ID or className (false).

	  removeEmptyAttrs: config.images.svg.cleanup, // Remove empty attributes.
	  removeEmptyContainers: config.images.svg.cleanup, // Remove empty Container elements.
	  removeEmptyText: config.images.svg.removeEmptyText, // Remove empty Text elements.
	  removeTitle: config.images.svg.removeTitle, // Remove <title>.
	  removeHiddenElems: config.images.svg.cleanup, // Remove hidden elements.
	  removeMetadata: config.images.svg.removeMetadata, // Remove <metadata>.
	  removeNonInheritableGroupAttrs: config.images.svg.minify, // Remove non-inheritable group's "presentation" attributes.
	  removeRasterImages: config.images.svg.removeRaster, // Remove raster images (false).
	  removeScriptElement: config.images.svg.removeScript, // Remove <script> elements (false).
	  removeStyleElement: config.images.svg.removeStyle, // Remove <style> elements (false).
	  removeUnknownsAndDefaults: config.images.svg.minify, // Remove unknown elements content and attributes, remove attrs with default values.
	  removeUnusedNS: config.images.svg.cleanup, // Remove unused namespaces declaration.
	  removeUselessDefs: config.images.svg.cleanup, // Remove elements of <defs> without id.
	  removeUselessStrokeAndFill: config.images.svg.cleanup, // Remove useless stroke and fill attrs.
	  removeViewBox: config.images.svg.removeViewBox, // Remove viewBox attribute when possible.
	  removeXMLNS: false, // Removes xmlns attribute for inline svg (false).
	  removeXMLProcInst: true, // Remove XML processing instructions.

	  sortAttrs: true // Sort element attributes for epic readability (false).
};


/* -------------------------------------------------- */
/* REGISTER TASKS
/* -------------------------------------------------- */

//const hub = new hubRegistry(["tasks/sync.js"]);
//gulp.registry(hub);


/* -------------------------------------------------- */
/* ANALYTICS / TRACKING
/* -------------------------------------------------- */

// FULLSTORY
export function injectfullstory(done) {

	if ( config.tracking.fullstory.allow && production ) {

		console.log("Injecting FullStory...");
	
		return gulp.src( pathBuild + "**/*.{html,php}" )
				   .pipe(fullstory({id: config.tracking.fullstory.id}))
				   .pipe(gulp.dest( pathBuild ));

	} else {

		return done();

	}

}


// GOOGLE ANALYTICS
export function injectga(done) {

	if ( config.tracking.ga.allow && production ) {

		console.log("Injecting Google Analytics...");
	
		return gulp.src( pathBuild + "**/*.{html,php}" )
				   .pipe(ga({
							 url: config.tracking.ga.url,
							 uid: config.tracking.ga.id,
							 anonymizeIp: config.tracking.ga.anonymizeIp,
							 bounceTime: config.tracking.ga.bounceTime,
							 demographics: config.tracking.ga.demographics,
							 linkAttribution: config.tracking.ga.linkAttribution,
							 minify: config.tracking.ga.minify,
							 nonceTag: config.tracking.ga.nonceTag,
							 require: config.tracking.ga.require,
							 sendPageView: config.tracking.ga.sendPageView,
							 tag: config.tracking.ga.tagPlacement
				   }))
				   .pipe(gulp.dest( pathBuild ));

	} else {

		return done();

	}

}


// GOOGLE TAG MANAGER
export function injectgtm(done) {

	if ( config.tracking.gtm.allow && production ) {

		console.log("Injecting Google Tag Manager...");
	
		return gulp.src( pathBuild + "**/*.{html,php}" )
				   .pipe(gtm({containerId: config.tracking.gtm.id}))
				   .pipe(gulp.dest( pathBuild ));

	} else {

		return done();

	}

}


/* -------------------------------------------------- */
/* WEB FONT LOADER
/* -------------------------------------------------- */

export function injectwebfontloader() {

		console.log("Injecting WebFontLoader...");
	
		return gulp.src( pathBuild + "**/*.{html,php}" )
				   .pipe(gulpif( config.fonts.allow, webfontloader({
											   						source: config.fonts.source,
											   						families: config.fonts.families,
											   						id: config.fonts.id,
											   						api: config.fonts.api,
											   						urls: config.fonts.urls,
											   						text: config.fonts.text,
											   						version: config.fonts.version,
											   						loadAllFonts: config.fonts.loadAllFonts,
											   						classes: config.fonts.classes,
											   						events: config.fonts.events,
											   						context: config.fonts.context,
											   						timeout: config.fonts.timeout
				   													}))
				   				)
				   .pipe(gulp.dest( pathBuild ));

}


/* -------------------------------------------------- */
/* META TAGS
/* -------------------------------------------------- */

export function meta() {
	
	console.log("Injecting data from: " + metadataFile);
	
	return gulp.src([pathBuild + "browserconfig.xml",
					 pathBuild + "manifest.json",
					 pathBuild + "**/*.{html,php}"])
			   .pipe(jsonReplace( {src: metadataFile, identify: "--"} ))
			   .pipe(gulp.dest( pathBuild ));
	
}


/* -------------------------------------------------- */
/* ROBOTS
/* -------------------------------------------------- */

export function robotstxt() {

	console.log("Generating robots.txt...");

	return gulp.src([pathBuild + "**/*.html",
					 "!" + pathBuild + config.html.dialog.output + "**/*"])
			   .pipe(gulpif( config.options.cacheBuild, cache("robotstxt") ))
			   .pipe(robots({
			   				 useragent: config.robots.useragent,
			   				 //allow: config.robots.allow,
			   				 disallow: config.robots.disallow,
			   				 sitemap: config.options.site + "/sitemap.xml"
			   }))
			   .pipe(gulp.dest(pathBuild));
}


/* -------------------------------------------------- */
/* SITEMAP
/* -------------------------------------------------- */

export function sitemap() {

	console.log("Generating sitemap...");

	return gulp.src([pathBuild + "**/*.html",
					 "!" + pathBuild + config.html.dialog.output + "**/*"])
			   .pipe(generateSitemap( {siteUrl: config.options.site} ))
			   .pipe(gulp.dest( pathBuild ));

}


/* -------------------------------------------------- */
/* SERVICE WORKER
/* -------------------------------------------------- */

export function sw(done) {

	if ( config.options.serviceworker && production ) {

		console.log("Generating and injecting Service Worker...");

		gulp.src( pathBuild + "**/*.{html,php}" )
			.pipe(serviceworker({}))
			.pipe(gulp.dest( pathBuild ));


		return workbox.generateSW({
								   globDirectory: pathBuild,
								   globPatterns: ["**/*.{css,eot,gif,html,jp2,jpg,jpeg,js,jxr,mp4,mpeg,ogg,ogv,otf,php,png,svg,ttf,webm,webp,woff,woff2}"],
			
								   runtimeCaching: [{
													 urlPattern: new RegExp('^https://fonts.(?:googleapis|gstatic).com/(.*)'),
													 handler: "cacheFirst",
													 options: {
													 		   cacheName: "font-cache",
													 		   expiration: { maxEntries: 10 },
													 },
								   					}],
								   swDest: `${pathBuild}/sw.js`,
								   clientsClaim: true,
								   skipWaiting: true
								  })
					  .then(({warnings}) => {

						for (const warning of warnings) {

							console.warn(warning);

						}

						console.info("Service worker generation completed.");

					  }).catch((error) => {

						console.warn("Service worker generation failed:", error);

					  });

	} else {

		console.log("Service Worker not in use.");

		return done();

	}

}


/* -------------------------------------------------- */
/* JS
/* -------------------------------------------------- */

// MAIN
export function js() {

	console.log("Compiling " + framework.bundle + "...");

	return gulp.src( framework.files.map( function(base) { return pathModules + base } ), {allowEmpty: true} )
			   .pipe(gulpif( config.options.cacheBuild, cache("js") ))
			   .pipe(concat("appFramework.js"))
			   .pipe(gulp.dest( pathBuild + pathScripts ))


			   .on("end", function () {

					console.log("Compiling " + config.js.bundle + "...");

					return gulp.src( config.js.files.map( function(base) { return pathSource + pathJS + base } ), {allowEmpty: true} )
							   .pipe(gulpif( config.options.cacheBuild, cache("jsend") ))

							   .pipe(gulpif( config.optimizations.js.lint, jshint() ))
							   .pipe(gulpif( config.optimizations.js.lint, jshint.reporter() ))

							   .pipe(removeCode({production: true}))
							   .pipe(concat("appCustom.js"))
							   .pipe(gulp.dest( pathBuild + pathScripts ));
							});

}


// MAIN
export function combinejs() {

	console.log("Combining " + config.js.bundle + "...");

	return gulp.src([pathBuild + pathScripts + "appFramework.js",
					 pathBuild + pathScripts + "appCustom.js"], {allowEmpty: true} )
			   .pipe(gulpif( config.options.cacheBuild, cache("combinejs") ))
			   .pipe(gulpif( config.options.sourcemaps, sourcemaps.init() ))
			   //.pipe(modernizr())
			   .pipe(removeCode({production: true}))

			   //.pipe(babel( { presets: ['es2015'] } ))
			   .pipe(gulpif( production, uglify(uglifyJSOptions).on("error", gutil.log) ))

			   .pipe(concat(config.js.bundle))
			   .pipe(gulpif( config.options.sourcemaps, sourcemaps.write("maps") ))
			   .pipe(gulp.dest( pathBuild + pathScripts ))


			   .on("end", function () {

					console.log("Compiling " + config.js.bundle + "...");

					return del([pathBuild + pathScripts + "appFramework.js",
						 pathBuild + pathScripts + "appCustom.js"
		 				], { allowEmpty: true });

	

				});

}




// STYLEGUIDE
export function styleguidejs() {

	//console.log("Compiling Style Guide scripts...");

	return gulp.src( config.js.files.map( function(base) { return pathSource + pathJS + base } ), {allowEmpty: true} )
			   .pipe(gulpif( config.options.sourcemaps, sourcemaps.init() ))
			   //.pipe(modernizr())
			   //.pipe(babel())
			   //.pipe(removeCode({production: true}))
			   //.pipe(gulpif( production, uglify(uglifyJSOptions).on("error", gutil.log) ))
			   .pipe(concat("styleguide.js"))
			   .pipe(gulpif( config.options.sourcemaps, sourcemaps.write("maps") ))
			   .pipe(gulp.dest( pathBuild + pathScripts ))


			   .on("end", function () {

								console.log("Compiling Style Guide scripts...");

								return gulp.src([pathBuild + pathScripts + "styleguide.js",
												 pathSource + pathJS + "assets/clipboard.js",
												 pathSource + pathJS + "styleguide.js"])
										   //.pipe(gulpif( config.options.sourcemaps, sourcemaps.init() ))
										   //.pipe(modernizr())
										   //.pipe(babel())
										   .pipe(removeCode({production: true}))
										   .pipe(gulpif( production, uglify(uglifyJSOptions).on("error", gutil.log) ))
										   .pipe(concat("styleguide.js"))
										   //.pipe(gulpif( config.options.sourcemaps, sourcemaps.write("maps") ))
										   .pipe(gulp.dest( pathBuild + pathScripts ));
										});

}


// VENDORS
export function vendors() {

	console.log("Compiling " + config.vendors.bundle + "...");

	return gulp.src( pathSource + config.vendors.files, {allowEmpty: true} )
			   .pipe(gulpif( config.options.cacheBuild, cache("vendors") ))
			   .pipe(gulpif( config.vendors.lint, jshint() ))
			   .pipe(gulpif( config.vendors.lint, jshint.reporter() ))
			   .pipe(gulpif( config.options.sourcemaps, sourcemaps.init() ))
			   //.pipe(modernizr())
			   //.pipe(babel())
			   .pipe(removeCode({production: true}))
			   .pipe(gulpif( production, uglify(uglifyJSOptions).on("error", gutil.log) ))
			   .pipe(concat(config.vendors.bundle))
			   .pipe(gulpif( config.options.sourcemaps, sourcemaps.write("maps") ))
			   .pipe(gulp.dest( pathBuild + pathScripts ));

}


/* -------------------------------------------------- */
/* CSS
/* -------------------------------------------------- */

// CRITICAL-ALT (IN TESTING)
var critical = require("critical").stream;

export function crit() {

	return gulp.src( pathBuild + "**/*.html" )
				.pipe(critical({base: pathBuild,
								inline: true,
								css: [ pathBuild + pathScripts + "app.6b1eca39d5.min.css" ],

								dimensions: [{width: 1920,
											  height: 1080
								}],

								minify: config.optimizations.html.minify,
								timeout: 30000,

								ignore: {atrule: ["@font-face"],
										 rule: [/some-regexp/],
										 decl: (node, value) => /big-image\.png/.test(value)
								}

				}))

				.on('error', function(err) { 
					gutil.log(gutil.colors.red(err.message))
				})

				.pipe(gulp.dest( pathBuild ));

}


// CRITICAL
export function critical() {

	console.log("Compiling critical css...");

	return gulp.src( pathSource + pathSCSS + config.scss.critical, { base: null, allowEmpty: true } )
			   .pipe(gulpif( config.options.cacheBuild, cache("critical") ))
			   .pipe(gulpif( config.options.sourcemaps, sourcemaps.init() ))
			   //.pipe(scsslint({ "reporterOutput": "scssreport.json" }))
			   .pipe(sassGlob( { ignorePaths: [ ] } ))
			   .pipe( sass({ outputStyle: null, trace: true, verbose: true }).on("error", sass.logError) )
			   //.pipe(sourcemaps.write())
			   .pipe(postcss(plugins))
			   //.pipe(gulpif( production, purgecss(purgeCSSOptions) ))
			   //.pipe(gulpif( production, cleanCSS(cleanCSSOptions) ))
			   //.pipe(renameExt(".css"))
			   .pipe(gulpif( config.options.sourcemaps, sourcemaps.write("maps") ))
			   .pipe(gulp.dest( pathSource + config.html.inlineScripts ))
			   //.pipe(gulp.dest( pathBuild + pathScripts ))
			   .pipe(browserSync.stream());

}


// SCSS
export function scss() {

	console.log("Compiling " + config.css.bundle + "...");

	return gulp.src( pathSource + pathSCSS + config.scss.bundle, { base: null, allowEmpty: true } )
			   .pipe(gulpif( config.options.cacheBuild, cache("scss") ))
			   .pipe(gulpif( config.options.sourcemaps, sourcemaps.init() ))
			   //.pipe(scsslint({ "reporterOutput": "scssreport.json" }))
			   .pipe(sassGlob( { ignorePaths: [ ] } ))
			   .pipe( sass({ outputStyle: null, trace: true, verbose: true }).on("error", sass.logError) )
			   .pipe(postcss(plugins))
			   .pipe(gulpif( production, purgecss(purgeCSSOptions) ))
			   .pipe(gulpif( production, cleanCSS(cleanCSSOptions) ))

			   //.pipe(cssbeautify({indent: "  ",
								  //openbrace: "separate-line",
								 // autosemicolon: true
				//}))

			   //.pipe(renameExt(".css"))
			   .pipe(gulpif( config.options.sourcemaps, sourcemaps.write("maps") ))
			   .pipe(gulp.dest( pathBuild + pathScripts ))
			   .pipe(browserSync.stream());

}


// MAIN
export function css() {

	console.log("Compiling " + config.css.bundle + "...");

	return gulp.src( config.css.files.map( function(base) { return pathSource + base } ), {allowEmpty: true} )
			   .pipe(gulpif( config.options.cacheBuild, cache("css") ))

			   .pipe(gulpif( config.optimizations.css.lint, csslint.formatter() ))
			   .pipe(gulpif( config.optimizations.css.lint, csslint() ))

			   .pipe(gulpif( config.options.sourcemaps, sourcemaps.init() ))
			   .pipe(concat(config.css.bundle))
			   //.pipe(postcss(plugins))
			   //.pipe(gulpif( production, purgecss(purgeCSSOptions) ))
			   //.pipe(gulpif( production, cleanCSS(cleanCSSOptions) ))
			   .pipe(gulpif( config.options.sourcemaps, sourcemaps.write("maps") ))
			   .pipe(gulp.dest( pathBuild + pathScripts ))
			   //.pipe(browserSync.stream());

			   .on("end", function(done) { // CSS and sprite assets compilation starts here.
			   		
			   		// CSS
					return gulp.src([pathBuild + pathScripts + config.css.bundle,
									 //pathBuild + pathTemp + config.images.sprite.files + config.images.sprite.mode + ".css"
									 ], {base: "", allowEmpty: true} )

							   //.pipe(gulpif( config.options.sourcemaps, sourcemaps.init() ))
							   .pipe(concat(config.css.bundle))
							   .pipe(postcss(plugins))
							   .pipe(gulpif( production, purgecss(purgeCSSOptions) ))
							   .pipe(gulpif( production, cleanCSS(cleanCSSOptions) ))
							   //.pipe(gulpif( config.options.sourcemaps, sourcemaps.write("maps") ))
							   .pipe(gulp.dest( pathBuild + pathScripts ))
							   .pipe(browserSync.stream());

			   });

}


// STYLEGUIDE
export function styleguidecss() {

	//console.log("Compiling Style Guide styles...");

	return gulp.src( config.css.files.map( function(base) { return pathSource + base } ), {allowEmpty: true} )
			   .pipe(gulpif( config.options.sourcemaps, sourcemaps.init() ))
			   .pipe(concat("styleguide.css"))
			   //.pipe(postcss(plugins))
			   //.pipe(gulpif( production, purgecss(purgeCSSOptions) ))
			   //.pipe(gulpif( production, cleanCSS(cleanCSSOptions) ))
			   .pipe(gulpif( config.options.sourcemaps, sourcemaps.write("maps") ))
			   .pipe(gulp.dest( pathBuild + pathScripts ))
			   //.pipe(browserSync.stream())


			   .on("end", function () {

					console.log("Compiling Style Guide styles...");

					return gulp.src([pathBuild + pathScripts + "styleguide.css", pathSource + "__css/styleguide.css"])
							   //.pipe(gulpif( config.options.sourcemaps, sourcemaps.init() ))
							   .pipe(concat("styleguide.css"))
							   .pipe(postcss(plugins))
							   .pipe(gulpif( production, purgecss(purgeStyleguideCSSOptions) ))
							   .pipe(gulpif( production, cleanCSS(cleanCSSOptions) ))
							   //.pipe(gulpif( config.options.sourcemaps, sourcemaps.write("maps") ))
							   .pipe(gulp.dest( pathBuild + pathScripts ))
							   .pipe(browserSync.stream());
							});

}


/* -------------------------------------------------- */
/* HTML
/* -------------------------------------------------- */

// MAIN
export function html() {

	console.log("Compiling HTML...");

	return gulp.src( pathSource + config.html.files )
			   .pipe(gulpif( config.options.cacheBuild, cache("html") ))
			   .pipe(panini({
							 root: pathSource + config.html.pages,
							 layouts: pathSource + config.html.layouts,
							 partials: pathSource + config.html.partials,
							 helpers: pathSource + config.html.helpers,
							 data: pathSource + config.html.data
				}))


			   .pipe(htmlreplace({
								  /*
								  base: {
										src: "https://" + "s3-" + server.aws.region + ".amazonaws.com/" + server.aws.bucket + "/",
										tpl: '<base href="%s">'
								  },
								  */
								  inlinejs: {
										src: gulp.src( pathSource + config.html.inlineScripts + "**/*.js" ),
										tpl: "<script>%s</script>"
								  },

								  //inlinecss: {
										//src: gulp.src( pathSource + config.html.inlineScripts + "**/*.css" ),
										//tpl: "<style>%s</style>"
								  //}

			   }, {keepUnassigned: false, keepBlockTags: false, resolvePaths: true} ))
			   .pipe(gulp.dest( pathBuild ))

}


// DILAOG / MODALS
export function dialog() {

	console.log("Compiling dialog content...");

	return gulp.src( pathSource + config.html.dialog.files )
			   .pipe(gulpif( config.options.cacheBuild, cache("dialog") ))
			   .pipe(panini({
							 root: pathSource + config.html.dialog.files,
							 layouts: pathSource + config.html.layouts,
							 partials: pathSource + config.html.partials,
							 helpers: pathSource + config.html.helpers,
							 data: pathSource + config.html.data
							})
			   )

			   .pipe(gulpif( production, htmlmin(htmlminOptions) ))
			   .pipe(replace("&lt;br&gt;", "<br>"))
			   .pipe(noopener.overwrite())
			   .pipe(gulp.dest( pathBuild + config.html.dialog.output ));

}


// ACCESSIBILITY
export function a11ycheck(done) {

	if ( config.accessibility.allow ) {

		console.log("Running accessibility audit...");

		return gulp.src( pathBuild + "**/*.{html,php}", { base: pathBuild } )
				   .pipe(gulpif( config.options.cacheBuild, cache("a11ycheck") ))
				   .pipe(a11y())
				   .pipe(a11y.reporter())
				   .pipe(accessibility({ force: true }))
				   .on("error", console.log)
				   .pipe(accessibility.report({ reportType: "txt" } ))
				   .pipe(rename({ extname: ".txt" } ))
				   .pipe(gulp.dest("reports/") );

	} else {

		console.log("Skipping accessibility audit.");

		return done();

	}

}


// HELPER
export function minify(done) {

	console.log("Minifying all assets...");

	return gulp.src( pathBuild + "**/*.{html,php}" )
			   .pipe(gulpif( config.options.cacheBuild, cache("minify") ))
			   .pipe(replace("siteVersion", config.options.siteVersion))
			   .pipe(replace("styleguideVersion", config.options.styleguideVersion))
			   .pipe(gulpif( config.optimizations.html.minify, htmlmin(htmlminOptions) ))
			   .pipe(gulp.dest( pathBuild ));

}


/* -------------------------------------------------- */
/* FINGERPRINT / VERSIONING / CACHE BUST
/* -------------------------------------------------- */

//*Note: In order for cache-bust to work 'production' in 'config.json' must be set to 'true'.

// JS
export function fingerprintscripts(done) {

	if ( config.versioning.scripts.allow && production ) {

		console.log("Fingerprinting script files...");

		return gulp.src( pathBuild + pathScripts + "**/*" )
				   .pipe(gulpif( config.options.cacheBuild, cache("fingerprintscripts") ))
				   .pipe(rev())
				   .pipe(revFormat({prefix: config.versioning.scripts.prefix,
									suffix: config.versioning.scripts.suffix,
									lastExt: false
					}))
				   .pipe(gulp.dest( pathBuild + pathScripts ))
				   .pipe(revDelete())
				   .pipe(revRewrite())
				   .pipe(rev.manifest( revFile, { base: pathBuild + pathScripts, merge: true } )) 
				   .pipe(gulp.dest( pathBuild + pathScripts ))

				   .on("end", function () {

								console.log("Injecting revisioned script files...");

								const manifest = gulp.src( revFile );

								return gulp.src([pathBuild + "**/*"])
										   .pipe(revRewrite({ manifest }))
										   .pipe(gulp.dest( pathBuild ));

									   });

	} else {

		return done();

	}

}


// ASSETS
export function fingerprintassets(done) {

	if ( config.versioning.images.allow && production ) {

		console.log("Fingerprinting asset files...");

		// TASK
		return gulp.src([pathBuild + pathAssets + "**/*",
						 "!" + pathBuild + pathAssets + "icons/*",
						 "!" + pathBuild + pathAssets + "social/*",
						 "!" + pathBuild + pathAssets + config.images.sprite.files + "**/*.svg"])
				   .pipe(gulpif( config.options.cacheBuild, cache("fingerprintassets") ))   
				   .pipe(rev())
				   .pipe(revFormat({prefix: config.versioning.images.prefix,
									suffix: config.versioning.images.suffix,
									lastExt: false
					}))
				   .pipe(gulp.dest( pathBuild + pathAssets ))
				   .pipe(revDelete())
				   .pipe(revRewrite())
				   .pipe(rev.manifest( revFile, { base: pathBuild + pathAssets, merge: true } )) 
				   .pipe(gulp.dest( pathBuild + pathAssets ))

				   .on("end", function () {

								console.log("Injecting revisioned asset files...");

								const manifest = gulp.src( revFile );

								gulp.src([pathBuild + "**/*"])
									.pipe(revRewrite({ manifest }))
									.pipe(gulp.dest( pathBuild ));

								});

	} else {

		return done();

	}

}


// INJECT
export function injectscripts(done) {

	console.log("Injecting scripts...");

	const stylesheet = "'stylesheet'";

	const relative = true,
		  removeTags = true,
		  ignorePath = pathBuild + config.html.dialog.files,
		  addRootSlash = false,
		  name = "inject";

	inject.transform.html.js = filepath => '<script src="'+filepath+'" '+config.js.attribute+'></script>';
	inject.transform.html.css = filepath => '<link rel="preload" href="'+filepath+'" as="style" onload="this.onload=null;this.rel='+stylesheet+'">';


	// TESTING AREA
	//.pipe(inject(gulp.src(pathBuild + pathScripts + config.CSS.bundle, {read: false}), {relative: false}))
	//.pipe(inject(gulp.src(pathBuild + pathScripts + config.js.bundle, {read: false}), {relative: false}))
	return gulp.src(pathBuild + "**/*.{html,php}", {base: pathBuild} )

			   .pipe(inject(

					gulp.src([pathBuild + pathScripts + config.js.bundle,
							  pathBuild + pathScripts + config.css.bundle], {read: false, allowEmpty: true} ), {

							  relative: relative,
							  starttag: "<!-- inject:app:{{ext}} -->"} ), {

					}
				
			   ) // END APP INJECTION


			   .pipe(inject(

					gulp.src([pathBuild + pathScripts + config.vendors.bundle], {read: false, allowEmpty: true} ), {

							  relative: relative,
							  starttag: "<!-- inject:vendors:{{ext}} -->"} ), {

					}
				
			   ) // END VENDORS INJECTION


			   .pipe(inject(

					gulp.src([pathBuild + pathScripts + "styleguide.js",
							  pathBuild + pathScripts + "styleguide.css"], {read: false, allowEmpty: true} ), {

							  relative: relative,
							  starttag: "<!-- inject:styleguide:{{ext}} -->"} ), {

					}
				
			   ) // END STYLEGUIDE INJECTION


			   //.pipe(defer())	
			   //.pipe(gulpif( !server.aws.upload, removeCode({removeBase: true}) ))
			   .pipe(gulpif( !config.options.appBanner, removeCode({removeAppBanner: true}) ))
			   .pipe(gulpif( !config.vendors.allow, removeCode({removeVendors: true}) ))

			   .pipe(removeCode({production: true}) )
			   .pipe(replace("&lt;br&gt;", "<br>"))
			   .pipe(noopener.overwrite())
			   //.pipe(replace("siteVersion", config.options.siteVersion))
			   //.pipe(replace("styleguideVersion", config.options.styleguideVersion))
			   //.pipe(gulpif( production, htmlmin(htmlminOptions) ))
			   .pipe(gulp.dest( pathBuild ));

}


/* -------------------------------------------------- */
/* MOVE FOLDERS AND ASSETS
/* -------------------------------------------------- */

export function move() {

	console.log("Copying directories and files...");

	return gulp.src([pathSource + "**/.htaccess",
					 pathSource + "**/manifest.json",
					 pathSource + "**/browserconfig.xml",
					 pathSource + "**/*",
					 "!" + pathSource + pathJS,
					 "!" + pathSource + pathCSS,
					 "!" + pathSource + pathSCSS,
					 "!" + pathSource + "{_*/*,__*/**,**/*.html,**/*.php}"
					 ], {base: pathSource})
				.pipe(gulpif( config.options.cacheBuild, cache("move") ))
				.pipe(gulp.dest( pathBuild ))

				.on("end", function () {

					console.log("Deleting unnecessary directories...");

					return deleteEmpty.sync( pathBuild );

				});

}


/* -------------------------------------------------- */
/* ASSET PATHS
/* -------------------------------------------------- */

export function assets() {

	console.log("Copying image assets...");

	return gulp.src( pathSource + "**/*.{gif,jpg,jpeg,png,svg}" )
			   .pipe(gulpif( config.options.cacheBuild, cache("assets") ))
			   .pipe(rename({
							 dirname: pathAssets,
							 //basename: "",
							 //prefix: "",
							 //suffix: "",
							 //extname: ""
							}))
			   .pipe(gulp.dest( pathBuild ));

}


/* -------------------------------------------------- */
/* ZIP ASSETS
/* -------------------------------------------------- */

export function zipassets() {

	console.log("Packaging brand assets...");

	return gulp.src( config.styleguide.assets.map( function(base) { return pathBuild + pathAssets + base } ), {allowEmpty: true} )
			   .pipe(gulpif( config.options.cacheBuild, cache("zipassets") ))
			   .pipe(zip( config.options.name + "-brand-assets.zip" ))
			   .pipe(gulp.dest( pathBuild ));

 }


/* -------------------------------------------------- */
/* ASSET COMPRESSION
/* -------------------------------------------------- */

// RASTER IMAGES (GIF, JPG, PNG)
export function optimizeassets() {

	console.log("Compressing images assets...");

	return gulp.src( pathBuild + "**/*.{gif,jpg,jpeg,png,svg}", {base: pathBuild} )
			   .pipe(gulpif( config.options.cacheBuild, cache("optimizeassets") ))
			   .pipe(gulpif( production, imagemin([imagemin.optipng({optimizationLevel: config.images.raster.level}),
							   imagemin.gifsicle({interlaced: config.images.raster.interlaced}),
							   imagemin.jpegtran({progressive: config.images.raster.progressive}),
							  ], {verbose: true}) )
			   )
			   .pipe(gulpif( config.images.webp.convert, webp({method: config.images.webp.level,
														   	   quality: config.images.webp.quality,
														   	   alphaQuality: config.images.webp.alphaQuality,
														   	   sharpness: config.images.webp.sharpness,
														   	   filter: 0,
														   	   autoFilter: false,
														   	   lossless: false,
														   	   nearLossless: 100,
														   	   sns: 80})
			   ))
			   
			   .pipe(gulp.dest( pathBuild ));

}


// SPRITE GENERATOR (BETA TESTING)
export function sprite() {

	console.log("Generating svg sprite sheet...");

	return gulp.src( pathSource + pathAssets + config.images.sprite.files + "**/*.svg", {base: pathSource} )
			   .pipe(gulpif( config.options.cacheBuild, cache("sprite") ))
			   .pipe(svgSprite({

								mode: config.images.sprite.mode, // defs, sprite, symbols
								common: config.images.sprite.class,
								selector: "%f",
								layout: config.images.sprite.layout,
								padding: config.images.sprite.padding,
								baseSize: 10,
								svgId: "%f",

								svg: { defs: config.images.sprite.mode + ".svg", sprite: config.images.sprite.mode + ".svg", symbols: config.images.sprite.mode + ".svg" },

								cssFile: config.images.sprite.mode + ".css",
								svgPath: "../" + pathAssets + config.images.sprite.files + "%f", // Path to be included in CSS.
								pngPath: "../" + pathAssets + config.images.sprite.files + "%f", // Path to be included in CSS.

								asyncTransforms: config.images.sprite.asyncTransforms,

								preview: config.images.sprite.preview
								//preview: { sprite: config.images.sprite.mode + ".html" }

		   				   }
			   ))
			   .pipe(gulp.dest(pathBuild + pathTemp + config.images.sprite.files))


			   .on("end", function() {
			   		
			   		// CSS
			   		/*
					gulp.src( [pathBuild + pathScripts + config.css.bundle,
							   pathBuild + pathTemp + config.images.sprite.files + config.images.sprite.mode + ".css"] )

						//.pipe(gulpif( config.options.sourcemaps, sourcemaps.init() ))
						.pipe(concat(config.css.bundle))
						.pipe(postcss(plugins))
						.pipe(gulpif( production, purgecss(purgeCSSOptions) ))
						.pipe(gulpif( production, cleanCSS(cleanCSSOptions) ))
						//.pipe(gulpif( config.options.sourcemaps, sourcemaps.write("maps") ))
						.pipe(gulp.dest( pathBuild + pathScripts ))
						.pipe(browserSync.stream());
						*/


					// SVG
					gulp.src( pathBuild + pathTemp + "**/*.svg" )
						.pipe(svgmin(svgminOptions))
						.pipe(gulp.dest(pathBuild + pathAssets));


					// RASTER
					gulp.src( pathBuild + pathTemp + "**/*.svg" )
						.pipe(gulpif( config.images.sprite.convert.allow, rasterize({ format: config.images.sprite.convert.format, scale: config.images.sprite.convert.scale }) ))
						.pipe(gulpif( config.images.sprite.convert.allow, rename({ extname: "." + config.images.sprite.convert.format }) ))
						.pipe(gulp.dest(pathBuild + pathAssets));

			   });

			   //return done();

}


// VECTOR (SVG)
export function svg() {

	console.log("Compressing svg assets...");

	return gulp.src( pathBuild + "**/*.svg", {base: pathBuild} )
			   .pipe(gulpif( config.options.cacheBuild, cache("svg") ))
			   .pipe(svgmin(svgminOptions))
			   .pipe(gulpif( config.images.svg.convert.allow, rasterize({ format: config.images.svg.convert.format, scale: config.images.svg.convert.scale }) ))
			   .pipe(gulpif( config.images.svg.convert.allow, rename({ extname: "." + config.images.svg.convert.format }) ))

			   .pipe(gulp.dest(pathBuild));

}


/* -------------------------------------------------- */
/* CLEAN BUILD FOLDER
/* -------------------------------------------------- */

// DO NOT EDIT THESE CODE BLOCKS! YOU WILL END UP DELETING THE PROJECT'S ROOT FOLDER.

export function clear(done) {

	console.log("Cleaning " + pathBuild + " folder...");
	
	del([revFile,
		 pathSource + pathCSS + config.images.sprite.mode + ".css",
		 pathSource + pathAssets + config.images.sprite.files + config.images.sprite.mode + ".css",
		 pathSource + pathAssets + config.images.sprite.files + config.images.sprite.mode + ".svg",
		 pathBuild + "**/*",
		 pathBuild + ".htaccess"], { allowEmpty: true });

	//return deleteEmpty.sync( pathBuild );

	return done();

}


export function clean(done) {

	console.log("Cleaning " + pathBuild + " folder...");

	del([revFile,
		 pathSource + pathCSS + config.images.sprite.mode + ".css",
		 pathSource + pathAssets + config.images.sprite.files + config.images.sprite.mode + ".css",
		 pathSource + pathAssets + config.images.sprite.files + config.images.sprite.mode + ".svg",
		 pathBuild + pathTemp
		 ], { allowEmpty: true });

	return done();

	//return deleteEmpty.sync( pathBuild );

}


/* -------------------------------------------------- */
/* SERVER CHECK
/* -------------------------------------------------- */

// Create a variable for serverStatus.
let serverStatus;


if ( fs.existsSync(serverFile) ) {

	serverStatus = true;
	//console.log( serverFile + " exists. Server status: " + serverStatus );

} else {

	serverStatus = false;
	//console.log( serverFile + " does not exists. Server status: " + serverStatus );

	serverconfig();

}


/* -------------------------------------------------- */
/* SERVER CONFIGURATION GENERATOR
/* -------------------------------------------------- */

export function serverconfig(done) {

	const json = {

				"aws": {
					"upload": false,
					"dist": ["./your-production-folder"],
					"region": "us-west-1",
					"bucket": "your.bucket.com",
					"accessKeyId": "",
					"secretAccessKey": "",
					"cachecontrol": "max-age=315360000, no-transform, public",
					"cache": false,
					"sync": true,
					"gzip": true,
					"signatureVersion": "v3",
					"confirm": true
				},

				"git": {
					"upload": true,
					"dist": ["./your-production-folder"],
					"promise": "github.com/username/repo",
					"repo": "https://github.com/username/repo.git",
					"origin": "origin",
					"branch": "master",
					"user": "Username",
					"password": "Password",
					"message": ["Initial commit."],
					"timeOffset": 1000,
					"quiet": false,
					"confirm": true
				},

				"ftp": {
					"upload": false,
					"dist": ["./your-production-folder"],
					"host": "",
					"path": "./remote-path",
					"path": "dev/build",
					"user": "Username",
					"password": "Password",
					"secure": false,
					"parallel": 10,
					"maxConnections": 5,
					"timeOffset": 0,
					"idleTimeout": 100,
					"reload": true,
					"confirm": true
				}

	}, data = JSON.stringify(json, null, "\t");


	// Check if configuration file exists.
	if ( !fs.existsSync(serverFile) ) {

		console.log("Cound not find a server configuration file. One will be created for you.\nFile generated and saved to: " + root + "\\" + serverFile);

		fs.writeFile(serverFile, data, "utf8", function() {

			console.log("Use this file for your server info and run gulp deploy.");

			return gulp.src( serverFile )
					   .pipe(open());

		});


	} else {

		console.log("Found an existing server configuration file.");

		return done();

	}

}


/* -------------------------------------------------- */
/* BROWSERSYNC
/* -------------------------------------------------- */

export function sync() {

	console.log("Syncing...");


	// CONNECT TO LOCALHOST / DEV SERVER
	browserSync.use(browserSyncHTMLInjector);

	browserSync.init({
					  //files: config.sync.files,
					  server: {
							   baseDir: pathBuild,
							   serveStaticOptions: {
													extensions: ["html", "php"],
							   middleware: function (req, res, next) {
											   res.setHeader("Access-Control-Allow-Origin:", "*");
											   next();
										   }
							   }
					  },
					  notify: config.sync.notify,

					  browser: config.sync.browsers, // chrome, firefox, IE, opera, safari
					  host: config.sync.host,
					  https: config.sync.https,
					  localOnly: config.sync.localOnly,
					  online: config.sync.online,
					  port: config.sync.port,

					  cors: config.sync.cors,
					  open: config.sync.open, // external, local, tunnel, ui, false
					  tunnel: config.sync.tunnel,
					  xip: config.sync.xip, // .xip.io

					  codeSync: config.sync.codeSync,
					  injectChanges: config.sync.injectChanges,
					  watch: config.sync.watch,

					  ghostMode: config.sync.ghostMode,

					  reloadDebounce: config.sync.reloadDebounce,
					  reloadDelay: config.sync.reloadDelay,
					  reloadThrottle: config.sync.reloadThrottle,

					  scrollElements: config.sync.scrollElements,
					  scrollElementMapping: config.sync.scrollElementMapping,
					  scrollProportionally: config.sync.scrollProportionally,
					  scrollRestoreTechnique: config.sync.scrollRestoreTechnique,
					  scrollThrottle: config.sync.scrollThrottle,

					  logConnections: config.sync.logConnections,
					  logFileChanges: config.sync.logFileChanges,
					  logLevel: config.sync.logLevel,
					  logPrefix: config.options.site,
					  timestamps: config.sync.timestamps,
					  plugins: [],

					  callbacks: {

							ready: function(err, bs) {

								console.log(config.options.site + " connected!");
								//openNewTab = false;

							}

					  }

	});


	// WATCH
	gulp.watch([pathSource + "**/*.js",
				"!" + pathSource + config.html.inlineScripts + "**/*.js"
				]).on("all", gulp.series(js, combinejs, styleguidejs, injectscripts), reload);

	gulp.watch(pathSource + config.vendors.files).on("all", vendors, reload);


	// Note: 'critical()' task causes reload when running 'gulp test'.
	gulp.watch([pathSource + "**/*.scss",
				"!" + pathSource + config.html.inlineScripts + "**/*.css"
				]).on("all", gulp.series(critical, scss, styleguidecss, refresh));


	//gulp.watch(pathSource + "css/styleguide.css").on("all", styleguidecss);


	gulp.watch(pathSource + pathAssets + config.images.sprite.files + "**/*.svg").on("all", sprite, scss, reload);


	gulp.watch(pathSource + "**/*.{app,avi,dmg,doc,eot,exe,gif,jp2,jpg,jpeg,jxr,mid,midi,mp3,mp4,mpeg,mov,ogg,ogv,otf,pdf,png,rar,svg,tiff,ttf,txt,webm,webp,woff,woff2,zip}").on("all", move, reload);


	gulp.watch([//configFile,
				//credentialsFile,
				pathSource + metadataFile,
				pathSource + "**/browserconfig.xml",
				pathSource + config.html.inlineScripts + "**/*.js",
				pathSource + config.html.inlineScripts + "**/*.css",
				pathSource + config.html.files,
				pathSource + "{_data,_helpers,_layouts,_dialog,_partials}/**/*.{html,hbs,handlebars,json,yml}",
				]).on("all", gulp.series(html, dialog, meta, refresh, gulp.series(refresh, html, dialog, injectwebfontloader, injectscripts, meta, reload) ));

}


/* -------------------------------------------------- */
/* AWS
/* -------------------------------------------------- */

export function awsdeploy(done) {

	if ( serverStatus ) {

			const server = JSON.parse(fs.readFileSync(serverFile));


			if ( server.aws.upload ) {

				console.log("Using AWS.");


				// http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#constructor-property
				const publisher = awsPublish.create({
													 region: server.aws.region,
													 params: { Bucket: server.aws.bucket },
													 accessKeyId: server.aws.accessKeyId,
													 secretAccessKey: server.aws.secretAccessKey,
													 //credentials: new awsSDK.SharedIniFileCredentials({ profile: "aws-profile" }),
								}, {
									cacheFileName: "aws-cache"
								});

				// Define custom headers
				const headers = { "Cache-Control": server.aws.cachecontrol };

				return gulp.src( dirResolve(server.aws.dist + "**/*"), { base: dirResolve(server.aws.dist) } )
						   .pipe(gulpif( server.aws.gzip, awsPublish.gzip({ ext: ".gz" }) )) // GZIP, Set Content-Encoding headers and add .gz extension.
						   .pipe(publisher.publish(headers)) // Publisher will add Content-Length, Content-Type and headers specified above. If not specified it will set x-amz-acl to public-read by default
						   .pipe(gulpif( server.aws.cache, publisher.cache() )) // Create a cache file to speed up consecutive uploads.
						   .pipe(gulpif( server.aws.sync, publisher.sync() )) // This will publish and sync bucket files with the one in your public directory.
						   .pipe(awsPublish.reporter( {states: ["cache", "create", "delete", "skip", "update"]} )) // Print upload updates to console.

						   .on("end", function() {

						   		console.log("Production files will be pushed to: " + server.aws.bucket);

						   });

			} else {

				console.log("Bypassing AWS...");
				return done();

			}


	} else {

		console.log("No settings found for AWS. Use the server.config file to configure your AWS settings.");
		return done();

	}

}


/* -------------------------------------------------- */
/* SERVER
/* -------------------------------------------------- */

export function ftpdeploy(done) {

	if ( serverStatus ) {

		const server = JSON.parse(fs.readFileSync(serverFile));


		if ( server.ftp.upload ) {

			console.log("Using ftp server.");

			const conn = ftp.create({
									 host: server.ftp.host,
									 //port: server.ftp.port,
									 user: server.ftp.user,
									 password: server.ftp.password,
									 //secure: server.ftp.secure,
									 parallel: server.ftp.parallel,
									 maxConnections: server.ftp.maxConnections,
									 timeOffset: server.ftp.timeOffset,
									 idleTimeout: server.ftp.idleTimeout,
									 reload: server.ftp.reload,

									 log: gutil.log
			});

			const globs = [pathBuild + ".htaccess",
						   pathBuild + "**/*"];

			// Using base = '.' will transfer everything to /public_html correctly.
			// Turn off buffering in gulp.src for best performance.

			return gulp.src(globs, {base: dirResolve(config.ftp.dist), buffer: false})
					   //.pipe(conn.newer( pathBuild )) // Only upload newer files.
					   .pipe(conn.dest( server.ftp.path ))

					   .on("end", function() {

					   		console.log("Production files will be pushed to: " + server.ftp.host + "/" + server.ftp.path);

					   });

		} else {

			console.log("Bypassing FTP.");
			return done();

		}


	} else {

		console.log("No settings found for FTP. Use the server.config file to configure your FTP settings.");
		return done();

	}

}


/* -------------------------------------------------- */
/* HELPERS
/* -------------------------------------------------- */		

// REFRESH
function refresh(done) {

	console.log("Refreshing...");

	panini.refresh();
	return done();

}


// RELOAD
export function reload(done) {

	console.log("Reloading...");

	browserSync.reload();
	return done();

}


// PRODUCTION SWITCH
function mode(done) {

	production = false;

	if (production === false) {

		console.log("Build Mode: Development");

	} else {

		console.log("Build Mode: Production");

	}

	return done();

}


// OPEN / PREVIEW PRODUCTION
export function preview(done) {

	if ( config.options.previewURL ) {

		//console.log("Opening preview: " + config.options.previewURL);

		return gulp.src( pathBuild + config.options.previewURL )
			.pipe(open());

	} else if ( config.options.previewURL != null ) {

		console.log("Preview file not specified in " + configFile + ". Bypassing preview.");

		return done();

	} else {

		return done();

	}

}


/* -------------------------------------------------- */
/* TEST / BUILD / DEPLOY
/* -------------------------------------------------- */

// TEST
gulp.task("test", gulp.series(mode, clear, html, dialog, injectwebfontloader, vendors, js, critical, scss, combinejs, injectscripts, move, meta, a11ycheck, zipassets, svg, optimizeassets, clean, sync));


// BUILD
gulp.task("build", gulp.series(clear, html, dialog, injectfullstory, injectga, injectgtm, injectwebfontloader, vendors, js, critical, scss, combinejs, move, meta, a11ycheck, injectscripts, fingerprintscripts, svg, fingerprintassets, zipassets, optimizeassets, robotstxt, sitemap, clean, minify, sw, preview));


// DEPLOY
//gulp.task("deploy", gulp.series("build", deployinit, awsdeploy, gitdeploy, ftpdeploy));


/* -------------------------------------------------- */
/* TASKS
/* -------------------------------------------------- */

// SCRIPTS
gulp.task("scripts", gulp.series(js, critical, scss, combinejs, clean));


// ASSETS
gulp.task("images", gulp.series(move, sprite, assets, sprite, svg, zipassets, optimizeassets, clean));
