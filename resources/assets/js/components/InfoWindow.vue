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
		<div class="panel-heading">店家: {{data.name}}</div>
		<div class="panel-body">
			<div><textarea class="opinion-window" placeholder="You don't like what?" ></textarea></div>
			<div class="text-right"><button type="button" class="btn btn-primary btn-sm">送出</button></div>
		</div>
	</div>
	
</template>

<script>
	export default {
		props: ['data'],
		methods:{

		}
	}
</script>