<script setup lang="ts">
const props = defineProps({
  text: String,
  buttonType: String,
  icon: String,
})
</script>
<template>
  <button class="btn" :class="props.buttonType">
    <div v-if="$props.text">{{ props.text }}</div>
    <div :class="icon" v-if="props.icon"></div>
  </button>
</template>