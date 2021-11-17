<template>
  <div class="content-account">
    <div class="box1 be-flex align-center">
      <div class="mini-boxcontent">
        <div class="be-flex align-center header">
          <base-icon class="icon-header" :icon="getIcon(data.currency)" size="40"></base-icon>
          <div>
            <p class="fw-600 fs-18">{{ $t('request.popup.account.wallet') }}</p>
            <p class="fw-400 fs-12 text-color">{{ $t('request.popup.account.discription1') }}</p>
          </div>
        </div>
        <div>
          <p class="fw-600 fs-24 color-coin" style="line-height: 32px">0.00864788 BTC</p>
          <p class="fw-400 fs-14 dolar">~$44,152.00</p>
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
          <p class="fw-600 fs-24 color-coin" style="line-height: 32px">0.00864788 BTC</p>
          <p class="fw-400 fs-14 dolar">~$44,152.00</p>
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
          <p class="fw-600 fs-24 color-coin" style="line-height: 32px">0.00864788 BTC</p>
          <p class="fw-400 fs-14 dolar">~$44,152.00</p>
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
    async getTable(): Promise<void> {
      if (this.data.userId) {
        await api.getTableStatement(this.data.userId).then((res: any) => {
          this.dataTable = res.transactions.content
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
