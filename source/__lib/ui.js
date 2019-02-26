/* -------------------------------------------------- */
/* INIT
/* -------------------------------------------------- */

var uiInit = function() {
	"use strict";
	//console.log("Initializing core UI...);
	
	/* -------------------------------------------------- */
	/* CACHE SELECTORS
	/* -------------------------------------------------- */		

	var zIndexStackOrder = $(".stack-order-auto");


	/* -------------------------------------------------- */
	/* Z-INDEX / STACK ORDER
	/* -------------------------------------------------- */

	var $zIndexNum = 1;

	zIndexStackOrder.children().not(".stack-order-ignore").each(function(index) {

		var self = $(this);

		self.css({"z-index" : $zIndexNum + index,
				  "position" : "relative"});

	});

}; // END uiInit


/* -------------------------------------------------- */
/* NAV PANEL
/* -------------------------------------------------- */

var uiNavPanel = function() {

	/* -------------------------------------------------- */
	/* CACHE SELECTORS
	/* -------------------------------------------------- */

	var navPaneltoggle = $(".nav-panel-toggle"),
		menuMain = $(".menu-main"),
		navPanelIsOpen = false;


	/* -------------------------------------------------- */
	/* ANIMATION
	/* -------------------------------------------------- */

	
	var tlNavPanel = new TimelineMax({paused: true});
		tlNavPanel.staggerFrom( navPanel.find(".background").children(), 1, {autoAlpha: 0, scaleX: 0, transformOrigin: "left center", ease: Expo.easeInOut,
																				onStart: function() {

																					$$(".ui-menu").addClass("no-pointer");

																					navPanel.css({ "display" : "block" });
																					menuMain.addClass("no-pointer");

																					lock();

																				},
																				onComplete: function() {

																					navPanelIsOpen = true;

																					$$(".ui-menu").addClass("is-active");
																					$$(".ui-menu").removeClass("no-pointer");
																					menuMain.removeClass("no-pointer");

																					menuMain.flickity("resize");

																					lock();

																				},
																				onReverseComplete: function() {

																					navPanelIsOpen = false;

																					$$(".ui-menu").removeClass("is-active");
																					navPanel.find(".menu-flickity").addClass("no-pointer");
																					navPanel.css({ "display" : "none" });

																					unlock();

																				}
																			}, 0.05)

				 .to( navbar.find(".logo"), 1, {autoAlpha: 0, ease: Expo.easeOut }, "-=1")
				 .staggerFrom( navPanel.find(".content-left").children(), 1, {autoAlpha: 0, ease: Expo.easeOut }, 0.12, "-=0.5")
				 .from( menuMain, 1, {autoAlpha: 0, ease: Expo.easeOut }, "-=1")
				 .staggerFrom( menuMain.children(), 0.5, {autoAlpha: 0, x: '-5%', ease: Expo.easeInOut }, 0.12, "-=0.75")
				 .from( navPanel.find("#canvas"), 1, {autoAlpha: 0, ease: Expo.easeOut }, "-=0");


	/* -------------------------------------------------- */
	/* TOGGLE
	/* -------------------------------------------------- */

	navPaneltoggle.on("click", function(e) {
		e.preventDefault();

		var self = $(this);

		if ( !self.hasClass("is-active") ) {

			tlNavPanel.timeScale(1).play();

		} else {

			tlNavPanel.timeScale(1.5).reverse();

			return false;

		}

	});


	/* -------------------------------------------------- */
	/* LINKS
	/* -------------------------------------------------- */

	menuMain.find(".item a").on("click", function() {

		var self = $(this);

		tlNavPanel.timeScale(1.5).reverse();
		menuMain.addClass("no-pointer");

	}).on("mouseover touchstart", function() {

		//TweenMax.to( $$("#canvas"), 0.5, {autoAlpha: 0.5, ease: Expo.easeOut});

	}).on("mouseout touchend", function() {

		//TweenMax.to( $$("#canvas"), 0.5, {autoAlpha: 1, ease: Expo.easeOut});

	});


	/* -------------------------------------------------- */
	/* MENU
	/* -------------------------------------------------- */

	// INIT
	$$(".menu-main").flickity({cellSelector: ".item",
							 initialIndex: 0,
							 accessibility: true,
							 setGallerySize: true,
							 resize: true,
							 cellAlign: "left",
							 contain: false,
							 imagesLoaded: true,
							 percentPosition: true,
							 rightToLeft: false,
							 draggable: true,
							 freeScroll: false,
							 wrapAround: false,
							 groupCells: false,
							 autoPlay: false,
							 pauseAutoPlayOnHover: true,
							 adaptiveHeight: false,
							 watchCSS: false,
							 dragThreshold: 10,
							 selectedAttraction: 0.2,
							 friction: 0.8,
							 freeScrollFriction: 0.03,
							 prevNextButtons: false,
							 pageDots: false,
							 lazyLoad: 2,
							 bgLazyLoad: 1 });


	// CHECK LAST SLIDE
	menuMain.on( "settle.flickity", function() {

		if ( menuMain.find(".item").length - 1 ) {

			//console.log('End of menu.')
			//menu.removeClass("fade-right").addClass("fade-left")

		}

		if ( menuMain.selectedIndex = 0 ) {

			//console.log('Start of menu.')
			//menu.addClass("fade-right").removeClass("fade-left")

		}

	});


	// DRAG EVENTS
	menuMain.on("dragStart.flickity", function( event, pointer ) {

		$$(this).find(".item").addClass("no-pointer");

		document.ontouchmove = function (e) {
			e.preventDefault();
		}

	}).on("dragEnd.flickity", function( event, pointer ) {

		$$(this).find(".item").removeClass("no-pointer");

		document.ontouchmove = function (e) {
			return true;
		}

	});


	// PREVENT CLICK
	menuMain.on("staticClick", function( event, pointer, cellElement, cellIndex ) {

		console.log("is click");

		// Dismiss if cell was not clicked.
		if ( !cellElement ) {

			return;

		}

		// Change cell background with .is-clicked.
		//$carousel.find('.is-clicked').removeClass('is-clicked');

		//$( cellElement ).addClass('is-clicked');

		console.log( 'Cell ' + ( cellIndex + 1 )  + ' clicked' );

	});

}; // END uiNavPanel


/* -------------------------------------------------- */
/* UI NAV
/* -------------------------------------------------- */

var uiLinkDelegation = function() {
	"use strict";
	//console.log("Initializing uiLinkDelegation...");
	
	/* -------------------------------------------------- */
	/* CACHE SELECTORS
	/* -------------------------------------------------- */
	
	var	navPreviousPage = $(".previous-page"),
		preventDefault = $(".prevent-default"),
		stopProp = $(".stop-prop"),
		navLink = $("a").not("[target='_blank']")
						.not("[href='#']")
						.not(".scroll-to[href='#top']")
						.not("[data-content-selector]")
						.not(preventDefault)
						.not(navPreviousPage);
	
	
	/* -------------------------------------------------- */
	/* HELPERS
	/* -------------------------------------------------- */

	preventDefault.on("click", function(e) {
		//"use strict";
		e.preventDefault();
	});
	
	
	stopProp.on("click", function(e) {
		//"use strict";
		e.stopPropagation();
	});
	
	
	/* -------------------------------------------------- */
	/* GET LINK
	/* -------------------------------------------------- */

	//navLink.attr("data-toggle", ''+navPanelString.substring(1)+'');

	navLink.on("click", function(e) {
		//"use strict";
		//console.log("Initializing uiLinkDelegation.");
		e.preventDefault();

		var self = $(this),
			$href = self.attr("href");


		var getLink = function() {
			//console.log($href);
			window.location = $href;
		};


		getLink();

		return false;

	});


	/* -------------------------------------------------- */
	/* GET PREVIOUS PAGE (BACK)
	/* -------------------------------------------------- */

	navPreviousPage.on("click", function(e) {
		//"use strict";
		e.preventDefault();

		var getPreviousPage = function() {

			parent.history.back();

		};


		getPreviousPage();

		return false;

	});

}; // END uiLinkDelegation


/* -------------------------------------------------- */
/* SCROLL EVENTS
/* -------------------------------------------------- */

var uiScrollEvents = function() {
    "use strict";
	//console.log("Initializing uiScrollEvents...");


	/* -------------------------------------------------- */
	/* CACHE SELECTORS
	/* -------------------------------------------------- */

	var scrollTrack = $(".scroll-track");


	/* -------------------------------------------------- */
	/* HEADROOM
	/* -------------------------------------------------- */
	
    navbar.headroom({
	
		/* -------------------------------------------------- */
		/* SET-UP
		/* -------------------------------------------------- */

		scroller: window, // Element to listen to scroll events on, defaults to 'window'.
		offset: $$("section").height(), // Vertical offset in px before element is first unpinned.
		tolerance: { // Or you can specify tolerance individually for up / down scroll.
			up: $stickyScrollToleranceUp,
			down: $stickyScrollToleranceDown
		},

		
		/* -------------------------------------------------- */
		/* CLASSES
		/* -------------------------------------------------- */

		classes: {
			initial: "is-ready", // Element is initialised.
			pinned: "is-scrolling-up", // When scrolling up.
			unpinned: "is-scrolling-down", // When scrolling down.
			top: "is-top", // When above offset.
			notTop: "is-not-top", // When below offset.
			bottom: "is-bottom", // When at bottom of scoll area.
			notBottom: "is-not-bottom" // when not at bottom of scroll area.
		},

		
		/* -------------------------------------------------- */
		/* DETECTION
		/* -------------------------------------------------- */

		onPin: function() { // Callback when scrolling up.
			console.log("Scrolling up.");

			navbar.addClass("is-scrolling-up");
		},


		onUnpin: function() { // Callback when scrolling down.
			console.log("Scrolling down.");

			navbar.addClass("is-scrolling-down");
			navPanel.addClass("is-scrolling-down");
		},


		onTop: function() { // Callback when above offset.
			console.log("At top of page.");

			navbar.addClass("is-top");
			scrollTrack.removeClass("is-not-top");
		},


		onNotTop: function() { // Callback when below offset.
			console.log("Away from top of page.");

			navbar.addClass("is-not-top");
			scrollTrack.addClass("is-not-top");
			
		},


		onBottom: function() { // Callback when at bottom of page.
			console.log("At bottom of page.");

			navbar.addClass("is-bottom");
		},


		onNotBottom: function() { // Callback when moving away from bottom of page.
            console.log("Away from bottom of page.");

            navbar.addClass("is-not-bottom");
		}
	
	}); 
    
    
}; // END uiScrollEvents


/* -------------------------------------------------- */
/* SMOOTH SCROLL
/* -------------------------------------------------- */

var uiScrollTo = function() {
	"use strict";
	//console.log("Initializing uiSmoothScroll...");


	/* -------------------------------------------------- */
	/* CACHE SELECTORS
	/* -------------------------------------------------- */	
	
	var	scrollTo = $(".scroll-to"),
		scrollToTop = $(".scroll-to[href='#top']");	

	
	/* -------------------------------------------------- */
	/* SCROLL TO TOP
	/* -------------------------------------------------- */
	
	scrollToTop.click(function(e) {
		e.preventDefault();
		
		$(html, body).animate({ scrollTop: 0 }, 800, "easeInOutExpo");

		return false;

	});


	/* -------------------------------------------------- */
	/* HASH CHECK
	/* -------------------------------------------------- */
	
	var $hash = getHash(location.hash);

	window.scrollTo(0, 0);
	
	function getHash(h) {
		
		if (h !== "") {
			
			h = h.split("?");
			h = h[0];
			
		} else {
			
			h = false;
			
		} 
		
		return h;
	}


	/* -------------------------------------------------- */
	/* HASH
	/* -------------------------------------------------- */

	var checkHash = function() {
		//"use strict";

		var $hash = $(window.location.hash);
		window.opener = null;

		if ( location.hash ) {

			//console.log($hash);
			//location.hash = $currentAnchorLink;

			if ( main.find($hash).length ) {

				$(html, body).animate({ scrollTop: $hash.offset().top }, 800, "easeInOutExpo");

			} else if ( !main.find($hash).length ) {

				console.log("Error: Section does not exist");

				location.hash = "#";
				window.opener = null;

				return false;

			}
			

		}

	}; //checkHash();
	

	TweenMax.delayedCall($delayInterval, checkHash);

}; // END uiScrollTo


/* -------------------------------------------------- */
/* SCROLL TRACK
/* -------------------------------------------------- */

var uiScrollTrack = function() {

	var $windowScrollTop = $(window).scrollTop() + 90;

	var currentSection = $("section").filter(function() {

		return $windowScrollTop <= $(this).offset().top + $(this).height();

	});


	$$(".accordion-item").find("a").removeClass("is-active");
	$$(".accordion-item").find("a[href=\\#" + currentSection.attr("id") + "]").addClass("is-active");


	/*
	if ( $$(".accordion-item").find("a").hasClass("is-active") ) {

		console.log( "has class" );

	} else {

		console.log( "does not has class" );

	}
	*/

	//$$(".accordion").find("a").removeClass("is-active");
	//$$(".accordion").find("a[href=\\#" + currentSection.attr("id") + "]").addClass("is-active");


	if ( $$(window).scrollTop() > 100 ) {

		// Add sticky classes.

	} else if ( $$(window).scrollTop() < 100 ) {

		// Remove sticky classes.

	}

}; // END uiScrollTrack


$$(mainScrollContent).on("scrollstop", { latency: $updateInterval }, uiScrollTrack);


/* -------------------------------------------------- */
/* STICKY
/* -------------------------------------------------- */

var uiSticky = function() {

	$$(".sticky").stick_in_parent({

		//parent: null,
		inner_scrolling: true,
		sticky_class: "is-stuck",
		offset_top: 0,
		//spacer: null,
		bottoming: true,
		//recalc_every: null

	});

}; // END uiSticky


/* -------------------------------------------------- */
/* UI BUTTONS
/* -------------------------------------------------- */

var uiButtons = function() {
	"use strict";
	//console.log("Initializing uButtons...");
	
	/* -------------------------------------------------- */
	/* CACHE SELECTORS
	/* -------------------------------------------------- */
	
	var	button = $(".button"),

		/*
		buttonWavesDarkGrey = $(".button.background-dark-grey"),
		buttonWavesCharcoal = $(".button.background-charcoal"),
		buttonWavesBlack = $(".button.background-black"),

		buttonWavesPrimary = $(".button.background-primary"),
		buttonWavesSecondary = $(".button.background-secondary"),
		buttonWavesAccent = $(".button.background-accent"),
		buttonWavesLightgrey = $(".button.background-light-grey"),
		buttonWavesWhite = $(".button.background-white"),

		buttonWavesDefault = $(".button.button-fx-waves-button"),
		buttonWavesCircle = $(".button.button-fx-waves-circle"),
		buttonWavesLight = $(".button.button-fx-waves-light"),
		buttonWavesFloat = $(".button.button-fx-float"),
		buttonWavesBlock = $(".button.button-fx-waves-block"),
		*/

		buttonNoTouchFeedback = $(".no-touch-feedback"),
		buttonNoWaves = $(".no-waves");
	
	
	/* -------------------------------------------------- */
	/* BUTTONS / TOUCH FEEDBACK
	/* -------------------------------------------------- */
	
	if ( $hasTouch ) {

		TweenMax.set(button.not(buttonNoTouchFeedback), {className: "+=box-shadow-xs"});

		button.not(buttonNoTouchFeedback).on("touchstart", function() {
		
			var self = $(this);

			TweenMax.to(self, 0.5, {x: 1, y: 1, scale: 0.95, className: "-=box-shadow-xs", ease: Expo.easeInOut});
		
		}).on("touchend touchleave touchmove", function() {
		
			var self = $(this);
			
			TweenMax.to(self, 0.5, {x: 1, y: 1, scale: 1, className: "+=box-shadow-xs", ease: Expo.easeOut});
			
		});
		
	}
	
	
	/* -------------------------------------------------- */
	/* WAVES
	/* -------------------------------------------------- */
		
	var options = {
		// How long Waves effect duration 
		// when it's clicked (in milliseconds)
		duration: 600,

		// Delay showing Waves effect on touch
		// and hide the effect if user scrolls
		// (0 to disable delay) (in milliseconds)
		delay: 100
	};
   
	
	//button.addClass("overflow-hidden");


	//Waves.attach(navbarToggle, ["waves-block", "waves-light"]);
	//Waves.attach(navPanelToggle, ["waves-block", "waves-light"]);
	//Waves.attach(navToggleLabel, ["waves-block", "waves-light"]);
	Waves.attach($$(".scroll-to").not(buttonNoWaves), ["waves-block", "waves-light"]);
	Waves.attach(button.not(buttonNoWaves), ["waves-block", "waves-light"]);

	/*
	Waves.attach(buttonWavesDarkGrey, ["waves-light"]);
	Waves.attach(buttonWavesCharcoal, ["waves-light"]);
	Waves.attach(buttonWavesBlack, ["waves-light"]);

	Waves.attach(buttonWavesPrimary, ["waves-button"]);
	Waves.attach(buttonWavesSecondary, ["waves-button"]);
	Waves.attach(buttonWavesAccent, ["waves-button"]);
	Waves.attach(buttonWavesLightgrey, ["waves-button"]);
	Waves.attach(buttonWavesWhite, ["waves-button"]);


	Waves.attach(buttonWavesDefault, ["waves-button"]);
	Waves.attach(buttonWavesCircle, ["waves-circle"]);
	Waves.attach(buttonWavesLight, ["waves-light"]);
	Waves.attach(buttonWavesFloat, ["waves-float"]);
	Waves.attach(buttonWavesBlock, ["waves-block"]);
	*/

	Waves.init(options);
	
	// Remove '.waves-effect' if element has '.no-waves' class.
	//buttonNoWaves.removeClass("waves-effect");

}; // END uiButtons
