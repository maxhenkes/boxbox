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
  ConnectionLineType,
  useOnSelectionChange,
} from "reactflow";
import "reactflow/dist/style.css";

import useStore from "../state/store";

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
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect } = useStore();

  const [selected, setSelected] = useState("");

  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance>();

  const onInit = (rfi: ReactFlowInstance) => setReactFlowInstance(rfi);

  const proOptions = { hideAttribution: true };

  const defaultEdge = {
    type: "step",
  };

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onInit={onInit}
      proOptions={proOptions}
      defaultEdgeOptions={defaultEdge}
      snapToGrid={true}
      fitView
      fitViewOptions={fitViewOptions}
      connectionLineType={ConnectionLineType.Step}
      onDragOver={onDragOver}
    >
      <Background variant="dots" size={0.5} color="#81818a" />
    </ReactFlow>
  );
}

export default FlowCanvas;
