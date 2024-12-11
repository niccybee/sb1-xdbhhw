
<script setup>
import { ref } from 'vue';
import { Position, Handle } from '@vue-flow/core';
import { AI_PROVIDERS } from '~/config/ai';

const props = defineProps({
  id: { type: String, required: true },
  data: { type: Object, required: true }
});

const nodeData = ref(props.data);

const models = AI_PROVIDERS.openai.models;
</script>

<template>
  <div class="ai-node">
    <Handle type="target" :position="Position.Top" />
    
    <div class="node-content">
      <h3 class="text-sm font-bold mb-2">AI Node</h3>
      
      <div class="input-group">
        <label class="text-xs">Model</label>
        <select v-model="nodeData.model" class="select-input">
          <option v-for="model in models" :key="model.id" :value="model.id">
            {{ model.name }}
          </option>
        </select>
      </div>

      <div class="input-group">
        <label class="text-xs">System Prompt</label>
        <textarea 
          v-model="nodeData.systemPrompt"
          class="text-input"
          placeholder="Optional system prompt..."
          rows="2"
        ></textarea>
      </div>

      <div class="input-group">
        <label class="text-xs">User Prompt</label>
        <textarea 
          v-model="nodeData.prompt"
          class="text-input"
          placeholder="Enter your prompt..."
          rows="3"
          required
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
.ai-node {
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
