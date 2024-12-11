<script setup lang="ts">
const route = useRoute();
const { currentFlowId } = storeToRefs(useFlowsStore());

const id = route.params.id;

const flows = useFlowsStore();


</script>
<template>
  <main class="w-full h-full flex flex-col"">
          <section>
            <div>
              <p>ID: {{ id }}</p>
              <p>Flows: {{ currentFlowId }}</p>
            </div>
          </section>
          <section class=" w-full h-full bg-white">
    <ClientOnly>
      <Flow :open="true"></Flow>
    </ClientOnly>
    </section>
  </main>
</template>
<style scoped></style>