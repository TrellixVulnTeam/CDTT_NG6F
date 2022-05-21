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
  @Prop({required: false, type: Object, default: () => {return {}}})query!: PaginationInterface;

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
  &__below {
    max-width: 1200px;
    display: flex;
    margin: 0 auto;
    padding: 0 24px;
    .wrapper{
      width: 1104px;
      display: flex;
      flex-wrap: wrap;
      //display: grid;
      //grid-template-columns: repeat(auto-fit, minmax(261px, 1fr));
      //grid-column-gap: 20px;
      //grid-row-gap: 24px;
      margin: 0 auto;
      .grid-data {
        width: calc(25% - 15px);
        margin: 24px 20px 0 0;
      }
      .grid-data:nth-child(-n+4){
        margin-top: 0;
      }
      .grid-data:nth-child(4n){
        margin-right: 0;
      }

    }


  }
  .custom-pagination{
    padding: 10px 0;
    margin: 24px 24px 0 24px;
  }
}
</style>
