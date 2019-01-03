/* -------------------------------------------------- */
/* CACHE SELECTORS
/* -------------------------------------------------- */
	
var page = $(".page").data("page"),
	
	linkHome = $(".link-home");


/* -------------------------------------------------- */
/* PAGES
/* -------------------------------------------------- */

var pages = function() {
	"use strict";

	// > = greatar than
	// < = less than
	
	
	/* -------------------------------------------------- */
	/* HOME
	/* -------------------------------------------------- */

	if ( page === "index" ) {
		console.log("Home Page");
		
		linkHome.addClass("active");
		//navbar.addClass("dark");

		
	}
    
	
    /* -------------------------------------------------- */
	/* PRIVACY AND TERMS OF USE
	/* -------------------------------------------------- */

	else if ( page === "privacy-policy" ) {
		console.log("Privacy and Terms of Use Page");
		
		/*
		linkPrivacyPolicy.addClass("active");
		navbar.addClass("dark");
		body.addClass("background-white");
		body.addClass("background-image-none");
		
		$("#ui-privacy-policy-message a").hide();
		$("#ui-privacy-policy-message").addClass("text-center");
		*/

	}
    
	
	/* -------------------------------------------------- */
	/* ERROR
	/* -------------------------------------------------- */

	else {
		console.log("Error Page");
		
		//navbar.addClass("light");

	}
	
};
