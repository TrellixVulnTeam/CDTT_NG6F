<template>
  <base-popup name="popup-filter-collection" class="popup-filter-collection" width="600px" :close="handleClose">
    <div class="title-popup" slot="title">
      <span>{{$t('metamart.collection.filter.filter')}}</span>
    </div>
    <div class="content" v-loading="isLoading">
      <div class="content-block">
        <p class="content-block__title">{{$t('metamart.collection.filter.creator')}}</p>
        <el-select v-model="filterCollection.creator" :placeholder="$t('metamart.collection.filter.creator')" class="select-prefix-icon">
          <el-option v-for="(item, index) in creators" :label="`${item.name} (${item.email})`" :value="item.name" :key="index">
            <template>
              <div class="be-flex wallet-item">
                <base-icon :icon="getIcon(item.currency)" size="24" />
                <span style="margin-left: 10px">{{ item.name }}</span>
                <span style="margin-left: 4px">({{ item.email }})</span>
              </div>
            </template>
          </el-option>
          <div class="select-icon" slot="prefix">
            <base-icon :icon="getCreatorIcon(filterCollection.creator)" size="16" />
          </div>
        </el-select>
      </div>
      <div class="content-block">
        <p class="content-block__title">{{$t('metamart.collection.filter.category')}}</p>
        <el-select v-model="filterCollection.category" :placeholder="$t('metamart.collection.filter.category')">
          <el-option v-for="(option, index) in category" :label="option" :value="option" :key="index"></el-option>
        </el-select>
      </div>
      <div class="content-block">
        <p class="content-block__title">{{$t('metamart.collection.filter.network')}}</p>
        <el-select v-model="filterCollection.network" :placeholder="$t('metamart.collection.filter.network')">
          <el-option v-for="(option, index) in network" :label="option" :value="option" :key="index"></el-option>
        </el-select>
      </div>
      <div class="content-block">
        <p class="content-block__title">{{$t('metamart.collection.filter.created-date')}}</p>
          <div class="content-block__inputs">
              <el-date-picker :placeholder="$t('metamart.collection.filter.from-date')" 
                format="MM/dd/yyyy"
                value-format="timestamp"
                v-model="filterCollection.date1" 
                prefix-icon="el-icon-date"
                type="date"
                class="input-small"
                :picker-options="pickerOption2"
              ></el-date-picker>
              <span style="display:block; width: 8px; height: 2px; background-color: #dbdbdb"></span>
              <el-date-picker :placeholder=" $t('metamart.collection.filter.to-date')" 
                format="MM/dd/yyyy"
                value-format="timestamp"
                v-model="filterCollection.date2" 
                prefix-icon="el-icon-date"
                type="date"
                class="input-small"
                :picker-options="pickerOption"
              ></el-date-picker>
          </div>
      </div>
    </div>

    <div class="footer" slot="footer">
      <div class="wrap-button">
        <div class="btn-right">
          <el-button class="btn-default btn-400 btn-h-40 btn-close" @click="handleReset">{{$t('metamart.button.reset')}}</el-button>
          <el-button class="btn-default-bg btn-400 btn-h-40 is-none-border" style="font-size: 14px; font-weight: 600" @click="handleApply">{{$t('metamart.button.apply')}}</el-button>
        </div>
      </div>
    </div>
  </base-popup>
</template>

<script lang="ts">
  import { Component, Mixins, Prop, Watch } from 'vue-property-decorator'
  import PopupMixin from '@/mixins/popup'

  @Component
  export default class PopupFilterCollection extends Mixins(PopupMixin) {
    // fake data
    creators = [
      { name: 'Artmond275', email: 'artmond275@gmail.com', currency: 'BTC'},
      { name: 'Dhman', email: 'dhman@gmail.com', currency: 'ETH'},
      { name: 'LynKey', email: 'lynkey@gmail.com', currency: 'LYNK'}
    ]
    category = ['Real Estate', 'Family House', 'Penthouse']
    network = ['Ethereum (ERC1155)', 'Binance (ERC1155)']

    filterCollection = {
      creator: '',
      category: '',
      network: '',
      date1: '',
      date2: '',
    }
    getIcon(currency: string): string {
      return currency ? `icon-${currency.toLocaleLowerCase()}` : 'icon-lynk'
    }
    getCreatorIcon(creator: string): string {
      let result = ''
      this.creators.forEach(elm => {
        if (elm.name === creator) {
          result = elm.currency
        }
      })
      return this.getIcon(result)
    }
    handleClose(): void {
      this.filterCollection = {
        creator: '',
        category: '',
        network: '',
        date1: '',
        date2: '',
      }
    }
    handleReset(): void {
      this.filterCollection = {
        creator: '',
        category: '',
        network: '',
        date1: '',
        date2: '',
      }
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
  ::v-deep.popup-filter-collection {
    .content {
      .wrapper {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .content-block {
          .el-input__inner {
            width: 256px;
          }
          &:last-child {
            .content-block__label {
              padding-left: 20px;
            }
            .content-block__wrap {
              text-align: right;
            }
          }
        }
      }
      &-block {
        width: 100%;
        height: auto;
        margin-bottom: 24px;
        .el-select {
          width: 100%;
        }
        .input-error {
          .el-input__inner {
            border-color: #cf202f;
          }
        }
        .select-prefix-icon {
          .el-input__inner {
            padding-left: 40px;
          }
          .el-input__prefix {
            left: 12px;
            .select-icon {
              width: 24px;
              height: 24px;
              position: absolute;
              top: 50%;
              transform: translateY(-50%);
              border-radius: 50%;
              background-color: var(--bc-bg-neutral);
              .span-icon {
                vertical-align: middle;
              }
            }
          }
        }
        &__title {
          @include text(14px, 20px, 400, #0a0b0d);
          margin-bottom: 8px;
        }
        &__alert {
          margin-top: 4px;
          @include text(14px, 20px, 400, #cf202f);
        }
        &__inputs {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .el-input {
            width: 256px;
            .el-input__inner {
              width: 100%;
            }
          }
          .delimiter {
            width: 8px;
            height: 2px;
            background-color: #dbdbdb;
          }
        }
      }
    }
  }
</style>
