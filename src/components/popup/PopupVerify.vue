<template>
  <base-popup name="popup-base-verify" class="popup-verify" width="480px" :open="handleOpen" :close="handleClose" :isShowFooter="false">
    <div slot="title">
      <span>{{ $t('transaction.popup.title-verification') }} </span>
    </div>
    <div class="content">
      <!-- <h3 class="text-2xl text-center text-semibold title-form">{{ getTittle }}</h3> -->
      <h3 v-if="type && type == 'APP'" class="text-2xl text-center text-semibold title-form">{{ $t('verified.titleContent') }}</h3>
      <h3 v-if="type && type == 'SMS'" class="text-2xl text-center text-semibold title-form">{{ $t('verified.titleContent2') }}</h3>
      <h3 v-if="type && type == 'EMAIL'" class="text-2xl text-center text-semibold title-form">{{ $t('verified.titleContent3') }}</h3>
      <div class="be-flex verify-code">
        <!-- <base-icon :icon="getIcon" size="80" /> -->
        <base-icon v-if="type && type == 'APP'" icon="verify-app" size="80"></base-icon>
        <base-icon v-if="type && type == 'SMS'" icon="verify-phone" size="80"></base-icon>
        <base-icon v-if="type && type == 'EMAIL'" icon="verify-email" size="80"></base-icon>
        <div class="ml-1 w-100 input-code">
          <el-form :model="form" :rules="rules" ref="form-verify" @submit.prevent.native="handleSubmit">
            <el-form-item prop="code" :label="`${$t('verify.label')}`" class="no-require-label">
              <el-input type="text" v-model.trim="form.code" maxlength="6" :placeholder="`${$t('verify.placeholder')}`" />
            </el-form-item>
          </el-form>
        </div>
      </div>
      <el-button
        :loading="isLoading"
        :class="getDisableBtn ? 'btn--disabled btn-theme' : null"
        :disabled="getDisableBtn"
        class="btn w-100 is-none-border cursor btn-submit btn-theme"
        @click="handleSubmit"
        >{{ $t('verify.submit') }}
      </el-button>
      <div v-if="type != 'APP'" class="text-base be-flex jc-space-center mt-24 mb-24 text-grey-130 text-discript">
        {{ $t('verify.question') }} &nbsp;<span class="text-hyperlink text-semibold cursor" @click="handleResendCode"> {{ $t('verify.re-send') }} </span>
      </div>
    </div>
  </base-popup>
</template>

<script lang="ts">
  import { Component, Mixins, Prop } from 'vue-property-decorator'
  import PopupMixin from '@/mixins/popup'

  import getRepository from '@/services'
  import WalletRepository from '@/services/repositories/wallet'
  import { SettingRepository } from '@/services/repositories/setting'
  import { AuthRepository } from '@/services/repositories/auth'
  import debounce from 'lodash/debounce'
  import { namespace } from 'vuex-class'
  const bcAuth = namespace('beAuth')
  const api: SettingRepository = getRepository('setting')
  const apiAuth: AuthRepository = getRepository('auth')
  const apiLyn: WalletRepository = getRepository('wallet')
  @Component
  export default class PopupVerify extends Mixins(PopupMixin) {
    @bcAuth.State('user') user!: Record<string, any>
    @Prop({ required: false, type: String, default: 'SMS' }) type!: string
    // @Prop() typeAction!: any
    @Prop() data!: Record<string, any>
    @Prop() dataWithdraw!: Record<string, any>
    @Prop() dataTransfer!: Record<string, any>
    @Prop({ required: false, type: String, default: 'TRANSFER' }) typeAction!: string
    @Prop() phoneVerified!: any

    form: Record<string, any> = {
      code: ''
    }
    isLoading = false
    success: any = 0
    rules: Record<string, any> = {
      code: [
        {
          required: true,
          message: this.$t('verify.wrong-code'),
          trigger: 'blur'
        }
      ]
    }
    get getDisableBtn(): boolean {
      return this.form.code.length !== 6
    }

    get getIcon(): string {
      const name = this.$route.name
      if (name === 'verify-phone') {
        return 'verify-phone'
      }
      if (name === 'verify-email') {
        return 'verify-email'
      }
      return 'verify-app'
    }

    // get getTittle(): string | any {
    //   const name = this.$route.name
    //   if (name === 'verify-phone') {
    //     return this.$t('verify.title-phone')
    //   }
    //   if (name === 'verify-email') {
    //     return this.$t('verify.title-email')
    //   }
    //   return this.$t('verify.title-app')
    // }
    // debounce chan doble click
    debounceFilter = debounce((nameAction: any) => {
      if (nameAction == 'handleResendCode') {
        this.resendCode()
      }
      if (nameAction == 'handleSubmit') {
        this.submit()
      }
    }, 400)
    handleResendCode(): void {
      this.debounceFilter('handleResendCode')
    }
    async resendCode(): Promise<void> {
      console.log('a')
    }

    handleReset(): void {
      this.type = ''
      this.typeAction = ''
      this.form.code = ''
      // this.form = {
      //   code: ''
      // }
      this.success = 0
    }
    async handleClose(): Promise<void> {
      this.form.code = ''
      console.log('a')
    }
    handleOpen(): void {
      console.log('a')
    }
    async verifiedPhoneWidthdrawTransfer(): Promise<void> {
      const data = {
        email: this.$store.state.beAuth.user.email,
        type: 'SMS',
        reason: ''
      }
      api.resendCode(data).then(res => {
        console.log('res 1')
      })
    }
    handleSubmit(): void {
      this.debounceFilter('handleSubmit')
    }
    async submit(): Promise<void> {
      console.log('a')
    }
  }
</script>

<style scoped lang="scss">
  .btn {
    padding: 12px 0 !important;
    font-size: 16px !important;
    line-height: 24px !important;
  }
  .title-form {
    color: #201f1e;
    margin-bottom: 3px;
    word-break: break-word;
  }
  .input-code {
    margin-top: 17px;
  }
  .btn-submit {
    margin-bottom: 24px;
    &:hover {
      color: #fff;
    }
  }
  .text-discript {
    margin-top: 0px !important;
  }
  /* .btn-theme {
  background: var(--bc-tab-active);
}
.btn-theme:hover {
  border: none;
  color: var(--bc-color-white);
  background: var(--bc-theme-primary-gradient-hover) !important;
} */
</style>
