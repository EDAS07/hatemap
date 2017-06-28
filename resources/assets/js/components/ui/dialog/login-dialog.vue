
<template>
    <modal class="login-dialog" v-if="showModal" :width="300" @close="closeModal()" ref="modal">
        
        <div slot="header" class="text-left">Login
            <button type="button" class="close" aria-label="Close" @click="$refs.modal.close()">
              <span aria-hidden="true">&times;</span>
            </button>
        </div>

        <div slot="body">
            <form class="form-horizontal" role="form" method="POST" action="/login" v-on:submit.prevent="login()">

                <div class="form-group" :class="{'has-error': hasError}">
                    <label for="email" class="col-lg-4 control-label" >帳號：</label>

                    <div class="col-lg-6">
                        <input id="email" type="email" class="form-control" name="email" v-model="email" required autofocus placeholder="E-mail address">
                        <span v-show="hasError" class="help-block">
                            <strong>{{ errMsg }}</strong>
                        </span>
                    </div>
                </div>

                <div class="form-group">
                    <label for="password" class="col-lg-4 control-label">密碼：</label>

                    <div class="col-lg-6">
                        <input id="password" type="password" class="form-control" v-model="password" name="password" required placeholder="Password">
                    </div>
                </div>

                <div class="form-group">
                    <div class="col-lg-7 col-lg-offset-1">
                        <div class="checkbox pull-left">
                            <label>
                                <input type="checkbox" name="remember"> Remember Me
                            </label>
                        </div>
                        <a class="btn btn-link pull-right" @click="showForgotPasswordDialog()">
                            Forgot Password?
                        </a>
                    </div>
                </div>

                <div class="form-group">
                    <div class="col-lg-8 col-lg-offset-1">
                        <button type="submit" class="btn btn-primary">
                            Login
                        </button>
                        <a class="btn btn-link" @click="showRegisterDialog()">
                            Register
                        </a>
                    </div>
                </div>
            </form>
            
        </div>

        <div slot="footer">
            <div class="social-link text-left">
                <a class="btn btn-link" href="/auth/facebook">
                    <img src="/images/fb-login.png">
                </a>
            </div>
        </div>
        
    </modal>
</template>

<script>

    import modal from '@components/ui/dialog/modal.vue';
    import auth from '@components/services/auth';


    export default {
        props: ['showModal'],
        data: function(){
            return {
                errMsg: null,
                email: '',
                password: ''
            }
        },
        computed: {
            hasError: function(){
                if(this.errMsg == null){
                    return false;
                }
                return true;
            }
        },
        watch: {
            email: function (newValue) {
                this.errMsg = null;
            }
        },
        components:{
            modal
        },
        methods:{
            closeModal: function(){
                this.$emit('update:showModal', false);
            },
            confirm: function(){
                this.closeModal();
            },
            login: function(){
                let credentials = {
                    'email': this.email,
                    'password': this.password
                };
                auth.login(this, credentials, null);
            },
            showRegisterDialog: function(){
                Event.fire('showRegisterDialog');
                this.closeModal();
            },
            showForgotPasswordDialog: function(){
                Event.fire('showForgotPasswordDialog');
                this.closeModal();
            }
        },
        mounted: function(){
            
        }
    }
</script>