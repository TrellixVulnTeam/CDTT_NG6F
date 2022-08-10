<template>
  <div class="form-info">
    <el-form>
      <el-form-item :label="$t('label_collection')" class="is-required hide-suffix">
        <el-select
          v-model="form.collectionId"
          filterable
          remote
          reserve-keyword
          :remote-method="handleFindCollection"
          class="w-100"
          :placeholder="$t('label_collection')"
          @change="handleSelectCollection"
        >
          <el-option v-for="item in listCollection" :key="item.id" :label="item.collectionName" :value="item.id" />
        </el-select>
      </el-form-item>

      <el-form-item :label="$t('label_category')" class="is-required">
        <el-select v-model="form.categoryId" class="w-100" popper-class="popper-explore-select-category" clearable :placeholder="$t('label_category')">
          <el-option
            v-for="item in listCategory"
            :key="item.id"
            :label="item.categoryName"
            :value="item.id"
            :class="!item.levelDepth ? 'item-parent' : item.levelDepth > 1 ? 'item-child-last' : 'item-child'"
          />
        </el-select>
      </el-form-item>

      <el-form-item :label="$t('label_product-code')" class="is-required">
        <el-input v-model="form.productCode" :placeholder="$t('label_product-code')" />
      </el-form-item>

      <el-form-item :label="$t('label_nft-name')" class="is-required">
        <el-input v-model="form.itemName" :placeholder="$t('label_nft-name')" />
      </el-form-item>

      <!-- thumbnail -->
      <el-form-item :label="$t('label_thumbnail')" class="is-required">
        <div class="text-disable text-xs">PNG, GIF, WEBG, MP4 or MP3 (Max 100mb).</div>

        <el-upload
          v-show="!form.thumb"
          class="upload-demo upload-thumbnail"
          drag
          action=""
          :show-file-list="true"
          :auto-upload="false"
          list-type="picture"
          accept=".jpg, .jpeg, .png, .gif,"
          :on-change="handleChangeThumbnail"
        >
          <div class="el-upload__text text-base">
            {{ $t('label_upload-desc') }} <span class="text-hyperlink">{{ $t('label_click-to-upload') }}</span>
          </div>
        </el-upload>
        <div v-if="form.thumb" class="list-thumbnail">
          <div class="wrap-img">
            <img :src="form.thumb" alt="" />
            <span class="cursor icon-x" @click="form.thumb = ''">
              <base-icon icon="icon-delete-circle" size="20" />
            </span>
          </div>
          <!-- <div class="add-thumbnail"><base-icon icon="icon-plus-square" size="40" /></div> -->
        </div>
      </el-form-item>

      <!-- list file -->
      <el-form-item :label="$t('label_upload-file')" class="is-required">
        <div class="text-disable text-xs">PNG, GIF, WEBG, MP4 or MP3 (Max 100mb).</div>

        <el-upload
          v-show="!form.medias.length"
          class="upload-demo upload-thumbnail"
          drag
          action=""
          :show-file-list="true"
          :auto-upload="false"
          :file-list="form.medias"
          list-type="picture"
          accept=".jpg, .jpeg, .png, .gif,.mp4"
          :on-change="handleChangeListFile"
        >
          <div class="el-upload__text text-base">
            {{ $t('label_upload-desc') }} <span class="text-hyperlink">{{ $t('label_click-to-upload') }}</span>
          </div>
        </el-upload>
        <div v-if="form.medias.length" class="list-thumbnail">
          <div v-for="file in form.medias" :key="file.id" class="wrap-img">
            <img v-if="file.mediaType === 'IMAGE'" :src="file.mediaUrl" alt="" />
            <video v-else :src="file.mediaUrl" />
            <span class="cursor icon-x" @click="removeFile(file.id)">
              <base-icon icon="icon-delete-circle" size="20" />
            </span>
          </div>
          <el-upload
            class="avatar-uploader"
            action=""
            :auto-upload="false"
            :show-file-list="false"
            list-type="picture"
            accept=".jpg, .jpeg, .png, .gif,.mp4"
            :on-change="handleAddMoreFile"
          >
            <div class="add-thumbnail"><base-icon icon="icon-plus-square" size="40" /></div>
          </el-upload>
        </div>
      </el-form-item>

      <el-form-item :label="$t('label_short-desc')" class="is-required">
        <el-input type="textarea" :rows="3" :placeholder="$t('label_short-desc')" v-model="form.shortDescription" maxlength="200" show-word-limit> </el-input>
      </el-form-item>

      <div class="mb-24 wrap-editor">
        <div class="text-base text-semibold label">{{ $t('label_long-desc') }}</div>
        <jodit-editor :config="config" :buttons="buttons" v-model="form.description" />
      </div>
    </el-form>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'

  import filter from 'lodash/filter'
  import debounce from 'lodash/debounce'
  import findIndex from 'lodash/findIndex'

  import { JoditEditor } from 'jodit-vue'
  import 'jodit/build/jodit.min.css'

  import getRepository from '@/services'
  import { ITabInfo } from '../../interface'
  import UploadRepository from '@/services/repositories/upload'
  import { includes } from 'lodash'
  const apiUpload: UploadRepository = getRepository('upload')

  const bcNft = namespace('bcNft')
  const bcAuth = namespace('beAuth')

  @Component({ components: { JoditEditor } })
  export default class FormInfo extends Vue {
    @Prop({ required: false, type: String, default: 'add' }) typePopup!: 'add' | 'edit'

    @bcNft.Mutation('SET_INIT_NFT') setInitInfo!: (data: Record<string, any>) => void
    @bcNft.State('listCollection') listCollection!: Array<Record<string, any>>
    @bcNft.State('listCategory') listCategory!: Array<Record<string, any>>
    @bcNft.State('initInfo') form!: ITabInfo

    @bcAuth.State('user') user!: Record<string, any>

    buttons = ['bold', 'italic', 'underline', 'ul', 'ol']

    config = {
      spellcheck: false,
      showCharsCounter: false,
      showWordsCounter: false,
      autofocus: false,
      showXPathInStatusbar: false,
      language: 'en',
      minHeight: 180,
      i18n: {
        vi: {
          'Type something': 'Nhập mô tả',
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
        },
        en: {
          'Type something': 'Type something...'
        }
      }
    }

    shortDescription = ''
    description = ''

    // @Watch('description') watchContent(_new: string): void {
    //   this.debounceInputHtml(_new, this)
    // }

    async created(): Promise<void> {
      // this.$root.$refs.FormInfo = this
      // const language = localStorage.getItem('bc-lang') || ''
      // if (this.typePopup === 'edit') {
      //   this.config.language = language
      //   const parseJsonShortDescription = JSON.parse(this.form.shortDescription)
      //   const parseJsonDescription = JSON.parse(this.form.description)
      //   this.shortDescription = parseJsonShortDescription[language]
      //   this.description = parseJsonDescription[language]
      // } else {
      //   this.shortDescription = this.form.shortDescription
      //   this.description = this.form.description
      // }
    }

    debounceInputHtml = debounce((text: string, _this: any) => {
      const language = localStorage.getItem('bc-lang') || ''

      if (_this.typePopup === 'edit') {
        let parseJson: Record<string, any> = JSON.parse(_this.form.description)

        parseJson = {
          ...parseJson,
          [language]: _this.description
        }
        _this.form.description = JSON.stringify(parseJson)
      } else {
        _this.form.description = text
      }
    }, 500)

    // handleInput(text: string): void {
    //   this.debounceInput(text, this)
    // }

    debounceInput = debounce((text: string, _this: any) => {
      const language = localStorage.getItem('bc-lang') || ''

      if (_this.typePopup === 'edit') {
        let parseJson: Record<string, any> = JSON.parse(_this.form.shortDescription)

        parseJson = {
          ...parseJson,
          [language]: _this.shortDescription
        }
        _this.form.shortDescription = JSON.stringify(parseJson)
      } else {
        _this.form.shortDescription = text
      }
    }, 500)

    getFileType(file: Record<string, any>): string {
      const IMAGE = ['png', 'jpg', 'jpeg', 'gif']
      const lastDot = file.name.lastIndexOf('.')
      const fileType = file.name.substring(lastDot + 1).toLowerCase()
      return includes(IMAGE, fileType) ? 'IMAGE' : 'VIDEO'
    }

    async handleChangeThumbnail(file: Record<string, any>): Promise<void> {
      this.form.thumb = file.url
      const formData = new FormData()
      formData.append('files', file.raw)
      formData.append('type', 'THUMB_NFT')
      formData.append('userId', this.user.userId)
      const result = await apiUpload.uploadImage(formData)
      console.log(result)
      this.form.thumb = result.success[0].url
    }

    async handleChangeListFile(rawFile: Record<string, any>): Promise<void> {
      let file = {
        mediaUrl: rawFile.url,
        id: rawFile.uid,
        mediaType: this.getFileType(rawFile)
      }
      console.log(file)

      this.form.medias = [...this.form.medias, file]

      const formData = new FormData()
      formData.append('files', rawFile.raw)
      formData.append('type', 'MEDIA_NFT')
      formData.append('userId', this.user.userId)
      const result = await apiUpload.uploadImage(formData)
      console.log(result)

      file = {
        ...file,
        mediaUrl: result.success[0].url
      }

      this.form.medias.pop()

      this.form.medias = [...this.form.medias, file]
    }

    handleAddMoreFile(file: Record<string, any>): void {
      this.handleChangeListFile(file)
    }

    removeFile(id: number): void {
      this.form.medias = filter(this.form.medias, file => file.id !== id)
    }

    handleSelectCollection(collectionId: number): void {
      this.form.categoryId = null
      const collection = filter(this.listCollection, elm => elm.id === collectionId)[0]
      this.$emit('selectCollection', collection)
    }

    handleFindCollection(text: string): void {
      this.$emit('findCollection', text)
    }
  }
</script>

<style scoped lang="scss">
  ::v-deep.form-info {
    flex: 1;
    margin-right: 24px;
    .upload-thumbnail {
      margin-top: 8px;
      .el-upload {
        &-dragger {
          height: 148px;
          .el-upload__text {
            font-size: 16px;
          }
        }
        &-list {
          display: none;
        }
      }
    }
    .list-thumbnail {
      margin-top: 16px;
      display: flex;
      flex-wrap: wrap;

      .wrap-img {
        margin-right: 12px;
        position: relative;
        &:hover {
          .icon-x {
            display: inline-flex;
          }
        }
        img,
        video {
          width: 72px;
          height: 72px;
          object-fit: cover;
          border-radius: 8px;
        }
        .icon-x {
          position: absolute;
          top: -10px;
          right: -10px;
          display: none;
          .span-icon {
            display: inline-flex;
          }
        }
      }

      .add-thumbnail {
        width: 72px;
        height: 72px;
        border-radius: 8px;
        border: 1px dashed #dbdbdb;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }

    .el-form {
      &-item {
        &__label {
          font-size: 16px;
          line-height: 24px;
          font-weight: 600;
        }
      }
      .hide-suffix {
        .el-input__suffix {
          display: none;
        }
      }
    }

    .wrap-editor {
      max-width: 643px;
      .label {
        margin-bottom: 8px;
        position: relative;
        &::after {
          content: '*';
          color: #f56c6c;
          margin-left: 4px;
          font-size: 10px;
          position: absolute;
        }
      }
      .jodit-container {
        padding: 0 10px;
        min-height: 180px !important;
        .jodit-toolbar__box {
          background: transparent;
        }
      }
    }
  }
</style>
