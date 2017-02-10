
<template>
    <div class="container" style="padding: 0;">
        <div class="container map-container">
            <div class="row" style="margin: 0;">
                <div style="width: 100%;height:100%">
                    <transition name="searchBar">
                        <div class="search-bar" v-show="!show_rightSidebar && !show_groupSidebar">
                            <input id="pac-input" class="controls" type="search" v-model="searchText" placeholder="搜尋店家">
                            <div class="search-button" v-on:click="onSubmitSearch()"><img src="images/search-button-simple.jpg"></div>
                        </div>
                    </transition>
                    <div id="map"></div>
                </div>
            </div>
        </div>
        <transition name="comments">
            <placeInfo :place=selectedPlace :group=selectedGroup v-show="show_rightSidebar"></placeInfo>
        </transition>
        <transition name="comments">
            <groupInfo :group=selectedGroup v-show="show_groupSidebar"></groupInfo>
        </transition>
    </div>
</template>


<script>

    import placeInfo from './placeInfo.vue';
    import groupInfo from './groupInfo.vue';
    // import InfoWindow from './InfoWindow.vue';

    export default {

        data: function(){
            return {
                map_loading: false,
                map: null,
                userLocation: null,
                userMarker: null,
                infowindow: null,
                storeTypes: ['food'],
                searchRadius: '500',
                searchText: '',
                selectedPlace: {
                    name: '請在地圖選擇店家',
                    vicinity: '無'
                },
                selectedGroup: [],
                selectedMarker: null,
                markers: [],
                searchPlaces: [],
                show_rightSidebar: false,
                show_groupSidebar: false,
                searchBox: null,
                tmpGroupStore: null
            };
        },

        methods: {
            onSubmitSearch(event){
                console.log('click search');
                this.removeMarkers();
                var input = document.getElementById('pac-input');
                google.maps.event.trigger(input, 'focus')
                google.maps.event.trigger(input, 'keydown', { keyCode: 13 });
            },

            initMap(){
                let _this = this;
                this.map = new google.maps.Map(document.getElementById('map'), {
                        center: {lat: 23.848123, lng: 121.043316},
                        zoom: 7,
                        mapTypeId: google.maps.MapTypeId.HYBRID,
                        mapTypeControl: false,
                        streetViewControl: false
                    }
                );

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

                var centerControlDiv = document.createElement('div');
                var centerControl = new CenterControl(centerControlDiv, map);
                centerControlDiv.firstChild.addEventListener('click', function() {
                    _this.map.setZoom(17);
                    _this.map.panTo(_this.userLocation);
                });
                centerControlDiv.index = 1;
                this.map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(centerControlDiv);
                // Create the search box and link it to the UI element.
                var input = document.getElementById('pac-input');
                _this.searchBox = new google.maps.places.SearchBox(input);
                // this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

                this.map.addListener('bounds_changed', function() {
                    _this.searchBox.setBounds(_this.map.getBounds());
                });

                let markers = [];

                _this.searchBox.addListener('places_changed', function() {
                    let places = _this.searchBox.getPlaces();
                    _this.set('searchPlaces', places);
                    if (places.length == 0) {
                      return;
                    }

                    console.log('place changed!');

                    // _this.removeMarkers();
                    // _this.initSearchPlacesMarkers();

                    var bounds = new google.maps.LatLngBounds();
                    places.forEach(function(place) {
                      if (place.geometry.viewport) {
                        bounds.union(place.geometry.viewport);
                      } else {
                        bounds.extend(place.geometry.location);
                      }
                    });
                    _this.map.fitBounds(bounds);
                });
            },

            initSearchPlacesMarkers(){
                let _this = this;
                let pdata = {
                    places: _this.searchPlaces
                };
                // let markers = [];
                AjaxCall('post', '/api/stores/updateSearchPlaces', pdata, function(ret){
                    console.log('get user search places:', ret);
                    _this.removeMarkers();
                    if(_this.map.getZoom() > 16){
                        console.log('create 50');
                        _this.marker_create(ret.group, '50');
                    }else if(_this.map.getZoom() > 14){
                        console.log('create 100');
                        _this.marker_create(ret.group, '100');
                    }else if(_this.map.getZoom() > 13){
                        console.log('create 300');
                        _this.marker_create(ret.group, '300');
                    }else {
                        console.log('create 1000');
                        _this.marker_create(ret.group, '1000');
                    }

                    // _this.set('markers', markers);
                } ,null);
            },

            initInfoWindow(){
                this.infowindow = new google.maps.InfoWindow();
            },

            setRadius(radius){
                this.searchRadius = radius;
                this.removeMarkers();
                this.initNearByMarker(this.searchRadius);
                this.searchPlaces = [];
                this.searchText = '';
            },

            get(key){
                return this[key];
            },
            set(key, data){
                this[key] = data;
            },

            updateGooglePlaces(){
                let _this = this;
                let service = new google.maps.places.PlacesService(this.map);
                let request = {
                    location: this.userLocation,
                    radius: this.searchRadius,
                    types: this.storeTypes
                };
                service.nearbySearch(request, callback);
                function callback(results, status) {
                    if (status == google.maps.places.PlacesServiceStatus.OK) {
                        let pdata = {
                            results: results
                        };
                        AjaxCall('post', '/api/stores', pdata, function(ret){
                            if(ret.update){
                                console.log('update new google place!', ret);
                                _this.removeMarkers();
                                _this.initNearByMarker(_this.searchRadius);
                            }
                        } ,null);
                    }
                }
            },

            removeMarkers(){
                this.markers.forEach(function(marker) {
                    marker.setMap(null);
                });
                this.markers = [];
            },

            initNearByMarker(_redius){
                let _this = this;
                
                let pdata = {
                    radius: _redius,
                    userLocation: _this.userLocation,
                    storeTypes: _this.storeTypes
                };
                AjaxCall('post', '/api/stores/getNearbyPlace', pdata, function(ret){
                    console.log('get nearby place', ret);
                    _this.removeMarkers();
                    if(_this.map.getZoom() > 16){
                        // console.log('create 50');
                        _this.marker_create(ret.group, '50');
                    }else if(_this.map.getZoom() > 14){
                        // console.log('create 100');
                        _this.marker_create(ret.group, '100');
                    }else if(_this.map.getZoom() > 13){
                        // console.log('create 300');
                        _this.marker_create(ret.group, '300');
                    }else {
                        // console.log('create 1000');
                        _this.marker_create(ret.group, '1000');
                    }
                    
                    let objDiv = document.getElementById("side-panel");
                    objDiv.scrollTop = objDiv.scrollHeight;
                } ,null);

            },

            marker_create(group, value){
                let _this = this;
                let markers = _this.markers;
                for(var key in group[value]){
                    if(group[value][key]['data'].length == 1){
                        let marker = new createMarker(group[value][key]['data'][0], _this);
                        markers.push(marker);
                    }else{
                        let marker = new createGroupMarker(group[value][key], _this);
                        markers.push(marker);
                    }
                }
                _this.set('markers', markers);
            },            

            initUserMarker(current){
                let image = {
                    url: 'images/amber.png',
                    scaledSize: new google.maps.Size(40, 60),
                    origin: new google.maps.Point(0,0),
                    anchor: new google.maps.Point(0,20)
                };
                let marker = new google.maps.Marker({
                    map: this.map,
                    position: current,
                    icon: image
                });
                this.userMarker = marker;
            },

            initMapContent(){
                let _this = this;
                _this.set('infowindow', new google.maps.InfoWindow());

                function init(lat, lng){
                    let current = { 
                        lat: lat, 
                        lng: lng
                    };
                    
                    _this.searchPlaces = [];
                    _this.searchText = '';
                    _this.set('userLocation', new google.maps.LatLng(lat, lng));
                    _this.updateGooglePlaces();
                    
                    _this.initUserMarker(current);

                    let init_MapEvent = new initMapEvent(_this);
                    _this.initNearByMarker(_this.searchRadius);

                    _this.map.panTo(current);
                    _this.map.setZoom(17);
                    _this.map.setMapTypeId(google.maps.MapTypeId.ROADMAP);
                    
                }

                _this.set('map_loading', true);
                navigator.geolocation.getCurrentPosition(function(location) {
                    console.log('get navigator location success!');
                    _this.set('map_loading', false);
                    init(location.coords.latitude, location.coords.longitude);
                },
                function(){
                    console.log('get navigator location fail!');
                    _this.set('map_loading', false);
                    init(25.083949, 121.558636);
                },
                    {maximumAge:0, timeout:10000, enableHighAccuracy:true}
                );
            }
        },

        components: {
            placeInfo, groupInfo
        },

        mounted() {

            let _this = this;

            var checkFlag = () => {
                if(window.loaded === undefined) {
                   window.setTimeout(checkFlag, 100);
                } else {
                    this.initMap();
                    this.initMapContent();

                }
            }
            checkFlag();

            Event.listen('updateMarkers',function(data){

                if(_this.searchPlaces.length == 0){
                    _this.initNearByMarker(_this.searchRadius);
                }else{
                    _this.initSearchPlacesMarkers();
                }
            })

            Event.listen('updateRadius',function(data){
                _this.setRadius(data);
                console.log('radius:', data);
            })

            Event.listen('addStoreMarker',function(data){
                let markers = _this.markers;
                if(_this.tmpGroupStore != null){
                    console.log('tmp store null');
                    _this.tmpGroupStore.setMap(null);
                }

                let marker = createMarker(data, _this);
                markers.push(marker);
                _this.set('markers', markers);
                _this.set('tmpGroupStore', marker);

                google.maps.event.trigger(_this.tmpGroupStore, 'click');
            })

            Event.listen('showGroupList',function(data){
                _this.set('show_rightSidebar', false);
                _this.set('show_groupSidebar', true);
            })


        }
    }

</script>



