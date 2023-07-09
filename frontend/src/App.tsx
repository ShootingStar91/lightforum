import "./index.css";
import "./basic.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoginPage } from "./components/LoginPage";
import { Header } from "./components/Header";
import { ForumView } from "./components/ForumView";
import { FrontPage } from "./components/FrontPage";
import { TopicView } from "./components/TopicView";

const App = () => {
  return (
    <Router>
      <div className="grid grid-cols-basic">
        <div></div>
        <div className="main-div flex flex-col">
          <Header />
          <div className="p-4 min-h-[600px]">
            <Routes>
              <Route path="/" element={<FrontPage />} />
              <Route path="forum" element={<ForumView />}></Route>
              <Route path="topic">
                <Route path=":topicId" element={<TopicView />} />
              </Route>
              <Route path="/login" element={<LoginPage />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
