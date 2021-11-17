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
        <el-table-column label="#" type="index" :index="indexMethod" align="center" width="70" />
        <el-table-column :label="$t('kyc.table.fullName')" min-width="200">
          <template slot-scope="scope">
            <div class="be-flex align-center">
              <span class="d-ib mr-2">{{ scope.row.firstName + '&nbsp;' + scope.row.lastName }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column :label="$t('kyc.table.email')" prop="email" width="300"> </el-table-column>
        <el-table-column :label="$t('kyc.table.national')" prop="nationality" width="140"> </el-table-column>

        <el-table-column :label="$t('kyc.table.date')" prop="createdDate" width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.createdDate | formatDateHourMs }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('kyc.table.status')" prop="kycStatus" align="center" width="160">
          <template slot-scope="scope">
            <span :class="checkType(scope.row.kycStatus)">{{ checkStatus(scope.row.kycStatus) }}</span>
            <!-- <span class="status-locked">{{ $t('status.locked') }}</span> -->
          </template>
        </el-table-column>
      </base-table>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'

  @Component
  export default class CustomerTable extends Vue {
    @Prop({ required: true, type: Object, default: {} }) query!: Record<string, any>
    @Prop({ required: true, type: Array, default: [] }) data!: Array<Record<string, any>>

    get getPaginationInfo(): any {
      return this.$t('paging.customers')
    }

    checkType(type: string): string {
      switch (type) {
        case 'PENDING':
          return 'status-pending'
        case 'VERIFIED':
          return 'status-verified'
        case 'REJECTED ':
          return 'status-rejected'
        default:
          return 'status-not-verified'
      }
    }

    checkStatus(status: string): any {
      switch (status) {
        case 'PENDING':
          return this.$t('status.pending')
        case 'VERIFIED':
          return this.$t('status.verified')
        case 'REJECTED':
          return this.$t('status.rejected')
        default:
          return this.$t('status.unverified')
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
