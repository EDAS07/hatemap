
import {router} from '@components/../app';

export default {
	user: {
		authenticated: false,
		info: null
	},

	login: function(context, credentials, redirect) {
		let data = credentials;
		console.log('start login');
		AjaxCall('post', '/login', data, ret => {
			this.user.authenticated = true;
			this.user.info = ret.data.user;

			if(isFunction(context.closeModal)){
				context.closeModal();
			}

			if(redirect){
				router.go(redirect);
			}
		    console.log('login ajx success:', ret);
		}, ret => {
		    context.errMsg = ret.data.msg;
		});
	},

	logout: function(){
		AjaxCall('post', '/logout', null, ret => {
			
		    console.log('logout success', ret);
		    location.reload();
		}, ret => {
		    
		});
		
	},

	register: function(context, credentials, redirect) {
		let data = credentials;
		AjaxCall('post', '/register', data, ret => {
			this.user.authenticated = true;
			if(isFunction(context.closeModal)){
				context.closeModal();
			}

			if(redirect){
				router.go(redirect);
			}
		    console.log('login ajx success:', ret);
		}, ret => {
		    context.errMsg = ret.data.msg;
		});
	},

	sendResetPWDLink: function(context, credentials){
		let data = credentials;
		context.waiting = true;
		AjaxCall('post', '/password/email', data, ret => {
		    console.log('login ajx success:', ret);
		    context.action_result = 'success';
		    context.waiting = false;
		}, ret => {
		    console.log('send reset link fail:', ret);
		    context.action_result = 'fail';
		    context.waiting = false;
		});
	},

	checkAuth: function(){
		AjaxCall('get', 'auth/check', null, ret => {
			if(ret.data.isGuest){
				this.user.authenticated = false;
				this.user.info = null;
			}else {
				this.user.authenticated = true;	
				this.user.info = ret.data.user;
			}
		    console.log('authenticated success:', ret);
		}, ret => {
		    context.errMsg = ret.data.msg;
		});
	}

}