/* -------------------------------------------------- */
/* CACHE SELECTORS
/* -------------------------------------------------- */

// BLOCKS
html = $("html"),
body = $("body"),
main = $("main"),
section = $("section"),
article = $("article"),
footer = $("footer"),

navbar = $("#navbar"),
toolbar = $("#toolbar"),
navPanel = $("#nav-panel"),
panelOverlay = $(".js-off-canvas-overlay"),
navPanelString = "#nav-panel",

mainScrollContent = window;
	
	
/* -------------------------------------------------- */
/* OPTIONS
/* -------------------------------------------------- */

// PRIVACY / DATA / POPUPS
$showPrivacyPolicy = true,


// THROTTLE / DEBOUNCE INTERVAL
$delayInterval = 1, // Set delay interval before function fires.
$updateInterval = 200, // Set debounce / throttling interval. Increasing this value will limit events being fired every so often.
$throttleTrailing = true,
$throttleLeading = true,


// STICKY
stickyAnchor = "",
$stickyAnchorTolerance = 0,
$navbarAllowSticky = true,
$navbarStickyClass = "sticky",
$stickyOffset = 0,
$stickyScrollToleranceUp = 0,
$stickyScrollToleranceDown = 0;
