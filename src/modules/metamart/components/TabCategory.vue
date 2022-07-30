<!-- eslint-disable prettier/prettier -->
<template>
  <div class="w-100 bg-white wallet-table">
    <div class="wallet-table__below">
      <div class="wrapper">
        <div class="group-name">CATEGORY</div>
        <!-- <div class="group-code">Mã nhóm</div>
      <div class="group-member">Số thành viên</div> -->
        <div class="group-placeholder"></div>
      </div>
      <ul class="groupCustomer-list be-scroll-custom">
        <!-- <li class="title" style="padding-left: 45px; display: flex; justify-content: space-between">
          <div>Tên nhóm</div>
          <div style="margin-right: 400px">Số thành viên</div>
        </li> -->
        <li v-for="value in data" :key="value.id">
          <unit-item ref="unitItem" :value="value" :dataDetail="dataDetail" :is-search="isSearch" :parent="[]" />
        </li>
      </ul>
      <!-- <base-pagination :table="table" :info="'nhóm'" @sizeChange="handleSizeChange" @currentChange="handleCurrentChange"/> -->
    </div>
  </div>
</template>
<script lang="ts">
  import { Component, Watch } from 'vue-property-decorator'
  import PopupMixin from '@/mixins/popup'
  import UnitItem from './unit/UnitItem.vue'
  @Component({
    components: {
      UnitItem
    }
  })
  export default class TabCategory extends PopupMixin {
    dataList = []

    isLoading = false
    tabActive = 'ACTIVE'
    dataDetail: Record<string, unknown> = {}
    isSearch = false
    locationId = 0
    parentIdProp: any = null

    categoryIds: any = []
    data: any = [
      { id: 369, code: 'KHCN102', name: 'Real Estate', parentId: 0, levelDepth: 0, treePath: '', position: 0, numOfChild : 1 },
      { id: 350, code: '', name: 'Real Estate 1', parentId: 0, levelDepth: 0, treePath: '', position: 0, numOfChild: 2 },
      { id: 343, code: 'HN', name: 'Real Estate 2', parentId: 0, levelDepth: 0, treePath: '', position: 0 },
      { id: 366, code: 'NB35', name: 'Real Estate 3', parentId: 0, levelDepth: 0, treePath: '' },
      { id: 293, code: '1309', name: 'Real Estate 4', parentId: 0, levelDepth: 2, treePath: '278,283', position: 0 },
      { id: 291, code: '1309', name: 'Real Estate 5', parentId: 0, levelDepth: 2, treePath: '278,283', position: 0 },
      { id: 250, code: '1309', name: 'Fire', parentId: 0, levelDepth: 2, treePath: '278,283', position: 0 },
      { id: 270, code: '1309', name: 'Water', parentId: 0, levelDepth: 2, treePath: '278,283', position: 0 },
      { id: 280, code: '1309', name: 'Element', parentId: 0, levelDepth: 2, treePath: '278,283', position: 0 }
    ]
  }
</script>

<style scoped lang="scss">
  .main {
    // min-height: 200px;
    height: calc(100vh - 340px) !important;
    padding-bottom: 20px;
    .title {
      font-size: 14px;
      font-weight: 500;
      height: 40px;
      line-height: 40px;
      text-transform: uppercase;
      border-bottom: 1px solid #dbdbdb;
      padding-left: 45px;
      display: flex;
      align-items: center;

      .group-code {
        width: 112px;
      }
      .group-member {
        width: 120px;
        text-align: end;
      }
      .group-placeholder {
        width: 182px;
      }
    }
  }
  .wallet-table {
    &__below {
      padding: 0 24px;
      .wrapper {
        display: flex;
        flex-wrap: wrap;
        //display: grid;
        //grid-template-columns: repeat(auto-fit, minmax(261px, 1fr));
        //grid-column-gap: 20px;
        // eslint-disable-next-line prettier/prettier
        //grid-row-gap: 24px;
        .group-name {
          flex: 1;
          font-size: 16px;
          font-weight: 600;
          color: var(--bc-table-text-color);
          padding-bottom: 12px;
          padding-left: 44px;
          border-bottom: 1px solid #dbdbdb;
        }
      }
    }
  }
</style>
