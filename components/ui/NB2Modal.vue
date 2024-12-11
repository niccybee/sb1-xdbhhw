<script setup>
// import { defineModel } from 'vue'

const loading = ref(true)

const props = defineProps({
  // Optional title for the modal
  title: {
    type: String,
    default: ''
  },
  isVisible: {
    type: Boolean,
    default: true
  },
  scrollable: {
    type: Boolean,
    default: false
  },
  fullWidth: {
    type: Boolean,
    default: false
  }
});

const viewOptions = computed(() => {
  const scroll = props.scrollable ? 'overflow-y-scroll' : '';
  const width = props.fullWidth ? 'w-full' : 'w-full max-w-lg mx-auto';
  return `${scroll} ${width}`
})

const emit = defineEmits(['close']);

const close = () => {
  console.log('close emit from component');
  emit('close');
};

onMounted(() => {
  loading.value = false
})

</script>

<template>
  <Teleport to="body">
    <Transition enter-active-class="transition duration-200 ease-out" enter-from-class="transform opacity-0"
      enter-to-class="opacity-100" leave-active-class="transition duration-200 ease-in" leave-from-class="opacity-100"
      leave-to-class="transform opacity-0">
      <div v-if="props.isVisible" class="fixed inset-0 z-50">
        <!-- Backdrop -->
        <div class="fixed inset-0 bg-black bg-opacity-50" @click="close"></div>

        <!-- Modal -->
        <div v-if="loading" class="fixed inset-0 z-50 flex items-center justify-center p-4">
          <LoadSpinner />
        </div>
        <div v-else class=" fixed inset-0 z-50 flex items-center justify-center p-4 ">
          <div class="bg-white rounded-lg shadow-xl w-full max-h-screen my-2 " :class="viewOptions" @click.stop>
            <!-- Header -->
            <div class="flex justify-between items-center p-4 border-b" v-if="title">
              <h3 class="text-lg font-semibold">{{ title }}</h3>
              <button @click="hide" class="text-gray-400 hover:text-gray-500">
                <span class="sr-only">Close</span>
                <div class="i-gg-close text-xl"></div>
              </button>
            </div>

            <!-- Content -->
            <div class="p-4">
              <slot></slot>
            </div>

            <!-- Footer -->
            <div class="p-4 border-t flex justify-end space-x-2">
              <slot name="footer">
                <button @click="close" class="btn btn-secondary">
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