/* -------------------------------------------------- */
/* SHADERS
/* -------------------------------------------------- */

var shaders = function() {

	// Settings
	var canvasContainer = document.getElementById("canvas"),
		transitionSpeed = 4;


	// Here we will handle which texture is visible and the timer to transition between images.
	var slider = {
		activeTexture: 1,
		nextTexture: 1, // This will change only when we will click.
		transitionTimer: 0,
		isAnimating: false // Flag to know if we are animating.
	}

	
	var curtains = new Curtains("canvas", true), // Set up our WebGL context and append the canvas to our wrapper.
		planeElements = document.getElementsByClassName("plane-textures"), // Get our plane element.
		pixelRatio = window.devicePixelRatio ? window.devicePixelRatio : 1.0, // Could be useful to get pixel ratio.


		// Some basic parameters. We don't need to specifiate vertexShaderID and fragmentShaderID because we already passed it via the data attributes of the plane HTML element.
		params = {
			vertexShaderID: "plane-vs", // our vertex shader ID
			fragmentShaderID: "plane-fs", // our framgent shader ID
			fov: 75,
			uniforms: {

				resolution: {
					name: "uResolution",
					type: "2f",
					value: [pixelRatio * planeElements[0].clientWidth, pixelRatio * planeElements[0].clientHeight]
				},

				transitionTimer: {
					name: "uTransitionTimer",
					type: "1f",
					value: 0
				},

				activeTexture: {
					name: "uActiveTexture",
					type: "1i", // int
					value: slider.activeTexture
				},

				nextTexture: {
					name: "uNextTexture",
					type: "1i", // int
					value: slider.nextTexture
				}

			}

		}

	var multiTexturesPlane = curtains.addPlane(planeElements[0], params);


	// Create our plane.
	multiTexturesPlane.onReady(function() {
	// When our plane is ready we add a click event listener that will switch the active texture value.


	// Listen to the links click event.
	var slideLinks = document.getElementsByClassName("change-slide");


	for(var i = 0; i < slideLinks.length; i++) {

		addEventListeners(slideLinks[i], "mouseover touchstart", function() {

			// Get the index of the slide to go.
			var slideToGo = this.getAttribute("data-slide");


			// If we are not animating.
			if( !slider.isAnimating ) {

				slider.nextTexture = slideToGo;
				slider.isAnimating = true;

				// Update our nextTure uniform.
				multiTexturesPlane.uniforms.nextTexture.value = slider.nextTexture;

			}

		}, false);

	}


	// On resize, update the resolution uniform.
	window.onresize = function() {

		multiTexturesPlane.uniforms.resolution.value = [pixelRatio * planeElements[0].clientWidth, pixelRatio * planeElements[0].clientHeight];

	}


	}).onRender(function() {

		// Handling the slideshow.
		if(slider.isAnimating) {

			// Increase timer.
			slider.transitionTimer = Math.min(120, slider.transitionTimer + transitionSpeed);


			// If time is up.
			if(slider.transitionTimer >= 120) {

				// Stop animation.
				slider.isAnimating = false;


				// Update the active texture.
				slider.activeTexture = slider.nextTexture;


				// Update our active texture uniform.
				multiTexturesPlane.uniforms.activeTexture.value = slider.activeTexture;


				// Reset timer.
				slider.transitionTimer = 0;

			}

		}


	// Update our transition timer uniform.
	multiTexturesPlane.uniforms.transitionTimer.value = slider.transitionTimer;
	});

}
