<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator'
  import getRepository from '@/services'
  import { ParamsRepository } from '@/services/repositories/params'
  import { namespace } from 'vuex-class'

  const apiParams: ParamsRepository = getRepository('params')
  const beBase = namespace('beBase')
  @Component({
    components: {}
  })
  export default class App extends Vue {
    @beBase.Action('setSystemParams') setSystemParams!: (data: Record<string, any>) => void

    created(): void {
      apiParams.getPramsHeader().then(res => {
        this.setSystemParams(res)
      })
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
