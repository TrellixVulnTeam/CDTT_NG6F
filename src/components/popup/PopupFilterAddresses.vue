<template>
  <base-popup name="popup-filter-addresses" class="popup-filter-transaction" width="600px">
    <div class="title-popup" slot="title">
      <span>{{ $t('transaction.popup.title-filter') }}</span>
    </div>
    <div class="content">
      <el-form>
        <el-form-item :label="$t('label.asset')">
          <el-select v-model="filter.currency" clearable class="w-100">
            <el-option v-for="wallet in listAssetNetwork" :key="wallet.id" :value="wallet.currency" :label="wallet.currencyName">
              <template>
                <div class="be-flex wallet-item">
                  <base-icon :icon="renderIconAsset(wallet.currency)" size="24" />
                  <span class="d-ib" style="margin-left: 10px">{{ wallet.currencyName }}</span>
                  <span class="d-ib" style="margin-left: 4px">({{ wallet.currency.toUpperCase() }})</span>
                </div>
              </template>
            </el-option>
          </el-select>
        </el-form-item>
        <div class="be-flex jc-space-between row">
          <el-form-item class="be-flex-item mr-40 form-item-line" :label="$t('label.created-date')">
            <el-date-picker
              class="w-100 date-picker"
              format="MM/dd/yyyy"
              value-format="yyyy-MM-dd"
              :placeholder="$t('label.from-date')"
              v-model="filter.fromCreatedAt"
              type="date"
              :picker-options="pickerOption2"
            >
            </el-date-picker>
          </el-form-item>

          <el-form-item class="be-flex-item hide-label" label="1">
            <el-date-picker
              class="w-100 date-picker"
              format="MM/dd/yyyy"
              :placeholder="$t('label.to-date')"
              value-format="yyyy-MM-dd"
              v-model="filter.toCreatedAt"
              type="date"
              :picker-options="pickerOption"
            >
            </el-date-picker>
          </el-form-item>
        </div>
        <div>
          <el-form-item :label="$t('label.network')">
            <el-select v-model="filter.network" clearable class="w-100">
              <el-option v-for="status in listStatus" :key="status.id" :value="status.value" :label="status.label">
                <template>
                  <span class="d-ib">{{ status.label }}</span>
                </template>
              </el-option>
            </el-select>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <div slot="footer" class="footer">
      <button class="btn-default mr-15 text-regular btn-h40" @click="handleReset">{{ $t('button.reset') }}</button>
      <!-- <button class="btn-default-bg text-regular btn-h40"  disabled  @click="handleConfirm">{{ $t('button.continue') }}</button> -->
      <button class="btn-default-bg text-regular btn-h40" @click="handleApply">
        {{ $t('button.continue') }}
      </button>
    </div>
  </base-popup>
</template>

<script lang="ts">
  import { Component, Mixins, Prop } from 'vue-property-decorator'
  import includes from 'lodash/includes'
  import PopupMixin from '@/mixins/popup'
  import { namespace } from 'vuex-class'

  const beBase = namespace('beBase')

  @Component
  export default class PopupFilterAddresses extends Mixins(PopupMixin) {
    @Prop({
      required: true,
      type: Array,
      default: () => {
        return []
      }
    })
    listAssetNetwork!: Array<Record<string, any>>
    @beBase.State('coinMain') coinMain!: string

    filter: Record<string, any> = {
      currency: null,
      fromCreatedAt: null,
      toCreatedAt: null,
      network: null
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
        label: 'Ethereum ',
        value: 'ERC20'
      },
      {
        id: 1,
        label: 'Binance Smart Chain',
        value: 'BEP20'
      },
      {
        id: 2,
        label: 'Testnet ',
        value: 'TESTNET'
      }
    ]
    errorType = ''
    renderIconAsset(currency: string): string {
      switch (currency) {
        case 'BNB':
          return 'icon-bnb'
        case 'BTC':
          return 'icon-btc'
        case 'ETH':
          return 'icon-eth'
        case 'CLM':
          return 'icon-clm'
        case 'USDC':
          return 'icon-usdc'
        case 'USDT':
          return 'icon-usdt'

        default:
          return 'icon-lin'
      }
    }
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

    public handleReset(): void {
      this.filter = {
        currency: null,
        fromCreatedAt: null,
        toCreatedAt: null,
        network: null
      }
      // this.setOpenPopup({
      //   popupName: 'popup-filter-transaction',
      //   isOpen: false
      // })
      // this.$emit('filter', this.filter)
    }

    checkValid(): boolean {
      let fromDate = new Date(this.filter.fromCreateAt)
      let toDate = new Date(this.filter.toCreateAt)
      if (fromDate.getTime() > toDate.getTime()) {
        this.errorType = 'time'
        return false
      }
      return true
    }
    get pickerOption(): any {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const _this = this
      return {
        disabledDate(time: Date) {
          return _this.disableTime(time, 'from-to')
        }
      }
    }
    get pickerOption2(): any {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const _this = this
      return {
        disabledDate(time: Date) {
          return _this.disableTime(time, 'to-from')
        }
      }
    }

    disableTime(time: Date, type: string): any {
      if (type === 'from-to') {
        if (this.filter.fromCreatedAt) {
          return time.getTime() < new Date(this.filter.fromCreatedAt).getTime()
        }
      } else {
        if (this.filter.toCreatedAt) {
          return time.getTime() > new Date(this.filter.toCreatedAt).getTime()
        }
      }
    }

    handleApply(): void {
      this.setOpenPopup({
        popupName: 'popup-filter-addresses',
        isOpen: false
      })

      if (this.filter.currency === '') {
        this.filter.currency = null
      }
      if (this.filter.fromCreatedAt === '') {
        this.filter.fromCreatedAt = null
      }
      if (this.filter.toCreatedAt === '') {
        this.filter.toCreatedAt = null
      }
      if (this.filter.network === '') {
        this.filter.network = null
      }
      this.$emit('filter', { ...this.filter })
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
  .prefix {
    height: 100%;
    font-size: 16px;
    color: #0a0b0d;
    position: absolute;
    left: 8px;
    top: 4px;
  }

  .form-item-line {
    position: relative;

    &::after {
      content: '';
      position: absolute;
      height: 2px;
      width: 8px;
      background: #dbdbdb;
      top: 52px;
      right: -25px;
    }
  }
</style>
