/* -------------------------------------------------- */
/* FEATURE DETECTION (MODERNIZR)
/* -------------------------------------------------- */

/*
var hasBackdropFilter = Modernizr.backdropfilter,
	hasCSSFilters = Modernizr.cssfilters,
	hasCSSGrid = Modernizr.cssgrid,
	hasCSSGridLegacy = Modernizr.cssgridlegacy,
	hasCSSPointerEvents = Modernizr.csspointerevents,
	hasCSSvhUnit = Modernizr.cssvhunit,
	hasCSSvmaxUnit = Modernizr.cssvmaxunit,
	hasCSSvminUnit = Modernizr.cssvminunit,
	hasCSSvwUnit = Modernizr.cssvwunit,
	hasForceTouch = Modernizr.forcetouch,
	hasFullscreen = Modernizr.fullscreen,
	hasHover = Modernizr.hovermq,
	hasJPEG2000 = Modernizr.jpeg2000,
	hasJPEGXR = Modernizr.jpegxr,
	hasDeviceMotion = Modernizr.devicemotion,
	hasDeviceOrientation = Modernizr.deviceorientation,
	hasObjectFit = Modernizr.objectfit,
	hasPassiveEventListeners = Modernizr.passiveeventlisteners,
	hasPicture = Modernizr.picture,
	hasPointerEvents = Modernizr.pointerevents,
	hasPointerMQ = Modernizr.pointermq,
	hasScrollSnapPoints = Modernizr.scrollsnappoints,
	hasSMIL = Modernizr.smil,
	hasSRCSizes = Modernizr.sizes,
	hasSRCSet = Modernizr.srcset,
	hasTouch = Modernizr.touchevents,
	hasWebP = Modernizr.webp,
	hasWillChange = Modernizr.willchange;
*/

var $hasTouch = "ontouchstart" in document.documentElement || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
	//$hasTouch = Modernizr.touchevents; // Unreliable. Use above method instead.


/* -------------------------------------------------- */
/* CACHE SELECTORS
/* -------------------------------------------------- */

var isiOS = $(".is-ios"),
	isAndroid = $(".is-android"),
	isMobile = $(".is-mobile"),
	//isTablet = $(".is-tablet"),
	isDesktop = $(".is-desktop");


/* -------------------------------------------------- */
/* SCREEN / DEVICE
/* -------------------------------------------------- */

var $isMobileScreen = Modernizr.mq("(max-width: 667px)"),
	$isTabletScreen = Modernizr.mq("(max-width: 768px)"),
	$isLaptopScreen = Modernizr.mq("(max-width: 1024px)"),
	$isDesktopScreen = Modernizr.mq("(max-width: 1920px)"),
	
	$isAndroid = navigator.userAgent.toLowerCase().indexOf("android") > -1,
	$isiPhone = navigator.userAgent.toLowerCase().indexOf("iphone") > -1,
	$isiPad = navigator.userAgent.toLowerCase().indexOf("ipad") > -1,
	$isiPod = navigator.userAgent.toLowerCase().indexOf("ipod") > -1,
	
	$isMobile = $isAndroid || $isiPhone || $isiPad || $isiPod,
	
	$isPortrait = window.innerWidth < window.innerHeight,
	$isLandscape = window.innerWidth > window.innerHeight,
	
	//$orientationPortrait = $isMobile && orientation === 0,
	//$orientationLandscape = $isMobile && orientation === 90,
	
	$isDesktop = !$isMobile,
	$isTouchScreen = $hasTouch && isDesktop; // Detects any touch-enabled device that is not a mobile device.


/* -------------------------------------------------- */
/* DEVICES
/* -------------------------------------------------- */

	/* -------------------------------------------------- */
	/* MOBILE SCREEN (SMALL)
	/* -------------------------------------------------- */

	if ( $isMobileScreen ) {
		
		console.log("Viewing on MOBILE (SMALL) screen: " + $$(window).width() + "px" );

	}


	/* -------------------------------------------------- */
	/* TABLET SCREEN (MEDIUM)
	/* -------------------------------------------------- */

	if ( $isTabletScreen ) {
		
		console.log("Viewing on TABLET (MEDIUM) screen: " + $$(window).width() + "px" );

	}


	/* -------------------------------------------------- */
	/* LAPTOP (LARGE)
	/* -------------------------------------------------- */

	if ( $isLaptopScreen ) {
		
		console.log("Viewing on LAPTOP (LARGE) screen: " + $$(window).width() + "px" );

	}


	/* -------------------------------------------------- */
	/* DESKTOP (EXTRA LARGE)
	/* -------------------------------------------------- */

	if ( $isDesktopScreen ) {
		
		console.log("Viewing on a DESKTOP (X-LARGE) screen: " + $$(window).width() + "px" );

	}


	/* -------------------------------------------------- */
	/* ANDROID
	/* -------------------------------------------------- */

	if ( $isAndroid ) {
		
		console.log("Android device detected.");
		
		isiOS.addClass("hide");
		isDesktop.addClass("hide");

	}


	/* -------------------------------------------------- */
	/* APPLE
	/* -------------------------------------------------- */

	if ( $isiPhone || $isiPad || $isiPod ) {
		
		console.log("iOS device detected.");
		
		isAndroid.addClass("hide");
		isDesktop.addClass("hide");
		
	}


	/* -------------------------------------------------- */
	/* MOBILE
	/* -------------------------------------------------- */

	if ( $isMobile ) {
		
		console.log("Viewing on mobile device.");
		
		isDesktop.addClass("hide");
		
	} else {
		
		isMobile.addClass("hide");
		
	}


	/* -------------------------------------------------- */
	/* DESKTOP
	/* -------------------------------------------------- */

	if ( $isDesktop ) {
		
		console.log("Viewing on desktop / laptop.");
		
		isMobile.addClass("hide");
		
	} else {
		
		isDesktop.addClass("hide");
		
	}


/* -------------------------------------------------- */
/* DETECT TOUCH
/* -------------------------------------------------- */

var hasTouch = function() {

	if ( $hasTouch ) {
		
		console.log("This device is touch enabled and will disable all :hover states.");

		try {

			// Prevent exception on browsers not supporting DOM 'styleSheet' properly.
			for (var si in document.styleSheets) {
				var styleSheet = document.styleSheets[si];
				if (!styleSheet.rules) continue;

				for (var ri = styleSheet.rules.length - 1; ri >= 0; ri--) {
					if (!styleSheet.rules[ri].selectorText) continue;
					if (styleSheet.rules[ri].selectorText.match(":hover")) {
						
						styleSheet.deleteRule(ri);

					}
				}
			}

		}

		catch (ex) {

		}

	}

};


/* -------------------------------------------------- */
/* BROWSER
/* -------------------------------------------------- */

var browserDetect = {

	init: function() {
		"use strict";

		this.browser = this.searchString(this.dataBrowser) || "Other";
		this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "Unknown";
	},

	searchString: function(data) {
		"use strict";

		for (var i = 0; i < data.length; i++) {
			var dataString = data[i].string;
			this.versionSearchString = data[i].subString;

			if (dataString.indexOf(data[i].subString) !== -1) {
				return data[i].identity;
			}
		}
	},

	searchVersion: function(dataString) {
		"use strict";

		var index = dataString.indexOf(this.versionSearchString);
		if (index === -1) {
			return;
		}

		var rv = dataString.indexOf("rv:");
		if (this.versionSearchString === "Trident" && rv !== -1) {
			return parseFloat(dataString.substring(rv + 3));
		} else {
			return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
		}
	},

	dataBrowser: [{
			string: navigator.userAgent,
			subString: "Edge",
			identity: "MS Edge"
		}, {
			string: navigator.userAgent,
			subString: "MSIE",
			identity: "Explorer"
		}, {
			string: navigator.userAgent,
			subString: "Trident",
			identity: "Explorer"
		}, {
			string: navigator.userAgent,
			subString: "Firefox",
			identity: "Firefox"
		}, {
			string: navigator.userAgent,
			subString: "Opera",
			identity: "Opera"
		}, {
			string: navigator.userAgent,
			subString: "OPR",
			identity: "Opera"
		},

		{
			string: navigator.userAgent,
			subString: "Chrome",
			identity: "Chrome"
		}, {
			string: navigator.userAgent,
			subString: "Safari",
			identity: "Safari"
		}
	]
	
};

browserDetect.init();

var $isChrome = browserDetect.browser === "Chrome",
	$isExplorer = browserDetect.browser === "Explorer",
	$isEdge = browserDetect.browser === "MS Edge",
	$isFirefox = browserDetect.browser === "Fireforx",
	$isOpera = browserDetect.browser === "Opera",
	$isSafari = browserDetect.browser === "Safari";

console.log("You are using " + browserDetect.browser + " with version " + browserDetect.version);


/* -------------------------------------------------- */
/* CHROME
/* -------------------------------------------------- */

if ( $isChrome ) {

}


/* -------------------------------------------------- */
/* EDGE / EXPLORER
/* -------------------------------------------------- */

if ( $isEdge || $isExplorer ) {

	// Create elements for IE (8 and earlier), cause IE sucks.
	/*
	document.createElement("header");
	document.createElement("nav");
	document.createElement("main");
	document.createElement("footer");
	document.createElement("section");
	document.createElement("article");
	document.createElement("figure");
	document.createElement("figcaption");
	document.createElement("aside");
	*/

}


/* -------------------------------------------------- */
/* EXPLORER
/* -------------------------------------------------- */

if ( $isExplorer ) {

}


/* -------------------------------------------------- */
/* FIREFOX
/* -------------------------------------------------- */

if ( $isFirefox ) {

}


/* -------------------------------------------------- */
/* OPERA
/* -------------------------------------------------- */

if ( $isOpera ) {

}


/* -------------------------------------------------- */
/* SAFARI
/* -------------------------------------------------- */

if ( $isSafari ) {

}
