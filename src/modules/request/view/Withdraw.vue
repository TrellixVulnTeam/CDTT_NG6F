<template>
  <div class="bo-request-withdraw">
    <div class="box-filter be-flex align-center">
      <div class="box-search">
        <el-input class="input-search" :placeholder="$t('placeholder.search')" v-model="querry.keywordString" clearable>
          <div slot="prefix" class="prefix-search">
            <base-icon icon="icon-search" size="16" />
          </div>
        </el-input>
      </div>

      <el-popover :value="isVisible" placement="bottom-start" width="518" trigger="click" popper-class="popper-filter-request-withdraw" @show="handleShowPopper">
        <!-- <el-button slot="reference">Click to activate</el-button> -->
        <div class="content">
          <div class="label">{{ $t('request.filter.label1') }}</div>
          <div class="be-flex jc-space-between row box">
            <el-select v-model="filter.status" multiple :placeholder="$t('request.filter.planceOder1')" clearable>
              <el-option v-for="item in optionStatus" :key="item.value" :label="item.label" :value="item.value"> </el-option>
            </el-select>
          </div>
          <div class="label">{{ $t('request.filter.label2') }}</div>
          <div class="be-flex jc-space-between align-center row box">
            <el-date-picker
              v-model="filter.fromDate"
              value-format="yyyy-MM-dd"
              format="MM/dd/yyyy"
              clearable
              type="date"
              :placeholder="$t('request.filter.planceOder2')"
              class="box-input-request-date"
            >
            </el-date-picker>
            <div class="line"></div>
            <el-date-picker
              v-model="filter.toDate"
              value-format="yyyy-MM-dd"
              format="MM/dd/yyyy"
              clearable
              type="date"
              :placeholder="$t('request.filter.planceOder3')"
              class="box-input-request-date"
            >
            </el-date-picker>
          </div>
          <div class="label">{{ $t('request.filter.label3') }}</div>
          <div class="be-flex jc-space-between align-center row box">
            <el-input
              v-model="filter.fromAmount"
              :placeholder="$t('request.filter.planceOder2')"
              class="box-input-request-date"
              clearable
              @keyup.native="numberFormat($event)"
            ></el-input>
            <div class="line"></div>
            <el-input
              v-model="filter.toAmount"
              :placeholder="$t('request.filter.planceOder3')"
              class="box-input-request-date"
              clearable
              @keyup.native="numberFormat($event)"
            ></el-input>
          </div>
          <div class="be-flex jc-flex-end footer">
            <el-button class="btn-default btn-400 btn-h-40 btn-close text-regular" @click="handleResetFilter">
              {{ $t('button.reset') }}
            </el-button>
            <el-button class="btn-default-bg btn-400 btn-h-40 is-none-border h-40 text-regular" @click="handleApply">
              {{ $t('button.apply') }}
            </el-button>
          </div>
        </div>
        <div slot="reference" class="btn-filter be-flex align-center cursor">
          <base-icon style="color: #5b616e; margin-right: 10px" icon="icon-filter" size="16" /> <span class="fs-16">{{ $t('crowdsale.filter') }}</span>
        </div>
      </el-popover>

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
        class="base-table table-request"
      >
        <el-table-column label="#" type="index" align="center" width="40" />
        <el-table-column :label="this.$t('request.table.label2')" prop="transactionMillisecond" align="left" width="220">
          <template slot-scope="scope">
            <span>{{ scope.row.transactionMillisecond | formatDateHourMs }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="this.$t('request.table.label1')" prop="fullName" align="left" width="264" />
        <el-table-column :label="this.$t('request.table.label3')" prop="email" align="left" />
        <el-table-column :label="this.$t('request.table.label4')" prop="status" align="center" width="144">
          <template slot-scope="scope">
            <div v-if="scope.row.status === 'REJECTED'" class="box-status-tabel locked">
              <span class="fs-12 fw-500">{{ scope.row.status }}</span>
            </div>
            <div v-else-if="scope.row.status === 'PENDING'" class="box-status-tabel failed">
              <span class="fs-12 fw-500">{{ scope.row.status }}</span>
            </div>
            <div v-else class="box-status-tabel">
              <span class="fs-12 fw-500">{{ scope.row.status }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column :label="this.$t('request.table.label5')" align="right" width="200">
          <template slot-scope="scope">
            <div class="box-paid">
              <p class="text-paid fw-400 fs-16">{{ scope.row.amountDisplay }}</p>
              <p class="avi fw-400 fs-14">~ ${{ scope.row.amountToUsd | convertAmountDecimal('USD') }}</p>
            </div>
          </template>
        </el-table-column>
      </base-table>
    </div>
  </div>
</template>
<script lang="ts">
  import { Mixins, Component, Watch } from 'vue-property-decorator'
  import PopupMixin from '@/mixins/popup'
  // import firebase from '@/utils/firebase'
  import getRepository from '@/services'
  import { RequestRepository } from '@/services/repositories/request'

  const api: RequestRepository = getRepository('request')
  @Component({ components: {} })
  export default class BORequestWithdraw extends Mixins(PopupMixin) {
    querry: any = {
      keywordString: '',
      limit: 10,
      page: 1,
      orderBy: 1,
      fromDate: '',
      toDate: '',
      fromAmount: '',
      toAmount: '',
      status: ''
    }
    query: any = {
      page: 1,
      limit: 10,
      total: 10
    }
    dataTable: any = []
    sorts: Array<Record<string, any>> = [
      {
        command: 'REQUEST_DATE',
        label: this.$i18n.t('request.sortBy.requestDate'),
        divided: false,
        i18n: 'request.sortBy.requestDate'
      },
      {
        command: 'AMOUNT',
        label: this.$i18n.t('request.sortBy.amount'),
        divided: false,
        i18n: 'request.sortBy.amount'
      },
      {
        command: 'STATUS',
        label: this.$i18n.t('request.sortBy.status'),
        divided: false,
        i18n: 'request.sortBy.status'
      },
      {
        command: 'NAME',
        label: this.$i18n.t('request.sortBy.name'),
        divided: false,
        i18n: 'request.sortBy.name'
      }
    ]
    filter: any = {
      fromDate: '',
      toDate: '',
      fromAmount: '',
      toAmount: '',
      status: ''
    }
    optionStatus: any = [
      {
        value: 'locked',
        label: this.$i18n.t('request.filter.pending')
      },
      {
        value: 'rejected',
        label: this.$i18n.t('request.filter.rejected')
      }
    ]
    get getPaginationInfo(): any {
      return this.$t('paging.request')
    }
    handleSizeChange(value: number): void {
      this.querry.page = 1
      this.query.page = 1
      this.querry.limit = value
      this.query.limit = value
      this.getDataTable()
    }
    handleCurrentChange(value: number): void {
      this.querry.page = value
      this.query.page = value
      this.getDataTable()
    }
    getDataTable(): void {
      api.getDataTable(this.querry).then((res: any) => {
        // this.loadingTable = false
        this.dataTable = res.content
        this.query.total = res.totalElements
      })
    }
    async init(): Promise<void> {
      await this.getDataTable()
    }
    created(): void {
      this.init()
    }
    @Watch('querry.keywordString')
    handleSearch(search: any): void {
      this.getDataTable()
    }
    sortActive = 'REQUEST_DATE'
    orderBy = 'REQUEST_DATE'
    handleSort(command: string): void {
      this.sortActive = command
      if (command == 'REQUEST_DATE') {
        this.querry.orderBy = 1
      }
      if (command == 'AMOUNT') {
        this.querry.orderBy = 2
      }
      if (command == 'STATUS') {
        this.querry.orderBy = 3
      }
      if (command == 'NAME') {
        this.querry.orderBy = 4
      }
      this.getDataTable()
      this.orderBy = command
    }
    isVisible = false
    handleShowPopper(): void {
      console.log('vao day')
      // switch (this.$route.name) {
      //   case 'CustomerVerified':
      //     this.filter.type = 'Verified'
      //     break
      //   case 'CustomerLocked':
      //     this.filter.type = 'Locked'
      //     break
      //   case 'CustomerNotVerified':
      //     this.filter.type = 'Not verified'
      //     break
      //   case 'CustomerProcessing':
      //     this.filter.type = 'KYC processing'
      //     break
      // }
      this.isVisible = true
    }
    handleResetFilter(): void {
      this.filter = {
        fromDate: '',
        toDate: '',
        fromAmount: '',
        toAmount: '',
        status: ''
      }
    }
    handleApply(): void {
      let filter: any = { ...this.filter }
      if (this.filter.status.length > 0) {
        filter.status = this.filter.status.join()
      }
      if (filter) {
        this.querry.fromDate = filter.fromDate
        this.querry.toDate = filter.toDate
        this.querry.fromAmount = filter.fromAmount
        this.querry.toAmount = filter.toAmount
        this.querry.status = filter.status
      }
      this.getDataTable()
      this.isVisible = false
    }
    numberFormat(event: FocusEvent): void {
      const _event: any = event
      let fnumber = _event.target.value
      if (fnumber.length > 0) {
        fnumber = fnumber.replaceAll(',', '')
        fnumber = parseInt(fnumber)
        if (!isNaN(fnumber)) {
          fnumber = this.$options.filters?.numberWithCommas(fnumber)
          _event.target.value = fnumber
        } else {
          _event.target.value = 0
        }
      }
    }
  }
</script>
<style scoped lang="scss">
  .bo-request-withdraw {
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
        color: var(--bc-theme-primary);
        .span-icon {
          color: var(--bc-theme-primary) !important;
        }
      }
    }
    .dropdown-sort {
      min-width: 250px !important;
    }
    .table {
      .table-request {
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
