<template>
  <base-popup name="popup-create-collection" class="popup-create-collection" width="1040px" :close="handleClose">
    <div class="title-popup" slot="title">
      <span> Add new collection </span>
    </div>
    <div class="content" v-loading="isLoading">
      <main class="content-left">
        <section class="upload block">
          <h2 class="block-title">Avatar</h2>
          <el-upload class="upload-avatar" drag :on-change="handleAvatarChange" :auto-upload="false" :show-file-list="false" accept=".jpg, .jpeg, .png">
            <div class="el-upload__text" v-if="!avatarUrl">Drop file here or <em>click to upload</em></div>
            <div class="upload-wrapper" v-if="avatarUrl">
              <img :src="avatarUrl" :alt="avatarPreviewing" class="upload-wrapper__preview" />
              <img src="../../../../icons/png/x-circle.png" alt="close preview" class="upload-wrapper__icon" @click.stop="avatarUrl = ''" />
            </div>
            <div class="el-upload__tip" slot="tip" v-if="isCreated && this.avatarUrl === ''">PNG, GIF, WEBG, MP4 or MP3. Max size 100mb.</div>
          </el-upload>
        </section>
        <section class="upload block">
          <h2 class="block-title">Thumbnail</h2>
          <el-upload class="upload-thumbnail" drag :on-change="handleThumbnailChange" :auto-upload="false" :show-file-list="false" accept=".jpg, .jpeg, .png,">
            <div class="el-upload__text" v-if="!thumbnailUrl">Drop file here or <em>click to upload</em></div>
            <div class="upload-wrapper" v-if="thumbnailUrl">
              <img :src="thumbnailUrl" :alt="thumbnailPreviewing" class="upload-wrapper__preview" />
              <img src="../../../../icons/png/x-circle.png" alt="close preview" class="upload-wrapper__icon" @click.stop="thumbnailUrl = ''" />
            </div>
            <div class="el-upload__tip" slot="tip" v-if="isCreated && this.thumbnailUrl === ''">PNG, GIF, WEBG, MP4 or MP3. Max size 100mb.</div>
          </el-upload>
        </section>
        <section class="upload block">
          <h2 class="block-title">Upload banner</h2>
          <el-upload class="upload-banner" drag :on-change="handleBannerChange" :auto-upload="false" :show-file-list="false" accept=".jpg, .jpeg, .png, .gif, .webg" >
            <div class="el-upload__text" v-if="!bannerUrl[0]">Drop file here or <em>click to upload</em></div>
            <div class="upload-wrapper" v-if="bannerUrl[0]">
              <img :src="imageClick.url" :alt="bannerPreviewing" class="upload-wrapper__preview" />
              <img src="../../../../icons/png/x-circle.png" alt="close preview" class="upload-wrapper__icon" @click.stop="handleBannerRemove(imageClick)" />
            </div>
            <div class="el-upload__tip" slot="tip" v-if="isCreated && this.bannerUrl === ''">PNG, GIF, WEBG, MP4 or MP3. Max size 100mb.</div>
          </el-upload>
          <el-upload v-if="bannerUrl[0]" class="upload-banner-list" list-type="picture-card" :auto-upload="false" accept=".jpg, .jpeg, .png, .bmp" :on-change="handleListBanner"
          :file-list="bannerUrl"
          >
            <i class="el-icon-plus"></i>
            <template slot="file" slot-scope="{ file }">
              <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" @click="handleImageClick(file)"/>
            </template>
          </el-upload>
        </section>
      </main>
      <aside class="content-right">
        <section class="preview block">
          <h2 class="block-title">Preview</h2>
          <div class="preview-wrapper">
            <p class="preview-wrapper__message" v-if="!avatarUrl && !thumbnailUrl">Upload file to preview your brand new NFT</p>
            <div class="preview-wrapper__thumbnail" v-if="thumbnailUrl">
              <img :src="thumbnailUrl" :alt="thumbnailPreviewing" />
            </div>
            <div class="preview-wrapper__avatar" v-if="avatarUrl">
              <img :src="avatarUrl" :alt="avatarPreviewing" />
              <base-icon class="icon-active" icon="icon-status1" size="26" />
              <base-icon class="icon-verified" icon="icon-verified" size="17" />
            </div>
            <div class="preview-wrapper__detail" v-if="avatarUrl && thumbnailUrl">
              <p class="brand">Virtual Tour SandBox</p>
              <p class="__name">
                by 
                <span class="__name-link" >
                  LynKey
                  <base-icon icon="icon-user-verified" size="12" />
                </span>
              </p>
              <p class="__description">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quaerat doloremque quisquam sed quam, ullam nobis harum id iste impedit consequuntur.</p>
            </div>
          </div>
        </section>
      </aside>
    </div>
    <div class="footer" slot="footer">
      <div class="wrap-button">
        <div class="btn-right">
          <el-button class="btn-default btn-400 btn-h-40 btn-close" @click="handleReset">Reset</el-button>
          <el-button class="btn-default-bg btn-400 btn-h-40 is-none-border" style="font-size: 14px; font-weight: 600" @click="handleSave">Save</el-button>
        </div>
      </div>
    </div>
  </base-popup>
</template>

<script lang="ts">
  import { Component, Mixins } from 'vue-property-decorator'
  import PopupMixin from '@/mixins/popup'
  import NftDetail from './NftDetail.vue'
  @Component({ components: { NftDetail } })
  export default class PopupCreateCollection extends Mixins(PopupMixin) {
    avatarUrl = ''
    thumbnailUrl = ''
    bannerUrl: any = []
    imageClick: any = {}
    avatarPreviewing = ''
    thumbnailPreviewing = ''
    fileList = [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
    handleAvatarChange(file: any): void {
      this.avatarUrl = URL.createObjectURL(file.raw)
      this.avatarPreviewing = file.name
    }
    handleThumbnailChange(file: any): void {
      this.thumbnailUrl = URL.createObjectURL(file.raw)
      this.thumbnailPreviewing = file.name
    }
    handleBannerChange(file: any): void {
      console.log(">>>file,", file)
      this.bannerUrl.unshift({
        name: file.name,
        url: URL.createObjectURL(file.raw)
      })
      this.imageClick = this.bannerUrl[0]
      // this.bannerUrl = [
      //   ...this.bannerUrl,
      //   {
      //     name: file.name,
      //     url: URL.createObjectURL(file.raw)
      //   }
      // ]
      console.log('fileUrl', URL.createObjectURL(file.raw));
      console.log('banner', this.bannerUrl);
    }
    handleClearUpload(): void {
      this.avatarUrl = ''
      this.thumbnailUrl = ''
    }
    handleListBanner(file: any): void {
      this.bannerUrl.unshift(file)
    }
    handleBannerRemove(banner: any): void {
      console.log('>>remove banner:', banner);
      console.log('>>banners:', this.bannerUrl);
      // this.bannerUrl.shift(banner)
      this.bannerUrl = this.bannerUrl.filter((item: any) => item !== banner)
      this.imageClick = this.bannerUrl[0]
    }
    handleImageClick(image: any): void {
      console.log('>>>imageClick', image);
      this.imageClick = image;
      console.log(this.imageClick);
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
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
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
              &__preview {
                width: 100%;
                height: 100%;
                border-radius: 8px;
                object-fit: cover;
              }
              &__icon {
                position: absolute;
                top: -6px;
                right: -30px;
                z-index: 101;
              }
            }
          }
        }
        .upload-thumbnail {
          .el-upload-dragger {
            height: 238px;
            .upload-wrapper {
              width: 285px;
              height: 190px;
              position: relative;
              z-index: 100;
              &__preview {
                width: 100%;
                height: 100%;
                border-radius: 8px;
                object-fit: cover;
              }
              &__icon {
                position: absolute;
                top: -6px;
                right: -30px;
                z-index: 101;
              }
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
              &__preview {
                width: 100%;
                height: 100%;
                border-radius: 8px;
                object-fit: cover;
              }
              &__icon {
                position: absolute;
                top: -6px;
                right: -30px;
                z-index: 101;
              }
            }
          }
        }
        .upload-banner-list {
          margin-top: 12px;
          .el-upload--picture-card {
            width: 80px;
            height: 80px;
            line-height: 88px;
          }
          .el-upload-list__item {
            width: 80px;
            height: 80px;
            img {
              object-fit: cover;
            }
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
            height: 412px;
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
        margin-bottom: 40px;
        &-title {
          font-size: 16px;
          line-height: 24px;
          font-weight: 600;
          color: #0a0b0d;
          margin-bottom: 16px;
          &__subtitle {
            font-size: 14px;
            font-weight: 400;
            color: #5b616e;
          }
          &__light {
            font-weight: 400;
          }
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
      }
    }
  }
</style>
