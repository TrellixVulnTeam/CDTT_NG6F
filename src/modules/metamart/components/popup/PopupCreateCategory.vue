<template>
  <base-popup name="popup-create-category" class="popup-filter-collection" width="600px" :close="handleClose">
    <div class="title-popup" slot="title">
      <span>Add new category</span>
    </div>
    <div class="content" v-loading="isLoading">
      <div class="content-block">
        <p class="content-block__title">Category</p>
        <el-select v-model="filterCollection.category" placeholder="Category">
          <el-option v-for="(option, index) in category" :label="option" :value="option" :key="index"></el-option>
        </el-select>
      </div>
      <div class="content-block">
        <p class="content-block__title">Parent category</p>
        <el-select v-model="filterCollection.network" placeholder="--">
          <el-option v-for="(option, index) in network" :label="option" :value="option" :key="index"></el-option>
        </el-select>
      </div>
      <div class="content-block">
        <p class="content-block__title">Description</p>
        <el-input type="textarea" v-model="text" rows="4"/>
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
    text = ''
    creator = [
      { name: 'Artmond275', email: 'artmond275@gmail.com' },
      { name: 'Dhman', email: 'dhman@gmail.com' },
      { name: 'LynKey', email: 'lynkey@gmail.com' }
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
        }
        &__title {
          @include text(14px, 20px, 400, #0a0b0d);
          margin-bottom: 8px;
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
