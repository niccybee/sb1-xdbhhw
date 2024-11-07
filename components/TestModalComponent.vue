<script setup lang="ts">
import { useUIStore } from '~/stores/ui';
const ui = useUIStore();

const onClose = (ev) => {
  console.log('close event', ev)
  ui.hideHelpModal()
}
</script>
<template>
  <NB2Modal :isVisible="ui.showTestModal" v-on:close="onClose">
    <div>
      <p>Hello Component</p>
    </div>
  </NB2Modal>
</template>