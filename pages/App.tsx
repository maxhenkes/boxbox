import { NextPage } from "next";
import NavBar from "../components/nav/NavBar";
import MainView from "./canvas";

const App: NextPage = () => {
  return (
    <div>
      <NavBar />
      <MainView />
    </div>
  );
};

export default App;
