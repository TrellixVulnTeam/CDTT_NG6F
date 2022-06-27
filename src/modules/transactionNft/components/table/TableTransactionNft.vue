<template>
  <base-table
    :data="listTransaction"
    :showPagination="true"
    :table="query"
    :paginationInfo="getPaginationInfo"
    @sizeChange="handleSizeChange"
    @currentChange="handleCurrentChange"
    @rowClick="handleRowClick"
    class="base-table table-trans-nft"
  >
    <el-table-column label="#" :index="getIndex" type="index" align="center" width="80 " />
    <el-table-column :label="$t('transaction.table.trans-id')">
      <template slot-scope="scope">
        <div class="transaction-col">
          <div class="be-flex align-center">
            <span class="transaction-code text-hyperlink d-ib mr-2">{{ scope.row.transactionCode | formatTransactionCode(10) }}</span>
            <span v-if="scope.row.transactionCode" class="icon-copy" @click="handleCopyTransaction(scope.row)" ref="buttonCopy">
              <base-icon icon="icon-copy" size="24" />
            </span>
          </div>
          <div class="time">
            <span class="text-body-small text-desc">{{ scope.row.transactionDate | formatMMDDYY }}</span>
          </div>
        </div>
      </template>
    </el-table-column>
    <el-table-column :label="$t('transaction.table.item')">
      <template slot-scope="scope">
        <div class="be-flex align-center item-col">
          <div class="avatar" v-if="scope.row.itemAvatar">
            <img :src="scope.row.itemAvatar" alt="" />
          </div>
          <div class="info">
            <p class="text-base text-overflow-1">{{ scope.row.itemName }}</p>
            <p class="text-body-small text-desc">#{{ scope.row.itemCode }}</p>
          </div>
        </div>
      </template>
    </el-table-column>
    <el-table-column :label="$t('transaction.table.from')">
      <template slot-scope="scope">
        <div class="from-col">
          <p class="text-base text-overflow-1">{{ scope.row.fromAccountName }}</p>
          <p class="text-body-small text-desc text-overflow-1">{{ scope.row.fromUsername }}</p>
        </div>
      </template>
    </el-table-column>
    <el-table-column :label="$t('transaction.table.price')" align="right" v-if="tabActive !== 'TRANSFER' && tabActive !== 'BURN'">
      <template slot-scope="scope">
        <div class="price-col">
          <p class="text-base text-overflow-1">{{ scope.row.price | convertAmountDecimal(scope.row.currency) }} {{ scope.row.currency }}</p>
          <p class="text-body-small text-desc">~${{ scope.row.priceUSD | convertAmountDecimal('USD') }}</p>
        </div>
      </template>
    </el-table-column>
    <el-table-column :label="$t('transaction.table.quantity')" prop="quantity" align="right"> </el-table-column>
  </base-table>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'

  @Component
  export default class TableTransaction extends Vue {
    @Prop({ required: true, type: Array, default: [] }) listTransaction!: Record<string, any>[]
    @Prop({ required: true, type: Object, default: {} }) query!: Record<string, any>
    @Prop({ required: false, type: String, default: 'LIST' }) tabActive!: string

    get getPaginationInfo(): any {
      return this.$t('paging.transaction')
    }

    get getIndex(): number {
      return this.query.limit * (this.query.page - 1) + 1
    }

    checkTransactionType(type: string): any {
      switch (type) {
        case 'DEPOSIT':
          return this.$i18n.t('transaction.table.deposit')
        case 'WITHDRAW':
          return this.$i18n.t('transaction.table.withdraw')
        case 'TRANSFER':
          return this.$i18n.t('transaction.table.transfer')
        case 'CROWDSALE':
          return this.$i18n.t('transaction.table.crowdsale')
        case 'BUY':
          return this.$i18n.t('transaction.table.buy')
        case 'BONUS_SIGN_UP':
          return this.$i18n.t('transaction.table.bonus-sign-up')
        case 'BONUS_CROWDSALE':
          return this.$i18n.t('transaction.table.bonus-crowdsale')
        case 'BONUS_FIRST_TRANS':
          return this.$i18n.t('transaction.table.bonus-first-trans')
        case 'BONUS_AFFILIATE':
          return this.$i18n.t('transaction.table.bonus-affiliate')
        case 'BONUS_BIG_BACKER':
          return this.$i18n.t('transaction.table.bonus-big-backer')
        case 'BONUS_EARLY_BACKER':
          return this.$i18n.t('transaction.table.bonus-early-backer')
        case 'BONUS_SIGN_UP_REFERRAL':
          return this.$i18n.t('transaction.table.bonus-sign-up-referral')
        case 'NFT_SALE':
          return this.$i18n.t('transaction.table.nft-sale')
        case 'NFT_TRANSFER':
          return this.$i18n.t('transaction.table.nft-transfer')
        case 'ROYALTIES_FEE':
          return this.$i18n.t('transaction.table.royalties-fee')

        default:
          return this.$i18n.t('transaction.table.sell')
      }
    }

    checkTransactionStatus(status: string): any {
      switch (status) {
        case 'SUCCESS':
          return this.$i18n.t('transaction.table.succsess')
        case 'PENDING':
          return this.$i18n.t('transaction.table.pending')
        case 'PROCESSING':
          return this.$i18n.t('transaction.table.processing')
        case 'REJECTED':
          return this.$i18n.t('transaction.table.rejected')
        // case 'FAILED':
        //   return this.$i18n.t('transaction.table.failed')

        default:
          return this.$i18n.t('transaction.table.failed')
      }
    }

    checkType(type: string): string {
      return type === 'PENDING'
        ? 'status status-pending'
        : type === 'FAILED'
        ? 'status status-error'
        : type === 'PROCESSING'
        ? 'status status-warning'
        : type === 'REJECTED'
        ? 'status status-rejected'
        : 'status status-success'
    }

    handleCopyTransaction(row: Record<string, any>): void {
      this.$emit('copy', 'copy')
      let message: any = ''
      const el = document.createElement('input')
      el.value = row.transactionCode
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      message = this.$t('notify.copy')
      this.$message.success(message)
    }

    checkValueAmountDisplay(value: string | null): string {
      if (value) {
        if (value.indexOf('+') !== -1) {
          return 'add'
        } else {
          return 'sub'
        }
      } else return ''
    }

    handleSizeChange(value: number): void {
      this.$emit('sizeChange', value)
    }

    handleCurrentChange(value: number): void {
      this.$emit('pageChange', value)
    }

    handleRowClick(row: Record<string, any>): void {
      this.$emit('rowClick', row.row)
    }
  }
</script>

<style scoped lang="scss">
  .status {
    // padding: 4px 7px;
    border-radius: 4px;
  }

  .add {
    color: #129961;
  }

  .sub {
    color: #cf202f;
  }

  .customer {
    p:first-of-type {
      font-family: Open Sans;
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      line-height: 24px;
      color: #0a0b0d;
    }

    p:last-of-type {
      font-family: Open Sans;
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 20px;
      color: #5b616e;
      border-bottom: none;
    }
  }

  .transaction-code {
    min-width: 200px;
  }

  ::v-deep.table-trans-nft {
    .item-col {
      .avatar {
        width: 40px;
        height: 40px;
        margin-right: 8px;
        img {
          width: 100%;
          border-radius: 4px;
        }
      }
      .info {
        flex: 1;
      }
    }
  }
</style>
