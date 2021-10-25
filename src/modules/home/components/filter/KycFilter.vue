<template>
  <div class="pb-24 pt-24 be-flex align-center kyc-filter">
    <el-input v-model="filter.search" class="input-search" :placeholder="$t('placeholder.search')">
      <span slot="prefix" class="prefix-search">
        <base-icon icon="icon-search" size="24" />
      </span>
    </el-input>
    <div class="filter-item">
      <el-popover :value="isVisible" placement="bottom-start" width="518" trigger="click" popper-class="popper-filter" @show="isVisible = true">
        <div class="content">
          <el-form>
            <div class="be-flex jc-space-between row">
              <el-form-item class="be-flex-item mr-40" :label="$t('label.keyword')">
                <el-input v-model="filter.keyword" clearable />
              </el-form-item>
              <el-form-item class="be-flex-item" :label="$t('label.from-date')">
                <el-date-picker class="w-100" v-model="filter.fromDate" type="date"> </el-date-picker>
              </el-form-item>
            </div>
            <div class="be-flex jc-space-between row">
              <el-form-item class="be-flex-item mr-40" :label="$t('label.nationality')">
                <el-select v-model="filter.nationality" placeholder="" class="w-100" clearable>
                  <el-option v-for="(country, index) in listCountry" :key="index" :label="country.name" :value="country.isoCode" />
                </el-select>
              </el-form-item>
              <el-form-item class="be-flex-item" :label="$t('label.to-date')">
                <el-date-picker class="w-100" v-model="filter.toDate" type="date"> </el-date-picker>
              </el-form-item>
            </div>
            <div class="be-flex jc-space-between row">
              <el-form-item class="be-flex-item mr-40" :label="$t('label.id-type')">
                <el-select v-model="filter.idType" placeholder="" class="w-100" clearable>
                  <el-option v-for="(type, index) in idType" :key="index" :label="type.type" :value="type.type" />
                </el-select>
              </el-form-item>
              <el-form-item class="be-flex-item" :label="$t('label.approve-by')">
                <el-input v-model="filter.approveBy" clearable />
              </el-form-item>
            </div>
          </el-form>
        </div>
        <div class="be-flex jc-flex-end footer">
          <el-button class="btn-default btn-400 btn-h-40 btn-close text-regular" @click="handleReset">{{ $t('button.reset') }}</el-button>
          <el-button class="btn-default-bg btn-400 btn-h-40 is-none-border h-40 text-regular" @click="handleApply">{{ $t('button.apply') }}</el-button>
        </div>
        <div slot="reference" class="cursor text-filter" style="font-size: 16px">
          <span class="abicon"> <base-icon style="color: #5b616e; margin-right: 10px" icon="icon-filter" size="18" /> </span>
          {{ $t('kyc.filter.filter') }}
        </div>
      </el-popover>
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
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Watch } from 'vue-property-decorator'
  import EventBus from '@/utils/eventBus'
  import { forEach, trim, debounce } from 'lodash'
  import countryJson from '@/utils/country/index.json'
  interface IListCountry {
    name: string
    dialCode: string
    isoCode: string
    flag: string
  }
  @Component
  export default class KycFilter extends Vue {
    filter = {
      search: '',
      orderBy: 'CREATED_AT',
      keyword: '',
      fromDate: '',
      toDate: '',
      nationality: '',
      idType: '',
      approveBy: ''
    }
    sorts: Array<Record<string, any>> = [
      {
        command: 'CREATED_AT',
        label: this.$i18n.t('kyc.sort.date'),
        divided: false,
        i18n: 'kyc.sort.date'
      },
      {
        command: 'nationality',
        label: this.$i18n.t('kyc.sort.country'),
        divided: false,
        i18n: 'kyc.sort.country'
      }
    ]
    sortActive = 'CREATED_AT'
    listCountry: IListCountry[] = countryJson
    idType: Array<Record<string, any>> = [
      {
        id: 0,
        type: 'Id Card'
      },
      {
        id: 1,
        type: 'Passport'
      },
      {
        id: 2,
        type: 'Driver’s License'
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
        console.log('a', window.localStorage.getItem('bc-lang'))
        forEach(this.sorts, elm => {
          elm.label = this.$i18n.t(elm.i18n)
        })
        this.$forceUpdate()
      })
      EventBus.$on('changeTab', this.handleChangeTab)
      this.$emit('filter', this.filter)
    }
    destroyed(): void {
      EventBus.$off('changeLang')
      EventBus.$off('changeTab')
    }

    resetFilter(): void {
      this.filter = {
        search: '',
        orderBy: 'CREATED_AT',
        keyword: '',
        fromDate: '',
        toDate: '',
        nationality: '',
        idType: '',
        approveBy: ''
      }
    }

    handleChangeTab(): void {
      if (this.filter.search) {
        this.resetFilter()
      } else {
        this.$emit('filter', { ...this.filter, orderBy: 'CREATED_AT', keyword: '', fromDate: '', toDate: '', nationality: '', idType: '', approveBy: '' })
      }
    }

    handleSort(command: string): void {
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
        ...this.filter,
        keyword: '',
        fromDate: '',
        toDate: '',
        nationality: '',
        idType: '',
        approveBy: ''
      }
      this.$emit('filter', this.filter)
      this.isVisible = false
    }
  }
</script>

<style scoped lang="scss">
  .kyc-filter {
    background-color: #fff;
    .input-search {
      width: 400px;
      margin-right: 30px;
    }
    .sort {
      margin-left: 30px;
      cursor: pointer;
      color: #0a0b0d;
    }
    ::v-deep .filter-item {
      &:hover {
        .text-filter {
          color: #0151fc;
          .span-icon {
            color: #0151fc !important;
          }
        }
      }
    }
    ::v-deep .sort {
      &:hover {
        .el-dropdown-selfdefine {
          color: #0151fc;
          .span-icon {
            color: #0151fc !important;
          }
        }
      }
      .sort-title {
        &:focus {
          color: #0151fc;
          .span-icon {
            color: #0151fc !important;
          }
        }
      }
    }
  }
</style>
