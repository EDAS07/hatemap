<template>
    <div class="container">
        <div class="row">
            <div class="col-md-8 col-md-offset-2">
                <div class="panel panel-default">
                    <div class="panel-heading">Hate Food</div>

                    <div class="panel-body">
                        <!-- <Coupon @applied="onCouponApplied"></Coupon> -->
                        <div id="map"></div>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
</template>


<script>

    import Coupon from './Coupon.vue';

    export default {

        data: function(){
            return {
                map: null,
                geoLocation: null,
            };
        },

        methods: {
            onCouponApplied(){
                console.log('mapcontent oncoupon applied!');
            },

            initMap(){
                this.map = new google.maps.Map(document.getElementById('map'), {
                        center: {lat: 23.848123, lng: 121.043316},
                        zoom: 7,
                        mapTypeId: google.maps.MapTypeId.HYBRID
                    }
                );
            },

            setGeoLocation(lat,lng){
                this.geoLocation = new google.maps.LatLng(lat, lng);
            },

            initPlaces(_redius, _types){

                let request = {
                    location: this.geoLocation,
                    radius: _redius,
                    types: _types
                };

                let map = this.map
                let infowindow = new google.maps.InfoWindow();
                let service = new google.maps.places.PlacesService(this.map);
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

            initGeoLocation(){
                let map = this.map;
                let setGeoLocation = this.setGeoLocation;
                let initPlaces = this.initPlaces;
                navigator.geolocation.getCurrentPosition(function(location) {
                    let current = { 
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
            Coupon
        },

        created() {        
            var checkFlag = () => {
                if(window.loaded === undefined) {
                   window.setTimeout(checkFlag, 100);
                } else {
                    this.initMap();
                    this.initGeoLocation();

                }
            }
            checkFlag();


            /*Event.listen('applied',function(){
                console.log('listend event on mapcontent');
            })*/
        }
    }

</script>



