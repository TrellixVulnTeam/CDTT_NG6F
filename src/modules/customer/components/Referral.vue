<template>
  <div class="list-balance">
    <filter-main :sorts="sorts" @filter="handleFilter" />
    <div class="table">
      <base-table
        :data="listReferral"
        :table="query"
        :paginationInfo="getPaginationInfo"
        @sizeChange="handleSizeChange"
        @currentChange="handleCurrentChange"
        class="base-table table-wallet"
      >
        <el-table-column label="#" type="index" width="40" />
        <el-table-column :label="$t('customer.table.name')">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>

        <el-table-column :label="$t('customer.table.email')" prop="email" width="304"> </el-table-column>
        <el-table-column :label="$t('customer.table.date')" align="right" width="200">
          <template slot-scope="scope">
            <span class="text-base">{{ scope.row.date | formatMMDDYY }} </span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('customer.table.status')" align="right" width="120">
          <template slot-scope="scope">
            <span class="status">{{ scope.row.status }}</span>
          </template>
        </el-table-column>
      </base-table>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import FilterMain from '@/components/filter/FilterMain.vue'

  import getRepository from '@/services'
  import { CustomerRepository } from '@/services/repositories/customer'
  const apiCustomer: CustomerRepository = getRepository('customer')

  @Component({ components: { FilterMain } })
  export default class CustomerReferral extends Vue {
    @Prop({ required: true, type: Number, default: 0 }) userId!: number

    listReferral: Record<string, any>[] = []
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
        label: this.$i18n.t('customer.sort.referral-name'),
        divided: false,
        i18n: 'customer.sort.referral-name'
      }
    ]

    created(): void {
      this.handleGetListReferral()
    }

    get getPaginationInfo(): any {
      return this.$t('paging.investor')
    }

    async handleGetListReferral(): Promise<void> {
      try {
        this.isLoading = true
        this.listReferral = await apiCustomer.getlistBalance(this.userId, this.query)
        this.isLoading = false
      } catch (error) {
        this.isLoading = false
        console.log(error)
      }
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
  }
</script>

<style scoped lang="scss">
  .list-balance {
    .input-search {
      width: 400px;
      margin-right: 30px;
    }
    .sort {
      cursor: pointer;
      color: #0a0b0d;
    }
    .table {
      padding: 0 24px 24px 24px;
      .small {
        font-size: 14px !important;
        line-height: 16px;
        color: #5b616e;
      }
    }
  }
</style>
