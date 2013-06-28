"use strict"

function get_ie_version() {
	var version = 999; // we assume a sane browser
	if (navigator.appVersion.indexOf("MSIE") != -1)
		version = parseFloat(navigator.appVersion.split("MSIE")[1]);
	return version;
}

if (!Array.prototype.indexOf) { 
    Array.prototype.indexOf = function(obj, start) {
         for (var i = (start || 0), j = this.length; i < j; i++) {
             if (this[i] === obj) { return i; }
         }
         return -1;
    }
}

(function($){
	//load swipe.js if not ie6 or below
	if(get_ie_version() >= 8) {
		var swipe_script = $.createElement('script');
		swipe_script.setAttribute('src', './script/swipe.js');
		document.getElementsByTagName('head')[0].appendChild(swipe_script);
		var swipe_style = $.createElement('link');
		swipe_style.setAttribute('href', './stylesheet/swipe.style.css');
		swipe_style.setAttribute('rel', 'stylesheet');
		document.getElementsByTagName('head')[0].appendChild(swipe_style);

		swipe_script = null;
		swipe_style = null;
	}
})(document)