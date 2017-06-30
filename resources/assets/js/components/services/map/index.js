// import {router} from '@components/../app';

export default {
    map: null,
    userLocation: null,
    userMarker: null,
    selectedMarker: null,
    store_markers: [],
    searchRadius: '500',
    storeTypes: ['food'],

    init: function(context) {
        if (window.loaded === true) {
            this.initMap(context);
        } else {
            window.setTimeout(() => {
                this.init(context);
            }, 100);
        }
    },
    initMap: function(context) {
        let _this = this;
        //Initialize new map and geo-locate to Taiwan.
        this.map = new google.maps.Map(context.$refs.map, {
            center: { lat: 23.848123, lng: 121.043316 },
            zoom: 7,
            mapTypeId: google.maps.MapTypeId.HYBRID,
            mapTypeControl: false,
            streetViewControl: false
        });

        google.maps.Map.prototype.panToWithOffset = function(latlng, offsetX, offsetY) {
            var map = this;
            var ov = new google.maps.OverlayView();
            ov.onAdd = function() {
                var proj = this.getProjection();
                var aPoint = proj.fromLatLngToContainerPixel(latlng);
                aPoint.x = aPoint.x+offsetX;
                aPoint.y = aPoint.y+offsetY;
                map.panTo(proj.fromContainerPixelToLatLng(aPoint));
            }; 
            ov.draw = function() {}; 
            ov.setMap(this); 
        };

        function init(lat, lng) {
            let current = {
                lat: lat,
                lng: lng
            };

            _this.userLocation = new google.maps.LatLng(lat, lng);
            _this.updateGooglePlaces();

            _this.initUserMarker(current);

            _this.initStoreMarker(_this.searchRadius);

            // let init_MapEvent = new initMapEvent(_this);
            // _this.initNearByMarker(_this.searchRadius);

            //Geo-locate to 'current' location.
            _this.map.panTo(current);
            _this.map.setZoom(17);
            _this.map.setMapTypeId(google.maps.MapTypeId.ROADMAP);

        }

        navigator.geolocation.getCurrentPosition(function(location) {
                console.log('get navigator location success!');
                init(location.coords.latitude, location.coords.longitude);
            },
            function() {
                console.log('get navigator location fail!');
                init(25.083949, 121.558636);
            }, { maximumAge: 0, timeout: 10000, enableHighAccuracy: true }
        );
    },
    initUserMarker(current) {
        let image = {
            url: 'images/amber.png',
            scaledSize: new google.maps.Size(40, 60),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(0, 20)
        };
        let marker = new google.maps.Marker({
            map: this.map,
            position: current,
            icon: image
        });
        this.userMarker = marker;
    },
    initStoreMarker(_redius) {
        let _this = this;
        let pdata = {
            radius: _redius,
            userLocation: _this.userLocation,
            storeTypes: _this.storeTypes
        };
        AjaxCall('post', '/api/stores/getNearbyPlace', pdata, function(ret) {
            console.log('get nearby place', ret);
            // _this.removeMarkers();
            _this.marker_create(ret.data);
        }, null);
    },
    marker_create(list) {
        for (var key in list) {
            let marker = new STORE(list[key], this);
            this.store_markers.push(marker);
        }
        function STORE(place, _this) {
            var placeLoc = new google.maps.LatLng(place.lat, place.lng);
            let getStoreUrl = function() {
                if (place.comments.length > 0) {
                    return 'images/black-shop.jpg';
                } else {
                    return 'images/black_dot.png';
                }
            }
            let image = {
                url: getStoreUrl(),
                scaledSize: new google.maps.Size(30, 30),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(0, 20)
            };
            this.marker = new google.maps.Marker({
                map: _this.map,
                icon: image,
                position: placeLoc
            });

            google.maps.event.addListener(this.marker, 'click', () => {
            	console.log('Click Marker:', this.marker);
                if (_this.selectedMarker != null) {
                    _this.selectedMarker.setAnimation(null);
                }
                if (this.marker.getAnimation() === undefined) {
                    this.marker.setAnimation(null);
                }

                _this.selectedMarker = this.marker;

                // _this.set('selectedMarker', marker);
                // _this.set('selectedPlace', place);
                // _this.set('show_groupSidebar', false);
                // _this.set('show_rightSidebar', true);

                if (this.marker.getAnimation() !== null) {
                    this.marker.setAnimation(null);
                } else {
                    this.marker.setAnimation(google.maps.Animation.BOUNCE);
                }
                // _this.infowindow.setContent('<cus-content></cus-content>');
                // _this.infowindow.open(map, this);
                console.log('marker position:', this.marker.position);
                // _this.map.panTo(marker.position);
                _this.map.panToWithOffset(this.marker.position, 0, 0);
                // Event.fire('updateComments', place.comments);
            });
            return this.marker;
        }
    },
    updateGooglePlaces() {
        let _this = this;
        let service = new google.maps.places.PlacesService(this.map);
        let request = {
            location: this.userLocation,
            radius: this.searchRadius,
            types: this.storeTypes
        };
        service.nearbySearch(request, callback);

        function callback(results, status) {
            console.log('google service\'s result:', results);
            if (status == google.maps.places.PlacesServiceStatus.OK) {
                let pdata = {
                    results: results
                };
                AjaxCall('post', '/api/stores', pdata, function(ret) {
                    if (ret.update) {
                        console.log('update new google place!', ret);
                        // _this.removeMarkers();
                        // _this.initNearByMarker(_this.searchRadius);
                    }
                }, null);
            }
        }
    },

    createMarker(place, _this) {
        var placeLoc = new google.maps.LatLng(place.lat, place.lng);
        let getStoreUrl = function() {
            if (place.comments.length > 0) {
                return 'images/black-shop.jpg';
            } else {
                return 'images/bluemarker.ico';
            }
        }
        let image = {
            url: getStoreUrl(),
            scaledSize: new google.maps.Size(30, 30),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(0, 20)
        };
        var marker = new google.maps.Marker({
            map: _this.map,
            icon: image,
            position: placeLoc
        });

        google.maps.event.addListener(marker, 'click', function() {
            if (_this.selectedMarker != null) {
                _this.selectedMarker.setAnimation(null);
            }
            if (marker.getAnimation() === undefined) {
                marker.setAnimation(null);
            }

            _this.set('selectedMarker', marker);
            _this.set('selectedPlace', place);
            _this.set('show_groupSidebar', false);
            _this.set('show_rightSidebar', true);

            if (marker.getAnimation() !== null) {
                marker.setAnimation(null);
            } else {
                marker.setAnimation(google.maps.Animation.BOUNCE);
            }
            _this.infowindow.setContent('<cus-content></cus-content>');
            _this.infowindow.open(map, this);
            console.log('marker position:', marker.position);
            // _this.map.panTo(marker.position);
            _this.map.panToWithOffset(marker.position, 0, 150);
            Event.fire('updateComments', place.comments);
        });

        return marker;
    }
}
