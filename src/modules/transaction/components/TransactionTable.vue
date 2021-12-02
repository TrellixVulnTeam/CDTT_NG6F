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
        <el-table-column :label="$t('transaction.table.trans-id')" prop="transactionCode"> </el-table-column>
        <el-table-column :label="$t('transaction.table.DATE')" prop="transactionMillisecond"> </el-table-column>

        <el-table-column :label="$t('transaction.table.customer')" align="right">
          <template slot-scope="scope">
            <div class="box-paid">

            </div>
          </template>
        </el-table-column>
        <el-table-column :label="$t('transaction.table.status')" align="right">
          <template slot-scope="scope">
            <div class="box-paid">

            </div>
          </template>
        </el-table-column>

        <el-table-column :label="$t('transaction.table.amount')" align="right">
          <template slot-scope="scope">
            <div class="box-paid">

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
  export default class TransactionTable extends Vue {
    @Prop({ required: true, type: Object, default: {} }) query!: Record<string, any>
    @Prop({ required: true, type: Array, default: [] }) data!: Array<Record<string, any>>

    get getPaginationInfo(): any {
      return this.$t('paging.investor')
    }

    checkType(type: string): string {
      return type === 'Not verified' ? 'status-not-verified' : type === 'PENDING' ? 'status-pending' : type === 'VERIFIED' ? 'status-verified' : 'status-rejected'
    }
    getDataSelectTab(): void {
      console.log('1')
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
      this.$emit('rowClick', row.row)
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
