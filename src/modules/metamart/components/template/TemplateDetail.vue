<template>
  <div class="detail">
    <div class="detail-block">
      <div class="detail-block__row">
        <p class="detail-block__row--title">Title <span style="color: #cf202f">*</span></p>
        <el-input v-model="detail" placeholder="Enter title" class="detail-block__row--input"></el-input>
      </div>
      <div class="detail-block__row">
        <p class="detail-block__row--title">Description</p>
        <el-input v-model="detail" placeholder="Enter title" class="detail-block__row--input"></el-input>
      </div>
    </div>
    <div class="detail-block">AAA</div>
  </div>
</template>
<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import { JoditEditor } from 'jodit-vue'
  import 'jodit/build/jodit.min.css'
  @Component({ components: { JoditEditor } })
  export default class TemplateDetail extends Vue {
    detail = ''
  }
</script>
<style lang="scss" scoped>
  @mixin text($size, $height, $weight, $color) {
    font-size: $size;
    font-weight: $weight;
    line-height: $height;
    color: $color;
  }
  ::v-deep.detail {
    display: grid;
    grid-template-columns: 2fr 1fr;
    column-gap: 24px;
    &-block {
      border: 1px solid #dbdbdb;
      border-radius: 8px;
      padding: 24px;
      &__row {
        width: 1005;
        height: auto;
        margin-bottom: 24px;
        &--title {
          @include text(16px, 24px, 600, #0a0b0d);
          margin-bottom: 8px;
        }
      }
    }
  }
</style>
