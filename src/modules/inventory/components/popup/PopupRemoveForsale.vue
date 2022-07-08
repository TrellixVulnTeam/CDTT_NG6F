<template>
  <base-popup name="popup-remove-for-sale" class="popup-remove-for-sale" width="480px" :close="handleClose">
    <div class="title-popup" slot="title">
      <span>{{ $t('inventory.inventory-detail.remove-from-sale').toUpperCase() }}</span>
    </div>
    <div class="content">
      <span>You are removing items from sale</span>
      <div class="content-filter">
        <div class="content-filter__title">{{ $t('inventory.inventory-detail.quantity').toLowerCase() }}</div>
        <el-select
          :disabled="true"
          filterable
          v-model="value"
          :placeholder="$t('inventory.inventory-detail.select') + ' ' + $t('inventory.inventory-detail.quantity').toLowerCase()"
        >
          <el-option :key="numberRemoveSale" :label="numberRemoveSale" :value="numberRemoveSale"> </el-option>
        </el-select>
      </div>
    </div>
    <div class="footer" slot="footer">
      <div class="wrap-button">
        <div class="btn-right">
          <el-button class="btn-default-bg btn-400 btn-h-40 is-none-border" style="font-size: 14px; font-weight: 600" :disabled="!value" @click="handleApply">
            {{ popup_data.footer.btnContinues }}
          </el-button>
        </div>
      </div>
    </div>
    <popup-verify-email @submit="handleRemoveForSale"></popup-verify-email>
  </base-popup>
</template>

<script lang="ts">
  import { Component, Mixins, Prop, Watch } from 'vue-property-decorator'
  import PopupMixin from '@/mixins/popup'
  import PopupInventoryDetailType from './PopupInventoryDetailType.vue'
  import PopupVerifyEmail from './PopupVerifyEmail.vue'
  import BaseTable from '@/components/base/table/BaseTable.vue'
  import getRepository from '@/services'
  import { SettingRepository } from '@/services/repositories/setting'
  import { InventoryRepository } from '@/services/repositories/inventory'
  const api: SettingRepository = getRepository('setting')
  const apiInventory: InventoryRepository = getRepository('inventory')
  import EventBus from '@/utils/eventBus'

  @Component({ components: { BaseTable, PopupInventoryDetailType, PopupVerifyEmail } })
  export default class PopupRemoveForsale extends Mixins(PopupMixin) {
    @Prop({ required: true, type: Number, default: 0 }) numberRemoveSale!: number
    @Prop({ required: true, type: [String, Number], default: '' }) itemId!: string | number
    @Prop({ required: true, type: [String, Number], default: '' }) accountId!: string | number
    @Prop({
      required: true,
      type: Object,
      default: () => {
        return {}
      }
    })
    detail!: Record<string, any>
    isLoading = false
    value = null

    @Watch('numberRemoveSale') watchNumberRemoveSale(number) {
      this.value = number
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
    handleReset() {
      this.value = null
    }
    handleRemoveForSale(code) {
      const params = {
        itemId: this.itemId,
        accountId: this.accountId,
        quantity: this.value,
        verificationCode: parseInt(code)
      }
      apiInventory
        .removeForSaleNft(params)
        .then(data => {
          this.$message.success(this.$t('inventory.inventory-detail.remove-sale-success') as string)
          this.setOpenPopup({
            popupName: 'popup-verify-email',
            isOpen: false
          })
          setTimeout(() => {
            this.setOpenPopup({
              popupName: 'popup-remove-for-sale',
              isOpen: false
            })
          }, 100)
          EventBus.$emit('reload-data-inventory', { ownerId: this.accountId, itemId: this.itemId }, 'REMOVE_SALE')
        })
        .catch(error => {
          if (error.response.data.status == 'EXPIRED_VERIFICATION' || error.response.data.status == 'INVALID_VERIFICATION') {
            console.log(error)
          } else {
            this.setOpenPopup({
              popupName: 'popup-verify-email',
              isOpen: false
            })
          }
        })
    }
    handleApply() {
      const data = {
        email: this.$store.state.beAuth.user.email,
        type: 'EMAIL',
        userType: 'EMPLOYEE'
      }
      api.resendCode(data).then(() => {
        let message: any = this.$t('verified.sendCodeMess')
        this.$message.success(message)
        setTimeout(() => {
          this.setOpenPopup({
            popupName: 'popup-verify-email',
            isOpen: true
          })
        }, 500)
      })
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

  ::v-deep.popup-remove-for-sale {
    .popup-content {
      .el-input.is-disabled .el-input__inner {
        color: initial;
      }
      padding-bottom: 24px;
      .content {
        @include text(16px, 24px, 400, #5b616e);
        .text-semibold {
          @include text(16px, 24px, 600, #0a0b0d);
        }
        .content-filter {
          margin-top: 24px;
          &__title {
            @include text(14px, 20px, 400, #0a0b0d);
            text-transform: capitalize;
          }
          .el-select {
            width: 100%;
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
