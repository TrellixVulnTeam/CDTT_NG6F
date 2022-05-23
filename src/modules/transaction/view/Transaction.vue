<template>
  <div class="w-100 transaction">

    <div class="bg-white box-shadow" style="margin-bottom: 24px">
      <div class="bg-white wallet-header">
        <div class="be-flex align-center jc-space-between wallet-header__above">
          <div class="wallet-header__above-tabs be-flex">
            <div class="tab-item cursor" v-for="tab in getTabsHeader" :key="tab.id" :class="$route.params.token === tab.title ? 'tab-active' : null" @click="handleChangeTabsHeader(tab)">
              <span class="text-base">{{ $t(`menu.${tab.title}`) }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="container wallet-header be-flex" style="width: calc(100% - 48px); padding:24px 24px">
        <div v-for="(value, i) in dataHeaderCard" :key="i" class="items-card">
          <div class="item be-flex top">
          <span class="text1">
            {{ renderTitleCard(value.transactionType) }}
          </span>
            <div>
              <base-icon :icon="renderIconCard(value.transactionType)" size="24" />
            </div>
          </div>
          <div class="item">
            <p class="number2">{{ 0 | convertAmountDecimal(tabHeaderActive) }}
              <a class="tabActiveHeader">{{ tabHeaderActive }}</a>
            </p>
          </div>
          <div class="item-bottom">
            <span class="text3">~${{ value.totalAmount | convertAmountDecimal('USD') }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="w-100 bo-kyc box-shadow">
      <div class="bg-white wallet-header ">
        <div class="be-flex align-center jc-space-between wallet-header__above">
          <div class="wallet-header__above-tabs be-flex">
            <div class="tab-item cursor" v-for="tab in tabs" :key="tab.id" :class="$route.name === tab.routeName ? 'tab-active' : null" @click="handleChangeTab(tab)">
              <span class="text-base">{{ $t(`menu.${tab.title}`) }}</span>
            </div>
          </div>
        </div>
      </div>
      <filter-transaction
        @filter="handleFilter"
        :type="'transaction'"
        :showBtn="getShowBtn"
        :showBtnCrowdsale="showBtnCrowdsale"
        :showBtnTransfer="showBtnTransfer"
        ref="filter"
        @clickButton="handleClickButton"
      />
      <div class="table-transaction">
        <table-transaction
          v-loading="isLoading"
          :listTransaction="propDataTable"
          :query="query"
          @sizeChange="handleSizeChange"
          @pageChange="handlePageChange"
          :type="'transaction'"
          @rowClick="handleRowClick"
          @copy="handleCopy"
        />
      </div>
      <popup-filter-transaction @filter="handleFilter" :tab-active-filter="tabActive" :type="'transaction'" ref="popup-filter" />
      <transaction-detail :detail-row="detailRow" :tab-active-filter="tabActive" />
      <popup-add-deposit @reload="init" />
      <popup-add-crowdsale @confirm="handleConfirm" />
      <popup-add-transfer @confirm="handleConfirm" />
      <popup-verify :type="type2Fa" :data="formData" @reload="init" :transactionType="query.transactionType" />
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Mixins } from 'vue-property-decorator'
  //@ts-ignore

  import PopupMixin from '@/mixins/popup'
  import getRepository from '@/services'
  import { debounce, filter } from 'lodash'
  import { TransactionRepository } from '@/services/repositories/transaction'
  import { CrowdsaleRepository } from '@/services/repositories/crowdsale'

  import TableTransaction from '@/components/table/TableTransaction.vue'
  import FilterTransaction from '@/components/filter/FilterTransaction.vue'
  import PopupFilterTransaction from '@/components/popup/PopupFilterTransaction.vue'
  import TransactionDetail from '@/modules/transaction/components/transactionDetail/TransactionDetail.vue'
  import PopupAddDeposit from '../components/PopupAddDeposit.vue'
  import PopupAddCrowdsale from '../components/PopupAddCrowdsale.vue'
  import PopupAddTransfer from '../components/PopupAddTransfer.vue'
  import PopupVerify from '@/components/popup/PopupVerify.vue'
  import firebase from '@/utils/firebase'
  const api: TransactionRepository = getRepository('transaction')
  const apiCrowdsale: CrowdsaleRepository = getRepository('crowdsale')

  import { namespace } from 'vuex-class'
  const bcAuth = namespace('beAuth')
  const beBase = namespace('beBase')
  interface IDataCard {
    numOfTransaction: number | null
    totalAmount: number | null
    transactionType: string | null
  }

  @Component({
    components: {
      PopupFilterTransaction,
      TableTransaction,
      FilterTransaction,
      TransactionDetail,
      PopupAddDeposit,
      PopupAddCrowdsale,
      PopupVerify,
      PopupAddTransfer
    }
  })
  export default class Transaction extends Mixins(PopupMixin) {
    @bcAuth.State('user') user!: Record<string, any>
    @beBase.State('coinMain') coinMain!: string
    tabs: Array<Record<string, any>> = [
      {
        id: 1,
        title: 'deposit',
        routeName: 'TransactionDeposit'
      },
      {
        id: 5,
        title: 'crowdsale',
        routeName: 'TransactionCrowdsale'
      },
      {
        id: 2,
        title: 'withdraw',
        routeName: 'TransactionWithdraw'
      },
      {
        id: 3,
        title: 'transfer',
        routeName: 'TransactionTransfer'
      },
      {
        id: 4,
        title: 'bonus',
        routeName: 'TransactionBonus'
      }
    ]

    tabsHeader: Array<Record<string, any>> = [
      {
        id: 2,
        title: 'BTC',
        routeName: 'TransactionBtc'
      },
      {
        id: 3,
        title: 'ETH',
        routeName: 'TransactionEth'
      },
      {
        id: 4,
        title: 'BNB',
        routeName: 'TransactionBnb'
      },
      {
        id: 5,
        title: 'USDT',
        routeName: 'TransactionUsdt'
      },
      {
        id: 6,
        title: 'USDC',
        routeName: 'TransactionUsdc'
      },
      {
        id: 7,
        title: 'BUSD',
        routeName: 'TransactionBusd'
      }
    ]

    tabHeaderActive = ''
    tabActive = ''
    isLoading = false

    dataHeaderCard: IDataCard[] = []

    detailRow = {}
    query: any = {
      // userId: null,
      // keywordString: '',
      currency: 'LYNK',
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
    listApproveBy: Record<string, any>[] = []
    type2Fa = ''
    formData: Record<string, any> = {}

    get getTabsHeader(): Array<Record<string, any>> {
      if (this.coinMain === 'LYNK') {
        return [
          {
            id: 1,
            title: 'LYNK',
            routeName: 'TransactionLynk'
          },
          ...this.tabsHeader
        ]
      }
      return [
        {
          id: 1,
          title: 'CLM',
          routeName: 'TransactionClm'
        },
        ...this.tabsHeader
      ]
    }

    get getShowBtn(): boolean {
      return this.$route.name === 'TransactionDeposit' && this.checkPemission('transaction', ['add-deposit'])
    }
    get showBtnCrowdsale(): boolean {
      return this.$route.name === 'TransactionCrowdsale' && this.checkPemission('transaction', ['add-crowdsale'])
    }
    get showBtnTransfer(): boolean {
      return this.$route.name === 'TransactionTransfer' && this.checkPemission('transaction', ['add-transfer'])
    }

    async created(): Promise<void> {
      // apiKyc.getListApprove({ page: 1, limit: 20 }).then(res => {
      //   this.listApproveBy = res.content || []
      // })
      console.log('route', this.$route.path.split('/')[2])
      this.tabHeaderActive = this.$route.path.split('/')[2]
      this.tabActive = this.$route.path.split('/')[3]

      // const name = this.$route.name
      // console.log(name)
      // this.tabs.map((value, i) => {
      //   if (value.routeName === name) {
      //     this.query.transactionType = value.title.toUpperCase()
      //     this.tabActive = value.title
      //   }
      // })
      await this.init()
    }

    propDataTable: Record<string, any>[] = []

    async init(): Promise<void> {
      // console.log('tabactive', this.tabActive)
      // console.log('tabHeaderActive', this.tabHeaderActive)
      try {
        this.isLoading = true
        const params = {
          ...this.query,
          // userId: this.query.userId,
          transactionType: this.tabActive,
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
        this.propDataTable = result.transactions.content

        const deposit = result.summary.filter(item => {
          return item.transactionType === 'DEPOSIT'
        })
        // const crowdsale = result.summary.filter(item => {
        //   return item.transactionType === 'CROWDSALE'
        // })
        const withdraw = result.summary.filter(item => {
          return item.transactionType === 'WITHDRAW'
        })
        const transfer = result.summary.filter(item => {
          return item.transactionType === 'TRANSFER'
        })
        const bonus = result.summary.filter(item => {
          return item.transactionType === 'BONUS'
        })

        this.dataHeaderCard = [...deposit, ...withdraw, ...transfer, ...bonus]

        this.query.total = result.transactions.totalElements
        this.isLoading = false
      } catch (error) {
        this.isLoading = false
        console.log(error)
      }
    }

    renderTitleCard(type: 'BONUS' | 'DEPOSIT' | 'TRANSFER' | 'WITHDRAW'): string {
      switch (type) {
        case 'BONUS':
          return this.$i18n.t(`transaction.table.total-bonus`) as string
        case 'DEPOSIT':
          return this.$i18n.t(`transaction.table.total-deposit`) as string
        case 'TRANSFER':
          return this.$i18n.t(`transaction.table.total-transfer`) as string
        case 'WITHDRAW':
          return this.$i18n.t(`transaction.table.total-withdraw`) as string
        default:
          return this.$i18n.t(`transaction.table.total-crowdsale`) as string
      }
    }

    renderIconCard(type: 'BONUS' | 'DEPOSIT' | 'TRANSFER' | 'WITHDRAW'): string {
      switch (type) {
        case 'BONUS':
          return 'icon-gift'
        case 'DEPOSIT':
          return 'icon-download'
        case 'TRANSFER':
          return 'icon-swap-2'
        case 'WITHDRAW':
          return 'icon-upload'
        default:
          return 'icon-crowdsale'
      }
    }
    handleChangeTabsHeader(tab: Record<string, any>): void {
      this.resetQuery()
      this.$router.push({ params: {token: tab.title} })
      // this.query.tabBalance = this.kycStatus[tab.title]
      this.tabHeaderActive = tab.title
      this.query.page = 1
      this.query.limit = 10
      this.query.orderBy = 1
      this.query.currency = tab.title.toUpperCase();
      this.init()
    }

    handleChangeTab(tab: Record<string, any>): void {
      this.resetQuery()
      this.$router.push({ name: tab.routeName })
      // this.query.tabBalance = this.kycStatus[tab.title]
      this.tabActive = tab.title
      this.query.page = 1
      this.query.limit = 10
      this.query.orderBy = 1
      this.query.transactionType = tab.title.toUpperCase()
      this.query.currency = this.tabHeaderActive
      let refs: any = this.$refs['popup-filter']
      if (refs) {
        refs.handleReset()
      }
      let refs2: any = this.$refs['filter']
      if (refs2) {
        refs2.handleReset()
      }

      this.init()

      // EventBus.$emit('selectTabBalance')
    }

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
    isCopy = ''

    handlePageChange(page: number): void {
      this.query.page = page
      this.init()
    }

    handleSizeChange(limit: number): void {
      this.query.limit = limit
      this.init()
    }

    handleCopy(data: any): void {
      this.isCopy = data
    }

    handleRowClick(row: Record<string, any>): void {
      if (this.isCopy !== 'copy') {
        this.detailRow = row
        this.setOpenPopup({
          popupName: 'popup-transaction-detail',
          isOpen: true
        })
      } else {
        this.isCopy = ''
      }
    }

    handleFilter(filter: Record<string, any>): void {
      let data = { ...filter }
      const _transactionType = this.query.transactionType
      const _currency = this.query.currency
      this.query = {
        ...this.query,
        ...filter,
        currency: _currency,
        transactionType: _transactionType,
        page: 1,
        limit: 10
      }
      this.debounceInit()
    }

    debounceInit = debounce(() => {
      this.init()
    }, 300)

    handleClickButton(popupName: string): void {
      this.setOpenPopup({
        popupName,
        isOpen: true
      })
    }

    async handleConfirm(form: Record<string, any>): Promise<void> {
      this.formData = form
      if (this.query.transactionType === 'CROWDSALE') {
        const params: Record<string, any> = {
          email: this.user.email,
          userType: 'EMPLOYEE'
        }
        const apiSendcode = apiCrowdsale.sendCodeBuyCrowdsale()
        const apiGet2FA = apiCrowdsale.get2FABuyCrowdsale(params)
        const result = await Promise.all([apiSendcode, apiGet2FA])
        this.type2Fa = result[1]
        this.setOpenPopup({
          popupName: 'popup-base-verify',
          isOpen: true
        })
      } else {
        apiCrowdsale.sendCodeAndGet2FATransfer().then(res => {
          this.type2Fa = res.type
          this.setOpenPopup({
            popupName: 'popup-base-verify',
            isOpen: true
          })
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .container {
    text-align: justify;
    -ms-text-justify: distribute-all-lines;
    text-justify: distribute-all-lines;
    width: 100%;
    justify-content: space-between;
  }

  .transaction {
    //box-shadow: 0px 0.3px 0.9px rgba(0, 0, 0, 0.1), 0px 1.6px 3.6px rgba(0, 0, 0, 0.13);
    //border-radius: 4px;
    .kyc-filter {
      background-color: #ffffff !important;
      padding-top: 24px;
      padding-bottom: 24px;
    }

    .items-card {
      width: calc(100% / 4 - 50px);
      background-color: #ffffff;
      //box-shadow: 0px 0.3px 0.9px rgba(0, 0, 0, 0.1), 0px 1.6px 3.6px rgba(0, 0, 0, 0.13);
      border-radius: 8px;
      border: 1px solid #dbdbdb !important;
      // margin-right: 24px;
      //margin-bottom: 24px;
      padding: 16px;
      display: flex;
      flex-direction: column;
      // flex: 1;
      .item-bottom {
        margin-top: auto;
      }

      &:last-of-type {
        margin-right: 0;
      }

      .top {
        justify-content: space-between;
        align-items: center;
      }

      .number2 {
        font-family: Open Sans;
        font-style: normal;
        font-weight: 600;
        font-size: 24px;
        line-height: 24px;
        color: #0a0b0d;
        word-break: break-all;
        margin: 8px 0;
        .tabActiveHeader {
          font-weight: 400;
          font-size: 12px;
          line-height: 16px;
        }
      }

      .text3 {
        font-family: Open Sans;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 20px;
        color: #5b616e;
      }

      .text1 {
        font-family: Open Sans;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 24px;
        color: #5b616e;
      }
    }

    .table-transaction {
      padding: 0 24px;
      background-color: #ffffff;

      .cell {
        .customer {
          p:first-of-type {
            font-family: Open Sans;
            font-style: normal;
            font-weight: normal;
            font-size: 16px;
            line-height: 24px;
            color: #0a0b0d;
          }

          p:last-of-type {
            font-family: Open Sans;
            font-style: normal;
            font-weight: normal;
            font-size: 14px;
            line-height: 20px;
            color: #5b616e;
          }
        }
      }
    }

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
            color: var(--bc-tab-active) !important;
            font-weight: 600 !important;

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

          .tab-item {
            font-family: Open Sans;
            font-style: normal;
            font-weight: normal;
            font-size: 16px;
            line-height: 24px;
            color: #5b616e;
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
