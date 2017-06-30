
<template>
    <div class="map-container" ref="map"></div>
</template>

<script>
    import mapManager from '@components/services/map';

    export default {
        data: function(){
            return {
                
            }
        },
        methods:{
        },
        mounted: function(){
            mapManager.init(this);
        }
    }
</script>