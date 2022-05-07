<template>
  <div class="nft-item">
    <div class="avatar cursor">
      <img class="avatar-img" :src="nftProps.image" alt="" />
    </div>
    <div class="content">
      <div style="height: 80px">
        <div class="be-flex align-center title">
          <span class="nft-body-small text-desc cursor text-overflow-1 name">{{ nftProps.collectionName }}</span>
          <base-icon style="margin-left: 3px" size="13" icon="icon-verified"></base-icon>
          <el-popover class="be-flex align-center jc-space-center ml-auto cursor" placement="bottom" trigger="click" popper-class="popper-share-nft">
            <div class="content-popper">
              <p class="nft-body-base cursor element">Report</p>
              <br />
              <p class="nft-body-base cursor element">Share</p>
            </div>
            <div slot="reference">
              <base-icon icon="icon-3dot" size="16" class="d-iflex" />
            </div>
          </el-popover>
        </div>
        <div class="nft-header6 text-semibold cursor text-overflow-1 name" style="font-size: 16px">{{ nftProps.itemName }}</div>
        <div class="be-flex align-center price">
          <div class="icon"><base-icon icon="icon-clm" alt="" class="d-block" size="16" /></div>
          <span class="nft-body-small">
            <span class="text-desc">Highest Bid:</span>
            <span class="text-price" style="margin-left: 3px">1,500.00</span>
            <span class="text-desc" style="margin-left: 3px">(1/1)</span>
          </span>
        </div>
      </div>
      <div class="line"></div>
      <div class="be-flex align-center footer">
        <div class="text-hyperlink nft-header6 text-semibold cursor"></div>
        <div>
          <span class="nft-body-small text-desc">Not for sale</span>
        </div>
        <div class="be-flex align-center" style="margin-left: auto; margin-right: 0">
          <span v-if="true" class="cursor"><base-icon icon="icon-heart-white" size="28" class="d-iflex" style="padding-top: 5px" /></span>
          <!-- <span v-else class="cursor" style="height: 28px"><base-icon icon="icon-heart-red" size="28" class="d-iflex" /></span> -->
          <span class="nft-body-small text-desc">{{ nftProps.favourite }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import BaseIcon from '@/components/base/icon/BaseIcon.vue'

  @Component({
    components: { BaseIcon }
  })
  export default class NftItem extends Vue {
    @Prop({ required: true, type: Object }) nftProps!: Record<string, any>
  }
</script>

<style scoped lang="scss">
  ::v-deep.nft-item {
    border: 1px solid #dbdbdb;
    border-radius: 8px;
     overflow: hidden;
    position: relative;
    width: 261px;

    .avatar {
      width: 285px;
      height: 285px;

      .avatar-img {
        width: 261px;
        height: 261px;
        object-fit: cover;
        border-top-left-radius: 3%;
        border-top-right-radius: 3%;
      }
      .wrap-media {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      img,
      video {
        width: auto;
        height: auto;
        max-width: 100%;
        max-height: 100%;
        display: block;
      }
      .empty {
        width: 285px;
        height: 285px;
      }
      .img-cover {
        img,
        video {
          object-fit: cover;
          width: 100%;
          height: 100%;
        }
      }
      .img-contain {
        img {
          object-fit: contain;
        }
      }
      .img-padded {
        img,
        video {
          padding: 16px;
          object-fit: contain;
        }
      }
    }
    .content {
      position: relative;
      // padding: 16px;
      padding: 0 16px 16px 16px;

      .name {
        display: -webkit-box;
        // font-size: 14px;
        width: fit-content;
        // height: 22px;
        text-overflow: clip;
        overflow: hidden;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
      }
    }
    .title {
      margin-bottom: 4px;
    }
    .price {
      margin-top: 4px;
      .icon {
        width: 24px;
        height: 24px;
        background: #f3f2f1;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 8px;
      }
    }

    .line {
      margin: 16px 0;
      width: 100%;
      height: 1px;
      background: #dbdbdb;
    }

    .time-left {
      position: absolute;
      top: -20px;
      background: #fff;
      width: fit-content;
      padding: 8px 10px;
      border: 1px solid var(--bc-input-hover-border);
      border-radius: 40px;
      .time-item {
        padding-right: 2px;
        display: flex;
        span {
          padding-left: 3px;
        }
      }
    }
  }
  .text-price {
    color: var(--bc-text-market-primary-nft);
  }
</style>
