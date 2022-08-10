<template>
  <div class="create-template">
    <div class="create-template__header">
      <div class="left">{{ template }}</div>
      <div class="right">
        <span class="button button-advance cursor" @click="openAdvancedSettings">{{ $t('metamart.template.create.advance-btn') }}</span>
        <span class="button button-save cursor">{{ $t('metamart.template.create.save-btn') }}</span>
      </div>
    </div>
    <div class="create-template__tabs">
      <span
        class="tab cursor"
        v-for="(tab, index) in listTabs"
        :class="{ 'tab-active': tab.order === tabActive }"
        :key="index"
        @click="
          () => {
            tabActive = tab.order
          }
        "
        >{{ tab.title }}</span
      >
      <base-icon icon="icon-add" size="24" class="cursor" @click.native="openPopupMetaData" />
    </div>
    <div class="create-template__content">
      <keep-alive>
        <component :is="getComponent" />
      </keep-alive>
    </div>
    <popup-meta-data @create="handleListen" />
    <popup-advanced-settings :tabs="listTabs" @save="handleSaveSettings" />
  </div>
</template>
<script lang="ts">
  import { Component, Mixins, Vue } from 'vue-property-decorator'
  import PopupMixin from '@/mixins/popup'
  import PopupMetaData from '../components/popup/PopupMetaData.vue'
  import TemplateInfo from '../components/template/TemplateInfo.vue'
  import TemplateDesc from '../components/template/TemplateDesc.vue'
  import TemplatePolicies from '../components/template/TemplatePolicies.vue'
  import PopupAdvancedSettings from '../components/popup/PopupAdvancedSettings.vue'
  import { trim } from '@amcharts/amcharts4/.internal/core/utils/Utils'
  @Component({
    components: {
      PopupMetaData,
      TemplateInfo,
      TemplateDesc,
      TemplatePolicies,
      PopupAdvancedSettings
    }
  })
  export default class CreateTemplate extends Mixins(PopupMixin) {
    template = ''
    tabActive = 0
    listTabs: Array<Record<string, any>> = [
      {
        order: 0,
        id: 1,
        title: 'NFT info'
      }
    ]
    created(): void {
      this.template = '' + this.$route.query.template
    }
    get getComponent(): string {
      const order = this.tabActive
      const tab: any = this.listTabs.find((tab: Record<string, any>): boolean => {
        return tab.order === order
      })
      switch (tab.id) {
        case 1:
          return 'TemplateInfo'
        case 2:
          return 'TemplateDesc'
        case 4:
          return 'TemplatePolicies'
        default:
          return 'TemplateInfo'
      }
    }
    openPopupMetaData(): void {
      this.setOpenPopup({
        popupName: 'popup-meta-data',
        isOpen: true
      })
    }
    handleListen(type: number): void {
      const len = this.listTabs.length
      if (type === 1) {
        this.listTabs.push({
          order: len,
          id: 1,
          title: 'NFT info'
        })
      } else if (type === 2) {
        this.listTabs.push({
          order: len,
          id: 2,
          title: 'Description'
        })
      } else if (type === 4) {
        this.listTabs.push({
          order: len,
          id: 4,
          title: 'Policies'
        })
      }
      this.tabActive = len
    }
    openAdvancedSettings(): void {
      this.setOpenPopup({
        popupName: 'popup-advanced-settings',
        isOpen: true
      })
    }
    handleSaveSettings(payload: Array<Record<string, any>>): void {
      this.listTabs = payload.map((tab: Record<string, any>, index: number): Record<string, any> => {
        return {
          ...tab,
          order: index
        }
      })
      this.tabActive = 0
    }
  }
</script>
<style lang="scss" scoped>
  @mixin text($size, $height, $weight, $color) {
    font-size: $size;
    font-weight: $weight;
    line-height: $height;
    color: $color;
  }
  ::v-deep.create-template {
    width: 100%;
    height: auto;
    border-radius: 4px;
    background-color: #ffffff;
    padding: 24px;
    box-shadow: 0 1px 4px #dbdbdb;
    &__header {
      width: 100%;
      height: auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        @include text(24px, 32px, 600, #0a0b0d);
      }
      .right {
        .button {
          display: inline-block;
          font-size: 16px;
          font-weight: 400;
          line-height: 24px;
          padding: 12px;
          border-radius: 6px;
          margin-left: 16px;
          &-advance {
            border: 1px solid #dbdbdb;
          }
          &-save {
            color: #ffffff;
            background-color: #0151fc;
          }
        }
      }
    }
    &__tabs {
      border-bottom: 1px solid #dbdbdb;
      width: 100%;
      height: auto;
      max-height: 56px;
      box-sizing: border-box;
      padding: 0;
      .tab {
        @include text(16px, 24px, 400, #5b616e);
        display: inline-block;
        padding: 16px 12px;
        &.tab-active {
          font-weight: 600;
          color: #0151fc;
          padding-bottom: 14px;
          border-bottom: 2px solid #0151fc;
        }
      }
      .span-icon {
        line-height: 24px;
        display: inline-block;
        margin-left: 16px;
      }
    }
    &__content {
      padding-top: 24px;
    }
  }
</style>
