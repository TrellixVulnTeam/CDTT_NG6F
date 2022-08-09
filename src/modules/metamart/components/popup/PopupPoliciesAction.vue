<template>
  <base-popup name="popup-policies-action" class="popup-policies-action" width="600px" :close="handleClose">
    <div class="title-popup" slot="title">
      <span>{{ title }}</span>
    </div>
    <div class="content" v-if="title === 'Delete'">
      <span class="delete-message">
        Are you sure you want to delete
        <span class="row-delete"> “{{ row.title }}” </span>
        row ?
      </span>
    </div>
    <div class="content" v-if="title === 'Edit'"></div>
    <div class="footer" slot="footer">
      <div class="wrap-button">
        <div class="btn-right">
          <el-button :class="'passive'" class="btn-default btn-400 btn-h-40 btn-close" @click="handlePassive">
            {{ $t('metamart.template.popup.meta-data.passive-btn') }}
          </el-button>
          <el-button :class="'active'" class="btn-default-bg btn-400 btn-h-40 is-none-border" @click="handleActive" style="font-size: 14px; font-weight: 600">
            {{ $t('metamart.template.popup.meta-data.active-btn') }}
          </el-button>
        </div>
      </div>
    </div>
  </base-popup>
</template>

<script lang="ts">
  import { Component, Mixins, Prop } from 'vue-property-decorator'
  import PopupMixin from '@/mixins/popup'
  @Component
  export default class PopupMetaData extends Mixins(PopupMixin) {
    @Prop({ required: true, type: String }) title!: string
    @Prop({ required: true, type: Object }) row!: Record<string, any>
    handleClose(): void {
      console.log('close')
    }
    handlePassive(): void {
      console.log('passive')
      this.setOpenPopup({
        popupName: 'popup-policies-action',
        isOpen: false
      })
    }
    handleActive(): void {
      console.log('active')
      this.handlePassive()
      if (this.title === 'Delete') {
        this.$emit('delete')
      }
    }
  }
</script>

<style scoped lang="scss">
  ::v-deep.popup-policies-action {
    .popup-content {
      padding-bottom: 24px;
      .content {
        .delete-message {
          font-size: 16px;
          line-height: 24px;
          font-weight: 400;
          color: #5b616e;
          .row-delete {
            font-weight: 600;
            color: #0a0b0d;
          }
        }
      }
    }
  }
</style>
