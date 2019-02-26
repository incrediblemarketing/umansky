/* -------------------------------------------------- */
/* FEATURE DETECTION
/* -------------------------------------------------- */

/*
var hasAttrDownload = Modernizr.adownload,
	hasBackdropFilter = Modernizr.backdropfilter,
	hasBackgroundClipText = Modernizr.backgroundcliptext,
	hasCookies = Modernizr.cookies,
	hasCSSPointerEvents = Modernizr.csspointerevents,
	hasCSSFilters = Modernizr.cssfilters,
	hasCSSGradients = Modernizr.cssgradients,
	hasCSSVHUnit = Modernizr.cssvhunit,
	hasCSSVMaxUnit = Modernizr.cssvmaxunit,
	hasCSSVMinUnit = Modernizr.cssvminunit,
	hasCSSVWUnit = Modernizr.cssvwunit,
	hasDeviceMotion = Modernizr.devicemotion,
	hasDeviceOrientation = Modernizr.deviceorientation,
	hasFontLigatures = Modernizr.ligatures,
	hasForceTouch = Modernizr.forcetouch,
	hasFullscreen = Modernizr.fullscreen,
	hasHover = Modernizr.hovermq,
	hasJPEG2000 = Modernizr.jpeg2000,
	hasJPEGXR = Modernizr.jpegxr,
	hasMatchMedia = Modernizr.matchmedia,
	hasObjectFit = Modernizr.objectfit,
	hasPassiveEventListeners = Modernizr.passiveeventlisteners,
	hasPicture = Modernizr.picture,
	hasPointer = Modernizr.pointermq,
	hasPointerEvents = Modernizr.pointerevents,
	hasPointerLock = Modernizr.pointerlock,
	hasSRCSizes = Modernizr.sizes,
	hasSRCSet = Modernizr.srcset,
	hasSVGFilters = Modernizr.svgfilters,
	hasTouch = Modernizr.touchevents,
	hasVideoOgg = Modernizr.video.ogg,
	hasVideoWebm = Modernizr.video.webm,
	hasWebP = Modernizr.webp,
	hasWillChange = Modernizr.willchange;
*/


/* -------------------------------------------------- */
/* TOUCH
/* -------------------------------------------------- */

var $hasTouch = "ontouchstart" in document.documentElement || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;


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


/* -------------------------------------------------- */
/* DEVICE
/* -------------------------------------------------- */

var $isAndroid = navigator.userAgent.toLowerCase().indexOf("android") > -1,
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
/* SCREEN
/* -------------------------------------------------- */

var $isMobileScreen = Modernizr.mq("(max-width: 667px)"),
	$isTabletScreen = Modernizr.mq("(max-width: 768px)"),
	$isLaptopScreen = Modernizr.mq("(max-width: 1024px)"),
	$isDesktopScreen = Modernizr.mq("(max-width: 1920px)");


/* -------------------------------------------------- */
/* CACHE SELECTORS
/* -------------------------------------------------- */

var isiOS = $(".is-ios"),
	isAndroid = $(".is-android"),
	isMobile = $(".is-mobile"),
	//isTablet = $(".is-tablet"),
	isDesktop = $(".is-desktop");


/* -------------------------------------------------- */
/* TOUCH
/* -------------------------------------------------- */

var hasTouch = function hasTouch() {

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

//removeIf(production)
var detectBrowser = function detectBrowser() {

	console.log("You are using " + browserDetect.browser + " with version " + browserDetect.version);


	/* -------------------------------------------------- */
	/* CHROME
	/* -------------------------------------------------- */

	if ( $isChrome ) {

	} else {

		return false;

	}


	/* -------------------------------------------------- */
	/* EDGE / EXPLORER
	/* -------------------------------------------------- */

	if ( $isEdge || $isExplorer ) {

	} else {

		return false;

	}


	/* -------------------------------------------------- */
	/* EXPLORER
	/* -------------------------------------------------- */

	if ( $isExplorer ) {

	} else {

		return false;

	}


	/* -------------------------------------------------- */
	/* FIREFOX
	/* -------------------------------------------------- */

	if ( $isFirefox ) {

	} else {

		return false;

	}


	/* -------------------------------------------------- */
	/* OPERA
	/* -------------------------------------------------- */

	if ( $isOpera ) {

	} else {

		return false;

	}


	/* -------------------------------------------------- */
	/* SAFARI
	/* -------------------------------------------------- */

	if ( $isSafari ) {

	} else {

		return false;

	}

}
//endRemoveIf(production)


/* -------------------------------------------------- */
/* DEVICE
/* -------------------------------------------------- */

//removeIf(production)
var detectDevice = function detectDevice() {

	/* -------------------------------------------------- */
	/* ANDROID
	/* -------------------------------------------------- */

	if ( $isAndroid ) {
		
		console.log("Android device detected.");
		
		isiOS.addClass("hide");
		isDesktop.addClass("hide");

	} else {

		return false;

	}


	/* -------------------------------------------------- */
	/* APPLE
	/* -------------------------------------------------- */

	if ( $isiPhone || $isiPad || $isiPod ) {
		
		console.log("iOS device detected.");
		
		isAndroid.addClass("hide");
		isDesktop.addClass("hide");
		
	} else {

		return false;

	}


	/* -------------------------------------------------- */
	/* MOBILE
	/* -------------------------------------------------- */

	if ( $isMobile ) {
		
		console.log("Viewing on mobile device.");
		
		isDesktop.addClass("hide");
		
	} else {
		
		isMobile.addClass("hide");

		return false;
		
	}


	/* -------------------------------------------------- */
	/* DESKTOP
	/* -------------------------------------------------- */

	if ( $isDesktop ) {
		
		console.log("Viewing on desktop / laptop.");
		
		isMobile.addClass("hide");
		
	} else {
		
		isDesktop.addClass("hide");

		return false;
		
	}

}
//endRemoveIf(production)


/* -------------------------------------------------- */
/* SCREEN
/* -------------------------------------------------- */

//removeIf(production)
var detectScreen = function detectScreen() {

	/* -------------------------------------------------- */
	/* MOBILE SCREEN (SMALL)
	/* -------------------------------------------------- */

	if ( $isMobileScreen ) {
		
		console.log("Viewing on MOBILE (SMALL) screen: " + $$(window).width() + "px" );

	} else {

		return false;

	}


	/* -------------------------------------------------- */
	/* TABLET SCREEN (MEDIUM)
	/* -------------------------------------------------- */

	if ( $isTabletScreen ) {
		
		console.log("Viewing on TABLET (MEDIUM) screen: " + $$(window).width() + "px" );

	} else {

		return false;

	}


	/* -------------------------------------------------- */
	/* LAPTOP (LARGE)
	/* -------------------------------------------------- */

	if ( $isLaptopScreen ) {
		
		console.log("Viewing on LAPTOP (LARGE) screen: " + $$(window).width() + "px" );

	} else {

		return false;

	}


	/* -------------------------------------------------- */
	/* DESKTOP (EXTRA LARGE)
	/* -------------------------------------------------- */

	if ( $isDesktopScreen ) {
		
		console.log("Viewing on a DESKTOP (X-LARGE) screen: " + $$(window).width() + "px" );

	} else {

		return false;

	}

}
//endRemoveIf(production)
