webpackJsonp([0],[
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */
/***/ function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = {}

/* script */
__vue_exports__ = __webpack_require__(20)

/* template */
var __vue_template__ = __webpack_require__(22)
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
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */
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
/* 20 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Coupon_vue__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Coupon_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Coupon_vue__);
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
            geoLocation: null,
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

        setGeoLocation: function setGeoLocation(lat,lng){
            this.geoLocation = new google.maps.LatLng(lat, lng);
        },

        initPlaces: function initPlaces(_redius, _types){

            var request = {
                location: this.geoLocation,
                radius: _redius,
                types: _types
            };

            var map = this.map
            var infowindow = new google.maps.InfoWindow();
            var service = new google.maps.places.PlacesService(this.map);
            service.nearbySearch(request, callback);
            
            function callback(results, status) {
                if (status == google.maps.places.PlacesServiceStatus.OK) {
                    for (var i = 0; i < results.length; i++) {
                        var place = results[i];
                        createMarker(results[i]);
                    }
                }
            }

            var selectedMarker = null;

            function createMarker(place) {
                // console.log('debug:', place);
                var placeLoc = place.geometry.location;
                var marker = new google.maps.Marker({
                    map: map,
                    position: place.geometry.location
                });
                
                google.maps.event.addListener(marker, 'click', function() {
                    if(selectedMarker != null){
                        selectedMarker.setAnimation(null);
                    }
                    if(marker.getAnimation() === undefined){
                        marker.setAnimation(null);
                    }
                    
                    selectedMarker = marker;

                    if(marker.getAnimation() !== null){
                        marker.setAnimation(null);
                    }else{
                        marker.setAnimation(google.maps.Animation.BOUNCE);
                    }
                    infowindow.setContent(place.name);
                    infowindow.open(map, this);
                });
            }

            google.maps.event.addListener(infowindow, 'closeclick',function(){
                selectedMarker.setAnimation(null);
            })

            
        },

        initGeoLocation: function initGeoLocation(){
            var map = this.map;
            var setGeoLocation = this.setGeoLocation;
            var initPlaces = this.initPlaces;
            navigator.geolocation.getCurrentPosition(function(location) {
                var current = { 
                    lat:location.coords.latitude, 
                    lng:location.coords.longitude 
                };
                setGeoLocation(location.coords.latitude, location.coords.longitude);
                initPlaces('500', ['restaurant']);
                map.setCenter(current);
                map.setZoom(16);
                map.setMapTypeId(google.maps.MapTypeId.ROADMAP);
            });
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
                this$1.initGeoLocation();

            }
        }
        checkFlag();


        /*Event.listen('applied',function(){
            console.log('listend event on mapcontent');
        })*/
    }
};



/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = {}

/* script */
__vue_exports__ = __webpack_require__(19)

/* template */
var __vue_template__ = __webpack_require__(23)
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
/* 22 */
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
/* 23 */
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
/* 24 */
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
],[24]);