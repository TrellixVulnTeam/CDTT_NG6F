<template>
  <base-popup name="popup-setting-round-member" class="popup-member" width="480px" :close="handleClose" :open="handleOpen">
    <div class="title-popup" slot="title">
      <span>{{ getTitle }}</span>
    </div>
    <div class="content" v-loading="isLoading">
      <el-form class="form-item" :model="form" :rules="rules" ref="setting-round-member" autocomplete="off">
        <el-form-item :label="$t('label.email')" class="is-required" prop="email">
          <el-input v-model="form.userEmail" autocomplete="new-password" :readonly="false" :placeholder="$t('placeholder.email')" clearable />
        </el-form-item>

        <div class="be-flex jc-space-between">
          <el-form-item :label="$t('label.f-name')" class="be-flex-item mr-16 is-required" prop="firstName">
            <el-input v-model="form.userFirstName" :placeholder="$t('placeholder.f-name')" disabled clearable />
          </el-form-item>

          <el-form-item :label="$t('label.l-name')" class="be-flex-item is-required" prop="lastName">
            <el-input v-model="form.userLastName" :placeholder="$t('placeholder.l-name')" disabled clearable />
          </el-form-item>
        </div>

        <el-form-item :label="$t('label.round')" class="is-required" prop="role">
          <el-checkbox-group v-model="listRoundChecked" class="list-role">
            <el-checkbox v-for="(round, index) in listRound" :key="round.id" :label="round.id" :disabled="checkDisableRound(index)">{{ round.name }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
    </div>
    <div class="footer" slot="footer">
      <div class="be-flex wrap-button">
        <div class="btn-right">
          <el-button class="btn-default btn-close btn-h-40 mr-16" @click="handleCancel">{{ $t('button.cancel') }}</el-button>
          <button type="button" class="btn-default-bg text-sm ml-auto add-member" @click="handleSubmit">
            <span>{{ $t('button.save') }}</span>
          </button>
        </div>
      </div>
    </div>
  </base-popup>
</template>

<script lang="ts">
  import { Component, Mixins, Prop } from 'vue-property-decorator'

  import PopupMixin from '@/mixins/popup'
  import { CrowdsaleRepository } from '@/services/repositories/crowdsale'
  import getRepository from '@/services'
  import { namespace } from 'vuex-class'
  import { findIndex, forEach } from 'lodash'

  const crowdsaleBo = namespace('crowdsaleBo')

  const apiCrowdsale: CrowdsaleRepository = getRepository('crowdsale')
  @Component({
    components: {}
  })
  export default class PopupSettingRoundMember extends Mixins(PopupMixin) {
    @Prop({ required: false, type: Object, default: () => ({}) }) detailRow!: Record<string, any>
    @Prop({ required: false, type: Array, default: () => [] }) listRound!: Record<string, any>[]
    @Prop({ required: true, type: String, default: 'add' }) type!: string
    @Prop({ required: true, type: Number, default: 0 }) userId!: number

    @crowdsaleBo.State('roundCurrent') roundCurrent!: Record<string, any>

    form = {
      userEmail: '',
      userFirstName: '',
      userLastName: ''
    }
    listRoundChecked: number[] = []

    isLoading = true

    rules: Record<string, any> = {
      email: [
        {
          required: true,
          message: this.$t('member.validate.wrong-email'),
          trigger: 'blur'
        },
        { type: 'email', message: this.$t('member.validate.wrong-email-type'), trigger: 'blur' }
      ]
    }

    get indexRoundCurrent(): number {
      if (this.listRound.length && this.roundCurrent) {
        return findIndex(this.listRound, round => round.id === this.roundCurrent.id)
      }
      return 0
    }

    get getTitle(): string {
      if (this.type === 'add') {
        return this.$t('crowdsale.popup.title-member') as string
      }
      return this.$t('crowdsale.popup.title-member-edit') as string
    }

    checkDisableRound(index: number): boolean {
      return index < this.indexRoundCurrent
    }

    handleCancel(): void {
      this.setOpenPopup({
        popupName: 'popup-setting-round-member',
        isOpen: false
      })
    }

    handleOpen(): void {
      if (this.type === 'edit') {
        apiCrowdsale
          .getDetailRoundUser(this.userId)
          .then(res => {
            this.form = { ...res }
            forEach(res.listRoundOfUser, elm => {
              this.listRoundChecked.push(elm.roundId)
            })
            this.isLoading = false
          })
          .catch(() => {
            this.isLoading = false
          })
      }
    }

    handleClose(): void {
      this.listRoundChecked = []
      this.form = {
        userEmail: '',
        userFirstName: '',
        userLastName: ''
      }
      //@ts-ignore
      this.$refs['setting-round-member'].clearValidate()
    }

    handleSubmit(): void {
      //@ts-ignore
      this.$refs['setting-round-member']?.validate(valid => {
        if (valid) {
          const data = {}
          //   apiCrowdsale.resetPassWordMember(data).then(() => {
          //     let message: any = this.$t('notify.setting-round-member-succsess')
          //     this.$message.success({ message, duration: 5000 })
          //     this.handleCancel()
          //   })
        }
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
      }
      .btn-close:focus {
        color: var(--bc-btn-text);
        background-color: var(--bc-bg-white);
      }
    }
  }
</style>