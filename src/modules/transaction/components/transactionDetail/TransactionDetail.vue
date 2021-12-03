<template>
  <base-popup name='popup-transaction-detail' class='popup-transaction-detail' width='480px' :isShowFooter='false'
              :open='handleOpen' :close='handleClose'>
    <div class='title-popup' slot='title'>
      <span>{{ handleRenderTitleDetail(detailRow.transactionType) }} {{ detailRow.currency }}</span>
    </div>
    <div class='w-100 fluctuating '>
      <div class='text-center'>
        <div class='icon' :class='checkTypeStatusIcon(detailRow.status)'>
          <base-icon :className='"icon-pending"'
                     :icon='checkTypeIcon(detailRow.transactionType,detailRow.status)'
                     size='64' />
        </div>
        <p :class='checkValueAmountDisplay(detailRow.amountDisplay)'>{{ detailRow.amountDisplay }}</p>
        <p class='usd'>~${{ detailRow.amountToUsd | convertAmountDecimal('USD') }}</p>
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
      <div v-if='detailRow.fromAddress' class='item be-flex'>
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
       <div class='be-flex'>
         <p v-if=' detailRow.transactionFee>0' class='add'>{{ detailRow.transactionFee }} {{ detailRow.currency }}</p>
         <p v-if=' detailRow.transactionFee<0' class='sub'>{{ detailRow.transactionFee }} {{ detailRow.currency }}</p>
         <p class='convert' style='margin-left: 4px'>(~${{detailRow.transactionFeeToUsd | convertAmountDecimal('USD')}})</p>
       </div>
      </div>
      <div class="item be-flex">
        <p>Status</p>
        <p :class="checkType(detailRow.status)">{{ checkTransactionStatus(detailRow.status) }}</p>
      </div>
    </div>
    <div class='customer-info'>
      <p class='title'>{{ $t('transaction.popup.customer-info') }}</p>
      <div class='item be-flex'>
        <p>Full name</p>
        <p>{{ detailRow.fullName }}</p>
      </div>
      <div class="item be-flex">
        <p>Phone number</p>
        <p>({{detailRow.phoneCode}}) {{ detailRow.phone }}</p>
      </div>
      <div class="item be-flex">
        <p>Email</p>
        <p>{{ detailRow.email }}</p>
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
    @Prop({ required: true, type:String ,default: ""}) tabActiveFilter!: string
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

    checkTypeIcon(type: string|undefined, status: string|undefined): string {
    if (type&&status){
      type.toUpperCase();
      status.toUpperCase()
      if (status === 'PENDING' || status === 'PROCESSING') {
        if (type.indexOf('BONUS') !== -1) {
          return `icon-bonus-pending`
        } else
          return `icon-${type.toLowerCase()}-pending`
      } else if (type.indexOf('BONUS') !== -1) {
        return `icon-bonus-success`
      } else return `icon-${type.toLowerCase()}-success`
    }else return ""


    }

    checkTypeStatusIcon(type: string): string {
      return type === 'PENDING'
        ? 'icon-pending'
        : type === 'FAILED'
          ? 'icon-failed'
          : type === 'PROCESSING'
            ? 'icon-pending'
            : type === 'REJECTED'
              ? 'icon-failed'
              : 'icon-success'
    }

    checkValueAmountDisplay(value: string | null): string {
      if (value) {
        if (value.indexOf('+') !== -1) {
          return 'add'
        } else {
          return 'sub'
        }
      } else return ''
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
    handleRenderTitleDetail(type:string|null|undefined):string{
      if (type){
        return  type.replaceAll("_"," ")
      }else return ""

    }
  }
</script>

<style scoped lang="scss">
  .popup-transaction-detail {
    .add {
      color: #129961!important;
    }

    .sub {
      color: #CF202F!important;
    }
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

    .icon-success {
      color: #129961;
    }

    .icon-failed {
      color: #CF202F;
    }

    .icon-pending {
      color: #F3F2F1;
    }

    .transaction-detail, .customer-info {
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

        p:first-of-type,.convert {
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
