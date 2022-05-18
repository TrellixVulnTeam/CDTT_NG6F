<template>
  <div class="w-100 bg-white wallet-table">
    <div class="wallet-table__below">
      <div class="wrapper">
        <div v-for="dataCollection in data"
             :key="dataCollection.id"
             class="grid-data"
        >
          <card-collection :data="dataCollection" />
        </div>
      </div>
    </div>
    <base-pagination
        v-if="showPagination"
        :table="query"
        :info="paginationInfo"
        @sizeChange="handleSizeChange"
        @currentChange="handleCurrentChange"
        class="custom-pagination"
    />
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'
  import CardCollection from "@/modules/metamart/components/CardCollection.vue";
  import BasePagination from "@/components/base/pagination/BasePagination.vue";
  import {PaginationInterface} from "@/interface";
  @Component({
    components: {BasePagination, CardCollection}
  })
  export default class TabCollection extends Vue {
    //Props
    @Prop({ required: false, type: Boolean, default: true }) showPagination!: boolean
    @Prop({ required: false, type: String, default: '' }) paginationInfo!: string
    @Prop({ required: true, type: Array }) data!: Array<Record<string, any>>
    // @Prop({ required: false, type: Boolean, default: false }) isLoading!: boolean
    @Prop({
      required: false,
      type: Object,
      default: () => {
        return {}
      }
    })query!: PaginationInterface;

    // get getPaginationInfo(): any {
    //   return this.$t('paging.customers')
    // }
    handleSizeChange(value: number): void {
      this.query.limit = value
      this.query.page = 1
      this.$emit('sizeChange', value)
    }
    handleCurrentChange(value: number): void {
      this.query.page = value
      this.$emit('pageChange', value)
    }
  }
</script>

<style scoped lang="scss">

.wallet-table {
  //max-width: 1280px;
  margin: 0 auto;
  &__above {
    border-bottom: 1px solid var(--bc-border-primary);
    &-tabs {
      .tab-item {
        padding: 16px 12px;
        position: relative;
        &:hover {
          color: var(--bc-tab-active);
        }
      }
      .tab-active {
        color: var(--bc-tab-active);
        font-weight: 600;
        &::after {
          content: '';
          position: absolute;
          width: 100%;
          height: 2px;
          bottom: 0;
          left: 0;
          background-color: var(--bc-tab-active);
        }
      }
    }
  }

  &__below {
    max-width: 1280px;
    //display: grid;
    //grid-template-columns: repeat(auto-fit, minmax(261px, 1fr));
    //grid-column-gap: 20px;
    //grid-row-gap: 24px;
    display: flex;
    margin: 0 auto;
    padding: 0 24px;
    .wrapper{
      width: 1104px;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(261px, 1fr));
      grid-column-gap: 20px;
      grid-row-gap: 24px;
      //display: flex;
      //flex-wrap: wrap;
      //align-content: center;
      //justify-content: center;
      //flex-direction: row;
      //justify-items: center;
      //align-items: center;
      //padding: 0 24px;
      margin: 0 auto;
    }
    .grid-data{
      //margin: 10px;
    }
  }
  .custom-pagination{
    padding: 10px 0px;
    margin: 24px 24px 0px 24px;
    //margin-top: 24px;
  }
}
</style>
