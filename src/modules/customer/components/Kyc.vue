<template>
  <div class='kyc-customer-detail'>
    <div class='be-flex content' v-loading='isLoading'>
      <div class='mr-24 detail-left'>
        <div class='detail-item detail-item--above'>
          <span class='title text-l text-bold'>{{ $t('kyc.popup.personal-detail') }}</span>
          <div class='wrap'>
            <span class='wrap-small'>{{ $t('kyc.popup.f-name') }}</span>
            <span class='name'>{{ detail.firstName }}</span>
          </div>
          <div class='wrap'>
            <span class='wrap-small'>{{ $t('kyc.popup.l-name') }}</span>
            <span class='name'>{{ detail.lastName }}</span>
          </div>
          <div class='wrap'>
            <span class='wrap-small'>{{ $t('kyc.popup.national') }}</span>
            <span class='name'>{{ detail.nationality }}</span>
          </div>
        </div>
        <div class='detail-item detail-item--below'>
          <span class='title text-l text-bold'>{{ $t('kyc.popup.id-verification') }}</span>
          <div class='wrap'>
            <span class='wrap-small'>{{ $t('kyc.popup.id-type') }}</span>
            <span class='name'>{{ detail.identificationType }}</span>
          </div>
          <div class='wrap'>
            <span class='wrap-small'>{{ $t('kyc.popup.id-number') }}</span>
            <span class='name'>{{ detail.identificationNumber }}</span>
          </div>
        </div>
      </div>
      <div class='detail-right'>
        <span class='text-l text-bold mb-24 d-ib'>{{ $t('kyc.popup.title-photo') }}</span>
        <div class='be-flex w-100 slider'>
          <el-carousel indicator-position='none' arrow='always' :autoplay='false'>
            <el-carousel-item v-for='(item, index) in listImage' :key='index'>
              <!-- <img :src="item" class="img-fluid" :alt="item" /> -->
              <el-image style='height: 100%' class='img-fluid' :src='item' :preview-src-list='listImage'></el-image>
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
  import { Component, Mixins, Prop,Vue } from 'vue-property-decorator'
  import getRepository from '@/services'
  import { KycRepository } from '@/services/repositories/kyc'

  const apiKyc: KycRepository = getRepository('kyc')

  import { namespace } from 'vuex-class'
  import { filter } from 'lodash'

  const bcKyc = namespace('bcKyc')

  interface IDetail {
    rfrId: number
    firstName: string | null
    lastName: string | null
    fullName: string | null
    email: string | null
    status: string | null
    kycStatus: string | null
    createdAt: string | null
    nationality: string | null
    identificationType: string | null
    identificationNumber: string | null
    idPhoto1: string
    idPhoto2: string
    selfiePhoto: string
    pinEnabled: string | null
    kycRejectReasonIds: string
  }

  @Component({ components: {  } })
  export default class KycCustomerDetail extends Vue{
    @Prop({ required: true, type: Object, default: {} }) detailRow!: Record<string, any>
    @bcKyc.State('listReason') listReason!: Array<Record<string, any>>

    detail = {} as IDetail
    isLoading = false
    listReasonReject: Array<Record<string, any>> = []
     async created(): Promise<void> {
     try{
       this.detail = await apiKyc.getDetailKyc(this.detailRow.userId);
     }catch (e) {
       console.log(e)
     }
    }
    get listImage(): string[] {
      return [this.detail.idPhoto1, this.detail.idPhoto2, this.detail.selfiePhoto]
    }

    get getShowFooter(): boolean {
      return this.$route.name === 'KycPending'
    }


    handleGetListRejectOfUser(): void {
      const arrReasonIds = this.detail.kycRejectReasonIds.split(',')
      this.listReasonReject = arrReasonIds.reduce((prev: any, cur) => {
        const value = filter(this.listReason, elm => elm.id == cur)[0]
        prev.push(value)
        return prev
      }, [])
    }



  }
</script>

<style scoped lang='scss'>
  .kyc-customer-detail {
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

      .el-image__inner {
        object-fit: contain;
      }
    }
  }

  .popup-reject-style {
    .content {
      background: #f6f8fc;
      padding: 24px;
      border-radius: 4px;
    }

    ::v-deep .popup-content {
      background-color: #fff;

      .el-image__inner {
        object-fit: contain;
      }
    }
  }

  .reason-reject {
    padding-bottom: 40px;
    border-bottom: 1px solid #d2d0ce;

    .list-reason {
      padding: 16px;
      background-color: #fbedee;
      border: 1px solid #cf202f;
      border-radius: 4px;

      .item:not(:last-child) {
        margin-bottom: 4px;
      }

      .item {
        position: relative;
        position: relative;
        padding-left: 16px;
        margin-left: 10px;

        &::before {
          content: '';
          position: absolute;
          width: 4px;
          height: 4px;
          background-color: #000;
          border-radius: 50%;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
  }
</style>