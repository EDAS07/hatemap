
<template>
    <modal class="search-board" v-if="showModal" @close="closeModal()" ref="modal">
        
        <h3 slot="header" class="text-center">Select Search Type</h3>

        <div slot="body" class="text-center">
            <li @click="searchByKeyword()">Search by keyword</li>
            <li>Search by region</li>
        </div>

        <div slot="footer" class="pull-right">
            <button class="btn btn-default" @click="$refs.modal.close()">
                Cancel
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
            searchByKeyword: function(){
                this.$emit('update:showModal', false);
                this.$emit('showSearchByKeyword');
                console.log('searchby keyword');
            }
        },
        mounted: function(){
            
        }
    }
</script>