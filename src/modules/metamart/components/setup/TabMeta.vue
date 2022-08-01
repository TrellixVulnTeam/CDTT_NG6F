<template>
  <div class="tab-meta">
    <div class="tab-meta__tabs">
      <div
        v-for="item in metaTypes"
        :key="item.id"
        class="text-base text-desc tab-item"
        :class="tabActive === item.value ? 'tab-active' : null"
        @click="handleChangeTab(item.value)"
      >
        {{ item.title }}
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
  import PreviewMetaData from './PreviewMetaData.vue'

  @Component({ components: { TabText, PreviewMetaData, TabHtml, TabMap } })
  export default class TabMetaData extends Vue {
    isLoading = false
    tabActive = 'TEXT'
    metaTypes: Array<Record<string, any>> = [
      {
        id: 0,
        title: this.$t('tab_description'),
        value: 'TEXT'
      },
      {
        id: 1,
        title: this.$t('tab_detail'),
        value: 'HTML'
      },
      {
        id: 2,
        title: this.$t('tab_polices'),
        value: 'MAP'
      },
      {
        id: 3,
        title: this.$t('tab_ebrochures'),
        value: 'FILE'
      },
      {
        id: 4,
        title: this.$t('tab_feature'),
        value: 'BOOLEAN'
      }
    ]

    metaData: Array<Record<string, any>> = [
      {
        id: 0,
        type: 'TEXT',
        value: '111'
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
            annotate: ''
          },
          {
            id: 1,
            name: 'Week',
            desc: '18 weeks',
            annotate: ''
          },
          {
            id: 2,
            name: 'High season',
            annotate: 'a week per year',
            desc: 'From 21st April'
          }
        ]
      },
      {
        id: 3,
        type: 'FILE',
        value: [{ id: 0, name: 'eBrochures PDF', type: 'PDF', size: '10 MB' }]
      },
      {
        id: 4,
        type: 'BOOLEAN',
        value: [{ id: 0, name: 'Community room', status: false }]
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
          return 'TabEbro'
        default:
          return 'BOOLEAN'
      }
    }

    handleChangeTab(value: string): void {
      this.isLoading = true
      this.tabActive = value
      this.isLoading = false
    }

    handleUpdate(data: Array<Record<string, any>>): void {
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
