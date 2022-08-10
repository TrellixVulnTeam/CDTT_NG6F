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

  import { namespace } from 'vuex-class'
  const bcNft = namespace('bcNft')

  @Component({ components: { JoditEditor } })
  export default class TabHtml extends Vue {
    @Prop({ required: false, type: Number, default: 0 }) idTabActive!: number

    @bcNft.State('metaDatas') metaDatas!: Array<Record<string, any>>

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
      this.debounceInput(_new, this)
    }

    created(): void {
      const language = localStorage.getItem('bc-lang') || ''
      this.config.language = language
      const content = filter(this.metaDatas, elm => elm.metaTypeId === this.idTabActive)[0].metaValue
      this.content = content
    }

    debounceInput = debounce((text: string, _this: any) => {
      const language = localStorage.getItem('bc-lang') || ''

      let data = filter(_this.metaDatas, elm => elm.metaTypeId === _this.idTabActive)[0]
      let parseJson: Record<string, any> = JSON.parse(data.metaValue)

      parseJson = {
        ...parseJson,
        [language]: _this.content
      }

      data = {
        ...data,
        metaValue: JSON.stringify(parseJson)
      }

      const index = findIndex(_this.metaDatas, (elm: Record<string, any>) => elm.metaTypeId === _this.idTabActive)

      _this.metaDatas[index] = data

      _this.$emit('update')
    }, 500)
  }
</script>

<style scoped lang="scss">
  ::v-deep.tab-html {
    width: 667px;
    .jodit-container {
      padding: 0 10px;
      border-radius: 8px;
      height: 100% !important;
      .jodit-toolbar__box {
        background: transparent;
        height: 62px;
        display: flex;
        align-items: center;
      }
      .jodit-toolbar-button__icon {
        .jodit-icon {
          width: 18px;
          height: 18px;
        }
      }
      // .jodit-wysiwyg {
      //   min-height: 120px !important;
      // }
    }
    .jodit_sticky > .jodit-toolbar__box {
      position: initial;
    }
  }
</style>
