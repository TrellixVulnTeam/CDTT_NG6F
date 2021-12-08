<template>
  <div class="pb-24 pt-24 be-flex align-center kyc-filter">
    <el-input v-model="filterBalance.search" class="input-search" :placeholder="$t('placeholder.search')">
      <span slot="prefix" class="prefix-search">
        <base-icon icon="icon-search" size="24" />
      </span>
    </el-input>
    <div class="filter-item">
      <el-popover :value="isVisible" placement="bottom-start" width="518" trigger="click" popper-class="popper-filter" @show="handleShowPopper">
        <div class="content">
          <el-form>
            <el-form-item :label="$t('label.buy-token')">
              <el-select v-model="filter.currency" multiple clearable class="w-100">
                <el-option v-for="wallet in getListWallet" :key="wallet.id" :value="wallet.symbol" :label="wallet.name">
                  <template>
                    <div class="be-flex wallet-item">
                      <base-icon :icon="wallet.icon" size="24" />
                      <span class="d-ib" style="margin-left: 10px">{{ wallet.name }}</span>
                      <span class="d-ib" style="margin-left: 4px">({{ wallet.symbol.toUpperCase() }})</span>
                    </div>
                  </template>
                </el-option>
              </el-select>
            </el-form-item>

            <div class="be-flex jc-space-between row">
              <el-form-item class="be-flex-item mr-40 form-item-line" :label="$t('label.trans-date')">
                <el-date-picker class="w-100 date-picker" format="MM/dd/yyyy" value-format="yyyy-MM-dd" :placeholder="$t('label.from-date')" v-model="filter.fromDate" type="date">
                </el-date-picker>
              </el-form-item>

              <el-form-item class="be-flex-item hide-label" label="1">
                <el-date-picker class="w-100 date-picker" format="MM/dd/yyyy" :placeholder="$t('label.to-date')" value-format="yyyy-MM-dd" v-model="filter.toDate" type="date">
                </el-date-picker>
              </el-form-item>
            </div>
            <div class="be-flex jc-space-between row">
              <el-form-item class="be-flex-item mr-40 form-item-line" :label="$t('label.trans-amount')">
                <el-input
                  v-model="filter.fromAmount"
                  :placeholder="$t('placeholder.from-amount')"
                  @keypress.native="onlyNumber($event, 'fromAmount')"
                  @keyup.native="numberFormat($event)"
                >
                  <div class="prefix" slot="prefix">$</div>
                </el-input>
              </el-form-item>

              <el-form-item class="be-flex-item hide-label" label="1">
                <el-input
                  v-model="filter.toAmount"
                  :placeholder="$t('placeholder.to-amount')"
                  @keypress.native="onlyNumber($event, 'toAmount')"
                  @keyup.native="numberFormat($event)"
                >
                  <div class="prefix" slot="prefix">$</div>
                </el-input>
              </el-form-item>
            </div>
            <!-- <el-form-item :label="$t('label.status')" class="be-flex-item mr-40">
                <el-select v-model="filter.status" clearable class="w-100">
                  <el-option v-for="status in listStatus" :key="status.id" :value="status.value" :label="status.label">
                    <template>
                      <span class="d-ib">{{ status.label }}</span>
                    </template>
                  </el-option>
                </el-select>
              </el-form-item> -->
          </el-form>
        </div>
        <div class="be-flex jc-flex-end footer">
          <el-button class="btn-default btn-400 btn-h-40 btn-close text-regular" @click="handleReset">{{ $t('button.reset') }}</el-button>
          <el-button class="btn-default-bg btn-400 btn-h-40 is-none-border h-40 text-regular" @click="handleApply">{{ $t('button.apply') }}</el-button>
        </div>
        <div slot="reference" class="cursor text-filter" style="font-size: 16px">
          <span class="abicon"> <base-icon style="color: #5b616e; margin-right: 10px" icon="icon-filter" size="18" /> </span>
          {{ $t('kyc.filter.filter') }}
        </div>
      </el-popover>
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
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
  import EventBus from '@/utils/eventBus'
  import { forEach, trim, debounce } from 'lodash'
  import getRepository from '@/services'
  import { KycRepository } from '@/services/repositories/kyc'
  import { namespace } from 'vuex-class'
  const apiKyc: KycRepository = getRepository('kyc')
  const beBase = namespace('beBase')
  import countryJson from '@/utils/country/index.json'
  interface IListCountry {
    name: string
    dialCode: string
    isoCode: string
    flag: string
  }
  @Component
  export default class KycFilter extends Vue {
    @beBase.State('coinMain') coinMain!: string
    @Prop({ required: true, type: Array, default: [] }) listApproveBy!: Array<Record<string, any>>
    filterBalance = {
      search: '',
      toBalanceAmount: '',
      fromBalanceAmount: '',
      toLockedAmount: '',
      fromLockedAmount: '',
      toAvailableAmount: '',
      fromAvailableAmount: '',
      orderBy: ''
    }
    filter: Record<string, any> = {
      currency: '',
      fromDate: '',
      toDate: '',
      fromAmount: '',
      toAmount: '',
      status: '',
      bonusType: ''
    }
    listWallet: Array<Record<string, any>> = [
      {
        id: 0,
        name: 'Bitcoin',
        symbol: 'btc',
        icon: 'icon-btc'
      },
      {
        id: 1,
        name: 'Ethereum',
        symbol: 'eth',
        icon: 'icon-eth'
      },
      {
        id: 2,
        name: 'Tether',
        symbol: 'usdt',
        icon: 'icon-usdt',
        disabled: true
      },
      {
        id: 3,
        name: 'USDC',
        symbol: 'usdc',
        icon: 'icon-usdc',
        disabled: true
      },
      {
        id: 4,
        name: 'BNB',
        symbol: 'bnb',
        icon: 'icon-bnb',
        disabled: true
      }
    ]

    listStatus: Array<Record<string, any>> = [
      {
        id: 0,
        label: 'Pending',
        value: 'PENDING'
      },
      {
        id: 1,
        label: 'Processing',
        value: 'PROCESSING'
      },
      {
        id: 2,
        label: 'Success',
        value: 'SUCCESS'
      }
      // {
      //   id: 3,
      //   label: 'Failed',
      //   value: 'FAILED'
      // },
      // {
      //   id: 4,
      //   label: 'Rejected',
      //   value: 'REJECTED'
      // }
    ]

    listBonusType: Array<Record<string, any>> = [
      {
        id: 0,
        label: 'Sign Up',
        value: 'BONUS_SIGN_UP'
      },
      {
        id: 1,
        label: 'Crowdsale',
        value: 'BONUS_CROWDSALE'
      },
      {
        id: 2,
        label: 'First Transaction',
        value: 'BONUS_FIRST_TRANS'
      },
      {
        id: 3,
        label: 'Affiliate',
        value: 'BONUS_AFFILIATE'
      },
      {
        id: 4,
        label: 'Big Backers',
        value: 'BONUS_BIG_BACKER'
      },
      {
        id: 5,
        label: 'Early Backers',
        value: 'BONUS_EARLY_BACKER'
      }
    ]

    get getListWallet(): Array<Record<string, any>> {
      if (this.coinMain === 'LYNK') {
        return [
          {
            id: 5,
            name: 'Lynkey',
            symbol: 'lynk',
            icon: 'icon-lin'
          },
          ...this.listWallet
        ]
      }
      return [
        {
          id: 5,
          name: 'CLM',
          symbol: 'clm',
          icon: 'icon-clm'
        },
        ...this.listWallet
      ]
    }
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
        label: this.$i18n.t('kyc.sort.date'),
        divided: false,
        i18n: 'kyc.sort.date'
      },
      {
        command: '2',
        label: this.$i18n.t('balance.lastChange'),
        divided: false,
        i18n: 'balance.lastChange'
      },
      {
        command: '3',
        label: this.$i18n.t('balance.balance'),
        divided: false,
        i18n: 'balance.balance'
      },
      {
        command: '4',
        label: this.$i18n.t('balance.lockedAmount'),
        divided: false,
        i18n: 'balance.lockedAmount'
      },
      {
        command: '5',
        label: this.$i18n.t('balance.availableAmout'),
        divided: false,
        i18n: 'balance.availableAmout'
      },
      {
        command: '6',
        label: this.$i18n.t('balance.name'),
        divided: false,
        i18n: 'balance.name'
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

    @Watch('filterBalance.search') handleSearch(value: string): void {
      this.searchText(value)
    }
    @Watch('filterBalance.fromAvailableAmount') availabelAmount(value: string): void {
      console.log('value', '$ ' + value)
      // this.filterBalance.fromAvailableAmount = "$ " + value
    }
    searchText = debounce((value: string) => {
      console.log('thanh', this.filterBalance)
      this.$emit('filterBalance', {
        ...this.filterBalance,
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
      // this.$emit('filterBalance', this.filterBalance)
      console.log('filter', this.filterBalance)
    }
    destroyed(): void {
      EventBus.$off('changeLang')
      EventBus.$off('changeTab')
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
      this.filterBalance = {
        search: '',
        toBalanceAmount: '',
        fromBalanceAmount: '',
        toLockedAmount: '',
        fromLockedAmount: '',
        toAvailableAmount: '',
        fromAvailableAmount: '',
        orderBy: ''
      }
    }

    handleChangeTab(): void {
      ;(this.filterBalance.search = ''),
        (this.filterBalance.toBalanceAmount = ''),
        (this.filterBalance.fromBalanceAmount = ''),
        (this.filterBalance.toLockedAmount = ''),
        (this.filterBalance.fromLockedAmount = ''),
        (this.filterBalance.toAvailableAmount = ''),
        (this.filterBalance.fromAvailableAmount = ''),
        (this.filterBalance.orderBy = '')
      this.sortActive = '1'
      // this.$emit('filterBalance', params);
    }

    handleSort(command: string): void {
      this.sortActive = command
      this.filterBalance.orderBy = command
      this.$emit('filterBalance', this.filterBalance)
      console.log('1')
    }

    handleApply(): void {
      this.isVisible = false
      const filters = {
        ...this.filterBalance,
        // toBalanceAmount: this.filterBalance.replace(',')
        // fromBalanceAmount: '',
        // toLockedAmount: '',
        // fromLockedAmount: '',
        // toAvailableAmount: '',
        // fromAvailableAmount: '',
        fromAvailableAmount: this.filterBalance.fromAvailableAmount.replaceAll(',', ''),
        fromBalanceAmount: this.filterBalance.fromBalanceAmount.replaceAll(',', ''),
        fromLockedAmount: this.filterBalance.fromLockedAmount.replaceAll(',', ''),
        toAvailableAmount: this.filterBalance.toAvailableAmount.replaceAll(',', ''),
        toBalanceAmount: this.filterBalance.toBalanceAmount.replaceAll(',', ''),
        toLockedAmount: this.filterBalance.toLockedAmount.replaceAll(',', '')
      }
      console.log('data', filters)
      this.$emit('filterBalance', filters)
    }

    handleReset(): void {
      this.filterBalance = {
        search: '',
        orderBy: '',
        toBalanceAmount: '',
        fromBalanceAmount: '',
        toLockedAmount: '',
        fromLockedAmount: '',
        toAvailableAmount: '',
        fromAvailableAmount: ''
      }
      this.$emit('filterBalance', this.filterBalance)
      this.isVisible = false
    }
  }
</script>

<style scoped lang="scss">
  .dash {
    text-align: center;
  }
  .prefix {
    height: 100%;
    font-size: 16px;
    color: #0a0b0d;
    position: absolute;
    left: 8px;
    top: 4px;
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
