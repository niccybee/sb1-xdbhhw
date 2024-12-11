
<script setup>
import { ref, computed } from 'vue';
import { Position, Handle } from '@vue-flow/core';
import { useFlowsStore } from '~/stores/flows';

const props = defineProps({
  id: { type: String, required: true },
  data: { type: Object, required: true }
});

const flows = useFlowsStore();
const nodeData = ref(props.data);

const availableInputs = computed(() => {
  if (!flows.currentFlow) return [];
  return flows.currentFlow.nodes
    .filter(n => n.id !== props.id)
    .map(n => ({
      id: n.id,
      label: `${n.type.toUpperCase()} - ${n.data.outputKey || n.id}`
    }));
});
</script>

<template>
  <div class="json-node">
    <Handle type="target" :position="Position.Top" />
    
    <div class="node-content">
      <h3 class="text-sm font-bold mb-2">JSON Node</h3>
      
      <div class="input-group">
        <label class="text-xs">Operation</label>
        <select v-model="nodeData.operation" class="select-input">
          <option value="parse">Parse</option>
          <option value="stringify">Stringify</option>
          <option value="transform">Transform</option>
        </select>
      </div>

      <div class="input-group">
        <label class="text-xs">Input Source</label>
        <select v-model="nodeData.input" class="select-input">
          <option v-for="input in availableInputs" :key="input.id" :value="input.id">
            {{ input.label }}
          </option>
        </select>
      </div>

      <div class="input-group" v-if="nodeData.operation === 'transform'">
        <label class="text-xs">Transform Rule</label>
        <textarea 
          v-model="nodeData.transformRule"
          class="text-input"
          placeholder="data => data.property"
          rows="2"
        ></textarea>
      </div>

      <div class="input-group">
        <label class="text-xs">Output Key</label>
        <input 
          v-model="nodeData.outputKey"
          class="text-input"
          placeholder="Name for output variable..."
        />
      </div>
    </div>

    <Handle type="source" :position="Position.Bottom" />
  </div>
</template>

<style scoped>
.json-node {
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 12px;
  min-width: 240px;
}

.node-content {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.text-input, .select-input {
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 12px;
}

.text-input:focus, .select-input:focus {
  outline: none;
  border-color: #00DC82;
}
</style>
