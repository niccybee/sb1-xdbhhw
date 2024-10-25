<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  // Allow external control of modal visibility
  modelValue: {
    type: Boolean,
    default: false
  },
  // Optional title for the modal
  title: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])

// Local state for modal visibility
const isVisible = ref(props.modelValue)

// Watch for external changes
watch(() => props.modelValue, (newValue) => {
  isVisible.value = newValue
})

// Watch for local changes
watch(isVisible, (newValue) => {
  emit('update:modelValue', newValue)
})

// Methods to control modal visibility
const show = () => {
  isVisible.value = true
}

const hide = () => {
  isVisible.value = false
}

// Expose methods to parent components
defineExpose({
  show,
  hide
})
</script>

<template>
  <Teleport to="body">
    <Transition enter-active-class="transition duration-200 ease-out" enter-from-class="transform opacity-0"
      enter-to-class="opacity-100" leave-active-class="transition duration-200 ease-in" leave-from-class="opacity-100"
      leave-to-class="transform opacity-0">
      <div v-if="isVisible" class="fixed inset-0 z-50">
        <!-- Backdrop -->
        <div class="fixed inset-0 bg-black bg-opacity-50" @click="hide"></div>

        <!-- Modal -->
        <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div class="bg-white rounded-lg shadow-xl w-full max-w-md mx-auto" @click.stop>
            <!-- Header -->
            <div class="flex justify-between items-center p-4 border-b">
              <h3 class="text-lg font-semibold">{{ title }}</h3>
              <button @click="hide" class="text-gray-400 hover:text-gray-500">
                <span class="sr-only">Close</span>
                <div class="i-gg-close text-xl"></div>
              </button>
            </div>

            <!-- Content -->
            <div class="p-4">
              Test Content
              <slot></slot>
            </div>

            <!-- Footer -->
            <div class="p-4 border-t flex justify-end space-x-2">
              <slot name="footer">
                <button @click="hide" class="btn btn-secondary">
                  Close
                </button>
              </slot>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>