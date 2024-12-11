
<script setup>
import { ref } from 'vue'
import { VueFlow, useVueFlow } from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import { ControlButton, Controls } from '@vue-flow/controls'
import { MiniMap } from '@vue-flow/minimap'
import FlowIcon from './FlowIcon.vue'
import AINode from './nodes/AINode.vue'

const nodeTypes = {
  ai: AINode
}
import { useFlowsStore } from '~/stores/flows'

const props = defineProps({
  flowId: {
    type: String,
    required: true
  }
})

const flows = useFlowsStore()
const { onPaneReady, onNodeDragStop, onConnect, addEdges } = useVueFlow()

const nodes = ref([])
const edges = ref([])
const dark = ref(false)

const addAINode = () => {
  const newNode = {
    id: `ai-${Date.now()}`,
    type: 'ai',
    position: { x: 100, y: 100 },
    data: {
      prompt: '',
      model: 'gpt-3.5-turbo',
      outputKey: 'aiOutput'
    },
    connections: []
  }
  flows.addNode(newNode)
  nodes.value.push(newNode)
}

const addJSONNode = () => {
  const newNode = {
    id: `json-${Date.now()}`,
    type: 'json',
    position: { x: 300, y: 100 },
    data: {
      input: '',
      operation: 'parse',
      outputKey: 'jsonOutput'
    },
    connections: []
  }
  flows.addNode(newNode)
  nodes.value.push(newNode)
}

const executeFlow = async () => {
  const result = await flows.executeFlow(props.flowId)
  console.log('Flow execution result:', result)
}

onPaneReady(({ fitView }) => {
  fitView()
})

onNodeDragStop(({ node }) => {
  flows.updateNodePosition(node.id, node.position)
})

onConnect((connection) => {
  flows.connectNodes(connection.source, connection.target)
  addEdges(connection)
})
</script>

<template>
  <div class="flow-container">
    <div class="toolbar">
      <button @click="addAINode" class="btn">Add AI Node</button>
      <button @click="addJSONNode" class="btn">Add JSON Node</button>
      <button @click="executeFlow" class="btn primary">Execute Flow</button>
    </div>
    
    <VueFlow v-model="nodes" v-model:edges="edges" :class="{ dark }" class="basicflow" 
      :node-types="nodeTypes" :default-viewport="{ zoom: 1.5 }" :min-zoom="0.2" :max-zoom="4">
      <Background pattern-color="#aaa" :gap="16" />
      <MiniMap />
      <Controls />
    </VueFlow>
  </div>
</template>

<style>
.flow-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.toolbar {
  padding: 1rem;
  display: flex;
  gap: 1rem;
}

.btn {
  padding: 0.5rem 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
}

.btn.primary {
  background: #00DC82;
  color: white;
  border: none;
}
</style>
