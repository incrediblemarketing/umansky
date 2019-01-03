
/* -------------------------------------------------- */
/* CACHE SELECTORS
/* -------------------------------------------------- */

var animHero = $("section#hero");


/*
var $splitText = new SplitText([animHero.find("h1"),
								animHero.find("h2"),
								animWelcome.find("h1"),
								animHowARTASWorks.find("h1"),
								animAreYouACandidate.find("h1"),
								animWhatSetsARTASApart.find("h1"),
								], {type: "words, chars, lines"});
*/


/* -------------------------------------------------- */
/* HERO
/* -------------------------------------------------- */

	/* -------------------------------------------------- */
	/* ANIMATION
	/* -------------------------------------------------- */

	var $heroH1SplitText = new SplitText(animHero.find("#hero-copy h1"), {type: "words, chars, lines"}), 
		heroH1SplitText = $heroH1SplitText.chars;


	TweenMax.set(animHero.find("h1"), {transformOrigin: "center left", perspective: 400});
	//TweenMax.set(animHero.find("#hero-background"), {autoAlpha: 0, x: 0, scale: 0.85, transformOrigin: "bottom left"});

	var tlHero = new TimelineMax({paused: true});
		tlHero.staggerFrom(heroH1SplitText, 0.75, {autoAlpha: 0, y: 0, ease: Back.easeOut }, 0.02, "group-01")
			  .staggerFrom(animHero.find("#hero-copy").children(), 1, {autoAlpha: 0, ease: Expo.easeOut}, 0.12, "group-01")
			  //.add( function() { animHero.find(".scroll-hint").parent().removeClass("no-pointer") } )
			  .add(
			  function() {

				$heroH1SplitText.revert();

			  });
			  //.staggerFrom(heroH2SplitText, 0.75, {opacity: 0, y: 80, scale: 0, rotationX: 180, transformOrigin:"0% 50% -50",  ease: Back.easeOut}, 0.01, "-=0.75");


	//tlHero.delay(1).play();


	//if ( !$hasTouch ) {

	//$$(window).on("resize", _.debounce(function() { tlHero.restart(); }, $delayInterval));

	//}


/* -------------------------------------------------- */
/* ANIMATION OBSERVER
/* -------------------------------------------------- */

	/* -------------------------------------------------- */
	/* FUNCTIONS
	/* -------------------------------------------------- */

	var animScenePlayAll = function() {
		"use strict";

		tlHero.play();

	};


	var animScenePauseAll = function() {
		"use strict";

		tlHero.pause();

	};


	/* -------------------------------------------------- */
	/* CONTROLLER
	/* -------------------------------------------------- */

	var animSceneController = function() {
		"use strict";
		//console.log("Playing animations in view.");

		if ( animHero.find(".anim").hasClass("anim-play") ) {

			//console.log("Element is active.");
			tlHero.resume();

		} else {

			//tlHero.pause(0);

		}


		if ( navPanel.hasClass("is-open") ) {

			animPauseAll();
			
		}


	};


/* -------------------------------------------------- */
/* ACTIONS
/* -------------------------------------------------- */

//$$(window).on("scrollstart", { latency: $updateInterval, leading: $throttleLeading, trailing: $throttleTrailing }, animScenePauseAll);
//$$(window).on("scrollstart", { latency: $updateInterval, leading: $throttleLeading, trailing: $throttleTrailing }, animSceneController);
//$$(window).on("scrollstop", { latency: $updateInterval,, leading: $throttleLeading, trailing: $throttleTrailing }, animSceneController);

//animScenePauseAll();

// Note: Animation trigger events handled by 'utilEmergence'.
