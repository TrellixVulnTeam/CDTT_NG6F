<template>
<div class="fee-nft">
  <div class="fee-nft-header box-shadow">
    <div class="fee-nft-header__tabs">
      <span class="tab-item cursor" v-for="(tab, index) in getTab" :key="index"
      :class="{'tab-active': getTabActive === tab.title}"
      @click="handleChangeTab(tab)">{{tab.title}}</span>
    </div>
    <div class="fee-nft-header__summaries">
      <div class="summary">
        <div class="summary-title">
          <span class="summary-title__text">{{$t('fee-nft.service-fee')}}</span>
          <base-icon icon="icon-service-fee" size="24"/>
        </div>
        <div class="summary-number">
          {{(typeActive.value === 'NFT_SALE' ? summaries[0].totalFeeDisplay : 0 )| convertAmountDecimal(tabActive)}} {{tabActive}}
          <!-- {{(getSummary[0].transactionType === 'NFT_SALE' ? getSummary[0].totalFeeDisplay : 0 )| convertAmountDecimal(tabActive)}} {{tabActive}} -->
        </div>
        <div class="summary-approximate">
          ~ ${{(typeActive.value === 'NFT_SALE' ? summaries[0].totalFeeUSD : 0) | convertAmountDecimal('USD')}}
        </div>
      </div>
      <div class="summary">
        <div class="summary-title">
          <span class="summary-title__text">{{$t('fee-nft.royalty-fee')}}</span>
          <base-icon icon="icon-loyalties" size="24"/>
        </div>
        <div class="summary-number">
          {{(typeActive.value === 'ROYALTIES_FEE' ? summaries[0].totalFeeDisplay : 0 )| convertAmountDecimal(tabActive)}} {{tabActive}}
        </div>
        <div class="summary-approximate">
          ~ ${{(typeActive.value === 'ROYALTIES_FEE' ? summaries[0].totalFeeUSD : 0) | convertAmountDecimal('USD')}}
        </div>
      </div>
      <div class="summary">
        <div class="summary-title">
          <span class="summary-title__text">{{$t('fee-nft.transfer-fee')}}</span>
          <base-icon icon="icon-transfer-fee" size="24"/>
        </div>
        <div class="summary-number">
          {{(typeActive.value === 'NFT_TRANSFER' ? summaries[0].totalFeeDisplay : 0 )| convertAmountDecimal(tabActive)}} {{tabActive}}
        </div>
        <div class="summary-approximate">
          ~ ${{(typeActive.value === 'NFT_TRANSFER' ? summaries[0].totalFeeUSD : 0) | convertAmountDecimal('USD')}}
        </div>
      </div>
      <div class="summary" style="visibility: hidden;">
        <div class="summary-title">
          <span class="summary-title__text">Total Burn Fee</span>
          <base-icon icon="icon-burn" size="24"/>
        </div>
        <div class="summary-number">
          47,444.01 LYNK
        </div>
        <div class="summary-approximate">
          ~ $1,253.66
        </div>
      </div>
    </div>
  </div>
  <div class="fee-nft-body box-shadow">
    <div class="fee-nft-body__types">
      <span class="type-item cursor"
      v-for="(type, index) in filterTypes" :key="index"
      @click="handleChangeType(type)"
      :class="typeActive.typeId === type.typeId ? 'tab-active' : null">{{type.title}}</span>
    </div>
    <div class="fee-nft-body__content">
      <div class="wrap-filter">
        <fee-nft-filter @filters="handleFilter($event)" />
      </div>
        <div class="wrap-table">
          <base-table 
          :data="propdataTable"
          class="table-fee-nft"
          :paginationInfo="selectLanguage() === 'en' ? 'Transactions' : $t('header.transaction')"
          :table="queryTable"
          @rowClick="handleRowClick"
          @sizeChange="handleSizeChange"
          @currentChange="handleCurrentChange"
          :loading="isLoading"
          >
            <el-table-column label="#" type="index" :index="indexMethod" width="70"/>
            <el-table-column :label="$t('fee-nft.table.trans-id')" width="300" align="left">
              <template slot-scope="scope">
                <p class="trans-id">
                  <span>
                      {{scope.row.transactionCode | formatTransactionCode(10)}} 
                  </span>
                  <base-icon icon="icon-copy" size="20px" style="margin-left: 8px;" @click.native="handleCopy($event, scope.row.transactionCode)"/>
                </p>
                <p class="trans-date">{{scope.row.transactionDate | formatMMDDYY}}</p>
              </template>
            </el-table-column>
            <el-table-column :label="$t('fee-nft.table.item')" width="380" align="left">
              <template slot-scope="scope">
                <div class="wrap-item-col">
                  <img :src="scope.row.itemThumb" class="item-img" width="40px" height="40px">
                  <div class="item-text">
                    <p class="item-text__name">{{scope.row.itemName}}</p>
                    <p class="item-text__code">#{{scope.row.itemCode}}</p>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column :label="$t('fee-nft.table.from')" width="250" align="left">
              <template slot-scope="scope">
                <div class="wrap-from-col">
                  <p class="wrap-from-col__name">{{scope.row.accountName}}</p>
                  <p class="wrap-from-col__email">{{scope.row.username}}</p>
                </div>
              </template>
            </el-table-column>
            <el-table-column :label="$t('fee-nft.table.fee')" width="180" align="right">
              <template slot-scope="scope">
                <div class="wrap-fee-col">
                  <p class="wrap-fee-col__coin">{{scope.row.feeDisplay | convertAmountDecimal(tabActive)}} {{tabActive}}</p>
                  <p class="wrap-fee-col__usd">~{{scope.row.feeUSD | convertAmountDecimal('USD')}} USD</p>       
                </div>
              </template>
            </el-table-column>
            <el-table-column :label="$t('fee-nft.table.status')" align="right">
              <template slot-scope="scope">
                <span class="status" :class="checkType(scope.row.status)">{{getTitleStatus(scope.row.status)}}</span>
              </template>
            </el-table-column>
          </base-table>      
        </div>
      </div>
    </div>
</div>

</template>

<script lang="ts">
  import { Component, Mixins, Watch } from 'vue-property-decorator'
  //@ts-ignore
  import PopupMixin from '@/mixins/popup'
  import getRepository from '@/services'
  import { FeeNftRepository } from '@/services/repositories/feenft'
  import FeeNftFilter from '@/modules/feeNft/components/filter/FeeNftFilter.vue'
  import BaseTable from '@/components/base/table/BaseTable.vue'
  // import EventBus from '@/utils/eventBus'
  import { debounce } from 'lodash'
  const api: FeeNftRepository = getRepository('feenft')


  import { namespace } from 'vuex-class'

  const beBase = namespace('beBase')
  interface SumFormat {
    transactionType: string,
    totalFeeWei: number,
    totalFeeDisplay: number,
    totalFeeUSD: number
  }
  @Component({components: {FeeNftFilter, BaseTable}})
  export default class FeeNft extends Mixins(PopupMixin) {
    @beBase.State('coinMain') coinMain!: string
    // query: any = {
    //   search: '',
    //   limit: 10,
    //   page: 1,
    //   orderBy: 1,
    //   total: 0
    // }
    summaries = [
        {transactionType: 'NFT_SALE', totalFeeDisplay: 0, totalFeeWei: 0,totalFeeUsd: 0},
        {transactionType: 'ROYALTIES_FEE', totalFeeDisplay: 0, totalFeeWei: 0,totalFeeUsd: 0},
        {transactionType: 'NFT_TRANSFER', totalFeeDisplay: 0, totalFeeWei: 0,totalFeeUsd: 0}
      ]
    isLoading = false
    typeActive = {
      typeId: 1,
      title: 'Service',
      value: 'NFT_SALE'
    }
    currencyActive = 1
    filterTypes: Array<Record<string, any>> = [
      {
        typeId: 1,
        title: this.$i18n.t('fee-nft.service'),
        value: 'NFT_SALE'
      },
      {
        typeId: 2,
        title: this.$i18n.t('fee-nft.royalty'),
        value: 'ROYALTIES_FEE'
      },
      {
        typeId: 3,
        title: this.$i18n.t('fee-nft.transfer'),
        value: 'NFT_TRANSFER'
      }
      // ,
      // {
      //   typeId: 4,
      //   title: 'Burn',
      //   value: 'BURN'
      // }
    ] 

    tabs: Array<Record<string, any>> = [
      {
        id: 2,
        title: 'BTC',
        routeName: 'FeeNftBtc'
      },
      {
        id: 3,
        title: 'ETH',
        routeName: 'FeeNftEth'
      },
      {
        id: 4,
        title: 'BNB',
        routeName: 'FeeNftBnb'
      },
      {
        id: 5,
        title: 'USDT',
        routeName: 'FeeNftUsdt'
      },
      {
        id: 6,
        title: 'USDC',
        routeName: 'FeeNftUsdc'
      },
      {
        id: 7,
        title: 'BUSD',
        routeName: 'FeeNftBusd'
      }
      ,
      // {
      //   id: 8,
      //   title: 'OTHERS',
      //   routeName: 'FeeNftOthers'
      // }
    ]
    titlePending = ''
    tabActive = ''
    isChanged = false

    data: Array<Record<string, any>> = []
    filters: any = {
      fromTransactionAmount: null,
      fromDate: null,
      fromFeeAmount: null,
      orderBy: null,
      search: null,
      status: null,
      toTransactionAmount: null,
      toDate: null,
      toFeeAmount: null
    }
    detailRow = {}
    dataDetail = {}

     query: any = {
      currency: '',
      type: '',
      search: '',
      fromDate: '',
      toDate: '',
      fromFeeAmount: '',
      toFeeAmount: '',
      fromTransactionAmount: '',
      toTransactionAmount: '',
      orderBy: 'DATE',
      status: '',
      page: 1,
      limit: 10,
      total: 10
    }
    
    withdraw: any = {}
    transfer: any = {}
    listApproveBy: Record<string, any>[] = []
    get getTab(): Array<Record<string, any>> {
      console.log('139')
      if (this.coinMain === 'LYNK') {
        return [
          {
            id: 1,
            title: 'LYNK',
            routeName: 'FeeNftLynk'
          },
          ...this.tabs
        ]
      }
      return [
        {
          id: 1,
          title: 'CLM',
          routeName: 'FeeNftClm'
        },
        ...this.tabs
      ]
    }
    get getTabActive():string {
      console.log(this.$route.path.split('/')[2]);
      
      return this.$route.path.split('/')[2]
    }
    get queryTable():any {
      return {
        ...this.query,
        limit: this.query.limit
      } 
    }
    created(): void {
       this.tabActive = this.getTabActive
      console.log('route', this.$route.path.split('/')[2])
      this.query.currency = this.getTabActive
      this.query.status = 'SUCCESS'
      this.query.type = this.typeActive.value
      this.getSummaries()
      this.debounceInit()
    }

    propdataTable: Record<string, any>[] = []
    
    selectLanguage():string {
      return window.localStorage.getItem('bc-lang') as string
    }
    async init(): Promise<void> {
      try {
        this.isLoading = true
        const params = {
          ...this.query,
          // userId: this.query.userId,
          orderBy: this.query.orderBy,
          limit: this.query.limit,
          page: this.query.page,
          currency: this.tabActive,
          fromDate: this.query.fromDate,
          toDate: this.query.toDate,
          fromTransactionAmount: this.query.fromTransactionAmount,
          toTransactionAmount: this.query.toTransactionAmount,
          fromFeeAmount: this.query.fromFeeAmount,
          toFeeAmount: this.query.toFeeAmount,
          type: this.query.type,
          total: null
        }
        const result = await api.getListFeeNft('fee', params)
        this.propdataTable = result.content
        // this.propdataTable = result.transactions.content
        if(this.propdataTable.length > 0) {
          //   this.propdataTable = this.propdataTable.map(
          //   (item) => {
          //     if(this.query.status !== null)
          //     {
          //       item.status = this.query.status
          //     }
          //     return item
          //   }
          // )
          this.propdataTable.forEach(
            (item) => {
              item.status = 
              (item.status === 'PENDING' || item.status === 'SUCCESS' || item.status === 'REJECTED' || item.status === 'PROCESSING' ||
              item.status === 'FAILED') ? item.status : item.status === 'LOCKED' ? 'PENDING' : 'PROCESSING'
            }
          )
        }

        // const summaryWithdraw = result.summary.filter(item => {
        //   return item.transactionType === 'WITHDRAW'
        // })[0]
        // this.withdraw = {
        //   ...summaryWithdraw,
        //   currency: this.tabActive
        // }
        // const summaryTransfer = result.summary.filter(item => {
        //   return item.transactionType === 'TRANSFER'
        // })[0]
        // this.transfer = {
        //   ...summaryTransfer,
        //   currency: this.tabActive
        // }
        this.query.total = result.totalElements
        this.isLoading = false
      } catch (error) {
        this.isLoading = false
        console.log(error)
      }
    }
    async getSummaries(): Promise<any> {
      const params = {
          search: this.query.search,
          orderBy: this.query.orderBy,
          currency: this.tabActive,
          fromDate: this.query.fromDate,
          toDate: this.query.toDate,
          fromTransactionAmount: this.query.fromTransactionAmount,
          toTransactionAmount: this.query.toTransactionAmount,
          fromFeeAmount: this.query.fromFeeAmount,
          toFeeAmount: this.query.toFeeAmount,
          type: this.query.type,
          total: null,
          status: this.query.status
      }
      try {
        const rs = await api.getFeeNftSummary('fee/summary', params)
        console.log('467', rs)
        if(rs.length !== 0) {
          this.summaries = rs
        }
        else {
              this.summaries = [
            {transactionType: 'NFT_SALE', totalFeeDisplay: 0, totalFeeWei: 0,totalFeeUsd: 0},
            {transactionType: 'ROYALTIES_FEE', totalFeeDisplay: 0, totalFeeWei: 0,totalFeeUsd: 0},
            {transactionType: 'NFT_TRANSFER', totalFeeDisplay: 0, totalFeeWei: 0,totalFeeUsd: 0}
          ]
        }
        console.log(this.summaries, '420')
      } catch (error) {
        console.log(error)
        this.isLoading = false
      }
    }

    indexMethod(index: number): number {
      return (this.query.page - 1) * this.query.limit + index + 1
    }
    handleChangeType(Type: any): void {
      this.typeActive = Type
      this.resetQuery()
      this.query.currency = this.tabActive
      this.query.page = 1
      this.query.limit = 10
      this.query.orderBy = 'DATE'
      this.query.type = Type.value
      this.getSummaries()
      this.debounceInit()
    }
    
    handleChangeTab(tab: Record<string, any>): void {
      this.$router.push({ name: tab.routeName }).catch(
        (error) => {console.log(error)}
      )
      this.typeActive = {
      typeId: 1,
      title: 'Service',
      value: 'NFT_SALE'
    }
      this.resetQuery()
      this.tabActive = tab.title
      this.query.currency = tab.title
      this.query.page = 1
      this.query.limit = 10
      this.query.orderBy = 'DATE'
      this.query.type = this.typeActive.value
      this.getSummaries()
      this.debounceInit()
    }
    handleCurrentChange(page: any):void {
      this.query.page = page
      this.init()
      console.log('current change')
    }
 
    resetQuery(): void {
      this.query = {
        ...this.query,
        page: 1,
        limit: 10,
        orderBy: 'DATE',
        search: this.filters.search,
        currency: null,
        // status: 'SUCCESS',
        fromDate: this.filters.fromDate,
        toDate: this.filters.toDate,
        fromTransactionAmount: this.filters.fromTransactionAmount,
        toTransactionAmount: this.filters.toTransactionAmount,
        fromFeeAmount: this.filters.fromFeeAmount,
        toFeeAmount: this.filters.toFeeAmount,
        // bonusType: null
      }
    }
    handlePageChange(page: number): void {
      this.query.page = page
      this.init()
    }

    handleSizeChange(limit: number): void {
      this.query.page = 1
      this.query.limit = limit
      this.init()
    }

    getTitleStatus(input: string):string {
      const lang = window.localStorage.getItem('bc-lang')
      if(lang === 'en') {
        return input === 'SUCCESS' ? 'Success' : input === 'PENDING' ? 'Pending' : input === 'FAILED' ? 'Failed' : 'Processing'
      }
      else if(lang === 'vi') {
        return input === 'SUCCESS' ? 'Thành công' : input === 'PENDING' ? 'Chưa xử lý' : input === 'FAILED' ? 'Thất bại' : 'Đang xử lý'
      }
      return ''
    }
    handleRowClick(row: Record<string, any>): void {
      // this.detailRow = row
      // this.setOpenPopup({
      //   popupName: 'popup-fee-detail',
      //   isOpen: true
      // })
      console.log('492...')
    }

    handleFilter(filter: Record<string, any>): void {
      console.log('508', filter)
      this.filters = filter
      this.query = {
        ...this.query,
        search: this.filters.search,
        currency: '',
        type: this.typeActive.value,
        fromDate: this.filters.fromDate,
        toDate: this.filters.toDate,
        fromTransactionAmount: this.filters.fromTransactionAmount,
        toTransactionAmount: this.filters.toTransactionAmount,
        fromFeeAmount: this.filters.fromFeeAmount,
        toFeeAmount: this.filters.toFeeAmount,
        status: this.filters.status,
        orderBy: this.filters.orderBy,
        page: 1,
        limit: 10
      }
      this.getSummaries()
      this.debounceInit()
    }
    handleCopy(e, data: string):void {
      this.$emit('copy', 'copy')
      e.stopPropagation()
      navigator.clipboard.writeText(data)
      let message:any=''
      message = this.$t('notify.copy')
      this.$message.success(message)
    }
    debounceInit = debounce(() => {
      this.init()
    }, 100)
    handleNormalize():void {
      this.isChanged = false
    }
    // getStatus(input: string):string {
    //   let rs = ''
    //   switch(input) {
    //     case 'Success':
    //       rs = 'status__success'
    //       break
    //     case 'Pending':
    //       rs = 'status__pending'
    //       break
    //   }
    //   return rs
    // }
    checkType(typeCheck: string): string {
      const result = typeCheck === 'PENDING' ? 'status-pending'
        : (typeCheck === 'FAILED' || typeCheck === 'LOCKED' || typeCheck === 'WAITING' || typeCheck === 'EXPIRED')
        ? 'status-error'
        : typeCheck === 'PROCESSING'
        ? 'status-pending'
        : typeCheck === 'REJECTED'
        ? 'status-rejected'
        : 'status-success'
        return result
    }
  }
</script>

<style scoped lang="scss">
  @mixin text($size, $height, $weight, $color){
    font-size: $size;
    line-height: $height;
    font-weight: $weight;
    color: $color;
  }
  ::v-deep.fee-nft {
    width: 100%;
    height: auto;
    background-color: transparent;
    &-header {
      background-color: var(--bc-color-white);
      margin-bottom: 24px;
      &__tabs {
        width: 100%;
        height: 56px;
        display: flex;
        align-items: center;
        .tab-item {
          display: inline-block;
          @include text(16px, 24px, 400, #5B616E);
          box-sizing: border-box;
          padding: 15px 12px;
          &.tab-active {
            @include text(16px, 24px, 600, #0151FC);
            border-bottom: 2px solid #0151FC;
          }
        }
      }
      &__summaries {
        width: 100%;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: center;
        // grid-template-columns: 320px;
        padding: 24px;
        border-top: 1px solid #DBDBDB;
        .summary {
          width: 320px;
          padding: 16px;
          border: 1px solid #DBDBDB;
          border-radius: 8px;
          height: auto;
          box-sizing: border-box;
          &-title {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 12px;
            &__text {
              @include text(16px, 24px, 400, #5B616E);
            }
          }
          &-number {
            margin-bottom: 4px;
            @include text(24px, 24px, 600, #0A0B0D);
          }
          &-approximate {
            @include text(14px, 20px, 400, #5B616E);
          }
        }
      }
    }
    &-body {
      background-color: var(--bc-color-white);
      padding: 0;
      &__types {
        display: flex;
        justify-content: left;
        align-items: center;
        .type-item {
          display: inline-block;
          padding: 16px 12px;
          box-sizing: border-box;
          @include text(16px, 24px, 400,#5B616E);
          &.tab-active {
            @include text(16px, 24px, 600, #0151FC);
            border-bottom: 2px solid #0151FC;
          }
        }
      }
      &__content {
        border-top: 1px solid #dbdbdb;
        .wrap-table {
          padding: 0 24px;
          .table-fee-nft {
            .trans-id {
              @include text(16px, 24px, 400, #0151FC);
              span:first-child {
                display: inline-block;
                width: 200px
              }
            }
            .trans-date {
              @include text(14px, 20px, 400, #5B616E);
            }
            .wrap-item-col {
              display: flex;
              justify-content: left;
              align-items: center;
              .item-img {
                border-radius: 4px;
                margin-right: 8px;
              }
              .item-text {
                &__name {
                  @include text(16px, 24px, 400, #0A0B0D);
                }
                &__code {
                  @include text(14px, 20px, 400, #5B616E);
                }
              }
            }
            .wrap-from-col {
              &__name {
                @include text(16px, 24px, 400, #0A0B0D);
              }
              &__email {
                @include text(14px, 20px, 400, #5B616E);
              }
            }
            .wrap-fee-col {
              &__coin {
                @include text(16px, 24px, 400, #0A0B0D);
              }
              &__usd {
                @include text(14px, 20px, 400, #5B616E);
              }
            }
            .status {
              display: inline-block;
              width: 80px;
              text-align: center;
              border-radius: 4px;
              box-sizing: border-box;
              &.status-success {
                background-color: var(--bc-bg-success);
                @include text(12px, 24px, 500, #129961)
              }
              &.status-pending {
                background-color: var(--bc-bg-warning);
                @include text(12px, 24px, 500, #DD7D00);
              }
              &.status-error {
                background-color: var(--bc-bg-error);
                @include text(12px, 24px, 500, #CF202F)
              }
            }
          }
        }
      }
    }
  }
</style>