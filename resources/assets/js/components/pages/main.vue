
<template>
	<div class="main-container">
		<utilityBar></utilityBar>
		<cusMap></cusMap>
	</div>
</template>

<script>
	import cusMap from '@components/ui/cus-map.vue';
	import utilityBar from '@components/ui/utility-bar.vue';

	export default {
		data: function(){
			return {
				// comment: ''
			}
		},
		methods:{
			
		},

		components:{
			cusMap, utilityBar
		},

		mounted(){
			// console.log('aaaaa:', this.selectGroup);
		}
	}
</script>