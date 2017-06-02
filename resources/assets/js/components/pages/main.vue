
<template>
	<div class="main-container">
		<cusMap style="width: 100%;height: 100%;"></cusMap>
	</div>
</template>

<script>
	import cusMap from '@components/ui/cus-map.vue';

	export default {
		data: function(){
			return {
				// comment: ''
			}
		},
		methods:{
			
		},

		components:{
			cusMap
		},

		mounted(){
			// console.log('aaaaa:', this.selectGroup);
		}
	}
</script>