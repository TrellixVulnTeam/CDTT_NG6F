<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator'

  @Component({
    components: {}
  })
  export default class App extends Vue {
    created(): void {
      const language = window.localStorage.getItem('bc-lang')
      if (!language) {
        window.localStorage.setItem('bc-lang', 'en')
      }
    }
  }
</script>

<style lang="scss">
  // @import url('./accets/styles/index.scss');
</style>
