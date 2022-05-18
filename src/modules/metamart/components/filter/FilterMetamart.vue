<template>
  <div class="pb-24 pt-24 be-flex align-center kyc-filter">
    <el-input v-model="filter.search" class="input-search" :placeholder="$t('placeholder.search')">
      <span slot="prefix" class="prefix-search">
        <base-icon icon="icon-search" size="24" />
      </span>
    </el-input>
    <div class="filter-item">
      <el-popover >
        <div class="content">
          <el-form>
            <div class="be-flex-column jc-space-between">
              <el-form-item class="be-flex-item" :label="$t('label.category')">
                <el-select v-model="filter.category" id-type :placeholder="$t('label.placeholderCategory')" class="w-100" clearable :disabled="isChangeTab">
                  <el-option v-for="(category, index) in listCategory" :key="index" :label="category.name" :value="category.name" />
                </el-select>
              </el-form-item>
              <div class="be-flex jc-space-between">
                <el-form-item class="be-flex-item mr-40" :label="$t('label.create-date')">
                  <el-date-picker
                    class="w-100"
                    format="MM/dd/yyyy"
                    value-format="timestamp"
                    :placeholder="$t('label.from-date')"
                    v-model="filter.fromCreatedAt"
                    type="date"
                  >
                  </el-date-picker>
                </el-form-item>
                <el-form-item class="be-flex-item hide-label" label="1">
                  <el-date-picker
                      class="w-100"
                      format="MM/dd/yyyy"
                      value-format="timestamp"
                      :placeholder="$t('label.to-date')"
                      v-model="filter.toCreatedAt"
                      type="date"
                  >
                  </el-date-picker>
                </el-form-item>
              </div>
            </div>
          </el-form>
        </div>
        <div class="be-flex jc-flex-end footer">
          <el-button class="btn-default btn-400 btn-h-40 btn-close text-regular" >
            {{ $t('button.reset') }}
          </el-button>
          <el-button class="btn-default-bg btn-400 btn-h-40 is-none-border h-40 text-regular">
            {{ $t('button.apply') }}
          </el-button>
        </div>
        <div slot="reference" class="cursor text-filter" style="font-size: 16px">
          <span>
            <base-icon style="color: #5b616e; margin-right: 10px" icon="icon-filter" size="18"/>
          </span>
          {{ $t('kyc.filter.filter') }}
        </div>
<!--        -->
<!--        -->
<!--        SORT BY-->

      </el-popover>
    </div>
    <div>
      <el-dropdown class="sort" trigger="click" >
        <span class="sort-title" style="font-size: 16px">
          <base-icon icon="icon-sort" style="color: #5b616e; margin-right: 10px" size="18" class="icon"/> {{ $t('kyc.filter.sort') }}
        </span>
        <el-dropdown-menu class="header-downloadapp dropdown-sort" slot="dropdown">
          <el-dropdown-item v-for="(value, index) in sorts" :key="index" :class="sortActive === value.command ? 'active' : null" :command="value.command" :divided="value.divided">
            <span class="be-flex">
              <span class="be-flex-item">
                {{ value.label }}
              </span>
              <base-icon v-if="sortActive === value.command" icon="icon-tick-dropdown" size="16"/>
            </span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import BaseIcon from "@/components/base/icon/BaseIcon.vue";
  @Component({
    components: {BaseIcon}
  })
  export default class FilterMetamart extends Vue {
    filter= {
      search: '',
      category: '',
      fromCreatedAt: '',
      toCreatedAt: '',
      orderBy: 'desc'
    }
    sortActive = 1
    listCategory: Array<Record<any, any>> = [
      {
        id:0,
        name: 'Real Estate'
      },
      {
        id:1,
        name: 'Tourism'
      },
      {
        id:2,
        name: 'Entertainment'
      },
      {
        id:3,
        name: 'Gallery'
      }
    ]

    sorts: Array<Record<string, any>> = [
      {
        command: 1,
        label: this.$i18n.t('nft.sort.latest'),
        divided: false,
        i18n: 'nft.sort.latest'
      },
      {
        command: 2,
        label: this.$i18n.t('nft.sort.earliest'),
        divided: false,
        i18n: 'nft.sort.earliest'
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
}
</style>
