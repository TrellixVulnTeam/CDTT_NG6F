<template>
  <div class="w-100 bo-crowdsale">
    <div class="box-content-1">
      <div class="round bg-white box-shadow">
        <div class="head">
          <div class="fw-600 fs-24 title">{{ $t('crowdsale.round') }} 2</div>
          <div class="box-status">Opening</div>
        </div>
        <p class="fw-400 fs-16 time-date">11/10/2021 - 21/10/2021</p>
        <div class="box-ellipse">
          <div class="mini-ellipse">
            <p class="fw-600 fs-24" style="margin-bottom: 2px; margin-top: 24px; color: #0151fc">75%</p>
            <p class="fw-400 fs-12" style="color: #5b616e">{{ $t('crowdsale.of') }} <span class="fw-600">100M</span></p>
          </div>
          <el-progress type="circle" :percentage="75" :stroke-width="12" color="#0151FC" :show-text="false"></el-progress>
        </div>
      </div>
      <div class="progress bg-white box-shadow">
        <p class="fw-600 fs-24 title">{{ $t('crowdsale.progress') }}</p>
        <p class="fw-400 fs-16 discript">{{ $t('crowdsale.from') }} 01/10/2021 {{ $t('crowdsale.now') }}</p>
        <div class="box-content">
          <div class="box-left fw-400 fs-14">568,000 {{ $t('crowdsale.sold') }}</div>
          <div class="box-right fw-400 fs-14">432,000 {{ $t('crowdsale.left') }}</div>
        </div>
        <el-progress type="line" :percentage="75" :stroke-width="20" color="#129961" :show-text="false"></el-progress>
        <div class="bottom">
          <div class="box1 box">
            <p class="fw-600 fs-18 price">86%</p>
            <p class="fw-400 fs-14">{{ $t('crowdsale.completed') }}</p>
          </div>
          <div class="line"></div>
          <div class="box2 box">
            <p class="fw-600 fs-18 price">$4,445,600</p>
            <p class="fw-400 fs-14">{{ $t('crowdsale.raised') }}</p>
          </div>
          <div class="line"></div>
          <div class="box3 box">
            <p class="fw-600 fs-18 price">6,000</p>
            <p class="fw-400 fs-14">{{ $t('crowdsale.backers') }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="table bg-white box-shadow">
      <div class="wallet-header">
        <div class="be-flex align-center jc-space-between wallet-header__above">
          <div class="wallet-header__above-tabs be-flex">
            <div class="tab-item cursor" v-for="tab in tabs" :key="tab.id" :class="$route.name === tab.routeName ? 'tab-active' : null" @click="handleChangeTab(tab)">
              <span class="text-base">{{ $t(`crowdsale.${tab.title}`) }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="box-table">
        <router-view />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator'
  import firebase from '@/utils/firebase'
  @Component
  export default class BOCrowdsale extends Vue {
    tabs: Array<Record<string, any>> = [
      {
        id: 1,
        title: 'transactions',
        routeName: 'CrowdsaleTransactions'
      },
      {
        id: 2,
        title: 'round',
        routeName: 'CrowdsaleRound'
      }
    ]
    listener: any = null

    created(): void {
      const leadsRef = firebase.ref('crowd-sales')
      this.listener = leadsRef.on('value', function (snapshot) {
        console.log('round get firebase', snapshot.val())
      })
    }

    destroyed(): void {
      const leadsRef = firebase.ref('crowd-sales')
      leadsRef.off('value', this.listener)
    }

    handleChangeTab(tab: Record<string, any>): void {
      this.$router.push({ name: tab.routeName })
    }
  }
</script>
<style scoped lang="scss">
  .bo-crowdsale {
    color: var(--bc-text-primary);
    .box-content-1 {
      display: flex;
      .round {
        width: 320px;
        height: 196px;
        margin-right: 24px;
        padding: 24px;
        text-align: center;
        .head {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 4px;
          .title {
            margin-right: 10px;
          }
          .box-status {
            background: #f3f2f1;
            text-align: center;
            width: 57px;
            height: 18px;
            border-radius: 8px;
            font-size: 10px;
            font-weight: 600;
            line-height: 18px;
            color: #0151fc;
          }
        }
        .time-date {
          margin-bottom: 16px;
        }
        .box-ellipse {
          position: relative;
          margin: 0 auto;
          .mini-ellipse {
            position: absolute;
            width: 96px;
            height: 96px;
            border-radius: 50%;
            background: #fff;
            margin-left: auto;
            margin-right: auto;
            left: 0;
            right: 0;
            top: 14px;
            z-index: 999;
          }
        }
      }
      .progress {
        width: calc(91vw - 445px);
        height: 196px;
        padding: 24px;
        text-align: center;
        .title {
          margin-bottom: 4px;
        }
        .discript {
          margin-bottom: 22px;
        }
        .box-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          color: var(--bc-text-discript);
          margin-bottom: 8px;
        }
        .bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 12px;
          .line {
            height: 32px;
            border-left: 1px solid var(--bc-line);
          }
          .box {
            width: 220px;
            height: 48px;
            .price {
              margin-bottom: 8px;
            }
          }
        }
      }
    }

    .table {
      margin-top: 24px;
      width: 91vw;
      // .tab-header {
      //   height: 24px;
      //   border-bottom: 1px solid var(--bc-line);
      //   padding: 16px 12px;
      // }
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
</style>
