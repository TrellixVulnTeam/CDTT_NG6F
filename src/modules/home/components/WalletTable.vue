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
        <el-table-column label="#" type="index" align="center" width="40" />
        <el-table-column :label="$t('kyc.table.fullName')" prop="id" min-width="200">
          <template slot-scope="scope">
            <div class="be-flex align-center">
              <span class="d-ib mr-2">{{ scope.row.name }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column :label="$t('kyc.table.email')" prop="email" width="300"> </el-table-column>
        <el-table-column :label="$t('kyc.table.national')" prop="national" width="140"> </el-table-column>

        <el-table-column :label="$t('kyc.table.date')" prop="date" width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.date | formatDateHourMs }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('kyc.table.status')" prop="status" align="center" width="160">
          <template slot-scope="scope">
            <span :class="checkType(scope.row.status)">{{ scope.row.status }}</span>
          </template>
        </el-table-column>
      </base-table>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'

  @Component
  export default class WalletTable extends Vue {
    data: Array<Record<string, any>> = [
      {
        name: 'Trần Nguyễn Hoàng Trung',
        date: Date.now(),
        email: 'maihoangnguyen@gmail.com',
        status: 'Not verified',
        national: 'Viet Nam'
      },
      {
        name: 'Trần Nguyễn Hoàng Trung',
        date: Date.now(),
        email: 'maihoangnguyen@gmail.com',
        status: 'Pending',
        national: 'Viet Nam'
      },
      {
        name: 'Trần Nguyễn Hoàng Trung',
        date: Date.now(),
        email: 'maihoangnguyen@gmail.com',
        status: 'Verified',
        national: 'Viet Nam'
      },
      {
        name: 'Trần Nguyễn Hoàng Trung',
        date: Date.now(),
        email: 'maihoangnguyen@gmail.com',
        status: 'Rejected',
        national: 'Viet Nam'
      },
      {
        name: 'Trần Nguyễn Hoàng Trung',
        date: Date.now(),
        email: 'maihoangnguyen@gmail.com',
        status: 'Pending',
        national: 'Viet Nam'
      },
      {
        name: 'Trần Nguyễn Hoàng Trung',
        date: Date.now(),
        email: 'maihoangnguyen@gmail.com',
        status: 'Pending',
        national: 'Viet Nam'
      },
      {
        name: 'Trần Nguyễn Hoàng Trung',
        date: Date.now(),
        email: 'maihoangnguyen@gmail.com',
        status: 'Pending',
        national: 'Viet Nam'
      },
      {
        name: 'Trần Nguyễn Hoàng Trung',
        date: Date.now(),
        email: 'maihoangnguyen@gmail.com',
        status: 'Pending',
        national: 'Viet Nam'
      },
      {
        name: 'Trần Nguyễn Hoàng Trung',
        date: Date.now(),
        email: 'maihoangnguyen@gmail.com',
        status: 'Pending',
        national: 'Viet Nam'
      },
      {
        name: 'Trần Nguyễn Hoàng Trung',
        date: Date.now(),
        email: 'maihoangnguyen@gmail.com',
        status: 'Pending',
        national: 'Viet Nam'
      }
    ]

    query: Record<string, any> = {
      page: 1,
      limit: 20,
      total: 0
    }

    get getPaginationInfo(): any {
      return this.$t('paging.customers')
    }

    checkType(type: string): string {
      return type === 'Not verified' ? 'status-not-verified' : type === 'Pending' ? 'status-pending' : type === 'Verified' ? 'status-verified' : 'status-rejected'
    }

    handleSizeChange(value: number): void {
      this.query.page = 1
      this.query.limit = value
      // this.init()
    }
    handleCurrentChange(value: number): void {
      this.query.page = value
      // this.init()
    }

    handleRowClick(row: Record<string, any>): void {
      this.$emit('rowClick', row)
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
