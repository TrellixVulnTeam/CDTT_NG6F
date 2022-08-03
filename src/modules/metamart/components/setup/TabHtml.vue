<template>
  <div class="tab-html">
    <jodit-editor :config="config" :buttons="buttons" v-model="content" />
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
  import { JoditEditor } from 'jodit-vue'
  import 'jodit/build/jodit.min.css'

  import filter from 'lodash/filter'
  import debounce from 'lodash/debounce'
  import findIndex from 'lodash/findIndex'

  @Component({ components: { JoditEditor } })
  export default class TabHtml extends Vue {
    @Prop({ required: false, type: Array, default: [] }) metaData!: Array<Record<string, any>>
    @Prop({ required: false, type: String, default: '' }) tabActive!: string

    content = '<p><br></p>'
    buttons = ['bold', 'italic', 'underline', 'ul', 'ol', 'link']

    config = {
      spellcheck: false,
      showCharsCounter: false,
      showWordsCounter: false,
      autofocus: true,
      showXPathInStatusbar: false,
      language: 'vi',
      minHeight: 300,
      i18n: {
        vi: {
          'Type something': 'Nhập mô tả...',
          'Search for': 'Nhập tìm kiếm',
          'Open in new tab': 'Mở tab mới',
          'No follow': 'Theo dõi liên kết',
          Insert: 'Thêm',
          Text: 'Tiêu đề',
          Upload: 'Tải lên',
          'Drop image': 'Kéo thả ảnh',
          'or click': 'hoặc chọn từ máy tính',
          'Alternative text': 'Văn bản thay thế'
          // URL: 'Liên kết'
        }
      }
    }

    @Watch('content') watchContent(_new: string): void {
      this.debounceInput(_new)
    }

    created(): void {
      const language = localStorage.getItem('bc-lang') || ''
      this.config.language = language
      const elm = filter(this.metaData, elm => elm.type === this.tabActive)[0]
      this.content = elm.value
    }

    debounceInput = debounce((text: string) => {
      const index = findIndex(this.metaData, elm => elm.type === this.tabActive)
      const _metaData = [...this.metaData]
      _metaData[index].value = text
      this.$emit('update', _metaData)
    }, 500)
  }
</script>

<style scoped lang="scss">
  ::v-deep.tab-html {
    .jodit-container {
      padding: 0 10px;
      border-radius: 8px;
      .jodit-toolbar__box {
        background: transparent;
      }
      // .jodit-wysiwyg {
      //   min-height: 120px !important;
      // }
    }
  }
</style>
