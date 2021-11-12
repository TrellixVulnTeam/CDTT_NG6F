<template>
  <div class="list-bonus">
    <filter-main :sorts="sorts" @filter="handleFilter" :isShowFilter="false" />
    <div class="table" v-loading="isLoading" :class="isLoading ? 'list-loading' : null">
      <base-table
        :data="listBonus"
        :table="query"
        :paginationInfo="getPaginationInfo"
        @sizeChange="handleSizeChange"
        @currentChange="handleCurrentChange"
        class="base-table table-wallet"
      >
        <el-table-column label="#" :index="getIndex" type="index" width="50" />
        <el-table-column :label="$t('customer.table.trans-id')">
          <template slot-scope="scope">
            <div class="be-flex align-center">
              <span class="d-ib">{{ scope.row.transactionCode | formatTransactionCode(6) }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column width="45">
          <template slot-scope="scope">
            <span v-if="scope.row.transactionCode" class="icon-copy" @click="handleCopyTransaction(scope.row)">
              <base-icon icon="icon-copy" size="24" />
            </span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('customer.table.type')" width="190">
          <template slot-scope="scope">
            <span>{{ scope.row.typeBounus }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('customer.table.date')" width="200">
          <template slot-scope="scope">
            <span class="text-base">{{ scope.row.transactionDate | formatMMDDYY }} </span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('customer.table.status')" align="center" width="120">
          <template slot-scope="scope">
            <span v-if="scope.row.status" :class="checkTypeClass(scope.row.status)">{{ getTypeStatus(scope.row.status) }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('customer.table.amount')" align="right" width="160">
          <template slot-scope="scope">
            <div v-if="scope.row.tokenAmount" class="amount-increase">
              <span>+{{ scope.row.tokenAmount | convertAmountDecimal(coinMain) }} {{ coinMain }}</span>
              <span class="d-block amount-exchange-small">~${{ scope.row.tokenAmountToUsd | convertAmountDecimal('USD') }}</span>
            </div>
          </template>
        </el-table-column>
      </base-table>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import FilterMain from '@/components/filter/FilterMain.vue'

  import { namespace } from 'vuex-class'

  import getRepository from '@/services'
  import { CustomerRepository } from '@/services/repositories/customer'

  const apiCustomer: CustomerRepository = getRepository('customer')
  const beBase = namespace('beBase')

  @Component({ components: { FilterMain } })
  export default class CustomerBonus extends Vue {
    @Prop({ required: true, type: Number, default: 0 }) userId!: number
    @beBase.State('coinMain') coinMain!: string

    listBonus: Record<string, any>[] = []
    isLoading = false
    query: Record<string, any> = {
      page: 1,
      limit: 10,
      total: 0
    }
    sorts: Array<Record<string, any>> = [
      {
        command: 1,
        label: this.$i18n.t('customer.sort.date'),
        divided: false,
        i18n: 'customer.sort.date'
      },
      {
        command: 2,
        label: this.$i18n.t('customer.sort.amount'),
        divided: false,
        i18n: 'customer.sort.amount'
      }
    ]

    created(): void {
      this.handleGetListBonus()
    }

    get getIndex(): number {
      return this.query.limit * (this.query.page - 1) + 1
    }

    get getPaginationInfo(): any {
      return this.$t('paging.transaction')
    }

    async handleGetListBonus(): Promise<void> {
      try {
        this.isLoading = true
        const params = {
          ...this.query,
          total: null,
          userId: this.userId
        }
        const result = await apiCustomer.getlistBonus(params)
        this.listBonus = result.content
        this.query.total = result.totalElements
        this.isLoading = false
      } catch (error) {
        this.isLoading = false
        console.log(error)
      }
    }

    handleSizeChange(value: number): void {
      this.query.limit = value
      this.handleGetListBonus()
    }
    handleCurrentChange(value: number): void {
      this.query.page = value
      this.handleGetListBonus()
    }

    handleFilter(filter: Record<string, any>): void {
      this.query = { ...this.query, ...filter }
      this.handleGetListBonus()
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

    checkTypeClass(status: string): string {
      if (status === 'PENDING') {
        return 'status-peding'
      } else {
        return 'status-success'
      }
    }
    getTypeStatus(status: string): any {
      if (status === 'PENDING') {
        return this.$t('customer.table.pending')
      } else {
        return this.$t('customer.table.paid')
      }
    }
  }
</script>

<style scoped lang="scss">
  .list-bonus {
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
