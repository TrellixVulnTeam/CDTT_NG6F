<template>
  <base-popup name="popup-customer-detail" class="popup-customer-detail" width="1040px" :isShowFooter="false" :close="handleClose">
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
                <span class="text-base">{{ detailRow.referrerCode }}</span>
              </div>
              <div class="be-flex jc-space-between info-item">
                <span class="text-xs label">{{ $t('label.phone') }}:</span>
                <span class="text-base">{{ detailRow.phone }}</span>
              </div>
              <div class="be-flex jc-space-between info-item">
                <span class="text-xs label">{{ $t('label.email') }}:</span>
                <span class="text-base">{{ detailRow.email }}</span>
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
                <span class="text-base">{{ detailRow.lastimeLogin | formatMMDDYY }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="content__bottom">
        <div class="be-flex mb-24 tabs">
          <div class="tab-item cursor" v-for="tab in tabs" :key="tab.id" :class="tabActive === tab.id ? 'tab-active' : null" @click="handleChangeTab(tab)">
            <span class="text-base">{{ $t(`menu.${tab.title}`) }}</span>
          </div>
        </div>
        <div v-loading="isLoading" :class="isLoading ? 'main-content-loading' : null" class="main-content">
          <info-customer v-if="tabActive === 0" :info="detailRow" />
          <customer-balance v-if="tabActive === 3" :listBlance="listBlance" />
          <customer-transaction v-if="tabActive === 4" :userId="detailRow.userId" />
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

  import getRepository from '@/services'
  import { CustomerRepository } from '@/services/repositories/customer'
  const apiCustomer: CustomerRepository = getRepository('customer')

  @Component({ components: { InfoCustomer, CustomerBalance, CustomerTransaction } })
  export default class CustomerDetail extends Mixins(PopupMixin) {
    @Prop({ required: true, type: Object, default: {} }) detailRow!: Record<string, any>

    detail: Record<string, any> = {}
    isLoading = false

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

    //balance
    listBlance: Record<string, any>[] = []

    handleClose(): void {
      this.tabActive = 0
      this.setOpenPopup({
        popupName: 'popup-customer-detail',
        isOpen: false
      })
    }

    handleChangeTab(tab: Record<string, any>): void {
      this.tabActive = tab.id
      if (tab.id === 3) {
        this.handleGetListBalance()
      }
    }

    async handleGetListBalance(): Promise<void> {
      try {
        this.isLoading = true
        this.listBlance = await apiCustomer.getlistBalance(this.detailRow.userId)
        this.isLoading = false
      } catch (error) {
        this.isLoading = false
        console.log(error)
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