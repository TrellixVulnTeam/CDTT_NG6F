<template>
  <div class="preview">
    <div class="mb-24 tab">
      <p class="text-hyperlink text-base text-semibold">{{ getTitle }}</p>
    </div>
    <div class="content">
      <!-- type text -->
      <div class="type-text" v-if="tabActive === 'TEXT'">
        <p v-if="data.value" class="text-base break-work" v-html="data.value" />
        <p v-else class="text-base text-disable">{{ $t('label_long-desc') }}</p>
      </div>

      <!-- type html -->
      <div class="type-html" v-if="tabActive === 'HTML'">
        <div v-html="data.value"></div>
      </div>

      <!-- type map -->
      <div class="type-map" v-if="tabActive === 'MAP'">
        <div v-for="item in data.value" :key="item.id" class="be-flex align-center jc-space-between map-item">
          <div class="left">
            <div class="text-base text-overflow-1">{{ item.name }}</div>
            <div class="text-sm text-desc text-overflow-1" v-if="item.annotate">({{ item.annotate }})</div>
          </div>
          <div class="text-right right">
            <div class="text-base text-desc text-overflow-1">{{ item.desc }}</div>
          </div>
        </div>
      </div>

      <!-- type file -->
      <div class="type-file" v-if="tabActive === 'FILE'">
        <div v-for="file in data.value" :key="file.id" class="be-flex align-center file">
          <base-icon :icon="getIconFile(file)" size="48" class="d-iflex" />
          <div class="info">
            <p class="text-overflow-1 text-base text-semibold">{{ file.name }}</p>
            <div class="be-flex align-center">
              <span class="text-desc nft-body-small">{{ file.size | bytesToSize }}</span>
              <div class="circle"></div>
              <div class="be-flex align-center">
                <base-icon icon="icon-download-blue" size="24" class="d-iflex" />
                <span class="text-hyperlink nft-body-small" style="padding-left: 6px">{{ $t('label_download') }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- type boolean -->
      <div class="type-boolean" v-if="tabActive === 'BOOLEAN'">
        <div v-for="item in data.value" :key="item.id" class="be-flex align-center feature">
          <base-icon v-if="item.status" icon="icon-tick" size="20" class="d-iflex" />
          <base-icon v-else icon="icon-x-red" size="20" class="d-iflex" />
          <p class="text-base text-overflow-1" style="color: #28344b">{{ item.name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
  import filter from 'lodash/filter'
  import includes from 'lodash/includes'

  @Component
  export default class PreviewMetaData extends Vue {
    @Prop({ required: false, type: String, default: 'DESC' }) tabActive!: string
    @Prop({ required: false, type: Array, default: () => [] }) metaData!: Array<Record<string, any>>

    data: Record<string, any> = {}

    @Watch('tabActive') watchTabActive(): void {
      this.data = filter(this.metaData, elm => elm.type === this.tabActive)[0]
    }

    get getTitle(): string {
      switch (this.tabActive) {
        case 'TEXT':
          return this.$t('tab_description') as string
        case 'HTML':
          return this.$t('tab_detail') as string
        case 'MAP':
          return this.$t('tab_polices') as string
        case 'FILE':
          return this.$t('tab_ebrochures') as string
        default:
          return this.$t('tab_feature') as string
      }
    }

    created(): void {
      this.data = filter(this.metaData, elm => elm.type === this.tabActive)[0]
    }

    getIconFile(file: Record<string, any>): string {
      const arrFileWord = ['doc', 'docx']
      const arrFilePdf = ['pdf']
      const fileType = file.fileType.toLowerCase()
      return includes(arrFileWord, fileType) ? 'icon-word' : includes(arrFilePdf, fileType) ? 'icon-pdf' : 'icon-excel'
    }
  }
</script>

<style scoped lang="scss">
  ::v-deep.preview {
    width: 360px;
    padding: 24px;
    border: 1px solid #dbdbdb;
    border-radius: 8px;

    .tab {
      border-bottom: 1px solid #dbdbdb;
      p {
        padding: 0 12px 14px;
        position: relative;
        &::after {
          content: '';
          position: absolute;
          width: 100%;
          height: 2px;
          background: #0151fc;
          bottom: 0;
          left: 0;
        }
      }
    }

    .type-html {
      strong {
        font-weight: bold;
      }
      em {
        font-style: italic;
      }
      ul,
      ol {
        padding-left: 20px;
        list-style: initial;
        li {
          list-style: unset;
        }
      }
    }

    .type-map {
      .map-item {
        margin-bottom: 16px;
        .left,
        .right {
          width: 50%;
        }
      }
    }

    .type-file {
      .file {
        margin-bottom: 32px;
        .info {
          margin-left: 16px;
          p {
            margin-bottom: 4px;
          }
          .circle {
            width: 4px;
            height: 4px;
            margin: 0 8px;
            border-radius: 50%;
            background: #dbdbdb;
          }
        }
      }
    }

    .type-boolean {
      .feature {
        margin-bottom: 24px;
        p {
          margin-left: 8px;
        }
      }
    }
  }
</style>
