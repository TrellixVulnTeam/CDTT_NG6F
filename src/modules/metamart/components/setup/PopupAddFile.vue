<template>
  <base-popup name="popup-add-file" class="popup-add-file" width="600px" :close="handleClose" :open="handleOpen">
    <div class="title-popup" slot="title">
      <span>{{ typePopup === 'add' ? $t('popup_add-file') : $t('popup_edit-file') }}</span>
    </div>
    <div class="content">
      <el-form :model="form" :rules="rules" ref="popup-add-file">
        <el-form-item :label="$t('label_name')" prop="name">
          <el-input v-model="form.name" :placeholder="$t('label_name')" />
        </el-form-item>
        <el-form-item :label="$t('label_file-attach')" prop="fileName">
          <div v-if="isShowUpload" class="text-disable text-xs">DOC, PDF, XLS</div>

          <el-upload
            v-show="isShowUpload"
            class="upload-demo upload-file"
            drag
            action=""
            :show-file-list="true"
            :auto-upload="false"
            accept=".doc,.docx, .pdf, .xls, .xlsx"
            :on-change="handleChangeFile"
          >
            <div class="el-upload__text text-base">Drop file here or <span class="text-hyperlink">click to upload</span></div>
          </el-upload>
          <div v-if="!isShowUpload" class="be-flex align-center jc-space-between show-file">
            <div class="be-flex align-center left">
              <base-icon :icon="getIconFile" size="48" />
              <div class="info">
                <p class="text-semibold text-base text-overflow-1">{{ form.fileName }}</p>
                <p class="text-body-small text-desc">{{ form.size | bytesToSize }}</p>
              </div>
            </div>
            <div class="cursor" @click="handleClearFile">
              <base-icon icon="icon-delete-circle-bg" size="24" />
            </div>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <div class="footer" slot="footer">
      <div class="be-flex wrap-button">
        <div class="left">
          <el-button class="btn-default btn-close btn-h-40 mr-16" @click="handleDelete">{{ $t('button.delete') }}</el-button>
        </div>
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
  import includes from 'lodash/includes'

  import PopupMixin from '@/mixins/popup'

  @Component
  export default class PopupAddFile extends Mixins(PopupMixin) {
    @Prop({ required: false, type: String, default: 'add' }) typePopup!: string
    @Prop({ required: false, type: Object, default: () => ({}) }) rowCurrent!: Record<string, any>

    form: Record<string, any> = {
      name: '',
      fileName: '',
      type: '',
      size: 0
    }

    rawFile: Record<string, any> = {}

    isShowUpload = true

    rules: Record<string, any> = {
      name: [
        {
          required: true,
          message: this.$t('validate_must-enter-name'),
          trigger: 'blur'
        }
      ],
      fileName: [
        {
          required: true,
          message: this.$t('validate_must-enter-file'),
          trigger: 'change'
        }
      ]
    }

    get getIconFile(): string {
      if (this.isShowUpload) return ''
      const arrFileWord = ['doc', 'docx']
      const arrFilePdf = ['pdf']
      return includes(arrFileWord, this.form.fileType) ? 'icon-word' : includes(arrFilePdf, this.form.fileType) ? 'icon-pdf' : 'icon-excel'
    }

    getInfoFile(file: Record<string, any>): void {
      const lastDot = file.name.lastIndexOf('.')
      this.form.fileName = file.name.substring(0, lastDot)
      this.form.fileType = file.name.substring(lastDot + 1).toLowerCase()
      this.form.size = file.size
    }

    handleClose(): void {
      //@ts-ignore
      this.$refs['popup-add-file']?.clearValidate()
    }
    handleOpen(): void {
      if (this.typePopup === 'edit') {
        this.form = { ...this.rowCurrent }
        this.isShowUpload = false
      } else {
        this.form = {
          name: '',
          fileName: '',
          type: '',
          size: 0
        }
        this.rawFile = {}
        this.isShowUpload = true
      }
    }

    handleChangeFile(file: Record<string, any>): void {
      console.log(file)
      this.rawFile = file
      this.getInfoFile(file)
      this.isShowUpload = false
    }

    handleClearFile(): void {
      this.isShowUpload = true
      this.form = {
        name: '',
        fileName: '',
        type: '',
        size: 0
      }
    }

    handleSubmit(): void {
      //@ts-ignore
      this.$refs['popup-add-file']?.validate(valid => {
        if (valid) {
          if (this.typePopup === 'add') {
            this.$emit('confirm', this.form)
            this.isShowUpload = true
          } else {
            this.$emit('edit', this.form)
            this.isShowUpload = false
          }

          this.handleCancel()
        }
      })
    }
    handleCancel(): void {
      this.setOpenPopup({
        popupName: 'popup-add-file',
        isOpen: false
      })
    }
    handleDelete(): void {
      this.$emit('confirmDelete')
    }
  }
</script>

<style scoped lang="scss">
  ::v-deep.popup-add-file {
    .upload-file {
      margin-top: 8px;
      .el-upload {
        &-dragger {
          height: 140px;
        }
        &-list {
          display: none;
        }
      }
    }
    .show-file {
      margin-top: 8px;
      padding: 12px;
      border: 1px dashed #dbdbdb;
      border-radius: 4px;
      .left {
        width: 80%;
        .info {
          margin-left: 16px;
          p:last-child {
            margin-top: 4px;
          }
        }
      }
    }

    .footer {
      .wrap-button {
        justify-content: space-between;
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
