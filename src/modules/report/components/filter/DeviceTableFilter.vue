<template>
  <div class="pb-24 pt-24 be-flex align-center kyc-filter">
    <el-input v-model="filter.search" class="input-search" :placeholder="$t('placeholder.search')">
      <span slot="prefix" class="prefix-search">
        <base-icon icon="icon-search" size="24" />
      </span>
    </el-input>
    <div class="be-flex align-center">
      <div class="filter-role">
        <el-select v-model="filter.date" @change="handleSeclectFilter" popper-class="popper-select-role">
          <el-option v-for="item in listFilter" :key="item.value" :label="item.label" :value="item.value"> </el-option>
        </el-select>
      </div>
    </div>
    <el-button @click="handleExportExcel" class="btn-default btn-close btn-h-40 ml-auto be-flex align-center" style="width: auto !important">
      <div class="be-flex align-center">
        <base-icon icon="icon-excel" style="display: inline-flex" size="22" />
        <span style="padding-left: 5px">{{ $t('button.export-excel') }}</span>
      </div>
    </el-button>
    <el-button class="btn-default btn-close btn-h-40 ml-auto be-flex align-center button" style="width: auto !important" @click="viewChart('chart')">
      <div class="be-flex align-center">
        <base-icon icon="chart2" style="display: inline-flex" size="20" />
        <span style="padding-left: 5px">{{ $t('button.change-chart') }}</span>
      </div>
    </el-button>
    <el-button class="active btn-default btn-close btn-h-40 ml-auto be-flex align-center button" style="width: auto !important" @click="viewTable('table')">
      <div class="be-flex align-center">
        <!-- <base-icon icon="icon-table" style="display: inline-flex" size="22" /> -->
        <base-icon icon="list2" style="display: inline-flex" />
        <span style="padding-left: 5px">{{ $t('button.change-table') }}</span>
      </div>
    </el-button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import EventBus from '@/utils/eventBus'
import { forEach, trim, debounce } from 'lodash'
import getRepository from '@/services'
import ReportRepository from '@/services/repositories/report'

const api: ReportRepository = getRepository('report')
@Component
export default class DeviceTableFilter extends Vue {
  @Prop({ required: true }) isChangeTab!: boolean
  filter = {
    search: '',
    date: 'last7Days',
    orderBy: 3
  }
  lang = 'en'
  loading = false
  queryApprove = {
    page: 1,
    limit: 20,
    search: ''
  }

  listFilter: Record<string, any>[] = [
    {
      value: 'yesterday',
      label: this.$i18n.t('report.filter.yesterday')
    },
    {
      value: 'last7Days',
      label: this.$i18n.t('report.filter.last7Days')
    },
    {
      value: 'last14Days',
      label: this.$i18n.t('report.filter.last14Days')
    },
    {
      value: 'last30Days',
      label: this.$i18n.t('report.filter.last30Days')
    },
    {
      value: 'last90Days',
      label: this.$i18n.t('report.filter.last90Days')
    }
  ]

  @Watch('filter.search') handleSearch(value: string): void {
    this.searchText(value)
  }

  handleSeclectFilter(value: string): void {
    EventBus.$emit('deviceTableFilter', value)
    if (value == 'yesterday') {
      this.query.fromDate = this.checkTimeFromDate(1)
      this.query.toDate = this.checkTimeToDate()
    } else if (value == 'last7Days') {
      this.query.fromDate = this.checkTimeFromDate(7)
      this.query.toDate = this.checkTimeToDate()
    } else if (value == 'last14Days') {
      this.query.fromDate = this.checkTimeFromDate(14)
      this.query.toDate = this.checkTimeToDate()
    } else if (value == 'last30Days') {
      this.query.fromDate = this.checkTimeFromDate(30)
      this.query.toDate = this.checkTimeToDate()
    } else if (value == 'last90Days') {
      this.query.fromDate = this.checkTimeFromDate(90)
      this.query.toDate = this.checkTimeToDate()
    }
  }

  searchText = debounce((value: string) => {
    this.query.search = trim(value)
    // console.log('SEARCH', value)
    // this.$emit('filter', {
    //   ...this.filter,..
    //   search: trim(value)
    // })
    const params = {
      ...this.filter,
      search: trim(value)
    }
    EventBus.$emit('deviceTableSearch', params)
  }, 500)
  query: any = {
    fromDate: this.checkTimeFromDate(7),
    toDate: this.checkTimeToDate(),
    timezone: new Date().getTimezoneOffset() / -60 > 0 ? '+' + new Date().getTimezoneOffset() / -60 : '-' + new Date().getTimezoneOffset() / -60,
    orderBy: 'LAST_NAME'
  }
  checkTimeFromDate(day: number): string {
    const time = new Date(Date.now() - day * 24 * 60 * 60 * 1000).setHours(0, 0, 0)
    return this.formatTimestampFromDate(time)
  }
  checkTimeToDate(): string {
    const time = new Date(Date.now()).setHours(0, 0, 0)
    return this.formatTimestampToDate(time)
  }
  formatTimestampToDate(value: number): string {
    if (!value) {
      return ''
    }
    // const gmt = new Date().getTimezoneOffset() / -60
    // const ago = value - gmt * 60 * 60 * 1000
    const date = new Date(value)
    return (
      date.getFullYear() +
      '-' +
      (date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) +
      '-' +
      (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) +
      ' ' +
      '23' +
      ':' +
      '59' +
      ':' +
      '59'
    )
  }
  formatTimestampFromDate(value: number): string {
    if (!value) {
      return ''
    }
    const date = new Date(value)
    return (
      date.getFullYear() +
      '-' +
      (date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) +
      '-' +
      (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) +
      ' ' +
      '00' +
      ':' +
      '00' +
      ':' +
      '00'
    )
  }
  isExcelLoading = false
  fileName = 'device'
  async handleExportExcel(): Promise<void> {
    this.isExcelLoading = true
    let response: any
    const date = new Date()
    const time = `${date.getFullYear()}${date.getMonth() + 1}${date.getDate()}_${date.getHours()}${date.getMinutes()}${date.getSeconds()}`
    // delete this.params.newAuditStatus
    const params = {
      ...this.query,
      orderBy: 'LAST_NAME'
    }
    await api
      ?.exportExcelDevice(params)
      .then(data => {
        response = data
        console.log('res', data)
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', `Report_${this.fileName}_${time}.xlsx`)
        document.body.appendChild(link)
        link.click()
        this.isExcelLoading = false
      })
      .catch(() => {
        this.isExcelLoading = false
      })
  }
  destroyed(): void {
    EventBus.$off('deviceTableSearch')
    EventBus.$off('deviceTableFilter')
  }
  viewType = 'chart'
  viewTable(value: string): void {
    this.viewType = 'table'
    EventBus.$emit('changeView', value)
  }
  viewChart(value: string): void {
    this.viewType = 'chart'
    EventBus.$emit('changeView', value)
  }
  created(): void {
    this.lang = window.localStorage.getItem('bc-lang')!
    // EventBus.$on('changeTabMember', this.handleChangeTab)
    this.$emit('filter', this.filter)
  }

  resetFilter(): void {
    this.filter = {
      search: '',
      date: 'last7Days',
      orderBy: 3
    }
  }

  handleReset(): void {
    this.filter = {
      ...this.filter
    }
    this.$emit('filter', this.filter)
  }
}
</script>

<style scoped lang="scss">
.kyc-filter {
  background-color: #fff;
  padding: 24px;

  .input-search {
    width: 400px;
    margin-right: 30px;
  }

  .button {
    height: 46px;
  }
  .active {
    color: var(--bc-btn-default-text-hover);
    border-color: var(--bc-btn-default-border-hover);
  }

  ::v-deep .filter-role {
    .el-select {
      width: 170px;
      .el-input__inner {
        height: 48px;
        width: 170px;
        font-size: 16px;
      }
    }
  }
}
</style>
