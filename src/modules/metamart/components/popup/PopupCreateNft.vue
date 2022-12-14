<template>
  <base-popup name="popup-create-nft" class="popup-create-nft" width="1280px" :close="handleClose" :open="handleOpen">
    <div class="title-popup" slot="title">
      <span> {{ typePopup === 'add' ? $t('popup_add-nft') : $t('popup_edit-nft') }}</span>
    </div>
    <div class="content">
      <div class="content__sidebar">
        <div
          v-for="item in listTabSidebar"
          :key="item.value"
          class="text-base text-disable mb-24 cursor menu-item"
          :class="tabActive === item.value ? 'tab-active' : null"
          @click="tabActive = item.value"
        >
          <p>{{ item.title }}</p>
          <base-icon v-if="item.value === 'INFO' && isInvalidInfo" icon="icon-alert" size="24" class="d-iflex" style="padding-left: 10px" />
          <base-icon v-if="item.value === 'BLOCKCHAIN' && isInvalidBlockchain" icon="icon-alert" size="24" class="d-iflex" style="padding-left: 10px" />
        </div>
      </div>
      <div class="content__main">
        <!-- <tab-info :typePopup="typePopup" /> -->
        <!-- <keep-alive> -->
        <component :is="getComponent" :typePopup="typePopup" @selectCollection="handleSelectCollection" @findCollection="handleFindCollection" />
        <!-- </keep-alive> -->
      </div>
    </div>
    <div class="footer footer-popup" slot="footer">
      <div class="wrap-button">
        <div class="btn-right">
          <el-button class="btn-default btn-400 btn-h-40 btn-close" @click="handleCancel">{{ $t('button.cancel') }}</el-button>
          <el-button class="btn-default-bg btn-400 btn-h-40 is-none-border btn-save" style="font-size: 14px" @click="handleSubmit">
            {{ typePopup === 'add' ? $t('button.create') : $t('button.save') }}
          </el-button>
        </div>
      </div>
    </div>
  </base-popup>
</template>

<script lang="ts">
  import { Component, Mixins, Prop, Watch } from 'vue-property-decorator'

  import TabInfo from '../setup/TabInfo.vue'
  import TabBlockchain from '../setup/TabBlockchain.vue'
  import TabSetting from '../setup/TabSetting.vue'
  import TabMetaData from '../setup/TabMeta.vue'

  import PopupMixin from '@/mixins/popup'

  import filter from 'lodash/filter'

  import getRepository from '@/services'
  import { NftRepository } from '@/services/repositories/nft'
  const apiNft: NftRepository = getRepository('nft')

  import { namespace } from 'vuex-class'
  import EventBus from '@/utils/eventBus'
  import { trim } from 'lodash'
  const bcNft = namespace('bcNft')

  @Component({ components: { TabInfo, TabBlockchain, TabSetting, TabMetaData } })
  export default class PopupCreateNft extends Mixins(PopupMixin) {
    @Prop({ required: false, type: String, default: 'add' }) typePopup!: 'add' | 'edit'

    @bcNft.Mutation('SET_LIST_COLLECTION') setListCollection!: (list: Array<Record<string, any>>) => void
    @bcNft.Mutation('SET_LIST_ORIGIN_COLLECTION') setListOriginCollection!: (list: Array<Record<string, any>>) => void
    @bcNft.Mutation('SET_LIST_CATEGORY') setListCategory!: (list: Array<Record<string, any>>) => void
    @bcNft.Mutation('SET_INIT_NFT') setInitInfo!: (info: Record<string, any>) => void
    @bcNft.Mutation('RESET_INIT') resetInit!: () => void
    @bcNft.Mutation('SET_INIT_FORM_BLOCKCHAIN') setInitFormBlockchain!: (collection: Record<string, any>) => void
    @bcNft.Action('getTemplateMetaData') getTemplateMetaData!: (id: number) => void

    @bcNft.State('initInfo') initInfo!: Record<string, any>
    @bcNft.State('initBlockchain') initBlockchain!: Record<string, any>
    @bcNft.State('metaDatas') metaDatas!: Array<Record<string, any>>
    @bcNft.State('metaTypes') metaTypes!: Array<Record<string, any>>
    @bcNft.State('initSetting') initSetting!: Record<string, any>
    @bcNft.State('listOriginCollection') listOriginCollection!: Array<Record<string, any>>

    arrTab: Array<Record<string, any>> = [
      {
        title: this.$t('label_information'),
        value: 'INFO'
      },
      {
        title: this.$t('label_blockchain'),
        value: 'BLOCKCHAIN'
      }
      // {
      //   title: this.$t('label_metadata'),
      //   value: 'META'
      // },
      // {
      //   title: this.$t('label_setting'),
      //   value: 'SETTING'
      // }
    ]

    tabActive = 'INFO'

    isInvalidInfo = false
    isInvalidBlockchain = false

    listCategory: Array<Record<string, any>> = []

    @Watch('initInfo', { deep: true, immediate: true }) handleWatchInfo(): void {
      if (this.isInvalidInfo) {
        const form = {
          ...this.initInfo,
          ...this.initBlockchain,
          ...this.initSetting,
          totalSupply: this.initBlockchain.totalMint,
          avatar: this.initInfo.thumb,
          metaDatas: this.metaDatas
        }
        this.checkIsValidForm(form)
      }
    }
    @Watch('initBlockchain', { deep: true, immediate: true }) handleWatchBlockchain(): void {
      if (this.isInvalidBlockchain) {
        this.checkIsValidBlockchain()
      }
    }

    get listTabSidebar(): Array<Record<string, any>> {
      if (this.metaTypes.length) {
        return [
          ...this.arrTab,
          {
            title: this.$t('label_metadata'),
            value: 'META'
          },
          {
            title: this.$t('label_setting'),
            value: 'SETTING'
          }
        ]
      } else {
        return [
          ...this.arrTab,
          {
            title: this.$t('label_setting'),
            value: 'SETTING'
          }
        ]
      }
    }

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
      this.listCategory = []
      this.resetInit()
    }

    async handleOpen(): Promise<void> {
      /*
      C??c data ????? binding v???i c??c form l??u ??? trong bcNft
      */

      this.isInvalidInfo = false
      this.isInvalidBlockchain = false
      this.tabActive = 'INFO'

      const result = await apiNft.getNftCollection({ page: 1, limit: 1000 })
      let listCategory: Record<string, any> = {}

      if (this.typePopup === 'add') {
        this.setInitInfo({ ...this.initInfo, collectionId: result.content[0].id })
        listCategory = await apiNft.getCategories({ parentId: result.content[0].categoryId, onlyOneTree: 1 })
        this.setInitFormBlockchain(result.content[0])
        this.getTemplateMetaData(result.content[0].id)
        this.recursiveCategoryChild([listCategory])
      } else {
        listCategory = await apiNft.getCategories({ parentId: this.initInfo.categoryId, onlyOneTree: 1 })
        this.recursiveCategoryChild([listCategory])
      }

      this.setListCollection(result.content)
      this.setListOriginCollection(result.content)
      this.setListCategory(this.listCategory)

      // this.$nextTick(() => {
      //   this.handleFillValueDescription()
      // })
    }

    recursiveCategoryChild(list: Array<Record<string, any>>): void {
      for (let i = 0; i < list.length; i++) {
        const lastElm = this.listCategory[this.listCategory.length - 1]
        if (!lastElm) {
          list[i].levelDepth = 0
        } else {
          if (lastElm.levelDepth < list[i].levelDepth) {
            list[i].levelDepth = lastElm.levelDepth + 1
          }
        }

        this.listCategory.push(list[i])
        if (list[i].subCategory !== null) {
          const listParent = filter(list[i].subCategory, value => value.parentId === list[i].id)
          this.recursiveCategoryChild(listParent)
        }
      }
    }

    handleFillValueDescription(): void {
      // set value cho shortDescription, description ??? component FormInfo
      const refFormInfo = this.$root.$refs.FormInfo
      const language = localStorage.getItem('bc-lang') || ''
      if (this.typePopup === 'edit') {
        const parseJsonShortDescription = JSON.parse(this.initInfo.shortDescription)
        const parseJsonDescription = JSON.parse(this.initInfo.description)
        //@ts-ignore
        refFormInfo.shortDescription = parseJsonShortDescription[language]
        //@ts-ignore
        refFormInfo.description = parseJsonDescription[language]
        //@ts-ignore
        console.log(refFormInfo.description)
      } else {
        //@ts-ignore
        refFormInfo.shortDescription = this.initInfo.shortDescription
        //@ts-ignore
        refFormInfo.description = this.initInfo.description
      }
    }

    async handleSelectCollection(collection: Record<string, any>): Promise<void> {
      console.log(collection)
      this.setListCollection(this.listOriginCollection)
      this.listCategory = []
      const listCategory = await apiNft.getCategories({ parentId: collection.categoryId, onlyOneTree: 1 })
      this.recursiveCategoryChild([listCategory])
      this.setListCategory(this.listCategory)
      this.setInitFormBlockchain(collection)
      this.getTemplateMetaData(collection.id)
    }

    checkIsValidForm(form: Record<string, any>): void {
      const listValueCheckInfo = ['categoryId', 'productCode', 'itemName', 'thumb', 'medias', 'shortDescription', 'description']

      for (let index = 0; index < listValueCheckInfo.length; index++) {
        if (listValueCheckInfo[index] === 'medias' && !form[listValueCheckInfo[index]].length) {
          console.log(listValueCheckInfo[index])
          this.isInvalidInfo = true
          break
        } else if (listValueCheckInfo[index] === 'description' && form[listValueCheckInfo[index]] === '<p><br></p>') {
          this.isInvalidInfo = true
          break
        } else if (!form[listValueCheckInfo[index]]) {
          this.isInvalidInfo = true
          break
        } else {
          this.isInvalidInfo = false
        }
      }
    }

    checkIsValidBlockchain(): void {
      if (!this.initBlockchain.totalMint) {
        this.isInvalidBlockchain = true
      } else {
        this.isInvalidBlockchain = false
      }
    }

    async handleSubmit(): Promise<void> {
      try {
        const form: Record<string, any> = {
          ...this.initInfo,
          ...this.initBlockchain,
          ...this.initSetting,
          totalSupply: this.initBlockchain.totalMint,
          avatar: this.initInfo.thumb,
          metaDatas: this.metaDatas
        }
        this.checkIsValidForm(form)
        this.checkIsValidBlockchain()

        console.log(this.isInvalidInfo)
        let message = ''
        if (!this.isInvalidInfo && !this.isInvalidBlockchain) {
          if (this.typePopup === 'add') {
            await apiNft.createNft(form)
            message = this.$t('notify_add-nft-success') as string
          } else {
            form.avatarType = form.mediaType
            await apiNft.updateNft({ ...form, itemId: this.initInfo.id })
            message = this.$t('notify_edit-nft-success') as string
          }
          this.$message.success({ message, duration: 5000 })

          this.setOpenPopup({
            popupName: 'popup-create-nft',
            isOpen: false
          })
        }
        this.$emit('reload')
      } catch (error) {
        console.log(error)
      }
    }

    async handleFindCollection(text: string): Promise<void> {
      const result = await apiNft.getNftCollection({ page: 1, limit: 1000, search: trim(text) })
      this.setListCollection(result.content)
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
          display: flex;
          align-items: center;
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
