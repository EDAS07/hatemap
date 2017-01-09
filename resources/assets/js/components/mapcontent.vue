<template>
    <div class="container">
        <div class="row">
            <div class="col-md-8 col-md-offset-2">
                <div class="panel panel-default">
                    <div class="panel-heading">Hate Map</div>

                    <div class="panel-body">
                        <Coupon @applied="onCouponApplied"></Coupon>
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
            onCouponApplied(){
                console.log('mapcontent oncoupon applied!');
            }
        },

        components: {
            Coupon
        },

        created() {
            Event.listen('applied',function(){
                console.log('listend event on mapcontent');
            })
        }
    }
</script>
