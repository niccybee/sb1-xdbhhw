
export interface AINodeData {
  prompt: string;
  model: string;
  systemPrompt?: string;
  outputKey: string;
}

export interface JSONNodeData {
  input: string;
  operation: 'parse' | 'stringify' | 'transform';
  transformRule?: string;
  outputKey: string;
}

export type NodeData = AINodeData | JSONNodeData;

export interface FlowNodeType {
  id: string;
  type: 'ai' | 'json';
  position: { x: number; y: number };
  data: NodeData;
}

export interface FlowExecution {
  nodeResults: Map<string, any>;
  currentNodeId: string;
  status: 'running' | 'completed' | 'error';
}
