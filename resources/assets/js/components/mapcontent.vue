<template>
    <div class="container">
        <div class="row">
            <div class="col-md-8">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <div class="inline-div">Hate Food</div>
                        <div v-show="map_loading" class="inline-div">
                            <img src="images/spin_box.gif" style="height: 30px">
                        </div>
                        <div class="btn-group" style="visibility: hidden" >
                            <button type="button" class="btn btn-default">hidden</button>
                        </div>
                        <div class="btn-group pull-right radius-group" role="group" aria-label="...">
                            <button type="button" class="btn btn-default" v-bind:class="{ 'btn-success': searchRadius == 300 }" @click="setRadius(300)" >0.3m</button>
                            <button type="button" class="btn btn-default" v-bind:class="{ 'btn-success': searchRadius == 500 }" @click="setRadius(500)">0.5km</button>
                            <button type="button" class="btn btn-default" v-bind:class="{ 'btn-success': searchRadius == 1000 } " @click="setRadius(1000)">1km</button>
                        </div>
                    </div>

                    <div class="panel-body">
                        <div id="map"></div>
                    </div>
                </div>
            </div>
            <placeInfo :place=selectedPlace ></placeInfo>
        </div>
    </div>
</template>


<script>

    import placeInfo from './placeInfo.vue';
    import InfoWindow from './InfoWindow.vue';

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
                selectedPlace: {
                    name: '請在地圖選擇店家',
                    vicinity: '無'
                },
                markers: []
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
                    _this.initMapContent();
                });
                centerControlDiv.index = 1;
                this.map.controls[google.maps.ControlPosition.RIGHT_TOP].push(centerControlDiv);
                
            },

            initInfoWindow(){
                this.infowindow = new google.maps.InfoWindow();
            },

            setMapLoading(bool){
                this.map_loading = bool;
            },

            setRadius(radius){
                this.searchRadius = radius;
                this.removeMarkers();
                this.initPlaces(this.searchRadius);
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
                            console.log('google init success!', ret);
                            if(ret.update){
                                console.log('update new google place!');
                                _this.initPlaces(_this.searchRadius);
                            }
                        } ,null);
                    }
                }
            },

            removeMarkers(){
                for(var key in this.markers){
                    this.markers[key].setMap(null);
                }
            },

            initPlaces(_redius){
                this.initInfoWindow();

                let map = this.map;
                let userLocation = this.userLocation;
                let infowindow = this.infowindow;
                let storeTypes = this.storeTypes;
                let selectedMarker = null;
                let getSelectedPlace = this.getSelectedPlace;
                let setSelectedPlace = this.setSelectedPlace;
                let userMarker = this.userMarker;
                let markers = this.markers;
                let setMarkers = this.setMarkers;


                initNearByMarker();
                initMapEvent();

                function initNearByMarker(){
                    let pdata = {
                        radius: _redius,
                        userLocation: userLocation,
                        storeTypes: storeTypes
                    };
                    AjaxCall('post', '/api/stores/getNearbyPlace', pdata, function(ret){
                        console.log('nearby get success:', ret);
                        for(var key in ret.data){
                            createMarker(ret.data[key]);
                        }
                        setMarkers(markers);
                    } ,null);
                }

                function createMarker(place) {
                    var placeLoc = new google.maps.LatLng(place.lat, place.lng);
                    let getStoreUrl = function(){
                        if(place.comments.length > 0){
                            return 'images/black-shop.jpg';
                        }else{
                            return 'images/bluemarker.ico';    
                        }
                    }
                    let image = {
                        url: getStoreUrl(),
                        scaledSize: new google.maps.Size(30, 30),
                        origin: new google.maps.Point(0,0),
                        anchor: new google.maps.Point(0,20)
                    };
                    var marker = new google.maps.Marker({
                        map: map,
                        icon: image,
                        position: placeLoc
                    });
                    markers.push(marker);
                    
                    google.maps.event.addListener(marker, 'click', function() {
                        if(selectedMarker != null){
                            selectedMarker.setAnimation(null);
                        }
                        if(marker.getAnimation() === undefined){
                            marker.setAnimation(null);
                        }
                        userMarker.setAnimation(null);
                        
                        selectedMarker = marker;
                        setSelectedPlace(place);
                        console.log('selected place:', place.comments);

                        if(marker.getAnimation() !== null){
                            marker.setAnimation(null);
                        }else{
                            marker.setAnimation(google.maps.Animation.BOUNCE);
                        }
                        infowindow.setContent('<cus-content></cus-content>');
                        infowindow.open(map, this);
                        map.panTo(marker.position);
                        Event.fire('updateComments', place.comments);
                        /*AjaxCall('get', '/api/userOpinion/' + place.place_id, null, function(ret){
                            console.log('ret data: ', ret);
                            Event.fire('updateComments', ret.data);
                        } ,null);*/
                    });
                }

                function initMapEvent(){
                    google.maps.event.addListener(map, 'click',function(){
                        infowindow.close();
                        if(selectedMarker != null) selectedMarker.setAnimation(null)
                    })

                    google.maps.event.addListener(map, 'drag',function(){
                        let iwOuter = $('.gm-style-iw');
                        iwOuter.parent().parent().css({
                            'display': 'none'
                        });
                    })

                    google.maps.event.addListener(map, 'dragend',function(){
                        let iwOuter = $('.gm-style-iw');
                        iwOuter.parent().parent().css({
                            'display': 'block'
                        });
                    })

                    google.maps.event.addListener(infowindow, 'closeclick',function(){
                        selectedMarker.setAnimation(null);
                    })

                    google.maps.event.addListener(infowindow, 'domready',function(){
                        let iwOuter = $('.gm-style-iw');
                        let iwBackground = iwOuter.prev();
                        iwBackground.css({
                            'z-index': '2'
                        });
                        iwBackground.children(':nth-child(2)').css({'display':'none'});
                        iwBackground.children(':nth-child(4)').css({'display':'none'});
                        let iwCloseBtn = iwOuter.next();
                        iwOuter.css({
                            'top': '43px',
                            'z-index': '1'
                        });
                        iwCloseBtn.css({
                            'right': '47px',
                            'top': '53px'
                        });

                        let cusContent = new Vue({
                            el: 'cus-content',
                            data: {
                                place: getSelectedPlace()
                            },
                            components: {
                                InfoWindow
                            },
                            template: '<InfoWindow :place=place></InfoWindow>',
                            methods: {

                            }
                        });
                    })
                }

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

                function init(lat, lng){
                    let current = { 
                        lat: lat, 
                        lng: lng
                    };
                    
                    _this.setUserLocation(lat, lng);
                    _this.updateGooglePlaces();
                    _this.removeMarkers();
                    _this.initUserMarker(current);
                    _this.initPlaces(_this.searchRadius);

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
                // console.log('listend event on mapcontent!', data);
                _this.removeMarkers();
                _this.initPlaces(_this.searchRadius);
            })

        }
    }

</script>



