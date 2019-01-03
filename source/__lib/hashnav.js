/* -------------------------------------------------- */
/* FOR REFERENCE
/* -------------------------------------------------- */

/*
window.location.host: "google.com",
window.location.hostname: "google.com",
window.location.href or window.location.origin (Google Chrome): "https://www.google.com/intl/en/about/?fg=1&utm_source=google.com&utm_medium=referral&utm_campaign=hp-header",
window.location.pathname: "/intl/en/about/",
window.location.hash: "https://www.google.com/#welcome",
window.location.port: "80",
window.location.protocol: "https:"

console.log("document.URL : "+document.URL);
console.log("document.location.host : "+document.location.host);
console.log("document.location.hostname : "+document.location.hostname);
console.log("document.location.href : "+document.location.href);
console.log("document.location.origin : "+document.location.origin);
console.log("document.location.pathname : "+document.location.pathname);
console.log("document.location.hash : "+document.location.hash);
console.log("document.location.port : "+document.location.port);
console.log("document.location.protocol : "+document.location.protocol);

history.pushState('', document.title, window.location.pathname);
*/





/* -------------------------------------------------- */
/* FUNCTIONS
/* -------------------------------------------------- */

window.onhashchange = function() {
	"use strict";
	console.log(window.location.hash + " Hash changed");

	hashNav();

};





var hashNav = function() {
	"use strict";
	
	if ( window.location.href.indexOf("index") && window.location.hash === "#top" ) {

		console.log(window.location.href);

	}

};
