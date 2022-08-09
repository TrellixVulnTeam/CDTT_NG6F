<template>
  <base-popup name="popup-metamart-delete" class="popup-delete" width="400px" :open="handleOpen" :close="handleClose">
    <div class="title-popup" slot="title">
      <span>{{ $t('button.delete') }}</span>
    </div>
    <div class="content" style="padding-bottom: 24px">
      <span v-if="type === 'delete-collection'" class="content-text">
        {{ $t('metamart.collection.delete.confirmation-1') }} <span class="content-text__item">The Mike Tyson</span> {{ $t('metamart.collection.delete.confirmation-2') }}
      </span>
      <span v-else-if="type === 'delete-nft'" class="content-text"> Are you sure you want to delete this <span class="content-text__item">The Myth Virtual Tour</span> item? </span>
      <span v-else class="content-text"> Are you sure you want to delete this category ? </span>
    </div>
    <div v-if="isHaveNft" class="notification">
      <div class="notification-title">
        <div class="notification-title__icon">
          <img src="../../../../icons/png/alert.png" alt="icon alert" />
        </div>
        <p class="notification-title__text">{{ $t('metamart.collection.delete.warning-label') }}</p>
      </div>
      <p class="notification-subtitle">{{ $t('metamart.collection.delete.warning-description') }}</p>
    </div>
    <div class="footer" slot="footer">
      <div class="be-flex jc-flex-end">
        <el-button class="btn-default btn-close btn-h-40 mr-16" @click="handleCancel">{{ $t('button.cancel') }}</el-button>
        <el-button class="btn-default delete-btn" :disabled="isHaveNft" @click="handleSubmit">{{ $t('button.confirm') }}</el-button>
      </div>
    </div>
    <popup-verify-email @submit="handleDelete"></popup-verify-email>
    <popup-success type="delete-collection"></popup-success>
  </base-popup>
</template>

<script lang="ts">
  import PopupMixin from '@/mixins/popup'
  import { Component, Mixins, Prop, Emit } from 'vue-property-decorator'
  import PopupVerifyEmail from './PopupVerifyEmail.vue'
  import PopupSuccess from './PopupSuccess.vue'
  import EventBus from '@/utils/eventBus'
  import { namespace } from 'vuex-class'
  const beAuth = namespace('beAuth')
  import getRepository from '@/services'
  import { AuthRepository } from '@/services/repositories/auth'
  import { NftRepository } from '@/services/repositories/nft'

  const apiUser: AuthRepository = getRepository('auth')
  const apiNft: NftRepository = getRepository('nft')

  @Component({
    components: { PopupVerifyEmail, PopupSuccess }
  })
  export default class PopupDelete extends Mixins(PopupMixin) {
    @Prop({ required: false, type: Array, default: [] }) selectedNft!: Array<Record<string, any>>
    @Prop({ required: true, type: String, default: '' }) type!: string
    @Prop({ required: false, type: Object, default: {} }) dataDetail!: Record<string, any>
    @beAuth.State('user') user!: Record<string, any>
    @Prop() idDelete!: any

    value = ''

    emailVerification = {
      email: this.user.email,
      type: 'EMAIL',
      userType: 'EMPLOYEE'
    }

    isHaveNft = false
    async getEmailVerification(): Promise<void> {
      let params = {
        email: this.user.email,
        type: 'EMAIL',
        userType: 'EMPLOYEE'
      }
      await apiUser
        .getEmailVerification(params)
        .then((res: any) => {
          this.$message.success('Code sent, please check your email')
          console.log(res)
        })
        .catch(e => {
          console.log(e)
        })
    }
    async deleteCategory(): Promise<void> {
      let params = {
        verificationCode: this.value,
        type: 'EMAIL',
        email: this.user.email
      }
      console.log(params, 'params xoa category')
      await apiNft
        .deleteCategory(this.idDelete, params)
        .then((res: any) => {
          this.setOpenPopup({
            popupName: 'popup-metamart-verify-email',
            isOpen: false
          })
          this.setOpenPopup({
            popupName: 'popup-metamart-success',
            isOpen: true
          })
          this.$emit('load')
        })
        .catch(e => {
          console.log(e)
        })
    }

    created(): void {
      EventBus.$on('closePopup', this.handleCancel)
    }
    destroyed(): void {
      EventBus.$off('closePopup', this.handleCancel)
    }

    handleCancel(): void {
      this.setOpenPopup({
        popupName: 'popup-metamart-delete',
        isOpen: false
      })
    }
    handleSubmit(): void {
      if (this.isHaveNft) {
        return
      } else {
        this.setOpenPopup({
          popupName: 'popup-metamart-verify-email',
          isOpen: true
        })
        console.log(this.type)
      }
      if (this.$route.name === 'Category') {
        console.log('This is category')
        this.getEmailVerification()
      }
    }
    handleDelete(value: any): void {
      if (this.$route.name === 'Category') {
        this.value = value
        this.deleteCategory()
        console.log(this.idDelete)
      }
      //if success
      // Tạm đóng cái này
      // this.setOpenPopup({
      //   popupName: 'popup-metamart-verify-email',
      //   isOpen: false
      // })
    }
  }
</script>

<style scoped lang="scss">
  ::v-deep.popup-delete {
    .content {
      &-text {
        font-weight: 400;
        font-size: 16px;
        line-height: 24px;
        color: var(--bc-text-discript);
        &__item {
          color: var(--bc-text-primary);
          font-weight: 600;
        }
      }
    }
    .notification {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-bottom: 24px;
      padding: 12px 24px;
      background-color: var(--bc-bg-error);
      border-radius: 6px;
      &-title {
        display: flex;
        align-items: center;
        gap: 10px;
        &__icon {
          width: 22px;
          height: 22px;
        }
        &__text {
          font-size: 16px;
          line-height: 24px;
          font-weight: 600;
          color: var(--bc-status-error);
        }
      }
      &-subtitle {
        font-weight: 400;
        font-size: 14px;
        line-height: 20px;
        color: var(--bc-text-discript);
      }
    }
    .footer {
      .delete-btn {
        width: 100px;
        margin: 0;
        background-color: var(--bc-theme-primary);
        color: var(--bc-color-white);
        border: none;
        &:hover {
          background-color: var(--bc-btn-bg-default-hover);
        }
      }
      .is-disabled {
        background-color: var(--bc-color-grey20);
        color: var(--bc-status-neutral);
        &:hover {
          background-color: var(--bc-color-grey20);
        }
      }
    }
  }
</style>
