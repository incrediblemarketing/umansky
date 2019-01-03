/* -------------------------------------------------- */
/* LAZY LOAD / INTERSECTION OBSERVER
/* -------------------------------------------------- */

var utilAssetObserver = function() {

	/* -------------------------------------------------- */
	/* IMAGE RESIZE
	/* -------------------------------------------------- */
	
		/* -------------------------------------------------- */
		/* CACHE SELECTORS
		/* -------------------------------------------------- */

	    var imageBackground = $(".img-bg-resize");
		
		
		/* -------------------------------------------------- */
		/* PROPERTIES
		/* -------------------------------------------------- */

		// Set default styling and properties.
		//$imageBackground.parent().css({"height" : "600px"});
		imageBackground.parent().addClass("background-pattern");
		
		imageBackground.css({"width": "100%",
							 "height": "100%", // Safari does not render '100vh' properly.
							 "min-height": "400px",
							 //"background-position": "center center",
							 "background-repeat": "repeat",
							 //"background-size": "cover",
							 "transition-property": "background-position"});

		
		/* -------------------------------------------------- */
		/* FUNCTIONS
		/* -------------------------------------------------- */

		var imageBackgroundResize = function () {
		
			imageBackground.each(function() {

				// Cache selectors.
				var self = $(this);

				// Get the 'background-image'.
				var background = self.css("background-image");
				
				// If the background image is anything other than 'none'.
				if (background !== "none") {
					
					// Find and replace 'url()' to get the pure image URL
					background = background.replace('url("','').replace('")','');

					// Create new 'Image' instance and set path to our background.
					var bg = new Image();
					bg.src = background;

					// We now have serveral vars availible to pass through to the plugin.
					// self = the element.
					// background = the url.
					// bg.width = image width.
					// bg.height = image height.

					//console.log(bg.width);
					//console.log(bg.height);
	                   
					// Check if image has loaded and apply size and properties.
					bg.onload = function () {
	   					//console.info("Background image loaded. Calculating size.");
	 
						self.css({"width" : "100%",
								  "height" : bg.height,
								  //"min-height" : "400px",
								  "background-repeat" : "no-repeat"});

						
						// Recalculate 'background-image' height and resize proportionately.
						self.parent().css({"height" : bg.height / 1.25});

						
						if ( $isMobile && orientation === 0 ) {
				
							//console.log( "Orientation Mode: Portrait / " + orientation);
							self.parent().css({"height" : bg.height / 1});

							
						} else if ( $isMobile && orientation === 90 ) {
							
							//console.log( "Orientation Mode: Landscape / " + orientation);
							self.parent().css({"height" : bg.height * 1});

						}
						
						
					};

				}
				
			});
		
		};
		
		
		/* -------------------------------------------------- */
		/* INIT
		/* -------------------------------------------------- */

		$$(mainScrollContent).on("resize orientationchange", _.debounce(imageBackgroundResize, $updateInterval));

	
	/* -------------------------------------------------- */
	/* PRELOADER
	/* -------------------------------------------------- */

	//$$(".lazy").before('<div class="img-preloader"><span class="fa fa-spinner fa-pulse" aria-hidden="true"></span></div>').addClass("page-visibility");
	
	//$$(".lazy").addClass("page-visibility");
	
	//var removePreloaders = function() {

		//$$(".loaded").prev().remove();
		//$$("[data-was-processed]").prev().remove();

	//};
	
	
	/* -------------------------------------------------- */
	/* INTERSECTION OBSERVER
	/* -------------------------------------------------- */
	
		/* -------------------------------------------------- */
		/* FUNCTIONS
		/* -------------------------------------------------- */

		var lazyLog = function(eventName, element) {
			
			console.log( eventName, element.getAttribute("data-src") );
			
		};
			
		
		var lazyLoading = function(element) {		
			
			$(element).imagesLoaded({ background: true })
			
				.always( function() {
				
					//lazyLog("LOADING:", element);			
					//TweenMax.set(element, {opacity: 0, scale: 0.9});
				
				})
				
				.progress( function(instance, image) {
	    			//var result = image.isLoaded ? 'loaded' : 'broken';
					//console.log( 'image is ' + result + ' for ' + image.img.src );
	  			});
			
		};

		
		var lazySet = function(element) {

			$(element).imagesLoaded({ background: true })

				.done( function() {
				
					//lazyLog("LOADED:", element);
					//TweenMax.to(element, 0.35, {opacity: 1, scale: 1, delay: 0.5, ease: Back.easeOut});
					imageBackgroundResize();
				
				})
			
				.fail( function() {
				
					//lazyLog("UNABLE TO LOAD", element);
				
				});

		};

		
		/* -------------------------------------------------- */
		/* OPTIONS
		/* -------------------------------------------------- */

		var lazyOptions = {container: document,
						   elements_selector: ".lazy",
						   threshold: 100,
						   load_delay: 300,
						   data_src: "src",
						   data_srcset: "srcset",
						   data_sizes: "sizes",
						   class_loading: "loading",
						   class_loaded: "loaded",
						   class_error: "error",
						   callback_enter: lazyLoading,
						   callback_load: null,
						   callback_set: lazySet,
						   callback_error: null,
						   to_webp: true
		};
		
		
		/* -------------------------------------------------- */
		/* INIT
		/* -------------------------------------------------- */

		new LazyLoad(lazyOptions);

}; // END utilIntersectionObserver


/* -------------------------------------------------- */
/* DATA ATTRIBUTES
/* -------------------------------------------------- */

var utilDataAttributes = function() {
	"use strict";
	
	/* -------------------------------------------------- */
	/* COLOR
	/* -------------------------------------------------- */

	var dataColor = document.querySelectorAll("[data-color]");

	for (var iColor = 0; iColor < dataColor.length; iColor++) {
		 var hexColor = dataColor[iColor].getAttribute("data-color");
		 dataColor[iColor].style.backgroundColor = hexColor;
	}


	/* -------------------------------------------------- */
	/* PAGE
	/* -------------------------------------------------- */

	var dataPage = document.querySelectorAll("[data-page]");
	
	for (var iPage = 0; iPage < dataPage.length; iPage++) {
		 var idPage = dataPage[iPage].getAttribute("data-page");
	}
	

	/* -------------------------------------------------- */
	/* IMAGE
	/* -------------------------------------------------- */

	var dataImage = document.querySelectorAll("[data-image]");

	if ( Modernizr.webp && Modernizr.webp.lossless && Modernizr.webp.alpha && Modernizr.webp.animation ) {

		console.log("WebP supported.");

		for (var iImage = 0; iImage < dataImage.length; iImage++) {
			var urlImage = dataImage[iImage].getAttribute("data-image").replace(/jpg|png/ig, "webp");
			dataImage[iImage].style.backgroundImage = "url('" + urlImage + "')";
		}

		//img.src = img.getAttribute('data-webp');

	} else {

		console.log("WebP not supported.");

		for (var iImage = 0; iImage < dataImage.length; iImage++) {
			var urlImage = dataImage[iImage].getAttribute("data-image").replace(/webp/ig, "png");
			dataImage[iImage].style.backgroundImage = "url('" + urlImage + "')";
		}

		//img.src = img.getAttribute('data-jpg');

	}

}; // END utilDataAttributes


/* -------------------------------------------------- */
/* EMERGENCE
/* -------------------------------------------------- */

var utilEmergence = function() {

	/* -------------------------------------------------- */
	/* CACHE SELECTORS
	/* -------------------------------------------------- */

	var emergenceContainer = mainScrollContent,
		emergenceElement = $("[data-emergence]"),
		emergenceIgnore = $(".emergence-ignore"),
		video = document.querySelectorAll("video");
	
	
	/* -------------------------------------------------- */
	/* DETECT
	/* -------------------------------------------------- */

	if ( !$isMobile && !$hasTouch ) {

		//TweenMax.set(emergenceElement.not(emergenceIgnore).children().not(emergenceIgnore).not(anim).children(), {opacity: 0});
		TweenMax.set(emergenceElement.not(emergenceIgnore).children().not(emergenceIgnore).not(anim).children(), {autoAlpha: 0});

	}

	
	/* -------------------------------------------------- */
	/* OPTIONS
	/* -------------------------------------------------- */

	emergence.init({
		container: emergenceContainer,
		reset: true,
		handheld: true,
		throttle: $updateInterval,
		elemCushion: 0,
		offsetTop: 0,
		offsetRight: 0,
		offsetBottom: 0,
		offsetLeft: 0,
		callback: function(element, state) {


			/* -------------------------------------------------- */
			/* VISIBLE
			/* -------------------------------------------------- */

			if ( state === "visible" ) {

				//console.log("Element is visible.");

				/* -------------------------------------------------- */
				/* DETECT
				/* -------------------------------------------------- */

				if ( !$isMobile && !$hasTouch ) {

					//TweenMax.staggerTo($(element).not(emergenceIgnore).children().not(emergenceIgnore).not(anim).children(), 1, {opacity: 1, delay: 0, ease: Power4.easeOut, overwrite: "false", clearProps:"all"}, 0.12);
					TweenMax.staggerTo($(element).not(emergenceIgnore).children().not(emergenceIgnore).not(anim).children(), 1, {autoAlpha: 1, ease: Power4.easeOut, overwrite: "false", clearProps:"all"}, 0.12);

					

				}

				animSceneController();


				/* -------------------------------------------------- */
				/* ACTIVATE
				/* -------------------------------------------------- */

				$(element).find(".anim").removeClass("anim-pause").addClass("anim-play");


				/* -------------------------------------------------- */
				/* VIDEO
				/* -------------------------------------------------- */

				$(element).find(".ui-play-pause.anim-play").on("click", function(e) {
					e.preventDefault();
					//console.log("Clicked");

					var self = $(this);

					$("video.anim-play").each(function(index) {

						var self = $(this)[0];

						if (self.paused) {

							//console.log( index + " is paused.");
							self.play();
							$(element).find(".ui-play-pause.anim-play").addClass("is-active");

						} else { 

							//console.log( index + " is playing.");
							self.pause();
							$(element).find(".ui-play-pause.anim-play").removeClass("is-active");

						}

					});


				});


				if ($hasTouch && $isMobile) {

					$("video.anim-play").each(function(index) {

						//console.log( index + " is playing.");

						var self = $(this)[0];
						self.play();

					});

				}





			/* -------------------------------------------------- */
			/* INVISIBLE
			/* -------------------------------------------------- */

			} else if ( state === "reset" ) {

				//console.log("Element is hidden.");

				/* -------------------------------------------------- */
				/* DEACTIVATE
				/* -------------------------------------------------- */

				$(element).find(".anim").addClass("anim-pause").removeClass("anim-play");


				/* -------------------------------------------------- */
				/* VIDEO
				/* -------------------------------------------------- */

				$(element).find(".ui-play-pause").removeClass("is-active");

				$("video.anim-pause").each(function(index) {

					var self = $(this)[0];
					self.pause();

				}); 





			/* -------------------------------------------------- */
			/* NO RESET
			/* -------------------------------------------------- */

			} else if ( state === "noreset" ) {

				//console.log("Element is hidden with no reset.");

			}

	  }

	});

	
	/* -------------------------------------------------- */
	/* INIT
	/* -------------------------------------------------- */

	emergence.engage();
	//emergenceReset();
	//emergence.disengage();

}; // END utilEmergence


/* -------------------------------------------------- */
/* PAGE VISIBILITY
/* -------------------------------------------------- */

var utilPageVisibility = function() {
	"use strict";
	
	/* -------------------------------------------------- */
	/* CACHE SELECTORS
	/* -------------------------------------------------- */

	var pageVisibility = $(".page-visibility"),
		pageVisibilityIgnore = $(".page-visibility-ignore");


	// VARS
	var page = new Visibility({
		onHidden: isPageHidden,
		onVisible: isPageVisible
	});


	/* -------------------------------------------------- */
	/* FUNCTIONS
	/* -------------------------------------------------- */

	function isPageHidden () {
		//console.log("Page is inactive.");

		animCore();

		TweenMax.set(pageVisibility.not(pageVisibilityIgnore), {opacity: 0});

		//$$("[data-emergence]").find(".anim").not(animInteract).addClass("anim-pause").removeClass("anim-play");

	}


	function isPageVisible () {
		//console.log("Page is active");

		animCore();

		TweenMax.staggerTo(pageVisibility.not(pageVisibilityIgnore), 0.25, {opacity: 1, ease: Power2.easeInOut}, 0.12);

		//$$("[data-emergence]").find(".anim").not(animInteract).removeClass("anim-pause").addClass("anim-play");

	}

}; // END utilPageVisibility


/* -------------------------------------------------- */
/* PRINT
/* -------------------------------------------------- */

var utilPrint = function() {
	"use strict";
	
	/* -------------------------------------------------- */
	/* CACHE SELECTORS
	/* -------------------------------------------------- */

	var print = $(".print");
	
	
	/* -------------------------------------------------- */
	/* FUNCTIONS
	/* -------------------------------------------------- */

    print.click(function() {

        $$(window).print({
            addGlobalStyles : false,
            mediaPrint: false,
            stylesheet : null,
            rejectWindow : true,
            noPrintSelector : ".no-print",
            iframe : true,
            append : null,
            prepend : "<div class='display-block position-absolute left p4 font-header text-primary' style='top: 1em;'>Company</div> <div class='display-block position-absolute right p10 font-paragraph text-dark-grey' style='top: 2em;'>Last Updated: 005.31.18</div>"
        });

    });

}; // END utilPrint
