<!-- eslint-disable prettier/prettier -->
<template>
  <base-popup name="popup-filter-nft" class="popup-filter-collection" width="600px" :close="handleClose">
    <div class="title-popup" slot="title">
      <span>Filter</span>
    </div>
    <div class="content" v-loading="isLoading">
    <div class="content-block">
      <p class="content-block__title">Collection</p>
      <el-select v-model="filterCollection.collection" placeholder="Collection">
        <el-option v-for="(option, index) in collection" :label="option" :value="option" :key="index"></el-option>
      </el-select>
    </div>
     <div class="content-block">
        <p class="content-block__title">Creator</p>
        <el-select v-model="filterCollection.creator" placeholder="Creator" class="select-prefix-icon">
          <template slot="prefix">
            <div class="select-icon">
              <base-icon icon="logo-login" size="14" />
            </div>
          </template>
          <el-option v-for="(option, index) in creator" :label="option.name" :value="option.name" :key="index">
            <template>
              <div class="be-flex wallet-item">
                <span style="margin-left: 10px">{{ option.name }}</span>
                <span style="margin-left: 4px">({{ option.email }})</span>
              </div>
            </template>
          </el-option>
        </el-select>
      </div>
      <div class="content-block">
        <p class="content-block__title">Category</p>
        <el-select v-model="filterCollection.category" placeholder="Category">
          <el-option v-for="(option, index) in category" :label="option" :value="option" :key="index"></el-option>
        </el-select>
      </div>
      <div class="content-block">
        <p class="content-block__title">Network</p>
        <el-select v-model="filterCollection.network" placeholder="Network">
          <el-option v-for="(option, index) in network" :label="option" :value="option" :key="index"></el-option>
        </el-select>
      </div>
      <div class="content-block">
        <p class="content-block__title">Status</p>
        <el-select v-model="filterCollection.status" placeholder="Status">
          <el-option v-for="(option, index) in status" :label="option" :value="option" :key="index"></el-option>
        </el-select>
      </div>
      <div class="content-block">
        <p class="content-block__title">Created Date</p>
        <div class="content-block__inputs">
          <el-date-picker
            placeholder="From Date"
            format="MM/dd/yyyy"
            value-format="timestamp"
            v-model="filterCollection.date1"
            prefix-icon="el-icon-date"
            type="date"
            class="input-small"
            :picker-options="pickerOption2"
          ></el-date-picker>
          <span style="display: block; width: 8px; height: 2px; background-color: #dbdbdb"></span>
          <el-date-picker
            placeholder="To Date"
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
          <el-button class="btn-default btn-400 btn-h-40 btn-close" @click="handleReset">Reset</el-button>
          <el-button class="btn-default-bg btn-400 btn-h-40 is-none-border" style="font-size: 14px; font-weight: 600" @click="handleApply">Apply</el-button>
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
    creator = [
      { name: 'Artmond275', email: 'artmond275@gmail.com' },
      { name: 'Dhman', email: 'dhman@gmail.com' },
      { name: 'LynKey', email: 'lynkey@gmail.com' }
    ]
    category = ['Real Estate', 'Family House', 'Penthouse']
    network = ['Ethereum (ERC1155)', 'Binance (ERC1155)']
    status = ['On-chain', 'Off-chain']
    collection = ['Metro Retro', 'Metro Retro 2', 'Metro Retro 3']

    filterCollection = {
      creator: '',
      category: '',
      network: '',
      date1: '',
      date2: '',
      status: '',
      collection: ''
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
        &__title {
          @include text(14px, 20px, 400, #0a0b0d);
          margin-bottom: 8px;
        }
        .select-icon {
          margin-left: 8px;
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
        .select-prefix-icon {
          .el-input__inner {
            padding-left: 44px;
          }
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
