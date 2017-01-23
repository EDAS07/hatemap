<style type="text/css">
	.side-panel{
		position: absolute;
	    top: 60%;
	    right: 5%;
	    left: 5%;
	    height: 36%;
		overflow-x: hidden;
	}
</style>

<template>
    <div class="panel panel-default side-panel" >
        <div class="panel-heading">{{ place.name }}</div>

        <div class="panel-body">
            <div class="list-group">
            	<div class="list-group-item list-group-item-success">地址：{{ place.vicinity }}</div>
            </div>
            <div v-for="comment in comments" class="list-group">
            	<div class="list-group-item list-group-item-info">
            		<div class="comment-user-container" >
            			<div class="comment-img" >
							<a><img v-bind:src="getUserAvatar(comment.facebook_id)"/></a>
	            		</div>
	            		<div> {{ comment.name }} </div>	
            		</div>
            		<div class="comment-comment-container" >
            			<div>
            				{{ comment.comment }}	
            			</div>
            		</div>
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
				comments: '',
				mytest: '/good'
			}
		},

		methods: {
			updateComments(data){
				this.comments = data;
			},

			getUserAvatar(fb_id){
				if(fb_id == ''){
					return 'images/user_icon.png';
				}else{
					return 'https://graph.facebook.com/v2.8/' +  fb_id + '/picture?type=normal'	;
				}
			}
		},

		mounted(){
			let _this = this;

			Event.listen('updateComments',function(data){
                _this.updateComments(data);
            })
		}
	}

</script>