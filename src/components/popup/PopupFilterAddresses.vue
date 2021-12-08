<template>
  <base-popup name="popup-filter-addresses" class="popup-filter-transaction" width="600px">
    <div class="title-popup" slot="title">
      <span>{{ $t('transaction.popup.title-filter') }}</span>
    </div>
    <div class="content">
      <el-form>
        <el-form-item :label="$t('label.asset')">
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
          <el-form-item class="be-flex-item mr-40 form-item-line" :label="$t('label.created-date')">
            <el-date-picker class="w-100 date-picker" format="MM/dd/yyyy" value-format="yyyy-MM-dd" :placeholder="$t('label.from-date')" v-model="filter.fromCreatedAt" type="date">
            </el-date-picker>
          </el-form-item>

          <el-form-item class="be-flex-item hide-label" label="1">
            <el-date-picker class="w-100 date-picker" format="MM/dd/yyyy" :placeholder="$t('label.to-date')" value-format="yyyy-MM-dd" v-model="filter.toCreatedAt" type="date">
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
    @Prop({ required: true, type: String, default: '' }) tabActiveFilter!: string
    @Prop({ required: true, type: String, default: 'customer' }) type!: string

    @beBase.State('coinMain') coinMain!: string

    filter: Record<string, any> = {
      currency: '',
      fromCreatedAt: '',
      toCreatedAt: '',
      network: ''
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
        label: 'Mainnet',
        value: 'MAINNET'
      },
      {
        id: 1,
        label: 'Testnet',
        value: 'TESTNET'
      },
      {
        id: 2,
        label: 'Rinkeby',
        value: 'RINKEBY'
      }
    ]
    errorType = ''

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
        currency: '',
        fromCreatedAt: '',
        toCreatedAt: '',
        network: ''
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

    handleApply(): void {
      this.setOpenPopup({
        popupName: 'popup-filter-addresses',
        isOpen: false
      })
      let _currency = ''
      if (this.filter.currency) {
        _currency = this.filter.currency.join(',')
      }
      this.$emit('filter', { ...this.filter, currency: _currency })
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
