
<template>
    <transition name="modal">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-container" :style="{ width: width + 'px'}">

              <div class="modal-header">
                <slot name="header">
                  default header
                </slot>
              </div>

              <div class="modal-body">
                <slot name="body">
                  default body
                </slot>
              </div>

              <div class="modal-footer">
                <slot name="footer">
                  default footer
                  <button class="modal-default-button" @click="close()">
                    Cancel
                  </button>
                </slot>
              </div>
            </div>
          </div>
        </div>
      </transition>
</template>

<script>
    export default {
        props: ['width'],
        data: function(){
            return {
                
            }
        },
        methods:{
            close: function(){
                this.$emit('close');
            }
        },
        mounted: function(){
            
        }
    }
</script>