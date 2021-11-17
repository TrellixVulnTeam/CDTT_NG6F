<template>
  <div class="content-account" v-loading="loading">
    <div class="box1 be-flex align-center">
      <div class="mini-boxcontent">
        <div class="be-flex align-center header">
          <base-icon class="icon-header" :icon="getIcon(data.currency)" size="40"></base-icon>
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
          <base-icon class="icon-header" :icon="getIcon(data.currency)" size="40"></base-icon>
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
    <div class="box-table">
      <base-table :data="dataTable" class="base-table table-request" :showPagination="false">
        <el-table-column :label="$t('request.popup.account.label1')" prop="transactionType" align="left">
          <template slot-scope="scope">
            <div>
              <p class="fw-400 fs-16" style="color: #0a0b0d">{{ scope.row.transactionType }}</p>
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
    dataTable: any = []
    summary: any = {}
    coin: any = ''
    loading = true
    async getTable(): Promise<void> {
      if (this.data.userId) {
        await api
          .getTableStatement(this.data.currency, this.data.userId)
          .then((res: any) => {
            this.loading = false
            this.dataTable = res.transactions.content
            this.summary = res.summary
          })
          .catch(error => {
            console.log(error)
            this.loading = false
          })
      }
    }
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
    created(): void {
      this.getTable()
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
