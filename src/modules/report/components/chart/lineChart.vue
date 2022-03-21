<template>
  <div id="chartdiv"></div>
</template>

<script lang="ts">
  import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
  import * as am4core from '@amcharts/amcharts4/core'
  import * as am4charts from '@amcharts/amcharts4/charts'
  import am4themes_animated from '@amcharts/amcharts4/themes/animated'
  import forEach from 'lodash/forEach'
  import getRepository from '@/services'
  import ReportRepository from '@/services/repositories/report'

  import EventBus from '@/utils/eventBus'

  const api: ReportRepository = getRepository('report')
  @Component
  export default class lineChart extends Vue {
    @Prop({ required: true, type: Array, default: () => [] }) lines!: Array<Record<string, any>>

    data: any = []
    async getDataChart(): Promise<void> {
      const params = {
        fromDate: this.query.fromDate,
        toDate: this.query.toDate,
        timezone: new Date().getTimezoneOffset() / -60
      }
      const result = await api.getDataChart(params)
      this.data = result.numOfUserLoginByDay
      this.renderChart()
      // this.responseList = result.content
      // this.query.total = result.totalElements
    }
    query: Record<string, any> = {
      fromDate: this.checkTime(7),
      toDate: this.formatTimestamp(new Date().setHours(0, 0, 0) + 86399000)
    }
    async created(): Promise<void> {
      EventBus.$on('filterByDay', this.handleFilterByDay)
      this.getDataChart()
    }
    checkTime(day: number): string {
      const time = new Date(Date.now() - day * 24 * 60 * 60 * 1000).setHours(0, 0, 0)
      return this.formatTimestamp(time)
    }
    formatTimestamp(value: number): string {
      if (!value) {
        return ''
      }
      const gmt = new Date().getTimezoneOffset() / -60
      const ago = value - gmt * 60 * 60 * 1000
      const date = new Date(ago)
      return (
        date.getFullYear() +
        '-' +
        (date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) +
        '-' +
        (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) +
        ' ' +
        (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) +
        ':' +
        (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) +
        ':' +
        (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
      )
    }
    handleFilterByDay(value: string | number): void {
      console.log('2323', value)
      if (value == 'yesterday') {
        this.query.fromDate = this.checkTime(1)
        this.query.toDate = this.formatTimestamp(new Date().setHours(0, 0, 0) + 86399000)
      } else if (value == 'last7Days') {
        this.query.fromDate = this.checkTime(7)
        this.query.toDate = this.formatTimestamp(new Date().setHours(0, 0, 0) + 86399000)
      } else if (value == 'last14Days') {
        this.query.fromDate = this.checkTime(14)
        this.query.toDate = this.formatTimestamp(new Date().setHours(0, 0, 0) + 86399000)
      } else if (value == 'last30Days') {
        this.query.fromDate = this.checkTime(30)
        this.query.toDate = this.formatTimestamp(new Date().setHours(0, 0, 0) + 86399000)
      } else if (value == 'last90Days') {
        this.query.fromDate = this.checkTime(90)
        this.query.toDate = this.formatTimestamp(new Date().setHours(0, 0, 0) + 86399000)
      }
      this.getDataChart()
      // console.log("query", this.query)
      // this.getListUser()
    }
    renderChart(): void {
      am4core.useTheme(am4themes_animated)
      let chart = am4core.create('chartdiv', am4charts.XYChart)

      // Add data
      chart.data = this.data

      // Create axes
      let dateAxis = chart.xAxes.push(new am4charts.DateAxis())
      dateAxis.renderer.grid.template.location = 0
      dateAxis.renderer.minGridDistance = 50

      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis())

      // Create series
      // let series = chart.series.push(new am4charts.LineSeries())
      // series.dataFields.valueY = 'value'
      // series.dataFields.dateX = 'date'
      // series.strokeWidth = 3
      // series.fillOpacity = 0.5
      forEach(this.lines, value => {
        const series = chart.series.push(new am4charts.LineSeries())
        series.dataFields.valueY = value.key
        series.dataFields.dateX = 'date'
        series.name = value.label
        series.strokeWidth = 2
        // let bullet = series.bullets.push(new am4charts.CircleBullet())
        // bullet.circle.radius = 4
        series.fill = am4core.color(value.color)
        series.stroke = am4core.color(value.color)
        series.tooltipText = '{name}: {valueY}'
        series.tooltip!.fontSize = 14
        series.tooltip!.autoTextColor = false
        series.tooltip!.label.fill = am4core.color('#FFFFFF')
        series.legendSettings.valueText = '{valueY}'
        series.visible = true
        series.fillOpacity = 0.1
        series.tensionX = 0.8
        series.legendSettings.valueText = ''
      })

      // Add vertical scrollbar
      // chart.scrollbarY = new am4core.Scrollbar()
      // chart.scrollbarY.marginLeft = 0

      // Add cursor
      chart.cursor = new am4charts.XYCursor()
      chart.cursor.behavior = 'zoomY'
      chart.cursor.lineX.disabled = true
    }
  }
</script>

<style scoped lang="scss">
  #chartdiv {
    width: 100%;
    height: 500px;
  }
</style>
