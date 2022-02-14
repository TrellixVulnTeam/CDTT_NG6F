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
    <div class="container bg-white wallet-header-task" style="width: calc(100% - 48px)">
      <div class="col-width col-margin">
        <div class="sack-banlance">
          <span class="text1">
            {{ $t(`balance.investor`) }}
          </span>
          <div>
            <base-icon icon="icon-people" size="19" />
          </div>
        </div>
        <span class="number2"> {{ numOfInvestor | formatNumber }}</span>
        <div>
          <span class="text3"> {{ $t(`balance.of-total`) }} {{ numOfUser | formatNumber }}</span>
        </div>
      </div>

      <div class="col-width col-margin">
        <div class="sack-banlance">
          <span class="text1">{{ $t(`balance.total-available`) }} </span>
          <div>
            <base-icon icon="icon-swap" size="19" />
          </div>
        </div>
        <span class="number2">
          {{ totalAvailable | convertAmountDecimal(tabActive) }} <a class="tabActive">{{ tabActive }}</a>
        </span>
        <span class="text3"> ~${{ totalAvailableUSD | convertAmountDecimal('USD') }}</span>
      </div>
      <div class="col-width col-margin">
        <div class="sack-banlance">
          <span class="text1">{{ $t(`balance.total-locked`) }}</span>
          <div>
            <base-icon icon="icon-lock-balance" size="19" />
          </div>
        </div>
        <span class="number2">
          {{ totalLocked | convertAmountDecimal(tabActive) }} <a class="tabActive">{{ tabActive }}</a></span
        >
        <span class="text3">~${{ totalLockedUSD | convertAmountDecimal('USD') }}</span>
      </div>
      <div class="col-width col-margin">
        <div class="sack-banlance">
          <span class="text1"> {{ $t(`balance.balance-wallet`) }}</span>
          <div>
            <base-icon icon="icon-wallet" size="19" />
          </div>
        </div>
        <span class="number2">
          {{ totalBalance | convertAmountDecimal(tabActive) }} <a class="tabActive">{{ tabActive }}</a></span
        >
        <span class="text3"> ~ ${{ totalBalanceUSD | convertAmountDecimal('USD') }}</span>
      </div>
    </div>
    <balance-filter @filterBalance="handleFilter" :listApproveBy="listApproveBy" />
    <balance-table
      v-loading="isLoading"
      @rowClick="handleRowClick"
      @sizeChange="handleSizeChange"
      @pageChange="handlePageChange"
      :query="query"
      :propTabActive="tabActive"
      :data="propdataTable"
    />
    <!-- <kyc-detail :detailRow="detailRow" @init="init" /> -->
    <balance-detail :detailRow="detailRow" :data="dataDetail" :tab-active-filter="tabActive" />
  </div>
</template>

<script lang="ts">
import { Component, Mixins, Watch } from 'vue-property-decorator'
//@ts-ignore
import BalanceTable from '../components/BalanceTable.vue'
import BalanceFilter from '../components/filter/BalanceFilter.vue'
import PopupMixin from '@/mixins/popup'
import getRepository from '@/services'
import { BalanceRepository } from '@/services/repositories/balance'
import EventBus from '@/utils/eventBus'
import { debounce } from 'lodash'

import BalanceDetail from '@/modules/balance/components/balanceDetail/BalanceDetail.vue'

const api: BalanceRepository = getRepository('balance')

import { namespace } from 'vuex-class'

const beBase = namespace('beBase')

@Component({ components: { BalanceTable, BalanceFilter, BalanceDetail } })
export default class BOKyc extends Mixins(PopupMixin) {
  @beBase.State('coinMain') coinMain!: string

  tabs: Array<Record<string, any>> = [
    {
      id: 2,
      title: 'BTC',
      routeName: 'BalanceBtc'
    },
    {
      id: 3,
      title: 'ETH',
      routeName: 'BalanceEth'
    },
    {
      id: 4,
      title: 'BNB',
      routeName: 'BalanceBnb'
    },
    {
      id: 5,
      title: 'USDT',
      routeName: 'BalanceUsdt'
    },
    {
      id: 6,
      title: 'USDC',
      routeName: 'BalanceUsdc'
    },
    {
      id: 7,
      title: 'BUSD',
      routeName: 'BalanceBusd'
    }
  ]
  titlePending = ''
  tabActive = ''
  isLoading = false

  data: Array<Record<string, any>> = []

  detailRow = {}
  dataDetail = {}
  query: any = {
    search: '',
    orderBy: 3,
    page: 1,
    limit: 10,
    total: 10
  }
  numOfInvestor = ''
  numOfUser = ''
  totalAvailable = ''
  totalBalance = ''
  totalElement = ''
  totalLocked = ''
  totalAvailableUSD = ''
  totalLockedUSD = ''
  totalBalanceUSD = ''
  listApproveBy: Record<string, any>[] = []

  get getTab(): Array<Record<string, any>> {
    if (this.coinMain === 'LYNK') {
      return [
        {
          id: 1,
          title: 'LYNK',
          routeName: 'BalanceLynk'
        },
        ...this.tabs
      ]
    }
    return [
      {
        id: 1,
        title: 'CLM',
        routeName: 'BalanceClm'
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
    this.init()
  }

  propdataTable: Record<string, any>[] = []

  async init(): Promise<void> {
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

      this.numOfInvestor = result.numOfInvestor
      this.numOfUser = result.numOfUser
      this.totalAvailable = result.totalAvailable
      this.totalBalance = result.totalBalance
      this.totalLocked = result.totalLocked
      this.totalBalance = result.totalBalance
      this.totalAvailableUSD = result.totalAvailableUSD
      this.totalLockedUSD = result.totalLockedUSD
      this.totalBalanceUSD = result.totalBalanceUSD
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

  handleChangeTab(tab: Record<string, any>): void {
    console.log('tab', tab.title, this.$route.name, this.tabActive)
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

  destroyed(): void {
    EventBus.$off('selectTabBalance')
    EventBus.$off('changeTab')
  }

  resetQuery(): void {
    this.query = {
      ...this.query,
      page: 1,
      limit: 10,
      search: '',
      orderBy: 3
    }
  }

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
    this.query = {
      ...this.query,
      ...filter,
      page: 1,
      limit: 10
    }
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
}
</style>
