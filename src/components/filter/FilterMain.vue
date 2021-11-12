<template>
  <div class="be-flex mb-24 align-center kyc-filter filter">
    <el-input v-model="filter.search" class="input-search" :placeholder="$t('placeholder.search')">
      <span slot="prefix" class="prefix-search">
        <base-icon icon="icon-search" size="24" />
      </span>
    </el-input>
    <slot />
    <div>
      <el-dropdown class="sort" trigger="click" @command="handleSort">
        <span class="abicon sort-title" style="font-size: 16px">
          <base-icon icon="icon-sort" style="color: #5b616e; margin-right: 10px" size="18" class="icon" /> {{ $t('kyc.filter.sort') }}</span
        >
        <el-dropdown-menu class="header-downloadapp dropdown-sort" slot="dropdown">
          <el-dropdown-item v-for="(value, index) in sorts" :key="index" :class="sortActive === value.command ? 'active' : null" :command="value" :divided="value.divided">
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
  import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
  import debounce from 'lodash/debounce'
  import trim from 'lodash/trim'

  @Component
  export default class FilterMain extends Vue {
    @Prop({ required: false, type: Array, default: [] }) sorts!: Array<Record<string, any>>
    filter: Record<string, any> = {
      search: '',
      orderBy: ''
    }
    sortActive = 0

    @Watch('filter.search') handleSearch(value: string): void {
      this.searchText(value)
    }

    searchText = debounce((value: string) => {
      this.$emit('filter', {
        ...this.filter,
        page: 1,
        limit: 10,
        search: trim(value)
      })
    }, 500)

    handleSort(value: Record<string, any>): void {
      this.sortActive = value.command
      this.filter.orderBy = value.command
      this.$emit('filter', { ...this.filter })
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
