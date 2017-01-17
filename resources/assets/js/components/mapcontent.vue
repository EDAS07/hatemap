<template>
    <div class="container">
        <div class="row">
            <div class="col-md-8">
                <div class="panel panel-default">
                    <div class="panel-heading">Hate Food</div>

                    <div class="panel-body">
                        <!-- <Coupon @applied="onCouponApplied"></Coupon> -->
                        <div id="map"></div>
                    </div>
                </div>
            </div>
            <placeInfo :place=selectedPlace ></placeInfo>
        </div>
    </div>
</template>


<script>

    import Coupon from './Coupon.vue';
    import placeInfo from './placeInfo.vue';
    import InfoWindow from './InfoWindow.vue';

    export default {

        data: function(){
            return {
                map: null,
                userLocation: null,
                userMarker: null,
                infowindow: null,
                storeTypes: ['food'],
                searchRadius: '1000',
                selectedPlace: {
                    name: '請在地圖選擇店家',
                    vicinity: '無'
                }
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

            initInfoWindow(){
                this.infowindow = new google.maps.InfoWindow();
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

            initPlaces(_redius){

                let map = this.map;
                let userLocation = this.userLocation;
                let infowindow = this.infowindow;
                let storeTypes = this.storeTypes;
                let selectedMarker = null;
                let getSelectedPlace = this.getSelectedPlace;
                let setSelectedPlace = this.setSelectedPlace;
                let userMarker = this.userMarker;

                updateGooglePlaces();
                initNearByMarker();
                initMapEvent();
                function updateGooglePlaces(){
                    let service = new google.maps.places.PlacesService(map);
                    let request = {
                        location: userLocation,
                        radius: _redius,
                        types: storeTypes
                    };
                    service.nearbySearch(request, callback);
                    function callback(results, status) {
                        if (status == google.maps.places.PlacesServiceStatus.OK) {
                            let pdata = {
                                results: results
                            };
                            AjaxCall('post', '/api/stores', pdata, function(ret){
                                console.log('google init success!');
                            } ,null);
                        }
                    }
                }

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
                    } ,null);
                }

                function createMarker(place) {
                    var placeLoc = new google.maps.LatLng(place.lat, place.lng);
                    var marker = new google.maps.Marker({
                        map: map,
                        position: placeLoc
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
                        setSelectedPlace(place);
                        console.log('selected place:', place);

                        if(marker.getAnimation() !== null){
                            marker.setAnimation(null);
                        }else{
                            marker.setAnimation(google.maps.Animation.BOUNCE);
                        }
                        infowindow.setContent('<cus-content></cus-content>');
                        infowindow.open(map, this);
                        map.panTo(marker.position);

                        AjaxCall('get', '/api/userOpinion/' + place.place_id, null, function(ret){
                            console.log('ret data: ', ret);
                            Event.fire('updateComments', ret.data);
                        } ,null);
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
                            'width': '232px',
                            'height': '129px'
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
                    _this.initInfoWindow();
                    _this.initUserMarker(current);
                    _this.initPlaces(_this.searchRadius);

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
            Coupon, placeInfo
        },

        mounted() {        
            var checkFlag = () => {
                if(window.loaded === undefined) {
                   window.setTimeout(checkFlag, 100);
                } else {
                    this.initMap();
                    this.initMapContent();

                }
            }
            checkFlag();


            /*Event.listen('applied',function(){
                console.log('listend event on mapcontent');
            })*/
        }
    }

</script>



