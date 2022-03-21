<template>
  <div class="report-chart bg-white">
    <div class="chart w-100">
      <div class="cards bg-white">
        <div class="card user">
          <div class="card-title">
            <base-icon icon="menu-member" size="40" />
            <p>User</p>
          </div>
          <div class="card-value">
            <p>{{ this.dataChart.totalUser }}</p>
          </div>
        </div>
        <div class="card number-of-user">
          <div class="card-title">
            <base-icon icon="menu-member" size="40" />
            <p>Số người đăng nhập</p>
          </div>
          <div class="card-value">
            <p>{{ this.dataChart.totalUserLogin }}</p>
          </div>
        </div>
        <div class="card percentage-login">
          <div class="card-title">
            <base-icon icon="menu-member" size="40" />
            <p>Tỉ lệ đăng nhập</p>
          </div>
          <div class="card-value">
            <p>{{ this.dataChart.percentUserLogin }}%</p>
          </div>
        </div>
      </div>
      <div class="detail wallet-table bg-white">
        <div class="detail-title">
          <p>Biểu đồ đăng nhập hệ thống</p>
        </div>
        <!-- <div class="detail-line">
          <base-icon class="icon" icon="menu-member" size="40" />
          <p>Số lần đăng nhập</p>
        </div> -->

        <div class="line-chart bg-white">
          <line-chart :dataLine="this.dataChart.numOfUserLoginByDay" :lines="lines" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import LineChart from './lineChart.vue'
import EventBus from '@/utils/eventBus'
import getRepository from '@/services'
import ReportRepository from '@/services/repositories/report'
// import ReportChart from './chart/ReportChart.vue'
const api: ReportRepository = getRepository('report')
@Component({ components: { LineChart } })
export default class ReportChart extends Vue {
  @Prop({ required: true, type: Array, default: [] }) dataChart!: Array<Record<string, any>>
  // dataChart = []
  lines: Array<Record<string, any>> = [
    {
      label: 'Số lần đăng nhập',
      color: '#E34537',
      key: 'value'
    }
  ]
  query: Record<string, any> = {
    fromDate: '',
    toDate: ''
  }

  created(): void {
    // this.getDataChart()
    console.log('data chart', this.dataChart)
  }
}
</script>

<style lang="scss" scoped>
.report-chart {
  padding: 0 25px;
  .chart {
    .cards {
      display: flex;
      align-items: center;
      justify-content: space-around;
      border-radius: 15px;
      .card {
        color: #fff;
        margin: 12px 12px;
        width: 33.33333%;
        display: flex;
        flex-direction: column;
        box-shadow: 0px 0.3px 0.9px rgba(0, 0, 0, 0.1), 0px 1.6px 3.6px rgba(0, 0, 0, 0.13);
        border-radius: 15px;
        .card-title {
          margin: 12px 12px;
          display: flex;
          flex-direction: row-reverse;
          justify-content: space-between;
          align-items: center;
          p {
            font-size: 14.26px;
          }
        }
        .card-value {
          margin: 12px 12px;
          font-size: 30px;
          line-height: 48px;
          font-weight: 700;
        }
      }
      .user {
        background: linear-gradient(90deg, #e13635, #eb6651 80%, #eb6651);
      }
      .number-of-user {
        background: linear-gradient(90deg, #0f68da, #0f68da 30%, #318bff);
      }
      .percentage-login {
        background-image: linear-gradient(90deg, #3f9d2e, #4fc43a);
      }
    }
    .detail {
      margin: 12px;
      box-shadow: 0px 0.3px 0.9px rgba(0, 0, 0, 0.1), 0px 1.6px 3.6px rgba(0, 0, 0, 0.13);
      .detail-title {
        p {
          font-size: 18px;
          padding: 10px;
          color: #363636;
          font-weight: 600;
        }
      }
      .detail-line {
        display: flex;
        align-items: center;
        justify-content: center;
        .icon {
          padding-right: 10px;
        }
      }
    }
  }
}
</style>
