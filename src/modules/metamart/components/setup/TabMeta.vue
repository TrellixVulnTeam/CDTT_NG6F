<template>
  <div class="tab-meta">
    <div class="tab-meta__tabs">
      <div
        v-for="item in metaTypes"
        :key="item.id"
        class="text-base text-desc tab-item"
        :class="idTabActive === item.metaTypeId ? 'tab-active' : null"
        @click="handleChangeTab(item)"
      >
        {{ getName(item.metaTypeName) }}
      </div>
    </div>
    <div class="tab-meta__content" v-loading="isLoading">
      <keep-alive>
        <component :is="getComponent" class="flex-1" :tabActive="tabActive" :metaData="metaData" @update="handleUpdate" />
      </keep-alive>
      <preview-meta-data :tabActive="tabActive" :metaData="metaData" />
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import TabText from './TabText.vue'
  import TabHtml from './TabHtml.vue'
  import TabMap from './TabMap.vue'
  import TabFile from './TabFile.vue'
  import TabBoolean from './TabBoolean.vue'
  import PreviewMetaData from './PreviewMetaData.vue'

  import { namespace } from 'vuex-class'
  const bcNft = namespace('bcNft')

  import { IMetaTypes } from '../../interface'

  @Component({ components: { TabText, PreviewMetaData, TabHtml, TabMap, TabFile, TabBoolean } })
  export default class TabMetaData extends Vue {
    @bcNft.State('metaTypes') metaTypes!: IMetaTypes[]
    isLoading = false

    tabActive = 'TEXT'
    idTabActive = 0

    metaData: Array<Record<string, any>> = [
      {
        id: 0,
        type: 'TEXT',
        value: ''
      },
      {
        id: 1,
        type: 'HTML',
        value: '<p><strong><em><u>đây là mô tả</u></em></strong></p>'
      },
      {
        id: 2,
        type: 'MAP',
        value: [
          {
            id: 0,
            name: 'Project',
            desc: 'Crystal Holidays',
            annotate: '',
            type: 'text'
          },
          {
            id: 1,
            name: 'Week',
            desc: '18 weeks',
            annotate: '',
            type: 'text'
          },
          {
            id: 2,
            name: 'High season',
            annotate: 'a week per year',
            desc: 'From 21st April',
            type: 'text'
          }
        ]
      },
      {
        id: 3,
        type: 'FILE',
        value: [{ id: 0, name: 'eBrochures PDF', fileType: 'PDF', size: 1539060, fileName: 'eBrochures' }]
      },
      {
        id: 4,
        type: 'BOOLEAN',
        value: [{ id: 0, name: 'Community room', status: true }]
      }
    ]

    get getComponent(): string {
      switch (this.tabActive) {
        case 'TEXT':
          return 'TabText'
        case 'HTML':
          return 'TabHtml'
        case 'MAP':
          return 'TabMap'
        case 'FILE':
          return 'TabFile'
        default:
          return 'TabBoolean'
      }
    }

    created(): void {
      this.idTabActive = this.metaTypes[0].metaTypeId
      this.tabActive = this.metaTypes[0].typeTab
    }

    getName(metaTypeName: string): string {
      const language = localStorage.getItem('bc-lang') || ''
      const parseJson = JSON.parse(metaTypeName)
      return parseJson[language]
    }

    handleChangeTab(item: IMetaTypes): void {
      this.tabActive = item.typeTab
      this.idTabActive = item.metaTypeId
    }

    handleUpdate(data: Array<Record<string, any>>): void {
      console.log('>?', data)

      this.metaData = [...data]
    }
  }
</script>

<style scoped lang="scss">
  ::v-deep.tab-meta {
    &__tabs {
      display: flex;
      border-bottom: 1px solid #dbdbdb;
      margin-bottom: 24px;
      .tab-item {
        padding: 0 12px 16px;
        cursor: pointer;
        &:hover {
          color: var(--bc-text-hyperlink);
        }
      }
      .tab-active {
        color: var(--bc-text-hyperlink);
        font-weight: 600;
        border-bottom: 2px solid var(--bc-text-hyperlink);
      }
    }

    &__content {
      display: flex;
      margin-bottom: 24px;
      .flex-1 {
        flex: 1;
      }
      .preview {
        width: 360px;
        margin-left: 24px;
      }
    }
  }
</style>
