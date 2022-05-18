<template>
  <div class="w-100 bo-metamart">
    <div class="bg-white wallet-header">
      <div class="be-flex align-center jc-space-between wallet-header__above">
        <div class="wallet-header__above-tabs be-flex">
          <div class="tab-item cursor" v-for="tab in tabs" :key="tab.id" :class="$route.name === tab.routeName ? 'tab-active' : null" @click="handleChangeTab(tab)">
            <span class="text-base">{{ $t(`menu.${tab.title}`) }}</span>
          </div>
        </div>
      </div>
    </div>
    <filter-metamart />
    <tab-nft v-if="$route.name === 'Nft'" />
    <tab-collection
        v-if="$route.name === 'Collection'"
        @sizeChange="handleSizeChange"
        @pageChange="handlePageChange"
        :query="query"
        :data="data"
        v-loading="isLoading"
    />
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import FilterMetamart from '../components/filter/FilterMetamart.vue'
import TabNft from '../components/TabNft.vue'
import TabCollection from '../components/TabCollection.vue'
import axios from "axios";
import {MODULE_WITH_ROUTENAME} from "@/configs/role";
import {debounce} from "lodash";

//Interface
  interface IQuery {
    page?: number
    limit?: number,
    sortBy?: string | null
    orderBy?: string | null
    total: number
    type?: string | null | undefined
  }
  @Component({ components: { FilterMetamart, TabNft, TabCollection } })
  export default class BOCustomer extends Vue {
    tabs: Array<Record<string, any>> = [
      {
        id: 1,
        title: 'metamart-nft',
        routeName: 'Nft'
      },
      {
        id: 2,
        title: 'metamart-collection',
        routeName: 'Collection'
      }
    ]

    tabActive = 'Pending'
    isLoading = false
    isChangeTab = false
    isConflickClick = false

    type = 'add'

    data: Array<Record<string, any>> = []

    detailRow = {}

    query: IQuery = {
      page: 1,
      limit: 10,
      total: 20,
      sortBy: 'name',
      orderBy: 'desc',
      type: null
    }
    created(): void {
      // if (!this.checkPemission('customer', ['view'])) {
      //   const routeName = MODULE_WITH_ROUTENAME[this.listModuleCanView[0].module]
      //   this.$router.push({ name: routeName })
      //   return
      // }

      const name = this.$route.name!
      this.query.type = this.objType[name]
      this.init();
    }
    async init(): Promise<void> {
      try {
        this.isLoading = true
        // if (!this.query.type) {
        //   const routeName = this.$route.name!
        //   this.query.type = this.objType[routeName]
        // }
        const result = await axios.get(`https://626362ffc430dc560d2e80d3.mockapi.io/api/v1/CardCollection/`,{params: {...this.query, total:null}})
        //
        console.log(result);
        this.data = result.data.items || []
        this.query.total = result.data.count
        this.isLoading = false
      } catch (error) {
        this.isLoading = false
        console.log(error)
      }
    }

    objType: Record<string, any> = {
      MemberActive: 'ACTIVE',
      MemberInactive: 'INACTIVE'
    }

    handleChangeTab(tab: Record<string, any>): void {
      this.isChangeTab = tab.id !== 1
      this.$router.push({ name: tab.routeName }).catch(() => {
        return
      })
      if(this.isChangeTab && tab.id === 2){
        this.init()
      }
    }

    //handleChangeSize
    handleSizeChange(size: number): void {
      this.query.limit = size
      this.init();
    }
    handlePageChange(page: number): void{
      this.query.page = page
      this.init();
    }
  }
</script>

<style scoped lang="scss">
  .bo-metamart {
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
