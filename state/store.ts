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
import { immer } from "zustand/middleware/immer";
import { filter, omit, remove, unset, set as obSet } from "lodash";

export type vmType = {
  id: string;
  name: string;
  cores?: number;
  cpulimit?: number;
  description?: string;
  freeze?: boolean;
  memory?: number;
  onBoot?: boolean;
  template?: { vmid: string; name: string };
};

export const useDiagramStore = create<any>(
  immer((set, get) => ({
    nodes: [],
    edges: [],
    diagramMap: {},
    lastVmId: 0,
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
    addHandle: (id: string) => {
      set((state) => {
        const index = state.nodes.findIndex((obj: Node) => obj.id === id);
        state.nodes[index].data.handles += 1;
      });
    },
    setData: (id: string, path: string, obj: any) => {
      set((state) => {
        const index = state.nodes.findIndex((obj: Node) => obj.id === id);
        obSet(state.nodes[index].data, path, obj);
      });
    },
    loadFromDB: (dbData) => {
      set((state) => {
        let newData = {};
        dbData.data.forEach((d) => {
          const data = omit(d, [
            "id",
            "internalId",
            "diagramId",
            "templateID",
            "templateName",
          ]);
          obSet(data, "id", d.internalId);

          if (data.templateName) {
            const template = {
              vmid: data.templateID,
              name: data.templateName,
            };
            obSet(data, "template", template);
          }
          obSet(newData, d.internalId, data);
        });
        state.diagramMap = newData;
        state.id = dbData.idCount;
        const dbNodes = [];
        dbData.nodes.forEach((n) => {
          const newNode = {
            id: n.internalId,
            position: { x: n.xPos, y: n.yPos },
            type: "vmNode",
            data: {
              icon: n.dataIcon,
              type: n.dataType,
              label: n.dataLabel,
              handles: n.dataHandles,
              template: n.template,
            },
          };
          dbNodes.push(newNode);
        });
        state.nodes = dbNodes;
        const dbEdges = [];
        dbData.edges.forEach((e) => {
          const newEdge = omit(e, ["id", "internalId"]);
          newEdge.id = e.id;
          dbEdges.push(newEdge);
        });
        state.edges = dbEdges;
      });
    },

    deleteNode: (id: string) => {
      set((state) => {
        const retMap = omit(state.diagramMap, id);
        /* unset(state.diagramMap, id); */
        /* state.onNodesChange([{ id, type: "remove" }]); */

        const retNodes = filter(state.nodes, (n) => {
          return n.id !== id;
        });
        return {
          diagramMap: retMap,
          selectedNode: "",
          nodes: retNodes,
        };
      });
    },
    setNodeLabel: (id: string, label: string) => {
      set((state) => {
        const index = state.nodes.findIndex((obj: Node) => obj.id === id);
        state.diagramMap[id].name = label;
        state.nodes[index].data.label = label;
      });
    },
    onNodesChange: (changes: NodeChange[]) => {
      set((state) => ({
        nodes: applyNodeChanges(changes, state.nodes),
      }));
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
    vmTemplates: [],
    setVmTemplates: (templates) => {
      set((state) => ({
        vmTemplates: templates.result,
        lastVmId: templates.lastVmId,
      }));
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
          description: "",
          onBoot: true,
          cores: 1,
          memory: 1024,
        };

        let returnMap = { ...state.diagramMap };
        returnMap[finalId] = newDataNode;

        return {
          nodes: state.nodes.concat(node),
          diagramMap: returnMap,
        };
      });
    },
    updateDataNode: (id: string, prop: string, obj: any) => {
      set((state) => {
        let node = state.diagramMap[id];
        obSet(node, prop, obj);
        obSet(state.diagramMap, id, node);
      });
    },
    selectedNode: "",
    setSelectedNode: (id: string) => {
      set(() => ({ selectedNode: id }));
    },
  })),
);
