/* -------------------------------------------------- */
/* FUNCTIONS
/* -------------------------------------------------- */

var styleCore = function() {

	copyToClipboard();
	stylePropClassList();
	stylePropColors();
	stylePropFonts();

};


/* -------------------------------------------------- */
/* CLASS
/* -------------------------------------------------- */

var copyToClipboard = function() {

	// ALL CLASSES
	$$(".copy-to-clipboard").each(function() {

		var self = $(this),
			copyContent = self.find(".copy-to-clipboard-content").text();


		// COPY TO CLIPBOARD
		self.find(".copy-to-clipboard-button").on("click", function() {


			console.log("test");

 			var tlCopied = new TimelineMax({paused: true, delay: 0, repeatDelay: 0, yoyo: false, repeat: 1});
 				tlCopied.fromTo($(this).find(".copy-to-clipboard-status"), 0.25, {opacity: 0},
												   								 {opacity: 1, ease: Expo.easeOut})

 						.to($(this).find(".copy-to-clipboard-status"), 0.25, {opacity: 0, ease: Expo.easeOut});


 				tlCopied.restart();


 			CopyToClipboard(copyContent);

 			return false;

		});


	});

}; // END stylePropClass


/* -------------------------------------------------- */
/* HELPERS
/* -------------------------------------------------- */

// RGB TO HEX
var rgb2hex = function(rgb) {
	rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
	return (rgb && rgb.length === 4) ? "#" +
	("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
	("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
	("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : "";

};


/* -------------------------------------------------- */
/* CLASS
/* -------------------------------------------------- */

var stylePropClassList = function() {

	// ALL CLASSES
	$$(".prop-class-list").each(function() {

		var self = $(this),
			styleProps = self.attr("class").replace(/prop-class-list|prevent-default|waves-effect|waves-block/g, "");


		// COPY WINDOW CONTENTS
		var copyWindow = "";

			copyWindow += "<div class='prop-note-block copy-to-clipboard'>"; // PARENT


				copyWindow += "<strong>Class List</strong><br>"; // TITLE

				copyWindow += "<code class='copy-to-clipboard-content'>" + styleProps + "</code>"; // CONTENTS


				copyWindow += "<a class='copy-to-clipboard-button prevent-default'>"; // COPY

					copyWindow += "<span class='copy-to-clipboard-status'>Copied!</span>"; // LABEL

					copyWindow += "<span class='fa fa-file' aria-label='Copy' aria-hidden='true'></span>"; // BUTTON: COPY

				copyWindow += "</a>";


			copyWindow += "</div>"; // PARENT


		// APPEND COPY WINDOW CONTENTS
		self.after(copyWindow);


		// COPY TO CLIPBOARD
		self.next().find(".copy-to-clipboard-button").on("click", function() {

 			var tlCopied = new TimelineMax({paused: true, delay: 0, repeatDelay: 0, yoyo: false, repeat: 1});
 				tlCopied.fromTo(self.next().find(".copy-to-clipboard-button").find(".copy-to-clipboard-status"), 0.25, {opacity: 0},
																					 								   {opacity: 1, ease: Expo.easeOut})

 						.to(self.next().find(".copy-to-clipboard-button").find(".copy-to-clipboard-status"), 0.25, {opacity: 0, ease: Expo.easeOut});


 				tlCopied.restart();


 			CopyToClipboard(styleProps);

 			return false;

		});


	});

}; // END stylePropClass


/* -------------------------------------------------- */
/* COLOR PROPERTIES
/* -------------------------------------------------- */

var stylePropColors = function() {

	$$(".prop-css-color").each(function() {

		var self = $(this),
			styleProps = self.find("span").css("background-color");


		self.find(".prop-css-color-info ul").append( "<li>RGB: " + styleProps.replace(/rgb|\(|\)/g, "") + "</li>" )
									  		.append( "<li>HEX: " + rgb2hex(styleProps).replace(/rgb|\(|\)/g, "") + "</li>" );


		//console.log(getSwatchColor);
		//console.log( rgb2hex(styleProps) );

	});

}; // END styleColorInfo


/* -------------------------------------------------- */
/* TEXT PROPERTIES
/* -------------------------------------------------- */

var stylePropFonts = function() {

	// VARS
	var fontLinkSource = "https://fonts.google.com/download?family=",
		fontFamilyHeader = $$("#prop-css-font-families .font-header").css("font-family").replace(/\s|, cursive|, display|, handwriting|, monospace|, sans-serif|, serif/g, ""),
		fontFamilySubheader = $$("#prop-css-font-families .font-subheader").css("font-family").replace(/\s|, cursive|, display|, handwriting|, monospace|, sans-serif|, serif/g, ""),
		fontFamilyHeavy = $$("#prop-css-font-families .font-heavy").css("font-family").replace(/\s|, cursive|, display|, handwriting|, monospace|, sans-serif|, serif/g, ""),
		fontFamilyParagraph = $$("#prop-css-font-families .font-copy").css("font-family").replace(/\s|, cursive|, display|, handwriting|, monospace|, sans-serif|, serif/g, "");


		//console.log(fontFamilyHeader + fontFamilySubheader + fontFamilyParagraph);


	// FONT FAMILY
	$$(".prop-css-font-family").each(function() {

		var self = $(this),
			styleProps = self.css("font-family");


		if ( styleProps === '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, Ubuntu, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"' ) {

			self.append( "<span>System Fonts</span>" );


		} else {

			self.append( "<span>" + styleProps.replace(/\s|, cursive|, display|, handwriting|, monospace|, sans-serif|, serif/g, "") + "</span>" );


			$$("#download-font-assets").attr( "href", fontLinkSource + fontFamilyHeader + "|" + fontFamilySubheader + "|" + fontFamilyHeavy + "|" + fontFamilyParagraph );


			/*
			$$("#download-font-assets").on("click", function() {

				var fontLinkSource = "https://fonts.google.com/download?family=",
					fontLinkPath = styleProps;

	 			$(this).attr( "href" fontLinkSource + fontLinkPath );

			});
			*/


		}

		//console.log(styleProps);

	});


	// FONT SIZE
	$$(".prop-css-font-attributes").each(function() {

		var self = $(this),
			styleProps = self.css("font-size");


		self.before( "<span class='subheader-style'>Font size: " + styleProps + "</span>" );


		//console.log(styleProps);

	});

}; // END stylePropFontInfo


/* -------------------------------------------------- */
/* PREPARE APIs / PLUGINS
/* -------------------------------------------------- */

$$(document).ready(function() {

	//console.log("Loading DOM...");

});




$$(window).on("load", function() {

	//console.log("Content ready: All assets and resources loaded.");

	styleCore();

});