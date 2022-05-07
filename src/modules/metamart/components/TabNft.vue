<template>
  <div style="width: 100%; background-color: #ffffff; text-align: center">
    <div class="container">
      <div v-for="nftItem in nftProps" :key="nftItem.collectionId" class="grid-data">
        <NftItem :nftProps="nftItem"  />
      </div>
    </div>

    <base-pagination v-if="showPagination" :table="query" :info="paginationInfo" @sizeChange="handleSizeChange" @currentChange="handleCurrentChange" class="custom-pagination" />
  </div>
</template>

<script lang="ts">
// import { IQuery } from '@/interface'
// import axios from 'axios'
import { Component, Prop, Vue } from 'vue-property-decorator'
import NftItem from '../components/NftItem.vue'
import BasePagination from '@/components/base/pagination/BasePagination.vue'
import { PaginationInterface } from '@/interface'

@Component({
  components: { BasePagination, NftItem }
})
export default class TabNFT extends Vue {
  @Prop({ required: false, type: Boolean, default: true }) showPagination!: boolean
  @Prop({ required: false, type: String, default: '' }) paginationInfo!: string
  @Prop({ required: true, type: Array }) nftProps!: Array<Record<string, any>>
  @Prop({
    required: false,
    type: Object,
    default: () => {
      return {}
    }
  })
  query!: PaginationInterface

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
.container {
  max-width: 1104px;
  display: flex;
  flex-wrap: wrap;
  /*width: 100%;*/
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


.grid-data {
  width: calc(25% - 15px);
  /*margin: 28px 20px 0 0;*/
}
.custom-pagination {
  padding: 10px 0px;
  margin:24px 24px 0 24px;
}
</style>
