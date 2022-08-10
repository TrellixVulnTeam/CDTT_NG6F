<template>
  <div class="template-desc">
    <div class="block">
      <div class="block-row">
        <p class="block-row__title">Title <span style="color: #cf202f">*</span></p>
        <el-input v-model="title" placeholder="Enter title" class="block-row__input"></el-input>
      </div>
      <div class="block-row">
        <p class="block-row__title">Description</p>
        <el-input type="textarea" :rows="2" :placeholder="textareaPlaceHolder" v-model="textarea" class="block-row__input" disabled maxlength="200" :show-word-limit="true">
        </el-input>
      </div>
    </div>
    <div class="block">
      <div class="block-header">
        <span class="block-header__title">Description</span>
      </div>
      <div class="block-content">
        <p class="block-content__detail">e. g. "After purchasing you'll be able to get the real T-Shirt"</p>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'

  @Component
  export default class TemplateDesc extends Vue {
    title = ''
    textarea = ''
    textareaPlaceHolder = `e. g. "After purchasing you'll be able to get the real T-Shirt"`
  }
</script>
<style lang="scss" scoped>
  @mixin text($size, $height, $weight, $color) {
    font-size: $size;
    font-weight: $weight;
    line-height: $height;
    color: $color;
  }
  ::v-deep.template-desc {
    display: grid;
    grid-template-columns: 2fr 1fr;
    column-gap: 24px;
    .block {
      border: 1px solid #dbdbdb;
      border-radius: 8px;
      padding: 24px;
      &-row {
        width: 100%;
        height: auto;
        &:not(:last-child) {
          margin-bottom: 24px;
        }
        &__title {
          @include text(16px, 24px, 600, #0a0b0d);
          margin-bottom: 8px;
        }
        &__input {
          .el-input__inner {
            height: 48px;
          }
          .el-textarea__inner {
            height: 132px;
          }
        }
      }
      &-header {
        width: 100%;
        height: auto;
        border-bottom: 1px solid #dbdbdb;
        &__title {
          display: inline-block;
          padding: 16px 12px 14px;
          @include text(16px, 24px, 600, #0151fc);
          border-bottom: 2px solid currentColor;
        }
      }
      &-content {
        padding: 24px 0;
        &__detail {
          @include text(16px, 24px, 400, #89909e);
          word-break: break-word;
        }
      }
    }
  }
</style>
