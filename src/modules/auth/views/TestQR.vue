<template>
  <div class="bc-login">
    <header-login />
    <div class="form">
      <el-form class="form-item" :model="form" :rules="rules" ref="form-signup">
        <a>aaa </a>
        <div class="text-base be-flex jc-space-center">
          {{ $t('forgot.desciption') }}
        </div>
        <div>
          <!-- <qrcode :cls="qrCls" size="400" level="H" :value="qrText"></qrcode> -->
        </div>

        <el-form-item style="margin-top: 20px" prop="email">
          <el-input :placeholder="$t('forgot.email')" v-model="form.email" />
        </el-form-item>
        <button type="button" class="btn is-none-border w-100 cursor" @click="handleConfirm">{{ $t('forgot.submit') }}</button>
        <div class="text-base be-flex jc-space-center">
          {{ $t('signup.have-account') }} &nbsp;<span @click="handleLoginForm" class="text-hyperlink text-semibold cursor">{{ $t('signup.sign-in') }} </span>
        </div>
        <div class="text-base be-flex jc-space-center">
          {{ $t('login.question') }} &nbsp;<span @click="handleSignUp" class="text-hyperlink text-semibold cursor"> {{ $t('login.sign-up') }} </span>
        </div>
      </el-form>
      <!-- <verify-page v-else class="form-item" /> -->
    </div>
    <div class="text-center mt-2 language">
      <el-select v-model="selectLanguage" @change="handleChangeLanguage">
        <el-option :label="`${$t('login.en')}`" value="en">
          <template>
            <div class="be-flex flag">
              <base-icon icon="flag-usa" />
              <span>{{ $t('login.en') }}</span>
            </div>
          </template>
        </el-option>
        <el-option :label="`${$t('login.vi')}`" value="vi">
          <template>
            <div class="be-flex flag">
              <base-icon icon="flag-vn" size="20" />
              <span>{{ $t('login.vi') }}</span>
            </div>
          </template>
        </el-option>
      </el-select>
    </div>
  </div>
</template>

<script lang="ts">
  import VueRecaptcha from 'vue-recaptcha'
  import HeaderLogin from '../components/HeaderLogin.vue'
  import VerifyPage from './Verify.vue'
  import { Component, Vue } from 'vue-property-decorator'
  // import Qrcode from 'v-qrcode'
  interface FormLogin {
    email: string | boolean
    password: string | boolean
  }

  @Component({ components: { VueRecaptcha, HeaderLogin, VerifyPage } })
  export default class LoginPage extends Vue {
    language = 'en'
    siteKey = '6LfA7qkcAAAAAG7aA8BvQnBwrjayDeNhzHIxfAh1'
    form: FormLogin = {
      email: '',
      password: ''
    }
    qrCls = 'qrcode'
    levelL = 'H'
    qrText = 'ahihih'
    qrValue = 'My secret value'
    name = 'HelloWorld'
    remember = false
    selectLanguage = ''
    isVerifyCaptcha = false

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
      email: [
        {
          required: true,
          message: this.$t('login.wrong-email'),
          trigger: 'blur'
        }
      ],
      password: [
        {
          required: true,
          message: this.$t('login.wrong-password'),
          trigger: 'blur'
        }
      ]
    }

    created(): void {
      this.language = window.localStorage.getItem('bc-lang')!
      this.selectLanguage = this.language
    }
    handleChangeLanguage(lang: string): void {
      this.$i18n.locale = lang
      window.localStorage.setItem('bc-lang', lang)
      location.reload()
    }

    verifyCaptcha(): void {
      this.isVerifyCaptcha = true
    }
    handleSignUp(): void {
      this.$router.push({ name: 'sign-up' })
    }
    handleLoginForm(): void {
      this.$router.push({ name: 'login' })
    }
    handleConfirm(): void {
      alert('hasagi')
    }
    handleLogin(): void {
      //@ts-ignore
      this.$refs['form-signup']?.validate(valid => {
        if (valid && this.isVerifyCaptcha) {
          this.$router.push({ name: 'verify-phone' })
        } else {
          this.$message.error('Vui lòng xác minh captcha')
        }
      })
    }
  }
</script>

<style scoped lang="scss">
  .bc-login {
    background-color: #f6f8fc;
    height: 100vh;
    .textButton {
      font-size: 16px;
      padding-top: 1px;
    }
    .form {
      width: 512px;
      margin: 40px auto 0;
      box-shadow: 0px 0.6px 1.8px rgba(0, 0, 0, 0.1), 0px 3.2px 7.2px rgba(0, 0, 0, 0.13);
      border-radius: 8px;
      background-color: var(--bc-bg-white);

      .form-item {
        padding: 30px 24px;
      }

      .btn {
        padding: 14px 0;
        font-size: 16px;
        line-height: 24px;
        margin: 24px 0;
      }
    }
  }
</style>
