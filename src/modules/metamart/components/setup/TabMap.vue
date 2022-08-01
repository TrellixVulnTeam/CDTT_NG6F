<template>
  <div class="tab-map">
    <base-table :data="data" :showPagination="false">
      <el-table-column :label="$t('label_nft-name')" prop="name">
        <template slot-scope="scope">
          <p>{{ scope.row.name }}</p>
          <p class="nft-body-small text-desc" v-if="scope.row.annotate">({{ scope.row.annotate }})</p>
        </template>
      </el-table-column>
      <el-table-column :label="$t('label_long-desc')" prop="desc" align="right"> </el-table-column>
      <el-table-column align="right" width="100px">
        <template>
          <span>
            <base-icon icon="icon-edit" size="20" />
          </span>
          <span style="padding-left: 16px">
            <base-icon icon="icon-delete-2" size="20" />
          </span>
        </template>
      </el-table-column>
      <div class="append" slot="append">
        <div class="be-flex align-center cursor" @click="handleClickAdd">
          <base-icon icon="icon-add-circle" size="40" />
          <span class="text-hyperlink text-sm" style="padding-left: 12px">{{ $t('label_add-policy') }}</span>
        </div>
      </div>
    </base-table>
    <popup-add-map :typePopup="typePopup" @confirm="handleConfirm" />
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Mixins } from 'vue-property-decorator'
  import filter from 'lodash/filter'
  import debounce from 'lodash/debounce'
  import findIndex from 'lodash/findIndex'

  import PopupMixin from '@/mixins/popup'
  import PopupAddMap from './PopupAddMap.vue'

  @Component({ components: { PopupAddMap } })
  export default class TabMap extends Mixins(PopupMixin) {
    @Prop({ required: false, type: Array, default: [] }) metaData!: Array<Record<string, any>>
    @Prop({ required: false, type: String, default: '' }) tabActive!: string

    data: Record<string, any> | Array<Record<string, any>> = {}
    typePopup = 'add'

    created(): void {
      const elm = filter(this.metaData, elm => elm.type === this.tabActive)[0]
      this.data = elm.value
    }

    handleClickAdd(): void {
      this.typePopup = 'add'
      this.setOpenPopup({
        popupName: 'popup-add-map',
        isOpen: true
      })
    }

    handleConfirm(form: Record<string, any>): void {
      this.data.unshift({
        ...form,
        id: Math.random()
      })
    }
  }
</script>

<style scoped lang="scss">
  ::v-deep.tab-map {
    margin-top: 16px;
    .el-table {
      &__body-wrapper {
        display: flex;
        flex-direction: column-reverse;

        .el-table__row {
          td {
            height: 64px;
          }
        }

        .el-table__append-wrapper {
          .append {
            padding-left: 10px;
            height: 64px;
            line-height: 64px;
            border-bottom: 1px solid var(--bc-border-primary);
            &:hover {
              background-color: var(--bc-table-row-hover);
            }
          }
        }
      }
    }
  }
</style>
