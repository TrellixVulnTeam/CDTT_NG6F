<template>
  <base-popup name="popup-filter-transaction" class="popup-filter-transaction" width="600px">
    <div class="title-popup" slot="title">
      <span>{{ $t('transaction.popup.title-filter') }}</span>
    </div>
    <div class="content">
      <el-form>
        <el-form-item :label="$t('label.buy-token')">
          <el-select v-model="filter.address" multiple clearable class="w-100">
            <el-option v-for="wallet in listWallet" :key="wallet.id" :value="wallet.symbol" :label="wallet.name">
              <template>
                <div class="be-flex wallet-item">
                  <base-icon :icon="wallet.icon" size="24" />
                  <span class="d-ib" style="margin-left: 10px">{{ wallet.name }}</span>
                </div>
              </template>
            </el-option>
          </el-select>
        </el-form-item>
        <div class="be-flex jc-space-between row">
          <el-form-item class="be-flex-item mr-40 form-item-line" :label="$t('label.trans-date')">
            <el-date-picker class="w-100" format="yyyy/MM/dd" value-format="yyyy-MM-dd" :placeholder="$t('label.from-date')" v-model="filter.fromCreatedAt" type="date">
            </el-date-picker>
          </el-form-item>

          <el-form-item class="be-flex-item hide-label" label="1">
            <el-date-picker class="w-100" format="yyyy/MM/dd" :placeholder="$t('label.to-date')" value-format="yyyy-MM-dd" v-model="filter.toCreatedAt" type="date">
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
            <el-input v-model="filter.toAmount" :placeholder="$t('placeholder.to-amount')" @keypress.native="onlyNumber($event, 'toAmount')" @keyup.native="numberFormat($event)">
              <div class="prefix" slot="prefix">$</div>
            </el-input>
          </el-form-item>
        </div>
        <el-form-item :label="$t('label.status')">
          <el-select v-model="filter.status" clearable class="w-100">
            <el-option v-for="status in listStatus" :key="status.id" :value="status.label" :label="status.label">
              <template>
                <span class="d-ib">{{ status.label }}</span>
              </template>
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <div slot="footer" class="footer">
      <button class="btn-default mr-15 text-regular btn-h40">{{ $t('button.reset') }}</button>
      <!-- <button class="btn-default-bg text-regular btn-h40"  disabled  @click="handleConfirm">{{ $t('button.continue') }}</button> -->
      <button class="btn-default-bg text-regular btn-h40">
        {{ $t('button.continue') }}
      </button>
    </div>
  </base-popup>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import includes from 'lodash/includes'
  @Component
  export default class PopupFilterTransaction extends Vue {
    filter: Record<string, any> = {
      address: []
    }
    listWallet: Array<Record<string, any>> = [
      {
        id: 5,
        name: 'Lynkey Wallet',
        symbol: 'LYNK',
        icon: 'icon-lin'
      },
      {
        id: 0,
        name: 'Bitcoin Wallet',
        symbol: 'BTC',
        icon: 'icon-btc'
      },
      {
        id: 1,
        name: 'Ethereum Wallet',
        symbol: 'ETH',
        icon: 'icon-eth'
      },
      {
        id: 2,
        name: 'Tether Wallet',
        symbol: 'USDT',
        icon: 'icon-usdt',
        disabled: true
      },
      {
        id: 3,
        name: 'USDC Wallet',
        symbol: 'USDC',
        icon: 'icon-usdc',
        disabled: true
      },
      {
        id: 4,
        name: 'BNB Wallet',
        symbol: 'BNB',
        icon: 'icon-bnb',
        disabled: true
      }
    ]

    listStatus: Array<Record<string, any>> = [
      {
        id: 0,
        label: 'Succsess'
      },
      {
        id: 1,
        label: 'Pending'
      },
      {
        id: 2,
        label: 'Error'
      }
    ]

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
