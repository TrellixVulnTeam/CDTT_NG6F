<template>
  <div class="list-balance">
    <div class="statistics-card be-flex">
      <div v-for='(value,index) in dataStatisticCard' :key="index">
        <div class='be-flex'>
          <p>{{value.label}}</p>
          <base-icon :icon="value.icon" size="20" style="display: inline-flex" />
        </div>
        <p>${{value.value}}</p>
      </div>
    </div>
    <div class="table" v-loading="isLoading" :class="isLoading ? 'list-loading' : null">
      <base-table
        :data="listReferral"
        :table="query"
        :paginationInfo="getPaginationInfo"
        @sizeChange="handleSizeChange"
        @currentChange="handleCurrentChange"
        class="base-table table-wallet"
      >
        <el-table-column label="#" :index="getIndex" type="index" width="40" />
        <el-table-column :label="$t('customer.table.name')">
          <template slot-scope="scope">
            <span>{{ scope.row.fullName }}</span>
          </template>
        </el-table-column>

        <el-table-column :label="$t('customer.table.email')" prop="inviteEmail" width="304"> </el-table-column>
        <el-table-column :label="$t('customer.table.date')" width="200">
          <template slot-scope="scope">
            <span class="text-base">{{ scope.row.createdAt | formatMMDDYY }} </span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('customer.table.status')" align="center" width="120">
          <template slot-scope="scope">
            <span v-if="scope.row.status" :class="checkTypeClass(scope.row.status)">{{ getTypeStatus(scope.row.status) }}</span>
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
  import BaseIcon from '@/components/base/icon/BaseIcon.vue'
  //const apiCustomer: CustomerRepository = getRepository('customer')

  @Component({ components: { BaseIcon, FilterMain } })
  export default class Statistic extends Vue {
    @Prop({ required: true, type: Number, default: 0 }) userId!: number

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
        label: "Balance",
        icon: "icon-wallet",
        value:"12,468"
      },
      {
        id: 1,
        label: "Total Deposit",
        icon: "icon-download",
        value:"12,468"
      },
      {
        id: 2,
        label: "Total Withdraw",
        icon: "icon-upload",
        value:"12,468"
      },
      {
        id: 3,
        label: "Total Trade",
        icon: "icon-swap",
        value:"12,468"
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
