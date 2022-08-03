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
          <unit-item ref="unitItem" :value="value" :dataDetail="dataDetail" :is-search="isSearch" :parent="[]" @delete="handleDelete"/>
        </li>
      </ul>
      <!-- <base-pagination :table="table" :info="'nhóm'" @sizeChange="handleSizeChange" @currentChange="handleCurrentChange"/> -->
    </div>
     <popup-delete />
  </div>
</template>
<script lang="ts">
  import { Component, Watch, Prop } from 'vue-property-decorator'
  import PopupMixin from '@/mixins/popup'
  import UnitItem from './unit/UnitItem.vue'
  import PopupDelete from './popup/PopupDelete.vue'

  @Component({
    components: {
      UnitItem,
      PopupDelete
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
    @Prop({ required: true, type: Array }) data!: Array<Record<string, any>>
    categoryIds: any = []
    handleDelete() {
      this.setOpenPopup({
        popupName: 'popup-metamart-delete',
        isOpen: true
      })
    }
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
