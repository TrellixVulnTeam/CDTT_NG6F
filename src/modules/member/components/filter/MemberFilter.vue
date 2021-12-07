<template>
  <div class="pb-24 pt-24 be-flex align-center kyc-filter">
    <el-input v-model="filter.search" class="input-search" :placeholder="$t('placeholder.search')">
      <span slot="prefix" class="prefix-search">
        <base-icon icon="icon-search" size="24" />
      </span>
    </el-input>
    <div class="filter-item">
      <!-- <el-popover :value="isVisible" placement="bottom-start" width="518" trigger="click" popper-class="popper-filter" @show="handleShowPopper">
        <div class="content">
          <el-form>
            <div class="be-flex jc-space-between row">
              <el-form-item class="be-flex-item mr-40" :label="$t('label.nationality')">
                <el-select v-model="filter.nationality" filterable :placeholder="$t('label.placehoderNationality')" class="w-100" clearable>
                  <el-option v-for="(country, index) in listCountry" :key="index" :label="country.name" :value="country.name" />
                </el-select>
              </el-form-item>
              <el-form-item class="be-flex-item" :label="$t('label.kyc-status')">
                <el-select v-model="filter.type" id-type :placeholder="$t('label.placehoder-kyc-status')" class="w-100" clearable :disabled="isChangeTab">
                  <el-option v-for="(type, index) in identificationType" :key="index" :label="type.type" :value="type.value" />
                </el-select>
              </el-form-item>
            </div>
            <div class="be-flex jc-space-between row">
              <el-form-item class="be-flex-item mr-40" :label="$t('label.create-date')">
                <el-date-picker class="w-100" format="yyyy/MM/dd" value-format="yyyy-MM-dd" :placeholder="$t('label.from-date')" v-model="filter.fromCreatedAt" type="date">
                </el-date-picker>
              </el-form-item>

              <el-form-item class="be-flex-item hide-label" label="1">
                <el-date-picker class="w-100" format="yyyy/MM/dd" :placeholder="$t('label.to-date')" value-format="yyyy-MM-dd" v-model="filter.toCreatedAt" type="date">
                </el-date-picker>
              </el-form-item>
            </div>
          </el-form>
        </div>
        <div class="be-flex jc-flex-end footer">
          <el-button class="btn-default btn-400 btn-h-40 btn-close text-regular" @click="handleReset">
            {{ $t('button.reset') }}
          </el-button>
          <el-button class="btn-default-bg btn-400 btn-h-40 is-none-border h-40 text-regular" @click="handleApply">
            {{ $t('button.apply') }}
          </el-button>
        </div>
        <div slot="reference" class="cursor text-filter" style="font-size: 16px">
          <span class="abicon"> <base-icon style="color: #5b616e; margin-right: 10px" icon="icon-filter" size="18" /> </span>
          {{ $t('kyc.filter.filter') }}
        </div>
      </el-popover> -->
      <!-- <div class="cursor text-filter" style="font-size: 16px">
        <span class="abicon"> <base-icon style="color: #5b616e; margin-right: 10px" icon="icon-filter" size="18" /> </span>
        {{ $t('kyc.filter.filter') }}
      </div> -->
    </div>
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
