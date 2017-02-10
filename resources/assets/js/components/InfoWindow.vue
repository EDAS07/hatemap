<style type="text/css">
	.opinion-window{
		width: 100%;
		resize: none;
	}
	.size-md{
		/*width: 250px;*/
		width: 150px;
	}
</style>

<template>
	<!-- <div class="alert alert-success">
	  <strong>店家: {{place.name}}</strong>
	</div> -->
	<div class="panel panel-default size-md">
		<div class="panel-heading" style="border: none;border-radius: 3px;">店家: {{place.name}}</div>
		
		<!-- <div class="panel-body">
			<div><textarea class="opinion-window" placeholder="You don't like what?" v-model="comment"></textarea></div>
			<div class="text-right">
				<button type="button" class="btn btn-primary btn-sm" @click="send" >送出</button>
			</div>
		</div> -->
	</div>
	
</template>

<script>

	export default {
		props: ['place'],
		data: function(){
			return {
				comment: ''
			}
		},
		methods:{
			send(){
				if(this.comment == ''){
					return
				}
				let _this = this;
				var data = {
					comment: this.comment
				}
				AjaxCall('put', '/api/userOpinion/' + this.place.place_id, data, function(ret){
				    console.log('send comment success: ', ret);
				    _this.comment = '';
				    Event.fire('updateComments', ret.data);
				    Event.fire('updateMarkers', ret.data);
				} ,null);
			}
		},
		mounted(){
			// console.log('aaaaa:', this.selectGroup);
		}
	}
</script>