<template>
  <base-popup name="popup-create-category" class="popup-filter-collection" width="600px" :close="handleClose" :open="handleOpen">
    <div class="title-popup" slot="title">
      <span>{{ $t('Add new category') }}</span>
    </div>
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
                  :remote-method="remoteCustomerCategory"
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
                <el-input clearable type="textarea" :rows="4" placeholder="Description..." v-model="dataInput.description"></el-input>
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

  const apiNft: NftRepository = getRepository('nft')

  @Component
  export default class PopupCreateCategory extends Mixins(PopupMixin) {
    text = ''
    @Prop() idCategory: any
    @Prop() listCategory!: any
    @Prop({ required: false, type: Object, default: {} }) dataDetail!: Record<string, any>
    dataInput: any = {
      categoryName: '',
      parentId: '',
      description: ''
    }
    isCategoryLoading = false
    fullNameLength = false
    rules: any = {
      categoryName: [
        {
          required: true,
          message: 'This field can not be blank',
          trigger: 'blur'
        }
      ]
    }
    async createCategory(): Promise<void> {
      {
        await apiNft
          .createCategory(this.dataInput)
          .then((res: any) => {
            this.$message.success('Create category successfully')
          })
          .catch(e => {
            console.log(e)
          })
      }
    }
    handleListCustomer(id: string): void {
      const customerCategoryList: any = []
      forEach(id, elm => {
        customerCategoryList.push(this.listCategory.filter((item: any) => item.id == elm))
      })
      this.pushCustomerCategoryList(customerCategoryList)
    }
    pushCustomerCategoryList(data: any): void {
      const item: any = []
      forEach(data, elm => {
        item.push(elm[0])
      })
      // this.customer.customerCategoryList = item
    }
    remoteCustomerCategory(query: string): void {
      this.isCategoryLoading = true
      // if (trim(query) === '') {
      //   this.isSearchCate = false
      // } else {
      //   this.isSearchCate = true
      // }
      // this.queryCustomerCategory.search = trim(query)
      // this.queryCustomerCategory.page = 1
      // this.queryCustomerCategory.limit = 1000
      // const a = debounce(this.getCustomerCategory, 500)
      // a(query)
    }
    handleOpen(): void {
      ;(this.dataInput.categoryName = null), (this.dataInput.parentId = null)
      this.dataInput.description = null
      this.fullNameLength = false
      this.dataInput.parentId = this.idCategory ? this.idCategory : null
    }
    handleClose(): void {
      // @ts-ignore
      this.$refs.dataInput.clearValidate()

      this.idCategory = null
      ;(this.dataInput.parentId = null), (this.idCategory = null)
      this.setOpenPopup({
        popupName: 'popup-create-category',
        isOpen: false
      })
      ;(this.dataInput.name = null), (this.dataInput.parentId = null)
      this.dataInput.description = null
      this.dataInput.code = null
    }
    handleReset(): void {
      // @ts-ignore
      this.$refs.dataInput.clearValidate()
      this.dataInput = {}
    }
    handleApply(): void {
      let a: any = this.$refs.dataInput
      if (trim(this.dataInput.categoryName) === '') {
        this.fullNameLength = true
      }
      a.validate((valid: any) => {
        if (valid) {
          if (!this.fullNameLength) {
            apiNft
              .createCategory(this.dataInput)
              .then((res: any) => {
                if (res.status === 'Error') {
                  this.$message.error(res.message)
                  this.handleClose()
                } else {
                  this.$message.success('Create category successfully')
                  this.handleClose()
                  this.$emit('load')
                }
              })
              .catch(er => {
                this.$message.error(er.message)
              })
          } else {
            console.log('error validate data!')
            return false
          }
        }
      })
    }
  }
</script>

<style scoped lang="scss">
  @mixin text($size, $height, $weight, $color) {
    font-size: $size;
    line-height: $height;
    font-weight: $weight;
    color: $color;
  }
  .popup-create-category {
    .be-btn-danger:hover {
      border-color: var(--be-button-hover-color);
    }
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
    .wrap-option {
      .item-name {
        display: block;
        width: 285px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        padding-right: 5px;
      }
    }
    .child-option {
      margin-left: 15px;
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
      padding: 11px 20px;
      background-color: #f07525;
      color: #fff;
    }
    .hide-option {
      display: none;
    }
    .group-button-save:hover {
      border-color: var(--be-button-hover-color);
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
