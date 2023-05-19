interface MenuItemType {
  title: string;
}

const menuItems: MenuItemType[] = [{ title: "User page" }, { title: "Forum" }];

export const Menu = () => {
  return (
    <div className="bg-sky-50 border flex w-[300px] py-2 my-auto ml-auto mr-4 flex flex-col">
        <div className="bg-slate-100 py-2 container text-center">Viewing as guest</div>
      {menuItems.map((item) => (
        <MenuItem item={item} />
      ))}
    </div>
  );
};

const MenuItem = ({ item }: { item: MenuItemType }) => {
  return (
    <div className="container text-xl bg-sky-100 mt-2 hover:text-amber-200 p-2 content-center text-center">
      <a href="">{item.title}</a>
    </div>
  );
};
