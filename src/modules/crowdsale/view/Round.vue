<template>
  <div class="bo-crowdsale-round">
    <div class="table">
      <base-table :data="dataTable" class="base-table table-crowdsale-round" :showPagination="false">
        <el-table-column :label="this.$t('crowdsale.round')" prop="round" align="left">
          <template slot-scope="scope">
            <p>{{ $t('crowdsale.round') }} {{ scope.row.round }}</p>
          </template>
        </el-table-column>
        <el-table-column :label="this.$t('crowdsale.startDate')" prop="startDate" align="left" width="160" />
        <el-table-column :label="this.$t('crowdsale.endDate')" prop="endDate" align="left" width="160" />
        <el-table-column :label="this.$t('crowdsale.price')" prop="price" align="center" width="124" />
        <el-table-column :label="this.$t('crowdsale.sold')" prop="sold" align="right" width="180" />
        <el-table-column :label="this.$t('crowdsale.remain')" prop="remain" align="right" width="180" />
        <el-table-column :label="this.$t('crowdsale.progress')" prop="progress" align="right" width="160" />
      </base-table>
    </div>
  </div>
</template>
<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator'
  @Component
  export default class BOCrowdsaleRound extends Vue {
    dataTable: any = [
      {
        round: '1',
        startDate: '01/10/2021',
        endDate: '10/10/2021',
        price: '$0.02',
        sold: '1,000,000',
        remain: '0',
        progress: '100%'
      },
      {
        round: '2',
        startDate: '11/10/2021',
        endDate: '20/10/2021',
        price: '$0.04',
        sold: '1,000,000',
        remain: '1,000,000',
        progress: '50%'
      },
      {
        round: '3',
        startDate: '01/10/2021',
        endDate: '10/10/2021',
        price: '$0.06',
        sold: '0',
        remain: '3,000,000',
        progress: '0%'
      },
      {
        round: '4',
        startDate: '01/10/2021',
        endDate: '10/10/2021',
        price: '$0.08',
        sold: '0',
        remain: '4,000,000',
        progress: '0%'
      }
    ]
  }
</script>
<style scoped lang="scss">
  .bo-crowdsale-round {
  }
</style>
