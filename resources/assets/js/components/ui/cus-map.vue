
<template>
    <div class="map-container" ref="map"></div>
</template>

<script>
    export default {
        data: function(){
            return {
                map: null,
                userLocation : null,
                userMarker: null,
                searchRadius: '500',
                storeTypes: ['food'],
            }
        },
        methods:{
            init: function(){
                if(window.loaded === true) {
                    this.initMap();
                } else {
                    window.setTimeout(() => {
                        this.init();
                    }, 100); 
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
                    console.log('google service\'s result:', results);
                    if (status == google.maps.places.PlacesServiceStatus.OK) {
                        let pdata = {
                            results: results
                        };
                        AjaxCall('post', '/api/stores', pdata, function(ret){
                            if(ret.update){
                                console.log('update new google place!', ret);
                                // _this.removeMarkers();
                                // _this.initNearByMarker(_this.searchRadius);
                            }
                        } ,null);
                    }
                }
            },
            initMap: function(){
                let _this = this;
                //Initialize new map and geo-locate to Taiwan.
                this.map = new google.maps.Map(this.$refs.map, {
                        center: {lat: 23.848123, lng: 121.043316},
                        zoom: 7,
                        mapTypeId: google.maps.MapTypeId.HYBRID,
                        mapTypeControl: false,
                        streetViewControl: false
                    }
                );

                function init(lat, lng){
                    let current = { 
                        lat: lat, 
                        lng: lng
                    };

                    _this.userLocation = new google.maps.LatLng(lat, lng);
                    _this.updateGooglePlaces();
                    
                    _this.initUserMarker(current);

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
                function(){
                    console.log('get navigator location fail!');
                    init(25.083949, 121.558636);
                },
                    {maximumAge:0, timeout:10000, enableHighAccuracy:true}
                );
            }
        },
        mounted: function(){
            this.init();
        }
    }
</script>