import { Button, ButtonGroup } from "@chakra-ui/react";
import {
  AiOutlineForm,
  AiOutlineCloudUpload,
  AiOutlineCloudDownload,
  AiOutlineClear,
} from "react-icons/ai";

function TopToolbar(): JSX.Element {
  return (
    <ButtonGroup variant="outline" spacing="3">
      <div draggable onDragStart={(event) => {}}>
        <Button leftIcon={<AiOutlineForm />} colorScheme="blue">
          New
        </Button>
      </div>
      <Button leftIcon={<AiOutlineCloudUpload />}>Load</Button>
      <Button leftIcon={<AiOutlineCloudDownload />}>Export</Button>
      <Button leftIcon={<AiOutlineClear />} colorScheme="red">
        Clear
      </Button>
    </ButtonGroup>
  );
}

export default TopToolbar;
