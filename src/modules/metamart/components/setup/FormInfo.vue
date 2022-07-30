<template>
  <div class="form-info">
    <el-form>
      <el-form-item :label="$t('label_collection')" class="is-required">
        <el-select v-model="form.collectionId" class="w-100" clearable :placeholder="$t('label_collection')">
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
        <el-input v-model="form.name" :placeholder="$t('label_nft-name')" />
      </el-form-item>

      <!-- thumbnail -->
      <el-form-item :label="$t('label_thumbnail')" class="is-required">
        <div class="text-disable text-xs">PNG, GIF, WEBG, JPG, JPEG.</div>

        <el-upload
          v-show="!form.thumbnail"
          class="upload-demo upload-thumbnail"
          drag
          action=""
          :show-file-list="true"
          :auto-upload="false"
          list-type="picture"
          accept=".jpg, .jpeg, .png, .gif,"
          :on-change="handleChangeThumbnail"
        >
          <div class="el-upload__text text-base">Drop file here or <span class="text-hyperlink">click to upload</span></div>
        </el-upload>
        <div v-if="form.thumbnail" class="list-thumbnail">
          <div class="wrap-img">
            <img :src="form.thumbnail" alt="" />
            <span class="cursor icon-x" @click="form.thumbnail = ''">
              <base-icon icon="icon-delete-circle" size="20" />
            </span>
          </div>
          <!-- <div class="add-thumbnail"><base-icon icon="icon-plus-square" size="40" /></div> -->
        </div>
      </el-form-item>

      <!-- list file -->
      <el-form-item :label="$t('label_upload-file')" class="is-required">
        <div class="text-disable text-xs">PNG, GIF, WEBG, JPG, JPEG.</div>

        <el-upload
          v-show="!fileList.length"
          class="upload-demo upload-thumbnail"
          drag
          action=""
          :show-file-list="true"
          :auto-upload="false"
          :file-list="fileList"
          list-type="picture"
          accept=".jpg, .jpeg, .png, .gif,"
          :on-change="handleChangeListFile"
        >
          <div class="el-upload__text text-base">Drop file here or <span class="text-hyperlink">click to upload</span></div>
        </el-upload>
        <div v-if="fileList.length" class="list-thumbnail">
          <div v-for="file in fileList" :key="file.uid" class="wrap-img">
            <img :src="file.url" alt="" />
            <span class="cursor icon-x" @click="removeFile(file.uid)">
              <base-icon icon="icon-delete-circle" size="20" />
            </span>
          </div>
          <el-upload
            class="avatar-uploader"
            action=""
            :auto-upload="false"
            :show-file-list="false"
            list-type="picture"
            accept=".jpg, .jpeg, .png, .gif,"
            :on-change="handleAddMoreFile"
          >
            <div class="add-thumbnail"><base-icon icon="icon-plus-square" size="40" /></div>
          </el-upload>
        </div>
      </el-form-item>

      <el-form-item :label="$t('label_short-desc')" class="is-required">
        <el-input type="textarea" :rows="3" :placeholder="$t('label_short-desc')" v-model="form.shortDescription"> </el-input>
      </el-form-item>

      <div class="mb-24 wrap-editor">
        <div class="text-base text-semibold label">{{ $t('label_long-desc') }}</div>
        <jodit-editor :config="config" :buttons="buttons" v-model="content" />
      </div>
    </el-form>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Watch } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'

  import filter from 'lodash/filter'
  import { JoditEditor } from 'jodit-vue'
  import 'jodit/build/jodit.min.css'

  import getRepository from '@/services'
  import { NftRepository } from '@/services/repositories/nft'
  const apiNft: NftRepository = getRepository('nft')

  const bcNft = namespace('bcNft')

  interface IForm {
    collectionId: number | null
    categoryId: number | null
    productCode: string
    name: string
    thumbnail: string[] | string
    files: string[] | string
    shortDescription: string
    description: string
  }
  @Component({ components: { JoditEditor } })
  export default class FormInfo extends Vue {
    @bcNft.Mutation('SET_INIT_NFT') setinitInfo!: (data: Record<string, any>) => void
    @bcNft.Mutation('SET_LIST_COLLECTION') setListCollection!: (list: Array<Record<string, any>>) => void

    content = '<p><br></p>'
    buttons = ['bold', 'italic', 'underline', 'ul', 'ol']

    config = {
      spellcheck: false,
      showCharsCounter: false,
      showWordsCounter: false,
      autofocus: true,
      showXPathInStatusbar: false,
      language: 'vi',
      minHeight: 120,
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

    form: IForm = {
      collectionId: null,
      categoryId: null,
      productCode: '',
      name: '',
      thumbnail: '',
      files: '',
      shortDescription: '',
      description: ''
    }
    listCollection: Array<Record<string, any>> = []
    listCategory: Array<Record<string, any>> = []

    fileList: Array<Record<string, any>> = []
    urlThumbnail = ''

    @Watch('form', { deep: true }) handleWatchForm(newForm: Record<string, any>): void {
      this.setinitInfo(newForm)
    }

    async created(): Promise<void> {
      const result = await apiNft.getListCollection({ page: 1, limit: 1000 })
      this.listCollection = result.content
      this.listCategory = await apiNft.getListCategory()
      this.setListCollection(result.content)
    }

    async handleChangeThumbnail(file: Record<string, any>): Promise<void> {
      console.log(file)
      this.form.thumbnail = file.url
    }

    handleChangeListFile(list: Record<string, any>, fileList: Array<Record<string, any>>): void {
      this.fileList = [...fileList]
    }

    handleAddMoreFile(file: Record<string, any>): void {
      this.fileList.push(file)
    }

    removeFile(uid: number): void {
      this.fileList = filter(this.fileList, file => file.uid !== uid)
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
        img {
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
        .jodit-toolbar__box {
          background: transparent;
        }
      }
    }
  }
</style>