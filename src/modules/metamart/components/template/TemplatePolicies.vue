<template>
  <div class="policies">
    <div class="block">
      <div class="block-row">
        <p class="block-row__title">Title <span style="color: #cf202f">*</span></p>
        <el-input v-model="title" placeholder="Enter policy title" class="block-row__input"></el-input>
      </div>
      <div class="block-table">
        <div class="block-table__row header">NAME</div>
        <div class="block-table__row add">
          <base-icon icon="icon-add-circle" class="cursor" size="40" @click.native="addNewPolicy" />
          <span class="title">Add policy</span>
        </div>
        <div
          class="block-table__row item cursor"
          v-for="(row, index) in list"
          :key="index"
          draggable
          @dragstart="handleStartDrag($event, row)"
          @drop.prevent="handleDrop($event, row)"
          @dragover.prevent
          v-show="list.length > 0"
        >
          <div class="drag-hover">
            <span class="drag-hover__dots"></span>
            <span class="drag-hover__dots"></span>
            <span class="drag-hover__dots"></span>
            <span class="drag-hover__dots"></span>
            <span class="drag-hover__dots"></span>
            <span class="drag-hover__dots"></span>
          </div>
          <div class="info">
            <p class="info-primary">{{ row.title }}</p>
            <p class="info-desc" v-show="row.description !== ''">{{ row.description }}</p>
          </div>
          <div class="actions">
            <base-icon icon="icon-edit" size="20" @click.native="openEditRow(row)" />
            <base-icon icon="icon-delete-new" size="20" @click.native="openDelRow(row)" />
          </div>
        </div>
        <div class="block-table__row empty" v-show="list.length === 0">
          <empty-block :emptyText="'There are no data'" />
        </div>
      </div>
    </div>
    <div class="block">
      <div class="block-header">
        <span class="block-header__title">Policies</span>
      </div>
      <div class="block-content">
        <div class="block-content__row" v-for="(row, i) in list" :key="i">
          <div class="block-content__row--left">
            <p class="primary">{{ row.title }}</p>
            <p class="desc" v-show="row.description !== ''">{{ row.description }}</p>
          </div>
          <div class="block-content__row--right">{{ row.detail }}</div>
        </div>
      </div>
    </div>
    <popup-polices-action :title="action" :row="rowActive" @delete="handleDelRow" />
  </div>
</template>
<script lang="ts">
  import { Component, Mixins, Vue } from 'vue-property-decorator'
  import PopupPolicesAction from '../popup/PopupPoliciesAction.vue'
  import PopupMixin from '@/mixins/popup'
  import EmptyBlock from '@/components/base/empty/EmptyBlock.vue'
  @Component({
    components: {
      PopupPolicesAction,
      EmptyBlock
    }
  })
  export default class TemplatePolicies extends Mixins(PopupMixin) {
    title = ''
    action = 'Edit'
    rootElm: any = {}
    rowActive: Record<string, any> = {}
    listRows: Array<Record<string, any>> = [
      {
        id: 1,
        title: 'Project',
        description: '',
        detail: 'Wonka Industries'
      },
      {
        id: 2,
        title: 'Week',
        description: '',
        detail: '18'
      },
      {
        id: 3,
        title: 'High season',
        description: '(a week per year)',
        detail: 'From 21st April'
      },
      {
        id: 4,
        title: 'Package value',
        description: '',
        detail: '3,000 USDT'
      }
    ]
    get list(): Array<Record<string, any>> {
      let rs = this.listRows
      rs.sort((a: Record<string, any>, b: Record<string, any>) => {
        return a.id - b.id
      })
      return rs
    }
    addNewPolicy(): void {
      console.log('26...')
    }
    handleStartDrag(e: any, item: Record<string, any>): void {
      this.rootElm = e.target
      this.rootElm.classList.toggle('bg-drag')
      e.dataTransfer.dropEffect = 'move'
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer?.setData('itemId', item.id)
    }
    handleDrop(e: any, item: Record<string, any>): void {
      this.rootElm.classList.toggle('bg-drag')
      const rootId = +e.dataTransfer.getData('itemID')
      const distId = item.id
      const rootItem: any = this.listRows.find((item: Record<string, any>): boolean => {
        return item.id === rootId
      })
      if (rootId < distId) {
        const above = this.listRows.filter((item: Record<string, any>): boolean => {
          return item.id > rootId && item.id <= distId
        })
        above.forEach((elm: Record<string, any>): void => {
          elm.id--
        })
        rootItem.id = distId
      } else if (rootId > distId) {
        const below = this.listRows.filter((item: Record<string, any>): boolean => {
          return item.id >= distId && item.id < rootId
        })
        below.forEach((elm: Record<string, any>): void => {
          elm.id++
        })
        rootItem.id = distId
      }
    }
    openEditRow(row: Record<string, any>): void {
      console.log('129...')
    }
    openDelRow(row: Record<string, any>): void {
      this.rowActive = row
      this.action = 'Delete'
      this.setOpenPopup({
        popupName: 'popup-policies-action',
        isOpen: true
      })
    }
    handleDelRow(): void {
      const rowActive = this.rowActive
      this.listRows = this.listRows
        .filter((row: Record<string, any>): boolean => {
          return row.id !== rowActive.id
        })
        .map((row: Record<string, any>, i: number): Record<string, any> => {
          return {
            ...row,
            id: i + 1
          }
        })
      this.rowActive = {}
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
  ::v-deep.policies {
    display: grid;
    grid-template-columns: 2fr 1fr;
    column-gap: 24px;
    .block {
      border: 1px solid #dbdbdb;
      border-radius: 8px;
      padding: 24px;
      &-row {
        width: 100%;
        height: auto;
        margin-bottom: 24px;
        &__title {
          @include text(16px, 24px, 600, #0a0b0d);
          margin-bottom: 8px;
        }
        &__input {
          .el-input__inner {
            height: 48px;
          }
        }
      }
      &-table {
        height: auto;
        max-height: 368px;
        overflow-y: scroll;
        &__row {
          width: 100%;
          height: auto;
          padding: 12px 0;
          border-bottom: 1px solid #dbdbdb;
          &.header {
            padding-left: 32px;
            @include text(16px, 24px, 600, #0a0b0d);
          }
          &.add {
            padding-left: 32px;
            display: flex;
            justify-content: left;
            align-items: center;
            .title {
              display: inline-block;
              @include text(14px, 16px, 400, #0151fc);
              margin-left: 12px;
            }
            .span-icon {
              line-height: 40px;
            }
          }
          &.item {
            height: 64px;
            display: flex;
            justify-content: left;
            align-items: center;
            position: relative;
            &.bg-drag {
              background-color: #f6f8fc;
            }
            &:hover {
              .drag-hover {
                visibility: visible;
              }
            }
            .drag-hover {
              width: 14px;
              height: 28px;
              display: grid;
              grid-template-columns: 5px 5px;
              column-gap: 4px;
              row-gap: 4px;
              margin-left: 3px;
              margin-right: 15px;
              visibility: hidden;
              &__dots {
                height: 5px;
                background-color: #dbdbdb;
                border-radius: 50%;
              }
            }
            .info {
              &-primary {
                @include text(16px, 24px, 400, #0a0b0d);
              }
              &-desc {
                @include text(14px, 20px, 400, #5b616e);
              }
            }
            .actions {
              position: absolute;
              right: 0;
              .span-icon {
                display: inline-block;
                margin-right: 16px;
              }
            }
          }
          &.empty {
            display: flex;
            justify-content: center;
            align-items: center;
            border-bottom: none;
          }
        }
      }
      &-header {
        height: auto;
        border-bottom: 1px solid #dbdbdb;
        &__title {
          @include text(16px, 24px, 600, #0151fc);
          display: inline-block;
          padding: 16px 12px 14px;
          border-bottom: 2px solid currentColor;
        }
      }
      &-content {
        padding: 24px 0;
        &__row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: auto;
          &:not(:last-child) {
            margin-bottom: 16px;
          }
          &--left {
            .primary {
              @include text(16px, 24px, 400, #0a0b0d);
            }
            .desc {
              @include text(14px, 20px, 400, #5b616e);
            }
          }
          &--right {
            @include text(16px, 24px, 400, #0a0b0d);
          }
        }
      }
    }
  }
</style>
