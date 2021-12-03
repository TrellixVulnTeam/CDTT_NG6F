<template>
  <div class="be-flex align-center kyc-filter filter" :class="type === 'customer' ? 'mb-24' : ''">
    <el-input v-model="filter.search" class="input-search" :placeholder="$t('placeholder.search')">
      <span slot="prefix" class="prefix-search">
        <base-icon icon="icon-search" size="24" />
      </span>
    </el-input>
    <div class="cursor text-filter" style="font-size: 16px" @click="handleOpenPopupFilter">
      <span class="abicon"> <base-icon style="color: #5b616e; margin-right: 4px" icon="icon-filter" size="18" /> </span>
      {{ $t('kyc.filter.filter') }}
    </div>
    <div>
      <el-dropdown class="sort" trigger="click" @command="handleSort">
        <span class="abicon sort-title" style="font-size: 16px">
          <base-icon icon="icon-sort" style="color: #5b616e; margin-right: 4px" size="18" class="icon" /> {{ $t('kyc.filter.sort') }}</span
        >
        <el-dropdown-menu class="header-downloadapp dropdown-sort" style="width: 230px" slot="dropdown">
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
  import PopupMixin from '@/mixins/popup'
  import { Component, Mixins, Prop, Watch } from 'vue-property-decorator'
  import debounce from 'lodash/debounce'
  import trim from 'lodash/trim'

  @Component
  export default class FilterTransaction extends Mixins(PopupMixin) {
    @Prop({ required: true, type: String, default: 'customer' }) type!: string
    filter: Record<string, any> = {}
    sorts: Array<Record<string, any>> = [
      {
        command: 1,
        label: this.$i18n.t('customer.sort.trans-date')
      },
      {
        command: 2,
        label: this.$i18n.t('customer.sort.trans-amount')
      },
      {
        command: 3,
        label: this.$i18n.t('customer.sort.status')
      }
    ]
    sortActive = 0

    @Watch('filter.search') handleSearch(value: string): void {
      this.searchText(value)
    }

    searchText = debounce((value: string) => {
      if (this.type === 'customer') {
        this.$emit('filter', {
          ...this.filter,
          page: 1,
          limit: 10,
          search: trim(value)
        })
      } else {
        this.$emit('filter', {
          ...this.filter,
          page: 1,
          limit: 10,
          search: null,
          keywordString: trim(value)
        })
      }
    }, 500)
    public handleReset() {
      this.filter = {}
    }
    handleSort(command: number): void {
      this.sortActive = command
      this.$emit('filter', { orderBy: this.sortActive })
    }

    handleOpenPopupFilter(): void {
      this.setOpenPopup({
        popupName: 'popup-filter-transaction',
        isOpen: true
      })
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
      margin-left: 30px;
      cursor: pointer;
      color: #0a0b0d;
    }
  }
  .kyc-filter {
    ::v-deep .filter-item {
      &:hover {
        .text-filter {
          color: var(--bc-theme-primary);
          .span-icon {
            color: var(--bc-theme-primary) !important;
          }
        }
      }
    }
    ::v-deep .sort {
      &:hover {
        .el-dropdown-selfdefine {
          color: var(--bc-theme-primary);
          .span-icon {
            color: var(--bc-theme-primary) !important;
          }
        }
      }
      .sort-title {
        &:focus {
          color: var(--bc-theme-primary);
          .span-icon {
            color: var(--bc-theme-primary) !important;
          }
        }
      }
    }
    .text-filter {
      &:hover {
        color: var(--bc-theme-primary);
        .span-icon {
          color: var(--bc-theme-primary) !important;
        }
      }
    }
  }
</style>
