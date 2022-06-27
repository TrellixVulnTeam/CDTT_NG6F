<template>
<div class="inventory box-shadow  ">
  <h1 class="inventory-title">Summary</h1>
<!--  <el-carousel :autoplay="false"  arrow="always">-->
<!--    <el-carousel-item v-for="(itemTab,index) in dataConcat" :key="index">-->
<!--      <div class="wrap-summaries mb-24" >-->
<!--        <div class="summary" v-for="(item, i) in dataConcat[index].tabOne" :key="i">-->
<!--          <div class="summary-header">-->
<!--            <span class="summary-header__title">{{item.summaryName}}</span>-->
<!--            <base-icon icon="icon-two-users" size="24"/>-->
<!--          </div>-->
<!--          <div class="summary-content">{{item.total}}</div>-->
<!--        </div>-->
<!--        <div class="summary" v-for="(item, i) in dataConcat[index].tabTwo" :key="i">-->
<!--          <div class="summary-header">-->
<!--            <span class="summary-header__title">{{item.summaryName}}</span>-->
<!--            <base-icon icon="icon-two-users" size="24"/>-->
<!--          </div>-->
<!--          <div class="summary-content">{{item.total}}</div>-->
<!--        </div>-->
<!--      </div>-->
<!--    </el-carousel-item>-->
<!--  </el-carousel>-->

  <el-carousel :autoplay="false" arrow="always">
    <el-carousel-item>
      <div class="wrap-summaries mb-24" >
        <div class="summary">
          <div class="summary-header">
            <span class="summary-header__title">Owners</span>
            <base-icon icon="icon-two-users" size="24"/>
          </div>
          <div class="summary-content">{{summaryInventoryData.totalOwner | formatNumber}}</div>
        </div>
        <div class="summary">
          <div class="summary-header">
            <span class="summary-header__title">NFTs</span>
            <base-icon icon="icon-img-inventory" size="24"/>
          </div>
          <div class="summary-content">{{summaryInventoryData.totalNft | formatNumber}}</div>
        </div>
        <div class="summary">
          <div class="summary-header">
            <span class="summary-header__title">Available</span>
            <base-icon icon="icon-available" size="24"/>
          </div>
          <div class="summary-content">{{summaryInventoryData.totalAvailable | formatNumber}}</div>
        </div>
        <div class="summary">
          <div class="summary-header">
            <span class="summary-header__title">Lock</span>
            <base-icon icon="icon-lock-inventory" size="24"/>
          </div>
          <div class="summary-content">{{summaryInventoryData.totalLock | formatNumber}}</div>
        </div>
      </div>
    </el-carousel-item>
    <el-carousel-item >
      <div class="wrap-summaries mb-24" >
        <div class="summary">
          <div class="summary-header">
            <span class="summary-header__title">On Sale</span>
            <base-icon icon="onsale-inventory" size="24"/>
          </div>
          <div class="summary-content">{{summaryInventoryData.totalOnSale | formatNumber}}</div>
        </div>
        <div class="summary">
          <div class="summary-header">
            <span class="summary-header__title">Off Market</span>
            <base-icon icon="offmarket-inventory" size="24"/>
          </div>
          <div class="summary-content">{{summaryInventoryData.totalOffMarket | formatNumber}}</div>
        </div>
        <div class="summary">
          <div class="summary-header">
            <span class="summary-header__title">Burn</span>
            <base-icon icon="icon-burn" size="24"/>
          </div>
          <div class="summary-content">{{summaryInventoryData.totalBurn | formatNumber}}</div>
        </div>
      </div>
    </el-carousel-item>
  </el-carousel>
  <div class="wrap-filter mb-24">
    <inventory-filter></inventory-filter>
  </div>
  <div class="wrap-table">
    <base-table
      :data="listDataItem"
      class="inventory-table"
      @rowClick="handleRowClick($event)"
    >
      <el-table-column label="#" type="index" 
      align="center" width="40" :index="indexMethod"/>
      <el-table-column :label="$t('inventory.table.owner')" align="left">
        <template slot-scope="scope">
          <p class="owner-name">{{scope.row.ownerName}}</p>
          <p class="owner-email">{{scope.row.email}}</p>
        </template>
      </el-table-column>
      <el-table-column :label="$t('inventory.table.item')" align="left" width="280">
        <template slot-scope="scope">
          <div class="wrap-item">
            <img :src="scope.row.itemAvatar" alt="" class="item-img" width="40px" height="40px">
            <div class="item-text">
              <p class="item-text__name">{{scope.row.itemName}}</p>
              <p class="item-text__code">{{scope.row.itemCode}}</p>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('inventory.table.network')" align="left" width="270">
        <template slot-scope="scope">
          <p class="network-name">{{scope.row.networkName}}</p>
          <p class="network-code">{{scope.row.network}}</p>
        </template>
      </el-table-column>
      <el-table-column :label="$t('inventory.table.quantity')" align="right" width="150">
        <template slot-scope="scope">
          <span class="quantity">{{scope.row.quantity}}</span>
        </template>
      </el-table-column>
<!--      <el-table-column :label="$t('inventory.table.status')" align="center" width="185">-->
<!--        <template slot-scope="scope">-->
<!--          <span class="status" :class="getClassStatus(scope.row.status)">{{getTextStatus(scope.row.status)}}</span>-->
<!--        </template>-->
<!--      </el-table-column>-->
    </base-table>
  </div>
  <popup-inventory-detail />
</div>

</template>

<script lang="ts">
import {Component, Mixins} from 'vue-property-decorator'
import getRepository from '@/services'
import {InventoryRepository} from '@/services/repositories/inventory'
//@ts-ignore
import PopupMixin from '@/mixins/popup'
import InventoryFilter from '@/modules/inventory/components/filter/InventoryFilter.vue'
import PopupInventoryDetail from '../components/popup/PopupInventoryDetail.vue'
import BaseTable from '@/components/base/table/BaseTable.vue'
// import EventBus from '@/utils/eventBus'

import {namespace} from 'vuex-class'

const api: InventoryRepository = getRepository('inventory')
  const beBase = namespace('beBase')

  @Component({components: { BaseTable, InventoryFilter, PopupInventoryDetail }})
  export default class Inventory extends Mixins(PopupMixin) {
    @beBase.State('coinMain') coinMain!: string
    isLoading: any = false

    summaryInventoryData: Record<string, any> = {}
    listDataItem: Record<string, any>[] = []

    query: Record<string,any> = {
      search: '',
      network: '',
      fromQuantity: '',
      toQuantity: '',
      orderBy: '',
      page: 1,
      limit: 10,
    }

    created(): void {
      this.init();
      this.getDataTable();
    }


    async init(): Promise<void> {
      try{
        const response = await api.getSummaryData(this.query)
        this.summaryInventoryData = response
        console.log(this.summaryInventoryData)
      }catch(error){
        console.log(error)
      }
    }

    async getDataTable(): Promise<void> {
      try {
        const params = {
          ...this.query,
          orderBy: this.query.orderBy,
          page: this.query.page,
          limit: this.query.limit,
          total: null
        }
        const response = await api.getListInventoryDataTable(params)
        this.listDataItem = response.content
        this.query.total = response.content.totalElements
        console.log(this.listDataItem)
      }catch (e) {
        console.log(e)
      }
    }

    mounted(): void {
      for(let index = 0; index < this.dataConcat.length; index++){
        console.log('tabOne' ,this.dataConcat[index].tabOne)
        console.log('tabTwo' ,this.dataConcat[index].tabTwo)

        // for(let index = 0; i < this.dataConcat[index].tabOne.length; index++){
        //   console.log(this.dataConcat[index].tabOne.length)
        // }
      }
    }

    dataConcat: any = [
      {
        tabOne: [
          {
            summaryName: "Owners",
            total: 112345566
          },
          {
            summaryName: "NFTs",
            total: 112345566
          },
          {
            summaryName: "Available",
            total: 112345566
          },
          {
            summaryName: "Lock",
            total: 112345566
          }
        ]
      },
      {
        tabTwo: [
          {
            summaryName: "On Sale",
            total: 112345566
          },
          {
            summaryName: "Off Market",
            total: 112345566
          },
          {
            summaryName: "Burn",
            total: 112345566
          }
         ] 
      }
    ]

    dataTable: any = [
      {
        ownerName: "Trần Mạnh Đức",
        ownerEmail: "ducnguyen@gmail.com",
        itemImage: "https://www.pngitem.com/pimgs/m/75-756644_larva-red-and-yellow-smiling-at-each-other.png",
        itemName: "Dragonbon",
        itemCode: "#1135256",
        networkName: "Ethereum",
        networkCode: "ERC-1155",
        quantity: 1,
        status: "ONSALE"
      },
      {
        ownerName: "Trần Mạnh Đức",
        ownerEmail: "ducnguyen@gmail.com",
        itemImage: "https://www.pngitem.com/pimgs/m/75-756644_larva-red-and-yellow-smiling-at-each-other.png",
        itemName: "Dragonbon",
        itemCode: "#1135256",
        networkName: "Ethereum",
        networkCode: "ERC-1155",
        quantity: 1,
        status: "ONAUCTION"
      },
      {
        ownerName: "Trần Mạnh Đức",
        ownerEmail: "ducnguyen@gmail.com",
        itemImage: "https://www.pngitem.com/pimgs/m/75-756644_larva-red-and-yellow-smiling-at-each-other.png",
        itemName: "Dragonbon",
        itemCode: "#1135256",
        networkName: "Ethereum",
        networkCode: "ERC-1155",
        quantity: 1,
        status: "OFFMARKET"
      },
      {
        ownerName: "Trần Mạnh Đức",
        ownerEmail: "ducnguyen@gmail.com",
        itemImage: "https://www.pngitem.com/pimgs/m/75-756644_larva-red-and-yellow-smiling-at-each-other.png",
        itemName: "Dragonbon",
        itemCode: "#1135256",
        networkName: "Ethereum",
        networkCode: "ERC-1155",
        quantity: 1,
        status: "BURN"
      }
    ]
    // query: any = {
    //   search: '',
    //   limit: 10,
    //   page: 1,
    //   orderBy: 1,
    //   total: 0
    // }

    indexMethod(index: number): number {
      return (this.query.page - 1) * this.query.limit + index + 1
    }
    getClassStatus(input: string):string {
      let rs = ''
      switch(input) {
        case 'ONSALE':
          rs = 'status__success'
          break
        case 'OFFMARKET':
          rs = 'status__dark'
          break
        case 'BURN':
          rs = 'status__error'
          break
        case 'ONAUCTION':
          rs = 'status__info'
          break
      }
      return rs
    }
    getTextStatus(input: string):string {
      let rs = ''
      switch(input) {
        case 'ONSALE':
          rs = 'On sale'
          break  
        case 'OFFMARKET':
          rs = 'Off market'
          break  
        case 'BURN':
          rs = 'Burn'
          break  
        case 'ONAUCTION':
          rs = 'On action'
          break  
      }
      return rs
    }
    handleRowClick(event: any):void {
      this.setOpenPopup(
        {
          popupName: 'popup-inventory-detail',
          isOpen: true
        }
      )
    }
    
  }
</script>

<style scoped lang="scss">
  @mixin text($size, $height, $weight, $color) {
    font-size: $size;
    line-height: $height;
    font-weight: $weight;
    color: $color;
  }
  ::v-deep.inventory {
    width: 100%;
    background-color: var(--bc-color-white);
    border-radius: 4px;
    height: 100%;
    padding: 24px 24px 0 24px;
    &-title{
      margin-bottom: 16px;
      @include text(24px, 32px, 600, #0A0B0D);
    }
    .wrap-summaries {
      width: 100%;
      height: auto;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      gap: 0 24px;
      justify-content: space-between;
      .summary {
        border: 1px solid var(--bc-table-border);
        border-radius: 8px;
        padding: 16px;
        &-header {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 12px;
          &__title {
            @include text(16px, 24px, 400, #5B616E);
          }
          .span-icon {
            line-height: 24px;
          }
        }
        &-content {
          margin-bottom: 24px;
          @include text(24px, 24px, 600, #0A0B0D);
        }
      }
    }
    .wrap-filter {
      .kyc-filter {
        padding: 0;
      }
    }
    .wrap-table {
      .inventory-table {
        .owner-name {
          @include text(16px, 24px, 400, #0A0B0D);
        }
        .owner-email {
          @include text(14px, 20px, 400, #5B616E);
        }
        .wrap-item {
          display: flex;
          justify-content: left;
          align-items: center;
          .item-img {
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
        .network-name {
          @include text(16px, 24px, 400, #0A0B0D);
        }
        .network-code {
          @include text(14px, 20px, 400, #5B616E);
        }
        .quantiy {
          @include text(16px, 24px, 400, #0A0B0D);
        }
        .status {
          display: inline-block;
          width: 80px;
          height: 24px;
          border-radius: 4px;
          &__success {
            background-color: var(--bc-bg-accept);
            @include text(12px,24px ,500 , #129961);
          }
          &__dark {
            background-color: var(--bc-bg-neutral);
            @include text(12px, 24px, 500, #5B616E);
          }
          &__info {
            background-color: var(--bc-bg-warning);
            @include text(12px, 24px, 500, #DD7D00);
          }
          &__error {
            background-color: var(--bc-bg-reject);
            @include text(12px, 24px, 500, #CF202F);
          }
        }
      }
    }
  }

  ::v-deep.el-carousel--horizontal{
    overflow-x: clip;
    .el-carousel__container{
      height: 143px;
      .el-carousel__arrow{
        width: 32px;
        height: 32px;
        color: #292D32;
        border: 1px solid #ECECEC;
        background-color: #fff;
      }
      .el-carousel__arrow i{
          font-size: 16px;
          font-weight: 600;
        }
      .el-carousel__arrow--left{
        top: -32px;
        right: 60px;
        left: calc(100% - 24px - 32px - 24px);
      }
      .el-carousel__arrow--right{
        top: -32px;
        right: 0;
      }
      .el-carousel__item.is-animating {
        transition: transform .6s ease-in-out;
      }
    }
  }

  .mb-24 {
    margin-bottom: 24px;
  }
  
</style>
