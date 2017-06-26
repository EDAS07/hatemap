
<template>
	<div class="main-container">
		<utilityBar></utilityBar>
		<storeListBar></storeListBar>
		<cusMap></cusMap>


		<searchBoard v-if="showSearchBoard" :showModal="showSearchBoard" @update:showModal="val => showSearchBoard = val" @showSearchByKeyword="showSearchByKeyword = true"></searchBoard>
		<searchByKeyword v-if="showSearchByKeyword" :showModal="showSearchByKeyword" @update:showModal="val => showSearchByKeyword = val"></searchByKeyword>
		<loginDialog v-if="showLogin" :showModal="showLogin" @update:showModal="val => showLogin = val"></loginDialog>
		<registerDialog v-if="showRegister" :showModal="showRegister" @update:showModal="val => showRegister = val"></registerDialog>
		<forgotPasswordDialog v-if="showForgotPassword" :showModal="showForgotPassword" @update:showModal="val => showForgotPassword = val"></forgotPasswordDialog>

	</div>
</template>

<script>
	import cusMap from '@components/ui/cus-map.vue';
	import utilityBar from '@components/ui/utility-bar.vue';
	import storeListBar from '@components/ui/store-list-bar.vue';

	import searchBoard from '@components/ui/dialog/search-board.vue';
	import searchByKeyword from '@components/ui/dialog/search-by-keyword.vue';
	import loginDialog from '@components/ui/dialog/login-dialog.vue';
	import registerDialog from '@components/ui/dialog/register-dialog.vue';
	import forgotPasswordDialog from '@components/ui/dialog/forgot-password-dialog.vue';

	export default {
		data: function(){
			return {
				showSearchBoard: false,
                showSearchByKeyword: false,
                showLogin: false,
                showRegister: false,
                showForgotPassword: false
			}
		},
		methods:{
			
		},

		components:{
			cusMap, utilityBar, storeListBar, searchBoard, searchByKeyword, loginDialog, registerDialog, forgotPasswordDialog
		},

		mounted(){
			var self = this;
			Event.listen('showSearchBoard',function(){
                self.showSearchBoard = true;
            })
			Event.listen('showSearchByKeyword',function(){
                self.showSearchByKeyword = true;
            })
            Event.listen('showLoginDialog',function(){
                self.showLogin = true;
            })
            Event.listen('showRegisterDialog',function(){
                self.showRegister = true;
            })
            Event.listen('showForgotPasswordDialog',function(){
                self.showForgotPassword = true;
            })
		}
	}
</script>