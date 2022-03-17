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
    <div v-if="type !== 'addresses'">
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
    <button v-if="showBtn" type="button" class="btn-default-bg text-sm ml-auto add-member" @click="handleClickButton('popup-add-deposit')">
      <span>{{ $t('button.add-deposit') }}</span>
    </button>
    <button v-if="showBtnCrowdsale" type="button" class="btn-default-bg text-sm ml-auto add-member" @click="handleClickButton('popup-add-crowdsale')">
      <span>{{ $t('button.add-crowdsale') }}</span>
    </button>
    <button v-if="showBtnTransfer" type="button" class="btn-default-bg text-sm ml-auto add-member" @click="handleClickButton('popup-add-transfer')">
      <span>{{ $t('button.add-transfer') }}</span>
    </button>
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
    @Prop({ required: true, type: Boolean, default: false }) showBtn!: boolean
    @Prop({ required: true, type: Boolean, default: false }) showBtnCrowdsale!: boolean
    @Prop({ required: true, type: Boolean, default: false }) showBtnTransfer!: boolean
    filter: Record<string, any> = {
      search: '',
      keywordString: '',
      orderBy: 0
    }
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
      if (this.type === 'customer' || this.type === 'addresses') {
        this.$emit('filter', {
          ...this.filter,
          page: 1,
          limit: 10,
          search: trim(value),
          keywordString: null
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
      this.filter.search = ''
      this.filter.keywordString = ''
      this.filter.orderBy = 1
      this.sortActive = 0
    }
    handleSort(command: number): void {
      this.sortActive = command
      this.$emit('filter', { orderBy: this.sortActive })
    }

    handleOpenPopupFilter(): void {
      if (this.type === 'addresses') {
        this.setOpenPopup({
          popupName: 'popup-filter-addresses',
          isOpen: true
        })
      } else {
        this.setOpenPopup({
          popupName: 'popup-filter-transaction',
          isOpen: true
        })
      }
    }
    handleClickButton(popupName: string): void {
      this.$emit('clickButton', popupName)
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
  .add-member {
    height: 40px;
    font-weight: 400;
    padding: 0 8px;
    margin-right: 24px;
    &:hover {
      border: 1px solid transparent;
    }
  }
</style>
