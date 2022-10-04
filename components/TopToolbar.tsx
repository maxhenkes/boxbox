import { Button, ButtonGroup } from "@chakra-ui/react";
import { MouseEventHandler } from "react";
import {
  AiOutlineForm,
  AiOutlineCloudUpload,
  AiOutlineCloudDownload,
  AiOutlineClear,
} from "react-icons/ai";
import SaveButton from "./SaveButton";

import useStore from "../state/store";

type TopToolbarProps = {
  clearCanvas: MouseEventHandler;
};

function TopToolbar({ clearCanvas }: TopToolbarProps): JSX.Element {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, add } =
    useStore();

  const node = {
    id: "3",
    data: { label: "Node NEW" },
    position: { x: 5, y: 5 },
  };

  const test = () => {
    console.log(nodes);
    add(node);
  };

  return (
    <ButtonGroup variant="outline" spacing="3">
      <div draggable onDragStart={(event) => {}}>
        <Button leftIcon={<AiOutlineForm />} colorScheme="blue">
          New
        </Button>
      </div>
      <Button leftIcon={<AiOutlineCloudUpload />}>Load</Button>
      <SaveButton text="Save"></SaveButton>
      <Button leftIcon={<AiOutlineClear />} colorScheme="red" onClick={test}>
        Clear
      </Button>
    </ButtonGroup>
  );
}

export default TopToolbar;
