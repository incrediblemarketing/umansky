/* -------------------------------------------------- */
/* FOR REFERENCE
/* -------------------------------------------------- */

/*
var hostRootDomain = "domain.com";
var hostDomainEN = "en.domain.com";
var hostDomainES = "es.domain.com";

var currentHost = location.host;
var currentURLLocation = location.href;
var currentURLPath = location.pathname;
var currentURLHash = location.hash;
*/


/* -------------------------------------------------- */
/* FRAMEWORK
/* -------------------------------------------------- */

var frameworkInit = function frameworkInit() {
//
	//var elem = new Foundation.Sticky($$("#sidebar nav"));

	// Reinitialize 'Equalizer' plugin.
	//TweenMax.delayedCall(2, Foundation.reInit, ["equalizer"]);


	//$('#element').foundation('reflow');
	//$('#element').foundation('_destroy');


	/*
	$('.title-bar').on('sticky.zf.stuckto:top', function(){
	  $(this).addClass('shrink');
	}).on('sticky.zf.unstuckfrom:top', function(){
	  $(this).removeClass('shrink');
	})
	*/

	// Init Foundation Framework.
	$(document).foundation();

	//var zfSlider = new Foundation.Slider(zfElement, {});


	//var zfDropdownMenu = new Foundation.DropdownMenu(zfElement, {});
	//var zfDrilldown = new Foundation.Drilldown(zfElement, {});
	/////var zfAccordionMenu = new Foundation.AccordionMenu(zfElement, {});
	/////var zfMagellan = new Foundation.Magellan(zfElement, {});


	/////var zfAccordion = new Foundation.Accordion(zfElement, {});
	/////var zfDropdown = new Foundation.Dropdown(zfElement, {});
	//var zfOffCanvas = new Foundation.OffCanvas(zfElement, {});
	//var zfReveal = new Foundation.Reveal(zfElement, {});
	/////var zfTabs = new Foundation.Tabs(zfElement, {});
	/////var zfResponsiveAccordionTabs = new Foundation.ResponsiveAccordionTabs(zfElement, {});


	//var zfOrbit = new Foundation.Orbit(zfElement, {});
	//var zfTooltip = new Foundation.Tooltip(zfElement, {});


	//var zfAbide = new Foundation.Abide(zfElement, {});
	/////var zfEqualizer = new Foundation.Equalizer(zfElement, {});
	/////var zfInterchange = new Foundation.Interchange(zfElement, {});
	/////var zfToggler = new Foundation.Toggler(zfElement, {});
	/////var zfSmoothScroll = new Foundation.SmoothScroll(zfElement, {});
	/////var zfSticky = new Foundation.Sticky(zfElement, {});


	/* -------------------------------------------------- */
	/* COMPONENTS
	/* -------------------------------------------------- */
	
	/*
	var options = {
		multiExpand: true,
		allowAllClosed: false
	};
	var accordion = new Foundation.Accordion($('#some-accordion'), options);
	*/

	/*
	var zfAccordion = new Foundation.Accordion($$(".accordion"), {
		allowAllClosed: true,
		deepLink: false,
		deepLinkSmudge: false,
		deepLinkSmudgeDelay: 300,
		multiExpand: true,
		slideSpeed: 400,
		updateHistory: false
	}),
	*/

	zfSmoothScroll = new Foundation.SmoothScroll($$(".scroll-to"), {
		animationDuration: 800,
		animationEasing: "easeInOutExpo",
		offset: 0,
		threshold: 50
	});


}; // END frameworkInit


/* -------------------------------------------------- */
/* CORE / COMPONENTS / MODULES
/* -------------------------------------------------- */

var core = function core() {

	frameworkInit();

	//comDialog();
	comParallax();
	comScrollProgress();
	//comSlider();
	comTestimonials();

	assetObserver();
	dataHelpers();
	print();

	uiInit();
	//uiNavbar();
	uiNavPanel();
	uiLinkDelegation();
	uiButtons();
	uiScrollEvents();
	uiScrollTo();
	uiScrollTrack();
	uiSticky();
	
	//hashNav();
	//pages();

};


var components = function components() {

	//comStories();
	//comTilt();

	shaders();

	reveal();
	pageVisibility();

	animCore();
	
	hasTouch();

};


/* -------------------------------------------------- */
/* FUNCTIONS
/* -------------------------------------------------- */

// Create an object to allow this element to scroll when body scrolling is locked.
var targetElement = document.querySelector("#nav-panel");


// ENABLE / DISABLE CONTENT
var lock = function lock() {		
	"use strict";
	//console.log("Content locked.");

	html.not(".no-scroll").css({"overflow-x" : "hidden", "overflow-y" : "hidden"});
	bodyScrollLock.disableBodyScroll(targetElement);

};

var unlock = function unlock() {		
	"use strict";
	//console.log("Content unlocked.");
	
	html.not(".no-scroll").css({"overflow-x" : "hidden", "overflow-y" : "scroll"});
	bodyScrollLock.enableBodyScroll(targetElement);
	//bodyScrollLock.clearAllBodyScrollLocks();

};


/* -------------------------------------------------- */
/* PREPARE APIs / PLUGINS
/* -------------------------------------------------- */

$$(document).ready(function() {

	console.log("Loading DOM...");
	
	
	// INIT CORE
	core();

});


$$(window).on("load", function() {

	console.log("Content ready: All assets and resources loaded.");


	// INIT COMPONENTS
	TweenMax.delayedCall($delayInterval, components);

});
