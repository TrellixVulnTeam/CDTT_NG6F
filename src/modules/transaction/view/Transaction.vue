<template>
  <div class='w-100 transaction'>
    <div class='container wallet-header be-flex' style='width: 100%'>
      <div v-for='(value,i) in dataHeaderCard' :key='i' class='items-card'>
        <div class='be-flex top'>
          <span class='text1'>
            {{ renderTitleCard(value.transactionType) }}
          </span>
          <div>
            <base-icon :icon='renderIconCard(value.transactionType)' size='19' />
          </div>
        </div>
        <p class='number2'>${{ value.totalAmount |convertAmountDecimal('USD') }}</p>
        <div>
          <span class='text3'>{{ value.numOfTransaction | formatNumber }} {{ $t(`transaction.table.transactions`)
            }}</span>
        </div>
      </div>
    </div>
    <div class='w-100 bo-kyc'>
      <div class='bg-white wallet-header'>
        <div class='be-flex align-center jc-space-between wallet-header__above'>
          <div class='wallet-header__above-tabs be-flex'>
            <div class='tab-item cursor' v-for='tab in tabs' :key='tab.id'
                 :class="$route.name === tab.routeName ? 'tab-active' : null" @click='handleChangeTab(tab)'>
              <span class='text-base'>{{ $t(`menu.${tab.title}`) }}</span>
            </div>
          </div>
        </div>
      </div>
      <filter-transaction @filter='handleFilter' :type='"transaction"' />
      <div class='table-transaction'>
        <table-transaction v-loading='isLoading' :listTransaction='propDataTable' :query='query'
                           @sizeChange='handleSizeChange'
                           @pageChange='handlePageChange' :type='"transaction"' @rowClick='handleRowClick' />
      </div>
      <popup-filter-transaction @filter='handleFilter' :tab-active-filter='tabActive' :type='"transaction"'/>
      <transaction-detail :detail-row='detailRow' :tab-active-filter='tabActive' />
    </div>
  </div>
</template>

<script lang='ts'>
  import { Component, Mixins, Watch } from 'vue-property-decorator'
  //@ts-ignore
  import TransactionTable from '../components/TransactionTable.vue'
  import TransactionFilter from '../components/filter/TransactionFilter.vue'
  import PopupMixin from '@/mixins/popup'
  import getRepository from '@/services'
  import EventBus from '@/utils/eventBus'
  import { debounce } from 'lodash'
  import { TransactionRepository } from '@/services/repositories/transaction'
  import TableTransaction from '@/components/table/TableTransaction.vue'
  import FilterTransaction from '@/components/filter/FilterTransaction.vue'
  import PopupFilterTransaction from '@/components/popup/PopupFilterTransaction.vue'
  import TransactionDetail from '@/modules/transaction/components/transactionDetail/TransactionDetail.vue'

  const api: TransactionRepository = getRepository('transaction')

  interface IDataCard {
    numOfTransaction: number | null,
    totalAmount: number | null,
    transactionType: string | null,
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
      // currency: [],
      transactionType: '',
      // fromDate: '',
      // toDate: '',
      // fromAmount: '',
      // toAmount: '',
      // orderBy: 1,
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
          this.tabActive=value.title
          console.log(this.tabActive)
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
          total: null
        }
        const result = await api.getListTransaction('search', params)
        this.propDataTable = result.transactions.content
        this.dataHeaderCard = result.summary
        this.dataHeaderCard = this.dataHeaderCard.filter((item) => {
          return item.transactionType !== 'CROWDSALE'
        })
        this.query.total = result.transactions.totalPages
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
          return 'icon-swap'
        case 'WITHDRAW':
          return 'icon-upload'
      }
    }

    handleChangeTab(tab: Record<string, any>): void {
      this.$router.push({ name: tab.routeName })
      // this.query.tabBalance = this.kycStatus[tab.title]
      this.tabActive = tab.title
      this.query.page = 1
      this.query.limit = 10
      this.query.orderBy = 1
      this.query.transactionType = tab.title.toUpperCase()
      this.init()
      this.resetQuery()
      // EventBus.$emit('selectTabBalance')
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

<style scoped lang='scss'>
  .container {
    text-align: justify;
    -ms-text-justify: distribute-all-lines;
    text-justify: distribute-all-lines;
    width: 100%;
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
      width: 270px;
      background-color: #ffffff;
      box-shadow: 0px 0.3px 0.9px rgba(0, 0, 0, 0.1), 0px 1.6px 3.6px rgba(0, 0, 0, 0.13);
      border-radius: 8px;
      margin-right: 24px;
      margin-bottom: 24px;
      padding: 16px;

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
        color: #0A0B0D;
        max-width: 250px;
        word-wrap: break-word;
        margin: 8px 0;
      }

      .text3 {
        font-family: Open Sans;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 24px;
        color: #5B616E;

      }

      .text1 {
        font-family: Open Sans;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 24px;
        color: #5B616E;

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
            color: #0A0B0D;
          }

          p:last-of-type {
            font-family: Open Sans;
            font-style: normal;
            font-weight: normal;
            font-size: 14px;
            line-height: 20px;
            color: #5B616E;
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
