<template>
  <div class="w-100 bo-kyc">
    <!-- <walllet-header />
    <router-view /> -->
    <div class="bg-white wallet-header">
      <div class="be-flex align-center jc-space-between wallet-header__above">
        <div class="wallet-header__above-tabs be-flex">
          <div class="tab-item cursor" v-for="tab in tabs" :key="tab.id" :class="tabActive === tab.id ? 'tab-active' : null" @click="tabActive = tab.id">
            <span class="text-base">{{ tab.title }}</span>
          </div>
        </div>
      </div>
    </div>
    <kyc-filter />
    <wallet-table @rowClick="handleRowClick" />
    <kyc-detail />
  </div>
</template>

<script lang="ts">
  import { Component, Mixins } from 'vue-property-decorator'
  //@ts-ignore
  import WalletTable from '../components/WalletTable.vue'
  import KycFilter from '../components/filter/KycFilter.vue'
  import KycDetail from '../components/popup/KycDetail.vue'
  import PopupMixin from '@/mixins/popup'

  @Component({ components: { WalletTable, KycFilter, KycDetail } })
  export default class BOKyc extends Mixins(PopupMixin) {
    tabs: Array<Record<string, any>> = [
      {
        id: 0,
        title: 'Not verified'
      },
      {
        id: 1,
        title: 'Pending'
      },
      {
        id: 2,
        title: 'Verified'
      },
      {
        id: 3,
        title: 'Rejected'
      }
    ]
    tabActive = 0

    handleRowClick(row: Record<string, any>): void {
      this.setOpenPopup({
        popupName: 'popup-kyc-detail',
        isOpen: true
      })
    }
  }
</script>

<style scoped lang="scss">
  .bo-kyc {
    .wallet-header {
      &__above {
        border-bottom: 1px solid var(--bc-border-primary);
        &-tabs {
          .tab-item {
            padding: 16px 12px;
            position: relative;
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
      }

      &__below {
        padding: 24px;
        &-amount {
          .amount-wallet,
          .amount-lock {
            flex: 1;
            .title {
              margin-left: 16px;
              .title-coin {
                color: #201f1e;
              }
            }
            .amount {
              margin-top: 10px;

              .amount-btc {
                color: var(--bc-amount-btc);
              }
              .amount-lyn {
                color: var(--bc-amount-lin);
              }
              .amount-lock {
                color: var(--bc-amount-lock);
              }
            }
          }
          .amount-wallet {
            border-right: 1px solid var(--bc-border-primary);
          }
        }
      }
    }
  }
</style>
