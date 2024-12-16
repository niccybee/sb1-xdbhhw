<script setup lang="ts">
const router = useRouter();
const flows = useFlowsStore();
const ui = useUIStore();
const flowName = ref('');

onMounted(async () => {
  ui.isFlowsLoading = false;
});

const handleCreate = async (name: string) => {
  const flow = await flows.createFlow(name);
  console.log('created flow: ', flow);
  await flows.setCurrentFlow(flow.id)
  ui.showFlowCreator = false;
  router.push(`flows/builder/${flow.slug}`);
}

const handleOpen = async (flow: Flow) => {
  await flows.setCurrentFlow(flow.id);
  router.push(`/flows/builder/${flow.slug}`);
}



</script>
<template>
  <main class="w-full h-full flex flex-col">
    <NB2Modal :is-visible="ui.showFlowCreator" @close="ui.showFlowCreator = false">
      <h2 class="text-lg font-semibold mb-2">Create a new flow</h2>
      <p>
        Create a new flow below.
      </p>
      <div class="flex gap-2 py-4 w-full border-y-1 border-gray-200" my-2>
        <input type="text" v-model="flowName" class="input flex-grow" placeholder="Name your flow..." />
        <NBButton @click="handleCreate(flowName)" class="btn gradient text-white" text="Create Flow" />
      </div>
    </NB2Modal>
    <h1 class="text-2xl font-bold my-4 px-4">Flows</h1>
    <section v-if="ui.isFlowsLoading" class="w-full flex items-start justify-start h-full gap-3 p-4">
      <NBCard v-for="i in 3" :key="i"
        class="card bg-gray-100 animate-pulse flex flex-col items-start justify-center px-4 py-2 min-w-48 min-h-36">
        <div class="w-24 h-4 bg-gray-200 rounded mb-2"></div>
        <div class="w-32 h-4 bg-gray-200 rounded"></div>
      </NBCard>
    </section>
    <section v-else class="w-full flex items-start justify-start h-full gap-3 p-4">
      <NBCard
        class="card bg-white hover:gradient hover:text-white flex items-center justify-center px-4 py-2 hover:bg-grey-1 shadow-1 min-w-48 min-h-36 cursor-pointer"
        @click="ui.showFlowCreator = true">
        <div class="i-gg-math-plus"></div>
        <p>New</p>
      </NBCard>
      <NBCard
        class="card bg-white flex flex-col items-start justify-center px-4 py-2 hover:bg-grey-1 shadow-1 min-w-48 min-h-36 cursor-pointer relative hover:border-1 hover:border-blue-300"
        v-for="flow in flows.flows">
        <div @click="handleOpen(flow)" class="i-gg-arrow-long-down-e absolute top-2 left-1 bg-gray-700"></div>
        <p @click="handleOpen(flow)" class="text-xs text-gray-500">{{ flow.id }}</p>
        <p @click="handleOpen(flow)">{{ flow.name ? flow.name : 'Unnamed Flow' }}</p>
        <NBEditBox :model="flow.name"></NBEditBox>
        <div @click="handleOpen(flow)" class="i-gg-chevron-right absolute bottom-2 right-1 bg-gray-700"></div>
      </NBCard>
    </section>
  </main>
</template>
<style scoped></style>