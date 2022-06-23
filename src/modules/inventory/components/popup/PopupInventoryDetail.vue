<template>
  <base-popup name="popup-inventory-detail" class="popup-inventory-detail" width="1040px" :close="handleClose">
    <div class="title-popup" slot="title">
      <span>{{popup_data.header.title}}</span>
    </div>
    <div class="content" v-loading="isLoading">
      <div class="content-top mb-24">
        <div class="content-top__divided">
            <img src="https://www.pngitem.com/pimgs/m/75-756644_larva-red-and-yellow-smiling-at-each-other.png" 
            class="content-top__divided_img">
            <div class="content-top__divided_text">
                <p class="name">Dragonbon</p>
                <p class="code">#1135256</p>
            </div>
        </div>
        <div class="content-top__divided">
            <img src="https://www.pngitem.com/pimgs/m/75-756644_larva-red-and-yellow-smiling-at-each-other.png" 
            class="content-top__divided_img ml-24 circle">
            <div class="content-top__divided_text">
                <p class="name">Trần Nguyễn Hoàng Tùng</p>
                <p class="code">tung...@gmail.com | (+84) ...796</p>
            </div>
        </div>
      </div>
      <div class="content-mid box-shadow mb-24">
        <p class="content-mid__title">Inventory</p>
        <base-table
        :data="dataTableInventory"
        :showPagination="false"
        class="table-mid">
            <el-table-column label="TYPE" align="left" width="300">
                <template slot-scope="scope">
                    <span class="type-name">{{scope.row.type}}</span>
                </template>
            </el-table-column>
            <el-table-column label="QUANTITY" align="center" width="347">
                <template slot-scope="scope">
                    <span class="quantity">{{scope.row.quantity}}</span>
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
            <span class="opening-quantity__number">10</span>
        </div>
        <base-table
        :data="dataTableAccount"
        :showPagination="false"
        class="table-bot">
            <el-table-column label="EVENT TYPE" align="left" width="186">
                <template slot-scope="scope">
                    <p class="event-type__title">{{scope.row.event}}</p>
                    <p class="event-type__date">{{scope.row.date}}</p>
                </template>
            </el-table-column>
            <el-table-column label="INCREASE" align="right" width="186">
                <template slot-scope="scope">
                    <p class="increase">{{scope.row.increase}}</p>
                </template>
            </el-table-column>
            <el-table-column label="DECREASE" align="right" width="186">
                <template slot-scope="scope">
                    <p class="decrease">{{scope.row.decrease}}</p>
                </template>
            </el-table-column>
            <el-table-column label="QUANTITY" align="right" width="186">
                <template slot-scope="scope">
                    <p class="quantity">{{scope.row.quantity}}</p>
                </template>
            </el-table-column>
            <el-table-column label="STATUS" align="center">
                <template slot-scope="scope">
                    <span class="status" :class="getClassStatus(scope.row.status)">{{scope.row.status}}</span>
                </template>
            </el-table-column>
        </base-table>
        <div class="ending-quantity">
            <span class="ending-quantity__title">ENDING QUANTITY</span>
            <span class="ending-quantity__number">160</span>
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
  import BaseTable from '@/components/base/table/BaseTable.vue'
  @Component({components: {BaseTable}})
  export default class PopupInventoryDetail extends Mixins(PopupMixin) {
    // @bcKyc.State('listReason') listReason!: Array<Record<string, any>>
    // checkList = []
    // reason = ''
    isLoading = false
    dataTableInventory = [
        {
            type: 'Total',
            quantity: '160',
            action: [
                'Burn'
            ]
        },
        {
            type: 'Available',
            quantity: '100',
            action: [
                'Burn'
            ]
        },
        {
            type: 'Lock',
            quantity: '60',
            action: [
                'Unlock',
                'Burn'
            ]
        },
        {
            type: 'On sale',
            quantity: '20',
            action: [
                'Remove Sale',
                'Burn'
            ]
        },
        {
            type: 'Off market',
            quantity: '30',
            action: [
                'Lock',
                'Burn'
            ]
        },
        {
            type: 'Burn',
            quantity: '160',
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
    getClassStatus(input: string):string {
        let rs = ''
        switch(input) {
            case 'Success': 
                rs = 'status__success'
                break
            case 'Pending': 
                rs = 'status__pending'
                break
        }
        return rs
    }
    handleClose(): void {
      this.setOpenPopup({
        popupName: 'popup-inventory-detail',
        isOpen: false
      })
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
                    span {
                        color: var(--bc-color-white);
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
