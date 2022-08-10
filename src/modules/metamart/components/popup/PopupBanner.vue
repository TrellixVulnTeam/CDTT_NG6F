<template>
  <base-popup name="popup-banner" class="popup-banner" width="960px" :close="handleClose" :open="handleOpen">
    <div class="title-popup" slot="title">
      <span>{{ type === 'add' ? $t('metamart.banner.popup.add-banner') : $t('metamart.banner.popup.edit-banner') }}</span>
    </div>
    <div class="content">
      <div class="content-row">
        <p class="content-row__title">
          <span class="primary">{{ data.displayName.title }}</span>
          <span class="sub"> {{ data.displayName.subtitle }}</span>
          <span class="required" v-if="data.displayName.required" style="color: #cf202f"> *</span>
        </p>
        <el-input
          v-model="data.displayName.value"
          :placeholder="data.displayName.placeholder"
          class="content-row__input"
          :class="{ red: data.displayName.alert === false }"
        ></el-input>
        <p class="content-row__alert" v-if="data.displayName.alert === false">{{ alert }}</p>
      </div>
      <div class="content-row">
        <p class="content-row__title">
          <span class="primary">{{ data.descript.title }} &nbsp;</span>
          <span class="sub">{{ data.descript.subtitle }}</span>
          <span class="required" v-if="data.descript.required" style="color: #cf202f"> *</span>
        </p>
        <el-input v-model="data.descript.value" :placeholder="data.descript.placeholder" class="content-row__input" :class="{ red: data.descript.alert === false }"></el-input>
        <p class="content-row__alert" v-if="data.descript.alert === false">{{ alert }}</p>
      </div>
      <div class="content-row">
        <p class="content-row__title">
          <span class="primary">{{ data.upload.title }}</span>
          <span class="sub"> {{ data.upload.subtitle }}</span>
          <span class="required" v-if="data.upload.required" style="color: #cf202f"> *</span>
        </p>
        <p class="content-row__tip">{{ data.upload.placeholder }}</p>
        <el-upload
          class="content-row__upload"
          :class="{ red: data.upload.alert === false }"
          drag
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :file-list="fileList"
          :multiple="false"
          :auto-upload="false"
          accept=".png, .jpg, .gif"
          :on-change="handleUpload"
        >
          <div class="el-upload__text" v-if="data.upload.value === ''">
            {{ $t('metamart.banner.popup.placeholder.upload-inner') }} <em>{{ $t('metamart.banner.popup.placeholder.upload-inner-em') }}</em>
          </div>
          <div class="preview" v-else>
            <img :src="data.upload.value" style="width: 100%; object-fit: cover" />
            <base-icon icon="icon-delete-circle" class="preview-del" size="40" @click.native.stop="handleDeleteImage" />
          </div>
        </el-upload>
        <p class="content-row__alert" v-if="data.upload.alert === false">{{ alert }}</p>
      </div>
      <div class="content-row">
        <p class="content-row__title">
          <span class="primary">{{ data.url.title }}</span>
          <span class="sub"> {{ data.url.subtitle }}</span>
          <span class="required" v-if="data.url.required" style="color: #cf202f"> *</span>
        </p>
        <el-input v-model="data.url.value" :placeholder="data.url.placeholder" class="content-row__input" :class="{ red: data.url.alert === false }"></el-input>
        <p class="content-row__alert" v-if="data.url.alert === false">{{ alert }}</p>
      </div>
      <div class="content-row">
        <p class="content-row__title">
          <span class="primary">{{ data.position.title }}</span>
          <span class="sub"> {{ data.position.subtitle }}</span>
          <span class="required" v-if="data.position.required" style="color: #cf202f"> *</span>
        </p>
        <el-input
          v-model="data.position.value"
          :placeholder="data.position.placeholder"
          class="content-row__input"
          @keypress.native="onlyNumber($event)"
          @keyup.native="numberFormat($event)"
        ></el-input>
      </div>
    </div>
    <div class="footer" slot="footer">
      <div class="wrap-button">
        <div class="btn-right">
          <el-button :class="'passive'" class="btn-default btn-400 btn-h-40 btn-close" @click="handleCancel"> {{ $t('metamart.template.popup.add-new.passive-btn') }} </el-button>
          <el-button :class="'active'" class="btn-default-bg btn-400 btn-h-40 is-none-border" style="font-size: 14px; font-weight: 600" @click="handleCreate">
            {{ $t('metamart.template.popup.add-new.active-btn') }}
          </el-button>
        </div>
      </div>
    </div>
  </base-popup>
</template>

<script lang="ts">
  import { Component, Mixins, Prop } from 'vue-property-decorator'
  import PopupMixin from '@/mixins/popup'
  import UploadRepository from '@/services/repositories/upload'
  import getRepository from '@/services'
  import { namespace } from 'vuex-class'
  import { NftRepository } from '@/services/repositories/nft'
  import EventBus from '@/utils/eventBus'

  const apiUpload: UploadRepository = getRepository('upload')
  const apiNft: NftRepository = getRepository('nft')
  const bcAuth = namespace('bcAuth')
  @Component
  export default class PopupBanner extends Mixins(PopupMixin) {
    @Prop({ required: true, type: String }) type!: string
    @Prop({
      required: false,
      type: Object,
      default: () => {
        return {}
      }
    })
    banner!: Record<string, any>
    bannerCaptured: Record<string, any> = {}
    @bcAuth.State('user') user!: Record<string, any>
    userId = this.$store.state.beAuth.user.userId
    fileList = []
    alert = 'This field must not be empty'
    disabled = false
    uploadType = ''
    data = {
      displayName: {
        title: this.$i18n.t('metamart.banner.popup.display-name'),
        subtitle: '',
        value: '',
        placeholder: this.$i18n.t('metamart.banner.popup.placeholder.name'),
        required: true,
        alert: true
      },
      descript: {
        title: this.$i18n.t('metamart.banner.popup.descript.primary'),
        subtitle: this.$i18n.t('metamart.banner.popup.descript.sub'),
        placeholder: this.$i18n.t('metamart.banner.popup.placeholder.description'),
        value: '',
        required: true,
        alert: true
      },
      upload: {
        title: this.$i18n.t('metamart.banner.popup.upload'),
        subtitle: '',
        placeholder: this.$i18n.t('metamart.banner.popup.placeholder.upload'),
        value: '',
        required: true,
        alert: true
      },
      url: {
        title: 'URL',
        subtitle: '',
        placeholder: this.$i18n.t('metamart.banner.popup.placeholder.link'),
        value: '',
        required: true,
        alert: true
      },
      position: {
        title: this.$i18n.t('metamart.banner.popup.position'),
        subtitle: '',
        placeholder: this.$i18n.t('metamart.banner.popup.placeholder.position'),
        value: '',
        required: false,
        alert: true
      }
    }
    onlyNumber(event: KeyboardEvent): void {
      let keyCode = event.keyCode ? event.keyCode : event.which
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
        event.preventDefault()
      }
    }
    handleCancel(): void {
      this.handleReset()
      this.setOpenPopup({
        popupName: 'popup-banner',
        isOpen: false
      })
    }
    handleClose(): void {
      this.handleReset()
      this.setOpenPopup({
        popupName: 'popup-template',
        isOpen: false
      })
      this.$emit('close')
    }
    handleOpen(): void {
      if (this.type === 'edit') {
        this.handleInitBanner()
      }
    }
    async handleUpload(file: Record<string, any>): Promise<void> {
      console.log(file, '139')
      if (file.raw.type.indexOf('image') !== -1) {
        this.uploadType = 'IMAGE'
      } else if (file.raw.type.indexOf('video') !== -1) {
        this.uploadType = 'VIDEO'
      }
      const formData = new FormData()
      formData.append('files', file.raw)
      formData.append('type', 'BANNER_UNIQUE')
      formData.append('userId', this.userId)
      try {
        const rs = await apiUpload.uploadImage(formData)
        this.data.upload.value = rs.success[0].url
        console.log(rs)
      } catch (error) {
        console.log(error)
      }
    }
    handleDeleteImage(): void {
      this.data.upload.value = ''
    }
    // getObject(): void {}
    handleValidate(): void {
      console.log('165')

      const keys = Object.keys(this.data)
      for (let key of keys) {
        if (this.data[key].required) {
          this.data[key].alert = this.data[key].value !== ''
        }
      }
      const values = Object.values(this.data)
      this.disabled = values.some((value: Record<string, any>): boolean => {
        return value.alert === false
      })
    }
    async handleCreate(): Promise<void> {
      this.handleValidate()
      if (!this.disabled) {
        console.log('create')
        const params: Record<string, any> = {
          displayName: this.data.displayName.value,
          objectId: 0,
          objectType: '',
          url: this.data.url.value,
          description: this.data.descript.value,
          avatar: this.data.upload.value,
          mediaType: this.uploadType,
          position: this.data.position.value !== '' ? +this.data.position.value : 0
        }
        const pattern = /\/[0-9]+/g
        const collectionPattern = 'https://test-blockchain-website.beedu.vn/metamart/collection/id'
        const nftPattern = 'https://test-blockchain-website.beedu.vn/metamart/nft/id'
        let path = this.data.url.value
        path = path.replaceAll(pattern, '/id')
        path = path.replaceAll(/\/$/g, '')
        if (path === collectionPattern) {
          const mock = this.data.url.value
          params.objectId = +mock.replaceAll('https://test-blockchain-website.beedu.vn/metamart/collection/', '').replaceAll(/\/$/g, '')
          params.objectType = 'COLLECTION'
        } else if (path === nftPattern) {
          console.log('209')
          const mock = this.data.url.value
          params.objectId = +mock.replaceAll('https://test-blockchain-website.beedu.vn/metamart/nft/', '').replaceAll(/\/$/g, '')
          params.objectType = 'NFT'
        } else {
          params.objectId = null
          params.objectType = null
        }
        try {
          if (this.type === 'add') {
            await apiNft.createBanner(params)
          } else if (this.type === 'edit') {
            await apiNft.updateBanner(this.banner.id, params)
          }
          EventBus.$emit('banner-completed')
          this.handleCancel()
        } catch (error) {
          console.log(error)
        }
      }
    }
    handleReset(): void {
      console.log('reset')

      this.data = {
        displayName: {
          title: 'Display name',
          subtitle: '',
          value: '',
          placeholder: 'Enter display name',
          required: true,
          alert: true
        },
        descript: {
          title: 'Description',
          subtitle: ' (Optional)',
          placeholder: `e. g. "After purchasing you'll be able to get the real T-Shirt"`,
          value: '',
          required: true,
          alert: true
        },
        upload: {
          title: 'Upload file',
          subtitle: '',
          placeholder: 'PNG, JPG, GIF. Upload size: 464x308 (Max 5mb).',
          value: '',
          required: true,
          alert: true
        },
        url: {
          title: 'URL',
          subtitle: '',
          placeholder: 'Enter link',
          value: '',
          required: true,
          alert: true
        },
        position: {
          title: 'Position',
          subtitle: '',
          placeholder: `e. g. “1”`,
          value: '',
          required: false,
          alert: true
        }
      }
      this.disabled = false
      this.uploadType = ''
    }
    handleInitBanner(): void {
      console.log(this.banner, '294')
      let descript: any = this.banner.objectShortDescription
      descript = JSON.parse(descript)
      const lang = '' + window.localStorage.getItem('bc-lang')
      this.data.descript.value = descript[lang]
      this.data.displayName.value = this.banner.objectName
      this.data.upload.value = this.banner.objectAvatar
      this.data.url.value = this.banner.objectUrl
      this.data.position.value = this.banner.objectPosition
      this.bannerCaptured = {
        displayName: this.data.displayName.value,
        description: this.data.descript.value,
        upload: this.data.upload.value,
        position: this.data.position.value,
        url: this.data.url.value
      }
    }
  }
</script>

<style scoped lang="scss">
  @mixin text($size, $height, $weight, $color) {
    font-size: $size;
    font-weight: $weight;
    line-height: $height;
    color: $color;
  }
  ::v-deep.popup-banner {
    .popup-content {
      padding-bottom: 24px;
      .content {
        &-row {
          width: 100%;
          height: auto;
          &:not(:last-child) {
            margin-bottom: 32px;
          }
          &__title {
            margin-bottom: 8px;
            .primary {
              @include text(16px, 24px, 600, #0a0b0d);
            }
            .sub {
              display: inline-block;
              // margin-left:
              @include text(16px, 24px, 400, #6f7580);
            }
          }
          &__input {
            .el-input__inner {
              height: 48px;
            }
            &.red {
              .el-input__inner {
                border-color: #cf202f;
              }
            }
          }
          &__upload {
            .el-upload {
              width: 100%;
              &-dragger {
                width: 100%;
                height: 380px;
                display: flex;
                justify-content: center;
                align-items: center;
                position: relative;
                .preview {
                  width: 464px;
                  height: 308px;
                  border: 1px solid #dbdbdb;
                  position: absolute;
                  border-radius: 8px;
                  display: flex;
                  justify-content: center;
                  align-content: center;
                  &-del {
                    position: absolute;
                    top: -28px;
                    right: -20px;
                  }
                }
              }
            }
            &.red {
              .el-upload-dragger {
                border-color: #cf202f;
              }
            }
          }
          &__tip {
            @include text(12px, 16px, 400, #89909e);
            margin-bottom: 8px;
          }
          &__alert {
            margin-top: 4px;
            @include text(12px, 16px, 400, #cf202f);
          }
        }
      }
    }
  }
</style>
