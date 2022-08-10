<template>
  <base-popup name="popup-meta-data" class="popup-meta-data" width="600px" :close="handleClose">
    <div class="title-popup" slot="title">
      <span>{{ $t('metamart.template.popup.meta-data.title') }}</span>
    </div>
    <div class="content">
      <div class="meta-type cursor" :class="{ 'type-active': typeActive === type.id }" v-for="(type, index) in listTypes" :key="index" @click="handleChangeType(type.id)">
        <base-icon :icon="type.icon" size="32" class="meta-type__icon" />
        <p class="meta-type__title">{{ type.title }}</p>
      </div>
    </div>
    <div class="footer" slot="footer">
      <div class="wrap-button">
        <div class="btn-right">
          <el-button :class="'passive'" class="btn-default btn-400 btn-h-40 btn-close" @click="handleClose"> {{ $t('metamart.template.popup.meta-data.passive-btn') }} </el-button>
          <el-button :class="'active'" class="btn-default-bg btn-400 btn-h-40 is-none-border" @click="handleCreate" style="font-size: 14px; font-weight: 600">
            {{ $t('metamart.template.popup.meta-data.active-btn') }}
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
  export default class PopupMetaData extends Mixins(PopupMixin) {
    typeActive = 1
    listTypes: Array<Record<string, any>> = [
      {
        id: 1,
        icon: 'meta-info',
        title: this.$i18n.t('metamart.template.popup.meta-data.meta-type.info')
      },
      {
        id: 2,
        icon: 'meta-text',
        title: this.$i18n.t('metamart.template.popup.meta-data.meta-type.text')
      },
      {
        id: 3,
        icon: 'meta-html',
        title: this.$i18n.t('metamart.template.popup.meta-data.meta-type.html')
      },
      {
        id: 4,
        icon: 'meta-shield',
        title: this.$i18n.t('metamart.template.popup.meta-data.meta-type.policies')
      },
      {
        id: 5,
        icon: 'meta-feature',
        title: this.$i18n.t('metamart.template.popup.meta-data.meta-type.feature')
      },
      {
        id: 6,
        icon: 'meta-attach',
        title: this.$i18n.t('metamart.template.popup.meta-data.meta-type.attach')
      },
      {
        id: 7,
        icon: 'meta-group',
        title: this.$i18n.t('metamart.template.popup.meta-data.meta-type.group')
      }
    ]
    handleChangeType(type: number): void {
      this.typeActive = type
    }
    handleClose(): void {
      this.setOpenPopup({
        popupName: 'popup-meta-data',
        isOpen: false
      })
      this.typeActive = 1
    }
    handleCreate(): void {
      this.$emit('create', this.typeActive)
      this.handleClose()
    }
  }
</script>

<style scoped lang="scss">
  ::v-deep.popup-meta-data {
    .popup-content {
      padding: 24px;
      .content {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        row-gap: 24px;
        column-gap: 24px;
        .meta-type {
          padding: 16px;
          border: 2px solid #dbdbdb;
          border-radius: 6px;
          height: auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: left;
          color: #dbdbdb;
          &__title {
            font-weight: 16px;
            line-height: 24px;
            font-weight: 600;
            text-align: center;
          }
          &.type-active {
            border-color: #0151fc;
            color: #0151fc;
          }
        }
      }
    }
  }
</style>
