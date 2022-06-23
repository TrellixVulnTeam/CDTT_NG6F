<template>
<div class="inventory box-shadow  ">
  <div class="wrap-summaries mb-24">
    <div class="summary">
      <div class="summary-header">
        <span class="summary-header__title">Owners</span>
        <base-icon icon="icon-two-users" size="24"/>
      </div>
      <div class="summary-content">100,582</div>
    </div>
    <div class="summary">
      <div class="summary-header">
        <span class="summary-header__title">NFTs</span>
        <base-icon icon="icon-img-inventory" size="24"/>
      </div>
      <div class="summary-content">120,008,000</div>
    </div>
    <div class="summary">
      <div class="summary-header">
        <span class="summary-header__title">On Sale</span>
        <base-icon icon="onsale-inventory" size="24"/>
      </div>
      <div class="summary-content">80,000</div>
    </div>
    <div class="summary">
      <div class="summary-header">
        <span class="summary-header__title">Off Markert</span>
        <base-icon icon="offmarket-inventory" size="24"/>
      </div>
      <div class="summary-content">1,200</div>
    </div>
  </div>
  <div class="wrap-filter mb-24">
    <inventory-filter></inventory-filter>
  </div>
  <div class="wrap-table">
    <base-table
    :data="dataTable"
    class="inventory-table"
    @rowClick="handleRowClick($event)"
    >
      <el-table-column label="#" type="index" 
      align="center" width="40" :index="indexMethod"/>
      <el-table-column :label="$t('inventory.table.owner')" align="left">
        <template slot-scope="scope">
          <p class="owner-name">{{scope.row.ownerName}}</p>
          <p class="owner-email">{{scope.row.ownerEmail}}</p>
        </template>
      </el-table-column>
      <el-table-column :label="$t('inventory.table.item')" align="left" width="280">
        <template slot-scope="scope">
          <div class="wrap-item">
            <img :src="scope.row.itemImage" alt="" class="item-img" width="40px" height="40px">
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
          <p class="network-code">{{scope.row.networkCode}}</p>
        </template>
      </el-table-column>
      <el-table-column :label="$t('inventory.table.quantity')" align="right" width="150">
        <template slot-scope="scope">
          <span class="quantity">{{scope.row.quantity}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('inventory.table.status')" align="center" width="185">
        <template slot-scope="scope">
          <span class="status" :class="getClassStatus(scope.row.status)">{{getTextStatus(scope.row.status)}}</span>
        </template>
      </el-table-column>
    </base-table>
  </div>
  <popup-inventory-detail />
</div>

</template>

<script lang="ts">
  import { Component, Mixins, Watch } from 'vue-property-decorator'
  //@ts-ignore
  import PopupMixin from '@/mixins/popup'
  import InventoryFilter from '@/modules/inventory/components/filter/InventoryFilter.vue'
  import PopupInventoryDetail from '../components/popup/PopupInventoryDetail.vue'
  import BaseTable from '@/components/base/table/BaseTable.vue'
  // import EventBus from '@/utils/eventBus'
  import { debounce } from 'lodash'

  import { namespace } from 'vuex-class'

  const beBase = namespace('beBase')

  @Component({components: { BaseTable, InventoryFilter, PopupInventoryDetail }})
  export default class Inventory extends Mixins(PopupMixin) {
    @beBase.State('coinMain') coinMain!: string
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
    query: any = {
      search: '',
      limit: 10,
      page: 1,
      orderBy: 1,
      total: 0
    }

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
    .wrap-summaries {
      width: 100%;
      height: auto;
      display: grid;
      grid-template-columns: 318px 318px 318px 318px;
      justify-content: space-between;
      .summary {
        border: 1px solid var(--bc-table-border);
        border-radius: 4px;
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
  .mb-24 {
    margin-bottom: 24px;
  }
</style>
