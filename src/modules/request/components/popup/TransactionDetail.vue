<template>
  <div class="content be-flex align-center jc-space-between">
    <div class="box-left">
      <div class="be-flex align-center" style="margin-bottom: 20px">
        <base-icon class="icon" icon="icon-document" size="24"></base-icon>
        <span class="big-title">{{ $t('request.popup.transaction.bigTitle1') }}</span>
      </div>
      <div class="mini-box be-flex align-center jc-space-between">
        <div class="left">{{ $t('request.popup.transaction.label1') }}</div>
        <div class="right">01/10/2022 12:09:06</div>
      </div>
      <div class="line"></div>
      <div class="mini-box be-flex align-center jc-space-between">
        <div class="left">{{ $t('request.popup.transaction.label2') }}</div>
        <div class="right">
          <base-icon icon="icon-btc" size="20" class="mini-icon"></base-icon><span style="margin-right: 9px">1Nb4wT...bspXQe</span
          ><span class="icon-copy" @click="handleCopyTransaction('Vi Thị Nưu')">
            <base-icon icon="icon-copy" size="20" />
          </span>
        </div>
      </div>
      <div class="line"></div>
      <div class="mini-box be-flex align-center jc-space-between">
        <div class="left">{{ $t('request.popup.transaction.label3') }}</div>
        <div class="right">
          <base-icon icon="icon-btc" size="20" class="mini-icon"></base-icon><span style="margin-right: 9px">1Nb4wT...bspXQe</span
          ><span class="icon-copy" @click="handleCopyTransaction('Vi Thị Nưu')">
            <base-icon icon="icon-copy" size="20" />
          </span>
        </div>
      </div>
      <div class="line"></div>
      <div class="mini-box be-flex align-center jc-space-between">
        <div class="left">{{ $t('request.popup.transaction.label4') }}</div>
        <div class="right"><span class="fee">-0.00065 BTC</span> <span class="dolar">(~$1.65)</span></div>
      </div>
      <div class="line"></div>
      <div class="mini-box be-flex align-center jc-space-between">
        <div class="left">{{ $t('request.popup.transaction.label5') }}</div>
        <div class="right"><div class="status">Pending</div></div>
      </div>
      <div class="line"></div>
    </div>
    <div class="box-right">
      <div class="be-flex align-center" style="margin-bottom: 20px">
        <base-icon class="icon" icon="icon-user" size="24"></base-icon>
        <span class="big-title">{{ $t('request.popup.transaction.bigTitle2') }}</span>
      </div>
      <div class="mini-box be-flex align-center jc-space-between">
        <div class="left">{{ $t('request.popup.transaction.label6') }}</div>
        <div class="right">Nguyễn Trần Phương Anh</div>
      </div>
      <div class="line"></div>
      <div class="mini-box be-flex align-center jc-space-between">
        <div class="left">{{ $t('request.popup.transaction.label7') }}</div>
        <div class="right"><span class="plus">(+84)</span> 945567796</div>
      </div>
      <div class="line"></div>
      <div class="mini-box be-flex align-center jc-space-between">
        <div class="left">{{ $t('request.popup.transaction.label8') }}</div>
        <div class="right">phuonganhnguyentran123@gmail.com</div>
      </div>
      <div class="line"></div>
      <div class="mini-box be-flex align-center jc-space-between">
        <div class="left">{{ $t('request.popup.transaction.label9') }}</div>
        <div class="right">Vietnam</div>
      </div>
      <div class="line"></div>
      <div class="mini-box be-flex align-center jc-space-between">
        <div class="left">{{ $t('request.popup.transaction.label10') }}</div>
        <div class="right">Level 1</div>
      </div>
      <div class="line"></div>
      <div class="mini-box be-flex align-center jc-space-between">
        <div class="left">{{ $t('request.popup.transaction.label11') }}</div>
        <div class="right">11/30/2021 12:09:06</div>
      </div>
      <div class="line"></div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'

  @Component
  export default class TransactionDetail extends Vue {
    handleCopyTransaction(string: any): void {
      if (string) {
        let message: any = ''
        const el = document.createElement('input')
        el.value = string
        document.body.appendChild(el)
        el.select()
        document.execCommand('copy')
        document.body.removeChild(el)
        message = this.$t('notify.copy')
        this.$message.success(message)
      }
    }
  }
</script>

<style scoped lang="scss">
  .content {
    min-height: 316px;
    .icon {
      position: absolute;
      top: -7px;
      left: 0px;
    }
    .mini-box {
      margin-bottom: 12px;
      .status {
        width: 80px;
        height: 24px;
        text-align: center;
        line-height: 24px;
        background: #fff3e2;
        color: #dd7d00;
        font-weight: 400;
        font-size: 12px;
        border-radius: 4px;
      }
      .right {
        .fee {
          color: #cf202f;
          font-weight: 400;
          font-size: 14px;
        }
        .dolar {
          font-size: 12px;
          font-weight: 400;
          color: #5b616e;
        }
        .mini-icon {
          margin-right: 8px;
        }
        .icon-copy {
          cursor: pointer;
        }
      }
    }
    .line {
      border-bottom: 1px solid #dbdbdb;
      margin-bottom: 16px;
    }
    .box-left {
      position: relative;
      min-width: 369px;
      padding-left: 28px;
      padding-right: 28px;
      min-height: 316px;
    }
    .box-right {
      padding-left: 28px;
      padding-right: 28px;
      min-width: 369px;
      position: relative;
      min-height: 316px;
    }
  }
</style>
