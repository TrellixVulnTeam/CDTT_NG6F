<template>
  <base-popup name="popup-filter-crowdsale" class="popup-filter-crowdsale" width="600px" :isShowFooter="true" :open="handleOpen" :close="handleClose">
    <div slot="title">
      <span>{{ $t('crowdsale.popup-filter.title') }}</span>
    </div>
    <div class="content">
      <el-form class="form-filter-crowdsale">
        <div class="box-input-1 be-flex align-center jc-space-between">
          <div class="round">
            <div class="label">{{ $t('crowdsale.popup-filter.round') }}</div>
            <el-form-item prop="round" class="box-input">
              <el-select class="select" v-model="form.round" :placeholder="$t('crowdsale.popup-filter.planceOderRound')" clearable>
                <div infinite-scroll-delay="500">
                  <el-option v-for="item in optionByRound" :key="item.id" :label="item.label" :value="item.id"> </el-option>
                </div>
              </el-select>
            </el-form-item>
          </div>
          <div class="country">
            <div class="label">{{ $t('crowdsale.popup-filter.country') }}</div>
            <el-form-item prop="country" class="box-input">
              <el-select
                class="select"
                v-model="form.country"
                filterable
                reserve-keyword
                remote
                :remote-method="remoteCountry"
                :placeholder="$t('crowdsale.popup-filter.planceOderCountry')"
              >
                <el-option v-for="(country, index) in listCountry" :key="index" :label="country.name" :value="country.name" />
              </el-select>
            </el-form-item>
          </div>
        </div>
        <div class="by-with-wallet">
          <div class="label">{{ $t('crowdsale.popup-filter.buyWithWallet') }}</div>
          <el-form-item prop="byWallet" class="box-input">
            <el-select class="select" v-model="form.byWallet" :placeholder="$t('crowdsale.popup-filter.planceOderWallet')" clearable>
              <div infinite-scroll-delay="500">
                <el-option v-for="item in optionByWallet" :key="item.id" :label="item.label" :value="item.id"> </el-option>
              </div>
            </el-select>
          </el-form-item>
        </div>
        <div class="by-with-token">
          <div class="label">{{ $t('crowdsale.popup-filter.buyWithToken') }}</div>
          <el-form-item prop="byToken" class="box-input">
            <el-select class="select" v-model="form.byToken" multiple :placeholder="$t('crowdsale.popup-filter.planceOderToken')">
              <div infinite-scroll-delay="500">
                <el-option v-for="item in optionByToken" :key="item.id" :label="item.label" :value="item.id"> </el-option>
              </div>
            </el-select>
          </el-form-item>
        </div>
        <div class="label">{{ $t('crowdsale.popup-filter.transactionDate') }}</div>
        <div class="box-input-2 transaction-date be-flex align-center jc-space-between">
          <el-form-item prop="transactionDateStart" class="box-input">
            <el-date-picker
              class="box-input"
              v-model="form.transactionDateStart"
              value-format="yyyy-MM-dd"
              format="MM/dd/yyyy"
              type="date"
              clearable
              :picker-options="pickerOptions"
              :placeholder="$t('crowdsale.popup-filter.planceOderTransactionDateStart')"
            >
            </el-date-picker>
          </el-form-item>

          <div class="line"></div>
          <el-form-item prop="transactionDateEnd" class="box-input">
            <el-date-picker
              :placeholder="$t('crowdsale.popup-filter.planceOderTransactionDateEnd')"
              class="box-input"
              v-model="form.transactionDateEnd"
              value-format="yyyy-MM-dd"
              format="MM/dd/yyyy"
              type="date"
              clearable
              :picker-options="pickerOptions"
            >
            </el-date-picker>
          </el-form-item>
        </div>
        <div class="label">{{ $t('crowdsale.popup-filter.transactionAmount') }}</div>
        <div class="box-input-3 transaction-amount be-flex align-center jc-space-between">
          <el-form-item prop="transactionAmountStart" class="box-input">
            <el-input
              :placeholder="$t('crowdsale.popup-filter.planceOderTransactionDateStart')"
              v-model="form.transactionAmountStart"
              clearable
              @keyup.native="numberFormat($event)"
            ></el-input>
            <div v-if="form.transactionAmountStart" class="dolar fw-400 fs-16">$</div>
          </el-form-item>

          <div class="line"></div>
          <el-form-item prop="transactionAmountEnd" class="box-input">
            <el-input
              :placeholder="$t('crowdsale.popup-filter.planceOderTransactionDateEnd')"
              v-model="form.transactionAmountEnd"
              clearable
              @keyup.native="numberFormat($event)"
            ></el-input>
            <div v-if="form.transactionAmountEnd" class="dolar fw-400 fs-16">$</div>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <div slot="footer" class="footer">
      <div @click="handleClose" class="btn-action btn-close">{{ $t('crowdsale.popup-filter.reset') }}</div>
      <div @click="handleSubmit" class="btn-action btn-submit">{{ $t('crowdsale.popup-filter.apply') }}</div>
    </div>
  </base-popup>
</template>
<script lang="ts">
  import { Component, Mixins, Prop, Watch } from 'vue-property-decorator'
  import PopupMixin from '@/mixins/popup'
  import { trim, filter, debounce } from 'lodash'
  import getRepository from '@/services'
  import countryJson from '@/utils/country/index.json'
  interface IListCountry {
    name: string
    dialCode: string
    isoCode: string
    flag: string
  }
  @Component({ components: {} })
  export default class PopupFilterCrowdsale extends Mixins(PopupMixin) {
    form: any = {
      round: '',
      country: '',
      byWallet: '',
      byToken: '',
      transactionDateStart: '',
      transactionDateEnd: '',
      transactionAmountStart: '',
      transactionAmountEnd: ''
    }
    listCountry: IListCountry[] = countryJson
    pickerOptions = {
      disabledDate(time: any) {
        return time.getTime() < Date.now()
      }
    }
    optionByToken: any = [
      {
        id: '1',
        label: 'BTC'
      },
      {
        id: '2',
        label: 'LYNK'
      },
      {
        id: '3',
        label: 'ETH'
      }
    ]
    optionByWallet: any = [
      {
        id: '1',
        label: 'Meta Mask'
      },
      {
        id: '2',
        label: 'Wallet Binance'
      },
      {
        id: '3',
        label: 'Wallet ETH'
      }
    ]
    optionByRound: any = [
      {
        id: '1',
        label: `${this.$t('crowdsale.popup-filter.round')} 1`
      },
      {
        id: '2',
        label: `${this.$t('crowdsale.popup-filter.round')} 2`
      },
      {
        id: '3',
        label: `${this.$t('crowdsale.popup-filter.round')} 3`
      },
      {
        id: '4',
        label: `${this.$t('crowdsale.popup-filter.round')} 4`
      }
    ]
    handleReset(): void {
      this.form = {
        round: '',
        country: '',
        byWallet: '',
        byToken: '',
        transactionDateStart: '',
        transactionDateEnd: '',
        transactionAmountStart: '',
        transactionAmountEnd: ''
      }
      if (this.$refs.filterCrowdsale) {
        //@ts-ignore
        this.$refs.filterCrowdsale.clearValidate()
      }
    }
    async handleSubmit(): Promise<void> {
      console.log(1)
    }
    async handleOpen(): Promise<void> {
      await this.handleReset()
    }
    async handleClose(): Promise<void> {
      await this.handleReset()
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
    remoteCountry(query: string): void {
      if (query) {
        const currentCountry = filter(
          this.listCountry,
          country => trim(country.isoCode).toUpperCase().includes(query.toUpperCase()) || trim(country.name).toUpperCase().includes(query.toUpperCase())
        )
        if (currentCountry.length > 0) {
          this.listCountry = currentCountry
        }
      } else if (!query) {
        this.listCountry = countryJson
      }
    }
    created(): void {
      const currentCountry = filter(this.listCountry, country => country.isoCode === 'VN')[0]
      this.form.country = currentCountry.name
    }
  }
</script>
<style scoped lang="scss">
  .popup-filter-crowdsale {
    .content {
      .select {
        width: 100%;
      }
      color: var(--bc-text-primary);
      .box-input-1,
      .box-input-2,
      .box-input-3 {
        margin-bottom: 24px;
        .box-input {
          width: 256px;
        }
      }
      .box-input-3 {
        .box-input {
          position: relative;
        }
        .dolar {
          position: absolute;
          top: 5px;
          left: 12px;
        }
      }
      .by-with-wallet,
      .by-with-token {
        margin-bottom: 24px;
      }
      .label {
        font-weight: 400;
        font-size: 14px;
        margin-bottom: 8px;
      }
      .box-input {
        margin-top: 8px;
        height: 48px;
        margin-bottom: unset !important;
        margin-top: unset !important;
      }
      .line {
        width: 8px;
        height: 2px;
        background: #dbdbdb;
      }
    }
    .footer {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      .btn-action {
        width: 100px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        font-size: 16px;
        font-weight: 400;
        cursor: pointer;
        border-radius: 6px;
        &:hover {
          color: var(--bc-btn-default-text-hover);
          border: 1px solid var(--bc-btn-default-border-hover);
        }
      }
      .btn-close {
        background: var(--bc-color-white);
        border: 1px solid var(--bc-color-grey50);
        color: var(--bc-color-grey150);
        margin-right: 16px;
      }
      .btn-submit {
        color: var(--bc-color-white);
        background: var(--bc-btn-bg-default);
        border: none;
        &:hover {
          border: none;
          color: var(--bc-color-white);
          background: var(--bc-btn-bg-default-hover);
        }
      }
    }
  }
</style>