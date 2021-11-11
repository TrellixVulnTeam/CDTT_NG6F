<template>
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
          <el-dropdown-item v-for="(value, index) in sorts" :key="index" :class="sortActive === value.command ? 'active' : null" :command="value.command" :divided="value.divided">
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
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'

  @Component
  export default class FilterTransaction extends Vue {
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
    }
  }
</script>

<style scoped lang="scss">
  .filter {
    .input-search {
      width: 400px;
      margin-right: 30px;
    }
    .sort {
      cursor: pointer;
      color: #0a0b0d;
    }
  }
</style>
