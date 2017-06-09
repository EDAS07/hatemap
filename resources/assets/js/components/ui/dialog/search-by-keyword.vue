
<template>
    <modal class="search-by-keyword" v-if="showModal" :width="600" @close="closeModal()" ref="modal">
        
        <h3 slot="header" class="text-center">Search By Keyword</h3>

        <div slot="body">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-sm-4 ">
                        <div class="default-box suggest-box text-center">
                            <div class="query-string" >rice</div>
                            <div class="query-string">noodle</div>
                            <div class="query-string">big banana</div>
                            <div class="query-string">tea</div>
                            <div class="query-string">restaurent</div>
                            <div class="query-string">tea</div>
                            <div class="query-string">restaurent</div>
                        </div>
                    </div>

                    <div class="col-sm-8">
                        <div class="row">
                            <div class="default-box search-box">
                                <div class="cus-search-header">
                                    You can select keyword from left box
                                </div>
                                <div class="cus-search-box">
                                    <div class="form-group has-feedback" >
                                        <input type="" name="" class="form-control" placeholder="Search...">
                                        <span class="action-active glyphicon glyphicon-remove form-control-feedback"></span>
                                    </div>
                                </div>    
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div slot="footer" class="pull-right" >
            <button class="btn btn-default" @click="$refs.modal.close()">
                Cancel
            </button>
            <button class="btn btn-primary" @click="confirm()">
                Go
            </button>
        </div>
        
    </modal>
</template>

<script>

    import modal from '@components/ui/dialog/modal.vue';

    export default {
        props: ['showModal'],
        data: function(){
            return {
                
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
            }
        },
        mounted: function(){
            
        }
    }
</script>