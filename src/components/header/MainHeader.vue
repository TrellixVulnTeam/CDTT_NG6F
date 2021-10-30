<template>
  <div class="header">
    <div class="body">
      <div class="content-left">
        <div class="text-2xl title">{{ getTitle }}</div>
      </div>
      <div class="content-right">
        <div class="content">
          <div class="btn plus">
            <span><base-icon icon="plus" size="24" /></span>
          </div>
          <div class="notification">
            <!-- <span><base-icon icon="notification" size="18" /></span> -->
            <span><base-icon icon="notification2" size="18" /></span>
          </div>
          <div class="endow">
            <span><base-icon icon="endow" size="18" /></span>
          </div>
          <div class="question">
            <span><base-icon icon="question" size="18" /></span>
          </div>
          <div class="avatar">
            <el-dropdown trigger="click" class="pl-2 login-page-header" @command="handleCommand">
              <span class="el-dropdown-link" style="color: #201f1e">
                <img src="@/assets/images/avatar.png" alt="" />
              </span>

              <el-dropdown-menu slot="dropdown" class="header-downloadapp">
                <div class="dropdown-group">
                  <el-dropdown-item command="logout"
                    ><span class="pl-1">{{ $t('logout.title') }}</span></el-dropdown-item
                  >
                </div>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <!-- <div class="avatar">
            <img src="@/assets/images/avatar.png" alt="" />
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  const bcAuth = namespace('beAuth')
  @Component
  export default class MainHeader extends Vue {
    @bcAuth.Action('logout') logout!: () => Promise<any>

    image = './avatar.png'

    get getTitle(): any {
      switch (this.$route.name) {
        case 'Kyc':
          return this.$t('header.kyc')

        default:
          return this.$t('header.kyc')
      }
    }

    handleCommand(command: string): void {
      if (command === 'logout') {
        this.logout().then(() => {
          this.$router.push({ name: 'login' })
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .header {
    width: 99.9%;
    height: 72px;
    // border-color: var(--bc-input-border);
    border-left: 1px solid var(--bc-input-border);
    border-bottom: 1px solid #d2d0ce;
    .body {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .content-left {
        width: 50%;
        height: 100%;
        padding: 20px 0px 20px 24px;
      }
      .title {
        width: 74px;
        height: 32px;
        font-weight: 600;
        color: #201f1e;
        line-height: 32px;
      }
      .content-right {
        width: 50%;
        height: 100%;
        padding: 17px 24px 15px 0;
        display: flex;
        flex-direction: row-reverse;
        .content {
          width: 232px;
          height: 40px;
          display: flex;
          align-items: center;
          div {
            display: inline-block;
            cursor: pointer;
          }
          .plus {
            width: 45.78px;
            height: 40px;
            border-radius: 50%;
            margin-right: 27px;
            position: relative;
            padding: 0;
            span {
              position: absolute;
              top: 20%;
              left: 20%;
            }
          }
          .notification {
            width: 24px;
            height: 24px;
            margin-right: 18px;
            position: relative;
            span {
              position: absolute;
              top: 8%;
              left: 8%;
            }
          }
          .endow {
            width: 24px;
            height: 24px;
            margin-right: 20px;
            position: relative;
            span {
              position: absolute;
              top: 8%;
              left: 8%;
            }
          }
          .question {
            width: 24px;
            height: 24px;
            margin-right: 24px;
            position: relative;
            span {
              position: absolute;
              top: 8%;
              left: 8%;
            }
          }
          .avatar {
            width: 40px;
            height: 40px;
            img {
              width: 40px;
              height: 40px;
              border-radius: 50%;
            }
          }
        }
      }
    }
  }
</style>
