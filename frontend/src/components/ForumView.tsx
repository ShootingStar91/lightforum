import { Link } from "react-router-dom";
import { useForumContext } from "../App";

export const ForumView = () => {
  const { forums } = useForumContext();

  if (!forums) return <p>Loading...</p>;

  return (
    <div>
      <h1>Forum categories</h1>
      <div className="mx-auto flex flex-col w-[600px]">
        {forums.map(({ description, title, id }) => (
          <Category title={title} description={description} forumId={id} />
        ))}
      </div>
    </div>
  );
};

const Category = ({
  title,
  description,
  forumId,
}: {
  title: string;
  description: string;
  forumId: number;
}) => {
  const { threads } = useForumContext();

  if (!threads) return <p>Loading...</p>;

  return (
    <div className="border-1 border-slate-200 mt-4 text-slate-700">
      <div className="bg-sky-200 p-1 px-2 font-bold">
        {title}: {description}
      </div>
      {threads
        .filter((thread) => thread.forumId === forumId)
        .map((thread, index) => (
          <Thread thread={thread} index={index} />
        ))}
    </div>
  );
};

const Thread = ({ thread, index }: { thread: any; index: number }) => {
  const color = index % 2 ? "bg-sky-50" : "bg-sky-100";
  const className = "w-full hover:bg-sky-200 hover:text-black px-2 " + color;
  return (
    <Link
      className={className}
      style={{ display: "inline-block" }}
      to={`/thread/${thread.id}`}
    >
      {thread.title}
    </Link>
  );
};
