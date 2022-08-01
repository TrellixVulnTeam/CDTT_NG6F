<template>
  <base-popup name="popup-add-map" class="popup-add-map" width="600px" :close="handleClose" :open="handleOpen">
    <div class="title-popup" slot="title">
      <span>{{ typePopup === 'add' ? $t('popup_add-policy') : $t('popup_edit-policy') }}</span>
    </div>
    <div class="content">
      <el-form :model="form" :rules="rules" ref="popup-add-map">
        <el-form-item :label="$t('label_name')" prop="name">
          <el-input v-model="form.name" :placeholder="$t('label_name')" />
        </el-form-item>
        <el-form-item :label="$t('label_annotate')">
          <el-input v-model="form.annotate" :placeholder="$t('label_annotate')" />
        </el-form-item>
        <el-form-item :label="$t('label_type')" prop="type">
          <el-select v-model="form.type" class="w-100">
            <el-option :label="$t('label_number')" value="number" />
            <el-option :label="$t('label_text')" value="text" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('label_long-desc')" prop="desc">
          <el-input v-model="form.desc" :placeholder="$t('label_long-desc')" />
        </el-form-item>
        <el-form-item :label="$t('label_value')" prop="value">
          <el-input type="number" v-model="form.value" :placeholder="$t('label_value')" />
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

  @Component({
    components: {}
  })
  export default class PopupAddMap extends Mixins(PopupMixin) {
    @Prop({ required: false, type: String, default: 'add' }) typePopup!: string

    form: Record<string, any> = {
      name: '',
      annotate: '',
      type: 'number',
      desc: '',
      value: ''
    }

    rules: Record<string, any> = {
      name: [
        {
          required: true,
          message: this.$t('validate_must-enter-name'),
          trigger: 'blur'
        }
      ],
      type: [
        {
          required: true,
          message: this.$t('validate_must-enter-type'),
          trigger: 'change'
        }
      ],
      desc: [
        {
          required: true,
          message: this.$t('validate_must-enter-desc'),
          trigger: 'blur'
        }
      ],
      value: [
        {
          required: true,
          message: this.$t('validate_must-enter-value'),
          trigger: 'blur'
        }
      ]
    }

    handleClose(): void {
      //@ts-ignore
      this.$refs['popup-add-map']?.clearValidate()
    }
    handleOpen(): void {
      return
    }
    handleSubmit(): void {
      //@ts-ignore
      this.$refs['popup-add-map']?.validate(valid => {
        if (valid) {
          this.$emit('confirm', this.form)
          this.handleCancel()
        }
      })
    }
    handleCancel(): void {
      this.setOpenPopup({
        popupName: 'popup-add-map',
        isOpen: false
      })
    }
  }
</script>

<style scoped lang="scss">
  .popup-add-map {
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
