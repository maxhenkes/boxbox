import { useState, useCallback, useEffect } from "react";
import ReactFlow, {
  Background,
  ConnectionLineType,
  MiniMap,
  useOnSelectionChange,
} from "reactflow";
import "reactflow/dist/style.css";
import { useDiagramStore } from "../state/store";

import { vmNode } from "./node/vmNode";

const fitViewOptions = {
  padding: 0.2,
};

const nodeTypes = {
  vmNode: vmNode,
};

const onDragOver = (event) => {
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

  const [reactFlowInstance, setReactFlowInstance] = useState();

  const onInit = (rfi) => setReactFlowInstance(rfi);

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

  const onDrop = (event) => {
    event.preventDefault();

    const icon = event.dataTransfer.getData("node/icon");
    const type = event.dataTransfer.getData("node/id");

    if (reactFlowInstance) {
      const position = reactFlowInstance.project({
        x: event.clientX - 120,
        y: event.clientY - 120,
      });

      const newNode = {
        id: "",
        position,
        type: "vmNode",
        data: {
          icon: icon,
          type: type,
          handles: 1,
        },
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
      fitView
      fitViewOptions={fitViewOptions}
      connectionLineType={ConnectionLineType.Step}
      onDragOver={onDragOver}
      onDrop={onDrop}
      nodeTypes={nodeTypes}
    >
      <Background
        variant="cross"
        gap={25}
        size={7}
        lineWidth={0.5}
        color="#81818a"
      />
    </ReactFlow>
  );
}

export default FlowCanvas;
