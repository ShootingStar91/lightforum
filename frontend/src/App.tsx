// import { fakeData } from "./fakedata";
import "./index.css";
import "./basic.css";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";

const App = () => {
  return (
    <div className="grid grid-cols-basic">
      <div></div>
      <div className="main-div flex flex-col mt-2">
        <Header />
        <div className="p-4 min-h-[600px]">Hello!</div>
        <Footer />
      </div>
    </div>
  );
};

export default App;
