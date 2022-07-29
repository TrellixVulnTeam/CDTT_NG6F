<template>
  <base-popup name="popup-delete-collection" class="popup-delete" width="400px" :open="handleOpen" :close="handleClose">
    <div class="title-popup" slot="title">
      <span>DELETE</span>
    </div>
    <div class="content" style="padding-bottom: 24px">
      <span class="content-text">
        Are you sure you want to delete this <span class="content-text__item">The Mike Tyson</span> collection?
      </span>
    </div>
    <div v-if="isHaveNft" class="notification">
      <div class="notification-title">
        <div class="notification-title__icon">
          <img src="../../../../icons/png/alert.png" alt="icon alert">
        </div>
        <p class="notification-title__text">Something went wrong</p>
      </div>
      <p class="notification-subtitle">Collection cannot delete a collection that contains NFT items. Please move all NFTs to another collection and try again.</p>
    </div>
    <div class="footer" slot="footer">
      <div class="be-flex jc-flex-end">
        <el-button class="btn-default btn-close btn-h-40 mr-16" @click="handleCancel">{{ $t('button.cancel') }}</el-button>
        <el-button class="btn-default delete-btn" :disabled="isHaveNft" @click="handleSubmit">Confirm</el-button>
      </div>
    </div>
    <popup-verify-email />
  </base-popup>
</template>

<script lang="ts">
  import PopupMixin from '@/mixins/popup'
  import { Component, Mixins } from 'vue-property-decorator'
  import PopupVerifyEmail from './PopupVerifyEmail.vue'
  
  @Component({
    components: {PopupVerifyEmail}
  })
  export default class PopupDeleteCollection extends Mixins(PopupMixin) {
    isHaveNft = false;

    handleCancel():void {
      this.setOpenPopup({
        popupName: 'popup-delete-collection',
        isOpen: false
      })
    }
    handleSubmit():void {
      if(this.isHaveNft) {
        return
      } else {
        this.setOpenPopup({
          popupName: 'popup-metamart-verify-email',
          isOpen: true
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  ::v-deep.popup-delete {
    .content {
      &-text {
        font-weight: 400;
        font-size: 16px;
        line-height: 24px;
        color: var(--bc-text-discript);
        &__item {
          color: var(--bc-text-primary);
          font-weight: 600;
        }
      }
    }
    .notification {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-bottom: 24px;
      padding: 12px 24px;
      background-color: var(--bc-bg-error);
      border-radius: 6px;
      &-title {
        display: flex;
        align-items: center;
        gap: 10px;
        &__icon {
          width: 22px;
          height: 22px;
        }
        &__text {
          font-size: 16px;
          line-height: 24px;
          font-weight: 600;
          color: var(--bc-status-error);
        }
      }
      &-subtitle {
        font-weight: 400;
        font-size: 14px;
        line-height: 20px;
        color: var(--bc-text-discript);
      }
    }
    .footer {
      .delete-btn {
        width: 100px;
        margin: 0;
        background-color: var(--bc-theme-primary);
        color: var(--bc-color-white);
        border: none;
        &:hover {
          background-color: var(--bc-btn-bg-default-hover);
        }
      }
      .is-disabled {
        background-color: var(--bc-color-grey20);
        color: var(--bc-status-neutral);
        &:hover {
          background-color: var(--bc-color-grey20);
        }
      }
    }
  }
</style>
