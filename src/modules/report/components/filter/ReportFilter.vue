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
    <el-button class="btn-default btn-close btn-h-40 ml-auto be-flex align-center" style="width: auto !important" @click="handleExport">
      <div class="be-flex align-center">
        <base-icon icon="icon-excel" style="display: inline-flex" size="22" />
        <span style="padding-left: 5px">{{ $t('button.export-excel') }}</span>
      </div>
    </el-button>
    <el-button class="btn-default btn-close btn-h-40 ml-auto be-flex align-center button" style="width: auto !important" @click="handleExport">
      <div class="be-flex align-center" @click="viewTable('table')" :class="active">
        <!-- <base-icon icon="icon-table" style="display: inline-flex" size="22" /> -->
        <base-icon icon="list2" style="display: inline-flex" />
        <span style="padding-left: 5px">{{ $t('button.change-table') }}</span>
      </div>
    </el-button>
    <el-button class="btn-default btn-close btn-h-40 ml-auto be-flex align-center button" style="width: auto !important" @click="handleExport">
      <div class="be-flex align-center" @click="viewChart('chart')" :class="active">
        <base-icon icon="chart2" style="display: inline-flex" size="20" />
        <span style="padding-left: 5px">{{ $t('button.change-chart') }}</span>
      </div>
    </el-button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import EventBus from '@/utils/eventBus'
import { forEach, trim, debounce } from 'lodash'

@Component
export default class KycFilter extends Vue {
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
      value: 'last7Days',
      label: this.$i18n.t('report.filter.last7Days')
    },
    {
      value: 'yesterday',
      label: this.$i18n.t('report.filter.yesterday')
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

  // @Watch('filter.date') handleFilter(value: string): void {
  //   // this.filterItem(value)
  //   console.log('value', value)
  //   EventBus.$emit('filterByDay', value)
  // }
  handleSeclectFilter(value: string): void {
    EventBus.$emit('filterByDay', value)
  }
  // get getRoleExport(): boolean {
  //   return this.checkPemission('crowd-sale', ['export'])
  // }

  filterItem = (value: string) => {
    // console.log('filter', value)
    const params = {
      ...this.filter,
      filter: value
    }
    EventBus.$emit('filterByDay', params)
  }
  searchText = debounce((value: string) => {
    // console.log('SEARCH', value)
    // this.$emit('filter', {
    //   ...this.filter,..
    //   search: trim(value)
    // })
    const params = {
      ...this.filter,
      search: trim(value)
    }
    EventBus.$emit('filterReport', params)
  }, 500)
  destroyed(): void {
    EventBus.$off('filterReport')
    EventBus.$off('filterByDay')
  }
  viewTable(value: string): void {
    EventBus.$emit('changeView', value)
  }
  viewChart(value: string): void {
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
  .button {
    height: 46px;
  }
  .input-search {
    width: 400px;
    margin-right: 30px;
  }

  .sort {
    margin-left: 30px;
    cursor: pointer;
    color: #0a0b0d;
  }
  .active {
    --bc-text-hyperlink: #0151fc;
  }
  ::v-deep .sort {
    &:hover {
      .el-dropdown-selfdefine {
        color: var(--bc-theme-primary);
        .span-icon {
          color: var(--bc-theme-primary) !important;
        }
      }
    }

    .sort-title {
      &:focus {
        color: var(--bc-theme-primary);
        .span-icon {
          color: var(--bc-theme-primary) !important;
        }
      }
    }
  }

  ::v-deep .filter-role {
    .el-select {
      .el-input__inner {
        height: 48px;
        width: 140px;
        font-size: 16px;
      }
    }
  }
}
</style>
