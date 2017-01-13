<style type="text/css">
	.opinion-window{
		width: 100%;
		resize: none;
	}
	.gm-style-iw {
		top: 43px !important;
		z-index: 1;
	}
	.size-md{
		width: 250px;
	}
</style>

<template>
	<div class="panel panel-default size-md">
		<div class="panel-heading">店家: {{place.name}}</div>
		<div class="panel-body">
			<div><textarea class="opinion-window" placeholder="You don't like what?" ></textarea></div>
			<div class="text-right">
				<button type="button" class="btn btn-primary btn-sm" @click="send" >送出</button>
			</div>
		</div>
	</div>
	
</template>

<script>

	export default {
		props: ['place'],
		methods:{
			send(){
				console.log('send message');

				AjaxCall('put', '/api/stores/' + this.place.place_id, null, function(ret){
				    // console.log('google init success!');
				} ,null);

			}
		},
		mounted(){
			// console.log('placea:', this.place.place_id);
		}
	}
</script>