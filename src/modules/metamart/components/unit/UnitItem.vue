<template>
  <div class="employee--item">
    <div class="channel-router flex">
      <div
        v-if="value.numOfChild > 0 && !isSearch"
        :class="{ 'drown-menu-tranfroms-select': isOpen, 'drown-menu-tranfroms-unselect': !isOpen }"
        class="drown-menu"
        @click="handleOpenClick(value)"
      >
        <base-icon icon="arrow-down" class="style__icon-arrow-down" style="margin-right: -5px" />
      </div>
      <div v-else style="display: block; width: 21px; height: 1px" />
      <div v-if="value.treePath == null" class="name flex-item" style="margin-left: 24px">{{ value.name }}</div>
      <div v-else-if="value.locationCode" class="name flex-item" style="margin-left: 24px">{{ value.locationCode + ' - ' + value.name }}</div>
      <div class="name flex-item row-click" @click="handleRowClick(value.id)">{{ value.name }}</div>

      <div class="action-group">
        <div class="action flex-left-right">
          <div @click="handleAddGroup(value)">
            <el-tooltip :enterable="false" class="item-tooltip" effect="dark" content="Add new" placement="top">
              <el-button class="is-create-color is-none-border icon-btn icon-middle custom-button p-0" style="background: transparent">
               <base-icon icon="icon-add" size="18" />
              </el-button>
            </el-tooltip>
          </div>
        </div>
        <div class="action flex-left-right">
          <div @click="handleEditGroup(value)">
            <el-tooltip :enterable="false" class="item-tooltip" effect="dark" content="Sửa nhóm" placement="top">
              <el-button style="margin-left: 8px; background: transparent" class="is-create-color is-none-border icon-btn icon-middle custom-button p-0">
                <base-icon icon="icon-edit" size="24" />
              </el-button>
            </el-tooltip>
          </div>
        </div>
        <div class="action flex-left-right">
          <div @click="handleDeleteGroup(value)">
            <el-tooltip :enterable="false" class="item-tooltip" effect="dark" content="Xóa nhóm" placement="top">
              <el-button style="margin-left: 8px;background: transparent" class="is-create-color is-none-border icon-btn icon-middle custom-button p-0">
              <base-icon icon="icon-delete" size="24" />
              </el-button>
            </el-tooltip>
          </div>
        </div>
      </div>
    </div>
    <div :class="isOpenChild ? 'list-childs-select' : null" class="list-childs">
      <unit-item-child
        v-for="item in value.children"
        :key="item.id"
        :value="item"
        @create="createItem"
        @edit="editItem"
        @detail="detailItem"
        @delete="deleteItem"
        @group-info="handleRowClick"
        :parent="childParent"
        class="child-item"
      />
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Mixins } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import PopupMixin from '@/mixins/popup'
  const UnitItemChild = () => import('../unit/UnitItem.vue')
  import EventBus from '@/utils/eventBus'

  const beUser = namespace('beUser')
  const beEmployee = namespace('beEmployee')
  @Component({ components: { UnitItemChild } })
  export default class UnitItem extends Mixins(PopupMixin) {
    @Prop({ required: true, type: Object, default: {} }) value!: Record<string, any>
    @Prop({ required: false, type: Array, default: [] }) parent!: []
    @Prop({ required: false, type: String, default: '' }) checkValue!: string
    @Prop({ required: false, type: Boolean, default: false }) isSearch!: boolean

    @beUser.State('user') user!: any
    @beUser.State('role') roleMembers!: any
    @beEmployee.Action('setUnitDetail') setUnitDetail!: (payload: Record<string, any>) => void
    idCategory = ''
    dataDetail: Record<string, unknown> = {}
    isOpen = false
    childParent: Array<Record<string, any>> = []
    created(): void {
      EventBus.$on("reloadDropdown", () => {
        this.isOpen = false;   
        EventBus.$off("reloadDropdown");
      });
    }
    check = false
    checkRole(listRole: Record<string, any>): void {
      // listRole.includes(this.roleMembers === 'ADMIN') ? false : true
      if (listRole.includes('ADMIN')) {
        this.check = true
      } else {
        this.check = false
      }
      console.log('check', this.check)
    }
    mounted(): void {
      this.childParent = [...this.parent, ...[this.value.id]]
      this.checkRole(this.roleMembers.userRole)
      //   this.getLocationList()
      // this.getTotalMembers()
    }
    get isOpenChild(): boolean {
      return this.isOpen
    }

    handleInfo(data: Record<string, any>): void {
      this.$emit('detail', data)
      this.setOpenPopup({
        popupName: 'infoEmployeeGroup',
        isOpen: true
      })
    }
    handleRowClick(id: Record<string, any>): void {
      this.$emit('group-info', id)
    }
    handleIsOpen(): void {
      this.isOpen = false;
    }
    dataPopup = {}
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    editItem(data: Record<string, any>) {
      this.$emit('edit', data)
    }
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    createItem(data: Record<string, any>) {
      this.$emit('create', data)
    }
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    detailItem(data: Record<string, any>) {
      this.$emit('detail', data)
    }
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    deleteItem(data: Record<string, any>) {
      this.$emit('delete', data)
    }
    handleAddGroup(row: Record<string, any>): void {
      // this.isConflickClick = true
      this.idCategory = row.id
      this.$emit('create', row.id)
      this.setOpenPopup({
        popupName: 'create-group',
        isOpen: true
      })
    }
    handleEditGroup(row: Record<string, any>): void {
      // this.dataDetail = row
      // this.isConflickClick = true
      this.$emit('edit', row)
      this.setOpenPopup({
        popupName: 'edit-group',
        isOpen: true
      })
    }
    handleDeleteGroup(row: Record<string, any>): void {
      this.$emit('delete', row)
      // this.isConflickClick = true
      // this.checkListChildren(row.parentId, row.id)
      this.setOpenPopup({
        popupName: 'delete-group',
        isOpen: true
      })
    }

    handleOpenClick(value: Record<string, any>): void {
      const temp = {
        parentId: value.id
      }
      console.log('chil', value)
      if (!this.isOpen && value.numOfChild) {
        this.isOpen = !this.isOpen
        const data = [
        { id: 369, code: 'KHCN102', name: 'Real Estate', parentId: 0, levelDepth: 1, treePath: '', position: 0, numOfChild : 0 }
        ]
        value.children = data
        // this.apiCate.getListCategory(temp).then((res: any) => {
        //   value.children = res.content
        //   this.isOpen = !this.isOpen
        //   this.$forceUpdate()
        // })
      } else {
        this.isOpen = !this.isOpen
      }
      // async handleExpandChange(data: { row: any; expandedRows: any }): Promise<void> {
      // this.paginitInfo.parentId = data.row.id
      // const result: any = await this.api.getListCategory(this.paginitInfo)
      // data.row.childrens = result.content || []
      // this.forceRerender()
      // }
    }
  }
</script>

<style lang="scss" scoped>
  @keyframes select {
    from {
      transform: rotate(-90deg);
    }
    to {
      transform: rotate(0deg);
    }
  }
  @keyframes unselect {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(-90deg);
    }
  }
  .flex-left-right {
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    display: flex;
  }
  .custom-button {
    color: #363636;
    margin: 0px -11px;
  }
  .channel-router-padding {
    padding: 13px 15px;
  }
  .channel-router {
    // padding: 13px 15px;
    // border-radius: 5px;
    font-size: 16px;
    // font-weight: 400; 
    min-height: 46px;
    margin-bottom: 1px;
    border-bottom: 1px solid #dbdbdb;
    &:hover {
      background-color: #fafafa;
    }
    .name {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      word-wrap: break-word;
      margin-left: 24px;
    }
    &:hover {
      background-color: #fafafa !important;
      // color: #E13635 !important;
      .action-group {
        .action {
          visibility: visible;
        }
      }
      
    }
    .drown-menu,
    .bookmarks,
    .add-new,
    .plus {
      z-index: 1000;
      &:hover {
        color: #e13635 !important;
      }
    }
    .bookmarks,
    .add-new {
      padding: 3px 6px 3px 0px;
    }

    .drown-menu {
      padding: 5px;
      z-index: 1000;
      display: block;
      &:hover {
        color: #e13635 !important;
      }
    }
    .drown-menu-tranfroms-select {
      transform: rotate(0);
      animation-name: select;
      animation-duration: 0.5s;
      // margin-top: 15px;
    }

    .drown-menu-tranfroms-unselect {
      transform: rotate(-90deg);

      animation-name: unselect;
      animation-duration: 0.5s;
    }

    .action-group {
      display: inline-flex;
      padding: 0 32px;
      .action {
        visibility: hidden;
      }
    }

    .group-code {
      width: 130px;
      text-align: start;
    }

    .number-of-member {
      width: 100px;
      text-align: end;
    }

    .row-click {
      padding: 14px 0;
    }

    &.active {
      background-color: #fafafa !important;
      // color: #E13635 !important;
    }
  }
  .child-item {
    padding-left: 30px;
    // border-bottom: 1px solid #dbdbdb;
    // &:not(:last-child) {
    //   border-bottom: 1px solid #dbdbdb;
    // }
  }
  .list-childs {
    // max-height: 0;
    // -moz-transition: max-height 1s ease;
    // -webkit-transition: max-height 1s ease;
    // -o-transition: max-height 1s ease;
    // transition: max-height 1s ease;
    height: 0;
    -moz-transition: height 1s ease;
    -webkit-transition: height 1s ease;
    -o-transition: height 1s ease;
    transition: height 1s ease;
    overflow: hidden;
    // padding-left: 30px;
  }

  .list-childs-select {
    height: auto;
  }
  .employee--item {
    .name {
      color: var(--be-color-dark);
    }
  }
  .style__icon-arrow-down {
    font-size: 12px;
  }
  ::v-deep.el-button {
    padding: 12px !important;
  }
</style>
