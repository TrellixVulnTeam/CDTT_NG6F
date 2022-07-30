<template>
  <div class="tab-setting">
    <el-form class="form-setting">
      <div class="content-left">
        <el-form-item :label="$t('label_service-fee')">
          <el-input v-model="form.serviceFee" type="number" :placeholder="$t('label_service-fee')">
            <div class="suffix" slot="suffix">%</div>
          </el-input>
        </el-form-item>
        <div class="be-flex align-center jc-space-between switch-item">
          <div class="left">
            <p class="text-base text-semibold">{{ $t('label_top-nft') }}</p>
            <p class="nft-body-small text-desc">{{ $t('label_top-nft-desc') }}</p>
          </div>
          <div class="right">
            <el-switch v-model="form.topNft" active-color="#13ce66"> </el-switch>
          </div>
        </div>
        <div class="be-flex align-center jc-space-between switch-item">
          <div class="left">
            <p class="text-base text-semibold">{{ $t('label_hot-nft') }}</p>
            <p class="nft-body-small text-desc">{{ $t('label_hot-nft-desc') }}</p>
          </div>
          <div class="right">
            <el-switch v-model="form.hotNft" active-color="#13ce66"> </el-switch>
          </div>
        </div>
      </div>

      <div class="content-right">
        <el-form-item :label="$t('label_royal-fee')">
          <el-input v-model="form.royalFee" type="number" :placeholder="$t('label_royal-fee')">
            <div class="suffix" slot="suffix">%</div>
          </el-input>
        </el-form-item>
        <el-form-item :label="$t('label_position-top-nft')">
          <el-input v-model="form.positionTopNft" type="number" :placeholder="$t('label_position-top-nft')" />
        </el-form-item>
        <el-form-item :label="$t('label_position-hot-nft')">
          <el-input v-model="form.positionHotNft" type="number" :placeholder="$t('label_position-hot-nft')" />
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator'

  @Component
  export default class TabSetting extends Vue {
    @Prop({ required: false, type: String, default: 'add' }) typePopup!: 'add' | 'edit'

    form: Record<string, any> = {
      serviceFee: '',
      topNft: false,
      hotNft: false
    }
  }
</script>

<style scoped lang="scss">
  ::v-deep.tab-setting {
    .form-setting {
      display: flex;
      .content-left {
        flex: 1;
        margin-right: 24px;
        .switch-item {
          margin-bottom: 28px;
          .el-switch {
            &__core {
              width: 44px !important;
              height: 26px;
              border-radius: 40px;
              &::after {
                width: 22px;
                height: 22px;
              }
            }
          }
          .is-checked {
            .el-switch__core {
              &::after {
                margin-left: -23px;
              }
            }
          }
        }
      }
      .content-right {
        flex: 1;
      }
    }
    .el-form {
      &-item {
        &__label {
          font-size: 16px;
          line-height: 24px;
          font-weight: 600;
        }
        .el-input__suffix {
          display: flex;
          align-items: center;
          right: 12px;
        }
      }
    }
  }
</style>
