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
          <Category
            key={id}
            title={title}
            description={description}
            forumId={id}
          />
        ))}
        <Link
          to="/add_forum/"
          className="hover:bg-sky-200 font-bold bg-sky-400 mt-8"
        >
          Add forum
        </Link>
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
  const threadsOfForum = threads.filter((thread) => thread.forumId === forumId);
  return (
    <div
      className="border-2 border-sky-200 mt-4 text-slate-700"
      key={forumId}
    >
      <div className="bg-sky-200 p-1 px-2">
        <div className="font-bold text-lg">{title}</div>
        <div className="text-slate-500">{description}</div>
      </div>
      {!threadsOfForum.length ? (
        <div className="w-full px-2">
          No threads in this category yet
        </div>
      ) : (
        threadsOfForum.map((thread, index) => (
          <Thread key={index} thread={thread} index={index} />
        ))
      )}
    </div>
  );
};

const Thread = ({ thread, index }: { thread: any; index: number }) => {
  const color = index % 2 ? "bg-sky-50" : "bg-sky-100";
  const className = "w-full hover:bg-sky-200 hover:text-black px-2 " + color;
  return (
    <Link
      key={index}
      className={className}
      style={{ display: "inline-block" }}
      to={`/thread/${thread.id}`}
    >
      {thread.title}
    </Link>
  );
};
