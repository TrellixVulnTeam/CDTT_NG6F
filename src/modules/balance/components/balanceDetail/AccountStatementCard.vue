<template>
  <div class='w-100 bg-white wallet-table-balance'>
    <div class='title-popup' slot='title'>
      <span style='font-weight: 600'>{{ $t('balance.popup.account-statement') }}</span>
    </div>
    <div class='opening-balance be-flex jc-space-between'>
      <p>{{ $t('balance.popup.opening-balance') }}</p>
      <p>{{ summary.openBalance }}</p>
    </div>
    <div class='wallet-table-balance__below'>
      <base-table
        :data="data"
        :table="query"
        :paginationInfo="getPaginationInfo"
        @sizeChange="handleSizeChange"
        @currentChange="handleCurrentChange"
        @rowClick="handleRowClick"
        class="base-table table-wallet"
      >
        <el-table-column :label="$t('balance.popup.type')" width='200' prop='transactionType'>
          <template slot-scope='scope'>
            <p style='font-size: 16px'>{{scope.row.transactionType |formatType}}</p>
            <p style='color: #5B616E;font-size: 14px'>{{scope.row.transactionMillisecond| formatDateHourMs }}</p>
          </template>
        </el-table-column>
        <el-table-column :label="$t('balance.popup.credit')" align='right' prop='creditAmountDisplay'>
          <template slot-scope='scope'>
<!--            <span v-if='scope.row.creditAmount === 0'></span>-->
            <span  style='color: #129961;font-size: 16px'>+{{ scope.row.creditAmountDisplay }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('balance.popup.debit')" align='right' prop='debitAmountDisplay'>
          <template slot-scope='scope'>
<!--            <span v-if='scope.row.debitAmount === 0'></span>-->
            <span  style='color: #CF202F;font-size: 16px'>{{ scope.row.debitAmountDisplay }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('balance.popup.balance')" align='right' prop='balanceDisplay'>
        </el-table-column>
        <el-table-column :label="$t('balance.popup.status')" align='center' width='144' prop='status'>
          <template slot-scope='scope'>
            <span v-if="scope.row.status !== 'FAILED'"
                  :class='checkType(scope.row.status)'>{{ checkStatus(scope.row.status) }}</span>
            <span v-else class='status-locked'>{{ $t('status.failed') }}</span>
          </template>
        </el-table-column>
      </base-table>
    </div>
    <div class='total be-flex '>
      <p>{{ $t('balance.popup.total') }}</p>
      <p>+{{ summary.totalCreditAmount  }}</p>
      <p>-{{ summary.totalDebitAmount }}</p>
    </div>
    <div class='ending-balance be-flex jc-space-between '>
      <p>{{ $t('balance.popup.ending-balance') }}</p>
      <p>{{ summary.closeBalance }}</p>
    </div>
  </div>
</template>

<script lang='ts'>
  import { Component, Prop, Vue } from 'vue-property-decorator'

  @Component
  export default class AccountStatementCard extends Vue {
    @Prop({ required: true, type: Array, default: [] }) data!: Array<Record<string, any>>
    @Prop({ required: true }) summary!: Record<string, any>
    @Prop({ required: true, type: Object, default: {} }) query!: Record<string, any>

    get getPaginationInfo(): any {
      return this.$t('paging.balance')
    }

    checkType(type: string): string {
      return type === 'Not verified' ? 'status-not-verified' : type === 'PENDING' ? 'status-pending' : type === 'SUCCESS' ? 'status-verified' : 'status-rejected'
    }

    getDataSelectTab(): void {
      console.log('1')
    }


    checkStatus(status: string): any {
      switch (status) {
        case 'SUCCESS':
          return this.$t('status.success')
        case 'PENDING':
          return this.$t('status.pending')
        default:
          return this.$t('status.failed')
      }
    }

    // indexMethod(index: number): number {
    //   return (this.query.page - 1) * this.query.limit + index + 1
    // }

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

<style scoped lang='scss'>
  .wallet-table-balance {
    padding-bottom: 24px;
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

    .title-popup {
      padding: 24px;
      font-size: 24px;
      color: #0A0B0D;
    }

    .opening-balance {
      background-color: #F3F2F1;
      padding: 12px 16px;
      margin: 0 24px;
      p{
        font-size: 16px;
        color: #0A0B0D;
        font-weight: 600;
      }
      p:last-of-type {
        margin-right: 144px;
      }
    }
    .total{
      margin: 0 24px;
      background-color: #F3F2F1;
      padding: 12px 16px;
      p{
        width: 200px;
        font-size: 16px;
        color: #0A0B0D;
        font-weight: 600;
      }
      p:last-of-type {
        margin-right: 144px;
      }
    }
    .ending-balance{
      margin: 8px 24px 0 24px;
      border-radius: 4px;
      background-color: #0151FC;
      padding: 12px 16px;
      p{
        font-size: 16px;
        color: #FFFFFF;
        font-weight: 600;
      }
      p:last-of-type {
        margin-right: 144px;
      }
    }
  }
</style>
