
<template>
    <modal v-if="showModal" @close="closeModal()" ref="modal">
        
        <h3 slot="header">Select Search Type</h3>

        <div slot="body">
            <li>Search by keyword</li>
            <li>Search by region</li>
        </div>

        <div slot="footer">
            <button class="modal-default-button" @click="$refs.modal.close()">
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
            }
        },
        mounted: function(){
            
        }
    }
</script>