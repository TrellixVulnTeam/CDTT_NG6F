<template>
  <div class="list-balance">
    <div class="be-flex mb-24 align-center kyc-filter filter">
      <el-input v-model="filter.search" class="input-search" :placeholder="$t('placeholder.search')">
        <span slot="prefix" class="prefix-search">
          <base-icon icon="icon-search" size="24" />
        </span>
      </el-input>
      <div>
        <el-dropdown class="sort" trigger="click" @command="handleSort">
          <span class="abicon sort-title" style="font-size: 16px">
            <base-icon icon="icon-sort" style="color: #5b616e; margin-right: 10px" size="18" class="icon" /> {{ $t('kyc.filter.sort') }}</span
          >
          <el-dropdown-menu class="header-downloadapp dropdown-sort" style="width: 200px" slot="dropdown">
            <el-dropdown-item
              v-for="(value, index) in sorts"
              :key="index"
              :class="sortActive === value.command ? 'active' : null"
              :command="value.command"
              :divided="value.divided"
            >
              <span class="be-flex">
                <span class="be-flex-item">
                  {{ value.label }}
                </span>
                <base-icon v-if="sortActive === value.command" icon="icon-tick-dropdown" size="16" />
              </span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div class="table">
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
            <span class="text-base">{{ scope.row.available | convertAmountDecimal(getUnit(scope.row.asset)) }} {{ getUnit(scope.row.asset) }}</span>
            <span class="d-block small">~${{ scope.row.availableUSD | convertAmountDecimal('USD') }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('customer.table.lock-amount')" align="right" width="200">
          <template slot-scope="scope">
            <span class="text-base">{{ scope.row.lockedAmount | convertAmountDecimal(getUnit(scope.row.asset)) }} {{ getUnit(scope.row.asset) }}</span>
            <span class="d-block small">~${{ scope.row.lockedAmountUSD | convertAmountDecimal('USD') }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('customer.table.balance')" align="right">
          <template slot-scope="scope">
            <span class="text-base">{{ scope.row.totalBalance | convertAmountDecimal(getUnit(scope.row.asset)) }} {{ getUnit(scope.row.asset) }}</span>
            <span class="d-block small">~${{ scope.row.totalBalanceUSD | convertAmountDecimal('USD') }}</span>
          </template>
        </el-table-column>
      </base-table>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'

  @Component
  export default class CustomerBalance extends Vue {
    @Prop({ required: true, type: Array, default: [] }) listBlance!: Array<Record<string, any>>

    filter: Record<string, any> = {}
    sorts: Array<Record<string, any>> = [
      {
        command: 1,
        label: this.$i18n.t('customer.sort.price'),
        divided: false,
        i18n: 'customer.sort.price'
      },
      {
        command: 2,
        label: this.$i18n.t('customer.sort.avail-amount'),
        divided: false,
        i18n: 'customer.sort.avail-amount'
      },
      {
        command: 3,
        label: this.$i18n.t('customer.sort.locked-amount'),
        divided: false,
        i18n: 'customer.sort.locked-amount'
      },
      {
        command: 4,
        label: this.$i18n.t('customer.sort.balance-amount'),
        divided: false,
        i18n: 'customer.sort.balance-amount'
      }
    ]
    sortActive = 1

    handleSort(command: number): void {
      this.sortActive = command
      // this.filter.orderBy = command
      // this.$emit('filter', this.filter)
    }

    getIcon(asset: string): string {
      switch (asset) {
        case 'BINANCE':
          return 'icon-bnb'
        case 'BITCOIN':
          return 'icon-btc'
        case 'ETHEREUM':
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
    getUnit(asset: string): string {
      switch (asset) {
        case 'BINANCE':
          return 'BNB'
        case 'BITCOIN':
          return 'BTC'
        case 'ETHEREUM':
          return 'ETH'
        case 'CLM':
          return 'CLM'
        case 'USDC':
          return 'USDC'
        case 'USDT':
          return 'USDT'

        default:
          return 'LYNK'
      }
    }
    getAssetTitle(asset: string): string {
      switch (asset) {
        case 'BINANCE':
          return 'Binance'
        case 'BITCOIN':
          return 'Bitcoin'
        case 'ETHEREUM':
          return 'Ethereum'
        case 'CLM':
          return 'Clm'
        case 'USDC':
          return 'Usdc'
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
