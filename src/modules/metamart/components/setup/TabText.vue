<template>
  <div class="tab-description">
    <el-input type="textarea" :rows="10" :placeholder="$t('label_long-desc')" v-model="description" @input="handleInput"> </el-input>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import filter from 'lodash/filter'
  import debounce from 'lodash/debounce'
  import findIndex from 'lodash/findIndex'

  @Component
  export default class TabText extends Vue {
    @Prop({ required: false, type: Array, default: [] }) metaData!: Array<Record<string, any>>
    @Prop({ required: false, type: String, default: '' }) tabActive!: string

    description = ''

    created(): void {
      const elm = filter(this.metaData, elm => elm.type === this.tabActive)[0]
      this.description = elm.value
    }

    handleInput(text: string): void {
      this.debounceInput(text)
    }
    debounceInput = debounce((text: string) => {
      const index = findIndex(this.metaData, elm => elm.type === this.tabActive)
      const _metaData = [...this.metaData]
      _metaData[index].value = text
      this.$emit('update', _metaData)
    }, 500)
  }
</script>

<style scoped></style>
