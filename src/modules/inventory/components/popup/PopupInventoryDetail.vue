<template>
  <base-popup name="popup-inventory-detail" class="popup-inventory-detail" width="1040px" :close="handleClose">
    <div class="title-popup" slot="title">
      <span>{{popup_data.header.title}}</span>
    </div>
    <div class="content" v-loading="isLoading">
      <div class="content-top mb-24">
        <div class="content-top__divided">
            <img :src="dataAccountSummaryDetail.itemThumb" 
            class="content-top__divided_img">
            <div class="content-top__divided_text">
                <p class="name">{{dataAccountSummaryDetail.itemName}}</p>
                <p class="code">#{{dataAccountSummaryDetail.itemCode}}</p>
            </div>
        </div>
        <div class="content-top__divided">
            <img :src="dataAccountSummaryDetail.itemAvatar" 
            class="content-top__divided_img ml-24 circle">
            <div class="content-top__divided_text">
                <p class="name">{{dataAccountSummaryDetail.fullName}}</p>
                <p v-if="dataAccountSummaryDetail.accountType==='INTERNAL'" class="code">{{dataAccountSummaryDetail.email}} | ({{dataAccountSummaryDetail.countryCode}}) {{dataAccountSummaryDetail.phone}}</p>
                <p v-if="dataAccountSummaryDetail.accountType==='EXTERNAL'" class="code">{{dataAccountSummaryDetail.accountAddress | formatTransactionCode}}</p>
            </div>
        </div>
      </div>
      <div class="content-mid box-shadow mb-24">
        <p class="content-mid__title">{{ $t('inventory.inventory-detail.inventory') }}</p>
        <table class="inventory-table">
            <tr class="inventory-table__label">
                <th>{{ $t('inventory.inventory-detail.type') }}</th>
                <th>{{ $t('inventory.inventory-detail.quantity') }}</th>
                <th>{{ $t('inventory.inventory-detail.action') }}</th>
            </tr>
            <tr class="inventory-table__content">
                <td>{{ $t('inventory.inventory-detail.total') }}</td>
                <td>{{dataSummaryInventoryDetail.totalNft | formatNumber}}</td>
                <td></td>
            </tr>
            <tr class="inventory-table__content">
                <td>{{ $t('inventory.inventory-detail.available') }}</td>
                <td>{{dataSummaryInventoryDetail.totalAvailable | formatNumber}}</td>
                <td></td>
            </tr>
            <tr class="inventory-table__content">
                <td>{{ $t('inventory.inventory-detail.lock') }}</td>
                <td>{{dataSummaryInventoryDetail.totalLock | formatNumber}}</td>
                <td></td>
            </tr>
            <tr class="inventory-table__content">
                <td>{{ $t('inventory.inventory-detail.on-sale') }}</td>
                <td>{{dataSummaryInventoryDetail.totalOnSale | formatNumber}}</td>
                <td></td>
            </tr>
            <tr class="inventory-table__content">
                <td>{{ $t('inventory.inventory-detail.off-market') }}</td>
                <td>{{dataSummaryInventoryDetail.totalOffMarket | formatNumber}}</td>
                <td></td>
            </tr>
            <tr class="inventory-table__content">
                <td>{{ $t('inventory.inventory-detail.burn') }}</td>
                <td>{{dataSummaryInventoryDetail.totalBurn | formatNumber}}</td>
                <td></td>
            </tr>
        </table>
      </div>
      <div class="content-bot box-shadow mb-24">
        <p class="content-bot__title">{{ $t('inventory.inventory-detail.account-statement') }}</p>
        <div class="opening-quantity">
            <span class="opening-quantity__title">{{ $t('inventory.inventory-detail.opening-quantity') }}</span>
            <span class="opening-quantity__number">{{dataAccountSummaryDetail.openingQuantity}}</span>
        </div>
        <base-table
          :data="dataAccountContentDetail"
          :showPagination="true"
          :paginationInfo="getPaginationInfo"
          :table="query"
          @sizeChange="handleSizeChange"
          @currentChange="handleCurrentChange"
          :isLoading="isLoading"
          :showSummary="true"
          :summaryMethod="summaryMethod"
          class="table-bot">
            <el-table-column :label="$t('inventory.inventory-detail.event-type')" align="left" width="200">
                <template slot-scope="scope">
                    <p class="event-type__title">{{scope.row.transactionTypeConvert.toLowerCase().charAt(0).toUpperCase() + scope.row.transactionTypeConvert.slice(1).toLowerCase()}}</p>
                    <p class="event-type__date">{{scope.row.transactionDate | formatMMDDYY}}</p>
                </template>
            </el-table-column>
            <el-table-column :label="$t('inventory.inventory-detail.increase')" align="right" width="186">
                <template slot-scope="scope">
                    <p class="increase" v-if="scope.row.increaseQuantity">+{{scope.row.increaseQuantity | formatNumber}}</p>
                </template>
            </el-table-column>
            <el-table-column :label="$t('inventory.inventory-detail.decrease')" align="right" width="186">
                <template slot-scope="scope">
                    <p class="decrease">{{scope.row.decreaseQuantity | formatNumber}}</p>
                </template>
            </el-table-column>
            <el-table-column :label="$t('inventory.inventory-detail.quantity')" align="right" width="186">
                <template slot-scope="scope">
                    <p class="quantity">{{scope.row.activityQuantity | formatNumber}}</p>
                </template>
            </el-table-column>
            <el-table-column :label="$t('inventory.inventory-detail.status')" align="center">
                <template slot-scope="scope">
                    <span class="status" :class="getClassStatus(scope.row.activityStatus)">{{scope.row.activityStatus.toLowerCase().charAt(0).toUpperCase() + scope.row.activityStatus.slice(1).toLowerCase()}}</span>
                </template>
            </el-table-column>
        </base-table>
        <div class="ending-quantity">
            <span class="ending-quantity__title">{{ $t('inventory.inventory-detail.ending-quantity') }}</span>
            <span class="ending-quantity__number">{{dataAccountSummaryDetail.endingQuantity | formatNumber}}</span>
        </div>
      </div>
    </div>
  </base-popup>
</template>

<script lang="ts">
import { Component, Mixins, Prop, Watch } from 'vue-property-decorator'
import PopupMixin from '@/mixins/popup'
import { times } from 'lodash'
// import { namespace } from 'vuex-class'
// const bcKyc = namespace('bcKyc')
import _ from 'lodash';
import BaseTable from '@/components/base/table/BaseTable.vue'
import forEach from 'lodash/forEach'
import getRepository from '@/services'
import {InventoryRepository} from '@/services/repositories/inventory'
const api: InventoryRepository = getRepository('inventory')

  @Component({components: {BaseTable}})
  export default class PopupInventoryDetail extends Mixins(PopupMixin) {
    @Prop({ required: true, type: Object, default: {} }) query!: Record<string, any>
    @Prop({ required: true, type: Object, default: {} }) dataAccountSummaryDetail!: Record<string, any>
    @Prop({ required: true, type: Array, default: [] }) dataAccountContentDetail!: Array<Record<string, any>>
    @Prop({ required: true, type: Object, default: {} }) dataSummaryInventoryDetail!: Record<string, any>
    // @bcKyc.State('listReason') listReason!: Array<Record<string, any>>
    // checkList = []
    // reason = ''
    isLoading = false
    dataAccountDetail = {}

    dataTableInventory = [
        {
            type: 'Total',
            quantity: 12,
            action: [
            ]
        },
        {
            type: 'Available',
            quantity: 12,
            action: [
            ]
        },
        {
            type: 'Lock',
            quantity: 12,
            action: [
            ]
        },
        {
            type: 'On sale',
            quantity: 12,
            action: [
            ]
        },
        {
            type: 'Off market',
            quantity:12,
            action: [
            ]
        },
        {
            type: 'Burn',
            quantity: 12,
            action: [
            ]
        }
    ]
    dataTableAccount = [
        {
            event: "Buy",
            increase: "+100",
            decrease: "",
            quantity: "110",
            status: "Success",
            date: "12/03/2021 14:10:02"
        },
        {
            event: "Transfer",
            increase: "",
            decrease: "-20",
            quantity: "",
            status: "Pending",
            date: "12/03/2021 14:10:02"
        },
        {
            event: "Transfer",
            increase: "",
            decrease: "-20",
            quantity: "110",
            status: "Pending",
            date: "12/03/2021 14:10:02"
        },
        {
            event: "Transfer",
            increase: "",
            decrease: "-20",
            quantity: "90",
            status: "Success",
            date: "12/03/2021 14:10:02"
        },
        {
            event: "Transfer",
            increase: "",
            decrease: "-10",
            quantity: "90",
            status: "Pending",
            date: "12/03/2021 14:10:02"
        },
        {
            event: "Buy",
            increase: "+70",
            decrease: "",
            quantity: "160",
            status: "Success",
            date: "12/03/2021 14:10:02"
        }
    ]
    // isStopDbClick = false
    //begin
//   @Prop({ required: true, type: Object, default: [] }) resetFilter!: Record<string, any>
  
    error = {
        quantity: ''
    }
    
    popup_data = {
        header: {
            title: this.$i18n.t('inventory.inventory-detail.title'),
        },
        content: {
            
        },
        footer: {
            btnReset: this.$i18n.t('popup-fee.reset'),
            btnContinues: this.$i18n.t('button.apply')
        }
    }

    get getPaginationInfo(): any {
      return this.$t('paging.events')
    }

    getClassStatus(input: string):string {
        let rs = ''
        switch(input) {
            case 'SUCCESS': 
                rs = 'status__success'
                break
            case 'PENDING': 
                rs = 'status__pending'
                break
            case 'PROCESSING':
                rs = 'status__processing'
        }
        return rs
    }


    handleCurrentChange(page: number): void {
      this.query.page = page
      this.$emit('page', page)
    }

    handleSizeChange(limit: number): void {
      this.query.limit = limit
      this.query.page = 1
      this.$emit('size', limit)
    }

    handleClose(): void {
      this.setOpenPopup({
        popupName: 'popup-inventory-detail',
        isOpen: false
      })
    }
    summaryMethod(params: { columns: any; data: Record<string, any>[] }){
        const { columns, data } = params
        console.log("param", params)
        let sums:any = []
        console.log('248...', columns)
        console.log('252...', data)
        let totalIncrease:any = 0
        let totalDecrease: any = 0
        // forEach(data, (item) => {
        //     totalIncrease = totalIncrease + (item.increaseQuantity !== '' ? +item.increaseQuantity : 0)
        //     totalDecrease = totalDecrease + (item.decreaseQuantity !== '' ? +item.decreaseQuantity : 0)
        // })
        if(this.dataAccountSummaryDetail.totalIncreaseQuantity > 0){
            totalIncrease = '+' + this.dataAccountSummaryDetail.totalIncreaseQuantity 
        }else{
            totalIncrease = this.dataAccountSummaryDetail.totalIncreaseQuantity
        }
        
        totalDecrease = '' + this.dataAccountSummaryDetail.totalDecreaseQuantity
        forEach(columns, (column, index: number) => {
            console.log('253', column.property)
            if (index < 1) {
            sums[index] = this.$i18n.t('inventory.inventory-detail.total-account')
            return
            }
            if (index === 1) {
                
                sums[index] = totalIncrease
                return
            }
            if (index === 2) {
            sums[index] = totalDecrease
            return
            }
            // const a = this.round[column.property] || 0

            // //@ts-ignore
            // sums[index] = `${includes(column.property, 'Percent') ? (a * 1000) / 10 + '%' : this.$options.filters.convertAmountDecimal(a, this.coinMain) + ' ' + this.coinMain}`
        })
        return sums
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
  ::v-deep.base-table .cell{
    font-weight: 600;
  }

 ::v-deep.popup-inventory-detail {
    .popup-content {
        background-color: #F6F8FC;
        .content {
            &-top {
                width: 100%;
                height: auto;
                display: flex;
                justify-content: center;
                align-items: center;
                &__divided {
                    width: 50%;
                    height: auto;
                    display: flex;
                    justify-content: left;
                    &:first-child {
                        border-right: 1px solid #DBDBDB;
                    }
                    &_img {
                        width: 48px;
                        height: 48px;
                        border-radius: 4px;
                        margin-right: 24px;
                        border: 1px solid #DBDBDB;
                        object-fit: cover;
                    }
                    &_text {
                        .name {
                            @include text(18px, 24px, 600, #0A0B0D);
                        }
                    }
                }
            }
            &-mid {
                width: 100%;
                height: auto;
                padding: 24px;
                box-sizing: border-box;
                background-color: #FFFFFF;
                &__title {
                    @include text(24px, 32px, 600, #0A0B0D);
                    margin-bottom: 16px;
                }
                .inventory-table{
                    &__label{
                        th{
                            padding: 12px 10px;
                            @include text(16px, 24px, 600, #0A0B0D);
                            border-bottom: 1px solid #ded0ce;
                        }
                        th:nth-child(1){
                            text-align: left;
                            width: 300px;
                        }
                        th:nth-child(2){
                            width: 350px;
                        }
                        th:nth-child(3){
                            text-align: right;
                            width: 292px;
                        }
                    }
                    &__content{
                        td{
                            height: 24px;
                            padding: 20px 10px;
                            @include text(16px, 24px, 400, #0A0B0D);
                            border-bottom: 1px solid #ded0ce;
                        }
                        td:nth-child(2){
                            text-align: center;
                        }
                        td:nth-child(3){
                            text-align: right;
                        }
                    }
                }
                .table-mid {
                    .el-table__row {
                        height: 64px;
                    }
                    .type-name, .quantity {
                        @include text(16px, 24px, 400, #0A0B0D);
                    }
                    .wrap-button {
                        display: flex;
                        justify-content: right;
                        align-items: center;
                        .btn-action {
                            display: inline-block;
                            width: auto;
                            padding: 8px 27.5px;
                            @include text(14px, 16px, 400, #3B3A39);
                            text-align: center;
                            border: 1px solid #DBDBDB;
                            border-radius: 6px;
                            &:not(:last-child) {
                                margin-right: 16px;
                            }
                        }
                    }
                }
            }
            &-bot {
                padding: 24px;
                background-color: var(--bc-color-white);
                &__title {
                    @include text(24px, 32px, 600, #0A0B0D);
                    margin-bottom: 16px;
                }
                .opening-quantity, 
                .ending-quantity {
                    width: 100%;
                    height: 48px;
                    background-color: var(--bc-color-grey20);
                    padding: 0 10px;
                    box-sizing: border-box;
                    &__title,
                    &__number {
                        @include text(16px, 48px, 600, #0A0B0D);
                    }
                }
                .table-bot {
                    .event-type__title {
                        @include text(16px, 24px, 400, #0A0B0D);
                    }
                    .event-type__date {
                        @include text(14px, 20px, 400, #5B616E);
                    }
                    .increase{
                        @include text(16px, 24px, 400, #129961);
                    }
                    .decrease {
                        @include text(16px, 24px, 400, #CF202F);
                    }
                    .quantity {
                        @include text(16px, 24px, 400, #0A0B0D);
                    }
                    .status {
                        display: inline-block;
                        width: 80px;
                        text-align: center;
                        padding: 4px;
                        border-radius: 4px;
                        &__success {
                            background-color: var(--bc-bg-success);
                            @include text(12px, 16px, 500, #129961);
                        }
                        &__pending {
                            background-color: var(--bc-bg-pending);
                            @include text(12px, 16px, 500, #DD7D00);
                        }
                        &__processing {
                            background-color: var(--bc-bg-pending);
                            @include text(12px, 16px, 500, #DD7D00);
                        }
                    }
                }
                .ending-quantity {
                    background-color: var(--bc-theme-primary);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    span {
                        display: block;
                        color: var(--bc-color-white);
                    }
                    &__number {
                        width: 186px;
                        margin-right: 172px;
                        text-align: right;
                        padding-right: 16px;
                    }
                }
                .opening-quantity {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    span {
                        display: block;
                    }
                    &__number {
                        width: 186px;
                        margin-right: 172px;
                        text-align: right;
                        padding-right: 16px;
                    }
                }
            }
        }
    }
    .ml-24 {
        margin-left: 24px;
    }
    .mb-24 {
        margin-bottom: 24px;
    }
    .circle {
        border-radius: 50% !important;
    }
    .code{
      color: #5B616E;
    }
 }
</style>
