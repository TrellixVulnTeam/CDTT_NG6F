<template>
  <div></div>
</template>

<script lang="ts">
  import PopupMixin from '@/mixins/popup'
  import { Component, Mixins, Vue } from 'vue-property-decorator'

  @Component
  export default class PopupwithDrawRequest extends Mixins(PopupMixin) {}
</script>

<style scoped></style>
