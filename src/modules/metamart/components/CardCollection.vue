<template>
  <div class="card-collection">
    <el-card :body-style="{ padding: '0px', height: '378px' }" class="box-card">
      <img :src="data.image" class="background-card">
      <div class="card-content">
        <div class="avatar">
          <img src="https://cdn.pixabay.com/photo/2022/03/01/02/51/galaxy-7040416__480.png" alt="avatar" class="avatar-img">
          <span class="status-icon">
            <base-icon icon="icon-status1" size="25"/>
          </span>
          <span class="badge-icon">
            <base-icon icon="badge-verified" size="20"/>
            <span class="tick-icon">
              <base-icon icon="tick-verified" size="8"/>
            </span>
          </span>
        </div>
        <div class="card-detail">
          <div class="card-detail__name">
            <div class="name ">{{data.name}}</div>
            <div class="powered-by">by
              <span class="creator text-hyperlink ">LynkeyyeknyL</span>
              <span class="asterisk-verified-icon">
                <base-icon icon="badge-verified1" size="12"/>
                <span class="tick-verified-icon">
                  <base-icon icon="tick-verified1" size="6"/>
                </span>
              </span>
            </div>
          </div>
          <p class="card-detail__description">
            {{data.description}}
          </p>
        </div>

      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'
import {object} from "@amcharts/amcharts4/core";
import BaseIcon from "@/components/base/icon/BaseIcon.vue";
@Component({
  components: {BaseIcon}
})
export default class CardCollection extends Vue {
  @Prop({ required: true, type: Object }) data!: Record<string, any>
}
</script>

<style scoped lang="scss">
//.card{
//  height: 378px;
//}
.box-card{
  position: relative;
  width: 261px;
  max-height: 378px;
  left: 0px;
  top: 0px;
  border: 1px solid var(--bc-tab-buy-border);

  background: var(--bc-color-white);
  border-radius: 8px;
  .background-card{
    width: 261px;
    height: 174px;
    object-fit: cover;
  }
  .card-content{
    position: relative;
    padding: 24px 12px;
    //height: 204px;
    .avatar{
      //position: relative;
      .avatar-img{
        position: absolute;
        width: 64px;
        height: 64px;
        //left: 99px;
        //top: 142px;
        top: 0%;
        left: 50%;
        transform: translate(-50%, -50%);

        //background-color: #0b794b;
        /* Text/White */

        border: 2px solid #FFFFFF;
        border-radius: 50%  ;
        object-fit: cover;
        align-items: center;
        //box-sizing: border-box;
        /* depth-8 */
        filter: drop-shadow(0px 0.6px 1.8px rgba(0, 0, 0, 0.1)) drop-shadow(0px 3.2px 7.2px rgba(0, 0, 0, 0.13));
      }

      .status-icon{
        position: absolute;
        top: -20px;
        right: 0%;
        left: 155px;
        //bottom: 60%;
        transform: translate(-50%, -50%);
        width: 10px;
        height: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .badge-icon{
        position: absolute;
        right: 0%;
        left: 60%;
        width: 21px;
        transform: translate(-50%, -50%);

        .tick-icon{
          position: absolute;
          height: 24px;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
      }
    }
    .card-detail{
      display: flex;
      flex-direction: column;
      text-align: center;
      margin: 16px 0px 0px 0px;
      &__name{

        .name{
          position: static;
          font-weight: 500;
          font-size: 20px;
          line-height: 24px;
          color: var(--bc-text-primary);
          margin-bottom: 4px;

          //truncate when line > 1
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .powered-by{
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 400;
          font-size: 14px;
          line-height: 24px;
          color: var(--bc-text-discript);
          .creator{
            padding-left: 4px;
          }
          .asterisk-verified-icon{
              position: relative;
              margin: 0 0 0 4px;
            .tick-verified-icon{
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -55%);
            }
          }
        }
      }
      &__description{
        margin-top: 16px;
        color: var(--bc-text-discript);
        line-height: 24px;

        //truncate when line > 3
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>
