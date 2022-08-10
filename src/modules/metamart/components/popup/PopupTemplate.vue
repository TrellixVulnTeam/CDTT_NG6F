<template>
  <base-popup name="popup-template" class="popup-template" width="600px" :close="handleClose">
    <div class="title-popup" slot="title">
      <span>{{ $t('metamart.template.popup.add-new.title') }}</span>
    </div>
    <div class="content">
      <p class="content-title">{{ $t('metamart.template.popup.add-new.content-title') }} <span style="color: #db5454">*</span></p>
      <el-input v-model="template" :placeholder="placeholder" @change="validateTemplate" :class="{ alert: notify }"></el-input>
      <p class="content-alert" v-show="notify">{{ $t('metamart.template.popup.add-new.alert') }}</p>
    </div>
    <div class="footer" slot="footer">
      <div class="wrap-button">
        <div class="btn-right">
          <el-button :class="'passive'" class="btn-default btn-400 btn-h-40 btn-close" @click="handleClose"> {{ $t('metamart.template.popup.add-new.passive-btn') }} </el-button>
          <el-button
            :class="'active'"
            class="btn-default-bg btn-400 btn-h-40 is-none-border"
            :disabled="template === ''"
            @click="$emit('create', template)"
            style="font-size: 14px; font-weight: 600"
          >
            {{ $t('metamart.template.popup.add-new.active-btn') }}
          </el-button>
        </div>
      </div>
    </div>
  </base-popup>
</template>

<script lang="ts">
  import { Component, Mixins } from 'vue-property-decorator'
  import PopupMixin from '@/mixins/popup'
  @Component
  export default class PopupTemplate extends Mixins(PopupMixin) {
    template = ''
    placeholder = 'e. g. "Low season"'
    notify = false
    validateTemplate(): void {
      console.log('39...')

      this.notify = this.template === ''
    }
    handleClose(): void {
      this.setOpenPopup({
        popupName: 'popup-template',
        isOpen: false
      })
    }
  }
</script>

<style scoped lang="scss">
  ::v-deep.popup-template {
    .popup-content {
      padding: 24px;
      .content-title {
        margin-bottom: 4px;
      }
      .content-alert {
        font-size: 12px;
        line-height: 16px;
        font-weight: 400;
        color: #db5454;
        margin-top: 4px;
      }
      .el-input__inner {
        height: 48px;
      }
      .alert {
        .el-input__inner {
          border-color: #db5454;
        }
      }
    }
    .popup-footer {
      .active,
      .passive {
        padding: 12px 28px;
      }
    }
  }
</style>
