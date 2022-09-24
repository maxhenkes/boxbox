import { useState, useCallback } from "react";
import ReactFlow, {
  addEdge,
  FitViewOptions,
  applyNodeChanges,
  applyEdgeChanges,
  Node,
  Edge,
  NodeChange,
  EdgeChange,
  Connection,
  ReactFlowInstance,
  Background,
} from "react-flow-renderer";

const initialNodes: Node[] = [
  { id: "1", data: { label: "Node 1" }, position: { x: 5, y: 5 } },
  { id: "2", data: { label: "Node 2" }, position: { x: 5, y: 100 } },
];

const initialEdges: Edge[] = [
  { id: "e1-2", source: "1", target: "2", type: "step" },
];

const fitViewOptions: FitViewOptions = {
  padding: 0.2,
};

let id = 0;
const getId = () => {
  id++;
  return id;
};

const onDragOver = (event: DragEvent) => {
  event.preventDefault();
  console.log("drag");
};

type FlowCanvasProps = {
  setSelectedID: Function;
  clearCanvas: Function;
};

function FlowCanvas({ setSelectedID, clearCanvas }: FlowCanvasProps) {
  const [selected, setSelected] = useState("");

  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance>();
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);

  const onInit = (rfi: ReactFlowInstance) => setReactFlowInstance(rfi);

  const onDrop = (event: DragEvent) => {
    event.preventDefault();
    if (reactFlowInstance) {
      const position = reactFlowInstance.project({
        x: event.clientX - 120,
        y: event.clientY - 120,
      });
      const newNode: Node = {
        id: `test${getId()}`,
        type: "input",
        position,
        data: { label: `test` },
      };
      setNodes((nds) => nds.concat(newNode));
    }
  };

  const test = (changes) => {
    if (changes && changes.nodes.length > 0) {
      const nodeID = changes.nodes[0].id;

      setSelected(nodeID);
      setSelectedID(nodeID);
    }
  };

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => {
      console.log(changes);
      if (changes.length === 1) {
        if (changes[0].type === "select") {
          if (changes[0].selected === false) {
            setSelectedID("none");
          }
        }
      }
      setNodes((nds) => applyNodeChanges(changes, nds));
    },
    [setNodes],
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      console.log("edge");
      setEdges((eds) => applyEdgeChanges(changes, eds));
    },
    [setEdges],
  );
  const onConnect = useCallback(
    (connection: Connection) => {
      console.log("connect");
      setEdges((eds) => addEdge(connection, eds));
    },
    [setEdges],
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onSelectionChange={test}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onInit={onInit}
      onDrop={onDrop}
      snapToGrid={true}
      fitView
      fitViewOptions={fitViewOptions}
      onDragOver={onDragOver}
    >
      <Background variant="dots" size={0.5} color="#81818a" />
    </ReactFlow>
  );
}

export default FlowCanvas;
