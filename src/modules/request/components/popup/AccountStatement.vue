<template>
  <div class="content-account">
    <div class="box1 be-flex"></div>
    <div class="big-title fw-600 fs-24">Account Statement</div>
    <div class="box-table">
      <base-table :data="dataTable" class="base-table table-request">
        <el-table-column label="#" type="index" align="center" width="50" />
        <el-table-column label="Email" prop="email" align="left">
          <template slot-scope="scope">
            <div class="box-email-tabel">
              <p class="fs-16 fw-400">{{ scope.row.fullName }}</p>
              <p class="fs-14 fw-400" style="color: #5b616e">{{ scope.row.email }}</p>
            </div>
          </template>
        </el-table-column>
      </base-table>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'

  @Component
  export default class AccountStatement extends Vue {
    dataTable: any = []
  }
</script>

<style scoped lang="scss">
  .content-account {
    .box1 {
      padding: 16px 24px;
      height: 108px;
      border-radius: 4px;
      border: 1px solid #dbdbdb;
      margin-bottom: 24px;
    }
    .big-title {
      margin-bottom: 24px;
    }
    .box-table {
      .header {
      }
    }
  }
</style>
