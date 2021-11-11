<template>
  <base-table
    :data="listTransaction"
    :showPagination="true"
    :table="query"
    :paginationInfo="getPaginationInfo"
    @sizeChange="handleSizeChange"
    @currentChange="handleCurrentChange"
    @rowClick="handleRowClick"
    class="base-table"
  >
    <el-table-column label="#" :index="getIndex" type="index" align="center" width="40" />
    <el-table-column :label="$t('transaction.table.trans-id')">
      <template slot-scope="scope">
        <div class="be-flex align-center">
          <span class="d-ib mr-2">{{ scope.row.transactionCode | formatTransactionCode(6) }}</span>
          <span v-if="scope.row.transactionCode" class="icon-copy" @click="handleCopyTransaction(scope.row)">
            <base-icon icon="icon-copy" size="24" />
          </span>
        </div>
      </template>
    </el-table-column>
    <el-table-column :label="$t('transaction.table.type')" prop="transactionType" width="154">
      <template slot-scope="scope">
        <span>{{ checkTransactionType(scope.row.transactionType) }}</span>
      </template>
    </el-table-column>
    <el-table-column :label="$t('transaction.table.date')" prop="transactionDate" width="200">
      <template slot-scope="scope">
        <span>{{ scope.row.transactionMillisecond | formatMMDDYY }}</span>
      </template>
    </el-table-column>
    <el-table-column :label="$t('transaction.table.status')" prop="status" width="120">
      <template slot-scope="scope">
        <span class="text-xs" :class="checkType(scope.row.status)">{{ checkTransactionStatus(scope.row.status) }}</span>
      </template>
    </el-table-column>
    <el-table-column :label="$t('transaction.table.amount')" align="right" width="190">
      <template slot-scope="scope">
        <div v-if="scope.row.creditAmount" class="amount-increase">
          <span>+{{ scope.row.creditAmount | convertAmountDecimal(scope.row.creditCurrency) }} {{ scope.row.creditCurrency }}</span>
          <span class="d-block amount-exchange-small">~${{ (scope.row.creditAmount * scope.row.creditUsdExchangeRate) | convertAmountDecimal('USD') }}</span>
        </div>
        <div v-else class="amount-decrease">
          <span>-{{ scope.row.debitAmount | convertAmountDecimal(scope.row.debitCurrency) }} {{ scope.row.debitCurrency }}</span>
          <span class="d-block amount-exchange-small">~${{ (scope.row.debitAmount * scope.row.debitUsdExchangeRate) | convertAmountDecimal('USD') }}</span>
        </div>
      </template>
    </el-table-column>
  </base-table>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'

  @Component
  export default class TableTransaction extends Vue {
    @Prop({ required: true, type: Array, default: [] }) listTransaction!: Record<string, any>[]
    @Prop({ required: true, type: Object, default: {} }) query!: Record<string, any>

    get getPaginationInfo(): any {
      return this.$t('paging.transaction')
    }
    get getIndex(): number {
      return this.query.limit * (this.query.page - 1) + 1
    }

    checkTransactionType(type: string): any {
      switch (type) {
        case 'DEPOSIT':
          return this.$i18n.t('transaction.table.deposit')
        case 'WITHDRAW':
          return this.$i18n.t('transaction.table.withdraw')
        case 'TRANSFER':
          return this.$i18n.t('transaction.table.transfer')
        case 'CROWDSALE':
          return this.$i18n.t('transaction.table.crowdsale')
        case 'BUY':
          return this.$i18n.t('transaction.table.buy')

        default:
          return this.$i18n.t('transaction.table.sell')
      }
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

    handleCopyTransaction(row: Record<string, any>): void {
      let message: any = ''
      const el = document.createElement('input')
      el.value = row.transactionCode
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      message = this.$t('notify.copy')
      this.$message.success(message)
    }

    handleSizeChange(value: number): void {
      this.$emit('sizeChange', value)
    }
    handleCurrentChange(value: number): void {
      this.$emit('pageChange', value)
    }
    handleRowClick(): void {
      console.log('1')
    }
  }
</script>

<style scoped lang="scss">
  .status {
    padding: 4px 7px;
    border-radius: 4px;
  }
</style>