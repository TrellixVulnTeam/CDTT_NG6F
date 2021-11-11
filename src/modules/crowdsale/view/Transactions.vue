<template>
  <div class="bo-crowdsale-transaction">
    <div class="box-filter be-flex align-center">
      <div class="box-search">
        <el-input class="input-search" :placeholder="$t('placeholder.search')" v-model="search" clearable>
          <div slot="prefix" class="prefix-search">
            <base-icon icon="icon-search" size="16" />
          </div>
        </el-input>
      </div>
      <div class="btn-filter be-flex align-center cursor">
        <base-icon style="color: #5b616e; margin-right: 10px" icon="icon-filter" size="18" /> <span>{{ $t('crowdsale.filter') }}</span>
      </div>
      <div class="sort be-flex align-center cursor">
        <base-icon icon="icon-sort" style="color: #5b616e; margin-right: 10px" size="18" class="icon" /> <span>{{ $t('crowdsale.sortBy') }}</span>
      </div>
    </div>
    <div class="table">
      <base-table :data="dataTable" :paginationInfo="getPaginationInfo" @sizeChange="handleSizeChange" @currentChange="handleCurrentChange" class="base-table table-crowdsale">
        <el-table-column label="#" type="index" align="center" width="50" />
        <el-table-column label="Email" prop="email" align="left">
          <template slot-scope="scope">
            <div class="box-email-tabel">
              <p class="fs-16 fw-400">{{ scope.row.name }}</p>
              <p class="fs-14 fw-400" style="color: #5b616e">{{ scope.row.email }}</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column :label="this.$t('crowdsale.date')" prop="date" align="left" width="220" />
        <el-table-column :label="this.$t('crowdsale.status')" prop="status" align="center" width="270">
          <template slot-scope="scope">
            <div class="box-status-tabel" :class="scope.row.status === 'Pending' ? 'pending' : null">
              <span class="fs-12 fw-500">{{ scope.row.status }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column :label="this.$t('crowdsale.price')" prop="price" align="right" width="174" />
        <el-table-column :label="this.$t('crowdsale.paid')" prop="paid" align="right" width="180">
          <template slot-scope="scope">
            <div class="box-paid">
              <p class="text-paid fw-400 fs-16">{{ scope.row.paid }}</p>
              <p class="avi fw-400 fs-14">{{ scope.row.avi }}</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column :label="this.$t('crowdsale.amount')" prop="amount" align="right" width="170">
          <template slot-scope="scope">
            <div class="box-paid">
              <p class="text-amount fw-400 fs-16">{{ scope.row.amount }}</p>
              <p class="avi fw-400 fs-14">{{ scope.row.avi }}</p>
            </div>
          </template>
        </el-table-column>
      </base-table>
    </div>
  </div>
</template>
<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator'
  @Component
  export default class BOCrowdsaleTransaction extends Vue {
    search = ''

    dataTable: any = [
      {
        name: 'Nguyễn Hoàng Mai',
        email: 'maihoangnguyen@gmail.com',
        date: '16/10/2021 14:10:02',
        status: 'Pending',
        price: 'Round 4 - $0.08',
        paid: '- 0.00020036 BTC',
        avi: '~ $13,04',
        amount: '+ 268.02 LYN'
      },
      {
        name: 'Trần Trung Nguyên',
        email: 'trungnguyentran@gmail.com',
        date: '16/10/2021 09:06:07',
        status: 'Pending',
        price: 'Round 3 - $0.06',
        paid: '- 0.00020036 BTC',
        avi: '~ $13,04',
        amount: '+ 568.97 LYN'
      },
      {
        name: 'Hoàng Thị Mai',
        email: 'hoangmai@gmail.com',
        date: '16/10/2021 14:10:02',
        status: 'Success',
        price: 'Round 2 - $0.04',
        paid: '- 0.00020036 BTC',
        avi: '~ $13,04',
        amount: '+ 10.89 LYN'
      },
      {
        name: 'Hoàng Thị Mai',
        email: 'hoangmai@gmail.com',
        date: '16/10/2021 14:10:02',
        status: 'Success',
        price: 'Round 2 - $0.04',
        paid: '- 0.00020036 BTC',
        avi: '~ $13,04',
        amount: '+ 10.89 LYN'
      },
      {
        name: 'Hoàng Thị Mai',
        email: 'hoangmai@gmail.com',
        date: '16/10/2021 14:10:02',
        status: 'Success',
        price: 'Round 2 - $0.04',
        paid: '- 0.00020036 BTC',
        avi: '~ $13,04',
        amount: '+ 10.89 LYN'
      },
      {
        name: 'Hoàng Thị Mai',
        email: 'hoangmai@gmail.com',
        date: '16/10/2021 14:10:02',
        status: 'Success',
        price: 'Round 2 - $0.04',
        paid: '- 0.00020036 BTC',
        avi: '~ $13,04',
        amount: '+ 10.89 LYN'
      },
      {
        name: 'Hoàng Thị Mai',
        email: 'hoangmai@gmail.com',
        date: '16/10/2021 14:10:02',
        status: 'Success',
        price: 'Round 2 - $0.04',
        paid: '- 0.00020036 BTC',
        avi: '~ $13,04',
        amount: '+ 10.89 LYN'
      },
      {
        name: 'Hoàng Thị Mai',
        email: 'hoangmai@gmail.com',
        date: '16/10/2021 14:10:02',
        status: 'Success',
        price: 'Round 2 - $0.04',
        paid: '- 0.00020036 BTC',
        avi: '~ $13,04',
        amount: '+ 10.89 LYN'
      },
      {
        name: 'Hoàng Thị Mai',
        email: 'hoangmai@gmail.com',
        date: '16/10/2021 14:10:02',
        status: 'Success',
        price: 'Round 2 - $0.04',
        paid: '- 0.00020036 BTC',
        avi: '~ $13,04',
        amount: '+ 10.89 LYN'
      },
      {
        name: 'Hoàng Thị Mai',
        email: 'hoangmai@gmail.com',
        date: '16/10/2021 14:10:02',
        status: 'Success',
        price: 'Round 2 - $0.04',
        paid: '- 0.00020036 BTC',
        avi: '~ $13,04',
        amount: '+ 10.89 LYN'
      },
      {
        name: 'Hoàng Thị Mai',
        email: 'hoangmai@gmail.com',
        date: '16/10/2021 14:10:02',
        status: 'Success',
        price: 'Round 2 - $0.04',
        paid: '- 0.00020036 BTC',
        avi: '~ $13,04',
        amount: '+ 10.89 LYN'
      },
      {
        name: 'Hoàng Thị Mai',
        email: 'hoangmai@gmail.com',
        date: '16/10/2021 14:10:02',
        status: 'Success',
        price: 'Round 2 - $0.04',
        paid: '- 0.00020036 BTC',
        avi: '~ $13,04',
        amount: '+ 10.89 LYN'
      }
    ]
    get getPaginationInfo(): any {
      return this.$t('paging.crowdsale')
    }
    handleSizeChange(value: number): void {
      console.log('handleSizeChange: ', value)
    }
    handleCurrentChange(value: number): void {
      console.log('handleCurrentChange: ', value)
    }
  }
</script>
<style scoped lang="scss">
  .bo-crowdsale-transaction {
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
      &:hover {
        color: #0151fc;
        .span-icon {
          color: #0151fc !important;
        }
      }
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
        .pending {
          background: #fff3e2;
          color: #dd7d00;
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
