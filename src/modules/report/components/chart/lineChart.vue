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
  const api: ReportRepository = getRepository('report')
  @Component
  export default class lineChart extends Vue {
    @Prop({ required: true, type: Array, default: () => [] }) lines!: Array<Record<string, any>>

    data: any = []
    async getDataChart(): Promise<void> {
      const params = {
        fromDate: '2022-03-04 08:12:17',
        toDate: '2022-03-14 08:12:17'
      }
      const result = await api.getDataChart(params)
      this.data = result.numOfUserLoginByDay
      // for (let i = 0; i <= this.data.length; i++) {
      //   console.log('this', this.data[i])
      //   const a = {
      //     ios: 20,
      //     web: 30,
      //     android: 40
      //   }
      //   this.data[i] = {
      //     ...this.data[i],
      //     ...a
      //   }
      // }
      this.renderChart()
      // this.responseList = result.content
      // this.query.total = result.totalElements
    }

    created(): void {
      this.getDataChart()
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
