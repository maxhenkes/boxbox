import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Connection,
  EdgeChange,
  NodeChange,
} from "reactflow";

export const createVisualSlice = (set, get) => ({
  nodes: [],
  edges: [],
  id: 0,
  nextId: () => set((state) => ({ id: state.id + 1 })),
  clearNodes: () => {
    set((state) => ({
      nodes: [],
      edges: [],
      id: 0,
    }));
  },
  selected: { hasSelection: false, node: undefined },
  onSelectionChange: (changes: nodeSelection) => {
    set({
      selected: changes,
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
  add: (node: Node) => {
    set({
      nodes: get().nodes.concat(node),
    });
  },
});

type nodeSelection = {
  hasSelection: boolean;
  node: Node;
};
