
<script setup lang="ts">
interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'warning';
}

const props = defineProps<{
  toast: Toast
}>();

const icons = {
  success: 'i-gg-check-o',
  error: 'i-gg-danger',
  warning: 'i-gg-info'
};

const colors = {
  success: 'bg-green-50 border-green-200 text-green-800',
  error: 'bg-red-50 border-red-200 text-red-800',
  warning: 'bg-yellow-50 border-yellow-200 text-yellow-800'
};
</script>

<template>
  <div class="fixed top-4 right-4 z-50">
    <TransitionGroup name="toast">
      <div :class="[
        'flex items-center p-4 mb-2 border rounded-lg shadow-lg max-w-sm',
        colors[toast.type]
      ]">
        <div :class="[icons[toast.type], 'text-xl mr-2']"></div>
        <p class="text-sm">{{ toast.message }}</p>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}
.toast-enter-from {
  opacity: 0;
  transform: translateX(30px);
}
.toast-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
