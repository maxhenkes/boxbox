import nodeTest from "node:test";
import {
  NodeChange,
  applyNodeChanges,
  EdgeChange,
  applyEdgeChanges,
  Connection,
  addEdge,
} from "reactflow";
import create from "zustand";
import { persist } from "zustand/middleware";

export type vmType = {
  id: string;
  name: string;
  cores?: number;
  cpulimit?: number;
  description?: string;
  freeze?: boolean;
  memory?: number;
  onBoot?: boolean;
};

export const useDiagramStore = create<any>((set, get) => ({
  nodes: [],
  edges: [],
  diagramMap: {},
  id: 0,
  nextId: () => set((state) => ({ id: state.id + 1 })),
  clearNodes: () => {
    set((state) => ({
      nodes: [],
      edges: [],
      id: 0,
    }));
  },
  setNodeLabel: (id: string, label: string) => {
    set((state) => {
      const arr = state.nodes;
      const index = arr.findIndex((obj: Node) => obj.id === id);
      arr[index].data.label = label;
      return { nodes: arr };
    });
  },
  onNodesChange: (changes: NodeChange[]) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  onEdgesChange: (changes: EdgeChange[]) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  onConnect: (connection: Connection) => {
    set({
      edges: addEdge(connection, get().edges),
    });
  },
  addNode: (node: Node) => {
    set((state) => {
      const nodeID = get().id;
      get().nextId();
      const finalId = `node-${nodeID}`;

      node.id = finalId;
      const newNodeLabel = "Test";

      const newDataNode: vmType = {
        id: finalId,
        name: newNodeLabel,
      };

      let returnMap = { ...state.diagramMap };
      returnMap[finalId] = newDataNode;

      return {
        nodes: state.nodes.concat(node),
        diagramMap: returnMap,
      };
    });
  },
  selectedNode: "",
  setSelectedNode: (id: string) => {
    set(() => ({ selectedNode: id }));
  },
  removeDataNode: (id: string) =>
    set((state) => ({ diagramMap: state.diagramMap.delete(id) })),
  updateDataNode: (vm: vmType) =>
    set((state) => ({ diagramMap: state.diagramMap.set(vm.id, vm) })),
  clearData: () => set((state) => ({ diagramMap: new Map<string, vmType>() })),
}));
