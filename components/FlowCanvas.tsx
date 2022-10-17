import { useState, useCallback, useEffect } from "react";
import ReactFlow, {
  FitViewOptions,
  ReactFlowInstance,
  Background,
  ConnectionLineType,
  useOnSelectionChange,
} from "reactflow";
import "reactflow/dist/style.css";
import { useDiagramStore } from "../state/store";

import vmNode from "./node/vmNode";

const fitViewOptions: FitViewOptions = {
  padding: 0.2,
};

const nodeTypes = {
  vmNode: vmNode,
};

const onDragOver = (event: DragEvent) => {
  event.preventDefault();
};

function FlowCanvas() {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    setSelectedNode,
    addNode,
  } = useDiagramStore((state) => ({
    nodes: state.nodes,
    edges: state.edges,
    onNodesChange: state.onNodesChange,
    onEdgesChange: state.onEdgesChange,
    onConnect: state.onConnect,
    setSelectedNode: state.setSelectedNode,
    addNode: state.addNode,
  }));

  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance>();

  const onInit = (rfi: ReactFlowInstance) => setReactFlowInstance(rfi);

  const proOptions = { hideAttribution: true };

  useOnSelectionChange({
    onChange: ({ nodes, edges }) => {
      if (nodes.length > 0) {
        setSelectedNode(nodes[0].id);
      } else {
        setSelectedNode("none");
      }
    },
  });

  const onDrop = (event: DragEvent) => {
    event.preventDefault();
    if (reactFlowInstance) {
      const position = reactFlowInstance.project({
        x: event.clientX - 120,
        y: event.clientY - 120,
      });

      const newNodeLabel = "Test";

      const newNode: Node = {
        id: "",
        position,
        data: { label: newNodeLabel },
      };

      addNode(newNode);
    }
  };

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
      onDrop={onDrop}
      nodeTypes={nodeTypes}
    >
      <Background variant="lines" size={0.1} color="#81818a" />
    </ReactFlow>
  );
}

export default FlowCanvas;
