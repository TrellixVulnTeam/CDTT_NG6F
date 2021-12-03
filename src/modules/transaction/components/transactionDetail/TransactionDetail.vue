<template>
  <base-popup name="popup-transaction-detail" class="popup-transaction-detail" width="480px" :isShowFooter="false" :open="handleOpen" :close="handleClose">
    <div class="title-popup" slot="title">
      <span>{{ detailRow.transactionType }} {{ detailRow.currency }}</span>
    </div>
    <div class="w-100 fluctuating">
      <div class="text-center">
        <div class="icon">
          <base-icon :icon="checkTypeIcon(detailRow.status)" size="64" />
        </div>
        <p class="add">{{ detailRow.amountDisplay }}</p>
        <p class="usd">~${{ detailRow.amountToUsd | convertAmountDecimal('USD') }}</p>
      </div>
    </div>
    <div class="transaction-detail">
      <p class="title">{{ $t('transaction.popup.transaction-detail') }}</p>
      <div class="item be-flex">
        <p>Transaction ID</p>
        <div class="be-flex align-center">
          <p>{{ detailRow.transactionCode | formatTransactionCode(10) }}</p>
          <span v-if="detailRow.transactionCode" style="margin-left: 8px" class="icon-copy" @click="handleCopyTransaction(detailRow.transactionCode)">
            <base-icon icon="icon-copy" size="24" />
          </span>
        </div>
      </div>
      <div class="item be-flex">
        <p>Date</p>
        <p>{{ detailRow.transactionMillisecond | formatMMDDYY }}</p>
      </div>
      <div class="item be-flex">
        <p>From</p>
        <div class="be-flex align-center">
          <p>{{ detailRow.fromAddress | formatTransactionCode(10) }}</p>
          <span v-if="detailRow.fromAddress" style="margin-left: 8px" class="icon-copy" @click="handleCopyTransaction(detailRow.fromAddress)">
            <base-icon icon="icon-copy" size="24" />
          </span>
        </div>
      </div>
      <div class="item be-flex">
        <p>To</p>
        <div class="be-flex align-center">
          <p>{{ detailRow.toAddress | formatTransactionCode(10) }}</p>
          <span v-if="detailRow.toAddress" style="margin-left: 8px" class="icon-copy" @click="handleCopyTransaction(detailRow.toAddress)">
            <base-icon icon="icon-copy" size="24" />
          </span>
        </div>
      </div>
      <div class="item be-flex">
        <p>Fees</p>
        <p>{{ detailRow.transactionFee }}</p>
      </div>
      <div class="item be-flex">
        <p>Status</p>
        <p :class="checkType(detailRow.status)">{{ checkTransactionStatus(detailRow.status) }}</p>
      </div>
    </div>
    <div class="customer-info">
      <p class="title">Customer Info</p>
      <div class="item be-flex">
        <p>Full name</p>
        <p>{{ detailRow.fullName }}</p>
      </div>
      <div class="item be-flex">
        <p>Phone number</p>
        <p>{{ detailRow.phoneNumber }}</p>
      </div>
      <div class="item be-flex">
        <p>Email</p>
        <p>{{ detailRow.email }}B</p>
      </div>
    </div>
  </base-popup>
</template>

<script lang="ts">
  import { Component, Mixins, Prop } from 'vue-property-decorator'
  import PopupMixin from '@/mixins/popup'

  @Component({ components: {} })
  export default class TransactionDetail extends Mixins(PopupMixin) {
    @Prop({ required: true, type: Object, default: {} }) detailRow!: Record<string, any>
    @Prop({ required: true }) tabActiveFilter!: string
    isLoading = false
    tabActive = 0

    async handleOpen(): Promise<void> {
      console.log('open')
    }

    handleClose(): void {
      this.tabActive = 0
      this.setOpenPopup({
        popupName: 'popup-transaction-detail',
        isOpen: false
      })
    }

    checkTransactionStatus(status: string): any {
      switch (status) {
        case 'SUCCESS':
          return this.$i18n.t('transaction.table.succsess')
        case 'PENDING':
          return this.$i18n.t('transaction.table.pending')
        case 'PROCESSING':
          return this.$i18n.t('transaction.table.processing')
        case 'REJECTED':
          return this.$i18n.t('transaction.table.rejected')

        default:
          return this.$i18n.t('transaction.table.failed')
      }
    }

    checkType(type: string): string {
      return type === 'PENDING'
        ? 'status status-pending'
        : type === 'FAILED'
        ? 'status status-error'
        : type === 'PROCESSING'
        ? 'status status-warning'
        : type === 'REJECTED'
        ? 'status status-rejected'
        : 'status status-success'
    }

    checkTypeIcon(type: string): string {
      return type === 'PENDING'
        ? 'status status-pending'
        : type === 'FAILED'
        ? 'status status-error'
        : type === 'PROCESSING'
        ? 'status status-warning'
        : type === 'REJECTED'
        ? 'status status-rejected'
        : 'icon-light-upload'
    }

    handleCopyTransaction(row: any): void {
      let message: any = ''
      const el = document.createElement('input')
      el.value = row
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      message = this.$t('notify.copy')
      this.$message.success(message)
    }
  }
</script>

<style scoped lang="scss">
  .popup-transaction-detail {
    .fluctuating {
      display: inline-flex;
      justify-content: center;
      padding: 24px 0 16px 0;
      background-color: #ffffff;
      margin-bottom: 8px;

      p {
        font-family: Open Sans;
        font-style: normal;
        font-weight: 600;
        font-size: 20px;
        line-height: 24px;
      }

      .add {
        color: #129961;
      }

      .sub {
        color: #cf202f;
      }
      .usd {
        font-family: Open Sans;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 20px;
        color: #5b616e;
      }
      .icon {
        margin-bottom: 12px;
      }
    }

    .transaction-detail,
    .customer-info {
      background-color: #ffffff;
      margin-bottom: 8px;
      padding: 24px;

      .title {
        font-family: Open Sans;
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 24px;
        color: #0a0b0d;
        //margin-bottom: 14px;
      }

      .item {
        justify-content: space-between;
        border-bottom: 1px solid #dbdbdb;
        padding-bottom: 14px;
        padding-top: 14px;
        //margin-bottom: 14px;
        align-items: center;

        p:first-of-type {
          font-family: Open Sans;
          font-style: normal;
          font-weight: normal;
          font-size: 14px;
          line-height: 20px;
          color: #5b616e;
        }

        &:last-of-type {
          border-bottom: none;
          margin-bottom: 0;
        }
      }
    }

    .customer-info {
      margin-bottom: 0;
    }
  }
</style>
