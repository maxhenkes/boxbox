import create from "zustand";
import { persist } from "zustand/middleware";
import {
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  addEdge,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  applyNodeChanges,
  applyEdgeChanges,
} from "reactflow";

type nodeSelection = {
  hasSelection: boolean;
  node: Node;
};

type RFState = {
  nodes: Node[];
  edges: Edge[];
  selected: nodeSelection;
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  add: Function;
  clearNodes: Function;
  onSelectionChange: Function;
};

const initialNodes: Node[] = [
  { id: "1", data: { label: "Node 1" }, position: { x: 5, y: 5 } },
  { id: "2", data: { label: "Node 2" }, position: { x: 5, y: 100 } },
];

const initialEdges: Edge[] = [
  { id: "e1-2", source: "1", target: "2", type: "step" },
];

// this is our useStore hook that we can use in our components to get parts of the store and call actions
const useStore = create<RFState>()(
  persist(
    (set, get) => ({
      nodes: [],
      edges: [],
      clearNodes: () => {
        set({
          nodes: [],
        });
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
    }),
    {
      name: "test",
    },
  ),
);

export default useStore;
