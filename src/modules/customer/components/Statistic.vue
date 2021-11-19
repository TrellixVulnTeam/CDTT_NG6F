<template>
  <div class='list-balance'>
    <div class='statistics-card be-flex'>
      <div class='item-statistics' v-for='(value,index) in dataStatisticCard' :key='index'>
        <div class='be-flex jc-space-between'>
          <p>{{ value.label }}</p>
          <base-icon :icon='value.icon' size='20' style='display: inline-flex' />
        </div>
        <p class='value-statistics'>${{ value.value }}</p>
      </div>
    </div>
    <div class='title-list-statistics'>
      <p>{{$t('customer.popup.transaction-statistics')}}</p>
    </div>
    <div class='table' v-loading='isLoading' :class="isLoading ? 'list-loading' : null">
      <base-table
        :data='listStatistics'
        :showPagination='false'
        class='base-table table-wallet'
      >
        <el-table-column label='#' :index='getIndex' type='index' width='40' />
        <el-table-column :label="$t('customer.table.type')" prop='transactionType' align='left'>
          <template slot-scope='scope'>
            <span>{{ scope.row.transactionType |formatType}}</span>
          </template>
        </el-table-column>

        <el-table-column :label="$t('customer.table.num-of-trans')" prop='numOfTransaction' align='center'></el-table-column>
        <el-table-column :label="$t('customer.table.total-amount')" prop='totalAmount' align='right'>
          <template slot-scope='scope'>
            <span class='text-base'>${{ scope.row.totalAmount |numberWithCommas}} </span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('customer.table.avg-trans-amount')" align='right' prop='avgAmount' width='210'>
          <template slot-scope='scope'>
            <span>${{scope.row.avgAmount|numberWithCommas}}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('customer.table.last-transaction')" prop='lastTransaction' width='210' align='center'>
          <template slot-scope='scope'>
            <span>{{scope.row.lastTransaction|formatDateHourMs}}</span>
          </template>
        </el-table-column>
      </base-table>
    </div>
  </div>
</template>

<script lang='ts'>
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import FilterMain from '@/components/filter/FilterMain.vue'

  import getRepository from '@/services'
  import { CustomerRepository } from '@/services/repositories/customer'
  import BaseIcon from '@/components/base/icon/BaseIcon.vue'
  import { IStatistics, ISummary } from '@/modules/customer/components/popup/CustomerDetail.vue'
  //const apiCustomer: CustomerRepository = getRepository('customer')

  @Component({ components: { BaseIcon, FilterMain } })
  export default class Statistic extends Vue {
    @Prop({ required: true, type: Array, default: 0 }) listStatistics!: IStatistics[]
    @Prop({ required: true, type: Object, default: 0 }) summary!: ISummary
    listReferral: Record<string, any>[] = []
    isLoading = false

    query: Record<string, any> = {
      page: 1,
      limit: 10,
      total: 0
    }
    dataStatisticCard: Array<Record<string, any>> = [
      {
        id: 0,
        label: 'Balance',
        icon: 'icon-wallet',
        value: this.summary.totalBalance?this.summary.totalBalance:0
      },
      {
        id: 1,
        label: 'Total Deposit',
        icon: 'icon-download',
        value:  this.summary.totalDeposit?this.summary.totalDeposit:0
      },
      {
        id: 2,
        label: 'Total Withdraw',
        icon: 'icon-upload',
        value:  this.summary.totalWithdraw?this.summary.totalWithdraw:0
      },
      {
        id: 3,
        label: 'Total Trade',
        icon: 'icon-swap',
        value:  this.summary.totalTrade?this.summary.totalTrade:0
      }
    ]

    isVisible = false

    listStatus: Array<Record<string, any>> = [
      {
        id: 0,
        name: this.$i18n.t('customer.select.accepted'),
        value: 'ACCEPTED'
      },
      {
        id: 1,
        name: this.$i18n.t('customer.select.invited'),
        value: 'INVITED'
      }
    ]

    created(): void {
      this.handleGetListReferral()
    }

    get getIndex(): number {
      return this.query.limit * (this.query.page - 1) + 1
    }

    get getPaginationInfo(): any {
      return this.$t('paging.investor')
    }

    async handleGetListReferral(): Promise<void> {
      // try {
      //   this.isLoading = true
      //   const params = {
      //     ...this.query,
      //     total: null,
      //     userId: this.userId
      //   }
      //   const result = await apiCustomer.getlistReferral(params)
      //   this.listReferral = result.content
      //   this.query.total = result.totalElements
      //   this.isLoading = false
      // } catch (error) {
      //   this.isLoading = false
      //   console.log(error)
      // }
    }

    handleSizeChange(value: number): void {
      this.query.limit = value
      this.handleGetListReferral()
    }

    handleCurrentChange(value: number): void {
      this.query.page = value
      this.handleGetListReferral()
    }

    handleFilter(filter: Record<string, any>): void {
      this.query = { ...this.query, ...filter }
      this.handleGetListReferral()
    }


    handleShowPopper(): void {
      this.isVisible = true
    }

    checkTypeClass(status: string): string {
      if (status === 'INVITED') {
        return 'status-invited'
      } else {
        return 'status-accept'
      }
    }

    getTypeStatus(status: string): any {
      if (status === 'INVITED') {
        return this.$t('customer.table.invited')
      } else {
        return this.$t('customer.table.accept')
      }
    }
  }
</script>

<style scoped lang='scss'>
  .list-balance {
    padding-bottom: 24px;
    .statistics-card {
      margin-left: 24px;
      .item-statistics {
        border: 1px solid #dbdbdb;
        border-radius: 8px;
        padding: 16px;
        box-sizing: border-box;
        width: 218px;
        height: auto;
        margin-right: 24px;

        &:last-of-type {
          margin-right: 0;
        }

        .value-statistics {
          font-size: 30px;
          color: #0A0B0D;
          margin-top: 8px;
        }
      }
    }
    .title-list-statistics{
      margin-bottom: 16px;
      margin-top: 40px;
      padding-left: 24px;
      p{
        font-size: 18px;
        color: #0A0B0D;
        font-weight: 600;
      }
    }
    .input-search {
      width: 400px;
      margin-right: 30px;
    }

    .sort {
      cursor: pointer;
      color: #0a0b0d;
    }

    .list-loading {
      min-height: 200px;
    }

    .table {
      padding: 0 24px;

      .small {
        font-size: 14px !important;
        line-height: 16px;
        color: #5b616e;
      }
    }
  }
</style>