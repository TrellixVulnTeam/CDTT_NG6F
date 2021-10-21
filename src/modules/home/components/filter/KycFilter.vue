<template>
  <div class="pb-24 pt-24 be-flex align-center kyc-filter">
    <el-input v-model="search" class="input-search">
      <span slot="prefix" class="prefix-search">
        <base-icon icon="icon-search" size="24" />
      </span>
    </el-input>
    <div class="filter-item">
      <div class="cursor text-filter">
        <span class="abicon"> <base-icon icon="icon-filter" size="18" /> </span>
        Bộ lọc
      </div>
    </div>
    <div>
      <el-dropdown class="sort" trigger="click">
        <span class="abicon"> <base-icon icon="icon-sort" size="18" class="icon" /> Sắp xếp</span>
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

  @Component
  export default class KycFilter extends Vue {
    search = ''
    sorts: Array<Record<string, any>> = [
      {
        command: '1',
        label: 'Mã đơn vị kinh doanh',
        divided: false
      },
      {
        command: '6',
        label: 'Tổng phí',
        divided: false
      },
      {
        command: '5',
        label: 'Mã sản phẩm',
        divided: false
      }
    ]
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
  }
</style>
