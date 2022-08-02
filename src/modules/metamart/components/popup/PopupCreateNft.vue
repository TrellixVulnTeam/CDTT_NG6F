<template>
  <base-popup name="popup-create-nft" class="popup-create-nft" width="1280px" :close="handleClose">
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
        <keep-alive>
          <component :is="getComponent" :typePopup="typePopup" />
        </keep-alive>
      </div>
    </div>
    <div class="footer footer-popup" slot="footer">
      <div class="wrap-button">
        <div class="btn-right">
          <el-button class="btn-default btn-400 btn-h-40 btn-close">{{ $t('button.cancel') }}</el-button>
          <el-button class="btn-default-bg btn-400 btn-h-40 is-none-border btn-save" style="font-size: 14px">{{ $t('button.create') }}</el-button>
        </div>
      </div>
    </div>
  </base-popup>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'

  import TabInfo from '../setup/TabInfo.vue'
  import TabBlockchain from '../setup/TabBlockchain.vue'
  import TabSetting from '../setup/TabSetting.vue'
  import TabMetaData from '../setup/TabMeta.vue'

  @Component({ components: { TabInfo, TabBlockchain, TabSetting, TabMetaData } })
  export default class PopupCreateNft extends Vue {
    @Prop({ required: false, type: String, default: 'add' }) typePopup!: 'add' | 'edit'

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
      return
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
