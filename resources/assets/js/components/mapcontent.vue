

<template>
    <div class="container" style="padding: 0;">
        <div class="row" style="margin: 0;">
            <!-- <div class="col-md-8">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <div class="inline-div">Hate Food</div>
                        <div v-show="map_loading" class="inline-div">
                            <img src="images/spin_box.gif" style="height: 30px">
                        </div>
                        <div class="btn-group pull-right radius-group" role="group" aria-label="...">
                            <button type="button" class="btn btn-default" v-bind:class="{ 'btn-success': searchRadius == 300 }" @click="setRadius(300)" >0.3m</button>
                            <button type="button" class="btn btn-default" v-bind:class="{ 'btn-success': searchRadius == 500 }" @click="setRadius(500)">0.5km</button>
                            <button type="button" class="btn btn-default" v-bind:class="{ 'btn-success': searchRadius == 1000 } " @click="setRadius(1000)">1km</button>
                        </div>
                    </div>

                    <div class="panel-body">
                        <input id="pac-input" class="controls" type="search" v-model="searchText" placeholder="搜尋店家">
                        <div id="map"></div>
                    </div>
                </div>
            </div> -->
            <div style="width: 100%;height:100%">
                <input id="pac-input" class="controls" type="search" v-model="searchText" placeholder="搜尋店家">
                <div id="map"></div>
            </div>
            <placeInfo :place=selectedPlace v-show="show_rightSidebar"></placeInfo>
        </div>
    </div>
</template>


<script>

    import placeInfo from './placeInfo.vue';
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
                selectedMarker: null,
                markers: [],
                searchPlaces: [],
                show_rightSidebar: false
            };
        },

        methods: {

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
                var centerControlDiv = document.createElement('div');
                var centerControl = new CenterControl(centerControlDiv, map);
                centerControlDiv.firstChild.addEventListener('click', function() {
                    // _this.initMapContent();
                    _this.map.setZoom(17);
                    _this.map.panTo(_this.userLocation);
                });
                centerControlDiv.index = 1;
                this.map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(centerControlDiv);
                // Create the search box and link it to the UI element.
                var input = document.getElementById('pac-input');
                var searchBox = new google.maps.places.SearchBox(input);
                this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

                this.map.addListener('bounds_changed', function() {
                    searchBox.setBounds(_this.map.getBounds());
                });

                let markers = [];

                searchBox.addListener('places_changed', function() {
                    let places = searchBox.getPlaces();
                    _this.setSearchPlaces(places);
                    if (places.length == 0) {
                      return;
                    }

                    _this.removeMarkers();
                    _this.initSearchPlacesMarkers();

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

            setShow_rightSidebar(data){
                this.show_rightSidebar = data;
            },

            initSearchPlacesMarkers(){
                let _this = this;
                let pdata = {
                    places: _this.searchPlaces
                };
                let markers = [];
                AjaxCall('post', '/api/stores/updateSearchPlaces', pdata, function(ret){
                    console.log('get user search places:', ret);
                    for(var key in ret.data){
                        let marker = createMarker(ret.data[key], _this);
                        markers.push(marker);
                    }
                    _this.setMarkers(markers);
                } ,null);
            },

            initInfoWindow(){
                this.infowindow = new google.maps.InfoWindow();
            },

            setSearchPlaces(data){
                this.searchPlaces = data;
            },

            setMapLoading(bool){
                this.map_loading = bool;
            },

            setRadius(radius){
                this.searchRadius = radius;
                this.removeMarkers();
                this.initNearByMarker(this.searchRadius);
                this.searchPlaces = [];
                this.searchText = '';
            },

            setUserLocation(lat,lng){
                this.userLocation = new google.maps.LatLng(lat, lng);
            },

            getSelectedPlace(){
                return this.selectedPlace;
            },

            setSelectedPlace(data){
                this.selectedPlace = data;
            },

            setMarkers(data){
                this.markers = data;
            },

            setSelectedMarker(data){
                this.selectedMarker = data;
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
                let markers = this.markers;
                let pdata = {
                    radius: _redius,
                    userLocation: _this.userLocation,
                    storeTypes: _this.storeTypes
                };
                AjaxCall('post', '/api/stores/getNearbyPlace', pdata, function(ret){
                    console.log('get nearby place', ret);
                    for(var key in ret.data){
                        let marker = new createMarker(ret.data[key], _this);
                        markers.push(marker);
                    }
                    _this.setMarkers(markers);
                } ,null);

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
                _this.initInfoWindow();

                function init(lat, lng){
                    let current = { 
                        lat: lat, 
                        lng: lng
                    };
                    
                    _this.searchPlaces = [];
                    _this.searchText = '';
                    _this.setUserLocation(lat, lng);
                    _this.updateGooglePlaces();
                    _this.removeMarkers();
                    _this.initUserMarker(current);

                    let init_MapEvent = new initMapEvent(_this);
                    _this.initNearByMarker(_this.searchRadius);

                    _this.map.panTo(current);
                    _this.map.setZoom(17);
                    _this.map.setMapTypeId(google.maps.MapTypeId.ROADMAP);
                    
                }

                _this.setMapLoading(true);
                navigator.geolocation.getCurrentPosition(function(location) {
                    console.log('get navigator location success!');
                    _this.setMapLoading(false);
                    init(location.coords.latitude, location.coords.longitude);
                },
                function(){
                    console.log('get navigator location fail!');
                    _this.setMapLoading(false);
                    init(25.083949, 121.558636);
                },
                    {maximumAge:0, timeout:10000, enableHighAccuracy:true}
                );
            }
        },

        components: {
            placeInfo
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
                _this.removeMarkers();
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

        }
    }

</script>



