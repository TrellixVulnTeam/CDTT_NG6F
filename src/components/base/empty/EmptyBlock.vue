<template>
  <div class="empty-block" style="padding-top: 22px" v-if="show">
    <div v-if="emptyDefault">
      <base-icon icon="no-data" size="100" />
      <p class="empty-text">{{ $t('notify.no-data') }}</p>
    </div>
    <div v-else style="padding-bottom: 30px">
      <img src="../../../icons/png/icon-persion.png" alt="" style="margin-bottom: -12px" />
      <p class="empty-text text-sm" style="margin-bottom: 4px">{{ $t('notify.no-data-round') }}</p>
      <p class="empty-text text-sm">{{ $t('notify.no-data-round-1') }}</p>
    </div>
  </div>
</template>
<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'

  @Component
  export default class EmptyBlock extends Vue {
    @Prop({ required: false, type: Boolean, default: true }) show!: boolean
    @Prop({ type: String, default: '' }) emptyText!: string
    @Prop({ required: false, type: Boolean, default: true }) emptyDefault!: boolean
  }
</script>
