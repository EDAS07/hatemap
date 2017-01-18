<template>
	<div class="col-md-4">
	    <div class="panel panel-default">
	        <div class="panel-heading">{{ place.name }}</div>

	        <div class="panel-body">
	            <div class="list-group">
	            	<div class="list-group-item list-group-item-success">地址：{{ place.vicinity }}</div>
	            </div>
	            <div v-for="comment in comments" class="list-group">
	            	<div class="list-group-item list-group-item-info">評價：{{ comment.comment }}</div>
	            </div>
	        </div>
	    </div>
	</div>
</template>

<script>
	
	export default{
		props: ['place'],
		data: function(){
			return {
				comments: ''
			}
		},

		methods: {
			updateComments(data){
				this.comments = data;
			}
		},

		mounted(){
			let _this = this;

			Event.listen('updateComments',function(data){
                // console.log('listend event on placeinfo!', data);
                _this.updateComments(data);
            })
		}
	}

</script>