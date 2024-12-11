import { useStorage } from "@vueuse/core";
import { generateSlug } from "@/utils/genSlug";
interface FlowNode {
  id: string;
  type: "ai" | "conditional" | "json";
  position: { x: number; y: number };
  data: any;
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
      const sourceNode = this.currentFlow.nodes.find((n) => n.id === sourceId);
      if (sourceNode) {
        sourceNode.connections.push(targetId);
      }
    },
  },
});
