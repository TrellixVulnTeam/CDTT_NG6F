<template>
  <div class="list-balance">
    <filter-main :sorts="sorts" @filter="handleFilter" :isShowFilter="false" />
    <div class="table" v-loading="isLoading" :class="isLoading ? 'list-loading' : null">
      <base-table :data="listBlance" :showPagination="false" class="base-table table-wallet">
        <el-table-column label="#" type="index" align="center" width="40" />
        <el-table-column :label="$t('customer.table.asset')" width="144">
          <template slot-scope="scope">
            <div class="be-flex align-center">
              <base-icon :icon="getIcon(scope.row.asset)" size="24" />
              <span style="padding-left: 8px" class="d-ib">{{ getAssetTitle(scope.row.asset) }}</span>
            </div>
          </template>
        </el-table-column>

        <el-table-column :label="$t('customer.table.price')" align="right" width="160">
          <template slot-scope="scope">
            <span>${{ scope.row.price | convertAmountDecimal('USD') }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('customer.table.available')" align="right" width="200">
          <template slot-scope="scope">
            <span class="text-base">{{ scope.row.available | convertAmountDecimal(scope.row.asset) }} {{ scope.row.asset }}</span>
            <span class="d-block small">~${{ scope.row.availableUSD | convertAmountDecimal('USD') }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('customer.table.lock-amount')" align="right" width="200">
          <template slot-scope="scope">
            <span class="text-base">{{ scope.row.lockedAmount | convertAmountDecimal(scope.row.asset) }} {{ scope.row.asset }}</span>
            <span class="d-block small">~${{ scope.row.lockedAmountUSD | convertAmountDecimal('USD') }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('customer.table.balance')" align="right">
          <template slot-scope="scope">
            <span class="text-base">{{ scope.row.totalBalance | convertAmountDecimal(scope.row.asset) }} {{ scope.row.asset }}</span>
            <span class="d-block small">~${{ scope.row.totalBalanceUSD | convertAmountDecimal('USD') }}</span>
          </template>
        </el-table-column>
      </base-table>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import FilterMain from '@/components/filter/FilterMain.vue'

  import getRepository from '@/services'
  import { CustomerRepository } from '@/services/repositories/customer'
  const apiCustomer: CustomerRepository = getRepository('customer')

  @Component({ components: { FilterMain } })
  export default class CustomerBalance extends Vue {
    @Prop({ required: true, type: Number, default: 0 }) userId!: number

    listBlance: Record<string, any>[] = []
    isLoading = false
    filter: Record<string, any> = {}
    sorts: Array<Record<string, any>> = [
      {
        command: 'price',
        label: this.$i18n.t('customer.sort.price'),
        divided: false,
        i18n: 'customer.sort.price'
      },
      {
        command: 'avaiableAmount',
        label: this.$i18n.t('customer.sort.avail-amount'),
        divided: false,
        i18n: 'customer.sort.avail-amount'
      },
      {
        command: 'lockedAmount',
        label: this.$i18n.t('customer.sort.locked-amount'),
        divided: false,
        i18n: 'customer.sort.locked-amount'
      },
      {
        command: 'balanceAmount',
        label: this.$i18n.t('customer.sort.balance-amount'),
        divided: false,
        i18n: 'customer.sort.balance-amount'
      }
    ]

    created(): void {
      this.handleGetListBalance()
    }

    async handleGetListBalance(): Promise<void> {
      try {
        this.isLoading = true
        this.listBlance = await apiCustomer.getlistBalance(this.userId, this.filter)
        this.isLoading = false
      } catch (error) {
        this.isLoading = false
        console.log(error)
      }
    }

    handleFilter(filter: Record<string, any>): void {
      this.filter = { ...this.filter, ...filter, orderType: 'desc' }
      this.handleGetListBalance()
    }

    getIcon(asset: string): string {
      switch (asset) {
        case 'BNB':
          return 'icon-bnb'
        case 'BTC':
          return 'icon-btc'
        case 'ETH':
          return 'icon-eth'
        case 'CLM':
          return 'icon-clm'
        case 'USDC':
          return 'icon-usdc'
        case 'USDT':
          return 'icon-usdt'

        default:
          return 'icon-lin'
      }
    }

    getAssetTitle(asset: string): string {
      switch (asset) {
        case 'BNB':
          return 'Binance'
        case 'BTC':
          return 'Bitcoin'
        case 'ETH':
          return 'Ethereum'
        case 'CLM':
          return 'CLM'
        case 'USDC':
          return 'USDC'
        case 'USDT':
          return 'Tether'

        default:
          return 'Lynkey'
      }
    }
  }
</script>

<style scoped lang="scss">
  .list-balance {
    .input-search {
      width: 400px;
      margin-right: 30px;
    }
    .sort {
      cursor: pointer;
      color: #0a0b0d;
    }
    .list-loading {
      min-height: 200px;
    }
    .table {
      padding: 0 24px 24px 24px;
      .small {
        font-size: 14px !important;
        line-height: 16px;
        color: #5b616e;
      }
    }
  }
</style>
