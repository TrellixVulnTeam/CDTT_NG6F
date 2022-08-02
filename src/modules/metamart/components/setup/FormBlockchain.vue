<template>
  <div class="form-blockchain">
    <el-form>
      <el-form-item :label="$t('label_copies')" class="is-required">
        <el-input v-model="form.copies" :placeholder="$t('label_copies')" />
      </el-form-item>
      <el-form-item :label="$t('label_contract-address')" class="is-required">
        <el-input v-model="form.contractAddress" :placeholder="$t('label_contract-address')" disabled />
      </el-form-item>
      <el-form-item :label="$t('label_token-id')" class="is-required">
        <el-input v-model="form.tokenId" :placeholder="$t('label_token-id')" disabled />
      </el-form-item>
      <el-form-item :label="$t('label_blockchain-network')" class="is-required">
        <el-input v-model="form.network" :placeholder="$t('label_network')" disabled />
      </el-form-item>
      <el-form-item :label="$t('label_token-standard')" class="is-required">
        <el-input v-model="form.tokenStandard" :placeholder="$t('label_token-standard')" disabled />
      </el-form-item>
      <el-form-item :label="$t('label_creator')" class="creator is-required">
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
  import { Component, Vue } from 'vue-property-decorator'

  @Component
  export default class FormBlockchain extends Vue {
    form: Record<string, any> = {
      copies: '',
      contractAddress: '0x1EACE3C7af307A5840c3eF44c5e01547BF2DEf0C',
      tokenId: '#15687',
      network: 'Ethereum',
      tokenStandard: 'ERC1155',
      creator: 'LynKey (lynkey@gmail.com)'
    }
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
