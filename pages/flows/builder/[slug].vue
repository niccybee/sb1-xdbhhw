
<script setup lang="ts">
const route = useRoute();
const flows = useFlowsStore();
const { currentFlowId } = storeToRefs(flows);

const slug = route.params.slug as string;
const flow = computed(() => flows.flows.find(f => f.slug === slug));

onMounted(async () => {
  if (flow.value) {
    await flows.setCurrentFlow(flow.value.id);
  }
});
</script>

<template>
  <main class="w-full h-full flex flex-col">
    <section v-if="flow" class="w-full h-full bg-white">
      <ClientOnly>
        <Flow :flow-id="flow.id" />
      </ClientOnly>
    </section>
    <section v-else class="p-4">
      <p>Flow not found</p>
    </section>
  </main>
</template>
