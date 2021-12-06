<template>
  <div class="w-100 bg-white wallet-table">
    <div class="wallet-table__below">
      <base-table
        :data="data"
        :table="query"
        :paginationInfo="getPaginationInfo"
        @sizeChange="handleSizeChange"
        @currentChange="handleCurrentChange"
        @rowClick="handleRowClick"
        class="base-table table-wallet"
      >
        <el-table-column label="#" type="index" :index="indexMethod" align="center" width="60" />
        <!-- <el-table-column :label="$t('kyc.table.fullName')" min-width="200">
          <template slot-scope="scope">
            <div class="be-flex align-center">
              <span class="d-ib mr-2">{{ scope.row.fullName + '&nbsp;' + scope.row.lastName }}</span>
            </div>
          </template>
        </el-table-column> -->
        <el-table-column :label="$t('transaction.table.trans-id')">
          <template slot-scope="scope">
            <div class="be-flex align-center">
              <span v-if="type === 'customer'" class="d-ib mr-2">{{ scope.row.transactionCode | formatTransactionCode(6) }}</span>
              <span v-else class="transaction-code d-ib mr-2">{{ scope.row.transactionCode | formatTransactionCode(10) }}</span>
              <span v-if="scope.row.transactionCode" class="icon-copy" @click="handleCopyTransaction(scope.row)">
                <base-icon icon="icon-copy" size="24" />
              </span>
            </div>
          </template>
        </el-table-column>

        <el-table-column :label="$t('transaction.table.date')" prop="transactionDate" :width="type !== 'customer' ? 220 : 200">
          <template slot-scope="scope">
            <span>{{ scope.row.transactionMillisecond | formatMMDDYY }}</span>
          </template>
        </el-table-column>

        <el-table-column :label="$t('transaction.table.CUSTOMER')" prop="transactionDate" width="260">
          <template slot-scope="scope">
            <div class="customer">
              <p>{{ scope.row.fullName }}</p>
              <p>{{ scope.row.email }}</p>
            </div>
          </template>
        </el-table-column>

        <el-table-column :label="$t('transaction.table.amount')" align="right">
          <!-- <template slot-scope="scope">
            <div v-if="type === 'customer'">
              <div v-if="scope.row.creditAmount" class="amount-increase">
                <span>+{{ scope.row.creditAmount | convertAmountDecimal(scope.row.creditCurrency) }} {{ scope.row.creditCurrency }}</span>
                <span class="d-block amount-exchange-small">~${{ (scope.row.creditAmount * scope.row.creditUsdExchangeRate) | convertAmountDecimal('USD') }}</span>
              </div>
              <div v-else class="amount-decrease">
                <span>-{{ scope.row.debitAmount | convertAmountDecimal(scope.row.debitCurrency) }} {{ scope.row.debitCurrency }}</span>
                <span class="d-block amount-exchange-small">~${{ (scope.row.debitAmount * scope.row.debitUsdExchangeRate) | convertAmountDecimal('USD') }}</span>
              </div>
            </div>
            <div v-else>
              <div class="amount-increase">
                <span :class="checkValueAmountDisplay(scope.row.amountDisplay)">{{ scope.row.amountDisplay }}</span>
                <span class="d-block amount-exchange-small">~${{ scope.row.amountToUsd | convertAmountDecimal('USD') }}</span>
              </div>
            </div>
          </template> -->
        </el-table-column>
      </base-table>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'

  @Component
  export default class KycTable extends Vue {
    @Prop({ required: true, type: Object, default: {} }) query!: Record<string, any>
    @Prop({ required: true, type: Array, default: [] }) data!: Array<Record<string, any>>
    @Prop() propTabActive!: string
    get getPaginationInfo(): any {
      return this.$t('paging.investor')
    }

    checkType(type: string): string {
      return type === 'Not verified' ? 'status-not-verified' : type === 'PENDING' ? 'status-pending' : type === 'VERIFIED' ? 'status-verified' : 'status-rejected'
    }
    getDataSelectTab(): void {
      console.log('1')
    }
    created(): void {
      // EventBus.$on('pushAvatar', url => {
      //   this.image = url
      // })
    }
    checkStatus(status: string): any {
      switch (status) {
        case 'PENDING':
          return this.$t('status.pending')
        case 'VERIFIED':
          return this.$t('status.verified')
        default:
          return this.$t('status.rejected')
      }
    }
    indexMethod(index: number): number {
      return (this.query.page - 1) * this.query.limit + index + 1
    }

    handleSizeChange(value: number): void {
      this.$emit('sizeChange', value)
    }
    handleCurrentChange(value: number): void {
      this.$emit('pageChange', value)
    }

    handleRowClick(row: Record<string, any>): void {
      this.$emit('rowClick', row)
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
  }
</script>

<style scoped lang="scss">
  .wallet-table {
    &__above {
      border-bottom: 1px solid var(--bc-border-primary);
      &-tabs {
        .tab-item {
          padding: 16px 12px;
          position: relative;
          &:hover {
            color: var(--bc-tab-active);
          }
        }
        .tab-active {
          color: var(--bc-tab-active);
          font-weight: 600;
          &::after {
            content: '';
            position: absolute;
            width: 100%;
            height: 2px;
            bottom: 0;
            left: 0;
            background-color: var(--bc-tab-active);
          }
        }
      }
    }
    &__below {
      padding: 0 24px;
      .table-wallet {
        .amount-decrease {
          color: var(--bc-status-error);
        }
        .amount-increase {
          color: var(--bc-status-success);
        }
      }
    }
  }
</style>
