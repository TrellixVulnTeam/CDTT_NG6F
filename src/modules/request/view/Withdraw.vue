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
      <div class="btn-filter be-flex align-center cursor" @click="handleOpenPopupFilter">
        <base-icon style="color: #5b616e; margin-right: 10px" icon="icon-filter" size="16" /> <span class="fs-16">{{ $t('crowdsale.filter') }}</span>
      </div>
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
        <el-table-column :label="this.$t('request.table.label1')" prop="transactionHash" align="left" />
        <el-table-column :label="this.$t('request.table.label2')" prop="transactionMillisecond" align="left" width="220">
          <template slot-scope="scope">
            <span>{{ scope.row.transactionMillisecond | formatDateHourMs }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="this.$t('request.table.label3')" prop="transactionDate" align="left" width="260">
          <template slot-scope="scope">
            <div class="box-email-tabel">
              <p class="fs-16 fw-400">{{ scope.row.fullName }}</p>
              <p class="fs-14 fw-400" style="color: #5b616e">{{ scope.row.email }}</p>
            </div>
          </template>
        </el-table-column>
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
    <popup-filter-request />
  </div>
</template>
<script lang="ts">
  import { Mixins, Component, Watch } from 'vue-property-decorator'
  import PopupMixin from '@/mixins/popup'
  import PopupFilterRequest from '../components/popup/PopupFilterRequest.vue'
  // import firebase from '@/utils/firebase'
  import getRepository from '@/services'
  import { RequestRepository } from '@/services/repositories/request'

  const api: RequestRepository = getRepository('request')
  @Component({ components: { PopupFilterRequest } })
  export default class BORequestWithdraw extends Mixins(PopupMixin) {
    querry: any = {
      keywordString: '',
      limit: 10,
      page: 1,
      orderBy: 1
    }
    query: any = {
      page: 1,
      limit: 10,
      total: 10
    }
    dataTable: any = []
    sorts: Array<Record<string, any>> = [
      {
        command: 'TRANSACTION_DATE',
        label: this.$i18n.t('crowdsale.transactionDate'),
        divided: false,
        i18n: 'crowdsale.transactionDate'
      },
      {
        command: 'TRANSACTION_AMOUNT',
        label: this.$i18n.t('crowdsale.transactionAmount'),
        divided: false,
        i18n: 'crowdsale.transactionAmount'
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
    handleOpenPopupFilter(): void {
      this.setOpenPopup({
        popupName: 'popup-filter-request',
        isOpen: true
      })
      console.log('vao day')
    }
    sortActive = 'TRANSACTION_DATE'
    handleSort(command: string): void {
      this.sortActive = command
      if (command == 'TRANSACTION_DATE') {
        this.querry.orderBy = 1
      } else {
        this.querry.orderBy = 2
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
        color: #0151fc;
        .span-icon {
          color: #0151fc !important;
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
