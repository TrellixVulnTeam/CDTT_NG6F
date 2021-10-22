<template>
  <div class="pb-24 pt-24 be-flex align-center kyc-filter">
    <el-input v-model="search" class="input-search" :placeholder="$t('placeholder.search')">
      <span slot="prefix" class="prefix-search">
        <base-icon icon="icon-search" size="24" />
      </span>
    </el-input>
    <div class="filter-item">
      <div class="cursor text-filter">
        <span class="abicon"> <base-icon style="color: #5b616e; margin-right: 10px" icon="icon-filter" size="18" /> </span>
        {{ $t('kyc.filter.filter') }}
      </div>
    </div>
    <div>
      <el-dropdown class="sort" trigger="click">
        <span class="abicon"> <base-icon icon="icon-sort" style="color: #5b616e; margin-right: 10px" size="18" class="icon" /> {{ $t('kyc.filter.sort') }}</span>
        <el-dropdown-menu class="header-downloadapp" slot="dropdown">
          <el-dropdown-item v-for="(value, index) in sorts" :key="index" :class="value.active ? 'active' : null" :command="value.command" :divided="value.divided">
            <span class="be-flex">
              <span class="be-flex-item">
                {{ value.label }}
              </span>
            </span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import EventBus from '@/utils/eventBus'
  import { forEach } from 'lodash'

  @Component
  export default class KycFilter extends Vue {
    search = ''
    sorts: Array<Record<string, any>> = [
      {
        command: '1',
        label: this.$i18n.t('kyc.sort.date'),
        divided: false,
        i18n: 'kyc.sort.date'
      },
      {
        command: '6',
        label: this.$i18n.t('kyc.sort.country'),
        divided: false,
        i18n: 'kyc.sort.country'
      }
    ]
    created(): void {
      EventBus.$on('changeLang', () => {
        console.log('a', window.localStorage.getItem('bc-lang'))
        forEach(this.sorts, elm => {
          elm.label = this.$i18n.t(elm.i18n)
        })
        this.$forceUpdate()
      })
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
    }
  }
</style>
