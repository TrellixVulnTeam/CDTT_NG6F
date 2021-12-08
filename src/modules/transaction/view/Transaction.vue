<template>
  <div class="w-100 transaction">
    <div class="container wallet-header be-flex" style="width: 100%">
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
          <p class="number2">${{ value.totalAmount | convertAmountDecimal('USD') }}</p>
        </div>
        <div class="item-bottom">
          <span class="text3">{{ value.numOfTransaction | formatNumber }} {{ $t(`transaction.table.transactions`) }}</span>
        </div>
      </div>
    </div>
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
      <filter-transaction @filter="handleFilter" :type="'transaction'" ref="filter" />
      <div class="table-transaction">
        <table-transaction
          v-loading="isLoading"
          :listTransaction="propDataTable"
          :query="query"
          @sizeChange="handleSizeChange"
          @pageChange="handlePageChange"
          :type="'transaction'"
          @rowClick="handleRowClick"
        />
      </div>
      <popup-filter-transaction @filter="handleFilter" :tab-active-filter="tabActive" :type="'transaction'" ref="popup-filter" />
      <transaction-detail :detail-row="detailRow" :tab-active-filter="tabActive" />
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Mixins } from 'vue-property-decorator'
  //@ts-ignore

  import PopupMixin from '@/mixins/popup'
  import getRepository from '@/services'
  import { debounce } from 'lodash'
  import { TransactionRepository } from '@/services/repositories/transaction'
  import TableTransaction from '@/components/table/TableTransaction.vue'
  import FilterTransaction from '@/components/filter/FilterTransaction.vue'
  import PopupFilterTransaction from '@/components/popup/PopupFilterTransaction.vue'
  import TransactionDetail from '@/modules/transaction/components/transactionDetail/TransactionDetail.vue'

  const api: TransactionRepository = getRepository('transaction')

  interface IDataCard {
    numOfTransaction: number | null
    totalAmount: number | null
    transactionType: string | null
  }

  @Component({ components: { PopupFilterTransaction, TableTransaction, FilterTransaction, TransactionDetail } })
  export default class Transaction extends Mixins(PopupMixin) {
    tabs: Array<Record<string, any>> = [
      {
        id: 1,
        title: 'deposit',
        routeName: 'TransactionDeposit'
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
    tabActive = 'deposit'
    isLoading = false

    dataHeaderCard: IDataCard[] = []

    detailRow = {}
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
    listApproveBy: Record<string, any>[] = []

    async created(): Promise<void> {
      // apiKyc.getListApprove({ page: 1, limit: 20 }).then(res => {
      //   this.listApproveBy = res.content || []
      // })
      const name = this.$route.name
      this.tabs.map((value, i) => {
        if (value.routeName === name) {
          this.query.transactionType = value.title.toUpperCase()
          this.tabActive = value.title
        }
      })
      this.init().then()
    }

    propDataTable: Record<string, any>[] = []

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
        this.propDataTable = result.transactions.content

        const deposit = result.summary.filter(item => {
          return item.transactionType === 'DEPOSIT'
        })
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
      }
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
        search: '',
        orderBy: '1',
        keywordString:'',
        currency:'',
        status:'',
        fromDate:'',
        toDate:'',
        fromAmount:'',
        toAmount:''
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
        popupName: 'popup-transaction-detail',
        isOpen: true
      })
    }

    handleFilter(filter: Record<string, any>): void {
      let data = { ...filter }
      this.query = {
        ...this.query,
        ...filter
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
      box-shadow: 0px 0.3px 0.9px rgba(0, 0, 0, 0.1), 0px 1.6px 3.6px rgba(0, 0, 0, 0.13);
      border-radius: 8px;
      // margin-right: 24px;
      margin-bottom: 24px;
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
