import type { NextPage } from "next";
import { useState } from "react";
import FlowCanvas from "../components/FlowCanvas";
import TopToolbar from "../components/TopToolbar";
import DetailView, {
  type TextType,
  type DetailViewProps,
} from "../components/DetailView";
import { VStack, Flex, Box } from "@chakra-ui/react";

const MainView: NextPage = () => {
  const initialDetail: TextType = { id: "test", label: "Node none" };
  const initialDetailProp: DetailViewProps = [initialDetail];
  const [details, setDetails] = useState(initialDetailProp);

  const createDetail = (id: string) => {
    const detail: TextType = { id, label: `Node ${id}` };
    const detailProp: DetailViewProps = [detail];
    setDetails(detailProp);
  };

  const setSelected = (data) => {
    createDetail(data);
  };

  const onClearCanvas = (data) => {
    console.log(data);
  };

  return (
    <VStack>
      <TopToolbar clearCanvas={onClearCanvas} />
      <Flex minWidth="100vw" minHeight="100vh" direction="row" gap={0}>
        <Box bg="gray.600" w="77vw">
          <FlowCanvas setSelectedID={setSelected} />
        </Box>
        <Box bg="gray.700" minWidth="23vw">
          <DetailView fields={details} />
        </Box>
      </Flex>
    </VStack>
  );
};

export default MainView;
