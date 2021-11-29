<template>
  <base-popup name="popup-withdraw-request" class="popup-withdraw-request" width="1040px" :open="handleOpen" :close="handleClose">
    <div slot="title">
      <span>{{ $t('request.popup.titlePopup') }}</span>
    </div>
    <div class="content">
      <div class="box1 be-flex" v-if="this.checkWarning == 'NOTMATCHED'">
        <div class="box-left">
          <base-icon icon="iconWarning" size="20"></base-icon>
        </div>
        <div class="box-right">
          <div class="big-title fw-600 fs-18">{{ $t('request.popup.bigTitle1') }}</div>

          <div>
            <div class="discript be-flex align-center" style="margin-bottom: 8px">
              <div class="dot"></div>
              <div class="comment fw-400 fs-16">{{ $t('request.warning.notmatched') }}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="box1 be-flex" v-else-if="this.checkWarning == 'EXCEEDED'">
        <div class="box-left">
          <base-icon icon="iconWarning" size="20"></base-icon>
        </div>
        <div class="box-right">
          <div class="big-title fw-600 fs-18">{{ $t('request.popup.bigTitle1') }}</div>

          <div>
            <div class="discript be-flex align-center" style="margin-bottom: 8px">
              <div class="dot"></div>
              <div class="comment fw-400 fs-16">{{ $t('request.warning.exceeded1') }}</div>
            </div>
            <div class="discript be-flex align-center">
              <div class="dot"></div>
              <div class="comment fw-400 fs-16">{{ $t('request.warning.exceeded2') }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="box1 be-flex" v-else-if="this.checkWarning == 'ALLOWABLE'">
        <div class="box-left">
          <base-icon icon="iconWarning" size="20"></base-icon>
        </div>
        <div class="box-right">
          <div class="big-title fw-600 fs-18">{{ $t('request.popup.bigTitle1') }}</div>
          <div>
            <div class="discript be-flex align-center" style="margin-bottom: 8px">
              <div class="dot"></div>
              <div class="comment fw-400 fs-16">{{ $t('request.warning.allow') }}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="box1 be-flex" v-if="summaryAccount.length > 0 && summaryAccount.balance != summary.closeBalance">
        <div class="box-left">
          <base-icon icon="iconWarning" size="20"></base-icon>
        </div>
        <div class="box-right">
          <div class="big-title fw-600 fs-18">{{ $t('request.popup.bigTitle1') }}</div>
          <div class="discript be-flex align-center" style="margin-bottom: 8px">
            <div class="dot"></div>
            <div class="comment fw-400 fs-16">{{ $t('request.popup.label1') }}</div>
          </div>
          <div class="discript be-flex align-center">
            <div class="dot"></div>
            <div class="comment fw-400 fs-16">{{ $t('request.popup.label2') }}</div>
          </div>
        </div>
      </div>
      <div class="box2 bg-white be-flex align-center">
        <div class="box-left be-flex">
          <div class="icon"><base-icon icon="request-popup-icon1" size="48"></base-icon></div>
          <div class="box-amount">
            <div class="big-amout fw-600 fs-24" v-if="data.currency">{{ data.amountDisplay }}</div>
            <div class="dolar fw-400 fs-12">~${{ getAmountToUsd(data.amountToUsd) }}</div>
          </div>
          <div class="box-status fw-400 fs-12" :class="data.status != 'PENDING' ? 'rejected' : null" style="text-transform: capitalize">{{ getStatus(data.status) }}</div>
        </div>
        <div class="line"></div>
        <div class="box-right">
          <div class="mini-box be-flex align-center jc-space-between">
            <div class="left fw-400 fs-14">{{ $t('request.popup.label3') }}</div>
            <div class="right fw-400 fs-16">{{ dataUser.email }}</div>
          </div>
          <div class="mini-box be-flex align-center jc-space-between">
            <div class="left fw-400 fs-14">{{ $t('request.popup.label4') }}</div>
            <div class="right fw-400 fs-16">
              <base-icon v-if="data.currency" :icon="getIcon(data.currency)" size="20" class="mini-icon"></base-icon
              ><span style="margin-right: 9px">{{ data.toAddress | formatTransactionCode }}</span
              ><span class="icon-copy" v-if="data.toAddress" @click="handleCopyTransaction(data.toAddress)">
                <base-icon icon="icon-copy" size="20" />
              </span>
            </div>
          </div>
          <div class="mini-box be-flex align-center jc-space-between">
            <div class="left fw-400 fs-14">{{ $t('request.popup.label5') }}</div>
            <div class="right fw-400 fs-16">{{ data.transactionDate | formatMMDDYY }}</div>
          </div>
        </div>
      </div>
      <div class="w-100 box3 bg-white bo-request">
        <div class="box-content bg-white">
          <div class="table bg-white">
            <div class="wallet-header">
              <div class="be-flex align-center jc-space-between wallet-header__above">
                <div class="wallet-header__above-tabs be-flex">
                  <div class="tab-item cursor" v-for="tab in tabs" :key="tab.id" :class="tabActive === tab.id ? 'tab-active' : null" @click="handleChangeTab(tab)">
                    <span class="text-base">{{ $t(`request.${tab.title}`) }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="box-table">
              <transaction-detail :dataUser="dataUser" :data="data" v-if="tabActive == 1" />
              <account-statement :data="data" v-if="tabActive == 2" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div slot="footer" class="footer be-flex jc-space-between align-center">
      <div class="btn-action btn-close" @click="handleBtnClose">{{ $t('request.popup.btn1') }}</div>
      <div class="be-flex jc-space-between align-center">
        <el-button v-if="data.status && data.status == 'PENDING'" class="btn-action btn-reject" @click="handleReject">{{ $t('request.popup.btn2') }}</el-button>
        <el-button v-if="data.status && data.status == 'PENDING'" class="btn-action btn-approve" style="margin-left: 0px !important" @click="handleApprove" :loading="loadingBtn">{{
          $t('request.popup.btn3')
        }}</el-button>
      </div>
    </div>
    <popup-reject-reason :transactionId="data.id" @reLoadTable="reLoadTable" />
  </base-popup>
</template>

<script lang="ts">
  import PopupMixin from '@/mixins/popup'
  import { Component, Mixins, Prop } from 'vue-property-decorator'
  import TransactionDetail from './TransactionDetail.vue'
  import AccountStatement from './AccountStatement.vue'
  import PopupRejectReason from './PopupRejectReason.vue'
  import getRepository from '@/services'
  import { RequestRepository } from '@/services/repositories/request'
  import { debounce } from 'lodash'

  const api: RequestRepository = getRepository('request')

  @Component({ components: { TransactionDetail, AccountStatement, PopupRejectReason } })
  export default class PopupWithdrawRequest extends Mixins(PopupMixin) {
    @Prop() data!: any
    dataUser: any = {}
    loading = false
    tabs: Array<Record<string, any>> = [
      {
        id: 1,
        title: 'TransactionDetail'
      },
      {
        id: 2,
        title: 'AccountStatement'
      }
    ]
    tabActive = 1
    summaryAccount: any = {}
    loadingBtn = false
    getAmountToUsd(amountToUsd: Record<string, any>): void {
      let string: any = ''
      if (amountToUsd) {
        string = this.$options.filters?.convertAmountDecimal(amountToUsd, 'USD')
      }
      return string
    }
    async handleChangeTab(tab: Record<string, any>): Promise<void> {
      this.tabActive = tab.id
    }
    handleOpen(): void {
      if (this.data.userId) {
        this.getUserInfo(this.data.userId)
      }
      this.getTable()
    }
    checkWarning = ''
    async getTable(): Promise<void> {
      if (this.data.userId) {
        await api
          .getTableStatement(this.data.currency, this.data.userId, 1, 10)
          .then((res: any) => {
            this.loading = false
            this.summaryAccount = res.summary
            console.log('summaryAccount.balance', this.summaryAccount.balance)
            console.log('summaryAccount.closeBalance', this.summaryAccount.closeBalance)
            console.log('value', this.data.amount + this.data.transactionFee)
            console.log('summaryAccount.limitAmount', this.summaryAccount.limitAmount)
            if (
              this.summaryAccount.balance !== this.summaryAccount.closeBalance &&
              parseFloat(this.data.amount + this.data.transactionFee) < parseFloat(this.summaryAccount.limitAmount)
            ) {
              this.checkWarning = 'NOTMATCHED'
            } else if (
              this.summaryAccount.balance !== this.summaryAccount.closeBalance &&
              parseFloat(this.data.amount + this.data.transactionFee) > parseFloat(this.summaryAccount.limitAmount)
            ) {
              this.checkWarning = 'EXCEEDED'
            } else if (
              this.summaryAccount.balance == this.summaryAccount.closeBalance &&
              parseFloat(this.data.amount + this.data.transactionFee) > parseFloat(this.summaryAccount.limitAmount)
            ) {
              this.checkWarning = 'ALLOWABLE'
            }
          })
          .catch(error => {
            console.log(error)
            this.loading = false
          })
      }
    }
    handleClose(): void {
      this.handleReset()
    }
    handleReset(): void {
      this.tabActive = 1
      this.loading = false
    }
    handleBtnClose(): void {
      this.handleReset()
      this.setOpenPopup({
        popupName: 'popup-withdraw-request',
        isOpen: false
      })
    }
    handleReject(): void {
      if (this.data.id) {
        this.setOpenPopup({
          popupName: 'popup-reject-reason',
          isOpen: true
        })
      }
    }
    handleApprove(): void {
      if (this.data.id) {
        this.debounceFilter('handleApprove')
      }
    }
    async approve(): Promise<void> {
      this.loadingBtn = true
      await api.updateRequest(this.data.id, 'APPROVE', '').then(() => {
        let message: any = ''
        message = this.$t('request.popup.ApproveMessage')
        this.$message.success({ message, duration: 5000 })
        this.loadingBtn = false
        this.reLoadTable()
        this.setOpenPopup({
          popupName: 'popup-withdraw-request',
          isOpen: false
        })
      })
    }
    // debounce chan doble click
    debounceFilter = debounce((nameAction: any) => {
      if (nameAction == 'handleApprove') {
        this.approve()
      }
    }, 400)
    async getUserInfo(userId: string | number): Promise<void> {
      this.loading = true
      api.getUserInfo(userId).then((res: any) => {
        this.dataUser = res.content[0]
        this.loading = false
      })
    }
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
    getIcon(currency: string): void {
      let icon: any = ''
      if (currency) {
        icon = `icon-${currency.toLowerCase()}`
      }
      return icon
    }
    reLoadTable(): void {
      this.$emit('reLoadTable')
      this.setOpenPopup({
        popupName: 'popup-withdraw-request',
        isOpen: false
      })
    }
    getStatus(status: string): void {
      let string: any = ''
      if (status) {
        string = status.toLowerCase()
      }
      return string
    }
  }
</script>

<style scoped lang="scss">
  .popup-withdraw-request {
    .content {
      .bg-white {
        background: var(--bc-bg-white);
      }
      .box1 {
        height: 92px;
        background: #fbedee;
        padding: 18px 18px 16px 18px;
        margin-bottom: 24px;
        border-radius: 4px;
        .box-left {
          height: 100%;
          margin-right: 18px;
          min-width: 18px;
          position: relative;
          span {
            position: absolute;
            top: -1px;
          }
        }
        .box-right {
          height: 100%;
          .big-title {
            margin-bottom: 16px;
          }
          .discript {
            .dot {
              width: 4px;
              height: 4px;
              background: #5b616e;
              border-radius: 50%;
              margin-right: 16px;
            }
          }
        }
      }
      .box2 {
        height: 84px;
        box-shadow: 0px 0.3px 0.9px rgba(0, 0, 0, 0.1), 0px 1.6px 3.6px rgba(0, 0, 0, 0.13);
        border-radius: 4px;
        margin-bottom: 24px;
        padding: 18px 24px;
        .box-left {
          align-items: top;
          margin-right: 40px;
          .icon {
            width: 48px;
            margin-right: 16px;
            position: relative;
            span {
              position: absolute;
              top: -10px;
            }
          }
          .box-amount {
            margin-right: 24px;
            .big-amout {
              color: #cf202f;
            }
            .dolar {
              color: #5b616e;
            }
          }
          .box-status {
            background: #fff3e2;
            color: #dd7d00;
            width: 80px;
            height: 24px;
            text-align: center;
            line-height: 24px;
          }
          .rejected {
            background: #fbedee;
            color: #cf202f;
          }
        }
        .box-right {
          min-width: 490px;
          .mini-box {
            margin-bottom: 10px;
            .left {
              color: #5b616e;
            }
            .right {
              .mini-icon {
                margin-right: 8px;
              }
              .icon-copy {
                cursor: pointer;
              }
            }
          }
        }
        .line {
          border-right: 1px solid #dbdbdb;
          height: 100%;
          margin-right: 40px;
        }
      }
      .box3 {
        box-shadow: 0px 0.3px 0.9px rgba(0, 0, 0, 0.1), 0px 1.6px 3.6px rgba(0, 0, 0, 0.13);
        border-radius: 4px;
        margin-bottom: 24px;
      }
      .bo-request {
        color: var(--bc-text-primary);
        .box-content {
          border-radius: 4px;
          // tab active
          .table {
            .wallet-header {
              &__above {
                border-bottom: 1px solid var(--bc-border-primary);
                &-tabs {
                  .tab-item {
                    padding: 16px 12px;
                    position: relative;
                    color: var(--bc-text-discript);
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
                      height: 2.5px;
                      bottom: -1px;
                      left: 0;
                      background-color: var(--bc-tab-active);
                    }
                  }
                }
              }

              &__below {
                padding: 24px;
                &-amount {
                  .amount-wallet,
                  .amount-lock {
                    flex: 1;
                    .title {
                      margin-left: 16px;
                      .title-coin {
                        color: #201f1e;
                      }
                    }
                    .amount {
                      margin-top: 10px;

                      .amount-btc {
                        color: var(--bc-amount-btc);
                      }
                      .amount-lyn {
                        color: var(--bc-amount-lin);
                      }
                      .amount-lock {
                        color: var(--bc-amount-lock);
                      }
                    }
                  }
                  .amount-wallet {
                    border-right: 1px solid var(--bc-border-primary);
                  }
                }
              }
            }
            .box-table {
              padding: 24px;
              min-height: 240px;
              overflow-y: auto;
            }
          }
        }
      }
    }
    .footer {
      .btn-action {
        width: 100px;
        height: 40px;
        border-radius: 6px;
        text-align: center;
        line-height: 40px;
        cursor: pointer;
        color: var(--bc-color-white);
        padding: unset !important;
        text-align: center;
        line-height: 35px;
        .btn-approve {
          margin-left: 0px !important;
        }
      }
      .btn-close {
        border: 1px solid #89909e;
        color: #3b3a39;
        line-height: 40px;
      }
      .btn-reject {
        margin-right: 16px;
      }
    }
  }
</style>
