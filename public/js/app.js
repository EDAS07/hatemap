webpackJsonp([0],[
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */
/***/ function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = {}

/* script */
__vue_exports__ = __webpack_require__(22)

/* template */
var __vue_template__ = __webpack_require__(27)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "/Users/chuhancheng/Sites/hateline.dev/resources/assets/js/components/mapcontent.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5c3086fe", __vue_options__)
  } else {
    hotAPI.reload("data-v-5c3086fe", __vue_options__)
  }
})()}
if (__vue_options__.functional) {console.error("[vue-loader] mapcontent.vue: functional components are not supported and should be defined in plain js files using render functions.")}

module.exports = __vue_exports__


/***/ },
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */
/***/ function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function () {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		var result = [];
		for (var i = 0; i < this.length; i++) {
			var item = this[i];
			if (item[2]) {
				result.push("@media " + item[2] + "{" + item[1] + "}");
			} else {
				result.push(item[1]);
			}
		}
		return result.join("");
	};

	// import a list of modules into the list
	list.i = function (modules, mediaQuery) {
		if (typeof modules === "string") modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for (var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if (typeof id === "number") alreadyImportedModules[id] = true;
		}
		for (i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if (typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if (mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if (mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

/***/ },
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//
//
//
//

/* harmony default export */ exports["default"] = {
	methods:{
		onCouponApplied: function onCouponApplied(){
			Event.fire('applied');
		}
	}
};


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ exports["default"] = {
	props: ['place'],
	methods:{

	},
	created: function created(){
		console.log('place:', this.place.place_id);
	}
};


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($, Vue) {Object.defineProperty(exports, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Coupon_vue__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Coupon_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Coupon_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__InfoWindow_vue__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__InfoWindow_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__InfoWindow_vue__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ exports["default"] = {

    data: function(){
        return {
            map: null,
            userLocation: null,
            userMarker: null,
            infowindow: null
        };
    },

    methods: {
        onCouponApplied: function onCouponApplied(){
            console.log('mapcontent oncoupon applied!');
        },

        initMap: function initMap(){
            this.map = new google.maps.Map(document.getElementById('map'), {
                    center: {lat: 23.848123, lng: 121.043316},
                    zoom: 7,
                    mapTypeId: google.maps.MapTypeId.HYBRID
                }
            );
        },

        initInfoWindow: function initInfoWindow(){
            this.infowindow = new google.maps.InfoWindow();
        },

        setUserLocation: function setUserLocation(lat,lng){
            this.userLocation = new google.maps.LatLng(lat, lng);
        },            

        initPlaces: function initPlaces(_redius, _types){

            var request = {
                location: this.userLocation,
                radius: _redius,
                types: _types,
                // rankBy: google.maps.places.RankBy.DISTANCE
            };

            var map = this.map;
            var infowindow = this.infowindow;
            var service = new google.maps.places.PlacesService(this.map);
            service.nearbySearch(request, callback);
            // service.radarSearch(request, callback);
            function callback(results, status) {
                if (status == google.maps.places.PlacesServiceStatus.OK) {
                    for (var i = 0; i < results.length; i++) {
                        var place = results[i];
                        createMarker(results[i]);
                    }
                }
            }

            var selectedMarker = null;
            var selectedPlace = null;
            var userMarker = this.userMarker;

            function createMarker(place) {
                var placeLoc = place.geometry.location;
                var marker = new google.maps.Marker({
                    map: map,
                    position: placeLoc
                    /*icon: {
                        url: 'images/circle.png',
                        anchor: new google.maps.Point(10,10),
                        scaledSize: new google.maps.Size(10,17),
                    }*/
                });
                
                google.maps.event.addListener(marker, 'click', function() {
                    if(selectedMarker != null){
                        selectedMarker.setAnimation(null);
                    }
                    if(marker.getAnimation() === undefined){
                        marker.setAnimation(null);
                    }
                    userMarker.setAnimation(null);
                    
                    selectedMarker = marker;
                    selectedPlace = place;

                    if(marker.getAnimation() !== null){
                        marker.setAnimation(null);
                    }else{
                        marker.setAnimation(google.maps.Animation.BOUNCE);
                    }
                    infowindow.setContent('<cus-content></cus-content>');
                    infowindow.open(map, this);
                    map.panTo(marker.position);
                });
            }

            google.maps.event.addListener(map, 'click',function(){
                infowindow.close();
                if(selectedMarker != null) selectedMarker.setAnimation(null)
            })

            google.maps.event.addListener(map, 'drag',function(){
                var iwOuter = $('.gm-style-iw');
                iwOuter.parent().parent().css({
                    'display': 'none'
                });
            })

            google.maps.event.addListener(map, 'dragend',function(){
                var iwOuter = $('.gm-style-iw');
                iwOuter.parent().parent().css({
                    'display': 'block'
                });
            })

            google.maps.event.addListener(infowindow, 'closeclick',function(){
                selectedMarker.setAnimation(null);
            })

            google.maps.event.addListener(infowindow, 'domready',function(){
                var iwOuter = $('.gm-style-iw');
                var iwBackground = iwOuter.prev();
                iwBackground.css({
                    'z-index': '2'
                });
                iwBackground.children(':nth-child(2)').css({'display':'none'});
                iwBackground.children(':nth-child(4)').css({'display':'none'});
                var iwCloseBtn = iwOuter.next();
                iwOuter.css({
                    'width': '232px',
                    'height': '129px'
                });
                iwCloseBtn.css({
                    'right': '47px',
                    'top': '53px'
                });

                var cusContent = new Vue({
                    el: 'cus-content',
                    data: {
                        place: selectedPlace
                    },
                    components: {
                        InfoWindow: __WEBPACK_IMPORTED_MODULE_1__InfoWindow_vue___default.a
                    },
                    template: '<InfoWindow :place=place></InfoWindow>',
                    methods: {

                    }
                });
            })
            
        },

        initUserMarker: function initUserMarker(current){
            var image = {
                url: 'images/amber.png',
                scaledSize: new google.maps.Size(40, 60),
                origin: new google.maps.Point(0,0),
                anchor: new google.maps.Point(0,20)
            };
            var marker = new google.maps.Marker({
                map: this.map,
                position: current,
                icon: image
            });
            // marker.setAnimation(google.maps.Animation.BOUNCE);
            this.userMarker = marker;
        },

        initMapContent: function initMapContent(){
            var _this = this;

            function init(lat, lng){
                var current = { 
                    lat: lat, 
                    lng: lng
                };

                _this.setUserLocation(lat, lng);
                _this.initInfoWindow();
                _this.initUserMarker(current);
                _this.initPlaces('1000', ['food']);

                _this.map.setCenter(current);
                _this.map.setZoom(17);
                _this.map.setMapTypeId(google.maps.MapTypeId.ROADMAP);
                
            }

            navigator.geolocation.getCurrentPosition(function(location) {
                console.log('get navigator location success!');
                init(location.coords.latitude, location.coords.longitude);
            },
            function(){
                console.log('get navigator location fail!');
                init(25.083949, 121.558636);
            },
                {maximumAge:60000, timeout:10000, enableHighAccuracy:true}
            );

            
        }
    },

    components: {
        Coupon: __WEBPACK_IMPORTED_MODULE_0__Coupon_vue___default.a
    },

    created: function created() {
        var this$1 = this;
        
        var checkFlag = function () {
            if(window.loaded === undefined) {
               window.setTimeout(checkFlag, 100);
            } else {
                this$1.initMap();
                this$1.initMapContent();

            }
        }
        checkFlag();


        /*Event.listen('applied',function(){
            console.log('listend event on mapcontent');
        })*/
    }
};


/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0), __webpack_require__(1)))

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(16)();
// imports


// module
exports.push([module.i, "\n.opinion-window{\n\twidth: 100%;\n\tresize: none;\n}\n.gm-style-iw {\n\ttop: 43px !important;\n\tz-index: 1;\n}\n.size-md{\n\twidth: 250px;\n}\n", ""]);

// exports


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = {}

/* script */
__vue_exports__ = __webpack_require__(20)

/* template */
var __vue_template__ = __webpack_require__(28)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "/Users/chuhancheng/Sites/hateline.dev/resources/assets/js/components/Coupon.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-880e68b2", __vue_options__)
  } else {
    hotAPI.reload("data-v-880e68b2", __vue_options__)
  }
})()}
if (__vue_options__.functional) {console.error("[vue-loader] Coupon.vue: functional components are not supported and should be defined in plain js files using render functions.")}

module.exports = __vue_exports__


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = {}

/* styles */
__webpack_require__(30)

/* script */
__vue_exports__ = __webpack_require__(21)

/* template */
var __vue_template__ = __webpack_require__(26)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "/Users/chuhancheng/Sites/hateline.dev/resources/assets/js/components/InfoWindow.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-162f0582", __vue_options__)
  } else {
    hotAPI.reload("data-v-162f0582", __vue_options__)
  }
})()}
if (__vue_options__.functional) {console.error("[vue-loader] InfoWindow.vue: functional components are not supported and should be defined in plain js files using render functions.")}

module.exports = __vue_exports__


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "panel panel-default size-md"
  }, [_c('div', {
    staticClass: "panel-heading"
  }, [_vm._v("店家: " + _vm._s(_vm.place.name))]), _vm._v(" "), _vm._m(0)])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "panel-body"
  }, [_c('div', [_c('textarea', {
    staticClass: "opinion-window",
    attrs: {
      "placeholder": "You don't like what?"
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "text-right"
  }, [_c('button', {
    staticClass: "btn btn-primary btn-sm",
    attrs: {
      "type": "button"
    }
  }, [_vm._v("送出")])])])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-162f0582", module.exports)
  }
}

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _vm._m(0)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "container"
  }, [_c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-md-8 col-md-offset-2"
  }, [_c('div', {
    staticClass: "panel panel-default"
  }, [_c('div', {
    staticClass: "panel-heading"
  }, [_vm._v("Hate Food")]), _vm._v(" "), _c('div', {
    staticClass: "panel-body"
  }, [_c('div', {
    attrs: {
      "id": "map"
    }
  })])])])])])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-5c3086fe", module.exports)
  }
}

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('input', {
    attrs: {
      "placeholder": "Enter coupon"
    },
    on: {
      "blur": _vm.onCouponApplied
    }
  })
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-880e68b2", module.exports)
  }
}

/***/ },
/* 29 */
/***/ function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var stylesInDom = {},
	memoize = function(fn) {
		var memo;
		return function () {
			if (typeof memo === "undefined") memo = fn.apply(this, arguments);
			return memo;
		};
	},
	isOldIE = memoize(function() {
		return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
	}),
	getHeadElement = memoize(function () {
		return document.head || document.getElementsByTagName("head")[0];
	}),
	singletonElement = null,
	singletonCounter = 0,
	styleElementsInsertedAtTop = [];

module.exports = function(list, options) {
	if(typeof DEBUG !== "undefined" && DEBUG) {
		if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};
	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (typeof options.singleton === "undefined") options.singleton = isOldIE();

	// By default, add <style> tags to the bottom of <head>.
	if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

	var styles = listToStyles(list);
	addStylesToDom(styles, options);

	return function update(newList) {
		var mayRemove = [];
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			domStyle.refs--;
			mayRemove.push(domStyle);
		}
		if(newList) {
			var newStyles = listToStyles(newList);
			addStylesToDom(newStyles, options);
		}
		for(var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];
			if(domStyle.refs === 0) {
				for(var j = 0; j < domStyle.parts.length; j++)
					domStyle.parts[j]();
				delete stylesInDom[domStyle.id];
			}
		}
	};
}

function addStylesToDom(styles, options) {
	for(var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];
		if(domStyle) {
			domStyle.refs++;
			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}
			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];
			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}
			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles(list) {
	var styles = [];
	var newStyles = {};
	for(var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};
		if(!newStyles[id])
			styles.push(newStyles[id] = {id: id, parts: [part]});
		else
			newStyles[id].parts.push(part);
	}
	return styles;
}

function insertStyleElement(options, styleElement) {
	var head = getHeadElement();
	var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
	if (options.insertAt === "top") {
		if(!lastStyleElementInsertedAtTop) {
			head.insertBefore(styleElement, head.firstChild);
		} else if(lastStyleElementInsertedAtTop.nextSibling) {
			head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			head.appendChild(styleElement);
		}
		styleElementsInsertedAtTop.push(styleElement);
	} else if (options.insertAt === "bottom") {
		head.appendChild(styleElement);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement(styleElement) {
	styleElement.parentNode.removeChild(styleElement);
	var idx = styleElementsInsertedAtTop.indexOf(styleElement);
	if(idx >= 0) {
		styleElementsInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement(options) {
	var styleElement = document.createElement("style");
	styleElement.type = "text/css";
	insertStyleElement(options, styleElement);
	return styleElement;
}

function addStyle(obj, options) {
	var styleElement, update, remove;

	if (options.singleton) {
		var styleIndex = singletonCounter++;
		styleElement = singletonElement || (singletonElement = createStyleElement(options));
		update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
		remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
	} else {
		styleElement = createStyleElement(options);
		update = applyToTag.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
		};
	}

	update(obj);

	return function updateStyle(newObj) {
		if(newObj) {
			if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
				return;
			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;
		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag(styleElement, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = styleElement.childNodes;
		if (childNodes[index]) styleElement.removeChild(childNodes[index]);
		if (childNodes.length) {
			styleElement.insertBefore(cssNode, childNodes[index]);
		} else {
			styleElement.appendChild(cssNode);
		}
	}
}

function applyToTag(styleElement, obj) {
	var css = obj.css;
	var media = obj.media;
	var sourceMap = obj.sourceMap;

	if (media) {
		styleElement.setAttribute("media", media);
	}

	if (sourceMap) {
		// https://developer.chrome.com/devtools/docs/javascript-debugging
		// this makes source maps inside style tags work properly in Chrome
		css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */';
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = css;
	} else {
		while(styleElement.firstChild) {
			styleElement.removeChild(styleElement.firstChild);
		}
		styleElement.appendChild(document.createTextNode(css));
	}
}


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(23);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(29)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../../../../node_modules/css-loader/index.js!./../../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-162f0582!./../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./InfoWindow.vue", function() {
			var newContent = require("!!./../../../../node_modules/css-loader/index.js!./../../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-162f0582!./../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./InfoWindow.vue");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Vue) {/**
 * First we will load all of this project's JavaScript dependencies which
 * include Vue and Vue Resource. This gives a great starting point for
 * building robust, powerful web applications using Vue and Laravel.
 */

//require('./bootstrap');

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

//import Vue from 'vue';

/*
window.Event = new class {

	constructor(){
		this.vue = new Vue();
	}

	fire(event, data = null){
		this.vue.$emit(event, data);
	}

	listen(event, callback){
		this.vue.$on(event, callback);
	}

}
*/
Vue.component('mapcontent', __webpack_require__(3));

var app = new Vue({
  el: '#app',

  mounted: function mounted() {
    window.loaded = false;

    function initMap() {
      window.loaded = true;
    }
    window.initMap = initMap;
  }
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }
],[31]);