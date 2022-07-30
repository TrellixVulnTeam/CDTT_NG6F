<template>
  <div class="w-100 bo-metamart">
    <div class="bg-white wallet-header">
      <div class="be-flex align-center jc-space-between wallet-header__above">
        <div class="wallet-header__above-tabs be-flex">
          <div class="tab-item cursor" v-for="tab in tabs" :key="tab.id" :class="$route.name === tab.routeName ? 'tab-active' : null" @click="handleChangeTab(tab)">
            <span class="text-base">{{ $t(`menu.${tab.title}`) }}</span>
          </div>
        </div>
        <!-- <el-button type="primary" @click="handleOpen('popup-choosetype')" style="margin-right: 24px;">Create</el-button> -->
      </div>
    </div>
    <filter-metamart :tabs="tabs" isChangeTab="isChangeTab" @click="handleOpen" @selectCommand="handleSelectCommand" />
    <tab-nft v-if="$route.name === 'Nft'" @sizeChange="handleSizeChange" @pageChange="handlePageChange" :nftProps="nftData" :query="query" v-loading="isLoading"  @selectCommand="handleSelectCommand" />
    <tab-collection v-if="$route.name === 'Collection'" @sizeChange="handleSizeChange" @pageChange="handlePageChange" :query="query" :data="collectionData" v-loading="isLoading" />
    <tab-category v-if="$route.name === 'Category'" @sizeChange="handleSizeChange" @pageChange="handlePageChange" :query="query" :data="collectionData" v-loading="isLoading" />

    <popup-choosetype @continues="handleToPopupform($event)" />
    <popup-form @collection="handleOpenCreate($event)" />
    <popup-create />
    <popup-create-collection />
    <popup-create-nft />
    <popup-public-onchain />
    <popup-delete :type="deleteType"/>
  </div>
</template>

<script lang="ts">
  import { Component, Mixins } from 'vue-property-decorator'
  import FilterMetamart from '../components/filter/FilterMetamart.vue'
  import TabNft from '../components/TabNft.vue'
  import TabCategory from '../components/TabCategory.vue'
  import TabCollection from '../components/TabCollection.vue'
  import PopupForm from '../components/popup/PopupForm.vue'
  import PopupChoosetype from '../components/popup/ChooseType.vue'
  import PopupCreate from '../components/popup/PopupCreate.vue'
  import PopupCreateCollection from '../components/popup/PopupCreateCollection.vue'
  import PopupCreateNft from '../components/popup/PopupCreateNft.vue'
  import PopupPublicOnchain from '../components/popup/PopupPublicOnchain.vue'
  import PopupDelete from '../components/popup/PopupDelete.vue'
  import PopupMixin from '@/mixins/popup'
  import axios from 'axios'
  //Interface
  interface IQuery {
    page?: number
    limit?: number
    sortBy?: string | null
    orderBy?: string | null
    total: number
    type?: string | null | undefined
  }

  @Component({ components: { FilterMetamart, TabNft, TabCollection, TabCategory, PopupChoosetype, PopupCreateCollection, PopupForm, PopupCreate, PopupCreateNft, PopupPublicOnchain, PopupDelete } })
  export default class Metamart extends Mixins(PopupMixin) {
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
      },
      {
        id: 3,
        title: 'metamart-category',
        routeName: 'Category'
      }
    ]

    collectionData: Array<Record<string, any>> = []
    nftData: Array<Record<string, any>> = []

    query: IQuery = {
      page: 1,
      limit: 10,
      total: 20,
      sortBy: 'name',
      orderBy: 'desc',
      type: null
    }
    
    deleteType = ''
    // objType: Record<string, any> = {
    //   Nft: 'Nft',
    //   Collection: 'Collection'
    // }
    created(): void {
      this.init()
    }
    async getNftItem(): Promise<void> {
      try {
        this.isLoading = true
        const result = await axios.get(`https://627220cac455a64564bc4e6a.mockapi.io/api/nft/nftItem`, { params: { ...this.query, total: null } })
        console.log('nft called', result)
        this.nftData = result.data.items || []
        this.query.total = result.data.count
        this.isLoading = false
      } catch (error) {
        this.isLoading = false
        console.log(error)
      }
    }
    async getCollection(): Promise<void> {
      try {
        this.isLoading = true
        const result = await axios.get(`https://626362ffc430dc560d2e80d3.mockapi.io/api/v1/CardCollection/`, { params: { ...this.query, total: null } })
        console.log('collection called', result)
        this.collectionData = result.data.items || []
        this.query.total = result.data.count
        this.isLoading = false
      } catch (error) {
        this.isLoading = false
        console.log(error)
      }
    }

    tabActive = 'Pending'
    isLoading = false
    isChangeTab = false
    isConflickClick = false
    type = 'add'
    isOpen = false
    direction = ''
    data: Array<Record<string, any>> = []

    async init(): Promise<void> {
      if (this.$route.name === 'Nft') await this.getNftItem()
      if (this.$route.name === 'Collection') await this.getCollection()
      if (this.$route.name === 'Category') await this.getCollection()
    }

    resetQuery(): void {
      this.query = { ...this.query, page: 1, limit: 10 }
    }

    handleChangeTab(tab: Record<string, any>): void {
      console.log('tab', tab)
      this.isChangeTab = tab.id !== 1
      this.$router
        .push({ name: tab.routeName })
        .then(() => {
          this.resetQuery()
        })
        .catch(() => {
          return
        })
      if (this.isChangeTab && tab.id === 2) {
        this.getCollection()
      } else {
        this.getNftItem()
      }
    }

    //handleChangeSize
    handleSizeChange(size: number): void {
      this.query.limit = size
      this.init()
    }
    handlePageChange(page: number): void {
      this.query.page = page
      this.init()
    }
    handleOpen(popupName: string) {
      this.setOpenPopup({
        popupName: popupName,
        isOpen: true
      })
    }
    handleToPopupform(direction: string): void {
      console.log(direction)
      if (direction === '2') {
        this.setOpenPopup({
          popupName: 'popup-choosetype',
          isOpen: false
        })
        setTimeout(() => {
          this.setOpenPopup({
            popupName: 'popup-form',
            isOpen: true
          })
        }, 200)
      }
    }
    handleOpenCreate(collection: string): void {
      if (collection === '1') {
        this.setOpenPopup({
          popupName: 'popup-create',
          isOpen: true
        })
      }
    }
    handleCreateItem(isAllowed: boolean): void {
      if (isAllowed) {
        this.setOpenPopup({
          popupName: 'popup-form',
          isOpen: false
        })
      }
    }

    handleSelectCommand(command: string): void {
      if (command === 'add-nft') {
        this.setOpenPopup({
          popupName: 'popup-create-nft',
          isOpen: true
        })
      } else if (command === 'public-on-chain') {
        this.setOpenPopup({
          popupName: 'popup-public-onchain',
          isOpen: true
        })
      } else if (command === 'delete-nft') {
        this.deleteType = 'delete-nft'
        this.setOpenPopup({
          popupName: 'popup-metamart-delete',
          isOpen: true
        })
      }
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
