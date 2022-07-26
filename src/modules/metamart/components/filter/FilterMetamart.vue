<template>
  <div class="pb-24 pt-24 be-flex align-center kyc-filter">
    <el-input v-model="filter.value.search" class="input-search" :placeholder="$t('placeholder.search')">
      <span slot="prefix" class="prefix-search">
        <base-icon icon="icon-search" size="24" />
      </span>
    </el-input>
    <div class="filter-item">
      <!-- <el-popover :value="isVisible" placement="bottom-start" width="568" trigger="click" popper-class="popper-filter-nft">
        <div class="content">
          <el-form>
            <div class="be-flex-column jc-space-between">
              <el-form-item class="be-flex-item" :label="$t('nft.filter.category')">
                <el-select v-model="filter.value.category" id-type :placeholder="$t('nft.filter.placeholderCategory')" class="w-100" clearable >
                  <el-option v-for="(category, index) in listCategory" :key="index" :label="category.name" :value="category.name" />
                </el-select>
              </el-form-item>
              <div v-if="this.$route.name === 'Nft'">
                <el-form-item class="be-flex-item" :label="$t('nft.filter.saleType')">
                  <el-select v-model="filter.value.saleType" id-type :placeholder="$t('nft.filter.placeholderSaleType')" class="w-100" clearable >
                    <el-option v-for="(saleType, index) in listSaleType" :key="index" :label="saleType.name" :value="saleType.name" />
                  </el-select>
                </el-form-item>
              </div>
              <div class="be-flex jc-space-between align-center row box">
                <el-form-item :label="$t('label.create-date')">
                  <el-date-picker
                      class="box-input-created-date"
                      format="MM/dd/yyyy"
                      value-format="timestamp"
                      :placeholder="$t('label.from-date')"
                      v-model="filter.value.fromCreatedAt"
                      type="date"
                      clearable
                  >
                  </el-date-picker>
                </el-form-item>
                <div class="line"></div>
                <el-form-item class="hide-label" label="1">
                  <el-date-picker
                      class="box-input-created-date"
                      format="MM/dd/yyyy"
                      value-format="timestamp"
                      :placeholder="$t('label.to-date')"
                      v-model="filter.value.toCreatedAt"
                      type="date"
                      clearable
                  >
                  </el-date-picker>
                </el-form-item>
              </div>
              <div
                  class="be-flex jc-space-between align-center row box"
                  v-if="this.$route.name === 'Nft'"
              >
                <el-form-item :label="$t('nft.filter.priceRange')">
                  <div>
                    <el-input v-model="filter.value.fromPrice" size="24" type="number" clearable class="box-input-price">
                      <div class="prefix" slot="prefix" style="margin: 3px 0 0 5px">$</div>
                    </el-input>
                  </div>
                </el-form-item>
                <div class="line"></div>
                <el-form-item class="hide-label" label="1">
                  <div>
                    <el-input v-model="filter.value.toPrice" size="24" type="number" clearable class="box-input-price">
                      <div class="prefix" slot="prefix" style="margin: 3px 0 0 5px">$</div>
                    </el-input>
                  </div>
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
      </el-popover> -->
      <div slot="reference" class="cursor text-filter" style="font-size: 16px" @click="handleOpen">
        <span>
          <base-icon style="color: #5b616e; margin-right: 10px" icon="icon-filter" size="18"/>
        </span>
        {{ $t('kyc.filter.filter') }}
      </div>
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
    <el-button v-if="this.$route.name === 'Collection'" class="add-btn" @click="$emit('click','popup-create-collection')">Add New</el-button>
    <popup-filter-collection />
  </div>
</template>

<script lang="ts">
import {Component, Mixins, Prop, Vue} from 'vue-property-decorator'
import BaseIcon from "@/components/base/icon/BaseIcon.vue";
import PopupMixin from '@/mixins/popup';
import PopupFilterCollection from '../popup/PopupFilterCollection.vue'

@Component({
  components: {BaseIcon, PopupFilterCollection}
})
export default class FilterMetamart extends Mixins(PopupMixin) {
  // @Prop({ required: true }) isChangeTab!: boolean
  filter= {
    value: {
      search: '',
      category: '',
      saleType: '',
      fromCreatedAt: '',
      toCreatedAt: '',
      fromPrice: '',
      toPrice: ''
    },
    // isShow: {
    //   saleType: false,
    //   fromPrice: false,
    //   toPrice: false
    // }
  }

  isVisible = false;
  sortActive = 'LATEST'
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
  listSaleType: Array<Record<any, any>> = [
    {
      id:0,
      name: 'Buy now'
    },
    {
      id:1,
      name: 'Bid now'
    },
  ]

  sorts: Array<Record<string, any>> = [
    {
      command: 'LATEST',
      label: this.$i18n.t('nft.sort.latest'),
      divided: false,
      i18n: 'nft.sort.latest'
    },
    {
      command: 'EARLIEST',
      label: this.$i18n.t('nft.sort.earliest'),
      divided: false,
      i18n: 'nft.sort.earliest'
    },
    {
      command: 'Price: High to low',
      label: this.$i18n.t('nft.sort.price-highToLow'),
      divided: false,
      i18n: 'nft.sort.price-highToLow'
    },
    {
      command: 'Price: Low to high',
      label: this.$i18n.t('nft.sort.price-lowToHigh'),
      divided: false,
      i18n: 'nft.sort.price-lowToHigh'
    }
  ]
  handleOpen():void {
    let filterName = ''
    switch (this.$route.name) {
      case 'Collection':
        filterName = 'popup-filter-collection'
        break;
      case 'Nft':
        filterName = 'popup-filter-nft'
        break;
      default:
        break;
    }
    console.log(filterName);
    this.setOpenPopup({
      popupName: filterName,
      isOpen: true
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
  .add-btn {
    margin: 0px 24px 0px auto;
    color: var(--bc-color-white);
    background-color: var(--bc-theme-primary);
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
