import type { NextPage } from "next";
import { useState } from "react";
import FlowCanvas from "../components/FlowCanvas";
import TopToolbar from "../components/TopToolbar";
import DetailView, {
  type TextType,
  type DetailViewProps,
} from "../components/DetailView";
import {
  Grid,
  GridItem,
  Button,
  Center,
  Container,
  Flex,
} from "@chakra-ui/react";

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

  return (
    <Grid
      templateAreas={`"toolbar toolbar"
                  "canvas detail"
                  "canvas footerToolbar"`}
      gridTemplateRows="60px 1fr 7%"
      gridTemplateColumns="1fr 22%"
      h="100vh"
      gap="0.5"
      color="blackAlpha.700"
    >
      <GridItem bg="orange.300" area="toolbar">
        <Flex minHeight="100%" alignItems="center" justifyContent="left" pl={3}>
          <TopToolbar />
        </Flex>
      </GridItem>
      <GridItem bg="gray.200" area="canvas">
        <FlowCanvas setSelectedID={setSelected} />
      </GridItem>
      <GridItem pl="2" bg="green.300" area="detail">
        <DetailView fields={details} />
      </GridItem>
      <GridItem bg="blue.300" area="footerToolbar">
        <Center w="100%" h="100%">
          <Button>Create on Proxmox</Button>
        </Center>
      </GridItem>
    </Grid>
  );
};

export default MainView;
