import { useState, useCallback } from "react";
import ReactFlow, {
  FitViewOptions,
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

function FlowCanvas({ setSelectedID }: FlowCanvasProps) {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onSelectionChange,
  } = useStore();

  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance>();

  const onInit = (rfi: ReactFlowInstance) => setReactFlowInstance(rfi);

  const proOptions = { hideAttribution: true };

  useOnSelectionChange({
    onChange: ({ nodes, edges }) => {
      if (nodes.length > 0) {
        setSelectedID(nodes[0].id);
        onSelectionChange({
          hasSelection: true,
          Node: nodes[0],
        });
      } else {
        setSelectedID("none");
        onSelectionChange({
          hasSelection: false,
          Node: undefined,
        });
      }
    },
  });

  const defaultEdge = {
    type: "step",
  };

  const onSelectionChange2 = () => {};

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onSelectionChange={onSelectionChange2}
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
