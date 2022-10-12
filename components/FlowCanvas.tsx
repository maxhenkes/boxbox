import { useState, useCallback, useEffect } from "react";
import ReactFlow, {
  FitViewOptions,
  ReactFlowInstance,
  Background,
  ConnectionLineType,
  useOnSelectionChange,
} from "reactflow";
import "reactflow/dist/style.css";

import useStore from "../state/store";
import vmNode from "./node/vmNode";

const fitViewOptions: FitViewOptions = {
  padding: 0.2,
};

const nodeTypes = {
  vmNode: vmNode,
};

let id = 0;
const getId = () => {
  id++;
  return id;
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
  } = useStore((state) => ({
    nodes: state.nodes,
    edges: state.edges,
    onNodesChange: state.onNodesChange,
    onEdgesChange: state.onEdgesChange,
    onConnect: state.onConnect,
    onSelectionChange: state.onSelectionChange,
    add: state.add,
  }));

  const [localNodes, setLocalNodes] = useState();
  const [localEdges, setlocalEdges] = useState();

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

  const onDrop = useCallback(
    (event: DragEvent) => {
      event.preventDefault();
      if (reactFlowInstance) {
        const position = reactFlowInstance.project({
          x: event.clientX - 120,
          y: event.clientY - 120,
        });

        const newNode: Node = {
          id: `test${getId()}`,
          position,
          type: "vmNode",
          data: { label: `test` },
        };
        add(newNode);
      }
    },
    [reactFlowInstance],
  );

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
