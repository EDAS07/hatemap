
<template>
    <div ref="map"></div>
</template>

<script>

    export default {
        data: function(){
            return {
                map: null
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
            initMap: function(){
                this.map = new google.maps.Map(this.$refs.map, {
                        center: {lat: 23.848123, lng: 121.043316},
                        zoom: 7,
                        mapTypeId: google.maps.MapTypeId.HYBRID,
                        mapTypeControl: false,
                        streetViewControl: false
                    }
                );
            }
        },
        mounted: function(){
            this.init();
        }
    }
</script>