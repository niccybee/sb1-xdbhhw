<script setup lang="ts">
import { defineModel } from 'vue'

const model = defineModel()

const closeModal = () => {
  model.value = false;
};


</script>
<template>
  <div>
    <div class="modal-overlay o-1 z-9" v-if="model" @click="closeModal">{{ model }}</div>
    <div class="modal z-10" ref="target">
      <slot />
    </div>
  </div>
</template>