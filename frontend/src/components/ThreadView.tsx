import { useQuery } from "react-query";
import { useParams } from "react-router";
import { getThread } from "../api";
import { useForumContext } from "../App";

const getTimeStamp = () =>
  new Date().toLocaleDateString() + " at " + new Date().toLocaleTimeString();

export const ThreadView = () => {
  const { threadId } = useParams();
  console.log({ threadId })
  if (!threadId) return null
  const id = parseInt(threadId);
  const { data } = useQuery(["thread", id], getThread);
  if (!data) return <p>Loading...</p>
  const { thread, posts } = data
  return (
    <div className="mx-auto w-[80%]">
      <MainPost thread={thread} />
      <div className="bg-sky-200 mt-6">
        {posts.map((post) => (
          <Post post={post} />
        ))}
      </div>
    </div>
  );
};

const MainPost = ({ thread }: { thread: any }) => {
  const { users } = useForumContext();
  console.log({ thread, users })
  const username = users?.find(user => user.id === thread.userId)?.username;
  console.log({ username })
  if (!username) return null
  return (
    <div className="bg-sky-200 mt-16">
      <div className="relative text-white bg-sky-400 flex p-2 pl-8">
        <div className="font-bold">{thread.title}</div>
        <div className="absolute pr-4 right-0">{getTimeStamp()}</div>
      </div>
      <p className="p-8">{thread.content}</p>
      <div className="font-bold text-slate-500 pl-8 pb-4">{username}</div>
    </div>
  );
};

const Post = ({ post }: { post: any }) => {
  return (
    <div className="py-2">
      <p className="p-4 pl-8">{post.content}</p>
      <div className="relative font-bold text-slate-500 pl-8 flex">
        <div>{post.userId}</div>
        <div className="absolute right-0 pr-4">{getTimeStamp()}</div>
      </div>
    </div>
  );
};
