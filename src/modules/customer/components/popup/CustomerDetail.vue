<template>
  <base-popup name="popup-customer-detail" class="popup-customer-detail" width="1040px" :isShowFooter="false" :close="handleClose" :open="handleOpen">
    <div class="title-popup" slot="title">
      <span>{{ $t('customer.popup.title') }}</span>
    </div>
    <div class="content">
      <div class="be-flex mb-24 content__header">
        <div class="avatar">
          <img v-if="detailRow.avatar" :src="detailRow.avatar" altdetailRow.avatar />
          <base-icon v-else icon="default-avatar" size="80" style="display: inline-flex" />
        </div>
        <div class="ml-24 w-100 info">
          <div class="full-name mb-12 text-l text-bold">{{ detailRow.fullName }}</div>
          <div class="be-flex info-below">
            <div class="info-below__left">
              <div class="be-flex jc-space-between info-item">
                <span class="text-xs label">{{ $t('label.referral-code') }}:</span>
                <span class="text-base">{{ detailRow.affiliationCode }}</span>
              </div>
              <div class="be-flex jc-space-between info-item">
                <span class="text-xs label">{{ $t('label.phone') }}:</span>
                <span class="text-base">({{ detailRow.countryCode }}) {{ detailRow.phone }}</span>
                <span style="width: fit-content" class="status-verified" :style="lang === 'en' ? 'right:-50px' : 'right:-75px'" v-if="detailRow.emailVerified === '1'">{{
                  $t('customer.verified')
                }}</span>
              </div>
              <div class="be-flex jc-space-between info-item">
                <span class="text-xs label">{{ $t('label.email') }}:</span>
                <span class="text-base">{{ detailRow.email }}</span>
                <span style="width: fit-content" class="status-verified" :style="lang === 'en' ? 'right:-50px' : 'right:-75px'" v-if="detailRow.phoneVerified === '1'">{{
                  $t('customer.verified')
                }}</span>
              </div>
            </div>
            <div class="info-below__right">
              <div class="be-flex jc-space-between info-item">
                <span class="text-xs label">{{ $t('label.level') }}:</span>
                <span class="text-base">{{ detailRow.level }}</span>
              </div>
              <div class="be-flex jc-space-between info-item">
                <span class="text-xs label">{{ $t('label.create-date') }}:</span>
                <span class="text-base">{{ detailRow.createdDate | formatMMDDYY }}</span>
              </div>
              <div class="be-flex jc-space-between info-item">
                <span class="text-xs label">{{ $t('label.last-login') }}:</span>
                <span class="text-base">{{ detailRow.lastTimeLogin | formatMMDDYY }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="content__bottom">
        <div class="be-flex mb-24 tabs">
          <div class="tab-item cursor" v-for="tab in getTabs" :key="tab.id" :class="tabActive === tab.id ? 'tab-active' : null" @click="handleChangeTab(tab)">
            <span class="text-base">{{ $t(`menu.${tab.title}`) }}</span>
          </div>
        </div>
        <div v-loading="isLoading" :class="isLoading ? 'main-content-loading' : null" class="main-content">
          <info-customer v-if="tabActive === 0" :info="detailRow" />
          <Kyc-customer-detail v-if="tabActive === 1" :detailRow="detailRow" />
          <customer-address v-if="tabActive === 2" :userId="detailRow.userId" />
          <customer-balance v-if="tabActive === 3" :userId="detailRow.userId" />
          <customer-transaction v-if="tabActive === 4" :userId="detailRow.userId" />
          <customer-referral v-if="tabActive === 5" :userId="detailRow.userId" />
          <customer-bonus v-if="tabActive === 6" :userId="detailRow.userId" />
          <statistic v-if="tabActive === 7" :userId="detailRow.userId" :summary="summary" :list-statistics="listStatistics" />
          <setting v-if="tabActive === 8" :userId="detailRow.userId" :dataDetail="detailRow" :summary="summary" />
        </div>
      </div>
    </div>
  </base-popup>
</template>

<script lang="ts">
  import { Component, Mixins, Prop } from 'vue-property-decorator'
  import InfoCustomer from '../Info.vue'
  import CustomerBalance from '../Balance.vue'
  import CustomerTransaction from '../CustomerTransaction.vue'
  import PopupMixin from '@/mixins/popup'
  import KycCustomerDetail from '@/modules/customer/components/Kyc.vue'
  import CustomerReferral from '../Referral.vue'
  import CustomerAddress from '../Address.vue'
  import CustomerBonus from '../Bonus.vue'
  import Statistic from '@/modules/customer/components/Statistic.vue'
  import Setting from '@/modules/customer/components/Setting.vue'
  import { CustomerRepository } from '@/services/repositories/customer'
  import getRepository from '@/services'

  const apiCustomer: CustomerRepository = getRepository('customer')

  export interface IStatistics {
    transactionType: string
    numOfTransaction: number
    lastTransaction: string
    totalAmount: number
    avgAmount: number
  }

  export interface ISummary {
    totalWithdraw: number
    totalTrade: number
    totalBalance: number
    totalDeposit: number
  }

  @Component({
    components: {
      InfoCustomer,
      CustomerBalance,
      KycCustomerDetail,
      CustomerTransaction,
      CustomerReferral,
      CustomerAddress,
      CustomerBonus,
      Statistic,
      Setting
    }
  })
  export default class CustomerDetail extends Mixins(PopupMixin) {
    @Prop({ required: true, type: Object, default: {} }) detailRow!: Record<string, any>

    detail: Record<string, any> = {}
    isLoading = false
    listStatistics: IStatistics[] = []
    summary: ISummary = {} as ISummary
    tabs: Record<string, any>[] = [
      {
        id: 0,
        title: 'info'
      },
      {
        id: 1,
        title: 'kyc'
      },
      {
        id: 2,
        title: 'address'
      },
      {
        id: 3,
        title: 'balance'
      },
      {
        id: 4,
        title: 'transaction'
      },
      {
        id: 5,
        title: 'referral'
      },
      {
        id: 6,
        title: 'bonus'
      },
      {
        id: 7,
        title: 'statistics'
      },
      {
        id: 8,
        title: 'setting'
      }
    ]
    tabActive = 0
    lang = 'en'

    //balance
    listBlance: Record<string, any>[] = []

    get getTabs(): Array<Record<string, any>> {
      if (this.checkPemission('customer', ['view-kyc-customer-detail'])) {
        return this.tabs
      }
      return [
        {
          id: 0,
          title: 'info'
        },
        {
          id: 2,
          title: 'address'
        },
        {
          id: 3,
          title: 'balance'
        },
        {
          id: 4,
          title: 'transaction'
        },
        {
          id: 5,
          title: 'referral'
        },
        {
          id: 6,
          title: 'bonus'
        },
        {
          id: 7,
          title: 'statistics'
        }
      ]
    }

    handleOpen(): void {
      this.initStatistics()
      this.lang = window.localStorage.getItem('bc-lang')!
    }

    handleClose(): void {
      this.tabActive = 0
      this.setOpenPopup({
        popupName: 'popup-customer-detail',
        isOpen: false
      })
    }

    async initStatistics(): Promise<any> {
      this.isLoading = true
      try {
        const result = await apiCustomer.getStatistics(this.detailRow.userId)
        this.listStatistics = result.statistics
        this.summary = result.summary
        this.isLoading = false
      } catch (e) {
        console.log(e)
      }
    }

    handleChangeTab(tab: Record<string, any>): void {
      this.tabActive = tab.id
      if (tab.id === 7) {
        this.initStatistics()
      }
    }
  }
</script>

<style scoped lang="scss">
  .popup-customer-detail {
    color: var(--bc-text-primary);

    .title-popup {
      span {
        color: #0a0b0d;
      }
    }

    ::v-deep .popup-content {
      background-color: #f6f8fc;

      .content {
        padding-bottom: 24px;

        &__header {
          .avatar {
            img {
              width: 80px;
              height: 80px;
              border-radius: 100px;
              object-fit: cover;
            }
          }

          .info-below {
            &__left {
              width: 316px;
              margin-right: 160px;
            }

            &__right {
              width: 316px;
            }

            .info-item {
              // margin-bottom: 12px;
              position: relative;
              height: 24px;
              line-height: 24px;
              align-items: center;
              margin-bottom: 4px;

              &:last-child {
                margin-bottom: 0;
              }

              .label {
                color: #5b616e;
              }

              .status-verified {
                background-color: transparent;
                position: absolute;
                right: -80px;
                bottom: -2px;
              }
            }
          }
        }

        &__bottom {
          background-color: #fff;
          box-shadow: 0px 0.3px 0.9px rgba(0, 0, 0, 0.1), 0px 1.6px 3.6px rgba(0, 0, 0, 0.13);
          border-radius: 4px;

          .tabs {
            border-bottom: 1px solid #d2d0ce;

            .tab-item {
              padding: 16px 12px;
              position: relative;
              color: #5b616e;

              &:hover {
                color: var(--bc-tab-active);
              }
            }

            .tab-active {
              color: var(--bc-tab-active);
              font-weight: 600;

              &::after {
                content: '';
                position: absolute;
                width: 100%;
                height: 2px;
                bottom: 0;
                left: 0;
                background-color: var(--bc-tab-active);
              }
            }
          }

          .main-content-loading {
            min-height: 200px;
          }
        }
      }
    }
  }
</style>
