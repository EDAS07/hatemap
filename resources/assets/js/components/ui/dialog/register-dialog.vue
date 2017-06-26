
<template>
    <modal class="register-dialog" v-if="showModal" :width="300" @close="closeModal()" ref="modal">
        
        <div slot="header" class="text-left">Register</div>

        <div slot="body">
            <form class="form-horizontal" role="form" method="POST" action="/login" v-on:submit.prevent="register()">
                <div class="form-group" :class="{'has-error': errMsg.name}">
                    <label for="Name" class="col-lg-4 control-label" >使用者名稱：</label>
                    <div class="col-lg-6">
                        <input id="Name" type="text" class="form-control" name="Name" v-model="name" required autofocus placeholder="Ex: Darren Cheng">
                        <span v-if="errMsg.name" class="help-block">
                            <strong>{{ errMsg.name[0] }}</strong>
                        </span>
                    </div>
                </div>

                <div class="form-group" :class="{'has-error': errMsg.email}">
                    <label for="email" class="col-lg-4 control-label" >帳號：</label>

                    <div class="col-lg-6">
                        <input id="email" type="email" class="form-control" name="email" v-model="email" required autofocus placeholder="E-mail address">
                        <span v-if="errMsg.email" class="help-block">
                            <strong>{{ errMsg.email[0] }}</strong>
                        </span>
                    </div>
                </div>

                <div class="form-group" :class="{'has-error': errMsg.password}">
                    <label for="password" class="col-lg-4 control-label">密碼：</label>
                    <div class="col-lg-6">
                        <input id="password" type="password" class="form-control" v-model="password" name="password" required placeholder="Password">
                        <span v-if="errMsg.password" class="help-block">
                            <strong>{{ errMsg.password[0] }}</strong>
                        </span>
                    </div>
                </div>

                <div class="form-group" :class="{'has-error': errMsg.password}">
                    <label for="repassword" class="col-lg-4 control-label">確認密碼：</label>

                    <div class="col-lg-6">
                        <input id="repassword" type="password" class="form-control" v-model="repassword" name="repassword" required placeholder="Check Password">
                    </div>
                </div>

                <div class="form-group">
                    <div class="col-lg-8">
                        <button type="submit" class="btn btn-primary">
                            Register
                        </button>
                    </div>
                </div>
            </form>
        </div>

        <div slot="footer">

            <div class="pull-right">
                <button class="btn btn-default" @click="$refs.modal.close()">
                    Cancel
                </button>
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
                errMsg: {
                    name: null,
                    email: null,
                    password: null
                },
                name: '',
                email: '',
                password: '',
                repassword: ''
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
            name: function (newValue) {
                this.errMsg.name = null;
            },
            email: function (newValue) {
                this.errMsg.email = null;
            },
            password: function (newValue) {
                this.errMsg.password = null;
                this.repassword = '';
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
            register: function(){
                console.log('click register');
                let credentials = {
                    'name': this.name,
                    'email': this.email,
                    'password': this.password,
                    'password_confirmation': this.repassword
                };
                auth.register(this, credentials, null);
            }
        },
        mounted: function(){
            
        }
    }
</script>