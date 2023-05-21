// import { fakeData } from "./fakedata";
import "./index.css";
import "./basic.css";
import { Menu } from "./Menu";

const App = () => {
  return (
    <div className="grid grid-cols-basic">
      <Menu />
      Version 0.02
      <div className="main-div"></div>
    </div>
  );
};

export default App;
