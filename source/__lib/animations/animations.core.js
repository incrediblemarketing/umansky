/* -------------------------------------------------- */
/* CACHE SELECTORS
/* -------------------------------------------------- */

var	animInteract = $(".anim-interact"); // Helper class for all animations affixed with 'anim-'.


/* -------------------------------------------------- */
/* CORE ANIMATIONS
/* -------------------------------------------------- */

var animCore = function(distance) {
	//console.log("Running animation controllers.");

	//animIconController();
	animSceneController();

}


/* -------------------------------------------------- */
/* FUNCTIONS
/* -------------------------------------------------- */

var animComplete = function() {
	//console.log("Tween completed.");

	$$(".anim").removeClass("no-pointer");

};


/* -------------------------------------------------- */
/* ACTIONS
/* -------------------------------------------------- */

animInteract.on("mouseover touchstart touchmove", function() {
	"use strict";

	var self = $(this);

	self.addClass("no-pointer");

	animCore();

}).on("mouseout touchend", function() {
	"use strict";

	var self = $(this);

	self.removeClass("no-pointer");

	animCore();

});
