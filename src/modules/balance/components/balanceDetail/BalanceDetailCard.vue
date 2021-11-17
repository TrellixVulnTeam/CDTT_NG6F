<template>
  <div class='balance-card-detail be-flex '>
    <div class='card-item'>
      <div class='title be-flex align-center'>
        <base-icon icon="icon-btc" size="40" />
        <div class='content-card'>
          <p>Bitcoin Wallet</p>
          <p>Balance</p>
        </div>
      </div>
      <div class='value-card'>
        <p class='current'>{{dataCard.balance | convertAmountDecimal()}} {{ dataCard.currency }}</p>
        <p class='last'>-${{ dataCard.balanceUSD | convertAmountDecimal("USD") }}</p>
      </div>
    </div>
    <div class='card-item'>
      <div class='title be-flex align-center'>
        <base-icon icon="icon-btc" size="40" />
        <div class='content-card'>
          <p>Available Amount</p>
          <p>Available Amount</p>
        </div>
      </div>
      <div class='value-card'>
        <p class='current'>{{dataCard.availableBalance | convertAmountDecimal()}} {{ dataCard.currency }}</p>
        <p class='last'>-${{ dataCard.availableBalanceUSD| convertAmountDecimal("USD")}}</p>
      </div>
    </div>
    <div class='card-item'>
      <div class='title be-flex align-center'>
        <base-icon icon="icon-lock" size="40" />
        <div class='content-card'>
          <p>Locked Amount</p>
          <p>Withdrawal Request</p>
        </div>
      </div>
      <div class='value-card'>
        <p class='current'>{{ dataCard.totalLockedAmount | convertAmountDecimal() }} {{ dataCard.currency }}</p>
        <p class='last'>-${{ dataCard.totalLockedAmountUSD | convertAmountDecimal("USD") }}</p>
      </div>
    </div>
  </div>
</template>
<script lang='ts'>
  import {Component, Prop, Vue } from 'vue-property-decorator'
@Component
  export default class BalanceDetailCard extends Vue{
  @Prop({ required: true, type: Object, default: {} }) dataCard!: Record<string, any>
  }
</script>
<style scoped lang='scss' >
.balance-card-detail{
  padding: 16px 24px;
  box-sizing: border-box;
  background: #FFFFFF;
  box-shadow: 0px 0.3px 0.9px rgba(0, 0, 0, 0.1), 0px 1.6px 3.6px rgba(0, 0, 0, 0.13);
  border-radius: 4px;
  margin-bottom: 24px;
  .card-item{
    width: 311px;
    margin-right: 24px;
    border-right: 1px solid #dbdbdb;
    .title{
      margin-bottom: 16px;
      .content-card{
        margin-left: 16px;
        p:first-of-type{
          font-size: 18px;
          color: #0A0B0D;
          font-family:"Open Sans";
        }
        p:last-of-type{
          font-size: 12px;
          color: #5b616e;
          font-family: "Open Sans";
        }
      }
    }
    .value-card{
      .current{
        color: #F7931A;
        font-size: 24px;
      }
      .last{
        font-size: 14px;
        color: #5b616e;
      }
    }
    &:last-child{
      border: none;
    }
  }
}
</style>