<template>
  <div class="tab-boolean">
    <base-table :data="data" :showPagination="false">
      <el-table-column label="#" type="index" width="56px" align="center" />
      <el-table-column :label="$t('label_nft-name')" prop="name"> </el-table-column>
      <el-table-column prop="status" align="right">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.status" active-color="#129961"> </el-switch>
        </template>
      </el-table-column>
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
          <span class="text-hyperlink text-sm" style="padding-left: 12px">{{ $t('label_add-feature') }}</span>
        </div>
      </div>
    </base-table>
    <popup-add-feature :typePopup="typePopup" :rowCurrent="rowCurrent" @confirm="handleConfirm" @edit="handleEdit" @confirmDelete="handleCallAction('delete', rowCurrent)" />
    <popup-delete :rowCurrent="rowCurrent" :tabActive="tabActive" @delete="handleDelete" />
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Mixins, Watch } from 'vue-property-decorator'
  import filter from 'lodash/filter'
  import findIndex from 'lodash/findIndex'

  import PopupMixin from '@/mixins/popup'
  import PopupAddFeature from './PopupAddFeature.vue'
  import PopupDelete from './PopupDelete.vue'

  @Component({ components: { PopupAddFeature, PopupDelete } })
  export default class TabBoolean extends Mixins(PopupMixin) {
    @Prop({ required: false, type: Array, default: [] }) metaData!: Array<Record<string, any>>
    @Prop({ required: false, type: String, default: '' }) tabActive!: string

    data: Array<Record<string, any>> = []
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
        popupName: 'popup-add-feature',
        isOpen: true
      })
    }

    handleCallAction(type: 'edit' | 'delete', row: Record<string, any>): void {
      this.rowCurrent = row
      this.typePopup = type
      if (type === 'edit') {
        this.setOpenPopup({
          popupName: 'popup-add-feature',
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
      const _data = [...this.data]
      const index = findIndex(_data, elm => elm.id === form.id)
      _data[index] = { ...form }
      const indexMeta = findIndex(this.metaData, elm => elm.type === this.tabActive)
      const _metaData = [...this.metaData]
      _metaData[indexMeta].value = _data
      this.$emit('update', _metaData)
    }

    handleConfirm(form: Record<string, any>): void {
      const _data = [...this.data]
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
  ::v-deep.tab-boolean {
    border: 1px solid #dbdbdb;
    border-radius: 8px;
    overflow: hidden;
    padding: 14px 16px 16px;
    .el-table {
      &__body-wrapper {
        display: flex;
        flex-direction: column-reverse;

        .el-table__row {
          td {
            height: 64px;
          }
        }
        .el-switch {
          height: 26px;
          line-height: 26px;
          &__core {
            width: 44px !important;
            height: 26px;
            border-radius: 40px;
            &::after {
              width: 22px;
              height: 22px;
            }
          }
        }
        .is-checked {
          .el-switch__core {
            &::after {
              margin-left: -23px;
            }
          }
        }

        .el-table__append-wrapper {
          .append {
            padding-left: 66px;
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
