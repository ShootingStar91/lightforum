
export const Header = () => {
  return (
    <div className="bg-sky-600 p-2 text-sm text-white flex justify-between">
      <HeaderRoute />
      <div className="flex flex-row">
        <div className="my-auto px-4 italic">Logged as User</div>
        <img className="text-white" src="./assets/icons/log-out.svg" alt="Log out"></img>
      </div>
    </div>
  );
};

const HeaderRoute = () => {
  return (
    <div className="my-auto pl-2">Lightforum / Category / Topic title</div>
  );
};
