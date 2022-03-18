<template>
  <div class="w-100 bo-kyc" style="100vh">
    <div class="bg-white wallet-header">
      <div class="be-flex align-center jc-space-between wallet-header__above">
        <div class="wallet-header__above-tabs be-flex">
          <div class="tab-item cursor" v-for="tab in tabs" :key="tab.id" :class="$route.name === tab.routeName ? 'tab-active' : null" @click="handleChangeTab(tab)">
            <span class="text-base">
              {{ $t(`menu.${tab.title}`) }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <report-filter />
    <report-table v-if="this.$route.name == 'ReportUser'" />
    <div v-else>aaaa</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ReportTable from '../components/ReportTable.vue'
import ReportFilter from '../components/filter/ReportFilter.vue'
import getRepository from '@/services'
import ReportRepository from '@/services/repositories/report'

const api: ReportRepository = getRepository('report')
@Component({ components: { ReportTable, ReportFilter } })
export default class BOCustomer extends Vue {
  tabs: Array<Record<string, any>> = [
    {
      id: 1,
      title: 'user',
      routeName: 'ReportUser'
    },
    {
      id: 2,
      title: 'device',
      routeName: 'ReportDevice'
    }
  ]
  tabActive = 'device'

  objType: Record<string, any> = {
    ReportUser: 'USER',
    ReportDevice: 'DEVICE'
  }

  handleChangeTab(tab): void {
    console.log('tab', this.$route.name)
    this.$router.push({ name: tab.routeName }).then(() => {
      // this.resetQuery()
      // EventBus.$emit('changeTabMember')
    })
  }

  async created(): Promise<void> {
    // console.log('vao')
    // const params: any = {
    //   fromDate: '2323e',
    //   toDate: '',
    //   page: '',
    //   size: '',
    //   search: '',
    //   sort: ''
    // }
    // const result = await api.getListReport(params)

    // console.log('result', result)
    // if (!this.checkPemission('customer', ['view'])) {
    //   const routeName = MODULE_WITH_ROUTENAME[this.listModuleCanView[0].module]
    //   this.$router.push({ name: routeName })
    //   return
    // }

    const name = this.$route.name!
    // this.query.status = this.objType[name]
  }
}
</script>

<style lang="scss" scoped>
.bo-kyc {
  box-shadow: 0px 0.3px 0.9px rgba(0, 0, 0, 0.1), 0px 1.6px 3.6px rgba(0, 0, 0, 0.13);
  border-radius: 4px;
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
          // .text-base {
          //   color: #5b616e;
          // }
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