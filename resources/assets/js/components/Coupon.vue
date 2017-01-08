<template>
	<input placeholder="Enter coupon" @blur="onCouponApplied">
</template>

<script>
	export default {
		methods:{
			onCouponApplied(){
				Event.fire('applied');
			}
		}
	}
</script>