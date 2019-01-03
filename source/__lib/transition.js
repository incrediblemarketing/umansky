/* -------------------------------------------------- */
/* SET-UP
/* -------------------------------------------------- */

/*
$(function() {
	$(main).smoothState({
		debug: true,
		anchors: "a",
		hrefRegex: "",
		forms: "",
		allowFormCaching: false,
		repeatDelay: 500,
		prefetch: false,
		prefetchOn: "mouseover touchstart",
		locationHeader: "X-SmoothState-Location",
		cacheLength: 0,
		loadingClass: "is-loading",
		scroll: true,
	});
});
*/

/*
$('a.logo').click(function(e){
	e.preventDefault();
	var content  = $('#content').smoothState().data('smoothState');
	var href = $(this).attr('href');
	content.load(href);
});
*/

/* -------------------------------------------------- */
/* METHODS
/* -------------------------------------------------- */

// Access smoothState
//var smoothState = $(main).smoothState().data("page");

// Run method
//smoothState.load("index.html");

/* -------------------------------------------------- */
/* TRANSITIONS
/* -------------------------------------------------- */

$(function() {
	"use strict";
	
	//console.log("Smooth State initated.");
		
	var $page = $("#container"),
		options = {
					debug: false,
					//anchors: "a",
					//hrefRegex: "",
					//forms: "",
					//allowFormCaching: false,
					//repeatDelay: 500,
					prefetch: false,
					prefetchOn: "mouseover touchstart",
					//locationHeader: "X-SmoothState-Location",
					cacheLength: 2,
					//loadingClass: "is-loading",
					//scroll: true,

			
					onBefore: function ($currentTarget, $container) {
						console.log("onBefore");
					},
			
					onStart: {
						
						// How long this animation takes.
						duration: 1000,
						// A function that dictates the animations that take place.
						render: function ($container) {
							console.log("onStart");
							//showPreloader();
							TweenMax.to($container, 1, {opacity: 0, ease: Expo.easeOut, onComplete: disableContent});
						}
						
					},

					onProgress: {
						
						// How long this animation takes.
						duration: 1000,
						// A function that dictates the animations that take place.
						render: function ($container) {
							console.log("onProgress");
						}
						
					},

					onReady: {
						
						// How long this animation takes.
						duration: 1000,
						// '$newContent' is a 'jQuery Object' of the HTML that should replace the existing container's HTML.
						render: function ($container, $newContent) {
							
							console.log("onReady");
							$container.html($newContent);
							
						}
						
					},

					onAfter: function ($container) {

						// A function that dictates the animations that take place.
						console.log("onAfter");
						pageInit();
						TweenMax.to($container, 2, {opacity: 1, ease: Expo.easeOut, onComplete: enableContent});

					}
		
		},
		smoothState = $page.smoothState(options).data("smoothState");

});

/* -------------------------------------------------- */
/* CALLBACKS
/* -------------------------------------------------- */
