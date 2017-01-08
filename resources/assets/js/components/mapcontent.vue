<template>
    <div class="container">
        <div class="row">
            <div class="col-md-8 col-md-offset-2">
                <div class="panel panel-default">
                    <div class="panel-heading">Hate Map</div>

                    <div class="panel-body">
                        <coupon @applied="onCouponApplied"></coupon>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
</template>


<script>

    export default {

        methods: {
            onCouponApplied(){
                console.log('mapcontent oncoupon applied!');
            }
        },

        created() {
            Event.listen('applied',function(){
                console.log('listend event on mapcontent');
            })
        }
    }
</script>
