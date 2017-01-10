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

        methods: {
            /*onCouponApplied(){
                console.log('mapcontent oncoupon applied!');
            }*/
        },

        components: {
            Coupon
        },

        created() {
            /*Event.listen('applied',function(){
                console.log('listend event on mapcontent');
            })*/

            var checkFlag = () => {
                if(window.loaded === undefined) {
                   window.setTimeout(checkFlag, 100);
                } else {
                    map = new google.maps.Map(document.getElementById('map'), {
                            center: {lat: -34.397, lng: 150.644},
                            zoom: 16
                        }
                    );
                    var current = {};
                    navigator.geolocation.getCurrentPosition(function(location) {
                        current = { 
                            lat:location.coords.latitude, 
                            lng:location.coords.longitude 
                        };
                        map.setCenter(current);
                    });
                }
            }
            checkFlag();
        }
    }

</script>



