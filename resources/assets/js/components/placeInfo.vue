
<template>
    <div class="panel panel-default side-panel" id="side-panel">
        <div class="panel-heading">
        	{{ place.name }}
			<div class="alert alert-warning" style="cursor:pointer;display: inline;padding: 0;float: right;margin: 0;" v-show="group.length != 0" @click="backToGroupList()">
			  <strong>上一層</strong>
			</div>
        </div>

        <div class="panel-body">
            <div class="list-group">
            	<div class="list-group-item list-group-item-success">地址：{{ place.vicinity }}</div>
            </div>
            <div style="margin-bottom: 20px;">
            	<textarea class="opinion-window" placeholder="留下評論，救救他人！" v-model="comment"></textarea>
            	<div class="text-right" >
            		<button style="width: 100%" type="button" class="btn btn-primary btn-sm" @click="send" >送出</button>
            	</div>
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
		props: ['place', 'group'],
		data: function(){
			return {
				comments: '',
				comment: ''
			}
		},

		methods: {
			updateComments(data){
				this.comments = data;
			},

			getUserAvatar(fb_id){
				if(fb_id == '' || fb_id === undefined || fb_id == null){
					return 'images/user_icon.png';
				}else{
					return 'https://graph.facebook.com/v2.8/' +  fb_id + '/picture?type=normal'	;
				}
			},

			backToGroupList(){
				Event.fire('showGroupList', null);
			},

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
			let _this = this;

			Event.listen('updateComments',function(data){
                _this.updateComments(data);
            })

            console.log('aaaaa:', this.group);

		}
	}

</script>