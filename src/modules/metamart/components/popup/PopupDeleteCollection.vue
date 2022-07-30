<template>
  <base-popup name="popup-delete-collection" class="popup-delete" width="400px" :open="handleOpen" :close="handleClose">
    <div class="title-popup" slot="title">
      <span>DELETE</span>
    </div>
    <div class="content" style="padding-bottom: 24px">
      <span>Are you sure you want to delete this The Mike Tyson collection?</span>
    </div>
    <div class="footer" slot="footer">
      <div class="be-flex jc-flex-end">
        <el-button class="btn-default btn-close btn-h-40 mr-16" @click="handleCancel">{{ $t('button.cancel') }}</el-button>
        <el-button class="btn-default delete-btn" @click="handleSubmit">Confirm</el-button>
      </div>
    </div>
  </base-popup>
</template>

<script lang="ts">
  import PopupMixin from '@/mixins/popup'
  import { Component, Mixins } from 'vue-property-decorator'
  
  @Component({
    components: {}
  })
  export default class PopupDeleteCollection extends Mixins(PopupMixin) {
    handleCancel():void {
      console.log('clickCancel');
    }
    handleSubmit():void {
      console.log('clickCancel');
    }
  }
</script>

<style scoped lang="scss">
  ::v-deep.popup-delete {
    .footer {
      .delete-btn {
        background-color: var(--bc-theme-primary);
        color: var(--bc-color-white);
      }
    }
  }
</style>
