
<template>
    <modal class="forgot-password-dialog" v-if="showModal" :width="300" @close="closeModal()" ref="modal">
        
        <div slot="header" class="text-left">Reset Password</div>

        <div slot="body">
            <div v-show="action_result == 'success'" class="alert alert-success">
                We have e-mailed your password reset link!
            </div>
            <div v-show="action_result == 'fail'" class="alert alert-warning">
                Sorry. System busy. Try again later.
            </div>
            <form class="form-horizontal" role="form" method="POST" action="/login" v-on:submit.prevent="send()">
                <div class="form-group">
                    <label for="email" class="col-lg-4 control-label" >E-mail address：</label>

                    <div class="col-lg-6">
                        <input id="email" type="email" class="form-control" name="email" v-model="email" required autofocus placeholder="E-mail address">
                    </div>
                </div>

                <div class="form-group">
                    <div class="col-lg-8">
                        <button v-show="!waiting" type="submit" class="btn btn-primary">
                            Send Password Reset Link
                        </button>
                        <button v-show="waiting" class="btn btn-warning" disabled>
                            <span class="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span>
                            Loading...
                        </button>
                    </div>
                </div>
            </form>
        </div>

        <div slot="footer">
            <div class="pull-right" v-show="!waiting">
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
                email: '',
                action_result: null,
                waiting: false
            }
        },
        computed: {
        },
        watch: {
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
            send: function(){
                console.log('click send reset button');
                let credentials = {
                    'email': this.email
                };
                auth.sendResetPWDLink(this, credentials);
            }
        },
        mounted: function(){
            
        }
    }
</script>