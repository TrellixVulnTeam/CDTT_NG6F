<template>
  <base-popup name="popup-create-nft" class="popup-create-nft" width="1280px" :close="handleClose" :open="handleOpen">
    <div class="title-popup" slot="title">
      <span> {{ typePopup === 'add' ? $t('popup_add-nft') : $t('popup_edit-nft') }}</span>
    </div>
    <div class="content">
      <div class="content__sidebar">
        <div
          v-for="item in arrTab"
          :key="item.value"
          class="text-base text-disable mb-24 cursor menu-item"
          :class="tabActive === item.value ? 'tab-active' : null"
          @click="tabActive = item.value"
        >
          {{ item.title }}
        </div>
      </div>
      <div class="content__main">
        <!-- <tab-info :typePopup="typePopup" /> -->
        <!-- <keep-alive> -->
        <component :is="getComponent" :typePopup="typePopup" @selectCollection="handleSelectCollection" />
        <!-- </keep-alive> -->
      </div>
    </div>
    <div class="footer footer-popup" slot="footer">
      <div class="wrap-button">
        <div class="btn-right">
          <el-button class="btn-default btn-400 btn-h-40 btn-close" @click="handleCancel">{{ $t('button.cancel') }}</el-button>
          <el-button class="btn-default-bg btn-400 btn-h-40 is-none-border btn-save" style="font-size: 14px">{{ $t('button.create') }}</el-button>
        </div>
      </div>
    </div>
  </base-popup>
</template>

<script lang="ts">
  import { Component, Mixins, Prop } from 'vue-property-decorator'

  import TabInfo from '../setup/TabInfo.vue'
  import TabBlockchain from '../setup/TabBlockchain.vue'
  import TabSetting from '../setup/TabSetting.vue'
  import TabMetaData from '../setup/TabMeta.vue'

  import PopupMixin from '@/mixins/popup'

  import getRepository from '@/services'
  import { NftRepository } from '@/services/repositories/nft'
  const apiNft: NftRepository = getRepository('nft')

  import { namespace } from 'vuex-class'
  const bcNft = namespace('bcNft')

  @Component({ components: { TabInfo, TabBlockchain, TabSetting, TabMetaData } })
  export default class PopupCreateNft extends Mixins(PopupMixin) {
    @Prop({ required: false, type: String, default: 'add' }) typePopup!: 'add' | 'edit'

    @bcNft.Mutation('SET_LIST_COLLECTION') setListCollection!: (list: Array<Record<string, any>>) => void
    @bcNft.Mutation('SET_LIST_CATEGORY') setListCategory!: (list: Array<Record<string, any>>) => void
    @bcNft.Mutation('SET_INIT_NFT') setInitInfo!: (info: Record<string, any>) => void
    @bcNft.Mutation('RESET_INIT') resetInit!: () => void
    @bcNft.Action('getTemplateMetaData') getTemplateMetaData!: (id: number) => void
    @bcNft.State('initInfo') form!: Record<string, any>

    arrTab: Array<Record<string, any>> = [
      {
        title: this.$t('label_information'),
        value: 'INFO'
      },
      {
        title: this.$t('label_blockchain'),
        value: 'BLOCKCHAIN'
      },
      {
        title: this.$t('label_metadata'),
        value: 'META'
      },
      {
        title: this.$t('label_setting'),
        value: 'SETTING'
      }
    ]

    tabActive = 'INFO'

    get getComponent(): string {
      switch (this.tabActive) {
        case 'INFO':
          return 'TabInfo'
        case 'BLOCKCHAIN':
          return 'TabBlockchain'
        case 'SETTING':
          return 'TabSetting'
        default:
          return 'TabMetaData'
      }
    }

    handleClose(): void {
      this.resetInit()
    }

    async handleOpen(): Promise<void> {
      this.tabActive = 'INFO'
      const result = await apiNft.getNftCollection({ page: 1, limit: 1000 })
      const listCategory = await apiNft.getCategories({ parentId: result.content[0].categoryId, onlyOneTree: 1 })

      if (this.typePopup === 'add') {
        this.setInitInfo({ ...this.form, collectionId: result.content[0].id })
      }

      this.setListCollection(result.content)
      this.setListCategory(listCategory.content)
      this.getTemplateMetaData(result.content[0].id)
    }

    async handleSelectCollection(collection: Record<string, any>): Promise<void> {
      console.log(collection)

      const result = await apiNft.getNftCollection({ page: 1, limit: 1000 })
      const listCategory = await apiNft.getCategories({ parentId: collection.categoryId, onlyOneTree: 1 })

      this.setListCollection(result.content)
      this.setListCategory(listCategory.content)
      this.getTemplateMetaData(collection.id)
    }

    handleCancel(): void {
      this.resetInit()
      this.setOpenPopup({
        popupName: 'popup-create-nft',
        isOpen: false
      })
    }
  }
</script>

<style scoped lang="scss">
  .popup-create-nft {
    .content {
      display: flex;
      &__sidebar {
        width: 100px;
        margin-right: 100px;
        .menu-item {
          &:hover {
            color: var(--bc-text-primary);
          }
        }
        .tab-active {
          color: var(--bc-text-primary);
        }
      }

      &__main {
        flex: 1;
      }
    }
  }
  ::v-deep.footer-popup {
    .btn-save {
      width: 100px;
      height: 40px;
      font-weight: 400;
    }
  }
</style>
