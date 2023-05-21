interface MenuItemType {
  title: string;
}

const menuItems: MenuItemType[] = [{ title: "User page" }, { title: "Forum" }];

export const Menu = () => {
  return (
    <div className="bg-sky-50 border flex min-w-[250px] py-2 my-auto ml-auto mr-4 flex flex-col">
        <div className="bg-sky-600 py-1 container text-center text-xs italic text-slate-200">Viewing as guest</div>
      {menuItems.map((item) => (
        <MenuItem item={item} />
      ))}
    </div>
  );
};

const MenuItem = ({ item }: { item: MenuItemType }) => {
  return (
    <div className="container bg-sky-600 text-white mt-2 hover:text-amber-200 p-2 content-center text-center text-sm">
      {item.title}
    </div>
  );
};
