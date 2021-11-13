<template>
  <div class="bo-crowdsale-transaction">
    <div class="box-filter be-flex align-center">
      <div class="box-search">
        <el-input class="input-search" :placeholder="$t('placeholder.search')" v-model="querry.search" clearable>
          <div slot="prefix" class="prefix-search">
            <base-icon icon="icon-search" size="16" />
          </div>
        </el-input>
      </div>
      <div class="btn-filter be-flex align-center cursor" @click="handleOpenPopupFilter">
        <base-icon style="color: #5b616e; margin-right: 10px" icon="icon-filter" size="16" /> <span class="fs-16">{{ $t('crowdsale.filter') }}</span>
      </div>
      <el-dropdown class="cursor" trigger="click" @command="handleSort">
        <div class="sort be-flex align-center">
          <base-icon icon="icon-sort" style="color: #5b616e; margin-right: 10px" size="16" class="icon" /> <span class="fs-16">{{ $t('crowdsale.sortBy') }}</span>
        </div>
        <el-dropdown-menu class="header-downloadapp dropdown-sort" slot="dropdown" style="width: 232px">
          <el-dropdown-item v-for="(value, index) in sorts" :key="index" :class="sortActive === value.command ? 'active' : null" :command="value.command" :divided="value.divided">
            <span class="be-flex">
              <span class="be-flex-item">
                {{ value.label }}
              </span>
              <base-icon v-if="sortActive === value.command" icon="icon-tick-dropdown" size="16" />
            </span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="table">
      <base-table
        :data="dataTable"
        :table="query"
        :paginationInfo="getPaginationInfo"
        @sizeChange="handleSizeChange"
        @currentChange="handleCurrentChange"
        v-loading="loadingTable"
        class="base-table table-crowdsale"
      >
        <el-table-column label="#" type="index" align="center" width="50" />
        <el-table-column label="Email" prop="email" align="left">
          <template slot-scope="scope">
            <div class="box-email-tabel">
              <p class="fs-16 fw-400">{{ scope.row.fullName }}</p>
              <p class="fs-14 fw-400" style="color: #5b616e">{{ scope.row.email }}</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column :label="this.$t('crowdsale.date')" prop="transactionDate" align="left" width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.transactionDate | formatDateHourMs }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="this.$t('crowdsale.status')" prop="status" align="center" width="110">
          <template slot-scope="scope">
            <div v-if="scope.row.status === 'LOCKED'" class="box-status-tabel locked">
              <span class="fs-12 fw-500">{{ scope.row.status }}</span>
            </div>
            <div v-else-if="scope.row.status === 'FAILED'" class="box-status-tabel failed">
              <span class="fs-12 fw-500">{{ scope.row.status }}</span>
            </div>
            <div v-else class="box-status-tabel">
              <span class="fs-12 fw-500">{{ scope.row.status }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column :label="this.$t('crowdsale.price')" prop="price" align="right" width="164">
          <template slot-scope="scope">
            <span>{{ scope.row.roundName }}</span> - $<span>{{ scope.row.price }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="this.$t('crowdsale.paid')" prop="paid" align="right" width="170">
          <template slot-scope="scope">
            <div class="box-paid">
              <p class="text-paid fw-400 fs-16">- {{ scope.row.paidAmountDisplay | convertAmountDecimal(scope.row.paidCurrency) }} {{ scope.row.paidCurrency }}</p>
              <p class="avi fw-400 fs-14">~ {{ scope.row.paidAmountToUsd | convertAmountDecimal(scope.row.paidCurrency) }}</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column :label="this.$t('crowdsale.amount')" prop="tokenAmount" align="right" width="160">
          <template slot-scope="scope">
            <div class="box-paid">
              <p class="text-amount fw-400 fs-16">+ {{ scope.row.tokenAmountDisplay | convertAmountDecimal(scope.row.tokenCurrency) }} {{ scope.row.tokenCurrency }}</p>
              <p class="avi fw-400 fs-14">~ {{ scope.row.tokenAmountToUsd | convertAmountDecimal(scope.row.tokenCurrency) }}</p>
            </div>
          </template>
        </el-table-column>
      </base-table>
    </div>
    <popup-filter-crowdsale @apply="getFilter" />
  </div>
</template>
<script lang="ts">
  import { Mixins, Component, Watch } from 'vue-property-decorator'
  import PopupMixin from '@/mixins/popup'
  import PopupFilterCrowdsale from '../components/popup/PopupFilterCrowdsale.vue'
  import getRepository from '@/services'
  import { CrowdsaleRepository } from '@/services/repositories/crowdsale'

  const api: CrowdsaleRepository = getRepository('crowdsale')
  @Component({ components: { PopupFilterCrowdsale } })
  export default class BOCrowdsaleTransaction extends Mixins(PopupMixin) {
    querry: any = {
      search: '',
      limit: 10,
      page: 1,
      orderBy: 1
    }
    query: any = {
      page: 1,
      limit: 10,
      total: 10
    }
    dataProp: any = {}
    loadingTable = true
    orderBy = 'TRANSACTION_DATE'
    dataTable: any = []
    get getPaginationInfo(): any {
      return this.$t('paging.crowdsale')
    }
    handleSizeChange(value: number): void {
      this.querry.limit = value
      this.query.limit = value
      this.loadingTable = true
      this.getDataTable()
    }
    handleCurrentChange(value: number): void {
      this.querry.page = value
      this.query.page = value
      this.loadingTable = true
      this.getDataTable()
    }
    handleOpenPopupFilter(): void {
      this.setOpenPopup({
        popupName: 'popup-filter-crowdsale',
        isOpen: true
      })
    }
    sorts: Array<Record<string, any>> = [
      {
        command: 'TRANSACTION_DATE',
        label: this.$i18n.t('crowdsale.transactionDate'),
        divided: false,
        i18n: 'crowdsale.transactionDate'
      },
      {
        command: 'TRANSACTION_AMOUNT',
        label: this.$i18n.t('crowdsale.transactionAmount'),
        divided: false,
        i18n: 'crowdsale.transactionAmount'
      }
    ]
    sortActive = 'TRANSACTION_DATE'
    handleSort(command: string): void {
      this.sortActive = command
      if (command == 'TRANSACTION_DATE') {
        this.querry.orderBy = 1
      } else {
        this.querry.orderBy = 2
      }
      this.loadingTable = true
      this.getDataTable()
      this.orderBy = command
    }
    getFilter(form: any): void {
      this.dataProp = form
      this.getDataTable()
    }
    getDataTable(): void {
      let params: any = { ...this.querry }
      if (this.dataProp.roundId) {
        params.roundId = this.dataProp.roundId
      }
      if (this.dataProp.countryName) {
        params.countryName = this.dataProp.countryName
      }
      if (this.dataProp.currency) {
        params.currency = this.dataProp.currency
        console.log('form: ', this.dataProp.currency)
      }
      if (this.dataProp.fromDate) {
        params.fromDate = this.dataProp.fromDate
      }
      if (this.dataProp.toDate) {
        params.toDate = this.dataProp.toDate
      }
      if (this.dataProp.fromAmount) {
        params.fromAmount = this.dataProp.fromAmount
      }
      if (this.dataProp.toAmount) {
        params.toAmount = this.dataProp.toAmount
      }

      api.getDataTable(params).then((res: any) => {
        this.loadingTable = false
        this.dataTable = res.content
        this.query.total = res.totalElements
      })
    }
    @Watch('querry.search')
    handleSearch(search: any): void {
      this.loadingTable = true
      this.getDataTable()
    }
    async init(): Promise<void> {
      this.loadingTable = true
      await this.getDataTable()
    }
    created(): void {
      this.init()
    }
  }
</script>
<style scoped lang="scss">
  .bo-crowdsale-transaction {
    .box-filter {
      margin-bottom: 24px;
    }
    .box-search {
      .input-search {
        width: 400px;
        margin-right: 29px;
        .prefix-search {
          margin-top: 9px;
          margin-left: 3px;
        }
      }
    }
    .btn-filter,
    .sort {
      margin-right: 27.5px;
      color: var(--bc-text-primary);
      .span-icon {
        color: var(--bc-text-primary) !important;
      }
      &:hover {
        color: #0151fc;
        .span-icon {
          color: #0151fc !important;
        }
      }
    }
    .dropdown-sort {
      min-width: 250px !important;
    }
    .table {
      .table-crowdsale {
        .box-status-tabel {
          width: 80px;
          height: 24px;
          background: #e4f9e2;
          color: #129961;
          border-radius: 4px;
          margin: 0 auto;
        }
        .failed {
          background: #fff3e2;
          color: #dd7d00;
        }
        .locked {
          background: #fbedee;
          color: #cf202f;
        }
        .text-paid {
          color: #cf202f;
        }
        .text-amount {
          color: #129961;
        }
        .avi {
          color: #5b616e;
        }
      }
    }
  }
</style>
