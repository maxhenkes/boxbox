import { useState, useCallback, useEffect } from "react";
import ReactFlow, {
  FitViewOptions,
  ReactFlowInstance,
  Background,
  ConnectionLineType,
  useOnSelectionChange,
} from "reactflow";
import "reactflow/dist/style.css";
import { vmType } from "../state/dataSlice";
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

type FlowCanvasProps = {
  setSelectedID: Function;
};

function FlowCanvas({ setSelectedID }: FlowCanvasProps) {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onSelectionChange,
    add,
    nextId,
    id,
  } = useDiagramStore((state) => ({
    nodes: state.nodes,
    edges: state.edges,
    onNodesChange: state.onNodesChange,
    onEdgesChange: state.onEdgesChange,
    onConnect: state.onConnect,
    onSelectionChange: state.onSelectionChange,
    add: state.add,
    nextId: state.nextId,
    id: state.id,
  }));

  const { addDataNode } = useDiagramStore((state) => ({
    addDataNode: state.addDataNode,
  }));

  const [localNodes, setLocalNodes] = useState();
  const [localEdges, setlocalEdges] = useState();
  const [currentId, setCurrentId] = useState();

  useEffect(() => {
    setCurrentId(id);
  }, [id]);

  useEffect(() => {
    setLocalNodes(nodes);
  }, [nodes]);
  useEffect(() => {
    setlocalEdges(edges);
  }, [edges]);

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

  const onDrop = (event: DragEvent) => {
    event.preventDefault();
    if (reactFlowInstance) {
      const position = reactFlowInstance.project({
        x: event.clientX - 120,
        y: event.clientY - 120,
      });

      const newNodeLabel = "Test";

      const newNode: Node = {
        id: `node-${currentId}`,
        position,
        data: { label: newNodeLabel },
      };

      const newDataNode: vmType = {
        id,
        name: newNodeLabel,
      };

      add(newNode);
      addDataNode(newDataNode);
      nextId();
    }
  };

  const defaultEdge = {
    type: "step",
  };

  const onSelectionChange2 = () => {};

  return (
    <ReactFlow
      nodes={localNodes}
      edges={localEdges}
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
