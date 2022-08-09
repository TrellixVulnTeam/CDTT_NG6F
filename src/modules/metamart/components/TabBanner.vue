<template>
  <div class="banner w-100 bg-white">
    <base-table
      :data="listBanners"
      :showPagination="true"
      :paginationInfo="paginationInfo"
      :table="table"
      @sizeChange="handleSizeChange"
      @currentChange="handleCurrentChange"
      class="banner-table"
    >
      <!-- @rowClick="handleRowClick" -->
      <!-- @selectionChange="handleSelectionChange" -->
      <el-table-column label="#" type="index" align="center" width="40" :index="indexMethod" />
      <!-- <el-table-column type="selection" :selectable="handleSelectable" align="center" width="40" /> -->
      <el-table-column label="banner" width="400" align="left">
        <template slot-scope="sc">
          <p class="banner-table__name">{{ sc.row.objectName }}</p>
        </template>
      </el-table-column>
      <el-table-column label="link" width="350" align="left">
        <template slot-scope="sc">
          <p class="banner-table__link">{{ sc.row.objectUrl !== null ? sc.row.objectUrl : '' }}</p>
        </template>
      </el-table-column>
      <el-table-column label="position" width="165" align="right">
        <template slot-scope="sc">
          <span class="banner-table__position">{{ sc.row.objectPosition }}</span>
        </template>
      </el-table-column>
      <el-table-column label="" align="right">
        <template slot-scope="sc">
          <div class="banner-table__actions">
            <base-icon icon="icon-edit" size="20" class="cursor banner-table__actions--edit" @click.native.stop="handleEdit(sc.row)" />
            <base-icon icon="icon-delete-new" size="20" class="cursor banner-table__actions--del" @click.native.stop="handleDelete" />
          </div>
        </template>
      </el-table-column>
    </base-table>
  </div>
</template>
<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import { NftRepository } from '@/services/repositories/nft'
  import getRepository from '@/services'
  import EventBus from '@/utils/eventBus'
  const apiNft: NftRepository = getRepository('nft')
  @Component
  export default class TabBanner extends Vue {
    paginationInfo = 'banners'
    query = {
      page: 1,
      limit: 10,
      search: '',
      orderBy: 'NAME',
      orderType: 'ASC'
    }
    table = {
      page: 1,
      limit: 10,
      total: 0
    }
    listBanners: Array<Record<string, any>> = []
    created(): void {
      this.getListBanners()
      EventBus.$on('banner-completed', this.getListBanners)
    }
    indexMethod(index: number): number {
      return (this.query.page - 1) * this.query.limit + index + 1
    }
    async getListBanners(): Promise<void> {
      try {
        const rs = await apiNft.getListBanners(this.query)
        this.listBanners = rs.content
        this.table.total = rs.totalElements
        console.log('24...', rs)
      } catch (error) {
        console.log(error)
      }
    }
    handleSizeChange(payload: number): void {
      this.query = {
        ...this.query,
        limit: payload,
        page: 1
      }
      this.table = {
        ...this.table,
        limit: payload,
        page: 1
      }
      this.getListBanners()
    }
    handleCurrentChange(payload: number): void {
      this.query = {
        ...this.query,
        page: payload
      }
      this.table = {
        ...this.table,
        page: payload
      }
      this.getListBanners()
    }
    handleEdit(payload: Record<string, any>): void {
      this.$emit('edit', {
        popupName: 'popup-banner',
        banner: payload
      })
    }
  }
</script>
<style lang="scss" scoped>
  @mixin text($size, $height, $weight, $color) {
    font-size: $size;
    font-weight: $weight;
    line-height: $height;
    color: $color;
  }
  ::v-deep.banner {
    padding: 0 24px;
    &-table {
      .el-table__row {
        height: 64px;
      }
      &__name,
      &__position {
        @include text(16px, 24px, 400, #0a0b0d);
      }
      &__link {
        @include text(16px, 24px, 400, #2e89ff);
        overflow: hidden;
        text-overflow: ellipsis;
        height: 24px;
        white-space: nowrap;
      }
      &__actions {
        &--edit,
        &--del {
          display: inline-block;
          margin-right: 16px;
        }
        &--del {
          margin-right: 6px;
        }
      }
    }
  }
</style>
