import { Link, useLocation } from "react-router-dom";

export const Header = () => {
  return (
    <div className="bg-sky-600 p-2 text-sm text-white flex justify-between">
      <HeaderRoute />
      <div className="flex flex-row">
        <div className="my-auto px-4 italic">Logged as User</div>
        <img
          onClick={() => console.log("logout")}
          className="text-white"
          src="/assets/icons/log-out.svg"
          alt="Log out"
        ></img>
      </div>
    </div>
  );
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
      {location.pathname.startsWith('/topic/') && <> &gt; Topic title</>}
    </div>
  );
};
