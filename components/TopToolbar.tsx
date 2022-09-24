import { Button, ButtonGroup } from "@chakra-ui/react";
import { MouseEventHandler } from "react";
import {
  AiOutlineForm,
  AiOutlineCloudUpload,
  AiOutlineCloudDownload,
  AiOutlineClear,
} from "react-icons/ai";

type TopToolbarProps = {
  clearCanvas: MouseEventHandler;
};

function TopToolbar({ clearCanvas }: TopToolbarProps): JSX.Element {
  return (
    <ButtonGroup variant="outline" spacing="3">
      <div draggable onDragStart={(event) => {}}>
        <Button leftIcon={<AiOutlineForm />} colorScheme="blue">
          New
        </Button>
      </div>
      <Button leftIcon={<AiOutlineCloudUpload />}>Load</Button>
      <Button leftIcon={<AiOutlineCloudDownload />}>Save</Button>
      <Button
        leftIcon={<AiOutlineClear />}
        colorScheme="red"
        onClick={clearCanvas}
      >
        Clear
      </Button>
    </ButtonGroup>
  );
}

export default TopToolbar;
