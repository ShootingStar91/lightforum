import { Link, useLocation } from "react-router-dom";
import { useForumContext } from "../App";

export const Header = () => {
  const { user } = useForumContext()
  return (
    <div className="bg-sky-600 p-2 text-sm text-white flex justify-between">
      <HeaderRoute />
      {user ? <LoggedIn username={user.username} /> : <LoggedOut />}
    </div>
  );
};

const LoggedIn = ({ username }: { username: string }) => {
  return (
    <div className="flex flex-row">
      <div className="my-auto px-4 italic">Logged as {username}</div>
      <img
        onClick={() => console.log("logout")}
        className="text-white"
        src="/assets/icons/log-out.svg"
        alt="Log out"
      ></img>
    </div>
  );
};

const LoggedOut = () => {

  return (
    <div className="flex flex-row">
      <Link to="/login"><div className="my-auto px-4 italic">Login</div></Link>
    </div>
  )
};

const HeaderRoute = () => {
  const location = useLocation();
  return (
    <div className="my-auto pl-2 font-bold">
      <Link to="/">Lightforum</Link>{" "}
      {location.pathname !== "/" && (
        <>
          {" "}
          &gt; <Link to="/forum">Category</Link>
        </>
      )}
      {location.pathname.startsWith("/thread/") && <> &gt; Thread title</>}
      {location.pathname.startsWith("/add_forum/") && <> &gt; Add forum</>}
    </div>
  );
};
