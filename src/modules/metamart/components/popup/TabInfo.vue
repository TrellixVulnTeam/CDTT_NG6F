<template>
  <div class="tab-info">
    <div class="be-scroll-custom list-item">
      <div class="be-flex">
        <div v-for="tab in metaTypes" :key="tab.metaTypesId" class="item" :class="tabActive === tab.metaTypes ? 'active' : null" @click="handleChangeTab(tab)">
          {{ tab.metaType }}
        </div>
      </div>
    </div>

    <div class="content-about" v-if="tabActive === 'INFO'">
      <div class="content-about1" v-if="coinMain === 'CLM'">
        <div class="content-about1-title">Total supply</div>
        <div class="cursor text-gray1">{{ nftItem.totalSupply | formatNumber }} tokens</div>
      </div>
      <div class="content-about1" v-if="coinMain === 'CLM'">
        <div class="content-about1-title">Circulating supply</div>
        <div class="content-about1-code text-gray1">{{ nftItem.circulatingSupply | formatNumber }} ({{ totalCirculating }}% of total supply)</div>
      </div>
      <div class="content-about1">
        <div class="content-about1-title">{{ $t('label_contract-address') }}</div>
        <div class="text-hyperlink cursor" @click="handleOpenTab">{{ nftItem.contractAddress | formatTransactionCode }}</div>
      </div>
      <div class="content-about1">
        <div class="content-about1-title">{{ $t('label_token-id') }}</div>
        <div class="content-about1-code text-gray1">{{ nftItem.itemCode }}</div>
      </div>
      <div class="content-about1">
        <div class="content-about1-title">{{ $t('label_token-standard') }}</div>
        <div class="content-about1-code text-gray1">{{ nftItem.network }}</div>
      </div>
      <div class="content-about1">
        <div class="content-about1-title">{{ $t('label_blockchain') }}</div>
        <div class="content-about1-code text-gray1">{{ nftItem.networkName }}</div>
      </div>
    </div>
    <div class="content-about popup-tour-details" v-else-if="tabActive === 'DETAILS'">
      <div class="content-about1 content color-primary">
        <div id="text-detail" class="content-header body-base text-regular">{{ nftItem.shortDescription }}</div>
      </div>
    </div>

    <div class="content-about popup-tour-details" v-else-if="tabActive === 'POLICIES'">
      <div class="content-about1">
        <!-- <div class="content-about1-title">{{ $t('label_project')}}</div>
        <div class="content-about1-code text-gray1">{{ nftItem.project }}</div> -->
      </div>
      <!-- <div class="tour-details text-hyperlink cursor" @click="handleTourDetail">
        {{ $t('detail-nft.header.tour-details') }}
      </div> -->
    </div>

    <div class="content-about popup-tour-details" v-else-if="tabActive === 'DESCRIPTION' && tabDisplayActive === 'FIXED'">
      <div class="content-about1 content color-primary">
        <div id="text-description" class="content-header body-base text-regular" v-html="textTour">description</div>
      </div>
    </div>

    <div class="content-about" v-else-if="tabActive === 'PERFORMANCE'">
      <div class="content-about1">
        <div class="content-about1-title">Targeted Investor IRR</div>
        <div class="cursor text-gray1">{{ nftItem.irr == null ? '0' : nftItem.irr }}%</div>
      </div>
      <div class="content-about1">
        <div class="content-about1-title">Total Invested</div>
        <div class="content-about1-code text-gray1">${{ nftItem.totalVolume | convertAmountDecimal('USD') }} (avg ${{ nftItem.totalTrade | convertAmountDecimal('USD') }})</div>
      </div>
      <div class="content-about1">
        <div class="content-about1-title">Transaction Volume</div>
        <div class="content-about1-code text-gray1">${{ nftItem.totalVolume | convertAmountDecimal('USD') }}</div>
      </div>
      <div class="content-about1">
        <div class="content-about1-title">Tokens for sale</div>
        <div class="content-about1-code text-gray1">{{ nftItem.totalListing | formatNumber }} ({{ nftItem.totalListing }}% of total supply)</div>
      </div>
      <div class="content-about1">
        <div class="content-about1-title">Asking price</div>
        <div class="content-about1-code" style="max-width: 272px">
          <div class="asking-price-title">
            <div class="price-min title-one text-gray1">Min ${{ nftItem.floorPrice | convertAmountDecimal('USD') }}</div>
            <div class="price-avg title-one text-gray1">Avg ${{ nftItem.averagePrice | convertAmountDecimal('USD') }}</div>
            <div class="price-max title-one text-gray1">Max ${{ nftItem.highestPrice | convertAmountDecimal('USD') }}</div>
          </div>
          <div class="asking-price-line"></div>
        </div>
      </div>
    </div>

    <div v-else class="content-about">
      <div class="wrap" v-if="metaValueType === 'FILE'">
        <div class="content-title text-l text-bold"></div>
        <div class="content-attachment">
          <div class="be-flex" v-for="(item, index) in arrMeta" :key="index">
            <!-- <base-icon :icon="item.metaIcon" size="40" /> -->
            <img :src="item.metaIcon" alt="" />
            <div class="info">
              <div class="header-6 text-semibold title text-overflow-1">{{ item.metaName }}</div>
              <div class="be-flex align-center">
                <span class="body-small text-medium data">{{ item.metaDescription }}</span>
                <span class="dot"></span>
                <div class="be-flex align-center download" @click="handleDownload(item.metaValue)">
                  <base-icon icon="icon-download" size="20" class="lh-default icon-download" />
                  <span class="body-small text-medium">{{ $t('market-detail.download') }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="wrap wrap-map" v-if="metaValueType === 'MAP'">
        <div class="sack-map" v-for="(item, index) in arrMeta" :key="index">
          <div class="sack-map-content">
            <div class="sack-map-title">{{ item.metaName }}</div>
            <div class="sack-map-code text-desc">{{ item.metaValue }}</div>
          </div>
          <div class="sack-map-desc" v-if="item.metaDescription">({{ item.metaDescription }})</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import filter from 'lodash/filter'
  import { Component, Prop, Mixins } from 'vue-property-decorator'
  import PopupMixin from '@/mixins/popup'

  import { namespace } from 'vuex-class'

  const beBase = namespace('beBase')

  @Component({ components: {} })
  export default class TabInfo extends Mixins(PopupMixin) {
    @beBase.State('coinMain') coinMain!: string
    @Prop({ required: false, type: Object, default: () => ({}) }) nftItem!: Record<string, any>
    @Prop({ required: true, type: Array, default: () => [] }) policies!: Array<Record<string, any>>

    @Prop({ required: false, type: Array, default: () => [] }) metaDatas!: Array<Record<string, any>>
    @Prop({ required: false, type: Array, default: () => [] }) metaTypes!: Array<Record<string, any>>

    tabActive = 'INFO'
    tabDisplayActive = 'FIXED'
    metaValueType = 'TEXT'
    arrMeta: Array<Record<string, any>> = []

    // created(): void {
    //   try {
    //     const language = window.localStorage.getItem('bc-lang')!
    //     this.arrMeta = filter(this.metaDatas, elm => elm.metaTypes === this.tabActive)
    //     this.metaDatas.forEach(ele => {
    //       if (ele.metaTypes === 'TOUR_SCHEDULE') {
    //         this.textTour = JSON.parse(ele.metaValue)[language].replace(/\\n/g, '<br>')
    //       } else if (ele.metaTypes === 'DESCRIPTION') {
    //         this.textDescription = JSON.parse(ele.metaValue)[language].replace(/\\n/g, '<br>')
    //       } else if (ele.metaTypes === 'DETAIL') {
    //         this.textDetail = JSON.parse(ele.metaValue)[language].replace(/\\n/g, '<br>')
    //       }
    //     })
    //   } catch (error) {
    //     console.log(error)
    //   }
    // }

    // typeName(metaTypesName: string): string {
    //   const language = window.localStorage.getItem('bc-lang')!
    //   return JSON.parse(metaTypesName)[language].replace(/\\n/g, '<br>')
    // }

    get totalCirculating(): number {
      return this.nftItem.circulatingSupply ? (this.nftItem.totalSupply / this.nftItem.circulatingSupply) * 100 : 0
    }

    get textTour(): string {
      const language = window.localStorage.getItem('bc-lang')!
      if (this.arrMeta.length) {
        const objDesc = JSON.parse(this.arrMeta[0].metaValue)
        return objDesc[language].replace(/\\n/g, '<br>')
      }
      return ''

      // const tour = filter(this.metaDatas, elm => elm.metaTypes === 'TOUR_SCHEDULE')
      // if (tour.length) {
      //   const objDesc = JSON.parse(tour[0].metaDescription)
      //   return objDesc[language].replace(/\\n/g, '<br>')
      // }
      // return ''
    }

    handleChangeTab(tab: Record<string, any>): void {
      const tabName = tab.metaTypes
      const tabDisplayType = tab.displayType
      this.tabActive = tab.metaTypes
      this.tabDisplayActive = tab.displayType
      if (tabDisplayType === 'FIXED') {
        this.arrMeta = filter(this.metaDatas, elm => elm.metaTypes === tabName)
        if (this.arrMeta.length) {
          this.metaValueType = this.arrMeta[0].metaValueType
        }
      } else {
        const metaTypes = filter(this.metaTypes, elm => elm.metaTypes === tabName)
        const metaTypesName = metaTypes[0].metaTypesName
        const meta = filter(this.metaDatas, elm => elm.metaTypes === tabName)
        meta[0]['metaTypesName'] = metaTypesName
        if (tabName === 'POLICY') {
          this.$emit('changeTabPolicy', meta)
        } else {
          this.$emit('changeTab', meta)
        }
      }

      this.$forceUpdate()
    }

    handleOpenTab(): void {
      const currency = this.nftItem.currency
      const path = currency === 'BNB' || currency === 'BUSD' ? process.env.VUE_APP_URL_SCAN_ADDRESS_BNB : process.env.VUE_APP_URL_SCAN_ADDRESS_ETH
      window.open(`${path}${this.nftItem.contractAddress}`, '_blank')
    }

    handleTourDetail(): void {
      this.$emit('changeTab', this.arrMeta)
    }

    handleDownload(url: string): void {
      const a = document.createElement('a')
      a.style.display = 'none'
      a.href = url
      a.target = '_blank'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    }
  }
</script>

<style scoped lang="scss">
  ::v-deep.tab-info {
    .list-item {
      list-style: none;
      display: flex;
      border-bottom: 1px solid #dbdbdb;
      margin-top: 16px;
      overflow: auto;
      padding-left: 8px;
      &:hover {
        ::-webkit-scrollbar {
          height: 4px;
        }
      }

      &::-webkit-scrollbar-thumb {
        background: rgb(22 22 26 / 27%);
      }
      &::-webkit-scrollbar {
        height: 4px;
      }

      .item {
        padding: 15px 12px;
        font-size: 16px;
        line-height: 24px;
        font-weight: 400;
        color: #5b616e;
        cursor: pointer;
        position: relative;
        width: max-content;
        &:hover {
          background: var(--bc-menu-active);
          //   -webkit-background-clip: text;
          //   -webkit-text-fill-color: none;
        }
      }
      .item.active {
        // border-image-source: linear-gradient(52.87deg, #9d3ef2 40.29%, #3036f4 97.93%);
        // border-bottom: 1px solid;
        // border-image-slice: 1;
        // border-width: 2px;
        // background: linear-gradient(52.87deg, #9d3ef2 40.29%, #3036f4 97.93%);
        // -webkit-background-clip: text;
        // -webkit-text-fill-color: transparent;
        background: var(--bc-menu-active);
        // -webkit-background-clip: text;
        // -webkit-text-fill-color: transparent;
        color: #0151fc;
        font-weight: 600;
        &::before {
          content: '';
          position: absolute;
          width: 100%;
          height: 2px;
          bottom: 0;
          left: 0;
          background: var(--bc-tab-active);
        }
      }
    }
    .content-about {
      display: block;
      padding: 20px;
      padding-top: 0px;
      &::-webkit-scrollbar {
        width: 3px;
      }

      &::-webkit-scrollbar-thumb {
        background: #dbdbdb;
      }
      &::-webkit-scrollbar-track {
        max-height: 30px;
        height: 8px;
      }
    }
    .content-attachment {
      img {
        width: 36.2px;
        height: 48px;
      }
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 20px;
      .info {
        .icon-download {
          margin-right: 2px;
        }
        .header-6 {
          width: 160px;
          padding-bottom: 4px;
        }
        padding-top: 5px;
        margin-left: 16px;
        .data {
          color: #5b616e;
        }
      }
      .dot {
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background: #c4c4c4;
        margin: 0 8px;
      }
      .download {
        cursor: pointer;
        span {
          color: var(--bc-text-hyperlink);
        }
      }
    }
    .content-about {
      // height: 205px;
      // overflow-y: auto;
      // border-bottom: 1px solid #dbdbdb;
      // padding-right: 10px;
      .content-title {
        padding-top: 20px;
      }
      .content-about12 {
        .content-about1-title1 {
          display: flex;
          flex-direction: column;
          &-sup {
            color: #89909e;
          }
        }
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        font-size: 16px;
        line-height: 24px;
        font-weight: 400;
        margin-bottom: 16px;
        &-code {
          color: var(--bc-text-discript);
        }
      }
      .is-border-bottom {
        border-bottom: 3px solid #0151fc;
      }
      .content-about1 {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 16px;
        line-height: 24px;
        font-weight: 400;
        margin-bottom: 16px;

        &:first-child {
          margin-top: 20px;
        }
        &:last-child {
          margin-bottom: 0;
        }
        &-title {
          &-sup {
            color: #89909e;
          }
        }
        &-code {
          color: var(--bc-text-discript);
          .price-range {
          }
        }
      }
      .is-border-bottom {
        border-bottom: 3px solid #0151fc;
      }
    }
    .wrap-map {
      .sack-map {
        font-size: 16px;
        line-height: 24px;
        font-weight: 400;
        margin-bottom: 16px;

        &:first-child {
          margin-top: 20px;
        }
        &:last-child {
          padding-bottom: 29px;
          margin-bottom: 0;
        }
        .sack-map-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 4px;

          .sack-map-code {
            color: var(--bc-text-discript);
          }
        }
        .sack-map-desc {
          color: var(--bc-text-disabled);
        }
      }
    }
    .border-content {
      border-bottom: 1px solid #dbdbdb;
      margin-top: 20px;
      margin-bottom: 24px;
      .tour-details {
        margin-top: 5px;
        margin-bottom: 24px;
        color: #0151fc;
      }
    }
    .popup-tour-details {
      h1 {
        font-size: 30px;
        font-weight: 700;
        line-height: 50px;
      }
    }
  }
</style>
