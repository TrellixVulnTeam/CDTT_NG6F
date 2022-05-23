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
        <el-table-column label="#" type="index" :index="indexMethod" align="center" width="80" />
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
              <span v-if="scope.row.transactionCode" class="icon-copy" @click="handleCopyTransaction(scope.row)" ref="buttonCopy">
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

        <el-table-column v-if="type !== 'customer'" :label="$t('transaction.table.CUSTOMER')" prop="transactionDate" width="260">
          <template slot-scope="scope">
            <div class="customer">
              <p>{{ scope.row.fullName }}</p>
              <p>{{ scope.row.email }}</p>
            </div>
          </template>
        </el-table-column>
        
        <el-table-column :label="$t('transaction.table.status')" prop="status" :width="type !== 'customer' ? 144 : 120" align="center">
          <template slot-scope="scope">
            <span class="text-xs" :class="checkType(scope.row.status)">{{ checkTransactionStatus(scope.row.status) }}</span>
          </template>
        </el-table-column>

        <el-table-column :label="$t('fee.table.fee')" align="right" :width="type !== 'customer' ? 200 : 190" prop="transactionFee">
          <template slot-scope="scope">
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
                <span :class="checkValueFeeDisplay(scope.row.transactionFee)">{{ `${scope.row.transactionFee.toFixed(8)} ${scope.row.currency}` }}</span>
                <span class="d-block amount-exchange-small">~${{ scope.row.transactionFeeToUsd | convertAmountDecimal('USD') }}</span>
              </div>
            </div>
          </template>
        </el-table-column>
      </base-table>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'

  @Component
  export default class FeeTable extends Vue {
    @Prop({ required: true, type: Object, default: {} }) query!: Record<string, any>
    @Prop({ required: true, type: Array, default: [] }) data!: Array<Record<string, any>>
    @Prop() propTabActive!: string
    get getPaginationInfo(): any {
      return this.$t('paging.transaction')
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
     checkValueAmountDisplay(value: string | null): string {
      if (value) {
        if (value.indexOf('+') !== -1) {
          return 'add'
        } else {
          return 'sub'
        }
      } else return ''
    }
    checkValueFeeDisplay(value: number | null): string {
      if(value) {
        return value >= 0 ? 'add' : 'sub'
       }
      else {
        return ''
      }
    }
    handleCopyTransaction(row: Record<string, any>): void {
      this.$emit('copy', 'copy')
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
    indexMethod(index: number): number {
      return (this.query.page - 1) * this.query.limit + index + 1
    }

    handleSizeChange(value: number): void {
      this.$emit('sizeChange', value)
    }
    handleCurrentChange(value: number): void {
      console.log('change page')
      this.$emit('pageChange', value)
    }

    handleRowClick(row: Record<string, any>): void {
      this.$emit('rowClick', row.row)
    }
  }
</script>

<style scoped lang="scss">
  .add {
    color: #129961;
  }

  .sub {
    color: #cf202f;
  }
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
