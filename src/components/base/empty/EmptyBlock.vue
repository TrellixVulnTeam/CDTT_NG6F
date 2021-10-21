<template>
  <div class="empty-block" v-if="show">
    <base-icon icon="no-post" />
    <p class="empty-text">{{ emptyText }}</p>
  </div>
</template>
<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  @Component
  export default class EmptyBlock extends Vue {
    @Prop({ required: false, type: Boolean, default: true }) show!: boolean
    @Prop({ type: String, default: '' }) emptyText!: string
  }
</script>
