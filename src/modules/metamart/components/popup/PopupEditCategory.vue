<template>
  <base-popup name="popup-edit-category" :hiddenFooter="true" width="600px" :closeClickModal="false" :open="handleOpen" :close="handleClose" class="editgroup">
    <div slot="title">{{ $t('Edit category') }}</div>
    <div class="body-content">
      <el-form ref="dataInput" :model="dataInput" :rules="rules">
        <el-row>
          <el-col>
            <div class="col-style">
              <el-form-item label="Category" class="select" prop="categoryName">
                <el-input clearable placeholder="Category" v-model="dataInput.categoryName" ref="categoryName" style="color: #181b22"></el-input>
              </el-form-item>
              <el-form-item label="Parent category">
                <el-select
                  class="select w-100"
                  @change="handleListCustomer"
                  v-model="dataInput.parentId"
                  :loading="isCategoryLoading"
                  filterable
                  clearable
                  reserve-keyword
                  placeholder="Parent category"
                >
                  <el-option
                    v-for="(option, index) in listCategory"
                    :label="option.categoryName"
                    :value="option.id"
                    :key="index"
                    :style="{ 'margin-left': `${(option.levelDepth ? option.levelDepth : 0) * 15}px` }"
                    clearable
                    reserve-keyword
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="Description" class="select">
                <el-input clearable type="textarea" :rows="4" placeholder="Description" v-model="dataInput.description"></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <div class="footer" slot="footer">
      <div class="wrap-button">
        <div class="btn-right">
          <el-button class="btn-default btn-400 btn-h-40 btn-close" @click="handleReset">Reset</el-button>
          <el-button class="btn-default-bg btn-400 btn-h-40 is-none-border" style="font-size: 14px; font-weight: 600" @click="handleApply">Apply</el-button>
        </div>
      </div>
    </div>
  </base-popup>
</template>

<script lang="ts">
  import { Component, Mixins, Prop, Watch } from 'vue-property-decorator'
  import PopupMixin from '@/mixins/popup'
  import getRepository from '@/services'
  import { NftRepository } from '@/services/repositories/nft'
  import { debounce, filter, findIndex, forEach, trim } from 'lodash'
  import { namespace } from 'vuex-class'
  import EventBus from '@/utils/eventBus'
  const beUser = namespace('beUser')
  @Component({ components: {} })
  export default class PopupEditCategory extends Mixins(PopupMixin) {
    @Prop() idDetail: any
    @beUser.State('user') user?: Record<string, any>
    @Prop({ required: false, type: Object, default: {} }) dataDetail!: Record<string, any>
    showPicutreInitial = true
    @Prop() listCategory!: any
    dataInput: any = {
      categoryName: '',
      parentId: '',
      description: ''
    }
    responses: any = {}
    paginitInfo = {
      parentId: 0
    }
    listParent = []
    rules: any = {
      name: [
        {
          required: true,
          message: 'Tên nhóm không được để trống',
          trigger: 'blur'
        }
      ]
    }
    apiNft: NftRepository = getRepository('nft')
    loadMoreCustomerCategory(): void {
      console.log('d')
    }
    queryCustomerCategory = {
      page: 1,
      limit: 1000,
      search: ''
      // parentId: 0
    }
    showArrow = true
    noLoad = false
    isSearchCate = false
    isCategoryLoading = false
    arrResult: Array<Record<string, any>> = []
    @Watch('customer.customerCategoryIds')
    handleListCustomer(id: string): void {
      const customerCategoryList: any = []
      this.pushCustomerCategoryList(customerCategoryList)
    }
    pushCustomerCategoryList(data: any): void {
      const item: any = []
      forEach(data, elm => {
        item.push(elm[0])
      })
      // this.customer.customerCategoryList = item
    }
    setPositionCategories(listCate: Array<Record<string, any>>): void {
      // filter ra list cha
      const listParent: Array<Record<string, any>> = filter(listCate, elm => !elm.parentId)
    }

    handleClickChild(item: Record<string, any>, e: any): void {
      e.stopPropagation()
      // this.queryCustomerCategory.parentId = item.id
      // this.queryCustomerCategory.limit = 100
      // this.queryCustomerCategory.page = 1
      this.handleGetChild(item)
    }

    async handleGetChild(item: Record<string, any>): Promise<void> {
      console.log('Hello')
    }
    handleClearValidate(): void {
      let a: any = this.$refs.dataInput
      a?.clearValidate()
      this.dataInput = {
        categoryName: this.dataDetail.categoryName,
        parentId: this.dataDetail.parentId != 0 ? this.dataDetail.parentId : null,
        description: this.dataDetail.description
      }
    }
    handleOpen(): void {
      this.dataInput.categoryName = this.dataDetail.categoryName
      this.dataInput.parentId = this.dataDetail.parentId != 0 ? this.dataDetail.parentId : null
      // this.dataInput.parentId = this.dataDetail.parentId
      this.dataInput.description = this.dataDetail.description
      this.handleClearValidate()
      console.log(this.dataDetail, 'dataDetail')
      console.log(this.dataInput)
      console.log(this.dataDetail.id)
    }

    handleClose(): void {
      this.setOpenPopup({
        popupName: 'edit-group',
        isOpen: false
      })
      this.handleClearValidate()
      // this.dataDetail = {}
      // this.dataInput = {}
    }
    handleReset(): void {
      // @ts-ignore
      this.$refs.dataInput.clearValidate()
      this.dataInput = {}
    }
    handleApply(): void {
      let a: any = this.$refs.dataInput
      a.validate((valid: any) => {
        if (valid) {
          this.apiNft
            ?.updateCategory(this.dataDetail.id, this.dataInput)
            .then((res: any) => {
              if (res.status === 'Error') {
                this.$message.error(res.message)
                this.handleClose()
                console.log(this.dataInput)
              } else {
                this.$message.success('Update category successfully')
                this.$emit('load')
                this.handleClose()
                EventBus.$emit('reloadDropdown')
                this.setOpenPopup({
                  popupName: 'popup-edit-category',
                  isOpen: false
                })
              }
            })
            .catch(er => {
              this.$message.error(er.message)
            })
        } else {
          console.log('error validate data!')
          return false
        }
      })
    }
    reponse = []
    getData(): void {
      this.apiNft
        ?.getCategories(this.paginitInfo)
        .then((res: any) => {
          this.reponse = res
          this.listParent = res.content
        })
        .catch(e => {
          console.log(e)
        })
    }
  }
</script>
<style lang="scss">
  .edit-group {
    .body-content {
      margin: 0px auto;
      margin-top: 20px;
      width: 560px;
      position: relative;
    }
    .el-input__suffix {
      right: 0 !important;
    }
    textarea.el-textarea__inner {
      // font-family: "Open Sans";
      color: #2b2b2b;
    }
    .hide-option {
      display: none;
    }
    .bottom {
      background-color: var(--be-status-bg-processing);
      border-top: 1px solid var(--be-border-color);
      padding: 11px 16px 11px 20px;
      .bt-top {
        justify-content: flex-end;
      }
    }
    .select {
      color: #8f8f8f !important;
      width: 100%;
    }
    .el-form-item__content {
      font-size: none;
    }
    .group-button-cencel {
      padding: 11px 20px;
      font-size: 14px;
      color: #363636;
      font-weight: 400;
    }
    .group-button-save {
      padding: 8px 20px;
    }
    .el-form-item__label {
      font-size: 12px;
      margin-top: -15px;
      margin-bottom: -9px;
      color: #8f8f8f;
    }
    input.el-input__inner {
      font-size: 14px;
      color: #181b22;
    }
    ::placeholder {
      color: #8f8f8f !important;
    }

    .el-form-item__label:before {
      float: right;
    }
    textarea.el-textarea__inner {
      font-family: 'Open Sans';
    }
  }
</style>
