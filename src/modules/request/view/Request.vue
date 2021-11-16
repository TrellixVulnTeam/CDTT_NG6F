<template>
  <div class="w-100 bo-request">
    <div class="box-content bg-white box-shadow">
      <div class="table bg-white box-shadow">
        <div class="wallet-header">
          <div class="be-flex align-center jc-space-between wallet-header__above">
            <div class="wallet-header__above-tabs be-flex">
              <div class="tab-item cursor" v-for="tab in tabs" :key="tab.id" :class="$route.name === tab.routeName ? 'tab-active' : null" @click="handleChangeTab(tab)">
                <span class="text-base">{{ $t(`request.${tab.title}`) }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="box-table">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator'
  @Component
  export default class BORequest extends Vue {
    tabs: Array<Record<string, any>> = [
      {
        id: 1,
        title: 'withdraw',
        routeName: 'RequestWithdraw'
      }
      // {
      //   id: 2,
      //   title: 'transfer',
      //   routeName: 'RequestTransfer'
      // }
    ]
    handleChangeTab(tab: Record<string, any>): void {
      this.$router.push({ name: tab.routeName })
    }
  }
</script>
<style scoped lang="scss">
  .bo-request {
    color: var(--bc-text-primary);
    .box-content {
      // tab active
      .table {
        .wallet-header {
          &__above {
            border-bottom: 1px solid var(--bc-border-primary);
            &-tabs {
              .tab-item {
                padding: 16px 12px;
                position: relative;
                color: var(--bc-text-discript);
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
        .box-table {
          padding: 24px;
          min-height: 240px;
          overflow-y: auto;
        }
      }
    }
  }
</style>
