<template>
  <div class="list-balance">
    <filter-main :sorts="sorts" @filter="handleFilter">
      <div class="filter-item">
        <el-popover :value="isVisible" placement="bottom-start" width="330" trigger="click" popper-class="popper-filter" @show="handleShowPopper">
          <div class="content">
            <el-form>
              <el-form-item class="be-flex-item" :label="$t('label.status')">
                <el-select v-model="filter.status" :placeholder="$t('placeholder.select-type')" class="w-100" clearable>
                  <el-option v-for="(type, index) in listStatus" :key="index" :label="type.name" :value="type.value" />
                </el-select>
              </el-form-item>
              <el-form-item class="be-flex-item" :label="$t('label.from-date')">
                <el-date-picker class="w-100" format="yyyy/MM/dd" value-format="yyyy-MM-dd" :placeholder="$t('label.from-date')" v-model="filter.fromCreatedAt" type="date">
                </el-date-picker>
              </el-form-item>

              <el-form-item class="be-flex-item" :label="$t('label.to-date')">
                <el-date-picker class="w-100" format="yyyy/MM/dd" :placeholder="$t('label.to-date')" value-format="yyyy-MM-dd" v-model="filter.toCreatedAt" type="date">
                </el-date-picker>
              </el-form-item>
            </el-form>
          </div>
          <div class="be-flex jc-flex-end footer">
            <el-button class="btn-default btn-400 btn-h-40 btn-close text-regular" @click="handleReset">
              {{ $t('button.reset') }}
            </el-button>
            <el-button class="btn-default-bg btn-400 btn-h-40 is-none-border h-40 text-regular" @click="handleApply">
              {{ $t('button.apply') }}
            </el-button>
          </div>
          <div slot="reference" class="cursor text-filter" style="font-size: 16px">
            <span class="abicon"> <base-icon style="color: #5b616e; margin-right: 10px" icon="icon-filter" size="18" /> </span>
            {{ $t('kyc.filter.filter') }}
          </div>
        </el-popover>
        <!-- <div class="cursor text-filter" style="font-size: 16px">
        <span class="abicon"> <base-icon style="color: #5b616e; margin-right: 10px" icon="icon-filter" size="18" /> </span>
        {{ $t('kyc.filter.filter') }}
      </div> -->
      </div>
    </filter-main>
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
            <span>{{ scope.row.name }}</span>
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
  const apiCustomer: CustomerRepository = getRepository('customer')

  @Component({ components: { FilterMain } })
  export default class CustomerReferral extends Vue {
    @Prop({ required: true, type: Number, default: 0 }) userId!: number

    listReferral: Record<string, any>[] = []
    isLoading = false
    filter: Record<string, any> = {
      status: '',
      fromCreatedAt: '',
      toCreatedAt: ''
    }
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

    isVisible = false

    listStatus: Array<Record<string, any>> = [
      {
        id: 0,
        name: 'Accepted',
        value: 'ACCEPTED'
      },
      {
        id: 1,
        name: 'Invited',
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
      try {
        this.isLoading = true
        const params = {
          ...this.query,
          total: null,
          userId: this.userId
        }
        const result = await apiCustomer.getlistReferral(params)
        this.listReferral = result.content
        this.query.total = result.totalElements
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

    handleApply(): void {
      this.query = { ...this.query, ...this.filter }
      this.handleGetListReferral()
      this.isVisible = false
    }

    handleReset(): void {
      this.filter = {
        status: '',
        fromCreatedAt: '',
        toCreatedAt: ''
      }
      this.query = { ...this.query, ...this.filter }
      this.handleGetListReferral()
      this.isVisible = false
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
