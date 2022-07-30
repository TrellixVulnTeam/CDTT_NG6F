<template>
  <div style="width: 100%; background-color: #ffffff; text-align: center">
    <div class="w-100 bg-white wallet-table">
      <div class="wallet-table__below">
        <div class="wrapper">
          <base-table
            :data="dataCollection"
            :showPagination="showPagination"
            :paginationInfo="paginationInfo"
            :table="query"
            @selectionChange="handleSelectionChange"
            @sizeChange="handleSizeChange"
            @currentChange="handleCurrentChange"
            class="collection-table"
          >
            <el-table-column label="#" type="index" align="center" width="40" />
            <el-table-column type="selection" :selectable="handleSelectable" align="center" width="40" />
            <el-table-column :label="$t('inventory.table.item')" align="left" min-width="347">
              <template slot-scope="scope">
                <div class="wrap-item">
                  <img :src="scope.row.nftImage" alt="" class="item-img" width="40px" height="40px" />
                  <div class="item-text">
                    <p class="item-text__name">{{ scope.row.nftName }}</p>
                    <p class="item-text__code">#{{ scope.row.nftId }}</p>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column :label="$t('metamart.table.category')" align="left" width="270">
              <template slot-scope="scope">
                <p>{{ scope.row.category }}</p>
              </template>
            </el-table-column>
            <el-table-column :label="$t('metamart.table.network')" align="left" width="130">
              <template slot-scope="scope">
                <div class="item-text">
                  <p class="item-text__name">{{ scope.row.networkName }}</p>
                  <p class="item-text__code">{{ scope.row.network }}</p>
                </div>
              </template>
            </el-table-column>
            <el-table-column :label="$t('inventory.table.status')" align="center" width="200">
              <template slot-scope="scope">
                <div v-if="scope.row.status === 'Off-chain'" class="box-status-table locked">
                  <span class="fs-12 fw-500">{{ scope.row.status }}</span>
                </div>
                <div v-else class="box-status-table">
                  <span class="fs-12 fw-500">{{ scope.row.status }}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column align="center" width="86">
              <template slot-scope="scope">
                <div class="action">
                  <span @click="handleEdit(scope.row)">
                    <base-icon icon="icon-edit" size="24" />
                  </span>
                  <el-dropdown trigger="click" @command="handleCommand">
                    <i class="el-icon-more" style="padding: 5px"></i>
                    <el-dropdown-menu class="dropdown-sort" slot="dropdown">
                      <el-dropdown-item>Update metadata</el-dropdown-item>
                      <el-dropdown-item>Off-chain</el-dropdown-item>
                      <el-dropdown-item command="delete-nft">Delete</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </div>
              </template>
            </el-table-column>
          </base-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import BasePagination from '@/components/base/pagination/BasePagination.vue'
  import { PaginationInterface } from '@/interface'

  @Component({
    components: { BasePagination }
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
    //fake data
    dataCollection = [
      {
        nftName: 'The Myth Virtual Tour #31',
        nftId: '113256',
        nftImage: 'http://loremflickr.com/640/480',
        category: 'Real Estate',
        networkName: 'Ethereum',
        network: 'ERC1155',
        status: 'On-chain'
      },
      {
        nftName: 'The Myth Virtual Tour #32',
        nftId: '113256',
        nftImage: 'http://loremflickr.com/640/480',
        category: 'Virtual Tourism',
        networkName: 'Ethereum',
        network: 'ERC1155',
        status: 'On-chain'
      },
      {
        nftName: 'The Myth Virtual Tour #33',
        nftId: '113256',
        nftImage: 'http://loremflickr.com/640/480',
        category: 'Family House',
        networkName: 'Ethereum',
        network: 'ERC1155',
        status: 'On-chain'
      },
      {
        nftName: 'The Myth Virtual Tour #34',
        nftId: '113256',
        nftImage: 'http://loremflickr.com/640/480',
        category: 'Real Estate',
        networkName: 'Ethereum',
        network: 'ERC1155',
        status: 'Off-chain'
      },
      {
        nftName: 'The Myth Virtual Tour #35',
        nftId: '113256',
        nftImage: 'http://loremflickr.com/640/480',
        category: 'Real Estate',
        networkName: 'Ethereum',
        network: 'ERC1155',
        status: 'Off-chain'
      },
      {
        nftName: 'The Myth Virtual Tour #36',
        nftId: '113256',
        nftImage: 'http://loremflickr.com/640/480',
        category: 'Real Estate',
        networkName: 'Ethereum',
        network: 'ERC1155',
        status: 'On-chain'
      },
      {
        nftName: 'The Myth Virtual Tour #37',
        nftId: '113256',
        nftImage: 'http://loremflickr.com/640/480',
        category: 'Real Estate',
        networkName: 'Ethereum',
        network: 'ERC1155',
        status: 'Off-chain'
      },
      {
        nftName: 'The Myth Virtual Tour #38',
        nftId: '113256',
        nftImage: 'http://loremflickr.com/640/480',
        category: 'Real Estate',
        networkName: 'Ethereum',
        network: 'ERC1155',
        status: 'On-chain'
      },
      {
        nftName: 'The Myth Virtual Tour #39',
        nftId: '113256',
        nftImage: 'http://loremflickr.com/640/480',
        category: 'Real Estate',
        networkName: 'Ethereum',
        network: 'ERC1155',
        status: 'Off-chain'
      },
      {
        nftName: 'The Myth Virtual Tour #38',
        nftId: '113256',
        nftImage: 'http://loremflickr.com/640/480',
        category: 'Real Estate',
        networkName: 'Ethereum',
        network: 'ERC1155',
        status: 'Off-chain'
      }
    ]
    handleSelectable(row: Record<string, any>) {
      if (row.status === 'On-chain') {
        return false
      } else {
        return true
      }
    }
    handleSelectionChange(value: Array<Record<string, any>>) {
      console.log('selected,', value)
      this.$emit('selectionChange', value)
    }
    handleSizeChange(value: number): void {
      this.query.limit = value
      this.query.page = 1
      this.$emit('sizeChange', value)
    }
    handleCurrentChange(value: number): void {
      this.query.page = value
      this.$emit('pageChange', value)
    }
    handleCommand(command: string): void {
      this.$emit('selectCommand', command)
    }
  }
</script>

<style scoped lang="scss">
  @mixin text($size, $height, $weight, $color) {
    font-size: $size;
    line-height: $height;
    font-weight: $weight;
    color: $color;
  }
  .wallet-table {
    &__below {
      padding: 0 24px;
      .wrapper {
        display: flex;
        flex-wrap: wrap;
        //display: grid;
        //grid-template-columns: repeat(auto-fit, minmax(261px, 1fr));
        //grid-column-gap: 20px;
        //grid-row-gap: 24px;
        .grid-data {
          width: calc(25% - 15px);
          margin: 24px 20px 0 0;
        }
        .grid-data:nth-child(-n + 4) {
          margin-top: 0;
        }
        .grid-data:nth-child(4n) {
          margin-right: 0;
        }
        .collection-table {
          .wrap-item {
            display: flex;
            align-items: center;
            gap: 8px;
            .item-img {
              border-radius: 4px;
            }
          }
          .item-text {
            &__name {
              @include text(16px, 24px, 400, #0a0b0d);
              display: -webkit-box;
              -webkit-line-clamp: 1;
              -webkit-box-orient: vertical;
              overflow: hidden;
              text-overflow: ellipsis;
            }
            &__code {
              @include text(14px, 20px, 400, #5b616e);
            }
          }
          .action {
            display: flex;
            justify-content: space-between;
          }
          .box-status-table {
            width: 80px;
            height: 24px;
            background: #e4f9e2;
            color: #129961;
            border-radius: 4px;
            margin: 0 auto;
          }
          .locked {
            background: #f3f2f1;
            color: #5b616e;
          }
        }
      }
    }
  }
  .custom-pagination {
    padding: 10px 0px;
    margin: 24px 24px 0 24px;
  }
</style>
