<template>
  <base-popup name="popup-kyc-detail" class="popup-kyc-detail" width="960px">
    <div class="title-popup" slot="title">
      <span>{{ $t('kyc.popup.title') }}</span>
    </div>
    <div class="be-flex content">
      <div class="mr-24 detail-left">
        <div class="detail-item detail-item--above">
          <span class="title text-l text-bold">{{ $t('kyc.popup.personal-detail') }}</span>
          <div class="wrap">
            <span class="wrap-small">{{ $t('kyc.popup.f-name') }}</span>
            <span class="name">Bean</span>
          </div>
          <div class="wrap">
            <span class="wrap-small">{{ $t('kyc.popup.l-name') }}</span>
            <span class="name">Atkinson</span>
          </div>
          <div class="wrap">
            <span class="wrap-small">{{ $t('kyc.popup.national') }}</span>
            <span class="name">Vietnam</span>
          </div>
        </div>
        <div class="detail-item detail-item--below">
          <span class="title text-l text-bold">{{ $t('kyc.popup.id-verification') }}</span>
          <div class="wrap">
            <span class="wrap-small">{{ $t('kyc.popup.id-type') }}</span>
            <span class="name">Bean</span>
          </div>
          <div class="wrap">
            <span class="wrap-small">{{ $t('kyc.popup.id-number') }}</span>
            <span class="name">Atkinson</span>
          </div>
        </div>
      </div>
      <div class="detail-right">
        <span class="text-l text-bold mb-24 d-ib">{{ $t('kyc.popup.title-photo') }}</span>
        <div class="be-flex w-100 slider">
          <el-carousel indicator-position="none" arrow="always" :autoplay="false">
            <el-carousel-item v-for="(item, index) in listImage" :key="index">
              <!-- <img :src="item" class="img-fluid" :alt="item" /> -->
              <el-image style="height: 100%" class="img-fluid" :src="item" :preview-src-list="listImage"> </el-image>
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
    </div>
    <div class="footer" slot="footer">
      <div class="be-flex jc-space-between wrap-button">
        <div class="btn-left">
          <el-button class="btn-default btn-close btn-h-40" @click="handleClose">{{ $t('button.close') }}</el-button>
        </div>
        <div class="btn-right">
          <el-button class="btn btn-reject btn-h-40 is-none-border" @click="handleReject">{{ $t('button.reject') }}</el-button>
          <el-button class="btn btn-approve btn-h-40 is-none-border">{{ $t('button.approve') }}</el-button>
        </div>
      </div>
    </div>
    <popup-reject />
  </base-popup>
</template>

<script lang="ts">
  import { Component, Mixins } from 'vue-property-decorator'
  import PopupReject from './PopupReject.vue'
  import PopupMixin from '@/mixins/popup'
  @Component({ components: { PopupReject } })
  export default class KycDetail extends Mixins(PopupMixin) {
    listImage: string[] = [
      'https://visakhoinguyen.com/wp-content/uploads/chung-minh-nhan-dan.jpg',
      'https://lh4.ggpht.com/-CQehj5uoqos/V3H0-a-GvpI/AAAAAAAAAkU/j-eFYuA07JgA5LPpw1FsTGrOs_6WOBPcACLcB/s1600/CMND%2528%2Bmat%2Bsau%2B%2529.jpg',
      'https://media.phapluatplus.vn/files/buituanh/2018/10/22/anh_cmnd_2210102821-2317.jpg'
    ]
    handleReject(): void {
      this.setOpenPopup({
        popupName: 'popup-reject',
        isOpen: true
      })
    }

    handleClose(): void {
      this.setOpenPopup({
        popupName: 'popup-kyc-detail',
        isOpen: false
      })
    }
  }
</script>

<style scoped lang="scss">
  .popup-kyc-detail {
    color: var(--bc-text-primary);
    .content {
      padding-bottom: 24px;
      .detail-left {
        border-radius: 4px;
        width: 216px;
        background-color: #fff;
        padding: 24px 24px 52px;
        box-shadow: 0px 0.3px 0.9px rgba(0, 0, 0, 0.1), 0px 1.6px 3.6px rgba(0, 0, 0, 0.13);
        .title {
          margin-bottom: 8px;
          display: inline-block;
        }
        .detail-item--above {
          padding-bottom: 24px;
          border-bottom: 1px solid #d2d0ce;
        }
        .detail-item--below {
          margin-top: 24px;
        }
        .wrap {
          &:not(:last-child) {
            margin-bottom: 16px;
          }
          .name {
            font-size: 16px;
          }
          .wrap-small {
            font-size: 12px;
            line-height: 16px;
            color: #5b616e;
            display: block;
            margin-bottom: 4px;
          }
        }
      }
      .detail-right {
        flex: 1;
        background-color: #fff;
        box-shadow: 0px 0.3px 0.9px rgba(0, 0, 0, 0.1), 0px 1.6px 3.6px rgba(0, 0, 0, 0.13);
        padding: 24px;
        border-radius: 4px;
        .slider {
          ::v-deep .el-carousel {
            width: 100%;
            .el-carousel__container {
              height: 100%;
              // img {
              //   height: 100%;
              // }
              .el-carousel__arrow {
                background: rgba(0, 0, 0, 0.4);
                width: 40px;
                height: 40px;
                i {
                  font-size: 20px;
                }
              }
            }
          }
          height: calc(100% - 48px);
        }
      }
    }
    ::v-deep .popup-content {
      background-color: #f6f8fc;
    }
  }
</style>
