<template>
  <el-container class="second-layout">
    <router-view />
  </el-container>
</template>
<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'

  @Component({
    components: {}
  })
  export default class LayoutSecond extends Vue {
    isLoading = true
    isDashboard = false
    async init(): Promise<void> {
      console.log('a')
    }
    created(): void {
      this.init()
    }
  }
</script>
<style lang="scss" scoped>
  .main-layout {
    position: relative;
    .main-header {
      border-bottom: 1px solid var(--be-border-color);
      justify-content: flex-end;
    }
    .dashboard {
      border-bottom: none;
      background-color: #fafafa;
    }
    .customer {
      background-color: #fafafa;
    }
  }
</style>
