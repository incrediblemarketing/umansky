/* -------------------------------------------------- */
/* DIALOG
/* -------------------------------------------------- */

//removeIf(production)
var comDialog = function() {

	/* -------------------------------------------------- */
	/* CACHE SELECTORS
	/* -------------------------------------------------- */

	var dialog = $("#dialog"),
		close = $("#dialog").find(".close"),
		blocker = $("#blocker"),
		buttonDialog = $("[data-content-selector]");


	/* -------------------------------------------------- */
	/* DETECT
	/* -------------------------------------------------- */

	if ( $isEdge || $isExplorer ) {

		dialog.css({"left" : "50%", "transform" : "translate(-50%,-50%)"});

	}


	/* -------------------------------------------------- */
	/* BLOCKER
	/* -------------------------------------------------- */

	var block = function() {

		if ( !html.hasClass("inactive") ) {

			TweenMax.to( blocker, 0.25, {display: "block", opacity: 0.25,

											onStart: function() {

												disableContent();
												html.addClass("inactive");
												//$$(body).addClass("is-off-canvas-open");
												blocker.addClass("no-pointer");

											},

											onComplete: function() {
												  
												blocker.removeClass("no-pointer");
												  
											}

			});

		} else {

			TweenMax.to( blocker, 0.25, {display: "none", opacity: 0,

											onStart: function() {

												enableContent();
												html.removeClass("inactive");
												//$$(body).removeClass("is-off-canvas-open");
												blocker.addClass("no-pointer");

											}
			});
			

		}

	};


	/* -------------------------------------------------- */
	/* DIALOG
	/* -------------------------------------------------- */

		//*Note: Same origin policy is in effect using this method. External or third-party links will not load into 'dialog-container'.
		// Method: <a href="about.html" class="popup" data-content-selector="#articles" data-content-width="800" data-content-height="auto"></a>


		/* -------------------------------------------------- */
		/* CONTENT
		/* -------------------------------------------------- */
	
		//TweenMax.set(dialog, {display: "none", opacity: 0});


		/* -------------------------------------------------- */
		/* FUNCTIONS
		/* -------------------------------------------------- */

		var dialogOpen = function(dialogContentURL, dialogContentSelector) {

			var dialogContentURL, // Variable for content's path / location.
				dialogContentSelector; // Variable for loaded content's element id, ex: '#my-content'.


				block();

				if ( !html.hasClass("inactive") ) {

					TweenMax.to( dialog, 0.25, {display: "block", opacity: 1, ease: Expo.easeOut,

													   onStart: function() {

																   html.addClass("no-pointer");

																   //dialog.find("#dialog-close").not(".close").css({"display" : "none"});


																   dialog.find("#dialog-container").load(dialogContentURL + dialogContentSelector, function ( response, status, xhr ) {


																		dialog.find("#dialog-error").addClass("hide").find("p").text("");


																		// PRELOADER
																		TweenMax.set( dialog.find("#dialog-preloader"), {display: "block", opacity: 1, scale: 1});


																		// CALLBACK
																		if ( status == "success" ) {


																		   // ACCESSIBILITY
																		   var dialogTitle = dialog.find("#dialog-title").text(),
																		   	   dialogDescription = dialog.find("#dialog-description").text();


																		   if ( dialog.find("#dialog-title").length ) {

																				dialog.attr("aria-labelledby", dialogTitle);

																			} else {

																				dialog.attr("aria-labelledby", "Dialog");

																			}


																		   if ( dialog.find("#dialog-description").length ) {

																				dialog.attr("aria-describedby", dialogDescription);

																			} else {

																				dialog.attr("aria-describedby", "");

																			}


																			if ( !dialog.find("#dialog-container").find(dialogContentSelector).length ) {

																				var message = "Error: Unable to load " + dialogContentURL + dialogContentSelector;

																				dialog.find("#dialog-error").removeClass("hide").find("p").text(message);

																			}


																		   //utilAssetObserver();
																		 
																		   //console.log( dialogContentURL + dialogContentSelector);

																		   TweenMax.to( dialog.find("#dialog-preloader"), 0.25, {display: "none", opacity: 0, scale: 0.75, delay: 0, ease: Expo.easeOut});

																		   //dialog.find("#dialog-close").not(".close").css({"display" : "block"});


																		} else {

																		   var message = "Error: Unable to load " + dialogContentURL + dialogContentSelector;

																		   //$(this).html( msg + xhr.status + " " + xhr.statusText );

																		   //$$(this).text( '<div class="center-vh text-charcoal text-center"> <span class="fa fa-exclamation-circle p4" aria-hidden="true"></span> <p>'+msg+'</p> </div>' );

																		   TweenMax.to( dialog.find("#dialog-preloader"), 0.25, {display: "none", opacity: 0, scale: 0.75, delay: 1, ease: Expo.easeOut,
																																onComplete: function() {
																																	dialog.find("#dialog-error").removeClass("hide")
																																		 .find("p").text(message);
																																	}
																		   														});


																		   // ACCESSIBILITY
																		   dialog.attr("aria-labelledby", "Error")
																		   		.attr("aria-describedby", "We're sorry. This content is currently unavailable.");

																		}


																   });

													   },

													   onComplete: function() {

														   //dialog.addClass("open");
														   html.removeClass("no-pointer");

													   }
					});

				} else {

					TweenMax.to( dialog, 0.25, {display: "none", opacity: 0, ease: Expo.easeOut,

														onComplete: function() {
														   
														   dialog.attr("aria-labelledby", "Inactive") // Accessibility
														   		.attr("aria-describedby", "This dialog window is currently inactive.")
														   		.find("#dialog-container").html(""); // Clear content.

													   }

					});

				}

		};


		/* -------------------------------------------------- */
		/* ACTIONS
		/* -------------------------------------------------- */

		blocker.on("click", function(e) {
			e.preventDefault();

			block();
			dialogOpen();

		});


		buttonDialog.on("click", function(e) {
			e.preventDefault();
			
			var self = $(this),
				$dataContentURL = null, // self.attr("href"), // self.data("content-url"), // Read 'data-content-url' of clicked element and store as a value for 'dialogOpen(dialogContentURL)'.
				$dataConentSelector = self.data("content-selector"), // Read 'data-content-selector' of clicked element and store as a value for 'dialogOpen(dialogContentSelector)'.
				$dataContentWidth, // Read 'data-content-width' of clicked element and store as a value for 'dialogOpen(dataContentWidth)'.
				$dataContentHeight; // Read 'data-content-height' of clicked element and store as a value for 'dialogOpen(dataContentHeight)'.


				/* -------------------------------------------------- */
				/* CONDITIONAL VARIABLES
				/* -------------------------------------------------- */

				// WIDTH
				if ( self.data("content-width") === "auto" && window.matchMedia("(max-width: 1500px)").matches ) {

					//console.log("Dialog set to auto size width.");
					dialog.addClass("dialog-width-auto");
					$dataContentWidth = window.innerWidth / 1.2;

				} else if ( self.data("content-width") === "auto" ) {

					//console.log("Dialog set to auto size width.");
					dialog.addClass("dialog-width-auto");
					$dataContentWidth = 1024;

				} else {

					//console.log("Dialog not set to auto size width.");
					dialog.removeClass("dialog-width-auto");
					//dialog.css({"width" : "100%", "max-width" : "1024px"});
					$dataContentWidth = self.data("content-width");

				}


				// HEIGHT
				if ( self.data("content-height") === "auto" && window.matchMedia("(max-height: 1500px)").matches ) {

					//console.log("Dialog set to auto size height.");
					dialog.addClass("dialog-height-auto");
					//$dataContentHeight = 768;
					$dataContentHeight = window.innerHeight / 1.2;

				} else {

					//console.log("Dialog not set to auto size height.");
					dialog.removeClass("dialog-height-auto");
					$dataContentHeight = self.data("content-height");

				}


				// Check if element has href or is a regular element, ex: 'div' or 'span'.
				if ( self.is( "a" ) ) {

					$dataContentURL = self.attr("href");

					//console.log("Element has href: " + $dataContentURL);

	 			} else {

	 				$dataContentURL = self.data("content-url");

	 				//console.log("Element does not have href: " + $dataContentURL);

	 			}


	 			if ( $isMobile ) {

	 				dialog.css({ "left" : "50%",
	 							 "transform" : "translate(-50%,-50%)" 
	 							 });

	 			}


				//console.log($dataContentURL + " #" + $dataConentSelector + " @ " + $dataContentWidth + " x " + $dataContentHeight);
				
				dialogOpen($dataContentURL, " #" + $dataConentSelector, $dataContentWidth, $dataContentHeight);
				
				TweenMax.set( dialog, { width: $dataContentWidth, height: $dataContentHeight } );

				//window.location.hash = "#" + $dataConentSelector;

		});


		/*
		var dialogPath = window.location.pathname,
			dialogHash = window.location.hash;

		dialogOpen(dataContentURL, dialogHash, dataContentWidth, dataContentHeight);
		*/


		close.on("click", function(e) {
			e.preventDefault();

			dialogOpen();

		});


		$$(window).on("resize", _.debounce(function() {

			if ( dialog.length && dialog.hasClass("dialog-width-auto") && window.matchMedia("(max-width: 1500px)").matches ) {
				   
				//console.log("Dialog width set to 'auto'.");
				TweenMax.to( dialog, 0.25, { width: window.innerWidth / 1.2, ease: Power4.easeOut } );

			}

			if ( dialog.length && dialog.hasClass("dialog-height-auto") && window.matchMedia("(max-height: 1500px)").matches ) {
				   
				//console.log("Dialog height set to 'auto'.");
				TweenMax.to( dialog, 0.25, { height: window.innerHeight / 1.2, ease: Power4.easeOut } );
				//dialog.css({"height" : "auto"});

			}

		}, 100));

}; // END comDialog
//endRemoveIf(production)


/* -------------------------------------------------- */
/* PARALLAX
/* -------------------------------------------------- */

var comParallax = function() {

	/* -------------------------------------------------- */
	/* CACHE SELECTORS
	/* -------------------------------------------------- */

	var parallax = $(".dzsparallaxer");


	/* -------------------------------------------------- */
	/* INIT
	/* -------------------------------------------------- */

	dzsprx_init( parallax, {
		direction: "reverse", // normal, reverse
		settings_mode: "scroll", // scroll, mouse, mouse_body
		mode_scroll: "normal", // normal, fromtop
		animation_duration: "2",
		easing: "easeInOutSine" // easeIn, easeOutQuad, easeInOutSine
	});

}; // END comParallax


/* -------------------------------------------------- */
/* SCROLL PROGRESS
/* -------------------------------------------------- */

var comScrollProgress = function() {

	/* -------------------------------------------------- */
	/* CACHE SELECTORS
	/* -------------------------------------------------- */

	var $windowScrollTop = $(window).scrollTop(),
		$documentHeight = $(document).height(),
		$windowHeight = $(window).height(),
		$total = ($windowScrollTop / ($documentHeight - $windowHeight)) * 1;
		//$total = ($windowScrollTop / ($documentHeight - $windowHeight)) * 100;

	//console.log("total scroll: " + $total);


	/* -------------------------------------------------- */
	/* INIT
	/* -------------------------------------------------- */

	TweenMax.set($$(".scroll-progress"), {scaleX: $total, transformOrigin: "top left"});

	//$$(".scroll-progress").css({"width" : $total + "%"});

}; // END comScrollProgress


//$$(mainScrollContent).on('scrollme.zf.trigger', utilScrollProgress);

$$(mainScrollContent).on("scroll", _.throttle(comScrollProgress, $updateInterval, {leading: $throttleLeading, trailing: $throttleTrailing} ));


/* -------------------------------------------------- */
/* SLIDER
/* -------------------------------------------------- */

//removeIf(production)
var comSlider = function() {
	"use strict";

	/* -------------------------------------------------- */
	/* CACHE SELECTORS
	/* -------------------------------------------------- */

	var sliderDefault = $(".slider-default"),
		sliderDefaultAdapt = $(".slider-default.adapt").flickity();


    /* -------------------------------------------------- */
    /* SLIDER
    /* -------------------------------------------------- */

    //var sliderDefault = $(".slider-default");
    
    /*
    TweenMax.fromTo(sliderDefault, 0.5, {autoAlpha: 0},
    							   		{autoAlpha: 1, delay: 1});
    */

    // Disable vertical touch scrolling when interacting with any slider.


    


    

    
    // Resize slider when content has loaded.
    var sliderResize = function() { 

	   sliderDefault.flickity("resize");
        
    };
	
	TweenMax.delayedCall($delayInterval, sliderResize);
    
    
	
	
    
	// SET-UP
    //var sliderDefaultAdapt = $(".slider-default.adapt").flickity({});
    
    sliderDefault.has(".adapt").each(function() {
		
		var self = $(this);
		
        // Move '.flickity-page-dots' above slider.
		self.find("ol.flickity-page-dots").prependTo( $(this).find(".flickity-viewport") );
        
		// Bug fix: Flickity does not set correct 'height' for content other than images.
		self.find(".flickity-viewport").css("height", ''+$(this).find(".flickity-viewport .slider-item.is-selected").children().height()+'' + "px" );
        
    });
    
	// Disable 'href' links when clicking.
	$(".slider-item a").on("click touchdown", function(e) {
        
		//e.preventDefault();
		//return false;
        
	});

	
	// SLIDER ADAPT
	sliderDefaultAdapt.on("select.flickity", function() {

		//var sliderItemIndex = $(this).data("flickity");
		//console.log(sliderItemIndex.selectedIndex);

		var self = $(this);
		
        self.each(function() {
			
			// Bug fix: Flickity does not set correct 'height' for content other than images.
			self.find(".flickity-viewport").css("height", ''+$(this).find(".flickity-viewport .slider-item.is-selected .cell").height()+'' + "px" );
		            
        });
		
		

	});

	
	/* -------------------------------------------------- */
	/* TESTIMONIALS
	/* -------------------------------------------------- */ 

	// SLIDER
	/*
	TweenMax.set("#slider-testimonials .slider-item:not(.is-selected)", {scale: 0.75, transformOrigin: "bottom center"});

	//var sliderTestimonials = $("#slider-testimonials").flickity({});

	$$("#slider-testimonials").on("select.flickity", function() {

		TweenMax.to("#slider-testimonials .slider-item.is-selected", 0.75, {scale: 1, ease: Back.easeInOut});
		TweenMax.to("#slider-testimonials .slider-item:not(.is-selected)", 0.5, {scale: 0.75, ease: Back.easeOut});

	}).on("settle.flickity", function() {

		//TweenMax.to(".slider-item:not(.is-selected)", 0.5, {scale: 0.75, ease: Back.easeOut});

	});
	*/


	/* -------------------------------------------------- */
	/* CONTROLLER
	/* -------------------------------------------------- */

	var animSliderController = function() {

		sliderDefault.each(function() {

			// Cache selectors.
			var self = $(this);

			if ( self.hasClass("anim-play") ) {

				self.flickity("playPlayer");
				//self.flickity("unpausePlayer");

			} else {

				self.flickity("stopPlayer");

			}

		});

	};

	$$(window).on("scrollstop", animSliderController);

}; // END comSlider
//endRemoveIf(production)


/* -------------------------------------------------- */
/* CASE STUDIES
/* -------------------------------------------------- */

//removeIf(production)
var comStories = function() {

	/* -------------------------------------------------- */
	/* CACHE SELECTORS
	/* -------------------------------------------------- */

    var caseStudyUser = $("#stories .profiles .cell"),
    	caseStudies = $("#stories .profiles"),
        caseStudyJosh = $("#josh"),
        caseStudyShera = $("#shera"),
        caseStudyTina = $("#tina");


	/* -------------------------------------------------- */
	/* TRIM TEXT
	/* -------------------------------------------------- */
	
	/*
	var textTrim = $(".text-trim"),
		maxCharCount = 100;    

	$textTrim.each( function() {  
		
		var $self = $(this).text();
		
		if( $self.length < maxCharCount ) return;

		
		
		$(this).html( $self.slice( 0, maxCharCount ) + '<span>... </span><a href="#" class="more">More</a>' +
					  '<span style="display:none;">' + $self.slice( maxCharCount, $self.length ) + ' <a href="#" class="less">Less</a></span>'
		);
		
		
		
	}); 


	$('a.more', $textTrim).click(function(event){
		event.preventDefault();
		$(this).hide().prev().hide();
		$(this).next().show();        
	});


	$('a.less', $textTrim).click(function(event){
		event.preventDefault();
		$(this).parent().hide().prev().show().prev().show();    
	});
	*/


	/* -------------------------------------------------- */
	/* PROFILES
	/* -------------------------------------------------- */

		/* -------------------------------------------------- */
		/* TILES
		/* -------------------------------------------------- */

		TweenMax.set(caseStudyUser.find("[data-src]"), {autoAlpha: 0, scale: 1.12});

		// JOSH
		caseStudyUser.on("mouseover touchstart", function() {
			
			var self = $(this),
				tlCaseStudy = new TimelineMax({paused: false});
				tlCaseStudy.add( function() { self.addClass("overflow-hidden"); }, "group-1" )
						   .to(self.find(".story-icon"), 0.75, {autoAlpha: 0, scale: 0.75, ease: Back.easeOut}, "group-1")
						   .to(self.find(".text-container"), 1, {autoAlpha: 0, ease: Power4.easeOut}, "group-1")
						   .to(self.find(".button"), 1, {autoAlpha: 0, ease: Power4.easeOut}, "group-1")
						   .to(self.find("[data-src]"), 0.5, {autoAlpha: 1, scale: 1, ease: Power4.easeOut}, "group-1");
			
			
		}).on("mouseout touchend touchleave", function() {
			
			var self = $(this),
				tlCaseStudy = new TimelineMax({paused: false});
				tlCaseStudy.to(self.find(".text-container"), 0.75, {autoAlpha: 1, ease: Power4.easeOut}, "group-1")
						   .to(self.find(".button"), 0.75, {autoAlpha: 1, ease: Power4.easeOut}, "group-1")
						   .to(self.find("[data-src]"), 0.25, {autoAlpha: 0, scale: 1.12, ease: Power4.easeOut}, "group-1")
						   .to(self.find(".story-icon"), 0.5, {autoAlpha: 1, scale: 1, ease: Back.easeOut}, "group-1")
						   .add( function() { self.removeClass("overflow-hidden"); }, "group-1" );
			
		});

}; // END comCaseStudies
//endRemoveIf(production)


/* -------------------------------------------------- */
/* TESTIMONIALS
/* -------------------------------------------------- */

var comTestimonials = function() {

	/* -------------------------------------------------- */
	/* CACHE SELECTORS
	/* -------------------------------------------------- */




	/* -------------------------------------------------- */
	/* MAIN
	/* -------------------------------------------------- */

	// INIT
	$$(".testimonials").flickity({cellSelector: ".item",
							 initialIndex: 0,
							 accessibility: true,
							 setGallerySize: true,
							 resize: true,
							 cellAlign: "center",
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

	var testimonials = $$(".testimonials"),
		testimonialsStatus = $$(".testimonials").find(".status"),
		testimonialsData = testimonials.data("flickity");


	// CHECK LAST SLIDE
	testimonials.on( "settle.flickity", function() {

		if ( testimonials.find(".item").length - 1 ) {

			//console.log('End of menu.')
			//menu.removeClass("fade-right").addClass("fade-left")

		}

		if ( testimonials.selectedIndex = 0 ) {

			//console.log('Start of menu.')
			//menu.addClass("fade-right").removeClass("fade-left")

		}

	});


	// DRAG EVENTS
	testimonials.on("dragStart.flickity", function( event, pointer ) {

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
	testimonials.on("staticClick", function( event, pointer, cellElement, cellIndex ) {


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


	// PREVIOUS / NEXT
	testimonials.find(".previous").on( "click", function() {

		testimonials.flickity("previous", true);

	});


	testimonials.find(".next").on( "click", function() {

		testimonials.flickity("next", true);

	});


	// STATUS
	function updateStatus() {

		var cellNumber = testimonialsData.selectedIndex + 1;

		testimonialsStatus.html( '<span class="current">' + cellNumber + '</span>' + '/' + '<span class="total">' + testimonialsData.slides.length + '</span>' );

	}

	updateStatus();

	testimonials.on( "select.flickity", updateStatus );

}; // END comTestimonials


/* -------------------------------------------------- */
/* TILT
/* -------------------------------------------------- */

//removeIf(production)
/*
var comTilt = function() {

	var tilt = $(".tilt");

	tilt.tilt({
		maxTilt: 8,
		speed: 1000,
		transition: false,
		easing: "cubic-bezier(0.86, 0, 0.07, 1)",
		perspective: 1000,
		disableAxis: "x",
		glare: false,
		maxGlare: 1,
		scale: 1,
		reset: true
	});

	
	tilt.on("click mouseup mouseleave touchend", function() {
		
		var self = $(this)
		
		self.tilt.destroy.call(self);
		
	}).on("click mouseup mouseleave touchend", function() {
		
		var self = $(this)
		
		self.tilt();
		
	});
    

    if ( $hasTouch ) {
        tilt.methods.destroy.call(tilt);
	}
	

} */ // END comTilt
//endRemoveIf(production)
