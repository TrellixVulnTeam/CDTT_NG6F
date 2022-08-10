<!-- eslint-disable prettier/prettier -->
<template>
  <div class="w-100 bg-white template">
    <base-table
      :data="dataCollection"
      :showPagination="true"
      :paginationInfo="paginationInfo"
      :table="query"
      @selectionChange="handleSelectionChange"
      @sizeChange="handleSizeChange"
      @currentChange="handleCurrentChange"
      class="template-table"
      @rowClick="handleRowClick"
    >
      <el-table-column label="#" type="index" align="center" width="40" />
      <el-table-column type="selection" :selectable="handleSelectable" align="center" width="40" />
      <el-table-column label="TEMPLATE" width="470" align="left">
        <template slot-scope="sc">
          <p class="template-name">{{ sc.row.template }}</p>
        </template>
      </el-table-column>
      <el-table-column label="CREATED DATE" width="470" align="left">
        <template slot-scope="sc">
          <p class="created-date">{{ sc.row.date }}</p>
        </template>
      </el-table-column>
      <el-table-column label="" align="right">
        <template>
          <div class="actions">
            <base-icon icon="icon-copy" size="20" class="cursor" @click.native.stop="handleCopy" />
            <base-icon icon="icon-edit" size="20" class="cursor" @click.native.stop="handleEdit" />
            <base-icon icon="icon-delete-new" size="20" class="cursor" @click.native.stop="handleDelete" />
          </div>
        </template>
      </el-table-column>
    </base-table>
  </div>
</template>
<script lang="ts">
  import { Component, Watch, Prop, Mixins } from 'vue-property-decorator'
  import PopupMixin from '@/mixins/popup'
  import { PaginationInterface } from '@/interface'
  @Component
  export default class TabCategory extends Mixins(PopupMixin) {
    @Prop({ required: false, type: String, default: '' }) paginationInfo!: string
    query: Record<string, any> = {}
    dataCollection: Array<Record<string, any>> = [
      {
        template: 'NFT Timeshare',
        date: '16/10/2021 14:10:02'
      },
      {
        template: 'Single Stroke - Distributed Drawing',
        date: '16/10/2021 14:10:02'
      },
      {
        template: 'Single Stroke - Backplate',
        date: '16/10/2021 14:10:02'
      },
      {
        template: 'LD 200 - Drawing',
        date: '16/10/2021 14:10:02'
      },
      {
        template: 'Mount Plate',
        date: '16/10/2021 14:10:02'
      },
      {
        template: 'Mount Plate',
        date: '16/10/2021 14:10:02'
      },
      {
        template: 'Bottom Plate',
        date: '16/10/2021 14:10:02'
      },
      {
        template: 'Cranks haft',
        date: '16/10/2021 14:10:02'
      },
      {
        template: 'Mount Plate',
        date: '16/10/2021 14:10:02'
      },
      {
        template: 'NFT Timeshare',
        date: '16/10/2021 14:10:02'
      }
    ]
    handleSizeChange(value: number): void {
      this.query.limit = value
      this.query.page = 1
      this.$emit('sizeChange', value)
    }

    handleCurrentChange(value: number): void {
      this.query.page = value
      this.$emit('pageChange', value)
    }
    handleSelectionChange(): void {
      console.log('39')
    }
    handleRowClick(): void {
      console.log('42')
    }
    handleCopy(): void {
      console.log('copy 106')
    }
    handleEdit(): void {
      console.log('edit 109')
    }
    handleDelete(): void {
      console.log('delete 112')
    }
  }
</script>

<style scoped lang="scss">
  @mixin text($size, $height, $weight, $color) {
    font-size: $size;
    font-weight: $weight;
    line-height: $height;
    color: $color;
  }
  ::v-deep.template {
    padding: 0 24px 24px;
    &-table {
      tr.el-table__row {
        height: 64px;
      }
      .template-name,
      .created-date {
        @include text(16px, 24px, 400, #0a0b0d);
      }
      .actions {
        .span-icon {
          display: inline-block;
          margin-left: 16px;
        }
      }
    }
  }
</style>
