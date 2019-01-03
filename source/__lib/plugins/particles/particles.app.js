/* To load a config file (particles.json) you need to host this demo (MAMP/WAMP/local)... */
/*
particlesJS.load('particles-js', 'particles.json', function() {
  console.log('particles.js loaded - callback');
});
*/

/* Otherwise just put the config content (json): */

particlesJS("particles",
  
  {
  "particles": {
    "number": {
      "value": 18,
      "density": {
        "enable": true,
        "value_area": 1024
      }
    },
    "color": {
      "value": ["#fff", "#19faaf", "#00fafa"] //"#b61924", {r:182, g:25, b:36}, {h:356, s:76, l:41}, ["#b61924", "#333333", "999999"], "random"
    },
    "shape": {
      "type": ["polygon"], //"circle", "edge", "triangle", "polygon", "star", "image", ["circle", "triangle", "image"]
      "stroke": {
        "width": 0,
        "color": "#ffffff"
      },
      "polygon": {
        "nb_sides": 6
      },
      "image1": {
        "src": null,
        "width": 100,
        "height": 100
      },
    },
    "opacity": {
      "value": 1,
      "random": true,
      "anim": {
        "enable": true,
        "speed": 1,
        "opacity_min": 0,
        "sync": false
      }
    },
    "size": {
      "value": 16,
      "random": true,
      "anim": {
        "enable": true,
        "speed": 1,
        "size_min": 0.5,
        "sync": false
      }
    },
    "line_linked": {
      "enable": false,
      "distance": 50,
      "color": "#fff",
      "opacity": 0.25,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 0.8,
      "direction": "top", //"none", "top", "top-right", "right", "bottom-right", "bottom", "bottom-left", "left", "top-left"
      "random": true,
      "straight": false,
      "out_mode": "out", //"out", "bounce"
      "bounce": true,
      "attract": {
        "enable": true,
        "rotateX": 1000,
        "rotateY": 1000
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas", //"canvas", "window"
    "events": {
      "onhover": {
        "enable": true,
        "mode": "grab" //"grab", "bubble", "repulse", ["grab", "bubble"]
      },
      "onclick": {
        "enable": true,
        "mode": "repulse" //"push", "remove", "bubble", "repulse", ["push", "repulse"]
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 225,
        "line_linked": {
          "opacity": 0.25
        }
      },
      "bubble": {
        "distance": 250,
        "size": 2,
        "duration": 5,
        "opacity": 1,
        "speed": 5
      },
      "repulse": {
        "distance": 500,
        "duration": 1
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true

});

/* FUNCTIONS */
var disableParticles = function() {
	"use strict";

	console.log("Particles disabled.");
	
	cancelRequestAnimFrame(pJSDom[0].pJS.fn.checkAnimFrame);
	cancelRequestAnimFrame(pJSDom[0].pJS.fn.drawAnimFrame);
	pJSDom[0].pJS.fn.particlesEmpty();
	pJSDom[0].pJS.fn.canvasClear();	
	
	/*
	TweenMax.to("#particles-js", 0.25, {opacity: 0, ease: Expo.easeOut, onComplete: function() {
																	console.log("Particles disabled.");
																	
																	cancelRequestAnimFrame(pJSDom[0].pJS.fn.checkAnimFrame);
																	cancelRequestAnimFrame(pJSDom[0].pJS.fn.drawAnimFrame);
																	pJSDom[0].pJS.fn.particlesEmpty();
																	pJSDom[0].pJS.fn.canvasClear();	
																	
																  }
	});
	*/
	

};

var enableParticles = function() {
	"use strict";
	
	console.log("Particles enabled.");
	
	pJSDom[0].pJS.fn.vendors.start();
	
	/*
	TweenMax.to("#particles-js", 0.5, {opacity: 1, ease: Expo.easeOut, onStart: function() {
																	console.log("Particles enabled.");
		
																	pJSDom[0].pJS.fn.vendors.start();
																  }
	});
	*/
	
};

