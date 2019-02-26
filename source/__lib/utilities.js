/* -------------------------------------------------- */
/* LAZY LOAD / INTERSECTION OBSERVER
/* -------------------------------------------------- */

var assetObserver = function assetObserver() {

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
		
			
		};

		
		var lazySet = function(element) {


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

var dataHelpers = function dataHelpers() {
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

var reveal = function reveal() {

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

var pageVisibility = function pageVisibility() {
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

var print = function print() {
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
