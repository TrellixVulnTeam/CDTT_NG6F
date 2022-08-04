<template>
  <div class="form-blockchain">
    <el-form>
      <el-form-item :label="$t('label_copies')" class="is-required">
        <el-input type="number" v-model="form.copies" :placeholder="$t('label_copies')" @keypress.native="onlyNumber($event)" />
      </el-form-item>
      <el-form-item :label="$t('label_contract-address')" class="is-required">
        <el-input v-model="form.contractAddress" :placeholder="$t('label_contract-address')" disabled />
      </el-form-item>
      <el-form-item :label="$t('label_token-id')" class="is-required">
        <el-input v-model="form.tokenId" :placeholder="$t('label_token-id')" disabled />
      </el-form-item>
      <el-form-item :label="$t('label_blockchain-network')" class="is-required">
        <el-input v-model="form.network" :placeholder="$t('label_blockchain')" disabled />
      </el-form-item>
      <el-form-item :label="$t('label_token-standard')" class="is-required">
        <el-input v-model="form.tokenStandard" :placeholder="$t('label_token-standard')" disabled />
      </el-form-item>
      <el-form-item :label="$t('label_creator')" class="creator is-required hide-arrow">
        <el-select v-model="form.creator" class="select-prefix-icon w-100" disabled>
          <template slot="prefix">
            <div class="d-iflex select-icon">
              <base-icon icon="icon-lynk" size="24" class="d-iflex" />
            </div>
          </template>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
  import { Component, Mixins } from 'vue-property-decorator'
  import FormatInputMixin from '@/mixins/formatInput'
  import { namespace } from 'vuex-class'

  const bcNft = namespace('bcNft')

  @Component
  export default class FormBlockchain extends Mixins(FormatInputMixin) {
    @bcNft.State('initBlockchain') form!: Record<string, any>
  }
</script>

<style scoped lang="scss">
  ::v-deep.form-blockchain {
    flex: 1;
    margin-right: 24px;
    .el-form {
      &-item {
        .el-input.is-disabled {
          .el-input__inner {
            color: #5b616e;
          }
        }
        &__label {
          font-size: 16px;
          line-height: 24px;
          font-weight: 600;
        }
      }

      &-item:last-child {
        margin-bottom: 0;
      }
      .creator {
        .el-input__inner {
          padding-left: 40px;
        }
        .el-input__prefix {
          margin-left: 7px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
  }
</style>
