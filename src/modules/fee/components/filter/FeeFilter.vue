<template>
  <div class="pb-24 pt-24 be-flex align-center kyc-filter">
    <el-input v-model="filterFee.search" class="input-search" :placeholder="$t('placeholder.search')">
      <span slot="prefix" class="prefix-search">
        <base-icon icon="icon-search" size="24" />
      </span>
    </el-input>
    <div class="filter-item">
        <!-- <el-popover :value="isVisible" placement="bottom-start" width="518" trigger="click" popper-class="popper-filter" @show="handleShowPopper">
        <div class="content">
          <el-form>
            <div class="be-flex jc-space-between row">
              <el-form-item class="be-flex-item mr-40" :label="$t('label.available-amount')"> -->
                <!-- <el-input :placeholder="$t('crowdsale.popup-filter.planceOderTransactionDateStart')" clearable></el-input> -->
                <!-- <el-row class="flex_line">
                  <el-col :span="11">
                    <el-input v-model="filterBalance.fromAvailableAmount" @keyup.native="numberFormat($event)" type="text" placeholder="From"></el-input>
                  </el-col> -->
                  <!-- <span class="dash"><i class="el-icon-minus icon-dash"></i></span> -->
                  <!-- <el-col :span="11" style="float: right">
                    <el-input v-model="filterBalance.toAvailableAmount" @keyup.native="numberFormat($event)" type="text" placeholder="To"></el-input>
                  </el-col>
                </el-row>
              </el-form-item>
            </div>
            <div class="be-flex jc-space-between row">
              <el-form-item class="be-flex-item mr-40" :label="$t('label.locked-amount')"> -->
                <!-- <el-input :placeholder="$t('crowdsale.popup-filter.planceOderTransactionDateStart')" clearable></el-input> -->
                <!-- <el-row class="flex_line">
                  <el-col :span="11">
                    <el-input v-model="filterBalance.fromLockedAmount" @keyup.native="numberFormat($event)" type="text" placeholder="From"></el-input>
                  </el-col> -->
                  <!-- <span class="dash"><i class="el-icon-minus icon-dash"></i></span> -->
                  <!-- <el-col :span="11" style="float: right">
                    <el-input v-model="filterBalance.toLockedAmount" @keyup.native="numberFormat($event)" type="text" placeholder="To"></el-input>
                  </el-col>
                </el-row>
              </el-form-item>
            </div>
            <div class="be-flex jc-space-between row">
              <el-form-item class="be-flex-item mr-40" :label="$t('label.balance')"> -->
                <!-- <el-input :placeholder="$t('crowdsale.popup-filter.planceOderTransactionDateStart')" clearable></el-input> -->
                <!-- <el-row class="flex_line">
                  <el-col :span="11">
                    <el-input v-model="filterBalance.fromBalanceAmount" @keyup.native="numberFormat($event)" type="text" placeholder="From"></el-input>
                  </el-col> -->
                  <!-- <span class="dash"><i class="el-icon-minus icon-dash"></i></span> -->
                  <!-- <el-col :span="11" style="float: right">
                    <el-input v-model="filterBalance.toBalanceAmount" @keyup.native="numberFormat($event)" type="text" placeholder="To"></el-input>
                  </el-col>
                </el-row>
              </el-form-item>
            </div>
          </el-form>
        </div>
        <div class="be-flex jc-flex-end footer">
          <el-button class="btn-default btn-400 btn-h-40 btn-close text-regular" @click="handleReset">
            {{ $t('button.reset') }}
          </el-button>
          <el-button class="btn-default-bg btn-400 btn-h-40 is-none-border h-40 text-regular" @click="handleApply">
            {{ $t('button.apply') }}
          </el-button>
        </div> -->
      <!-- </el-popover> -->
        <div class="cursor text-filter" style="font-size: 16px" @click="handleOpen">
          <span class="abicon"> <base-icon style="color: #5b616e; margin-right: 10px" icon="icon-filter" size="18" /> </span>
          {{ $t('kyc.filter.filter') }}
        </div>
      <!-- <div slot="reference" class="cursor text-filter" style="font-size: 16px">
          <span class="abicon"> <base-icon style="color: #5b616e; margin-right: 10px" icon="icon-filter" size="18" /> </span>
          {{ $t('kyc.filter.filter') }}
      </div> -->
      <!-- <div class="cursor text-filter" style="font-size: 16px">
        <span class="abicon"> <base-icon style="color: #5b616e; margin-right: 10px" icon="icon-filter" size="18" /> </span>
        {{ $t('kyc.filter.filter') }}
      </div> -->
    </div>
    <div>
      <el-dropdown class="sort" trigger="click" @command="handleSort">
        <span class="abicon sort-title" style="font-size: 16px">
          <base-icon icon="icon-sort" style="color: #5b616e; margin-right: 10px" size="18" class="icon" /> {{ $t('kyc.filter.sort') }}</span
        >
        <el-dropdown-menu class="header-downloadapp dropdown-sort" slot="dropdown">
          <el-dropdown-item v-for="(value, index) in sorts" :key="index" :class="sortActive === value.command ? 'active' : null" :command="value.command" :divided="value.divided">
            <span class="be-flex">
              <span class="be-flex-item">
                {{ value.label }}
              </span>
              <base-icon v-if="sortActive === value.command" icon="icon-tick-dropdown" size="16" />
            </span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <popup-fee @feeFilterBark="handleCatchBark($event)"/>
  </div>
</template>

<script lang="ts">
  import { Component, Mixins, Prop, Vue, Watch } from 'vue-property-decorator'
  import EventBus from '@/utils/eventBus'
  import { forEach, trim, debounce } from 'lodash'
  import getRepository from '@/services'
  import { KycRepository } from '@/services/repositories/kyc'
  import PopupFee from './popup/PopupFee.vue'
  import PopupMixin from '@/mixins/popup'

  const apiKyc: KycRepository = getRepository('kyc')

  import countryJson from '@/utils/country/index.json'

  interface IListCountry {
    name: string
    dial_code: string
    code: string
  }

  @Component({ components: { PopupFee } })
  export default class FeeFilter extends Mixins(PopupMixin) {
    @Prop({ required: true, type: Array, default: [] }) listApproveBy!: Array<Record<string, any>>
    // filterBalance = {
    //   search: '',
    //   toBalanceAmount: '',
    //   fromBalanceAmount: '',
    //   toLockedAmount: '',
    //   fromLockedAmount: '',
    //   toAvailableAmount: '',
    //   fromAvailableAmount: '',
    //   orderBy: ''
    // }
    filterFee = {
      search: '',
      fromDate: '',
      toDate: '',
      fromAmount: '',
      toAmount: '',
      fromFee: '',
      toFee: '',
      status: '',
      orderBy: '1'
    }
    popupFeeBark:any
    loading = false
    listApprove: Array<Record<string, any>> = []
    queryApprove = {
      page: 1,
      limit: 20,
      search: ''
    }

    sorts: Array<Record<string, any>> = [
      {
        command: '1',
        label: this.$i18n.t('fee-filter.transaction-date'),
        divided: false,
        i18n: 'fee-filter.transaction-date'
      },
      {
        command: '2',
        label: this.$i18n.t('fee-filter.transaction-amount'),
        divided: false,
        i18n: 'fee-filter.transaction-amount'
      },
      {
        command: '3',
        label: this.$i18n.t('fee-filter.status'),
        divided: false,
        i18n: 'fee-filter.status'
      }
    ]
    sortActive = '1'
    listCountry: IListCountry[] = countryJson
    identificationType: Array<Record<string, any>> = [
      {
        id: 0,
        type: 'Id Card',
        value: 'ID_CARD'
      },
      {
        id: 1,
        type: 'Passport',
        value: 'PASSPORT'
      },
      {
        id: 2,
        type: 'Driver’s License',
        value: 'DRIVER_LICENSE'
      }
    ]
    isVisible = false

    @Watch('filterFee.search') handleSearch(value: string): void {
      this.searchText(value)
    }

    searchText = debounce((value: string) => {
      this.$emit('filterFee', {
        ...this.filterFee,
        search: trim(value)
      })
    }, 500)

    numberFormat(event: FocusEvent): void {
      const _event: any = event
      let fnumber = _event.target.value
      if (fnumber.length > 0) {
        fnumber = fnumber.replaceAll(',', '')
        fnumber = parseInt(fnumber)
        if (!isNaN(fnumber)) {
          fnumber = this.$options.filters?.numberWithCommas(fnumber)
          _event.target.value = fnumber
        } else {
          _event.target.value = 0
        }
      }
    }

    created(): void {
      EventBus.$on('changeLang', () => {
        console.log('a', window.localStorage.getItem('bc-lang'))
        forEach(this.sorts, elm => {
          elm.label = this.$i18n.t(elm.i18n)
        })
        this.$forceUpdate()
      })
      EventBus.$on('selectTabBalance', this.handleChangeTab)
      this.$emit('filterFee', this.filterFee)
    }

    destroyed(): void {
      EventBus.$off('changeLang')
      EventBus.$off('changeTab')
    }
    handleCatchBark(filtersData: any):void {
      const filterFee = {
        search: this.filterFee.search,
        ...filtersData,
        orderBy: this.filterFee.orderBy
      }
      this.$emit('filterFee', filterFee)
      console.log([filtersData])
    }
    handleOpen():void {
      this.setOpenPopup({
        popupName: 'popup-fee',
        isOpen: true
      })
    }

    handleShowPopper(): void {
      this.isVisible = true
      this.listApprove = [...this.listApproveBy]
    }

    handleSearchApprove(query: string): void {
      if (query !== '') {
        this.loading = true
        this.queryApprove.page = 1
        this.queryApprove.search = trim(query)
        apiKyc.getListApprove(this.queryApprove).then(res => {
          this.listApprove = res.content || []
          this.loading = false
        })
      } else {
        this.listApprove = this.listApproveBy
      }
    }

    loadMoreApprove(): void {
      this.queryApprove.page += 1
      apiKyc.getListApprove(this.queryApprove).then(res => {
        this.listApprove = [...this.listApprove, ...res.content]
      })
    }

    resetFilter(): void {
      this.filterFee = {
        search: '',
        fromDate: '',
        toDate: '',
        fromAmount: '',
        toAmount: '',
        fromFee: '',
        toFee: '',
        status: '',
        orderBy: ''
      }
    }

    handleChangeTab(): void {
      this.filterFee.search = ''
      const params = {
        search: this.filterFee.search
      }
      // this.$emit('filterBalance', params);
    }

    handleSort(command: string): void {
      this.sortActive = command
      this.filterFee.orderBy = command
      this.$emit('filterFee', this.filterFee)
      console.log('1')
    }

    handleApply(): void {
      this.isVisible = false
      const filters = {
        ...this.filterFee,
        // toBalanceAmount: this.filterBalance.replace(',')
        // fromBalanceAmount: '',
        // toLockedAmount: '',
        // fromLockedAmount: '',
        // toAvailableAmount: '',
        // fromAvailableAmount: '',
        // fromAvailableAmount: this.filterBalance.fromAvailableAmount.replaceAll(',', ''),
        // fromBalanceAmount: this.filterBalance.fromBalanceAmount.replaceAll(',', ''),
        // fromLockedAmount: this.filterBalance.fromLockedAmount.replaceAll(',', ''),
        // toAvailableAmount: this.filterBalance.toAvailableAmount.replaceAll(',', ''),
        // toBalanceAmount: this.filterBalance.toBalanceAmount.replaceAll(',', ''),
        // toLockedAmount: this.filterBalance.toLockedAmount.replaceAll(',', '')
        fromDate: this.popupFeeBark.fromDate,
        toDate: this.popupFeeBark.toDate,
        fromAmount: this.popupFeeBark.fromAmount,
        toAmount: this.popupFeeBark.toAmount,
        fromFee: this.popupFeeBark.fromFee,
        toFee: this.popupFeeBark.toFee,
        status: this.popupFeeBark.status
      }
      this.$emit('filterFee', filters)
    }

    handleReset(): void {
      this.filterFee = {
        search: '',
        fromDate: '',
        toDate: '',
        fromAmount: '',
        toAmount: '',
        fromFee: '',
        toFee: '',
        status: '',
        orderBy: ''
      }
      this.$emit('filterFee', this.filterFee)
      this.isVisible = false
    }
  }
</script>

<style scoped lang="scss">
  .dash {
    text-align: center;
  }

  .kyc-filter {
    background-color: #fff;

    .input-search {
      width: 400px;
      margin-right: 30px;
    }

    .sort {
      margin-left: 30px;
      cursor: pointer;
      color: #0a0b0d;
    }

    ::v-deep .filter-item {
      &:hover {
        .text-filter {
          color: #0151fc;

          .span-icon {
            color: #0151fc !important;
          }
        }
      }
    }

    ::v-deep .sort {
      &:hover {
        .el-dropdown-selfdefine {
          color: #0151fc;

          .span-icon {
            color: #0151fc !important;
          }
        }
      }

      .sort-title {
        &:focus {
          color: #0151fc;

          .span-icon {
            color: #0151fc !important;
          }
        }
      }
    }
  }
</style>
