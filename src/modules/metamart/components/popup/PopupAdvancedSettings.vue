<template>
  <base-popup name="popup-advanced-settings" class="popup-advanced-settings" width="600px" :open="handleOpen" :close="handleClose">
    <div class="title-popup" slot="title">
      <span>Advanced setting</span>
    </div>
    <div class="content">
      <div
        class="content-row"
        v-for="(tab, index) in list"
        :key="index"
        draggable
        @dragstart="handleStartDrag($event, tab)"
        @drop.prevent="handleDrop($event, tab)"
        @dragover.prevent
      >
        <div class="content-row__drag">
          <span class="content-row__drag--dots"></span>
          <span class="content-row__drag--dots"></span>
          <span class="content-row__drag--dots"></span>
          <span class="content-row__drag--dots"></span>
          <span class="content-row__drag--dots"></span>
          <span class="content-row__drag--dots"></span>
        </div>
        <el-input placeholder="Enter title" v-model="tab.title" class="content-row__input"></el-input>
        <div class="content-row__order">{{ tab.order + 1 }}</div>
        <base-icon icon="icon-delete-new" size="20" class="content-row__del cursor" @click.native="openDelete(tab)" />
      </div>
    </div>
    <div class="footer" slot="footer">
      <div class="wrap-button">
        <div class="btn-right">
          <el-button :class="'passive'" class="btn-default btn-400 btn-h-40 btn-close" @click="handleCancel"> {{ $t('metamart.template.popup.meta-data.passive-btn') }} </el-button>
          <el-button :class="'active'" class="btn-default-bg btn-400 btn-h-40 is-none-border" style="font-size: 14px; font-weight: 600" @click="handleSave"> Save </el-button>
        </div>
      </div>
    </div>
    <popup-delete-meta :row="rowActive" @delete="handleDeleteMeta" />
  </base-popup>
</template>

<script lang="ts">
  import { Component, Mixins, Prop, Watch } from 'vue-property-decorator'
  import PopupMixin from '@/mixins/popup'
  import PopupDeleteMeta from '@/modules/metamart/components/popup/PopupDeleteMeta.vue'
  @Component({
    components: {
      PopupDeleteMeta
    }
  })
  export default class PopupAdvancedSettings extends Mixins(PopupMixin) {
    @Prop({ required: true, type: Array }) tabs!: Array<Record<string, any>>
    listTabs: Array<Record<string, any>> = []
    rowActive: Record<string, any> = {}
    get list(): Array<Record<string, any>> {
      let rs = this.listTabs
      rs.sort((a: Record<string, any>, b: Record<string, any>) => {
        return a.order - b.order
      })
      return rs
    }
    handleOpen(): void {
      this.listTabs = this.tabs.map((tab: Record<string, any>, i: number): Record<string, any> => {
        return {
          ...tab,
          order: i
        }
      })
    }
    handleStartDrag(e: any, item: Record<string, any>): void {
      e.dataTransfer.dropEffect = 'move'
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.setData('order', item.order)
    }
    handleDrop(e: any, item: Record<string, any>): void {
      const rootOrder = +e.dataTransfer.getData('order')
      const distOrder = item.order
      const rootItem: any = this.listTabs.find((item: Record<string, any>): boolean => {
        return item.order === rootOrder
      })
      if (rootOrder < distOrder) {
        const above = this.listTabs.filter((item: Record<string, any>): boolean => {
          return item.order > rootOrder && item.order <= distOrder
        })
        above.forEach((elm: Record<string, any>): void => {
          elm.order--
        })
        rootItem.order = distOrder
      } else if (rootOrder > distOrder) {
        console.log('90')

        const below = this.listTabs.filter((item: Record<string, any>): boolean => {
          return item.order >= distOrder && item.order < rootOrder
        })
        below.forEach((elm: Record<string, any>): void => {
          elm.order++
        })
        rootItem.order = distOrder
      }
    }
    handleCancel(): void {
      this.setOpenPopup({
        popupName: 'popup-advanced-settings',
        isOpen: false
      })
    }
    handleClose(): void {
      console.log('100')
    }
    handleSave(): void {
      this.$emit('save', this.list)
      this.handleCancel()
    }
    openDelete(row: Record<string, any>): void {
      this.rowActive = row
      this.setOpenPopup({
        popupName: 'popup-delete-meta',
        isOpen: true
      })
    }
    handleDeleteMeta(): void {
      const rowId = this.rowActive.id
      this.listTabs = this.listTabs.filter((tab: Record<string, any>): boolean => {
        return tab.id !== rowId
      })
      this.rowActive = {}
    }
  }
</script>

<style scoped lang="scss">
  @mixin text($size, $height, $weight, $color) {
    font-size: $size;
    font-weight: $weight;
    line-height: $height;
    color: $color;
  }
  ::v-deep.popup-advanced-settings {
    .popup-content {
      padding-bottom: 24px;
      .content {
        &-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          &:not(:last-child) {
            margin-bottom: 24px;
          }
          &__drag {
            width: 14px;
            height: 28px;
            display: grid;
            grid-template-columns: 5px 5px;
            column-gap: 4px;
            row-gap: 4px;
            &--dots {
              display: inline-block;
              height: 5px;
              background-color: #dbdbdb;
              border-radius: 50%;
            }
          }
          &__input {
            width: fit-content;
            .el-input__inner {
              width: 406px;
              height: 48px;
            }
          }
          &__order {
            width: 48px;
            height: 48px;
            border: 1px solid #dbdbdb;
            border-radius: 4px;
            display: flex;
            justify-content: center;
            align-items: center;
            @include text(16px, 24px, 400, #28344b);
          }
          &__del {
            line-height: 20px;
          }
        }
      }
    }
  }
</style>
