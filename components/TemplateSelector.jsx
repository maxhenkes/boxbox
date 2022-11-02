import { Select } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export const TemplateSelector = () => {
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    const url = "/api/proxmox/templates";

    const fetchTemplates = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setTemplates(json);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTemplates();
  }, []);

  console.log();
  return (
    <>
      <Select placeholder="Select Template">
        {templates.map((t) => {
          return <option value={t.name}>{t.name}</option>;
        })}
      </Select>
    </>
  );
};
