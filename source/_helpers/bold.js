
module.exports = function(selector) {
	"use strict";
	
	// options.fn(this) = Handelbars content between {{#bold}} HERE {{/bold}}
	var bold = '<strong>' + selector.fn(this) + '</strong>';
	
	return bold;
};
