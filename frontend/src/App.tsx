// import { fakeData } from "./fakedata";
import "./index.css";
import "./basic.css";
import { Menu } from "./Menu";

const App = () => {
  return (
    <div className="grid grid-cols-basic">
      <Menu />
      <div className="main-div">Version 0.04</div>
    </div>
  );
};

export default App;
