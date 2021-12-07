<template>
  <div class="pb-24 pt-24 be-flex align-center kyc-filter">
    <el-input v-model="filter.search" class="input-search" :placeholder="$t('placeholder.search')">
      <span slot="prefix" class="prefix-search">
        <base-icon icon="icon-search" size="24" />
      </span>
    </el-input>
    <div class="filter-item"></div>
    <div>
      <el-dropdown class="sort" trigger="click" @command="handleSort">
        <span class="abicon sort-title" style="font-size: 16px">
          <base-icon icon="icon-sort" style="color: #5b616e; margin-right: 10px" size="18" class="icon" /> {{ $t('kyc.filter.sort') }}</span
        >
        <el-dropdown-menu class="header-downloadapp dropdown-sort" slot="dropdown">
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
    <button type="button" class="btn-default-bg text-sm ml-auto add-member" @click="handleAddMember">
      <span>{{ $t('button.add-member') }}</span>
    </button>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
  import EventBus from '@/utils/eventBus'
  import { forEach, trim, debounce } from 'lodash'
  import getRepository from '@/services'
  import { KycRepository } from '@/services/repositories/kyc'

  const apiKyc: KycRepository = getRepository('kyc')

  import countryJson from '@/utils/country/index.json'

  interface IListCountry {
    name: string
    dialCode: string
    isoCode: string
    flag: string
  }

  @Component
  export default class KycFilter extends Vue {
    @Prop({ required: true }) isChangeTab!: boolean
    filter = {
      search: '',
      orderBy: 3
    }
    loading = false
    queryApprove = {
      page: 1,
      limit: 20,
      search: ''
    }

    sorts: Array<Record<string, any>> = [
      {
        command: 1,
        label: this.$i18n.t('member.sort.full-name'),
        divided: false,
        i18n: 'member.sort.full-name'
      },
      {
        command: 2,
        label: this.$i18n.t('member.sort.email'),
        divided: false,
        i18n: 'member.sort.email'
      },
      {
        command: 3,
        label: this.$i18n.t('member.sort.create-date'),
        divided: false,
        i18n: 'member.sort.create-date'
      }
      // {
      //   command: 4,
      //   label: this.$i18n.t('kyc.sort.transaction'),
      //   divided: false,
      //   i18n: 'kyc.sort.transaction'
      // }
    ]
    sortActive = 3
    listCountry: IListCountry[] = countryJson
    identificationType: Array<Record<string, any>> = [
      {
        id: 0,
        type: this.$i18n.t('kyc.filter.all-status'),
        value: ''
      },
      {
        id: 1,
        type: this.$i18n.t('kyc.filter.kyc-processing'),
        value: 'KYC'
      },
      {
        id: 2,
        type: this.$i18n.t('kyc.filter.not-verified'),
        value: 'NOT_VERIFIED'
      },
      {
        id: 3,
        type: this.$i18n.t('kyc.filter.verified'),
        value: 'VERIFIED'
      },
      {
        id: 4,
        type: this.$i18n.t('kyc.filter.locked'),
        value: 'LOCKED'
      }
    ]
    isVisible = false

    @Watch('filter.search') handleSearch(value: string): void {
      this.searchText(value)
    }

    searchText = debounce((value: string) => {
      this.$emit('filter', {
        ...this.filter,
        search: trim(value)
      })
    }, 500)

    created(): void {
      EventBus.$on('changeLang', () => {
        forEach(this.sorts, elm => {
          elm.label = this.$i18n.t(elm.i18n)
        })
        this.$forceUpdate()
      })
      EventBus.$on('changeTabMember', this.handleChangeTab)
      this.$emit('filter', this.filter)
    }

    destroyed(): void {
      EventBus.$off('changeLang')
      EventBus.$off('changeTab')
    }

    handleShowPopper(): void {
      this.isVisible = true
    }

    resetFilter(): void {
      this.filter = {
        search: '',
        orderBy: 3
      }
    }

    handleChangeTab(): void {
      this.sortActive = 3
      this.queryApprove = {
        page: 1,
        limit: 20,
        search: ''
      }

      if (this.filter.search) {
        this.resetFilter()
      } else {
        this.$emit('filter', {
          ...this.filter,
          orderBy: 3
        })
        this.filter = {
          ...this.filter,
          orderBy: 3
        }
      }
    }

    handleSort(command: number): void {
      this.sortActive = command
      this.filter.orderBy = command
      this.$emit('filter', this.filter)
    }

    handleApply(): void {
      this.$emit('filter', this.filter)
      this.isVisible = false
    }

    handleReset(): void {
      this.filter = {
        ...this.filter
      }
      this.$emit('filter', this.filter)
      this.isVisible = false
    }

    handleAddMember(): void {
      this.$emit('addMember')
    }
  }
</script>

<style scoped lang="scss">
  .kyc-filter {
    background-color: #fff;
    padding: 24px;

    .input-search {
      width: 400px;
      margin-right: 30px;
    }

    .sort {
      // margin-left: 30px;
      cursor: pointer;
      color: #0a0b0d;
    }

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

    .add-member {
      height: 40px;
      font-weight: 400;
      padding: 0 8px;
      &:hover {
        border: 1px solid transparent;
      }
    }
  }
</style>
