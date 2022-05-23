<template>
  <div class="w-100 bo-kyc">
    <div class="bg-white wallet-header">
      <div class="be-flex align-center jc-space-between wallet-header__above">
        <div class="wallet-header__above-tabs be-flex">
          <div class="tab-item cursor" v-for="tab in getTab" :key="tab.id" :class="$route.name === tab.routeName ? 'tab-active' : null" @click="handleChangeTab(tab)">
            <span class="text-base">{{ $t(`menu.${tab.title}`) }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="container wallet-header-task" style="width: calc(100% - 48px);">
      <div class="col-width col-margin">
        <div class="sack-banlance">
          <span class="text1">
            {{ $t(`fee.total-withdraw`) }}
          </span>
          <div>
            <base-icon icon="icon-download" size="19" />
          </div>
        </div>
        <span class="number2"> {{ numOfLyn | formatNumber }} LYNK</span>
        <div>
          <span class="text3">~{{ totalLynAvai | formatNumber }} LYNK</span>
        </div>
      </div>

      <div class="col-width col-margin">
        <div class="sack-banlance">
          <span class="text1">{{ $t(`fee.total-transfer`) }} </span>
          <div>
            <base-icon icon="icon-upload" size="19" />
          </div>
        </div>
            <span class="number2"> {{ numOfLyn | formatNumber }} LYNK</span>
            <span class="text3">~{{ totalLynAvai | formatNumber }} LYNK</span>
      </div>
      <div class="col-width col-margin">
        <div class="sack-banlance">
          <span class="text1">{{ $t(`fee.total-trading`) }}</span>
          <div>
            <base-icon icon="icon-swap-2" size="19" />
          </div>
        </div>
            <span class="number2"> {{ numOfLyn | formatNumber }} LYNK</span>
            <span class="text3">~{{ totalLynAvai | formatNumber }} LYNK</span>
      </div>
      <div class="col-width col-margin">
        <div class="sack-banlance">
          <span class="text1"> {{ $t(`fee.total-exchange`) }}</span>
          <div>
            <base-icon icon="icon-gift" size="19" />
          </div>
        </div>
            <span class="number2"> {{ numOfLyn | formatNumber }} LYNK</span>
            <span class="text3">~{{ totalLynAvai | formatNumber }} LYNK</span>
      </div>
    </div>
    <div class="w-100" style="height: 400px; background-color: white;">
        <div class="w-100 filter-header">
          <span class="filter-type cursor" v-for="type in filterTypes" :key="type.typeId"
          :class="typeActive.typeId === type.typeId ? 'tab-active' : null" @click="handleChangeType(type)"
          >
            {{type.title}}
          </span>
        </div>
        <div class="w-100" style="background-color: red;">

          <!-- <balance-filter @filterBalance="handleFilter" :listApproveBy="listApproveBy" /> -->
          <fee-filter @filterFee="handleFilter($event)"/>
          <!-- <balance-table
            v-loading="isLoading"
            @rowClick="handleRowClick"
            @sizeChange="handleSizeChange"
            @pageChange="handlePageChange"
            :query="query"
            :propTabActive="tabActive"
            :data="propdataTable"
          /> -->
          <fee-table 
            v-loading="isLoading"
            @rowClick="handleRowClick"
            @sizeChange="handleSizeChange"
            @pageChange="handlePageChange"
            :query="query"
            :propTabActive="tabActive"
            :data="propdataTable"
          />
        </div>
    </div>
      <!-- test -->
    <!-- <kyc-detail :detailRow="detailRow" @init="init" /> -->
    <balance-detail :detailRow="detailRow" :data="dataDetail" :tab-active-filter="tabActive" />
  </div>
</template>

<script lang="ts">
  import { Component, Mixins, Watch } from 'vue-property-decorator'
  //@ts-ignore
  import BalanceTable from '../components/BalanceTable.vue'
  // import BalanceFilter from '../components/filter/BalanceFilter.vue'
  import PopupMixin from '@/mixins/popup'
  import getRepository from '@/services'
  // import { BalanceRepository } from '@/services/repositories/balance'
  import { TransactionRepository } from '@/services/repositories/transaction'
  import EventBus from '@/utils/eventBus'
  import { debounce } from 'lodash'

  // import BalanceDetail from '@/modules/balance/components/balanceDetail/BalanceDetail.vue'
  import FeeFilter from '../components/filter/FeeFilter.vue'
  import FeeTable from '../components/feeTable.vue'
  // const api: BalanceRepository = getRepository('balance')
  const api: TransactionRepository = getRepository('transaction')

  import { namespace } from 'vuex-class'

  const beBase = namespace('beBase')

  @Component({ components: { /* BalanceTable, */ /* BalanceFilter, */ /* BalanceDetail, */ FeeFilter, FeeTable } })
  export default class Fee extends Mixins(PopupMixin) {
    @beBase.State('coinMain') coinMain!: string

    typeActive = {
        typeId: 1,
        title: this.$i18n.t('fee.withdraw')
      }
    currencyActive = 1
    filterTypes: Array<Record<string, any>> = [
      {
        typeId: 1,
        title: this.$i18n.t('fee.withdraw')
      },
      {
        typeId: 2,
        title: this.$i18n.t('fee.transfer')
      },
      {
        typeId: 3,
        title: this.$i18n.t('fee.trading')
      },
      {
        typeId: 4,
        title: this.$i18n.t('fee.exchange')
      }
    ] 

    tabs: Array<Record<string, any>> = [
      {
        id: 2,
        title: 'BTC',
        routeName: 'FeeBtc'
      },
      {
        id: 3,
        title: 'ETH',
        routeName: 'FeeEth'
      },
      {
        id: 4,
        title: 'BNB',
        routeName: 'FeeBnb'
      },
      {
        id: 5,
        title: 'USDT',
        routeName: 'FeeUsdt'
      },
      {
        id: 6,
        title: 'USDC',
        routeName: 'FeeUsdc'
      },
      {
        id: 7,
        title: 'BUSD',
        routeName: 'FeeBusd'
      }
    ]
    titlePending = ''
    tabActive = ''
    isLoading = false

    data: Array<Record<string, any>> = []

    detailRow = {}
    dataDetail = {}
    /* query: any = {
      search: '',
      orderBy: 3,
      page: 1,
      limit: 10,
      total: 10
    } */

     query: any = {
      // userId: null,
      // keywordString: '',
      currency: '',
      transactionType: '',
      fromDate: '',
      toDate: '',
      fromAmount: '',
      toAmount: '',
      orderBy: '1',
      page: 1,
      limit: 10,
      total: 10
    }
    
    // numOfInvestor = ''
    numOfLyn = '728500'
    totalLynAvai = '109275'
    // numOfUser = ''
    // totalAvailable = ''
    // totalBalance = ''
    // totalElement = ''
    // totalLocked = ''
    // totalAvailableUSD = ''
    // totalLockedUSD = ''
    // totalBalanceUSD = ''
    listApproveBy: Record<string, any>[] = []

    get getTab(): Array<Record<string, any>> {
      if (this.coinMain === 'LYNK') {
        console.log(('aaa'))
        return [
          {
            id: 1,
            title: 'LYNK',
            routeName: 'FeeLynk'
          },
          ...this.tabs
        ]
      }
      return [
        {
          id: 1,
          title: 'CLM',
          routeName: 'FeeClm'
        },
        ...this.tabs
      ]
    }

    getListBalance(): void {
      console.log('1')
    }

    created(): void {
      console.log('route', this.$route.path.split('/')[2])
      this.tabActive = this.$route.path.split('/')[2]
      // apiKyc.getListApprove({ page: 1, limit: 20 }).then(res => {
      //   this.listApproveBy = res.content || []
      // })
      // const name = this.$route.name
      // this.query.kycStatus = name === 'KycPending' ? 'PENDING' : name === 'KycVerified' ? 'VERIFIED' : 'REJECTED'
      // this.filterTypes.map((value, i) => {
      //   if (value.routeName === name) {
      //     this.query.transactionType = value.title.toUpperCase()
      //     this.tabActive = value.title
      //   }
      // })
      this.query.currency = this.tabActive
      this.query.transactionType = this.typeActive.title
      this.init()
    }

    propdataTable: Record<string, any>[] = []
    
    /* async init(): Promise<void> {
      console.log('tabactive', this.tabActive)
      this.data = []
      this.propdataTable = []
      try {
        this.isLoading = true
        const params = {
          ...this.query,
          search: this.query.search,
          orderBy: this.query.orderBy,
          limit: this.query.limit,
          page: this.query.page,
          total: null
        }
        const result = await api.getlistBalance(this.tabActive, params)
        // test
        console.log([result])
        // test
        this.data = result.balances || []
        console.log('this.data', this.data)

        this.query.total = result.totalElement
        this.isLoading = false
        if (this.data.length > 0) {
          for (let i = 0; i < this.data.length; i++) {
            let str = this.data[i].email
            const email = str.split('@')
            if (email[0].length > 6) {
              const newEmail = email[0].substring(0, 6) + '...@' + email[1].substring(0, 10)
              const dataItem = {
                ...this.data[i],
                email: newEmail
              }
              this.propdataTable.push(dataItem)
            } else {
              const newEmail = email[0] + '...@' + email[1].substring(0, 10)
              const dataItem = {
                ...this.data[i],
                email: newEmail
              }
              this.propdataTable.push(dataItem)
            }
          }
        }

        // this.numOfInvestor = result.numOfInvestor
        // this.numOfUser = result.numOfUser
        // this.totalAvailable = result.totalAvailable
        // this.totalBalance = result.totalBalance
        // this.totalLocked = result.totalLocked
        // this.totalBalance = result.totalBalance
        // this.totalAvailableUSD = result.totalAvailableUSD
        // this.totalLockedUSD = result.totalLockedUSD
        // this.totalBalanceUSD = result.totalBalanceUSD
      } catch (error) {
        this.isLoading = false
        console.log(error)
      }
    } */
    async init(): Promise<void> {
      try {
        this.isLoading = true
        const params = {
          ...this.query,
          // userId: this.query.userId,
          orderBy: this.query.orderBy,
          limit: this.query.limit,
          page: this.query.page,
          currency: this.query.currency,
          fromDate: this.query.fromDate,
          toDate: this.query.toDate,
          fromAmount: this.query.fromAmount,
          toAmount: this.query.toAmount,
          total: null
        }
        const result = await api.getListTransaction('search', params)
        console.log([result])
        this.propdataTable = result.transactions.content

        // const deposit = result.summary.filter(item => {
        //   return item.transactionType === 'DEPOSIT'
        // })
        // const crowdsale = result.summary.filter(item => {
        //   return item.transactionType === 'CROWDSALE'
        // })
        const withdraw = result.summary.filter(item => {
          return item.transactionType === 'WITHDRAW'
        })
        const transfer = result.summary.filter(item => {
          return item.transactionType === 'TRANSFER'
        })
        // const bonus = result.summary.filter(item => {
        //   return item.transactionType === 'BONUS'
        // })

        // this.dataHeaderCard = [...deposit, ...withdraw, ...transfer, ...bonus]

        this.query.total = result.transactions.totalElements
        this.isLoading = false
      } catch (error) {
        this.isLoading = false
        console.log(error)
      }
    }

    async handleGetBalanceDetail(userId: number) {
      try {
        const params = {
          ...this.query,
          search: this.query.search,
          orderBy: this.query.orderBy,
          limit: this.query.limit,
          page: this.query.page,
          total: null
        }
      } catch (error) {
        this.isLoading = false
        console.log(error)
      }
    }
    
    handleChangeType(Type: any): void {
      this.typeActive = Type
      this.resetQuery()
      // this.query.tabBalance = this.kycStatus[tab.title]
      this.query.currency = this.tabActive
      this.query.page = 1
      this.query.limit = 10
      this.query.orderBy = 1
      this.query.transactionType = Type.title.toUpperCase()
      // let refs: any = this.$refs['popup-filter']
      // if (refs) {
      //   refs.handleReset()
      // }
      // let refs2: any = this.$refs['filter']
      // if (refs2) {
      //   refs2.handleReset()
      // }

      this.init()
    }
    /* handleChangeTab(tab: Record<string, any>): void {
      console.log('tab', tab.title, [this.$route], this.tabActive, Array.isArray(this.$router))
      this.typeActive = 1
      if (tab.title != this.tabActive) {
        this.$router.push({ name: tab.routeName })
        // this.query.tabBalance = this.kycStatus[tab.title]
        this.tabActive = tab.title
        this.query.page = 1
        this.query.limit = 10
        this.query.orderBy = 3
        this.query.toBalanceAmount = ''
        ;(this.query.fromBalanceAmount = ''),
          (this.query.toLockedAmount = ''),
          (this.query.fromLockedAmount = ''),
          (this.query.toAvailableAmount = ''),
          (this.query.fromAvailableAmount = ''),
          (this.query.search = '')
        // this.query.orderBy = '3'
        this.init()
        this.resetQuery()
        EventBus.$emit('selectTabBalance')
        EventBus.$emit('changeTab', this.tabActive)
      }
    }
 */
    handleChangeTab(tab: Record<string, any>): void {
      this.typeActive = {
        typeId: 1,
        title: this.$i18n.t('fee.withdraw')
      }
      this.resetQuery()
      this.$router.push({ name: tab.routeName })
      // this.query.tabBalance = this.kycStatus[tab.title]
      this.tabActive = tab.title
      this.query.currency = tab.title
      this.query.page = 1
      this.query.limit = 10
      this.query.orderBy = 1
      // this.query.transactionType = tab.title.toUpperCase()
      // let refs: any = this.$refs['popup-filter']
      // if (refs) {
      //   refs.handleReset()
      // }
      // let refs2: any = this.$refs['filter']
      // if (refs2) {
      //   refs2.handleReset()
      // }

      this.init()

      // EventBus.$emit('selectTabBalance')
    }

    // destroyed(): void {
    //   EventBus.$off('selectTabBalance')
    //   EventBus.$off('changeTab')
    // }

    // resetQuery(): void {
    //   this.query = {
    //     ...this.query,
    //     page: 1,
    //     limit: 10,
    //     search: '',
    //     orderBy: 3
    //   }
    // }
    resetQuery(): void {
      this.query = {
        ...this.query,
        page: 1,
        limit: 10,
        search: null,
        orderBy: '1',
        keywordString: null,
        currency: null,
        status: null,
        fromDate: null,
        toDate: null,
        fromAmount: null,
        toAmount: null,
        bonusType: null
      }
    }
    log(data:any):void {
      console.log(data, "dddd")
    }
    // handleFilter(filters: any): void {
    //   console.log(filters)
    // } 
    handlePageChange(page: number): void {
      this.query.page = page
      this.init()
    }

    handleSizeChange(limit: number): void {
      this.query.limit = limit
      this.init()
    }

    handleRowClick(row: Record<string, any>): void {
      this.detailRow = row
      this.setOpenPopup({
        popupName: 'popup-balance-detail',
        isOpen: true
      })
    }

    handleFilter(filter: Record<string, any>): void {
      console.log(filter)
      this.query = {
        ...this.query,
        currency: '',
        transactionType: this.typeActive.title,
        fromDate: filter.fromDate,
        toDate: filter.toDate,
        fromAmount: filter.fromAmount,
        toAmount: filter.toAmount,
        orderBy: '1',
        page: 1,
        limit: 10
      }
      console.log('query', this.query)

      this.debounceInit()
    }

    debounceInit = debounce(() => {
      this.init()
    }, 300)
  }
</script>

<style scoped lang="scss">
  .container {
    text-align: justify;
    -ms-text-justify: distribute-all-lines;
    text-justify: distribute-all-lines;
    width: 100%;
  }
  .filter {
    &-header {
      height: 57px;
      border-bottom: 1px solid var(--bc-border-primary);
      display: flex;
    }
    &-type {
      width: auto;
      display: inline;
      padding: calc(28.5px - 8px) 12px;
      font-size: 16px;
      line-height: 16px;
      &:hover {
        color: var(--bc-tab-active)
      }
      &.tab-active {
        font-weight: 600;
        color: var(--bc-tab-active);
        border-bottom: 3px solid var(--bc-tab-active)
      }
    }
  }
  .bo-kyc .wallet-header__above-tabs .tab-item {
    color: var(--bc-text-discript);
  }

  ::v-deep .container > div {
    width: 100px;
    height: 100px;
    vertical-align: top;
    display: inline-block;
    *display: inline;
    zoom: 1;
    background: #efefef;
    margin-right: -2px !important;
  }

  .sack-banlance {
    display: flex;
    justify-content: space-between;
    margin-top: 6px;
    //padding: 0 18px;
  }

  .col-width {
    width: 20% !important;
    height: auto !important;
    border-radius: 8px !important;
    border: 1px solid #dbdbdb !important;
    box-sizing: border-box !important;
    padding: 0 16px !important;
    display: flex !important;
    flex-direction: column;
    justify-content: space-between;
  }

  .tabActive {
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
  }

  .text1 {
    // margin-top: 16px;
    // margin-left: 18px;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    color: var(--bc-text-discript);
  }

  .number2 {
    width: 100%;
    margin-top: 8px;
    //margin-left: 18px;
    //margin-right: 18px;
    font-weight: 600;
    font-size: 24px;
    line-height: 24px;
    color: #0a0b0d;
    word-break: break-all;
  }

  .text3 {
    font-size: 14px;
    line-height: 20px;
    font-weight: 400;
    margin-top: 6px;
    //margin-left: 18px;
    margin-bottom: 16px;
    color: var(--bc-text-discript);
  }

  .col-margin {
    background: #fff !important;
    flex-basis: calc((100% - 24px - 48px) / 4) !important;
  }

  .container > div {
    width: 100px;
    height: 100px;
    vertical-align: top;
    display: inline-block;
    *display: inline;
    zoom: 1;
    background: red;
  }

  span {
    width: 100%;
    display: inline-block;
    font-size: 16px;
    line-height: 24px;
  }

  .bo-kyc {
    box-shadow: 0px 0.3px 0.9px rgba(0, 0, 0, 0.1), 0px 1.6px 3.6px rgba(0, 0, 0, 0.13);
    border-radius: 4px;

    .wallet-header {
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
        padding: 24px;

        &-amount {
          .amount-wallet,
          .amount-lock {
            flex: 1;

            .title {
              margin-left: 16px;

              .title-coin {
                color: #201f1e;
              }
            }

            .amount {
              margin-top: 10px;

              .amount-btc {
                color: var(--bc-amount-btc);
              }

              .amount-lyn {
                color: var(--bc-amount-lin);
              }

              .amount-lock {
                color: var(--bc-amount-lock);
              }
            }
          }

          .amount-wallet {
            border-right: 1px solid var(--bc-border-primary);
          }
        }
      }
    }
  }

  .wallet-header-task {
    display: flex;
    justify-content: space-between;
    padding: 24px;
    background-color: transparent;
  }
</style>
