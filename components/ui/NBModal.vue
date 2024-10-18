<script setup lang="ts">
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
// const props = defineProps({
//   showModal: Boolean,
// }) 

const showModal = ref(false)
const target = ref(null)
onClickOutside(target, event => showModal = false)

</script>
<template>
  <div class="modal-overlay" v-if="showModal">
    <slot />
    <div class="modal" ref="target">
      <slot />
    </div>
  </div>
</template>