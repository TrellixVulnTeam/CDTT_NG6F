<template>
  <div class="list-bonus">
    <base-popup name="popup-change-phone" class="popup-customer-detail" width="480px" :isShowFooter="false" :close="handleClose" :open="handleOpen">
      <div class="title-popup" slot="title">
        <span>{{ $t('customer.setting.new-phone') }}</span>
      </div>

      <div class="form">
        <el-form class="form-item" :model="form" :rules="rules" ref="form-phone">
          <el-form-item prop="country">
            <div class="be-flex label" slot="label">{{ $t('label.country') }}</div>
            <el-select v-model="form.country" class="w-100" clearable @change="handleSelectCountry">
              <el-option v-for="(country, index) in listCountry" :key="index" :label="country.name" :value="country.name" />
            </el-select>
          </el-form-item>

          <el-form-item prop="phone">
            <div class="be-flex label" slot="label">{{ $t('label.phone-number') }}</div>

            <el-input type="number" :placeholder="$t('placeholder.phone-number')" v-model="form.phone">
              <!-- <template style="cursor: pointer" slot="prepend"
                ><span style="color: #5b616e">{{ phoneDefault }}</span></template
              > -->
            </el-input>
          </el-form-item>
        </el-form>
        <div class="footer" slot="footer">
          <div class="be-flex jc-space-between wrap-button" style="padding-bottom: 12px; float: right">
            <div class="btn-right">
              <el-button class="btn-default btn-close btn-h-40" @click="handleClose">{{ $t('button.close') }}</el-button>
              <el-button
                :class="disabledContinue ? 'btn btn-h-40 is-none-border backgroundDisable' : 'btn btn-continue btn-h-40 is-none-border'"
                :disabled="disabledContinue"
                @click="handleContinue"
                >{{ $t('verify.continue') }}</el-button
              >
            </div>
          </div>
        </div>
      </div>
    </base-popup>

    <!-- popup verify -->
    <base-popup name="popup-verify" class="popup-customer-detail" width="480px" :isShowFooter="false" :close="handleCloseVerify" :open="handleOpenVerify">
      <div class="title-popup" slot="title">
        <span>{{ $t('customer.setting.verify') }}</span>
      </div>
      <div class="bc-verify">
        <h3 class="text-3xl text-center text-semibold title-form" style="justify-content: center">{{ $t('verify.title-phone') }}</h3>
        <div class="be-flex verify-code">
          <base-icon :icon="getIcon" size="80" />
          <div class="ml-1 w-100 input-code">
            <el-form>
              <!-- <el-form-item prop="code" :label="`${$t('verify.label')}`" class="no-require-label">
                <el-input type="text" v-model.trim="twoFaCode" maxlength="6" :placeholder="`${$t('verify.placeholder')}`" />
              </el-form-item> -->
              <el-form-item prop="phone">
                <div class="be-flex label" slot="label">{{ $t('label.enter-verify-code') }}</div>

                <el-input type="number" :placeholder="$t('label.verify-code')" v-model="form.resendCode">
                  <!-- <template style="cursor: pointer" slot="prepend"
                    ><span style="color: #5b616e">{{ phoneDefault }}</span></template
                  > -->
                </el-input>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <el-button
          :loading="isLoading"
          :class="disableSubmit ? 'btn w-100 is-none-border btn-h-40 cursor backgroundDisable' : 'btn w-100 is-none-border btn-h-40 cursor'"
          :disabled="disableSubmit"
          style="height: 40px"
          @click="handleSubmit"
          >{{ $t('verify.submit') }}
        </el-button>
        <div v-if="this.type2Fa !== 'verify-app'" class="text-base be-flex jc-space-center mt-24 text-grey-130">
          {{ $t('verify.question') }} &nbsp;<span class="text-hyperlink text-semibold cursor" @click="handleResendCodeChangePhone"> {{ $t('verify.re-send') }} </span>
        </div>
        <!-- <div v-if="$route.query.reason === 'VERIFY-SMS'" class="text-base be-flex jc-space-center mt-24 text-grey-130">
          <span class="text-hyperlink text-semibold cursor" @click="handleUseOtherPhone"> {{ $t('verify.another-phone') }} </span>
        </div> -->
      </div>
    </base-popup>

    <!-- popup rest default-->
    <base-popup name="popup-reset-default" class="popup-customer-detail" width="480px" :isShowFooter="false" :close="handleCloseVerify" :open="handleOpenVerify">
      <div class="title-popup" slot="title">
        <span>{{ $t('customer.setting.verify') }}</span>
      </div>
      <div class="bc-verify">
        <h3 class="text-3xl text-center text-semibold title-form" style="justify-content: center">{{ $t('verify.title-phone') }}</h3>
        <div class="be-flex verify-code">
          <base-icon :icon="getIcon" size="80" />
          <div class="ml-1 w-100 input-code">
            <el-form>
              <!-- <el-form-item prop="code" :label="`${$t('verify.label')}`" class="no-require-label">
                <el-input type="text" v-model.trim="twoFaCode" maxlength="6" :placeholder="`${$t('verify.placeholder')}`" />
              </el-form-item> -->
              <el-form-item prop="phone">
                <div class="be-flex label" slot="label">{{ $t('label.enter-verify-code') }}</div>

                <el-input type="number" :placeholder="$t('label.verify-code')" v-model="form.resendCode">
                  <!-- <template style="cursor: pointer" slot="prepend"
                    ><span style="color: #5b616e">{{ phoneDefault }}</span></template
                  > -->
                </el-input>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <el-button
          :loading="isLoading"
          :class="disableSubmit ? 'btn w-100 is-none-border btn-h-40 cursor backgroundDisable' : 'btn w-100 is-none-border btn-h-40 cursor'"
          :disabled="disableSubmit"
          style="height: 40px"
          @click="handleSubmitResetDefault"
          >{{ $t('verify.submit') }}
        </el-button>
        <div v-if="this.type2Fa !== 'verify-app'" class="text-base be-flex jc-space-center mt-24 text-grey-130">
          {{ $t('verify.question') }} &nbsp;<span class="text-hyperlink text-semibold cursor" @click="handleResendCodeResetDefault"> {{ $t('verify.re-send') }} </span>
        </div>
        <!-- <div v-if="$route.query.reason === 'VERIFY-SMS'" class="text-base be-flex jc-space-center mt-24 text-grey-130">
          <span class="text-hyperlink text-semibold cursor" @click="handleUseOtherPhone"> {{ $t('verify.another-phone') }} </span>
        </div> -->
      </div>
    </base-popup>

    <!-- lock user -->
    <!-- popup rest default-->
    <base-popup name="popup-verify-lock" class="popup-customer-detail" width="480px" :isShowFooter="false" :close="handleCloseLock" :open="handleOpenLock">
      <div class="title-popup" slot="title">
        <span>{{ $t('customer.setting.verify') }}</span>
      </div>
      <div class="bc-verify">
        <h3 class="text-3xl text-center text-semibold title-form" style="justify-content: center">{{ $t('verify.title-phone') }}</h3>
        <div class="be-flex verify-code">
          <base-icon :icon="getIcon" size="80" />
          <div class="ml-1 w-100 input-code">
            <el-form>
              <!-- <el-form-item prop="code" :label="`${$t('verify.label')}`" class="no-require-label">
                <el-input type="text" v-model.trim="twoFaCode" maxlength="6" :placeholder="`${$t('verify.placeholder')}`" />
              </el-form-item> -->
              <el-form-item prop="phone">
                <div class="be-flex label" slot="label">{{ $t('label.enter-verify-code') }}</div>

                <el-input type="number" :placeholder="$t('label.verify-code')" v-model="form.resendCode">
                  <!-- <template style="cursor: pointer" slot="prepend"
                    ><span style="color: #5b616e">{{ phoneDefault }}</span></template
                  > -->
                </el-input>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <el-button
          :loading="isLoading"
          :class="disableSubmit ? 'btn w-100 is-none-border btn-h-40 cursor backgroundDisable' : 'btn w-100 is-none-border btn-h-40 cursor'"
          :disabled="disableSubmit"
          style="height: 40px"
          @click="handleSubmitLockUser"
          >{{ $t('verify.submit') }}
        </el-button>
        <div v-if="this.type2Fa !== 'verify-app'" class="text-base be-flex jc-space-center mt-24 text-grey-130">
          {{ $t('verify.question') }} &nbsp;<span class="text-hyperlink text-semibold cursor" @click="handleResendCodeLockUser"> {{ $t('verify.re-send') }} </span>
        </div>
        <!-- <div v-if="$route.query.reason === 'VERIFY-SMS'" class="text-base be-flex jc-space-center mt-24 text-grey-130">
          <span class="text-hyperlink text-semibold cursor" @click="handleUseOtherPhone"> {{ $t('verify.another-phone') }} </span>
        </div> -->
      </div>
    </base-popup>

    <div class="table" style="padding-bottom: 24px" v-loading="isLoading" :class="isLoading ? 'list-loading' : null">
      <div class="be-flex jc-space-between align-center">
        <div class="text1">{{ $t('customer.setting.phone') }}</div>
        <div class="phone" style="margin-left: 463px">
          <span class="style-phone">{{ phoneNumber }}</span> <span style="color: blue; margin-left: 8px; font-size: 14px; line-height: 20px; color: #129961">verified</span>
        </div>
        <!-- <div class="status">verified</div> -->
        <div class="button">
          <el-button type="button" class="style-button" style="width: 130px" @click="clickChangePhoneNumber">{{ $t('customer.setting.change') }}</el-button>
        </div>
      </div>
      <hr class="hr1" />

      <div v-if="this.dataDetail.faType !== 'EMAIL'" class="be-flex jc-space-between align-center">
        <div class="text1">{{ $t('customer.setting.2factor') }}</div>
        <div class="phone" style="margin-left: 380px"><base-icon icon="icon-phone" size="40" /><span class="style-phone">Authenticator app</span></div>
        <div class="button">
          <el-button type="button" class="style-button" style="width: 130px" @click="handleResetDefault">{{ $t('customer.setting.reset') }}</el-button>
        </div>
        <hr class="hr1" />
      </div>

      <div class="be-flex jc-space-between align-center">
        <div class="text1">{{ $t('customer.setting.status') }}</div>
        <div class="phone" style="margin-left: 585px">
          <span class="style-phone">{{ userStatus }}</span>
        </div>
        <div class="button">
          <el-button v-if="userStatus == 'ACTIVE'" type="button" class="style-button" style="width: 130px" @click="handleLockUser">{{ $t('customer.setting.lock') }}</el-button>
          <el-button v-else type="button" class="style-button" style="width: 130px" @click="handleUnlockUser">{{ $t('customer.setting.unlock') }}</el-button>
        </div>
      </div>
      <hr class="hr1" />
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
  import { SettingRepository } from '@/services/repositories/setting'
  import countryJson from '@/utils/country/index.json'
  import { AuthRepository } from '@/services/repositories/auth'
  import { trim, filter } from 'lodash'
  import { Vue, Watch } from 'vue-property-decorator'
  const apiCustomer: CustomerRepository = getRepository('customer')
  const apiSetting: SettingRepository = getRepository('setting')
  const apiAuth: AuthRepository = getRepository('auth')
  const beBase = namespace('beBase')
  const bcAuth = namespace('beAuth')
  interface IListCountry {
    name: string
    dialCode: string
    isoCode: string
    flag: string
  }
  @Component({ components: {} })
  export default class CustomerBonus extends Mixins(PopupMixin) {
    @Prop({ required: true, type: Number, default: 0 }) userId!: number
    @Prop({ required: true, type: Number, default: 0 }) dataDetail!: any
    @beBase.State('coinMain') coinMain!: string
    @bcAuth.State('user') user!: Record<string, any>
    isLoading = false
    listCountry: IListCountry[] = countryJson
    language = ''
    selectLanguage = ''
    phoneDefault = '+84'
    type2Fa = ''
    userStatus = ''
    form: Record<string, any> = {
      country: '',
      phone: '',
      code: '',
      resendCode: ''
    }
    twoFaCode = ''
    optionLanguage: Array<Record<string, any>> = [
      {
        id: 1,
        lang: 'en'
      },
      {
        id: 2,
        lang: 'vi'
      }
    ]

    rules: Record<string, any> = {
      country: [
        {
          required: true,
          message: this.$t('validate.wrong-country'),
          trigger: 'change'
        }
      ],
      phone: [
        {
          required: true,
          message: this.$t('validate.phone-number'),
          trigger: 'blur'
        }
      ]
    }
    disabledContinue = true
    disableSubmit = true
    @Watch('form.phone') watchList(value: string): void {
      this.disabledContinue = value.length > 0 ? false : true
    }
    @Watch('form.resendCode') watchSubmit(value: string): void {
      this.disableSubmit = value.length > 0 ? false : true
    }
    get getIcon(): string {
      const name = this.type2Fa
      if (name === 'verify-phone') {
        return 'verify-phone'
      }
      if (name === 'verify-email') {
        return 'verify-email'
      }
      return 'verify-app'
    }
    isVisible = false
    clickChangePhoneNumber(): void {
      this.setOpenPopup({
        popupName: 'popup-change-phone',
        isOpen: true
      })
    }
    handleCloseVerify(): void {
      this.setOpenPopup({
        popupName: 'popup-verify',
        isOpen: false
      })
      this.form.resendCode = ''
      // this.resetForm()
    }
    handleClose(): void {
      this.setOpenPopup({
        popupName: 'popup-change-phone',
        isOpen: false
      })
      this.form.resendCode = ''
      // this.resetForm()
    }
    resetForm(): void {
      ;(this.form.phone = ''), (this.form.code = ''), (this.form.resendCode = '')
    }
    handleOpen(): void {
      // this.resetForm()
    }
    handleOpenVerify(): void {
      // this.resetForm()
    }
    async handleResendCodeChangePhone(): Promise<void> {
      this.form.resendCode = ''
      this.handleSendCode()
    }
    async handleResendCodeResetDefault(): Promise<void> {
      this.form.resendCode = ''
      this.handleSendCodeCustomer()
    }
    async handleResetDefault(): Promise<void> {
      await this.handleSendCode()
      this.setOpenPopup({
        popupName: 'popup-reset-default',
        isOpen: true
      })
      // this.sendEmailReset2FA()
      // this.sendEmailcustomer()
    }
    sendEmailReset2FA(): void {
      apiCustomer
        .reset2Fa(this.userId)
        .then(() => {
          let message: any = this.$t('customer.setting.send-mail-success')
          this.$message.success(message)
        })
        .catch(() => {
          let message: any = this.$t('customer.setting.send-mail-fail')
          this.$message.error(message)
        })
    }
    async handleSubmitResetDefault(): Promise<void> {
      apiCustomer
        .verifyResetDefault(this.form.resendCode)
        .then(() => {
          // let message: any = this.$t('customer.setting.send-code')
          // this.$message.success(message)
          this.setOpenPopup({
            popupName: 'popup-reset-default',
            isOpen: false
          })
          this.sendEmailReset2FA()
        })
        .catch(() => {
          // let message: any = this.$t('customer.setting.send-code-fail')
          // this.$message.error(message)
        })
    }
    verifyCode(): void {
      apiCustomer
        .verifyResetDefault(this.form.resendCode)
        .then(() => {
          // let message: any = this.$t('customer.setting.send-code')
          // this.$message.success(message)
          this.setOpenPopup({
            popupName: 'popup-reset-default',
            isOpen: false
          })
          this.sendEmailcustomer()
        })
        .catch(() => {
          // let message: any = this.$t('customer.setting.send-code-fail')
          // this.$message.error(message)
        })
    }
    sendEmailcustomer(): void {
      this.handleSendCodeCustomer()
        .then(() => {
          let message: any = this.$t('customer.setting.send-mail-success')
          this.$message.success(message)
          this.setOpenPopup({
            popupName: 'popup-verify',
            isOpen: false
          })
        })
        .catch(() => {
          let message: any = this.$t('customer.setting.send-mail-fail')
          this.$message.error(message)
        })
    }
    async handleSubmit(): Promise<void> {
      this.verifyCode()
      // await this.sendEmailcustomer()
    }

    async handleSendCodeCustomer(): Promise<void> {
      const params = {
        countryCode: this.phoneDefault,
        country: this.form.country,
        newPhone: this.form.phone
      }
      await apiCustomer
        .sendCodeCustomer(this.userId, params)
        .then(() => {
          console.log('ok')
        })
        .catch(() => {
          console.log('fail')
        })
    }
    async handleSendCode(): Promise<void> {
      await apiCustomer
        .sendCode()
        .then(() => {
          let message: any = this.$t('customer.setting.send-code')
          this.$message.success(message)
          this.setOpenPopup({
            popupName: 'popup-change-phone',
            isOpen: false
          })
          // this.form.phone = ''
        })
        .catch(() => {
          let message: any = this.$t('customer.setting.send-code-fail')
          this.$message.error(message)
        })
    }
    count = 0
    handleSubmitLockUser(): void {
      if (this.userStatus == 'ACTIVE') {
        const params = {
          userId: this.userId,
          verificationCode: this.form.resendCode
        }
        apiCustomer
          .updateLockedUser(params)
          .then(() => {
            let message: any = this.$t('customer.setting.lock-user-success')
            this.$message.success(message)
            this.setOpenPopup({
              popupName: 'popup-verify-lock',
              isOpen: false
            })
            this.count = 1
            this.userStatus == 'LOCKED'
            this.form.resendCode = ''
          })
          .catch(() => {
            let message: any = this.$t('customer.setting.lock-user-fail')
            this.$message.error(message)
          })
      } else {
        const paramsUnlock = {
          userId: this.userId,
          verificationCode: this.form.resendCode,
          email: this.dataDetail.email
        }
        apiCustomer
          .updateUnlockUser(paramsUnlock)
          .then(() => {
            this.count = 2
            this.setOpenPopup({
              popupName: 'popup-verify-lock',
              isOpen: false
            })
            this.userStatus == 'ACTIVE'
            this.form.resendCode = ''
          })
          .catch(err => {
            console.log(err)
          })
      }
      this.count == 2 ? (this.userStatus = 'ACTIVE') : (this.userStatus = 'LOCKED')
      console.log('status', this.userStatus)
    }
    handleResendCodeLockUser(): void {
      this.form.resendCode = ''
      apiCustomer
        .sendCodeLockUser(this.userId)
        .then(() => {
          let message: any = this.$t('customer.setting.send-code')
          this.$message.success(message)
        })
        .catch(() => {
          let message: any = this.$t('customer.setting.send-code-fail')
          this.$message.error(message)
        })
    }
    async handleLockUser(): Promise<void> {
      await apiCustomer
        .sendCodeLockUser(this.userId)
        .then(() => {
          this.setOpenPopup({
            popupName: 'popup-verify-lock',
            isOpen: true
          })
          setTimeout(() => {
            let message: any = this.$t('customer.setting.send-code')
            this.$message.success(message)
          }, 300)
        })
        .catch(() => {
          let message: any = this.$t('customer.setting.send-code-fail')
          this.$message.error(message)
        })
    }
    async handleUnlockUser(): Promise<void> {
      await apiCustomer
        .sendCodeLockUser(this.userId)
        .then(() => {
          this.setOpenPopup({
            popupName: 'popup-verify-lock',
            isOpen: true
          })
          setTimeout(() => {
            let message: any = this.$t('customer.setting.send-code')
            this.$message.success(message)
          }, 300)
        })
        .catch(() => {
          let message: any = this.$t('customer.setting.send-code-fail')
          this.$message.error(message)
        })
    }
    async handleContinue(): Promise<void> {
      if (this.form.country !== '' && this.form.phone !== '') {
        const params = {
          countryCode: this.phoneDefault,
          country: this.form.country,
          newPhone: this.form.phone
        }
        const result = await apiCustomer.validatePhoneNumber(params)
        console.log('thanh', result)
        this.setOpenPopup({
          popupName: 'popup-verify',
          isOpen: true
        })
        this.handleSendCode()
      }
    }
    phoneNumber = ''
    created(): void {
      console.log('detail', this.dataDetail)
      this.phoneNumber = '(' + this.dataDetail.countryCode + ') ' + this.dataDetail.phone
      console.log('phone', this.phoneNumber)

      // this.userStatus ? this.dataDetail.userStatus =='ACTIVE' :
      if (this.dataDetail.userStatus == 'ACTIVE') {
        this.userStatus = 'ACTIVE'
      } else {
        this.userStatus = 'LOCKED'
      }

      this.language = window.localStorage.getItem('bc-lang')!
      this.selectLanguage = this.language
      const currentCountry = filter(this.listCountry, country => country.isoCode === 'VN')[0]
      this.form.country = currentCountry.name
      this.get2Fa()
    }
    async get2Fa(): Promise<void> {
      const params = {
        email: this.user.email
      }
      await apiAuth.get2FA(params).then((res: any) => {
        this.type2Fa = res
        console.log('res', res)
      })
    }
    handleSelectCountry(country: string): void {
      this.phoneDefault = filter(this.listCountry, item => item.name === country)[0].dialCode
    }

    handleChangeLanguage(): void {
      //@ts-ignore
      this.$refs['form-phone']?.resetFields()
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

    // onlyNumber(event: KeyboardEvent, type: string): void {
    //   let keyCode = event.keyCode ? event.keyCode : event.which
    //   //if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
    //   // 46 is dot
    //   if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
    //     event.preventDefault()
    //   }
    //   if (keyCode === 46 && includes(this.filter[type], '.')) {
    //     event.preventDefault()
    //   }
    // }

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
  .jc-space-center {
    justify-content: center;
    padding-bottom: 24px;
    margin-top: 24px;
  }
  .btn:hover {
    // background: var(--bc-btn-disable);
    background-color: var(--bc-btn-bg-default);
    border: none;
    color: var(--bc-color-white);
  }
  .backgroundDisable:hover {
    background: var(--bc-btn-disable);
    border: none;
    color: var(--bc-color-white);
  }
  .backgroundDisable {
    background: var(--bc-btn-disable);
    border: none;
    color: var(--bc-color-white);
  }
  .btn-continue {
    background-color: var(--bc-btn-bg-default);
  }
  .btn-continue:hover {
    background-color: var(--bc-btn-bg-default);
    color: var(--bc-color-white);
  }
  .title-form {
    color: #201f1e;
    margin-bottom: 3px;
  }
  .input-code {
    margin-top: 17px;
  }
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
