
<template>
    <div class="panel panel-default side-panel" id="side-panel">
        <div class="panel-heading">店家列表</div>

        <div class="panel-body">
            <div class="list-group" v-for="store in stores">
            	<div class="list-group-item list-group-item-info" @click="showStore(store)" >{{ store.name }}</div>
            </div>
        </div>
    </div>
</template>

<script>
	
	export default{
		props: ['group'],
		data: function(){
			return {
				stores: ''
			}
		},

		methods: {
			updateStores(data){
                this.stores = data.data;
                // console.log('stores:', data);
            },

            showStore(store){
                console.log('store:', store);
                Event.fire('addStoreMarker', store);
            }
		},

		mounted(){
			let _this = this;

            Event.listen('updateGroup',function(data){
                _this.updateStores(data);
            })
		}
	}

</script>