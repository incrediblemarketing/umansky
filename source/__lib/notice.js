/* -------------------------------------------------- */
/* SET COOKIES
/* -------------------------------------------------- */

var	cookiePrivacyPolicy = "privacy-policy",
	valuePrivacyPolicy = "accepted",

	cookieExpireDate = 30,
	cookiseSecure = false;


/* -------------------------------------------------- */
/* CACHE SELECTORS
/* -------------------------------------------------- */

var privacyPolicyNotice = $("#privacy-policy-notice");


/* -------------------------------------------------- */
/* PRIVACY / COOKIE POLICY
/* -------------------------------------------------- */

	/* -------------------------------------------------- */
	/* ACTIONS
	/* -------------------------------------------------- */

	privacyPolicyNotice.find("button").on("click", function(e) {
		//"use strict";
		e.preventDefault();

		var self = $(this);

		TweenMax.to(self.parent().parent(), 0.25, {opacity: 0, y: $(this).height() + "px", ease: Power2.easeInOut,

														onComplete:

															function() {
																
																console.log( Cookies.get(cookiePrivacyPolicy) + " cookie created for visitor.");
																Cookies.set(cookiePrivacyPolicy, valuePrivacyPolicy, { expires: cookieExpireDate, secure: cookiseSecure });

																self.parent().parent().addClass("hide");
																
															},

														});

	});


/* -------------------------------------------------- */
/* RUN CHECK
/* -------------------------------------------------- */

var cookieCheck = function() {
	"use strict";

	/* -------------------------------------------------- */
	/* PRIVACY / COOKIE POLICY
	/* -------------------------------------------------- */
	
	if ( $showPrivacyPolicy && Cookies(cookiePrivacyPolicy) ) {	

		console.log( Cookies.get(cookiePrivacyPolicy) + " cookie found! Visitor has already accepted Privacy and Cookie Policy.");

		privacyPolicyNotice.addClass("hide");

	} else if ( $showPrivacyPolicy ) {

		console.log("First visit. User has not accepted Privacy / Cookie Policy yet.");

		TweenMax.to(privacyPolicyNotice, 0.5, {display: "block", opacity: 1, y: 0, ease: Power4.easeOut});

	} else if ( !$showPrivacyPolicy ) {
			   
		return false;
			   
	}

};

cookieCheck();


/* -------------------------------------------------- */
/* DEBUG / URL COMMANDS
/* -------------------------------------------------- */

/*
if ( window.location.hash === "#delete" ) {
	
	console.log( Cookie.get(cookiePrivacyPolilcy) + " deleted.");
	Cookies.remove(cookiePrivacyPolicy);
	
}
*/
