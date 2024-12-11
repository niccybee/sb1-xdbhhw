<script setup lang="ts">
import { ref } from 'vue';
import { useElementBounding, useWindowSize } from '@vueuse/core';

const open = ref<boolean>(true);

const toggleOpen = () => {
  open.value = !open.value;
};

let popover: HTMLElement | null = null;
let popButton: HTMLButtonElement | null = null;

const updatePopoverPosition = () => {
  if (popover && popButton) {
    const {
      top,
      left,
      update: updateBounding
    } = useElementBounding(popButton);

    updateBounding();
    popover.value.style.top = `${top}px`;
    popover.value.style.left = `${left}px`;
  }
};

const { height: windowHeight, width: windowWidth } = useWindowSize();
watch(() => windowHeight.value, updatePopoverPosition);
watch(() => windowWidth.value, updatePopoverPosition);

</script>

<template>
  <button ref="popButton"
    class="flex items-center gap-2 rounded-md bg-gray-100 px-2 py-1 text-sm font-medium border-none hover:border-1 hover:border-gray-700 hover:bg-white transition transition-all duration-200"
    @click="toggleOpen">
    <div class="i-gg-more-vertical"></div>
    <span>More</span>
  </button>
</template>

