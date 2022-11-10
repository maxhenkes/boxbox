import { Select } from "@chakra-ui/react";
import { off } from "process";
import { useEffect, useState } from "react";
import { useDiagramStore } from "../lib/store";

export const TemplateSelector = () => {
  const {
    selectedNode,
    setData,
    vmTemplates,
    setVmTemplates,
    nodes,
    updateDataNode,
  } = useDiagramStore((state) => ({
    selectedNode: state.selectedNode,
    setData: state.setData,
    vmTemplates: state.vmTemplates,
    setVmTemplates: state.setVmTemplates,
    nodes: state.nodes,
    updateDataNode: state.updateDataNode,
  }));

  const onTemplateChange = (event) => {
    setSelectedTemplate(event.target.value);
    setData(selectedNode, "template", event.target.value);

    const vmTemp = vmTemplates.find((o) => o.name === event.target.value);
    if (vmTemp) {
      updateDataNode(selectedNode, "template", vmTemp);
    } else {
      updateDataNode(selectedNode, "template", {});
    }
  };

  const index = nodes.findIndex((obj) => obj.id === selectedNode);

  const nodeTemplate = nodes[index].data?.template
    ? nodes[index].data.template
    : "";

  const [selectedTemplate, setSelectedTemplate] = useState(nodeTemplate);

  useEffect(() => {
    if (vmTemplates.length === 0) {
      const url = "/api/proxmox/templates";

      const fetchTemplates = async () => {
        try {
          const response = await fetch(url);
          const json = await response.json();
          setVmTemplates(json);
        } catch (error) {
          console.error(error);
        }
      };
      fetchTemplates();
    }
  }, []);

  return (
    <>
      <Select
        onChange={onTemplateChange}
        value={nodeTemplate}
        placeholder="Select Template"
      >
        {vmTemplates.map((t) => {
          return <option value={t.name}>{t.name}</option>;
        })}
      </Select>
    </>
  );
};
