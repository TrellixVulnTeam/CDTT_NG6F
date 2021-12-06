<template>
  <base-popup name="popup-member" class="popup-member" width="480px" :close="handleClose" :open="handleOpen">
    <div class="title-popup" slot="title">
      <span>{{ getTitle }}</span>
    </div>
    <div class="content">
      <el-form class="form-item">
        <div class="be-flex jc-space-between">
          <el-form-item :label="$t('label.f-name')" class="be-flex-item mr-16" prop="firstName">
            <el-input v-model="form.firstName" :placeholder="$t('placeholder.f-name')" />
          </el-form-item>
          <el-form-item :label="$t('label.l-name')" class="be-flex-item" prop="lastName">
            <el-input v-model="form.lastName" :placeholder="$t('placeholder.l-name')" />
          </el-form-item>
        </div>
        <el-form-item :label="$t('label.email')" prop="email">
          <el-input v-model="form.email" :placeholder="$t('placeholder.email')" />
        </el-form-item>
        <el-form-item v-if="type === 'add'" :label="$t('label.password')" prop="password" class="input-password">
          <el-input class="input-password" :type="showPass == true ? 'text' : 'password'" :placeholder="$t('login.placeholder.password')" v-model="form.password" />
          <span class="icon-show-password" @click="showPass = !showPass">
            <base-icon :icon="showPass == true ? 'icon-eye-off' : 'icon-eye'" size="22" />
          </span>
        </el-form-item>
        <el-form-item :label="$t('label.role')" prop="role">
          <el-checkbox-group v-model="form.roles" class="list-role">
            <el-checkbox label="MARKETING">Marketing</el-checkbox>
            <el-checkbox label="ACCOUNTANT">Accountant</el-checkbox>
            <el-checkbox label="SUPPORT">Support</el-checkbox>
            <el-checkbox label="ADMIN">Admin</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <div class="bg-line"></div>
        <div class="be-flex align-center jc-space-between status-active">
          <span>{{ $t('member.popup.status-active') }}</span>
          <el-switch v-model="form.status" active-color="#129961" class="switch-status"> </el-switch>
        </div>
      </el-form>
    </div>
    <div class="footer" slot="footer">
      <div class="be-flex wrap-button">
        <div class="btn-right">
          <el-button class="btn-default btn-close btn-h-40 mr-16" @click="handleReset">{{ $t('button.close') }}</el-button>
          <button type="button" class="btn-default-bg text-sm ml-auto add-member" @click="handleAddMember">
            <span>{{ $t('button.add-member-1') }}</span>
          </button>
        </div>
      </div>
    </div>
  </base-popup>
</template>

<script lang="ts">
  import { Component, Mixins, Prop } from 'vue-property-decorator'

  import PopupMixin from '@/mixins/popup'

  import { CustomerRepository } from '@/services/repositories/customer'
  import getRepository from '@/services'

  const apiCustomer: CustomerRepository = getRepository('customer')

  export interface IForm {
    firstName: string
    lastName: string
    email: string
    password?: string
    roles?: string[]
    status?: boolean
  }

  @Component({
    components: {}
  })
  export default class CustomerDetail extends Mixins(PopupMixin) {
    @Prop({ required: false, type: Object, default: () => ({}) }) detailRow!: Record<string, any>
    @Prop({ required: true, type: String, default: 'add' }) type!: string
    detail: Record<string, any> = {}
    isLoading = false
    showPass = false

    tabActive = 0
    lang = 'en'

    form: IForm = {
      firstName: '',
      lastName: '',
      email: '',
      roles: []
    }

    //balance
    listBlance: Record<string, any>[] = []

    get getTitle(): any {
      return this.type === 'add' ? this.$t('member.popup.title-add') : this.$t('member.popup.title-edit')
    }

    handleOpen(): void {
      this.lang = window.localStorage.getItem('bc-lang')!
    }

    handleClose(): void {
      this.tabActive = 0
    }

    handleReset(): void {
      this.form = {
        firstName: '',
        lastName: '',
        email: '',
        roles: []
      }
    }

    handleAddMember(): void {
      console.log('a')
    }
  }
</script>

<style scoped lang="scss">
  .popup-member {
    color: var(--bc-text-primary);

    .title-popup {
      span {
        color: #0a0b0d;
      }
    }

    .content {
      display: block;
      .form-item {
        .icon-show-password {
          cursor: pointer;
          position: absolute;
          bottom: 0;
          right: 14px;
          color: #a19f9d;
        }

        .list-role {
          display: flex;
          flex-wrap: wrap;
          width: 100%;
          ::v-deep .el-checkbox {
            // margin-bottom: 12px;
            width: fit-content;
            margin: 0;
          }
          ::v-deep .el-checkbox:nth-child(odd) {
            flex-basis: 52%;
          }
          ::v-deep .el-checkbox__label {
            color: #0a0b0d;
          }
          ::v-deep .el-checkbox__input {
            .el-checkbox__inner {
              width: 20px;
              height: 20px;
              &::after {
                // border: 2px solid #fff;
                height: 10px;
                left: 7px;
                top: 2px;
              }
            }
          }
          ::v-deep .el-checkbox__input.is-checked {
            .el-checkbox__inner {
              background-color: var(--bc-cb-bg-checked);
            }
          }
        }

        .bg-line {
          height: 8px;
          background-color: #f6f8fc;
          margin: 0 -24px;
        }

        .status-active {
          padding: 24px 0;
          ::v-deep.switch-status {
            .el-switch__core {
              width: 46px;
              height: 28px;
              border-radius: 33px;
              &::after {
                width: 24px;
                height: 24px;
              }
            }
          }
          ::v-deep.switch-status.is-checked {
            .el-switch__core::after {
              margin-left: -25px;
            }
          }
        }
      }
    }

    .footer {
      .wrap-button {
        justify-content: flex-end;
        .add-member {
          height: 40px;
          font-weight: 400;
          padding: 0 8px;
          &:hover {
            border: 1px solid transparent;
          }
        }
      }
    }
  }
</style>
