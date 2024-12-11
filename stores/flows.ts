import { useStorage } from "@vueuse/core";
import { generateSlug } from "@/utils/genSlug";
import type { FlowNodeType, FlowExecution, AINodeData, JSONNodeData } from '~/types/flowTypes';

interface FlowNode extends FlowNodeType {
  connections: string[];
}

interface FlowEdge {
  id: string;
  source: string;
  target: string;
  type: "conditional" | "json";
  data: any;
}

interface Flow {
  id: string;
  slug: string;
  name: string;
  nodes: FlowNode[];
}

export const useFlowsStore = defineStore("flows", {
  state: () => ({
    flows: useStorage("flows", [] as Flow[]),
    currentFlowId: useStorage("currentFlowId", ""),
  }),
  getters: {
    currentFlow: (state) =>
      state.flows.find((flow) => flow.id === state.currentFlowId),
  },
  actions: {
    async createFlow(name: string) {
      const uuid = generateUUID();
      const slug = generateSlug(name + uuid.slice(0, 4));
      const newFlow: Flow = {
        id: uuid,
        name,
        slug: slug,
        nodes: [],
      };
      this.flows.push(newFlow);
      this.currentFlowId = newFlow.id;
      return newFlow;
    },
    async setCurrentFlow(id: string) {
      this.currentFlowId = id;
      return this.currentFlowId;
    },
    addNode(node: FlowNode) {
      if (!this.currentFlow) return;
      this.currentFlow.nodes.push(node);
    },
    updateNodePosition(nodeId: string, position: { x: number; y: number }) {
      if (!this.currentFlow) return;
      const node = this.currentFlow.nodes.find((n) => n.id === nodeId);
      if (node) {
        node.position = position;
      }
    },
    connectNodes(sourceId: string, targetId: string) {
      if (!this.currentFlow) return;

    async executeFlow(flowId: string) {
      const flow = this.flows.find(f => f.id === flowId);
      if (!flow) return;
      
      const execution: FlowExecution = {
        nodeResults: new Map(),
        currentNodeId: flow.nodes[0]?.id,
        status: 'running'
      };

      for (const node of flow.nodes) {
        try {
          const result = await this.executeNode(node, execution);
          execution.nodeResults.set(node.id, result);
          execution.currentNodeId = node.connections[0];
        } catch (error) {
          execution.status = 'error';
          console.error(`Error executing node ${node.id}:`, error);
          break;
        }
      }
      
      execution.status = 'completed';
      return execution;
    },

    async executeNode(node: FlowNode, execution: FlowExecution) {
      switch (node.type) {
        case 'ai':
          return await this.executeAINode(node.data as AINodeData, execution);
        case 'json':
          return await this.executeJSONNode(node.data as JSONNodeData, execution);
        default:
          throw new Error(`Unknown node type: ${node.type}`);
      }
    },

    async executeAINode(data: AINodeData, execution: FlowExecution) {
      const response = await $fetch('/api/chat', {
        method: 'POST',
        body: {
          messages: [
            ...(data.systemPrompt ? [{role: 'system', content: data.systemPrompt}] : []),
            {role: 'user', content: data.prompt}
          ],
          model: data.model
        }
      });
      return response;
    },

    executeJSONNode(data: JSONNodeData, execution: FlowExecution) {
      const input = execution.nodeResults.get(data.input);
      switch (data.operation) {
        case 'parse':
          return JSON.parse(input);
        case 'stringify':
          return JSON.stringify(input);
        case 'transform':
          if (data.transformRule) {
            const transform = new Function('data', `return ${data.transformRule}`);
            return transform(input);
          }
          return input;
      }
    }

      const sourceNode = this.currentFlow.nodes.find((n) => n.id === sourceId);
      if (sourceNode) {
        sourceNode.connections.push(targetId);
      }
    },
  },
});
