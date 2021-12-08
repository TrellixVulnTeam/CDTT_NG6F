<template>
  <base-popup name="popup-member" class="popup-member" width="480px" :close="handleClose" :open="handleOpen">
    <div class="title-popup" slot="title">
      <span>{{ getTitle }}</span>
    </div>
    <div class="content">
      <el-form class="form-item" :model="form" :rules="rules">
        <div class="be-flex jc-space-between">
          <el-form-item :label="$t('label.f-name')" class="be-flex-item mr-16 is-required" prop="firstName">
            <el-input v-model="form.firstName" :placeholder="$t('placeholder.f-name')" clearable />
          </el-form-item>

          <el-form-item :label="$t('label.l-name')" class="be-flex-item is-required" prop="lastName">
            <el-input v-model="form.lastName" :placeholder="$t('placeholder.l-name')" clearable />
          </el-form-item>
        </div>

        <el-form-item :label="$t('label.email')" class="is-required" prop="email">
          <el-input v-model="form.email" :placeholder="$t('placeholder.email')" clearable />
        </el-form-item>

        <el-form-item v-if="type === 'add'" :label="$t('label.password')" prop="password" class="input-password is-required">
          <el-input class="input-password" :type="showPass == true ? 'text' : 'password'" :placeholder="$t('login.placeholder.password')" v-model="form.password" />
          <span class="icon-show-password" @click="showPass = !showPass">
            <base-icon :icon="showPass == true ? 'icon-eye-off' : 'icon-eye'" size="22" />
          </span>
        </el-form-item>

        <el-form-item :label="$t('label.role')" class="is-required" prop="role">
          <el-checkbox-group v-model="form.roles" class="list-role">
            <el-checkbox label="MARKETING">{{ $t('member.sort.mkt') }}</el-checkbox>
            <el-checkbox label="ACCOUNTANT">{{ $t('member.sort.accountant') }}</el-checkbox>
            <el-checkbox label="SUPPORT">{{ $t('member.sort.support') }}</el-checkbox>
            <el-checkbox label="ADMIN">{{ $t('member.sort.admin') }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <div class="bg-line" v-if="type === 'edit'"></div>
        <div class="be-flex align-center jc-space-between status-active" v-if="type === 'edit'">
          <span>{{ $t('member.popup.status-active') }}</span>
          <el-switch v-model="form.status" active-color="#129961" active-value="ACTIVE" inactive-value="INACTIVE" class="switch-status"> </el-switch>
        </div>
      </el-form>
    </div>
    <div class="footer" slot="footer">
      <div class="be-flex wrap-button" :class="type === 'edit' ? 'jc-space-between' : null">
        <div class="btn-left" v-if="type === 'edit'">
          <el-button :class="lang === 'vi' ? 'btn-vi' : null" class="btn-default btn-close btn-h-40 mr-16 btn-delete" @click="handleDelete">{{
            $t('button.delete-user')
          }}</el-button>
        </div>
        <div class="btn-right">
          <el-button class="btn-default btn-close btn-h-40 mr-16" @click="handleReset">{{ $t('button.reset') }}</el-button>
          <button type="button" :class="lang === 'vi' && type === 'add' ? 'w-auto' : null" class="btn-default-bg text-sm ml-auto add-member" @click="handleAddMember">
            <span v-if="type === 'add'">{{ $t('button.add-member-1') }}</span>
            <span v-else>{{ $t('button.save') }}</span>
          </button>
        </div>
      </div>
    </div>
    <popup-confirm @delete="handleSubmitDelete" />
  </base-popup>
</template>

<script lang="ts">
  import { Component, Mixins, Prop } from 'vue-property-decorator'

  import PopupMixin from '@/mixins/popup'
  import PopupConfirm from './PopupConfirm.vue'
  import { MemberRepository } from '@/services/repositories/member'
  import getRepository from '@/services'

  const apiMember: MemberRepository = getRepository('member')

  export interface IForm {
    firstName: string
    lastName: string
    email: string
    password?: string
    roles?: string[]
    status?: boolean
    [x: string]: any
  }

  @Component({
    components: { PopupConfirm }
  })
  export default class MemberDetail extends Mixins(PopupMixin) {
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

    rules: Record<string, any> = {
      lastName: [
        {
          required: true,
          message: this.$t('signup.lastname'),
          trigger: 'blur'
        },
        {
          pattern: /^.{2,}$/,
          message: this.$t('signup.lastnameLength'),
          trigger: 'blur'
        }
      ],
      firstName: [
        {
          required: true,
          message: this.$t('signup.firstname'),
          trigger: 'blur'
        },
        {
          pattern: /^.{2,}$/,
          message: this.$t('signup.firstnameLength'),
          trigger: 'blur'
        }
      ],
      email: [
        {
          required: true,
          message: this.$t('login.wrong-email'),
          trigger: 'blur'
        },
        { type: 'email', message: this.$t('login.wrong-email-type'), trigger: 'blur' }
      ]
    }

    get getTitle(): any {
      return this.type === 'add' ? this.$t('member.popup.title-add') : this.$t('member.popup.title-edit')
    }

    handleOpen(): void {
      this.lang = window.localStorage.getItem('bc-lang')!
      if (this.type === 'edit') {
        this.form = { ...this.detailRow } as IForm
      }
    }

    handleClose(): void {
      this.form = {
        firstName: '',
        lastName: '',
        email: '',
        roles: []
      }
    }

    handleReset(): void {
      if (this.type === 'add') {
        this.form = {
          firstName: '',
          lastName: '',
          email: '',
          roles: []
        }
      } else {
        this.form = { ...this.detailRow } as IForm
      }
    }

    handleDelete(): void {
      this.setOpenPopup({
        popupName: 'popup-confirm',
        isOpen: true
      })
    }

    handleAddMember(): void {
      if (this.type === 'add') {
        const password = this.$options.filters?.encryptPassword(this.form.password)
        apiMember.createMember({ ...this.form, password }).then(() => {
          let message: any = this.$t('notify.add-user-succsess')
          this.$message.success({ message, duration: 5000 })
          this.setOpenPopup({
            popupName: 'popup-member',
            isOpen: false
          })
          this.$emit('reload')
        })
      } else {
        apiMember.updateMember(this.detailRow.userId, this.form).then(() => {
          let message: any = this.$t('notify.update-user-succsess')
          this.$message.success({ message, duration: 5000 })
          this.setOpenPopup({
            popupName: 'popup-member',
            isOpen: false
          })
          this.$emit('reload')
        })
      }
    }

    handleSubmitDelete(): void {
      apiMember.deleteMember(this.detailRow.userId).then(() => {
        let message: any = this.$t('notify.delete-user-success')
        this.$message.success({ message, duration: 5000 })
        this.setOpenPopup({
          popupName: 'popup-member',
          isOpen: false
        })
        this.$emit('reload')
      })
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
            font-size: 16px;
            font-weight: 400;
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
      .jc-space-between {
        justify-content: space-between;
      }
      .btn-left {
        .btn-close {
          padding: 0;
          height: 40px;
        }
        .btn-vi {
          width: auto !important;
          padding: 0 10px;
        }
        .btn-delete:hover {
          border: 1px solid var(--bc-btn-bg-reject);
          color: var(--bc-status-error);
        }
      }
      .btn-close:focus {
        color: var(--bc-btn-text);
        background-color: var(--bc-bg-white);
      }
    }
  }
</style>
