<template>
  <div class="content-account">
    <div class="box1 be-flex align-center">
      <div class="mini-boxcontent">
        <div class="be-flex align-center header">
          <base-icon class="icon-header" :class="data.currency == 'LYNK' ? 'icon-lin' : null" :icon="getIcon(data.currency)" :size="data.currency == 'LYNK' ? 30 : 40"></base-icon>
          <div>
            <p class="fw-600 fs-18">{{ getTitle }}</p>
            <p class="fw-400 fs-12 text-color">{{ $t('request.popup.account.discription1') }}</p>
          </div>
        </div>
        <div>
          <p class="fw-600 fs-24" style="line-height: 32px" :class="getClassUnit">{{ summary.balance }}</p>
          <p class="fw-400 fs-14 dolar">~${{ summary.balanceToUsd }}</p>
        </div>
      </div>
      <div class="mini-boxcontent mini-boxcontent2">
        <div class="be-flex align-center header">
          <base-icon class="icon-header" :class="data.currency == 'LYNK' ? 'icon-lin' : null" :icon="getIcon(data.currency)" :size="data.currency == 'LYNK' ? 30 : 40"></base-icon>
          <div>
            <p class="fw-600 fs-18">{{ $t('request.popup.account.available') }}</p>
            <p class="fw-400 fs-12 text-color">{{ $t('request.popup.account.discription2') }}</p>
          </div>
        </div>
        <div>
          <p class="fw-600 fs-24" style="line-height: 32px" :class="getClassUnit">{{ summary.availableBalance }}</p>
          <p class="fw-400 fs-14 dolar">~${{ summary.availableBalanceToUsd }}</p>
        </div>
      </div>
      <div class="mini-boxcontent mini-boxcontent3">
        <div class="be-flex align-center header">
          <base-icon class="icon-header" icon="icon-lock" size="40"></base-icon>
          <div>
            <p class="fw-600 fs-18">{{ $t('request.popup.account.locked') }}</p>
            <p class="fw-400 fs-12 text-color">{{ $t('request.popup.account.discription3') }}</p>
          </div>
        </div>
        <div>
          <p class="fw-600 fs-24" style="line-height: 32px">{{ summary.totalLockedAmount }}</p>
          <p class="fw-400 fs-14 dolar">~${{ summary.totalLockedAmountToUsd }}</p>
        </div>
      </div>
    </div>
    <div class="big-title fw-600 fs-24">{{ $t('request.popup.account.bigTitle1') }}</div>
    <div class="open align-center be-flex row">
      <div class="title fw-600 fs-16">{{ $t('request.popup.account.title1') }}</div>
      <div class="title2 fw-600 fs-16">{{ summary.openBalance }}</div>
      <!-- <div>{{summary.closeBalance}}</div> -->
    </div>
    <div class="box-table">
      <base-table :data="dataTable" class="base-table table-request" :showPagination="false">
        <el-table-column :label="$t('request.popup.account.label1')" prop="transactionType" align="left">
          <template slot-scope="scope">
            <div class="box-type" style="margin-left: 6px">
              <p class="fw-400 fs-16" style="color: #0a0b0d; text-transform: capitalize">{{ scope.row.transactionType.toLowerCase() }}</p>
              <p class="fw-400 fs-14 text-color">{{ scope.row.transactionDate | formatDateHourMs }}</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column :label="$t('request.popup.account.label2')" width="200" prop="transactionType" align="right">
          <template slot-scope="scope">
            <div>
              <p class="fw-400 fs-16" style="color: #129961">+ {{ scope.row.creditAmountDisplay }}</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column :label="$t('request.popup.account.label3')" width="200" prop="transactionType" align="right">
          <template slot-scope="scope">
            <div>
              <p class="fw-400 fs-16" style="color: #cf202f">{{ scope.row.debitAmountDisplay }}</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column :label="$t('request.popup.account.label4')" width="200" prop="transactionType" align="right">
          <template slot-scope="scope">
            <div>
              <p>{{ scope.row.balanceDisplay }}</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column :label="$t('request.popup.account.label5')" width="144" prop="status" align="center">
          <template slot-scope="scope">
            <div class="box-status" :class="scope.row.status == 'PENDING' ? 'pending' : null">
              <p style="text-transform: capitalize">{{ scope.row.status.toLowerCase() }}</p>
            </div>
          </template>
        </el-table-column>
      </base-table>
    </div>
    <div class="total align-center be-flex row">
      <div class="title fw-600 fs-16">{{ $t('request.popup.account.title2') }}</div>
      <div class="title2 fw-600 fs-16">{{ summary.totalCreditAmount }}</div>
      <div class="title3 fw-600 fs-16">{{ summary.totalDebitAmount }}</div>
    </div>
    <div class="close align-center be-flex row">
      <div class="title fw-600 fs-16">{{ $t('request.popup.account.title3') }}</div>
      <div class="title2 fw-600 fs-16">{{ summary.closeBalance }}</div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import getRepository from '@/services'
  import { RequestRepository } from '@/services/repositories/request'

  const api: RequestRepository = getRepository('request')

  @Component
  export default class AccountStatement extends Vue {
    @Prop() data!: any
    @Prop() dataTable!: any
    @Prop() summary!: any
    coin: any = ''
    getIcon(currency: string): void {
      let icon: any = ''
      if (currency) {
        icon = `icon-${currency.toLowerCase()}`
      }
      return icon
    }
    get getTitle(): any {
      switch (this.data.currency) {
        case 'LYNK':
          return this.$t('request.popup.account.Linkey')
        case 'BTC':
          return this.$t('request.popup.account.Bitcoin')
        case 'ETH':
          return this.$t('request.popup.account.Ethereum')
        case 'BNB':
          return this.$t('request.popup.account.Bnb')
        case 'USDT':
          return this.$t('request.popup.account.Usdt')
        case 'USDC':
          return this.$t('request.popup.account.Usdc')
        default:
          return this.$t('request.popup.account.Cleverme')
      }
    }
    get getClassUnit(): string {
      switch (this.data.currency) {
        case 'LYNK':
          return 'amount-lyn'
        case 'BTC':
          return 'amount-btc'
        case 'ETH':
          return 'amount-eth'
        case 'BNB':
          return 'amount-bnb'
        case 'USDT':
          return 'amount-usdt'
        case 'USDC':
          return 'amount-usdc'
        default:
          return 'amount-clm'
      }
    }
  }
</script>

<style scoped lang="scss">
  .content-account {
    .text-color {
      color: #5b616e;
    }
    .box1 {
      border-radius: 4px;
      border: 1px solid #dbdbdb;
      margin-bottom: 24px;
      justify-content: space-between;
      padding: 16px 24px;
      .mini-boxcontent {
        min-width: 250px;
        .header {
          margin-bottom: 16px;
          .icon-header {
            margin-right: 16px;
          }
          .icon-lin {
            background: #f3f2f1;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            text-align: center;
            line-height: 40px;
          }
        }
        .dolar {
          color: #5b616e;
        }
      }
      .mini-boxcontent2,
      .mini-boxcontent3 {
        padding-left: 24px;
        border-left: 1px solid #dbdbdb;
      }
    }
    .big-title {
      margin-bottom: 24px;
    }
    .open,
    .total,
    .close {
      background: #f3f2f1;
      color: #0a0b0d;
      height: 24px;
      padding: 12px 16px;
      .title {
        min-width: 570px;
      }
      .title2 {
        min-width: 200px;
        text-align: right;
      }
    }
    .open {
      border-radius: 4px 4px 0 0;
    }
    .total {
      margin-bottom: 8px;
      .title {
        min-width: 170px;
      }
      .title2 {
        min-width: 200px;
        text-align: right;
      }
      .title3 {
        min-width: 200px;
        text-align: right;
      }
    }
    .close {
      border-radius: 4px;
      color: #fff;
      background: #0151fc;
      .title {
        min-width: 570px;
      }
      .title2 {
        min-width: 200px;
        text-align: right;
      }
    }
    .box-table {
      .box-status {
        background: #e4f9e2;
        color: #129961;
        width: 80px;
        height: 24px;
        text-align: center;
        line-height: 24px;
        border-radius: 4px;
        font-weight: 500;
        font-size: 12px;
        margin: 0 auto;
      }
      .pending {
        background: #fff3e2;
        color: #dd7d00;
      }
    }
  }
</style>
