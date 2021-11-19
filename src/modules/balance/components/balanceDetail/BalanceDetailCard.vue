<template>
  <div class='balance-card-detail be-flex '>
    <div class='card-item'>
      <div class='title be-flex align-center'>
        <base-icon :icon='checkTypeIcon(tabActiveFilter)' size='40' />
        <div class='content-card'>
          <p>{{ $t('balance.popup.bitcoin-wallet') }}</p>
          <p>{{ $t('balance.balance') }}</p>
        </div>
      </div>
      <div class='value-card' :class='checkType(tabActiveFilter)'>
        <p class='current'>{{ dataCard.balance |numberWithCommas }} {{ dataCard.currency }}</p>
        <p class='last'>-${{ dataCard.balanceUSD |numberWithCommas }}</p>
      </div>
    </div>
    <div class='card-item'>
      <div class='title be-flex align-center'>
        <base-icon :icon='checkTypeIcon(tabActiveFilter)' size='40'/>
        <div class='content-card'>
          <p>{{ $t('balance.popup.available-amount') }}</p>
          <p>{{ $t('balance.popup.available-amount') }}</p>
        </div>
      </div>
      <div class='value-card' :class='checkType(tabActiveFilter)'>
        <p class='current'>{{ dataCard.availableBalance  |numberWithCommas}} {{ dataCard.currency }}</p>
        <p class='last'>-${{ dataCard.availableBalanceUSD  |numberWithCommas}}</p>
      </div>
    </div>
    <div class='card-item'>
      <div class='title be-flex align-center'>
        <base-icon icon='icon-lock' size='40' />
        <div class='content-card'>
          <p>{{ $t('balance.popup.locked-amount') }}</p>
          <p>{{ $t('balance.popup.withdrawal-request') }}</p>
        </div>
      </div>
      <div class='value-card amount-locker'>
        <p class='current'>{{ dataCard.totalLockedAmount  |numberWithCommas}} {{ dataCard.currency }}</p>
        <p class='last'>~${{ dataCard.totalLockedAmountUSD  |numberWithCommas}}</p>
      </div>
    </div>
  </div>
</template>
<script lang='ts'>
  import { Component, Prop, Vue } from 'vue-property-decorator'

  @Component
  export default class BalanceDetailCard extends Vue {
    @Prop({ required: true, type: Object, default: {} }) dataCard!: Record<string, any>
    @Prop({ required: true }) tabActiveFilter!: string

    checkType(type: string): string {
      return type === 'lynk' ? 'amount-lynk' : type === 'btc' ? 'amount-btc' : type === 'eth' ? 'amount-eth' : type === 'usdt' ? 'amount-usdt' : type === 'bnb' ? 'amount-bnb' : type === 'usdc' ? 'amount-usdc' : 'amount-locker'
    }

    checkTypeIcon(type: string): string {
      return type === 'lynk' ? 'icon-lynk' : type === 'btc' ? 'icon-btc' : type === 'eth' ? 'icon-eth' : type === 'usdt' ? 'icon-usdt' : type === 'bnb' ? 'icon-bnb' : type === 'usdc' ? 'icon-usdc' : 'icon-locker'
    }
  }
</script>
<style scoped lang='scss'>
  .balance-card-detail {
    padding: 16px 24px;
    box-sizing: border-box;
    background: #FFFFFF;
    box-shadow: 0px 0.3px 0.9px rgba(0, 0, 0, 0.1), 0px 1.6px 3.6px rgba(0, 0, 0, 0.13);
    border-radius: 4px;
    margin-bottom: 24px;

    .card-item {
      width: 311px;
      margin-right: 24px;
      border-right: 1px solid #dbdbdb;

      .title {
        margin-bottom: 16px;

        .content-card {
          margin-left: 16px;

          p:first-of-type {
            font-weight: 600;
            font-size: 18px;
            color: #0A0B0D;
            font-family: "Open Sans";
          }

          p:last-of-type {
            font-size: 12px;
            color: #5b616e;
            font-family: "Open Sans";
          }
        }
      }

      .value-card {
        .current {
          font-weight: 600;
          font-size: 24px;
        }

        .last {
          font-size: 14px;
          color: #5b616e;
        }
      }

      &:last-child {
        border: none;
      }
    }
  }
</style>