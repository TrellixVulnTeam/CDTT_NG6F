<template>
  <div class="list-bonus">
    <base-popup name="popup-change-phone" class="popup-customer-detail" width="480px" :isShowFooter="false" :close="handleClose" :open="handleOpen">
      <div class="title-popup" slot="title">
        <span>{{ 'new phone number' }}</span>
      </div>

      <el-form>
        <el-row>
          <el-form-item label="thanh dz">
            <!-- <el-date-picker class="filter-select" v-model="filters.kpiMonth" format="MM" type="month" placeholder="Chọn tháng"> </el-date-picker> -->
            <el-select style="width: 432px" placeholder="select">
              <!-- <el-option v-for="item in 12" :key="item" :label="`Tháng ${item}`" :value="item"> </el-option> -->
            </el-select>
          </el-form-item>
        </el-row>

        <el-row>
          <el-form-item label="thanh dz"> </el-form-item>
        </el-row>
      </el-form>
    </base-popup>
    <div class="table" style="padding-bottom: 24px" v-loading="isLoading" :class="isLoading ? 'list-loading' : null">
      <div class="be-flex jc-space-between align-center">
        <div class="text1">Phone number</div>
        <div class="phone">
          <span class="style-phone">0982642610</span> <span style="color: blue; margin-left: 8px; font-size: 14px; line-height: 20px; color: #129961">verified</span>
        </div>
        <!-- <div class="status">verified</div> -->
        <div class="button"><el-button type="button" class="style-button" style="width: 130px" @click="clickChangePhoneNumber">Change</el-button></div>
      </div>
      <hr class="hr1" />

      <div class="be-flex jc-space-between align-center">
        <div class="text1">Phone number</div>
        <div class="phone"><base-icon icon="icon-phone" size="40" /><span class="style-phone">Authenticator app</span></div>
        <div class="button"><el-button type="button" class="style-button" style="width: 130px">Reset default</el-button></div>
      </div>
      <hr class="hr1" />
      <div class="be-flex jc-space-between align-center">
        <div class="text1">Active status</div>
        <div class="phone"><span class="style-phone">Active</span></div>
        <div class="button"><el-button type="button" class="style-button" style="width: 130px">Locked user</el-button></div>
      </div>
      <hr class="hr1" />

      <!-- <el-form>
        <el-row
          ></el-row
        >
        <hr />

        <el-row
          ><span>Phone number</span> <span>0982642610</span> <span style="color: blue">active</span> <span><el-button>Button</el-button></span></el-row
        >
        <hr />

        <el-row
          ><span>Phone number</span> <span>0982642610</span> <span style="color: blue">active</span> <span><el-button>Button</el-button></span></el-row
        >
        <hr />
      </el-form> -->
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Mixins } from 'vue-property-decorator'

  import { namespace } from 'vuex-class'

  import includes from 'lodash/includes'
  import PopupMixin from '@/mixins/popup'
  import getRepository from '@/services'
  import { CustomerRepository } from '@/services/repositories/customer'

  const apiCustomer: CustomerRepository = getRepository('customer')
  const beBase = namespace('beBase')

  @Component({ components: {} })
  export default class CustomerBonus extends Mixins(PopupMixin) {
    @Prop({ required: true, type: Number, default: 0 }) userId!: number
    @beBase.State('coinMain') coinMain!: string

    listBonus: Record<string, any>[] = []
    isLoading = false
    filter: Record<string, any> = {
      fromAmount: '',
      toAmount: '',
      toDate: '',
      fromDate: '',
      status: '',
      transactionType: ''
    }
    query: Record<string, any> = {
      page: 1,
      limit: 10,
      total: 0
    }
    sorts: Array<Record<string, any>> = [
      {
        command: 1,
        label: this.$i18n.t('customer.sort.date'),
        divided: false,
        i18n: 'customer.sort.date'
      },
      {
        command: 2,
        label: this.$i18n.t('customer.sort.amount'),
        divided: false,
        i18n: 'customer.sort.amount'
      }
    ]

    listType: Array<Record<string, any>> = [
      {
        id: 0,
        name: 'Sign Up Bonus',
        value: 'BONUS_SIGN_UP'
      },
      {
        id: 1,
        name: 'First Transaction Bonus',
        value: 'BONUS_FIRST_TRANS'
      },
      {
        id: 2,
        name: 'Crowdsale Bonus',
        value: 'BONUS_CROWDSALE'
      },
      {
        id: 3,
        name: 'Big Backers Bonus',
        value: 'BONUS_BIG_BACKER'
      }
    ]
    listStatus: Array<Record<string, any>> = [
      {
        id: 0,
        name: 'Pending',
        value: 'PENDING'
      },
      {
        id: 1,
        name: 'Paid',
        value: 'PAID'
      }
    ]

    isVisible = false
    clickChangePhoneNumber(): void {
      this.setOpenPopup({
        popupName: 'popup-change-phone',
        isOpen: true
      })
    }
    created(): void {
      this.handleGetListBonus()
      this.setOpenPopup({
        popupName: 'popup-change-phone',
        isOpen: false
      })
    }

    get getIndex(): number {
      return this.query.limit * (this.query.page - 1) + 1
    }

    get getPaginationInfo(): any {
      return this.$t('paging.transaction')
    }

    async handleGetListBonus(): Promise<void> {
      try {
        this.isLoading = true
        const params = {
          ...this.query,
          total: null,
          userId: this.userId
        }
        const result = await apiCustomer.getlistBonus(params)
        this.listBonus = result.content
        this.query.total = result.totalElements
        this.isLoading = false
      } catch (error) {
        this.isLoading = false
        console.log(error)
      }
    }

    handleSizeChange(value: number): void {
      this.query.limit = value
      this.handleGetListBonus()
    }
    handleCurrentChange(value: number): void {
      this.query.page = value
      this.handleGetListBonus()
    }

    handleFilter(filter: Record<string, any>): void {
      this.query = { ...this.query, ...filter }
      this.handleGetListBonus()
    }

    handleApply(): void {
      this.query = { ...this.query, ...this.filter }
      this.handleGetListBonus()
      this.isVisible = false
    }

    handleReset(): void {
      this.filter = {
        fromAmount: '',
        toAmount: '',
        toDate: '',
        fromDate: '',
        status: '',
        transactionType: ''
      }
      this.query = { ...this.query, ...this.filter }
      this.handleGetListBonus()
      this.isVisible = false
    }

    handleCopyTransaction(row: Record<string, any>): void {
      let message: any = ''
      const el = document.createElement('input')
      el.value = row.transactionCode
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      message = this.$t('notify.copy')
      this.$message.success(message)
    }

    checkTypeClass(status: string): string {
      if (status === 'PENDING') {
        return 'status-peding'
      } else {
        return 'status-success'
      }
    }

    getTypeStatus(status: string): any {
      if (status === 'PENDING') {
        return this.$t('customer.table.pending')
      } else {
        return this.$t('customer.table.paid')
      }
    }

    handleShowPopper(): void {
      this.isVisible = true
    }

    onlyNumber(event: KeyboardEvent, type: string): void {
      let keyCode = event.keyCode ? event.keyCode : event.which
      //if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
      // 46 is dot
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
        event.preventDefault()
      }
      if (keyCode === 46 && includes(this.filter[type], '.')) {
        event.preventDefault()
      }
    }

    numberFormat(event: FocusEvent): void {
      const _event: any = event
      let fnumber = _event.target.value
      if (fnumber.length > 0) {
        fnumber = fnumber.replaceAll(',', '')
        fnumber = this.$options.filters?.numberWithCommas(fnumber)
        _event.target.value = fnumber
      }
    }
  }
</script>

<style scoped lang="scss">
  .hr1 {
    border: 1px solid #dbdbdb;
  }
  .text1 {
    color: #0a0b0d;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
  }
  .phone {
    color: #0a0b0d;
    font-weight: normal;
    font-size: 16px;
    line-height: 24px;
    text-align: left;
  }
  .width-button {
    width: 130px !important ;
  }
  .style-phone {
    color: blue;
    width: 45px;
    font-size: 16px;
    line-height: 24px;
    color: #0a0b0d;
  }
  .style-button {
    border: 1px solid #89909e;
  }
  .list-bonus {
    .input-search {
      width: 400px;
      margin-right: 30px;
    }
    .sort {
      cursor: pointer;
      color: #0a0b0d;
    }
    .list-loading {
      min-height: 200px;
    }
    .table {
      padding: 0 24px;
      .small {
        font-size: 14px !important;
        line-height: 16px;
        color: #5b616e;
      }
    }
  }
</style>
