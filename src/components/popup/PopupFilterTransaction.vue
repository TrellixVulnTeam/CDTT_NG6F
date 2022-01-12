<template>
  <base-popup name="popup-filter-transaction" class="popup-filter-transaction" width="600px">
    <div class="title-popup" slot="title">
      <span>{{ $t('transaction.popup.title-filter') }}</span>
    </div>
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
            <el-date-picker
              class="w-100 date-picker"
              format="MM/dd/yyyy"
              value-format="timestamp"
              :placeholder="$t('label.from-date')"
              v-model="filter.fromDate"
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
              value-format="timestamp"
              v-model="filter.toDate"
              type="date"
              :picker-options="pickerOption"
            >
            </el-date-picker>
          </el-form-item>
        </div>
        <div class="transaction-amount-form">
          <div class="be-flex jc-space-between row">
            <el-form-item class="be-flex-item mr-40 form-item-line" :class="errorType === 'amount' && 'error-amount-border-popup-transaction'" :label="$t('label.trans-amount')">
              <el-input
                v-model="filter.fromAmount"
                :placeholder="$t('placeholder.from-amount')"
                @keypress.native="onlyNumber($event, 'fromAmount')"
                @keyup.native="numberFormat($event)"
                @blur="clickOutSide"
              >
                <div class="prefix" slot="prefix">$</div>
              </el-input>
            </el-form-item>

            <el-form-item class="be-flex-item hide-label" label="1" :class="errorType === 'amount' && 'error-amount-border-popup-transaction'">
              <el-input
                v-model="filter.toAmount"
                :placeholder="$t('placeholder.to-amount')"
                @keypress.native="onlyNumber($event, 'toAmount')"
                @keyup.native="numberFormat($event)"
                @blur="clickOutSide"
              >
                <div class="prefix" slot="prefix">$</div>
              </el-input>
            </el-form-item>
          </div>
          <div v-if="errorType === 'amount'" class="error-amount">
            <p>{{ $t('notify.amount-invalid') }}</p>
          </div>
        </div>
        <div v-if="tabActiveFilter === 'bonus'" class="be-flex jc-space-between">
          <el-form-item :label="$t('label.status')" class="be-flex-item mr-40">
            <el-select v-model="filter.status" clearable class="w-100">
              <el-option v-for="status in listStatus" :key="status.id" :value="status.value" :label="status.label">
                <template>
                  <span class="d-ib">{{ status.label }}</span>
                </template>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('label.bonus-type')" class="be-flex-item">
            <el-select v-model="filter.bonusType" clearable class="w-100">
              <el-option v-for="status in listBonusType" :key="status.id" :value="status.value" :label="status.label">
                <template>
                  <span class="d-ib">{{ status.label }}</span>
                </template>
              </el-option>
            </el-select>
          </el-form-item>
        </div>
        <div v-else>
          <el-form-item :label="$t('label.status')">
            <el-select v-model="filter.status" clearable class="w-100">
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
      <button class="btn-default-bg text-regular btn-h40" @click="handleApply" :disabled="errorType === 'amount'">
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
  export default class PopupFilterTransaction extends Mixins(PopupMixin) {
    @Prop({ required: true, type: String, default: '' }) tabActiveFilter!: string
    @Prop({ required: true, type: String, default: 'customer' }) type!: string

    @beBase.State('coinMain') coinMain!: string

    filter: Record<string, any> = {
      currency: '',
      fromDate: null,
      toDate: null,
      fromAmount: '',
      toAmount: '',
      status: '',
      bonusType: ''
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
        if (this.filter.fromDate) {
          return time.getTime() / 1000 < new Date(this.filter.fromDate).getTime() / 1000 - 7 * 60 * 60
        }
      } else {
        if (this.filter.toDate) {
          return time.getTime() / 1000 > new Date(this.filter.toDate).getTime() / 1000
        }
      }
    }

    clickOutSide() {
      this.checkValid()
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
      },
      {
        id: 4,
        name: 'BUSD',
        symbol: 'busd',
        icon: 'icon-busd',
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
    errorType = ''

    get getListWallet(): Array<Record<string, any>> {
      if (this.coinMain === 'LYNK') {
        return [
          {
            id: 5,
            name: 'LynKey',
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
        fromDate: '',
        toDate: '',
        fromAmount: '',
        toAmount: '',
        status: null,
        bonusType: null
      }

      this.errorType = ''
      // this.setOpenPopup({
      //   popupName: 'popup-filter-transaction',
      //   isOpen: false
      // })
      // this.$emit('filter', this.filter)
    }

    checkValid(): boolean {
      let toAmount = parseFloat(this.filter.toAmount.replaceAll(',', ''))
      let fromAmount = parseFloat(this.filter.fromAmount.replaceAll(',', ''))
      if (fromAmount > toAmount) {
        this.errorType = 'amount'
        return false
      } else {
        this.errorType = ''
        return true
      }
    }

    handleApply(): void {
      if (this.checkValid()) {
        this.setOpenPopup({
          popupName: 'popup-filter-transaction',
          isOpen: false
        })
        let _currency = ''
        let _fromAmount = ''
        let _toAmount = ''
        if (this.filter.currency) {
          _currency = this.filter.currency.join(',')
        }
        if (this.filter.fromAmount) {
          _fromAmount = this.filter.fromAmount.replaceAll(',', '')
        }
        if (this.filter.toAmount) {
          _toAmount = this.filter.toAmount.replaceAll(',', '')
        }
        let fromDate = ''
        let toDate = ''
        if (this.filter.fromDate) {
          fromDate = this.$options.filters?.formatReferral(this.filter.fromDate)
        }
        if (this.filter.toDate) {
          toDate = this.$options.filters?.formatReferral(this.filter.toDate + 86399000)
        }
        this.$emit('filter', { ...this.filter, fromAmount: _fromAmount, toAmount: _toAmount, currency: _currency, fromDate, toDate })
      }
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
      this.checkValid()
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

  .transaction-amount-form {
    position: relative;

    .error-amount {
      position: absolute;
      bottom: 0;
      left: 0;

      p {
        font-family: Open Sans;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 20px;
        color: #cf202f;
      }
    }
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
  .footer {
    button[disabled] {
      opacity: 0.2;
      cursor: not-allowed;
    }
  }
</style>
