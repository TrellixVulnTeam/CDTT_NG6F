<template>
  <div class="pb-24 pt-24 be-flex align-center kyc-filter">
    <div class="be-flex align-center">
      <div class="filter-role">
        <el-select v-model="filter.date" @change="handleSeclectFilter" popper-class="popper-select-role">
          <el-option v-for="item in listFilter" :key="item.value" :label="item.label" :value="item.value"> </el-option>
        </el-select>
      </div>
    </div>
    <el-button class="btn-default btn-close btn-h-40 ml-auto be-flex align-center" style="width: auto !important">
      <div class="be-flex align-center">
        <base-icon icon="icon-excel" style="display: inline-flex" size="22" />
        <span style="padding-left: 5px">{{ $t('button.export-excel') }}</span>
      </div>
    </el-button>
    <el-button class="active btn-default btn-close btn-h-40 ml-auto be-flex align-center button" style="width: auto !important" @click="changeView('chart')">
      <div class="be-flex align-center">
        <base-icon icon="chart2" style="display: inline-flex" size="20" />
        <span style="padding-left: 5px">{{ $t('button.change-chart') }}</span>
      </div>
    </el-button>
    <el-button class="btn-default btn-close btn-h-40 ml-auto be-flex align-center button" style="width: auto !important" @click="changeView('table')">
      <div class="be-flex align-center">
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

@Component
export default class UserChartFilter extends Vue {
  @Prop({ required: true }) checkView!: boolean
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

  handleSeclectFilter(value: string): void {
    EventBus.$emit('filterUserchart', value)
  }

  destroyed(): void {
    EventBus.$off('filterUserchart')
  }
  viewType = 'chart'
  changeView(value: string): void {
    this.viewType = value
    this.$forceUpdate()
    EventBus.$emit('changeView', value)
  }
  created(): void {
    console.log('check', this.checkView)
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
  padding: 24px 36px 12px 36px;

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
