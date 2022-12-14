<template>
  <div class="bc-login">
    <header-login />
    <div class="form">
      <el-form class="form-item" :model="form" :rules="rules" ref="form-phone">
        <div class="text-3xl text-semibold text-center mb-2 title-form">{{ $t('verify.phone-title') }}</div>

        <el-form-item prop="country">
          <div class="be-flex label" slot="label">{{ $t('label.country') }}</div>
          <el-select v-model="form.country" class="w-100" clearable @change="handleSelectCountry">
            <el-option v-for="(country, index) in listCountry" :key="index" :label="country.name" :value="country.name" />
          </el-select>
        </el-form-item>

        <el-form-item prop="phone">
          <div class="be-flex label" slot="label">{{ $t('label.phone-number') }}</div>

          <el-input type="number" :placeholder="$t('placeholder.phone-number')" v-model="form.phone">
            <template style="cursor: pointer" slot="prepend"
              ><span style="color: #5b616e">{{ phoneDefault }}</span></template
            >
          </el-input>
        </el-form-item>
        <el-button :loading="isLoading" :class="getDisableBtn ? 'btn--disabled' : null" class="btn w-100 is-none-border cursor" @click="handleVerify"
          >{{ $t('verify.continue') }}
        </el-button>
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
  import countryJson from '@/utils/country/index.json'

  import getRepository from '@/services'
  import { AuthRepository } from '@/services/repositories/auth'

  import { Component, Vue } from 'vue-property-decorator'
  import { filter } from 'lodash'
  const apiAuth: AuthRepository = getRepository('auth')

  const bcAuth = namespace('beAuth')
  interface IListCountry {
    name: string
    dial_code: string
    code: string
  }
  @Component({ components: { VueRecaptcha, HeaderLogin, Language } })
  export default class VerifyPhone extends Vue {
    @bcAuth.Mutation('SET_USER_INFO') setUserInfo!: (data: Record<string, any>) => void

    isLoading = false
    listCountry: IListCountry[] = countryJson
    language = ''
    selectLanguage = ''
    phoneDefault = '+84'
    form: Record<string, any> = {
      country: '',
      phone: ''
    }

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

    get getDisableBtn(): boolean {
      return !(this.form.country && this.form.phone)
    }

    created(): void {
      this.language = window.localStorage.getItem('bc-lang')!
      this.selectLanguage = this.language
      const currentCountry = filter(this.listCountry, country => country.code === 'VN')[0]
      this.form.country = currentCountry.name
    }

    handleSelectCountry(country: string): void {
      this.phoneDefault = filter(this.listCountry, item => item.name === country)[0].dial_code
    }

    handleChangeLanguage(): void {
      //@ts-ignore
      this.$refs['form-phone']?.resetFields()
    }
    handleVerify(): void {
      if (this.getDisableBtn) {
        return
      }
      //@ts-ignore
      this.$refs['form-phone']?.validate(async valid => {
        if (valid) {
          const email = this.$route.query.email
          // const isStringStartZezo = this.form.phone.startsWith('0')
          // let _phone = this.form.phone
          // if (isStringStartZezo) {
          //   _phone = this.form.phone.replace('0', '')
          // }

          const data = {
            ...this.form,
            countryCode: this.phoneDefault,
            email
          }
          apiAuth
            .verifyPhone(data)
            .then(() => {
              this.$router.push({ name: 'verify-phone', query: { email, reason: 'VERIFY-SMS', type: 'SMS' } })
            })
            .catch(error => {
              console.log(error)
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
