<template>
  <div class="bc-login">
    <header-login />
    <div class="form">
      <el-form class="form-item" :model="form" :rules="rules" ref="form-login">
        <div class="text-3xl text-semibold text-center mb-2 title-form">{{ $t('resetPass.title') }}</div>
        <div class="label-box">
          <label for="">{{ $t('placeholder.password') }}</label>
        </div>
        <el-form-item prop="password" class="input-password">
          <el-popover placement="right" width="auto" trigger="manual" v-model="visible" popper-class="popper-validate-password">
            <template>
              <div class="check-password">
                <div class="be-flex align-center check-item">
                  <base-icon v-if="validate.length" icon="icon-tick" size="16" />
                  <base-icon v-else icon="icon-x" size="16" />
                  <span class="text-xs" style="padding-left: 8px; color: #5b616e">{{ $t('validate.length') }}</span>
                </div>
                <div class="be-flex align-center check-item">
                  <base-icon v-if="validate.lowercase" icon="icon-tick" size="16" />
                  <base-icon v-else icon="icon-x" size="16" />
                  <span class="text-xs" style="padding-left: 8px; color: #5b616e">{{ $t('validate.lowercase') }}</span>
                </div>
                <div class="be-flex align-center check-item">
                  <base-icon v-if="validate.uppercase" icon="icon-tick" size="16" />
                  <base-icon v-else icon="icon-x" size="16" />
                  <span class="text-xs" style="padding-left: 8px; color: #5b616e">{{ $t('validate.uppercase') }}</span>
                </div>
                <div class="be-flex align-center check-item">
                  <base-icon v-if="validate.number" icon="icon-tick" size="16" />
                  <base-icon v-else icon="icon-x" size="16" />
                  <span class="text-xs" style="padding-left: 8px; color: #5b616e">{{ $t('validate.number') }}</span>
                </div>
                <div class="be-flex align-center check-item">
                  <base-icon v-if="validate.specialCharacter" icon="icon-tick" size="16" />
                  <base-icon v-else icon="icon-x" size="16" />
                  <span class="text-xs" style="padding-left: 8px; color: #5b616e">{{ $t('validate.specialCharacter') }}</span>
                </div>
              </div>
            </template>
            <el-input
              :type="showPass == true ? 'text' : 'password'"
              slot="reference"
              :placeholder="$t('placeholder.password')"
              v-model="form.password"
              @focus="visible = true"
              @blur="visible = false"
            />
          </el-popover>
          <!-- <el-input :placeholder="$t('placeholder.password')" type="password" v-model="form.password" /> -->
          <span class="icon-show-password" @click="showPass = !showPass">
            <base-icon :icon="showPass == true ? 'icon-eye-off' : 'icon-eye'" size="22" />
          </span>
        </el-form-item>
        <div class="label-box">
          <label for="">{{ $t('placeholder.repassword') }}</label>
        </div>
        <el-form-item prop="repassword" class="input-password2">
          <el-popover placement="right" width="auto" trigger="manual" v-model="visibleRe" popper-class="popper-validate-password">
            <template>
              <div class="check-password">
                <div class="be-flex align-center check-item">
                  <base-icon v-if="validateRepassword.length" icon="icon-tick" size="16" />
                  <base-icon v-else icon="icon-x" size="16" />
                  <span class="text-xs" style="padding-left: 8px; color: #5b616e">{{ $t('validate.length') }}</span>
                </div>
                <div class="be-flex align-center check-item">
                  <base-icon v-if="validateRepassword.lowercase" icon="icon-tick" size="16" />
                  <base-icon v-else icon="icon-x" size="16" />
                  <span class="text-xs" style="padding-left: 8px; color: #5b616e">{{ $t('validate.lowercase') }}</span>
                </div>
                <div class="be-flex align-center check-item">
                  <base-icon v-if="validateRepassword.uppercase" icon="icon-tick" size="16" />
                  <base-icon v-else icon="icon-x" size="16" />
                  <span class="text-xs" style="padding-left: 8px; color: #5b616e">{{ $t('validate.uppercase') }}</span>
                </div>
                <div class="be-flex align-center check-item">
                  <base-icon v-if="validateRepassword.number" icon="icon-tick" size="16" />
                  <base-icon v-else icon="icon-x" size="16" />
                  <span class="text-xs" style="padding-left: 8px; color: #5b616e">{{ $t('validate.number') }}</span>
                </div>
                <div class="be-flex align-center check-item">
                  <base-icon v-if="validateRepassword.specialCharacter" icon="icon-tick" size="16" />
                  <base-icon v-else icon="icon-x" size="16" />
                  <span class="text-xs" style="padding-left: 8px; color: #5b616e">{{ $t('validate.specialCharacter') }}</span>
                </div>
              </div>
            </template>
            <el-input
              slot="reference"
              class="input-password"
              :type="showPass2 == true ? 'text' : 'password'"
              :placeholder="$t('placeholder.repassword')"
              v-model="form.repassword"
              @focus="visibleRe = true"
              @blur="visibleRe = false"
              @change="handleChangeRepassword"
            />
          </el-popover>
          <!-- <el-input class="input-password" type="password" :placeholder="$t('placeholder.repassword')" v-model="form.repassword" /> -->
          <span class="icon-show-password2" @click="showPass2 = !showPass2">
            <base-icon :icon="showPass2 == true ? 'icon-eye-off' : 'icon-eye'" size="22" />
          </span>
          <span class="small-err" v-if="!isMatchPassword">{{ $t('validate.password-correct') }}</span>
        </el-form-item>
        <el-button :loading="isLoading" :class="getDisableBtn ? 'btn--disabled' : null" class="btn w-100 is-none-border cursor" @click="handleResetPass"
          >{{ $t('resetPass.submit') }}
        </el-button>
        <!-- <button :class="getDisableBtn ? 'btn--disabled' : null" type="button" class="btn is-none-border w-100 cursor" @click="handleResetPass">{{ $t('resetPass.submit') }}</button> -->
      </el-form>
    </div>
    <language :isReload="false" @changeLanguage="handleChangeLanguage" />
  </div>
</template>

<script lang="ts">
  import VueRecaptcha from 'vue-recaptcha'
  import HeaderLogin from '../components/HeaderLogin.vue'
  import Language from '../components/Language.vue'
  import { namespace } from 'vuex-class'

  import getRepository from '@/services'
  import { AuthRepository } from '@/services/repositories/auth'

  import { Component, Vue, Watch } from 'vue-property-decorator'
  import { trim, includes } from 'lodash'
  const apiAuth: AuthRepository = getRepository('auth')

  interface FormLogin {
    password: string
    repassword: string
  }
  const bcAuth = namespace('beAuth')

  @Component({ components: { VueRecaptcha, HeaderLogin, Language } })
  export default class ResetPassword extends Vue {
    @bcAuth.Mutation('SET_USER_INFO') setUserInfo!: (data: Record<string, any>) => void

    isMatchPassword = true
    showPass = false
    showPass2 = false
    language = 'en'
    form: FormLogin = {
      repassword: '',
      password: ''
    }
    isLoading = false
    visible = false
    visibleRe = false
    validate: Record<string, boolean> = {
      length: false,
      number: false,
      uppercase: false,
      lowercase: false,
      specialCharacter: false
    }
    validateRepassword: Record<string, boolean> = {
      length: false,
      number: false,
      uppercase: false,
      lowercase: false,
      specialCharacter: false
    }
    selectLanguage = ''

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

    regLow = /(?=.*[a-z])/g
    regUp = /(?=.*[A-Z])/g
    regNumber = /(?=.*[0-9])/g
    regSpecial = /(?=.*[!@#$%^&*()_=+{}:;"'/?><.,-])/g

    rules: Record<string, any> = {
      password: [
        {
          required: true,
          message: this.$t('resetPass.wrong-password'),
          trigger: 'blur'
        }
      ],
      repassword: [
        {
          required: true,
          message: this.$t('resetPass.wrong-repassword'),
          trigger: 'blur'
        }
      ]
    }

    @Watch('form.password') watchPassword(pass: string): void {
      this.isMatchPassword = !(this.form.password === this.form.repassword && this.form.repassword)
      this.validate.length = pass.length >= 8
      this.validate.number = this.regNumber.test(pass)
      this.validate.uppercase = this.regUp.test(pass)
      this.validate.lowercase = this.regLow.test(pass)
      this.validate.specialCharacter = this.regSpecial.test(pass)
    }
    @Watch('form.repassword') watchRePassword(pass: string): void {
      //@ts-ignore
      this.$refs['form-login']?.fields.find(f => f.prop == 'repassword').clearValidate()
      this.isMatchPassword = !(this.form.password !== this.form.repassword)
      this.validateRepassword.length = pass.length >= 8
      this.validateRepassword.number = this.regNumber.test(pass)
      this.validateRepassword.uppercase = this.regUp.test(pass)
      this.validateRepassword.lowercase = this.regLow.test(pass)
      this.validateRepassword.specialCharacter = this.regSpecial.test(pass)
    }

    get getDisableBtn(): boolean {
      const isValidatePass = Object.values(this.validate).every(item => item)
      const isValidateRePass = Object.values(this.validateRepassword).every(item => item)
      return !(this.form.password && trim(this.form.password) === this.form.repassword && trim(this.form.repassword) && isValidatePass && isValidateRePass)
    }

    created(): void {
      this.language = window.localStorage.getItem('bc-lang')!
      this.selectLanguage = this.language
    }

    handleChangeRepassword(pass: string): void {
      if (pass === '') {
        this.isMatchPassword = true
      }
    }

    handleChangeLanguage(): void {
      //@ts-ignore
      this.$refs['form-login']?.resetFields()
    }
    handleResetPass(): void {
      if (this.getDisableBtn) {
        return
      }
      //@ts-ignore
      this.$refs['form-login']?.validate(async valid => {
        if (valid) {
          let message: any = ''
          this.isLoading = true
          const reason = this.$route.query.reason
          const data = {
            email: this.$route.query.email,
            verificationCode: this.$route.query.code,
            password: this.$options.filters?.encryptPassword(this.form.password)
          }
          apiAuth
            .resetPassword(data)
            .then(res => {
              this.setUserInfo(res)
              message = this.$t('notify.pass-reset')
              this.$message.success({ message, duration: 5000 })
              this.$router.push({ name: 'Wallet' })
              this.isLoading = false
            })
            .catch((error: any) => {
              this.isLoading = false
              let message: any = ''
              const { config, data } = error.response
              //TH1: forgot => verify => reset
              if (data.status === 'EXPIRED_VERIFICATION' && reason === 'FORGET_PASSWORD' && includes(config.url, 'reset-pass')) {
                message = this.$t('notify.reset-pass-expired')
                this.$message.error({ message, duration: 5000 })
                this.$router.push({ name: 'forgot-password' })
              }

              //TH2: click v??o link
              if (data.status === 'EXPIRED_VERIFICATION' && reason === 'UNLOCK_USER' && includes(config.url, 'reset-pass')) {
                message = this.$t('notify.reset-pass-expired-click-url')
                this.$message.error({ message, duration: 5000 })
                // this.$router.push({ name: 'forgot-password' })
              }
              if (data.status === 'INVALID_VERIFICATION' && reason === 'FORGET_PASSWORD' && includes(config.url, 'reset-pass')) {
                message = this.$t('notify.reset-pass-invalid')
                this.$message.error({ message, duration: 5000 })
                this.$router.push({ name: 'forgot-password' })
              }
              if (data.status === 'INVALID_VERIFICATION' && reason === 'UNLOCK_USER' && includes(config.url, 'reset-pass')) {
                message = this.$t('notify.reset-pass-invalid-click-url')
                this.$message.error({ message, duration: 5000 })
              }
            })
        }
      })
    }
  }
</script>

<style scoped lang="scss">
  .bc-login {
    background-color: #f6f8fc;
    height: 100vh;

    .form {
      width: 512px;
      margin: 40px auto 0;
      box-shadow: 0px 0.6px 1.8px rgba(0, 0, 0, 0.1), 0px 3.2px 7.2px rgba(0, 0, 0, 0.13);
      border-radius: 8px;
      background-color: var(--bc-bg-white);

      .form-item {
        padding: 30px 24px;
        .title-form {
          color: #201f1e;
        }
      }

      .btn {
        padding: 12px 0 !important;
        font-size: 16px !important;
        line-height: 24px !important;
      }
      .input-password {
        position: relative;
      }
      .icon-show-password {
        cursor: pointer;
        position: absolute;
        top: 3px;
        right: 14px;
        .span-icon {
          color: var(--bc-color-grey90);
        }
      }
    }
    .label-box {
      margin-bottom: 8px;
      color: var(--bc-table-text-color);
      font-weight: 400;
      font-size: 14px;
    }
    .input-password,
    .input-password2 {
      position: relative;
    }
    .icon-show-password,
    .icon-show-password2 {
      cursor: pointer;
      position: absolute;
      top: 3px;
      right: 14px;
      .span-icon {
        color: var(--bc-color-grey90);
      }
    }
  }
</style>
