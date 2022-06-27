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
                <p class="name">{{dataAccountSummaryDetail.accountName}}</p>
                <p class="code">#{{dataAccountSummaryDetail.itemCode}}</p>
            </div>
        </div>
        <div class="content-top__divided">
            <img :src="dataAccountSummaryDetail.itemAvatar" 
            class="content-top__divided_img ml-24 circle">
            <div class="content-top__divided_text">
                <p class="name">{{dataAccountSummaryDetail.fullName}}</p>
                <p v-if="dataAccountSummaryDetail.accountType==='INTERNAL'" class="code">{{dataAccountSummaryDetail.email}} | {{dataAccountSummaryDetail.countryCode}} {{dataAccountSummaryDetail.phone}}</p>
                <p v-if="dataAccountSummaryDetail.accountType==='EXTERNAL'" class="address">{{dataAccountSummaryDetail.accountAddress}}</p>
            </div>
        </div>
      </div>
      <div class="content-mid box-shadow mb-24">
        <p class="content-mid__title">Inventory</p>
        <base-table
            :data="dataConvertSummaryInventory"
            :showPagination="false"
            class="table-mid">
            <el-table-column label="TYPE" align="left" width="300">
                <template slot-scope="scope">
                    <span class="type-name">{{scope.row.type}}</span>
                </template>
            </el-table-column>
            <el-table-column label="QUANTITY" align="center" width="347">
                <template slot-scope="scope">
                    <span class="quantity">{{scope.row.total}}</span>
                </template>
            </el-table-column>
            <el-table-column label="ACTION" align="right">
                <template slot-scope="scope">
                    <div class="wrap-button">
                        <span class="btn-action cursor" v-for="(action, index) in scope.row.action"
                        :key="index">{{action}}</span>
                    </div>
                </template>
            </el-table-column>
        </base-table>
      </div>
      <div class="content-bot box-shadow mb-24">
        <p class="content-bot__title">Account Statement</p>
        <div class="opening-quantity">
            <span class="opening-quantity__title">Opening Quantity</span>
            <span class="opening-quantity__number">{{dataAccountSummaryDetail.openingQuantity}}</span>
        </div>
        <base-table
        :data="dataAccountContentDetail"
        :showPagination="true"
        :table="query"
        :isLoading="isLoading"
        :showSummary="true"
        :summaryMethod="summaryMethod"
        class="table-bot">
            <el-table-column label="EVENT TYPE" align="left" width="186">
                <template slot-scope="scope">
                    <p class="event-type__title">{{scope.row.transactionType}}</p>
                    <p class="event-type__date">{{scope.row.transactionDate}}</p>
                </template>
            </el-table-column>
            <el-table-column label="INCREASE" align="right" width="186">
                <template slot-scope="scope">
                    <p class="increase">{{scope.row.increaseQuantity}}</p>
                </template>
            </el-table-column>
            <el-table-column label="DECREASE" align="right" width="186">
                <template slot-scope="scope">
                    <p class="decrease">{{scope.row.decreaseQuantity}}</p>
                </template>
            </el-table-column>
            <el-table-column label="QUANTITY" align="right" width="186">
                <template slot-scope="scope">
                    <p class="quantity">{{scope.row.activityQuantity}}</p>
                </template>
            </el-table-column>
            <el-table-column label="STATUS" align="center">
                <template slot-scope="scope">
                    <span class="status" :class="getClassStatus(scope.row.activityStatus)">{{scope.row.activityStatus}}</span>
                </template>
            </el-table-column>
        </base-table>
        <div class="ending-quantity">
            <span class="ending-quantity__title">ENDING QUANTITY</span>
            <span class="ending-quantity__number">{{dataAccountSummaryDetail.endingQuantity}}</span>
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
    @Prop({ required: true, type: Object, default: {} }) dataAccountSummaryDetail!: Record<string, any>
    @Prop({ required: true, type: Array, default: [] }) dataAccountContentDetail!: Array<Record<string, any>>
    @Prop({ required: true, type: Array, default: () => {
        return []
      } }) dataConvertSummaryInventory!: Array<Record<string, any>>
    // @Prop({ required: true, type: Object, default: {} }) dataSummaryInventoryDetail!: Record<string, any>
    // @bcKyc.State('listReason') listReason!: Array<Record<string, any>>
    // checkList = []
    // reason = ''
    isLoading = false
    dataAccountDetail = {}
    // dataConvertSummaryInvetory:any = []

    // created():void {
    //     this.dataConvertSummaryInvetory = _.map(this.dataSummaryInventoryDetail, (val, id) => {
    //         return {...val, type: id, total: val}
    //     })
    //     console.log(this.dataConvertSummaryInvetory)
    // }
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

    query: Record<string,any> = {
        page: 1,
        limit: 5
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
        }
        return rs
    }

    // mounted(): void {
    //     console.log("detail")
    //     console.log(this.rowData)
    //     this.init()
    // }

    // async init(): Promise<void>{
    //     try{
    //         this.isLoading = true
    //         const params = {
    //             ...this.query,
    //             accountId: this.rowData.ownerId,
    //             itemId: this.rowData.itemId
    //         }
    //         const response = await api.getDetailItem(params)
    //         this.dataAccountDetail = response.summary
    //         console.log(response.summary)
    //         this.isLoading = false
    //     }catch(e){
    //         this.isLoading = false
    //         console.log(e)
    //     }
    // }

    handleClose(): void {
      this.setOpenPopup({
        popupName: 'popup-inventory-detail',
        isOpen: false
      })
    }
    summaryMethod(params: { columns: any; data: Record<string, any>[] }){
        const { columns, data } = params
        let sums:any = []
        console.log('248...', columns)
        console.log('252...', data)
        let totalIncrease:any = 0
        let totalDecrease: any = 0
        forEach(data, (item) => {
            totalIncrease = totalIncrease + (item.increaseQuantity !== '' ? +item.increaseQuantity : 0)
            totalDecrease = totalDecrease + (item.decreaseQuantity !== '' ? +item.decreaseQuantity : 0)
        })
        totalIncrease = '+' + totalIncrease
        totalDecrease = '' + totalDecrease
        forEach(columns, (column, index: number) => {
            console.log('253', column.property)
            if (index < 1) {
            sums[index] = 'TOTAL'
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
                    padding: 0 16px;
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
 }
</style>
