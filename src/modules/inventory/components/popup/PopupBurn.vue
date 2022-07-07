<template>
  <base-popup name="popup-burn" class="popup-burn" width="480px" :close="handleClose">
    <div class="title-popup" slot="title">
      <span>{{ $t('inventory.inventory-detail.burn').toUpperCase() }}</span>
    </div>
    <div>
    </div>
  </base-popup>
</template>

<script lang="ts">
  import { Component, Mixins, Prop, Watch } from 'vue-property-decorator'
  import PopupMixin from '@/mixins/popup'
  import PopupInventoryDetailType from './PopupInventoryDetailType.vue'
  import BaseTable from '@/components/base/table/BaseTable.vue'
  import getRepository from '@/services'
  import { InventoryRepository } from '@/services/repositories/inventory'
  const api: InventoryRepository = getRepository('inventory')

  @Component({ components: { BaseTable, PopupInventoryDetailType } })
  export default class PopupInventoryDetail extends Mixins(PopupMixin) {
    @Prop({ required: true, type: Object, default: 0 }) numberBurn!: Record<string, any>
    isLoading = false
    inventoryDetailType = {}
    error = {
      quantity: ''
    }

    popup_data = {
      header: {
        title: this.$i18n.t('inventory.inventory-detail.title')
      },
      content: {},
      footer: {
        btnReset: this.$i18n.t('popup-fee.reset'),
        btnContinues: this.$i18n.t('button.apply')
      }
    }
    handleClose(): void {
      this.setOpenPopup({
        popupName: 'popup-burn',
        isOpen: false
      })
      if (this.$route.query) {
        this.$router.replace({ query: undefined })
      }
    }
  }
</script>

<style scoped lang="scss">
  @mixin text($size, $height, $weight, $color) {
    font-size: $size;
    line-height: $height;
    font-weight: $weight;
    color: $color;
  }
  ::v-deep.base-table .cell {
    font-weight: 600;
  }

  ::v-deep.popup-inventory-detail {
    .popup-content {
      background-color: #f6f8fc;
      .content {
        &-top {
          width: 100%;
          height: auto;
          display: flex;
          justify-content: center;
          align-items: center;
          &__divided {
            width: 50%;
            height: auto;
            display: flex;
            justify-content: left;
            &:first-child {
              border-right: 1px solid #dbdbdb;
            }
            &_img {
              width: 48px;
              height: 48px;
              border-radius: 4px;
              margin-right: 24px;
              border: 1px solid #dbdbdb;
              object-fit: cover;
            }
            &_text {
              .name {
                @include text(18px, 24px, 600, #0a0b0d);
                display: -webkit-box;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
                overflow: hidden;
                text-overflow: ellipsis;
              }
            }
          }
        }
        &-mid {
          width: 100%;
          height: auto;
          padding: 24px;
          box-sizing: border-box;
          background-color: #ffffff;
          &__title {
            @include text(24px, 32px, 600, #0a0b0d);
            margin-bottom: 16px;
          }
          .inventory-table {
            &__label {
              th {
                padding: 12px 10px;
                @include text(16px, 24px, 600, #0a0b0d);
                border-bottom: 1px solid #ded0ce;
              }
              th:nth-child(1) {
                text-align: left;
                width: 300px;
              }
              th:nth-child(2) {
                width: 350px;
              }
              th:nth-child(3) {
                text-align: right;
                width: 292px;
                visibility: hidden;
              }
            }
            &__content {
              .btn-action {
                @include text(14px, 16px, 400, #3B3A39);
                padding: 8px 28px;
                border: 1px solid #DBDBDB;
                border-radius: 6px;
                margin-left: 16px;
                cursor: pointer;
                box-sizing: border-box;
                height: 32px;
                &:hover {
                  border: 1px solid #c2bfbf;
                }
              }
              td {
                height: 24px;
                padding: 20px 10px;
                @include text(16px, 24px, 400, #0a0b0d);
                border-bottom: 1px solid #ded0ce;
              }
              td:nth-child(2) {
                text-align: center;
              }
              td:nth-child(3) {
                text-align: right;
              }
            }
          }
          .table-mid {
            .el-table__row {
              height: 64px;
            }
            .type-name,
            .quantity {
              @include text(16px, 24px, 400, #0a0b0d);
            }
            .wrap-button {
              display: flex;
              justify-content: right;
              align-items: center;
              .btn-action {
                display: inline-block;
                width: auto;
                padding: 8px 27.5px;
                @include text(14px, 16px, 400, #3b3a39);
                text-align: center;
                border: 1px solid #dbdbdb;
                border-radius: 6px;
                &:not(:last-child) {
                  margin-right: 16px;
                }
              }
            }
          }
        }
        &-bot {
          padding: 24px;
          background-color: var(--bc-color-white);
          &__title {
            @include text(24px, 32px, 600, #0a0b0d);
            margin-bottom: 16px;
          }
          .opening-quantity,
          .ending-quantity {
            width: 100%;
            height: 48px;
            background-color: var(--bc-color-grey20);
            padding: 0 10px;
            box-sizing: border-box;
            &__title,
            &__number {
              @include text(16px, 48px, 600, #0a0b0d);
            }
          }
          .table-bot {
            .event-type__title {
              @include text(16px, 24px, 400, #0a0b0d);
            }
            .event-type__date {
              @include text(14px, 20px, 400, #5b616e);
            }
            .increase {
              @include text(16px, 24px, 400, #129961);
            }
            .decrease {
              @include text(16px, 24px, 400, #cf202f);
            }
            .quantity {
              @include text(16px, 24px, 400, #0a0b0d);
            }
            .status {
              display: inline-block;
              width: 80px;
              text-align: center;
              padding: 4px;
              border-radius: 4px;
              &__success {
                background-color: var(--bc-bg-success);
                @include text(12px, 16px, 500, #129961);
              }
              &__pending {
                background-color: var(--bc-bg-pending);
                @include text(12px, 16px, 500, #dd7d00);
              }
              &__processing {
                background-color: var(--bc-bg-pending);
                @include text(12px, 16px, 500, #dd7d00);
              }
            }
          }
          .ending-quantity {
            background-color: var(--bc-theme-primary);
            display: flex;
            justify-content: space-between;
            align-items: center;
            span {
              display: block;
              color: var(--bc-color-white);
            }
            &__number {
              width: 186px;
              margin-right: 172px;
              text-align: right;
              padding-right: 16px;
            }
          }
          .opening-quantity {
            display: flex;
            justify-content: space-between;
            align-items: center;
            span {
              display: block;
            }
            &__number {
              width: 186px;
              margin-right: 172px;
              text-align: right;
              padding-right: 16px;
            }
          }
        }
      }
    }
    .ml-24 {
      margin-left: 24px;
    }
    .mb-24 {
      margin-bottom: 24px;
    }
    .circle {
      border-radius: 50% !important;
    }
    .code {
      color: #5b616e;
    }
  }
</style>
