<template>
  <div class="w-100 bo-kyc">
    <div class="bg-white wallet-header">
      <div class="be-flex align-center jc-space-between wallet-header__above">
        <div class="wallet-header__above-tabs be-flex">
          <div class="tab-item cursor" v-for="tab in tabs" :key="tab.id" :class="$route.name === tab.routeName ? 'tab-active' : null" @click="handleChangeTab(tab)">
            <span class="text-base">{{ $t(`menu.${tab.title}`) }}</span>
          </div>
        </div>
      </div>
    </div>

    <balance-filter @filterBalance="handleFilter" :listApproveBy="listApproveBy" />
    <balance-table v-loading="isLoading" @rowClick="handleRowClick" @sizeChange="handleSizeChange" @pageChange="handlePageChange" :query="query" :data="data" />
    <!-- <kyc-detail :detailRow="detailRow" @init="init" /> -->
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

  import { namespace } from 'vuex-class'
  const api: BalanceRepository = getRepository('balance')

  @Component({ components: { BalanceTable, BalanceFilter } })
  export default class BOKyc extends Mixins(PopupMixin) {
    tabs: Array<Record<string, any>> = [
      {
        id: 1,
        title: 'lynk',
        routeName: 'BalanceLynk'
      },
      {
        id: 2,
        title: 'btc',
        routeName: 'BalanceBtc'
      },
      {
        id: 3,
        title: 'eth',
        routeName: 'BalanceEth'
      },
      {
        id: 4,
        title: 'bnb',
        routeName: 'BalanceBnb'
      },
      {
        id: 5,
        title: 'usdt',
        routeName: 'BalanceUsdt'
      },
      {
        id: 6,
        title: 'usdc',
        routeName: 'BalanceUsdc'
      }
    ]
    titlePending = ''
    tabActive = 'lynk'
    isLoading = false

    data: Array<Record<string, any>> = []

    detailRow = {}

    query: any = {
      search: '',
      orderBy: 1,
      page: 1,
      limit: 10,
      total: 10
    }
    listApproveBy: Record<string, any>[] = []
    getListBalance(): void {
      console.log('1')
    }
    created(): void {
      // apiKyc.getListApprove({ page: 1, limit: 20 }).then(res => {
      //   this.listApproveBy = res.content || []
      // })
      // const name = this.$route.name
      // this.query.kycStatus = name === 'KycPending' ? 'PENDING' : name === 'KycVerified' ? 'VERIFIED' : 'REJECTED'
      // this.init()
    }

    async init(): Promise<void> {
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
        this.query.total = result.totalElement
        this.isLoading = false
        // console.log('result', result)
      } catch (error) {
        this.isLoading = false
        console.log(error)
      }
    }

    handleChangeTab(tab: Record<string, any>): void {
      console.log('tabs', tab.title)
      this.$router.push({ name: tab.routeName })
      // this.query.tabBalance = this.kycStatus[tab.title]
      this.tabActive = tab.title
      this.query.page = 1
      this.query.limit = 10
      this.query.orderBy = 1
      this.query.toBalanceAmount = ''
      ;(this.query.fromBalanceAmount = ''),
        (this.query.toLockedAmount = ''),
        (this.query.fromLockedAmount = ''),
        (this.query.toAvailableAmount = ''),
        (this.query.fromAvailableAmount = ''),
        (this.query.search = '')
      this.init()
      this.resetQuery()
      EventBus.$emit('selectTabBalance')
    }

    resetQuery(): void {
      this.query = {
        ...this.query,
        page: 1,
        limit: 10,
        search: '',
        orderBy: '1'
      }
    }

    handlePageChange(page: number): void {
      this.query.page = page
      this.init()
    }
    handleSizeChange(limit: number): void {
      console.log('limit', limit)
      this.query.limit = limit
      this.init()
    }

    handleRowClick(row: Record<string, any>): void {
      this.detailRow = row
      this.setOpenPopup({
        popupName: 'popup-kyc-detail',
        isOpen: true
      })
    }

    handleFilter(filter: Record<string, any>): void {
      console.log('1', filter)
      this.query = {
        ...this.query,
        ...filter
      }
      console.log('thanh', this.query)
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
</style>
