<template>
  <div class="bo-crowdsale-transaction">
    <div class="be-flex mb-24 round-tab">
      <div
        v-for="(round, index) in listRound"
        :key="round.id"
        :class="index === tabActive ? 'round-active text-bold' : null"
        class="text-base cursor round-item"
        @click="handleChangeTab(index)"
      >
        <span>{{ round.name }}</span>
      </div>
    </div>

    <div class="box-filter be-flex align-center kyc-filter pl-0">
      <div class="box-search">
        <el-input v-model="query.search" class="input-search" :placeholder="$t('placeholder.search')">
          <span slot="prefix" class="prefix-search">
            <base-icon icon="icon-search" size="24" />
          </span>
        </el-input>
      </div>
      <div class="btn-filter be-flex align-center cursor" @click="handleOpenPopupFilter">
        <base-icon style="color: #5b616e; margin-right: 10px" icon="icon-filter" size="16" /> <span class="fs-16">{{ $t('crowdsale.filter') }}</span>
      </div>
      <el-dropdown class="sort cursor" trigger="click" @command="handleSort">
        <div class="sort-title be-flex align-center">
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
      <button type="button" :class="lang === 'vi' ? 'w-auto' : null" class="btn-default-bg text-sm ml-auto add-member" @click="handleAddMember">
        <span>{{ $t('button.add-buyer') }}</span>
      </button>
    </div>
    <div class="table">
      <base-table
        :data="dataTable"
        :table="query"
        :paginationInfo="getPaginationInfo"
        :emptyDefault="false"
        @sizeChange="handleSizeChange"
        @currentChange="handleCurrentChange"
        v-loading="isLoading"
        class="base-table table-crowdsale"
      >
        <el-table-column label="#" :index="indexMethod" type="index" align="center" width="60" />
        <el-table-column :label="$t('crowdsale.full-name')" prop="fullName" />
        <el-table-column label="Email" prop="userEmail" width="300" class-name="col-email"> </el-table-column>
        <el-table-column :label="this.$t('crowdsale.add-date')" prop="createdAt" align="left" width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.createdAt | formatDateHourMs }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="this.$t('crowdsale.add-by')" prop="createdByFullName " width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.createdByFullName }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" width="80">
          <template slot-scope="scope">
            <span @click="handleEdit(scope.row.userId)">
              <base-icon icon="icon-edit" size="24" style="margin-right: 5px" />
            </span>
            <span @click="handleDelete(scope.row)">
              <base-icon icon="icon-delete" size="24" />
            </span>
          </template>
        </el-table-column>
      </base-table>
    </div>
    <popup-filter-crowdsale @apply="getFilter" />
    <popup-setting-round-member :type="type" :userId="userId" :listRound="listRound" @reload="init" />
    <popup-confirm @delete="confirmDelete" />
  </div>
</template>
<script lang="ts">
  import { Mixins, Component, Watch } from 'vue-property-decorator'
  import PopupMixin from '@/mixins/popup'
  import PopupFilterCrowdsale from '../components/popup/PopupFilterCrowdsale.vue'
  import PopupSettingRoundMember from '../components/popup/PopupSettingRoundMember.vue'
  import PopupConfirm from '../components/popup/PopupConfirmTable.vue'
  import getRepository from '@/services'
  import { CrowdsaleRepository } from '@/services/repositories/crowdsale'
  import firebase from '@/utils/firebase'
  import { debounce } from 'lodash'

  const apiCrowdsale: CrowdsaleRepository = getRepository('crowdsale')
  @Component({ components: { PopupFilterCrowdsale, PopupSettingRoundMember, PopupConfirm } })
  export default class SettingRound extends Mixins(PopupMixin) {
    tabActive = 0
    type = 'add'
    userId = 0
    listRound: Array<Record<string, any>> = []

    query: any = {
      search: '',
      limit: 10,
      page: 1,
      //   orderBy: 1,
      total: 0
    }

    listener: any = null
    lang = 'en'

    dataProp: any = {}
    isLoading = false
    orderBy = 'TRANSACTION_DATE'
    dataTable: Record<string, any>[] = []

    get getPaginationInfo(): any {
      return this.$t('paging.buyer')
    }

    mounted(): void {
      this.lang = window.localStorage.getItem('bc-lang')!
      this.init()
    }

    @Watch('query.search')
    handleSearch(): void {
      this.debounceInit()
    }

    debounceInit = debounce(() => {
      this.init()
    }, 500)

    async init(): Promise<void> {
      try {
        this.isLoading = true
        const leadsRef = firebase.ref('crowd-sales')
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        let _this = this
        if (!this.listRound.length) {
          this.listener = leadsRef.once('value', async function (snapshot) {
            _this.listRound = snapshot.val()
            const roundCurrent = snapshot.val()[_this.tabActive]
            const result = await apiCrowdsale.getListUserInRound({ ..._this.query, roundId: roundCurrent.id })
            _this.dataTable = result.content || []
            _this.query.total = result.totalElements
          })
        } else {
          const roundCurrent = this.listRound[_this.tabActive]
          const result = await apiCrowdsale.getListUserInRound({ ...this.query, roundId: roundCurrent.id })
          this.dataTable = result.content || []
          this.query.total = result.totalElements
        }
        this.isLoading = false
      } catch (error) {
        console.log(error)
        this.isLoading = false
      }
    }

    handleChangeTab(index: number): void {
      this.tabActive = index
      if (this.query.search) {
        this.query.search = ''
      } else {
        this.init()
      }
    }

    indexMethod(index: number): number {
      return (this.query.page - 1) * this.query.limit + index + 1
    }
    handleSizeChange(value: number): void {
      this.query.limit = value
      this.query.page = 1

      this.init()
    }
    handleCurrentChange(value: number): void {
      this.query.page = value

      this.init()
    }
    handleOpenPopupFilter(): void {
      this.setOpenPopup({
        popupName: 'popup-filter-crowdsale',
        isOpen: true
      })
    }
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
    sortActive = 'TRANSACTION_DATE'
    handleSort(command: string): void {
      this.sortActive = command
      if (command == 'TRANSACTION_DATE') {
        this.query.orderBy = 1
      } else {
        this.query.orderBy = 2
      }
      this.isLoading = true
      this.init()
      this.orderBy = command
    }
    getFilter(form: any): void {
      this.dataProp = form
      this.init()
    }

    handleAddMember(): void {
      this.type = 'add'
      this.setOpenPopup({
        popupName: 'popup-setting-round-member',
        isOpen: true
      })
    }

    handleEdit(userId: number): void {
      this.userId = userId
      this.type = 'edit'
      this.setOpenPopup({
        popupName: 'popup-setting-round-member',
        isOpen: true
      })
    }

    handleDelete(row: Record<string, any>): void {
      this.setOpenPopup({
        popupName: 'popup-confirm-buyer-table',
        isOpen: true
      })
    }

    confirmDelete(): void {
      console.log('a')
    }
  }
</script>
<style scoped lang="scss">
  .bo-crowdsale-transaction {
    .round-tab {
      width: fit-content;
      margin: 0 auto;
      border-radius: 8px;
      overflow: hidden;
      border: 1px solid var(--bc-theme-primary);
      .round-item {
        padding: 8px 24px;
      }
      .round-item:not(:last-child) {
        border-right: 1px solid #dbdbdb;
      }
      .round-active {
        color: #fff;
        background-color: var(--bc-theme-primary);
      }
    }

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
    }
    .dropdown-sort {
      min-width: 250px !important;
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
  .btn-filter {
    &:hover {
      color: var(--bc-theme-primary) !important;
      .span-icon {
        color: var(--bc-theme-primary) !important;
      }
    }
  }
  .add-member {
    height: 40px;
    font-weight: 400;
    padding: 0 8px;
    &:hover {
      border: 1px solid transparent;
    }
  }
  .input-search {
    width: 400px;
    margin-right: 30px;
  }
</style>
