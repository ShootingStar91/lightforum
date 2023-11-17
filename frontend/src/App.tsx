import "./index.css";
import "./basic.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoginPage } from "./components/LoginPage";
import { Header } from "./components/Header";
import { ForumView } from "./components/ForumView";
import { FrontPage } from "./components/FrontPage";
import { ThreadView } from "./components/ThreadView";
import { useQuery } from "react-query";
import { createContext, useContext } from "react";
import { getForums, getThreads, getUsers } from "./api";
import { ForumType, ThreadType, UserType } from "./types";
import { AddForum } from "./components/AddForum";
import { NewThread } from "./components/NewThread";

export const ForumContext = createContext({
  forums: null,
  users: null,
  threads: null,
} as {
  forums: null | undefined | [ForumType];
  users: null | undefined | [UserType];
  threads: null | undefined | [ThreadType];
});

export const useForumContext = () => useContext(ForumContext);

const App = () => {
  const { data: forums } = useQuery("forums", getForums);
  const { data: users } = useQuery("users", getUsers);
  const { data: threads } = useQuery("threads", getThreads);

  const forumContext = {
    forums,
    users,
    threads,
  };

  return (
    <Router>
      <ForumContext.Provider value={forumContext}>
        <div className="grid grid-cols-basic">
          <div></div>
          <div className="main-div flex flex-col">
            <Header />
            <div className="p-4 min-h-[600px]">
              <Routes>
                <Route path="/" element={<FrontPage />} />
                <Route path="forum" element={<ForumView />}>
                  <Route path=":forumId"></Route>
                </Route>
                <Route path="new_thread/:forumId" element={<NewThread />} />
                <Route path="thread">
                  <Route path=":threadId" element={<ThreadView />} />
                </Route>
                <Route path="/add_forum" element={<AddForum />} />
                <Route path="/login" element={<LoginPage />} />
              </Routes>
            </div>
          </div>
        </div>
      </ForumContext.Provider>
    </Router>
  );
};

export default App;
