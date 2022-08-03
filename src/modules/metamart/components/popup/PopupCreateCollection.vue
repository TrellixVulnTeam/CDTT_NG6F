<template>
  <base-popup name="popup-create-collection" class="popup-create-collection" width="1040px" :open="handleOpen" :close="handleClose">
    <div class="title-popup" slot="title">
      <span>{{ $t('metamart.collection.popup.title') }}</span>
    </div>
    <div class="content" v-loading="isLoading">
      <main class="content-left">
        <!-- Upload avatar & thumbnail -->
        <el-form :model="collection" :rules="rules" ref="collection">
          <el-form-item prop="avatarUrl">
            <section class="upload block">
              <h2 class="block-title" style="margin-bottom: 0px;">
                {{ $t('metamart.collection.popup.avatar') }}
                <span class="block-title__asterisk"> *</span>
              </h2>
              <span class="block__subtitle">PNG, JPG. {{$t('metamart.collection.upload.size')}}: 60x60 ({{$t('metamart.collection.upload.max')}} 5mb).</span>
              <el-input v-model="collection.avatarUrl" style="display:none"></el-input>
              <el-upload 
                action="javascript:;" 
                class="upload-avatar" 
                drag 
                :on-change="handleAvatarChange" 
                :auto-upload="false" 
                :show-file-list="false" 
                accept=".jpg, .jpeg, .png"
              >
                <div class="el-upload__text" v-if="!collection.avatarUrl">{{$t('metamart.collection.upload.drop')}} <em>{{$t('metamart.collection.upload.click')}}</em></div>
                <div class="upload-wrapper" v-if="collection.avatarUrl">
                  <img :src="collection.avatarUrl" :alt="avatarPreviewing" class="upload-wrapper__preview" />
                  <span class="cursor icon-x upload-wrapper__icon" @click.stop="collection.avatarUrl = ''">
                    <base-icon icon="icon-delete-circle" size="26" />
                  </span>
                </div>
              </el-upload>
            </section>
          </el-form-item>

          <el-form-item prop="thumbnailUrl">
            <section class="upload block">
              <h2 class="block-title" style="margin-bottom: 0px;">
                {{ $t('metamart.collection.popup.thumbnail') }}
                <span class="block-title__asterisk"> *</span>
              </h2>
              <span class="block__subtitle">PNG, JPG. {{$t('metamart.collection.upload.size')}}: 285x190 ({{$t('metamart.collection.upload.max')}} 5mb).</span>
              <el-input v-model="collection.thumbnailUrl" style="display:none"></el-input>
              <el-upload action="javascript:;" class="upload-thumbnail" drag :on-change="handleThumbnailChange" :auto-upload="false" :show-file-list="false" accept=".jpg, .jpeg, .png,">
                <div class="el-upload__text" v-if="!collection.thumbnailUrl">{{$t('metamart.collection.upload.drop')}} <em>{{$t('metamart.collection.upload.click')}}</em></div>
                <div class="upload-wrapper" v-if="collection.thumbnailUrl">
                  <img :src="collection.thumbnailUrl" :alt="thumbnailPreviewing" class="upload-wrapper__preview" />
                  <span class="cursor icon-x upload-wrapper__icon" @click.stop="collection.thumbnailUrl = ''" >
                    <base-icon icon="icon-delete-circle" size="26" />
                  </span>
                </div>
              </el-upload>
            </section>
          </el-form-item>

          <!-- Upload banner -->
          <el-form-item prop="bannerUrl">
            <section class="upload block">
              <h2 class="block-title" style="margin-bottom: 0px;">
                {{ $t('metamart.collection.popup.banner') }}
                <span class="block-title__asterisk"> *</span>
              </h2>
              <span class="block__subtitle">PNG, GIF, WEBG, MP4 or MP3. {{$t('metamart.collection.upload.size')}}: 1200X260 ({{$t('metamart.collection.upload.max')}} 5mb).</span>
              <el-input v-model="collection.bannerUrl[0]" style="display:none"></el-input>
              <el-upload action="javascript:;" class="upload-banner" drag :on-change="handleBannerChange" :auto-upload="false" :show-file-list="false" accept=".jpg, .jpeg, .png, .gif, .webg" >
                <div class="el-upload__text" v-if="!collection.bannerUrl[0]">{{$t('metamart.collection.upload.drop')}} <em>{{$t('metamart.collection.upload.click')}}</em></div>
                <div class="upload-wrapper" v-if="collection.bannerUrl[0]">
                  <img :src="imageClick.url" :alt="bannerPreviewing" class="upload-wrapper__preview" />
                  <span class="cursor icon-x upload-wrapper__icon" @click.stop="handleBannerRemove(imageClick)">
                    <base-icon icon="icon-delete-circle" size="26" />
                  </span>
                </div>
              </el-upload>
              <div v-if="collection.bannerUrl[0]" class="banner-list">
                <div v-for="(item, index) of collection.bannerUrl" :key="index" class="flex jc-space-center" style="width: 84px">
                  <div :class="{ active: (item.uid === activeBannerUid), 'banner-list__image': true }">
                    <div class="banner-list__image-spacing" >
                      <img :src="item.url" :alt="item.name" @click="handleImageClick(item)"/>
                    </div>
                  </div>
                </div>
                <el-upload action="javascript:;"  class="upload-banner-list" :auto-upload="false" accept=".jpg, .jpeg, .png, .bmp" :on-change="handleListBanner"
                :file-list="collection.bannerUrl" :show-file-list="false"
                >
                  <i class="el-icon-plus"></i>
                </el-upload>
              </div>
            </section>
          </el-form-item>
          
          <el-form-item prop="name">
            <section class="name block">
              <h2 class="block-title" style="margin-bottom: 0px;">
                {{ $t('metamart.collection.popup.name') }}
                <span class="block-title__asterisk"> *</span>
              </h2>
              <span class="block__subtitle">{{$t('metamart.collection.subtitle.name')}}</span>
              <el-input v-model="collection.name" placeholder="Enter collection name" ></el-input>
            </section>
          </el-form-item>

          <el-form-item prop="description">
            <section class="description block">
              <h2 class="block-title">{{ $t('metamart.collection.popup.description') }}
                <span class="block-title__light">
                  ({{ $t('metamart.collection.popup.optional') }})
                </span>
              </h2>
              <el-input v-model="collection.description" type="textarea" placeholder="e. g. &quot;After purchasing you'll be able to get the real T-Shirt&quot;" maxlength="200" show-word-limit rows="4"/>
            </section>
          </el-form-item>

          <el-form-item prop="network">
            <section class="network block">
              <h2 class="block-title">
                {{ $t('metamart.collection.popup.network') }}
                <span class="block-title__asterisk"> *</span>
              </h2>
              <el-select v-model="collection.network" placeholder="Ethereum (ERC-1155)">
                <el-option v-for="(option, index) in networks" :label="option.networkName" :value="option.networkName" :key="index"></el-option>
              </el-select>
            </section>
          </el-form-item>

          <el-form-item prop="contractAddress">
            <section class="contract-address block">
              <h2 class="block-title">
                {{ $t('metamart.collection.popup.contract-address') }}
                <span class="block-title__asterisk"> *</span>
              </h2>
              <!-- <el-input v-model="collection.contractAddress" placeholder="Select a contract address" ></el-input> -->
              <el-select 
                filterable
                remote
                v-model="collection.contractAddress" 
                placeholder="Select a contract address"
                
              >
                <el-option v-for="(option, index) in contracts" :label="option.contractAddress | formatTransactionCode(10)" :value="option.contractAddress" :key="index"></el-option>
              </el-select>
            </section>
          </el-form-item>

          <el-form-item prop="payment">
            <section class="payment block">
              <h2 class="block-title">
                {{ $t('metamart.collection.popup.default-payment-by') }}
                <span class="block-title__asterisk"> *</span>
              </h2>
              <el-select v-model="collection.payment" class="select-prefix-icon">
                <el-option v-for="(item, index) in optionByToken" :label="`${item.name} (${item.currency})`" :value="item.currency" :key="index">
                  <template>
                    <div class="be-flex wallet-item">
                      <base-icon :icon="getIcon(item.currency)" size="24" />
                      <span class="d-ib" style="margin-left: 10px">{{ item.name }}</span>
                      <span class="d-ib" style="margin-left: 4px">({{ item.currency.toUpperCase() }})</span>
                    </div>
                  </template>
                </el-option>
                <div class="select-icon" slot="prefix">
                  <base-icon :icon="getIcon(collection.payment)" size="24" />
                </div>
              </el-select>
            </section>
          </el-form-item>

          <el-form-item prop="creator">
            <section class="creator block">
              <h2 class="block-title">
                {{ $t('metamart.collection.popup.creator') }}
                <span class="block-title__asterisk"> *</span>
              </h2>
              <el-select v-model="collection.creator" placeholder="Choose creator" class="select-prefix-icon">
                <el-option v-for="(item) in creators" :label="`${item.name} (${item.email})`" :value="item.name" :key="item.name">
                  <template>
                    <div class="be-flex wallet-item">
                      <base-icon :icon="getIcon(item.currency)" size="24" />
                      <span style="margin-left: 10px">{{ item.name }}</span>
                      <span style="margin-left: 4px">({{ item.email }})</span>
                    </div>
                  </template>
                </el-option>
                <div class="select-icon" slot="prefix">
                  <base-icon :icon="getCreatorIcon(collection.creator)" size="24" />
                </div>
              </el-select>
            </section>
          </el-form-item>
          
          <el-form-item prop="category">
            <section class="category block">
              <h2 class="block-title">
                {{ $t('metamart.collection.popup.category') }}
                <span class="block-title__asterisk"> *</span>
              </h2>
              <el-select v-model="collection.category" placeholder="Choose category">
                <el-option v-for="(option, index) in categories" :label="option" :value="option" :key="index"></el-option>
              </el-select>
            </section>
          </el-form-item>

          <el-form-item prop="template">
            <section class="template block">
              <h2 class="block-title">
                {{ $t('metamart.collection.popup.template') }}
                <span class="block-title__asterisk"> *</span>
              </h2>
              <el-select v-model="collection.template" placeholder="Choose template">
                <el-option v-for="(option, index) in templates" :label="option" :value="option" :key="index"></el-option>
              </el-select>
            </section>
          </el-form-item>
        </el-form>
      </main>

      
      <aside class="content-right">
        <section class="preview block">
          <h2 class="block-title">{{ $t('metamart.collection.popup.preview') }}</h2>
          <div class="preview-wrapper">
            <p class="preview-wrapper__message" v-if="!collection.avatarUrl && !collection.thumbnailUrl">{{$t('metamart.collection.upload.preview')}}</p>
            <div class="preview-wrapper__thumbnail" v-if="collection.thumbnailUrl">
              <img :src="collection.thumbnailUrl" :alt="thumbnailPreviewing" />
            </div>
            <div class="preview-wrapper__avatar" v-if="collection.avatarUrl">
              <img :src="collection.avatarUrl" :alt="avatarPreviewing" />
              <base-icon class="icon-active" icon="icon-status1" size="26" />
              <base-icon class="icon-verified" icon="icon-verified" size="17" />
            </div>
            <div class="preview-wrapper__detail" v-if="collection.avatarUrl && collection.thumbnailUrl">
              <p class="brand">{{ collection.name }}</p>
              <p v-if="collection.creator" class="__name">
                by 
                <span class="__name-link">
                  {{collection.creator}}
                  <base-icon icon="icon-user-verified" size="12" />
                </span>
              </p>
              <p class="__description">{{ collection.description }}</p>
            </div>
          </div>
        </section>
      </aside>
    </div>
    <div class="footer" slot="footer">
      <div class="wrap-button">
        <div class="btn-right">
          <el-button class="btn-default btn-400 btn-h-40 btn-close" @click="handleReset">{{$t('metamart.button.reset')}}</el-button>
          <el-button class="btn-default-bg btn-400 btn-h40 is-none-border" style="width: 100px; font-size: 14px; font-weight: 600" @click="handleSave">{{$t('metamart.button.save')}}</el-button>
        </div>
      </div>
    </div>
  </base-popup>
</template>

<script lang="ts">
  import { Component, Mixins, Watch } from 'vue-property-decorator'
  import PopupMixin from '@/mixins/popup'
  import NftDetail from './NftDetail.vue'
  import { NftRepository } from '@/services/repositories/nft'
  import getRepository from '@/services'
import { forEach } from 'lodash'

  const apiNft: NftRepository = getRepository('nft')

  @Component({ components: { NftDetail } })
  export default class PopupCreateCollection extends Mixins(PopupMixin) {
    imageClick: any = {}
    avatarPreviewing = ''
    thumbnailPreviewing = ''
    collection: Record<string,any> = {
      avatarUrl: '',
      thumbnailUrl: '',
      bannerUrl: [],
      name:'',
      description: '',
      network: '',
      contractAddress: '',
      payment: 'LYNK',
      creator: '',
      category: '',
      template: '',
    }
    activeBannerUid = 0
    networks: Array<Record<string, any>> = []
    contracts: Array<Record<string, any>> = []

    rules: Record<string, any> = {
      avatarUrl: [
        {
          required: true,
          message: this.$t('metamart.collection.validate.avatar'),
          trigger: 'change'
        }
      ],
      thumbnailUrl: [
        {
          required: true,
          message: this.$t('metamart.collection.validate.thumbnail'),
          trigger: 'change'
        }
      ],
      bannerUrl: [
        {
          required: true,
          message: this.$t('metamart.collection.validate.banner'),
          trigger: 'change'
        }
      ],
      name: [
        {
          required: true,
          message: this.$t('metamart.collection.validate.name'),
          trigger: 'change'
        }
      ],
      network: [
        {
          required: true,
          message: this.$t('metamart.collection.validate.network'),
          trigger: 'change'
        }
      ],
      contractAddress: [
        {
          required: true,
          message: this.$t('metamart.collection.validate.contract-address'),
          trigger: 'change'
        }
      ],
      payment: [
        {
          required: true,
          message: this.$t('metamart.collection.validate.default-payment-by'),
          trigger: 'change'
        }
      ],
      creator: [
        {
          required: true,
          message: this.$t('metamart.collection.validate.creator'),
          trigger: 'change'
        }
      ],
      category: [
        {
          required: true,
          message: this.$t('metamart.collection.validate.category'),
          trigger: 'change'
        }
      ],
      template: [
        {
          required: true,
          message: this.$t('metamart.collection.validate.template'),
          trigger: 'change'
        }
      ],
    }

    // fake data
    optionByToken = [
      {name: 'Bitcoin', currency: 'BTC'},
      {name: 'Tether', currency: 'USDT'},
      {name: 'Ethereum', currency: 'ETH'},
      {name: 'LynKey', currency: 'LYNK'},
    ]
    creators = [
      { name: 'Artmond275', email: 'artmond275@gmail.com', currency: 'BTC'},
      { name: 'Dhman', email: 'dhman@gmail.com', currency: 'ETH'},
      { name: 'LynKey', email: 'lynkey@gmail.com', currency: 'LYNK'}
    ]
    categories = ['Real Estate', 'Family House', 'Penthouse']
    templates = ['NFT Real Estate', 'NFT Family House', 'NFT Penthouse']

    @Watch('collection.contractAddress') handleNetworkFill(value: string): void {
      this.contracts.forEach((item: Record<string, any>) => {
        if (item.contractAddress === value) {
          this.collection.network = item.network
        }
      })
    }
    @Watch('collection.network') handleNetworkChange(): void {
      this.getContractList()
    }
    handleAvatarChange(file: any): void {
      this.collection.avatarUrl = URL.createObjectURL(file.raw)
      this.avatarPreviewing = file.name
    }
    handleThumbnailChange(file: any): void {
      this.collection.thumbnailUrl = URL.createObjectURL(file.raw)
      this.thumbnailPreviewing = file.name
    }
    handleBannerChange(file: any): void {
      console.log(">>>file,", file)
      this.collection.bannerUrl.unshift({
        name: file.name,
        url: URL.createObjectURL(file.raw)
      })
      this.imageClick = this.collection.bannerUrl[0]
      console.log('fileUrl', URL.createObjectURL(file.raw));
      console.log('banner', this.collection.bannerUrl);
    }
    handleClearUpload(): void {
      this.collection.avatarUrl = ''
      this.collection.thumbnailUrl = ''
    }
    handleListBanner(file: any): void {
      this.collection.bannerUrl.unshift({
        name: file.name,
        url: URL.createObjectURL(file.raw)
      })
    }
    handleBannerRemove(banner: any): void {
      console.log('>>remove banner:', banner);
      console.log('>>banners:', this.collection.bannerUrl);
      this.collection.bannerUrl = this.collection.bannerUrl.filter((item: any) => item !== banner)
      this.imageClick = this.collection.bannerUrl[0]
    }
    handleImageClick(image: any): void {
      this.imageClick = image;
      console.log('>>>imageClick', this.imageClick);
      this.activeBannerUid = image.uid
    }
    getIcon(currency: string): string {
      return currency ? `icon-${currency.toLocaleLowerCase()}` : 'icon-lynk'
    }
    getCreatorIcon(creator: string): string {
      let result = ''
      this.creators.forEach(elm => {
        if (elm.name === creator) {
          result = elm.currency
        }
      })
      return this.getIcon(result)
    }
    handleOpen():void {
      this.getNetworkList()
      this.getContractList()
    }
    handleClose():void {
      //@ts-ignore
      this.$refs['collection'].resetFields();
    }
    handleReset():void {
      //@ts-ignore
      this.$refs['collection'].resetFields();
    }
    handleSave():void {
      //@ts-ignore
      this.$refs['collection']?.validate((valid: any) => {
        if (valid) {
          alert('Created')
        }
      })
      console.log('>>>Collection:', this.collection);
    }

    //call API
    async getNetworkList():Promise<void> {
      await apiNft.getListNetwork()
        .then((res: any) => {
          this.networks = res.content
        })
        .catch(e => {
          console.log(e)
        })
    }

    async getContractList():Promise<void> {
      let param = {
        type: 'NFT',
        network: this.collection.network ? this.collection.network.match(/\(([^)]+)\)/)[1] : '' //temporary solution
      }
      console.log(param);
      await apiNft.getListContractAddress(param)
        .then((res: any) => {
          this.contracts = res.content
        })
        .catch(e => {
          console.log(e)
        })
    }
  }
</script>

<style scoped lang="scss">
  ::v-deep.popup-create-collection {
    .popup-content {
      background-color: #f6f8fc;
      padding-bottom: 24px;
    }
    .content {
      padding: 24px;
      background-color: #ffffff;
      border-radius: 8px;
      display: flex;
      gap: 32px;
      .el-upload {
        width: 100%;
        .el-upload-dragger {
          width: 100%;
          height: auto;
          min-height: 148px;
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          .upload-wrapper {
            &__preview {
              width: 100%;
              height: 100%;
              border-radius: 8px;
              object-fit: cover;
            }
            &__icon {
              position: absolute;
              top: -20px;
              right: -12px;
              z-index: 101;
            }  
          }
        }
      }
      .el-form {
        .el-form-item {
          margin-bottom: 40px;
          &:last-child {
            margin-bottom: 0px;
          }
        }
      }
      &-left {
        flex: 1;
        .upload {
          height: auto;
        }
        .upload-avatar {
          .el-upload-dragger {
            height: 148px;
            .upload-wrapper {
              width: 60px;
              height: 60px;
              position: relative;
              z-index: 100;
            }
          }
        }
        .upload-thumbnail {
          .el-upload-dragger {
            .upload-wrapper {
              width: 285px;
              height: 190px;
              position: relative;
              margin: 24px 0px;
              z-index: 100;
            }
          }
        }
        .upload-banner {
          .el-upload-dragger {
            height: 148px;
            .upload-wrapper {
              width: 461px;
              height: 100px;
              position: relative;
              z-index: 100;
            }
          }
        }
        .banner-list {
          display: flex;
          gap: 8px;
          margin-top: 12px;
          &__image {
            width: 72px;
            height: 72px;
            padding: 2px;
            display: flex;
            align-items: center;
            justify-content: center;
            .banner-list__image-spacing {
              width: calc(100% - 2px); 
              height: calc(100% - 2px);
              display: flex;
              align-items: center;
              justify-content: center;
              background-color: white;
              border-radius: 8px;
              img {
                width: calc(100% - 4px);
                height: calc(100% - 4px);
                object-fit: cover;
                border-radius: 8px;
              }
            }
            
          }
          .active {
            background: 
              linear-gradient(transparent, transparent) padding-box,
              linear-gradient(to top right, #9D3EF2, #3036F4) border-box;
            border-radius: 10px;
            border: 0px solid transparent;
          }
          .upload-banner-list {
            width: 80px;
            height: 80px;
            line-height: 80px;
            border: 1px dashed #DBDBDB;
            border-radius: 8px;
          }
        }
      }
      &-right {
        width: 285px;
        height: 412px;
        // background-color: green;
        float: left;
        .preview {
          height: 452px;
          .preview-wrapper {
            border: 1px solid #dbdbdb;
            min-height: 412px;
            border-radius: 8px;
            position: relative;
            display: flex;
            flex-direction: column;
            gap: 34px;
            box-sizing: border-box;
            &__thumbnail {
              height: 190px;
              img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                border-radius: 8px 8px 0px 0px;
              }
            }
            &__avatar {
              width: 64px;
              height: 64px;
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -75%);
              img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                border-radius: 50%;
                border: 2px solid white;
                box-sizing: border-box;
                filter: drop-shadow(0px 0.6px 1.8px rgba(0, 0, 0, 0.1)) drop-shadow(0px 3.2px 7.2px rgba(0, 0, 0, 0.13));
              }
              .icon-active {
                position: absolute;
                font-size: 26px;
                left: 50%;
                transform: translateX(50%);
              }
              .icon-verified {
                position: absolute;
                font-size: 17px;
                left: 64%;
                top: 45%;
                transform: translate(50%, 50%);
              }
            }
            &__message {
              text-align: center;
              font-size: 14px;
              line-height: 24px;
              width: 180px;
              height: 48px;
              margin: 182px auto;
              color: #5b616e;
            }
            &__frame {
              width: 100%;
              height: 240px;
              position: absolute;
              top: 0;
              left: 0;
              z-index: 100;
              img {
                width: 100%;
                height: 100%;
                object-fit: cover;
              }
            }
            &__detail {
              width: 100%;
              height: 172px;
              padding: 16px;
              text-align: center;
              box-sizing: border-box;
              z-index: 100;
              .brand {
                font-family: 'Open Sans';
                font-style: normal;
                font-weight: 500;
                font-size: 20px;
                line-height: 24px;
                color: var(--bc-text-primary);
              }
              .__description {
                font-weight: 400;
                font-size: 16px;
                line-height: 24px;
                color: var(--bc-text-discript);
                margin-top: 16px;
                display: -webkit-box;
                -webkit-line-clamp: 3;
                -webkit-box-orient: vertical;
                overflow: hidden;
                text-overflow: ellipsis;
              }
              .placebid {
                font-size: 16px;
                line-height: 24px;
                border: none;
                background-color: transparent;
                color: #0151fc;
                position: relative;
                top: 16px;
              }
              .brand-icon__official {
                margin-top: 6px;
                margin-left: 3px;
              }
              .brand-icon__optional {
                // clear: left;
                float: right;
                margin-top: 6px;
                margin-right: 3px;
                &:hover {
                  cursor: pointer;
                }
              }
              .__name {
                font-weight: 400;
                font-size: 14px;
                line-height: 24px;
                color: var(--bc-text-discript);
                &-link {
                  color: var(--bc-text-hyperlink);
                }
              }
            }
          }
        }
      }
      .block {
        width: 100%;
        &-title {
          font-size: 16px;
          line-height: 24px;
          font-weight: 600;
          color: #0a0b0d;
          margin-bottom: 8px;
          &__light {
            font-weight: 400;
          }
          &__asterisk {
            color: var(--bc-required);
          }
        }
        &__subtitle {
          font-size: 14px;
          font-weight: 400;
          color: #5b616e;
        }
        &-suggestion {
          font-size: 12px;
          line-height: 16px;
          color: #5b616e;
          margin-top: 8px;
        }
        &-alert {
          font-size: 12px;
          line-height: 16px;
          margin-top: 8px;
          color: #cf202f;
        }
        &-switch {
          float: right;
          position: relative;
          bottom: 50px;
        }
        .el-select {
          width: 100%;
        }
        .select-prefix-icon {
          .el-input__inner {
            padding-left: 40px;
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
                font-size: 14px;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
              }
            }
          }
        } 
      }
    }
  }
</style>
