
<template>
	<div class="main-container">
		<utilityBar></utilityBar>
		<storeListBar></storeListBar>
		<cusMap></cusMap>
	</div>
</template>

<script>
	import cusMap from '@components/ui/cus-map.vue';
	import utilityBar from '@components/ui/utility-bar.vue';
	import storeListBar from '@components/ui/store-list-bar.vue';

	export default {
		data: function(){
			return {
				// comment: ''
			}
		},
		methods:{
			
		},

		components:{
			cusMap, utilityBar, storeListBar
		},

		mounted(){
			
		}
	}
</script>