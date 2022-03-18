<template>
  <div class="w-100 bg-white wallet-table">
    <div class="wallet-table__below">
      <base-table
        :data="responseList"
        :table="query"
        :paginationInfo="getPaginationInfo"
        @sizeChange="handleSizeChange"
        @currentChange="handleCurrentChange"
        @rowClick="handleRowClick"
        class="base-table table-wallet"
      >
        <el-table-column label="#" type="index" :index="indexMethod" align="center" width="80" />
        <el-table-column :label="$t('report.table.member')" width="530">
          <template class="flex-center-vert" slot-scope="scope">
            <div class="abc">
              <span prop="totalLogin"
                ><img
                  src="https://scontent.fhan5-3.fna.fbcdn.net/v/t39.30808-6/260223685_885672385457979_8716466637580782529_n.jpg?stp=dst-jpg_s960x960&_nc_cat=106&ccb=1-5&_nc_sid=8631f5&_nc_ohc=ObpK-qhpmeAAX-ZawbM&_nc_ht=scontent.fhan5-3.fna&oh=00_AT_UwgP8xglUupsJAUyHTJbId1LO9xC_2xCQM6zYkrxUAQ&oe=6237359D"
                  alt="gang-world"
              /></span>
              <span>{{ scope.row.fullName }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column :label="$t('report.table.email')" prop="username" min-width="200"> </el-table-column>
        <el-table-column :label="$t('report.table.device')" prop="device" width="400"> </el-table-column>
        <el-table-column :label="$t('report.table.accessTime')" prop="totalLogin" align="center" width="200"></el-table-column>
      </base-table>
    </div>
    <div class="chart">
      <div class="cards">
        <div class="card">
          <div class="card-title">
            <base-icon icon="menu-member" size="40" />
            <p>User</p>
          </div>
          <div class="card-value">30</div>
        </div>
        <div class="card">
          <div class="card-title">
            <base-icon icon="menu-member" size="40" />
            <p>User</p>
          </div>
          <div class="card-value">30</div>
        </div>
        <div class="card">
          <div class="card-title">
            <base-icon icon="menu-member" size="40" />
            <p>User</p>
          </div>
          <div class="card-value">30</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Mixins } from 'vue-property-decorator'
import getRepository from '@/services'
import ReportRepository from '@/services/repositories/report'
import EventBus from '@/utils/eventBus'

const api: ReportRepository = getRepository('report')
@Component
export default class ReportTable extends Vue {
  // @Prop({ required: true, type: Object, default: {} }) query!: Record<string, any>
  @Prop({ required: true, type: Array, default: [] }) data!: Array<Record<string, any>>
  query: Record<string, any> = {
    search: '',
    limit: 10,
    page: 1,
    orderBy: '',
    total: 0
  }
  get getPaginationInfo(): any {
    return this.$t('paging.user')
  }
  indexMethod(index: number): number {
    return (this.query.page - 1) * this.query.limit + index + 1
  }
  handleCurrentChange(value: number): void {
    console.log('size', value)
    this.query.page = value
    this.getListUser()
  }
  handleSizeChange(value: number): void {
    console.log('size', value)
    this.query.page = 1
    this.query.limit = value
    this.getListUser()

    // this.$emit('sizeChange', value)
  }
  responseList: Array<Record<string, any>> = []

  async getListUser(): Promise<void> {
    const params = {
      ...this.query,
      total: '',
      fromDate: '2022-01-04 08:12:17',
      toDate: '2022-12-11 08:12:17'
    }
    console.log('params', params)
    const result = await api.getListReport(params)
    this.responseList = result.content
    this.query.total = result.totalElements
  }
  async created(): Promise<void> {
    this.getListUser()

    EventBus.$on('filterReport', this.handleFilterReport)
    EventBus.$on('filterByDay', this.handleFilterByDay)
  }
  handleFilterByDay(value: string | number) {
    console.log('value')
  }
  handleFilterReport(value: any): void {
    console.log('value', value)
    this.query.search = value.search
    this.getListUser()
    // this.query.searchd =
  }
}
</script>

<style lang='scss' scoped>
.abc {
  display: flex;
  align-items: center;
}
img {
  width: 30px;
  border-radius: 50%;
  height: 30px;
  margin-right: 10px;
}
.wallet-table {
  .cards {
    display: flex;
    align-items: center;
    justify-content: space-around;
    .card {
      margin: 12px 12px;
      width: 33%;
      display: flex;
      flex-direction: column;
      box-shadow: 0px 0.3px 0.9px rgba(0, 0, 0, 0.1), 0px 1.6px 3.6px rgba(0, 0, 0, 0.13);
      .card-title {
        margin: 12px 12px;
        display: flex;
        flex-direction: row-reverse;
        justify-content: space-between;
        align-items: center;
      }
      .card-value {
        margin: 12px 12pxtssx;
      }
    }
  }
  &__above {
    border-bottom: 1px solid var(--bc-border-primary);
    &-tabs {
      .tab-item {
        padding: 16px 12px;
        position: relative;
        &:hover {
          color: var(--bc-tab-active);
        }
      }
      .tab-active {
        color: var(--bc-tab-active);
        font-weight: 600;
        &::after {
          content: '';
          position: absolute;
          width: 100%;
          height: 2px;
          bottom: 0;
          left: 0;
          background-color: var(--bc-tab-active);
        }
      }
    }
  }
  &__below {
    padding: 0 24px;
    .table-wallet {
      .amount-decrease {
        color: var(--bc-status-error);
      }
      .amount-increase {
        color: var(--bc-status-success);
      }
    }
  }
}
</style>