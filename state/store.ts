import {
  NodeChange,
  applyNodeChanges,
  EdgeChange,
  applyEdgeChanges,
  Connection,
  addEdge,
  Node,
  Edge,
} from "reactflow";
import create from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export type vmType = {
  id: string;
  name: string;
  iso?: string;
  cores?: number;
  cpulimit?: number;
  description?: string;
  freeze?: boolean;
  memory?: number;
  onBoot?: boolean;
};

export const useDiagramStore = create<any>(
  immer((set, get) => ({
    nodes: [],
    edges: [],
    diagramMap: {},
    id: 1,
    nextId: () =>
      set((state) => {
        state.id++;
      }),
    clearNodes: () => {
      set((state) => ({
        nodes: [],
        edges: [],
        id: 1,
        diagramMap: {},
        selectedNode: "",
      }));
    },
    setNodeLabel: (id: string, label: string) => {
      set((state) => {
        const index = state.nodes.findIndex((obj: Node) => obj.id === id);
        state.diagramMap[id].name = label;
        state.nodes[index].data.label = label;
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

    addHandle: (id: string) => {
      set((state) => {
        const index = state.nodes.findIndex((obj: Node) => obj.id === id);
        state.nodes[index].data.handles = 3;
      });
    },

    addNode: (node: Node) => {
      set((state) => {
        const nodeID = get().id;
        get().nextId();
        const finalId = `node-${nodeID}`;
        const type = node.data.type;
        const newNodeLabel = `${type}-${nodeID}`;
        node.id = finalId;
        node.data.label = newNodeLabel;

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
  })),
);
