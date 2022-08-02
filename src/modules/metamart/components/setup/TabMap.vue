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
        <template slot-scope="scope">
          <span @click="handleCallAction('edit', scope.row)">
            <base-icon icon="icon-edit" size="20" />
          </span>
          <span style="padding-left: 16px" @click="handleCallAction('delete', scope.row)">
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
    <popup-add-map :typePopup="typePopup" :rowCurrent="rowCurrent" @confirm="handleConfirm" @edit="handleEdit" />
    <popup-delete :rowCurrent="rowCurrent" @delete="handleDelete" />
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Mixins, Watch } from 'vue-property-decorator'
  import filter from 'lodash/filter'
  import findIndex from 'lodash/findIndex'

  import PopupMixin from '@/mixins/popup'
  import PopupAddMap from './PopupAddMap.vue'
  import PopupDelete from './PopupDelete.vue'

  @Component({ components: { PopupAddMap, PopupDelete } })
  export default class TabMap extends Mixins(PopupMixin) {
    @Prop({ required: false, type: Array, default: [] }) metaData!: Array<Record<string, any>>
    @Prop({ required: false, type: String, default: '' }) tabActive!: string

    data: Record<string, any> | Array<Record<string, any>> = {}
    typePopup = 'add'
    rowCurrent: Record<string, any> = {}

    @Watch('metaData') watchMetadata(): void {
      const elm = filter(this.metaData, elm => elm.type === this.tabActive)[0]
      this.data = [...elm.value]
    }

    created(): void {
      const elm = filter(this.metaData, elm => elm.type === this.tabActive)[0]
      this.data = [...elm.value]
    }

    handleClickAdd(): void {
      this.typePopup = 'add'
      this.setOpenPopup({
        popupName: 'popup-add-map',
        isOpen: true
      })
    }

    handleCallAction(type: 'edit' | 'delete', row: Record<string, any>): void {
      this.rowCurrent = row
      this.typePopup = type
      if (type === 'edit') {
        this.setOpenPopup({
          popupName: 'popup-add-map',
          isOpen: true
        })
      } else {
        this.setOpenPopup({
          popupName: 'popup-setup-delete',
          isOpen: true
        })
      }
    }

    handleDelete(): void {
      const data = filter(this.data, elm => elm.id !== this.rowCurrent.id)
      const indexMeta = findIndex(this.metaData, elm => elm.type === this.tabActive)
      const _metaData = [...this.metaData]
      _metaData[indexMeta].value = data
      this.$emit('update', _metaData)
    }

    handleEdit(form: Record<string, any>): void {
      const _data = [...(this.data as Array<Record<string, any>>)]
      const index = findIndex(_data, elm => elm.id === form.id)
      _data[index] = { ...form }
      const indexMeta = findIndex(this.metaData, elm => elm.type === this.tabActive)
      const _metaData = [...this.metaData]
      _metaData[indexMeta].value = _data
      this.$emit('update', _metaData)
    }

    handleConfirm(form: Record<string, any>): void {
      const _data = [...(this.data as Array<Record<string, any>>)]
      _data.unshift({
        ...form,
        id: Math.random()
      })
      const index = findIndex(this.metaData, elm => elm.type === this.tabActive)
      const _metaData = [...this.metaData]
      _metaData[index].value = _data
      this.$emit('update', _metaData)
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
