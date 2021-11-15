<template>
  <base-popup name="popup-filter-request" class="popup-filter-request" width="600px" :open="handleOpen" :close="handleClose" :isShowFooter="true">
    <div slot="title">
      <span>{{ $t('crowdsale.popup-filter.title') }}</span>
    </div>
    <div class="content">1</div>
    <div slot="footer" class="footer">
      <div @click="handleReset" class="btn-action btn-close">{{ $t('crowdsale.popup-filter.reset') }}</div>
      <div @click="handleSubmit" class="btn-action btn-submit">{{ $t('crowdsale.popup-filter.apply') }}</div>
    </div>
  </base-popup>
</template>
<script lang="ts">
  import { Component, Mixins } from 'vue-property-decorator'
  import PopupMixin from '@/mixins/popup'
  @Component({ components: {} })
  export default class PopupFilterRequest extends Mixins(PopupMixin) {
    async handleOpen(): Promise<void> {
      console.log('open')
    }
    async handleClose(): Promise<void> {
      console.log('close')
    }
    handleReset(): void {
      console.log(1)
    }
    handleSubmit(): void {
      console.log(2)
    }
  }
</script>
<style scoped lang="scss">
  .popup-filter-request {
    .footer {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      .btn-action {
        width: 100px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        font-size: 16px;
        font-weight: 400;
        cursor: pointer;
        border-radius: 6px;
        &:hover {
          color: var(--bc-btn-default-text-hover);
          border: 1px solid var(--bc-btn-default-border-hover);
        }
      }
      .btn-close {
        background: var(--bc-color-white);
        border: 1px solid var(--bc-color-grey50);
        color: var(--bc-color-grey150);
        margin-right: 16px;
      }
      .btn-submit {
        color: var(--bc-color-white);
        background: var(--bc-btn-bg-default);
        border: none;
        &:hover {
          border: none;
          color: var(--bc-color-white);
          background: var(--bc-btn-bg-default-hover);
        }
      }
    }
  }
</style>
