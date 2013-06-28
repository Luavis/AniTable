"use strict";

var date = new Date();
var today_day = (date.getDay());
today_day = (today_day > 0 ? today_day - 1 : 6);
date = null;
var position_list_components = null;
var ani_list_component = null;
var ani_list = null;
var temp_height = null;

function checkClassName(dom, cls) {
	if(!dom)return false;
	var _cls = dom.getAttribute('class');
	if(_cls != null && _cls.split(' ').indexOf(cls) > -1) {
		_cls = null;
		return true;
	}
	return false;
}

(function($) {
	document.querySelectorAll||(document.querySelectorAll=function(a){var b=document,c=b.documentElement.firstChild,d=b.createElement("STYLE");return c.appendChild(d),b.__qsaels=[],d.styleSheet.cssText=a+"{x:expression(document.__qsaels.push(this))}",window.scrollBy(0,0),b.__qsaels});
	document.querySelector||(document.querySelector = function(q) {return document.querySelectorAll(q)[0];})
	function clearPositionListClassName() {
		for(var i = position_list_components.length - 1; i >= 0; i--) {
			position_list_components[i].className = '';
		}
	}
	function clearListClassName() {
		if(ani_list_component == null)return;

		for(var i = ani_list_component.length - 1; i >= 0; i--) {
			if(checkClassName(ani_list_component[i], 'day'))
				continue;
			ani_list_component[i].className = '';
		}	
	}
	function position_on_click() {
		clearPositionListClassName();
		this.className = 'on';
		var index = this.getAttribute('index');

		if(!(index === null || index === undefined || index === NaN)) {
			window.mySwipe.slide(index, 500);
		}
			
		index = null;
	}
	function swipeCallBack(index, elem) {
		clearPositionListClassName();
		clearListClassName();
		position_list_components[index].setAttribute('class', 'on');
	}
	function list_component_on_click() {
		if(checkClassName(this, 'day'))
			return;
		else if(checkClassName(this, 'selected')) {
			clearListClassName();
			this.setAttribute('class', 'contract');
			// returnListViewtoTempHieght();
		}
		else if(this.getAttribute('class') == null || checkClassName(this, 'contract') || checkClassName(this, '')) {
			// temp_height = swipe_wrap.style.height;
			// swipe_wrap.style.height = '100%';
			clearListClassName();
			this.setAttribute('class', 'selected');
		}
	}
	function main() {
		ani_list = $.querySelectorAll('#wrap section #list-view .ani-list');

		if(get_ie_version() > 7) {
			var position_list = $.querySelector('#wrap section #position ul');
			var i = 0;
			var ani_list_length = ani_list.length;

			for(; i < ani_list_length; i++) {
				var component = $.createElement('li');
				if(i == today_day) {
					component.className = 'on';
				}
				position_list.appendChild(component);
				component = null;
			}
			position_list = null;

			position_list_components = $.querySelectorAll('#wrap section #position ul li');
			i = 0;
			for(; i < ani_list_length; i++) {
				position_list_components[i].onclick = position_on_click;
				position_list_components[i].setAttribute('index', i);
			}

			i = null;
			ani_list_length = null;

			if(window.Swipe) {
				window.mySwipe = new Swipe($.querySelectorAll('#wrap section #list-view')[0], {
					startSlide: today_day,
					speed: 400,
					// auto: 3000,
					continuous: true,
					disableScroll: false,
					stopPropagation: false,
					callback: swipeCallBack
				});
			}
		}
		else { // only in ie7-
			var i = 0;
			var ani_list_length = ani_list.length;
			for(; i < ani_list_length; i++) {
				ani_list[i].setAttribute('id', '_' + i);
			}
			ani_list_length = null;

			location.href= '#_' +  today_day;
		}
		ani_list_length = 0;
		ani_list_component = $.querySelectorAll('#wrap section #list-view .ani-list li');
		var i = 0;

		for (var i = ani_list_component.length - 1; i >= 0; i--) {
			var cls = ani_list_component[i].getAttribute('class');
			if(cls && cls.split(' ').indexOf('day') != -1) {
				cls = null;
				continue;
			}
			cls = null;
			ani_list_component[i].onclick = list_component_on_click;
		}
	}
	window.onload = main;
})(document);
