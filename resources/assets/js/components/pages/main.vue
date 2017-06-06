
<template>
	<div class="main-container">
		<utilityBar></utilityBar>
		<storeListBar></storeListBar>
		<cusMap></cusMap>
		<searchBoard v-if="showSearchBoard" :showModal="showSearchBoard" @update:showModal="val => showSearchBoard = val" @showSearchByKeyword="showSearchByKeyword = true"></searchBoard>
		<searchByKeyword v-if="showSearchByKeyword" :showModal="showSearchByKeyword" @update:showModal="val => showSearchByKeyword = val"></searchByKeyword>
	</div>
</template>

<script>
	import cusMap from '@components/ui/cus-map.vue';
	import utilityBar from '@components/ui/utility-bar.vue';
	import storeListBar from '@components/ui/store-list-bar.vue';

	import searchBoard from '@components/ui/dialog/search-board.vue';
	import searchByKeyword from '@components/ui/dialog/search-by-keyword.vue';

	export default {
		data: function(){
			return {
				showSearchBoard: false,
                showSearchByKeyword: false
			}
		},
		methods:{
			
		},

		components:{
			cusMap, utilityBar, storeListBar, searchBoard, searchByKeyword
		},

		mounted(){
			var self = this;
			Event.listen('showSearchBoard',function(){
                self.showSearchBoard = true;
            })
			Event.listen('showSearchByKeyword',function(){
                self.showSearchByKeyword = true;
            })
		}
	}
</script>