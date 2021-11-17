<template>
  <base-popup name="popup-balance-detail" class="popup-balance-detail" width="1040px" :isShowFooter="false"  :close="handleClose">
    <div class="title-popup" slot="title">
      <span>{{ $t('balance.popup.title') }}</span>
    </div>
    <div class="content">
      <div class="be-flex mb-24 content__header">
        <div class="avatar">
          <img v-if="detailRow.avatar" :src="detailRow.avatar" altdetailRow.avatar />
          <base-icon v-else icon="default-avatar" size="48" style="display: inline-flex" />
        </div>
        <div class="ml-24 w-100 info">
          <div class="full-name mb-12 text-l text-bold">{{ detailRow.fullName }}</div>
          <span> {{ detailRow.email | formatEmail }}| {{detailRow.phone | formatNumberPhone}}</span>
        </div>
      </div>
      <balance-detail-card :data-card='detailRow'/>
      <account-statement-card/>
    </div>
  </base-popup>
</template>

<script lang="ts">
  import { Component, Mixins, Prop } from 'vue-property-decorator'

  import PopupMixin from '@/mixins/popup'

  import BalanceDetailCard from '@/modules/balance/components/balanceDetail/BalanceDetailCard.vue'
  import AccountStatementCard from '@/modules/balance/components/balanceDetail/AccountStatementCard.vue'

  @Component({ components: {BalanceDetailCard ,AccountStatementCard } })
  export default class BalanceDetail extends Mixins(PopupMixin) {
    @Prop({ required: true, type: Object, default: {} }) detailRow!: Record<string, any>
    @Prop({ required: true, type: Object, default: {} }) data!: Record<string, any>
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
      }
      // {
      //   id: 7,
      //   title: 'statistics'
      // }
      // {
      //   id: 8,
      //   title: 'setting'
      // }
    ]
    tabActive = 0

    //balance
    listBlance: Record<string, any>[] = []

    handleClose(): void {
      this.tabActive = 0
      this.setOpenPopup({
        popupName: 'popup-balance-detail',
        isOpen: false
      })
    }

    handleChangeTab(tab: Record<string, any>): void {
      this.tabActive = tab.id
    }
  }
</script>

<style scoped lang="scss">
  .popup-balance-detail {
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
              width: 48px;
              height: 48px;
              border-radius: 100px;
              object-fit: cover;
            }
          }
          .info{
            .full-name{
              font-size: 18px;
              color: #0A0B0D;
              font-family: Open Sans;
            }
            span{
              font-size: 12px;
              color: #5b616e;
              font-family: "Open Sans";
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
