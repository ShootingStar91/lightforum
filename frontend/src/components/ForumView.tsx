import { Link } from "react-router-dom";

export const ForumView = () => {
  return (
    <div>
      <h1>Forum categories</h1>
      <div className="mx-auto flex flex-col w-[600px]">
        <Category title="General discussion" />
        <Category title="AI hype" />
      </div>
    </div>
  );
};

const Category = ({ title }: { title: string }) => {
  return (
    <div className="border-1 border-slate-200 mt-4 text-slate-700">
      <div className="bg-sky-200 p-1 px-2 font-bold">{title}</div>
      <Topic topic="Topic" index={0} />
      <Topic topic="Topic" index={1} />
      <Topic topic="Topic" index={2} />
      <Topic topic="Topic" index={3} />
      <Topic topic="Topic" index={4} />
    </div>
  );
};

const Topic = ({ topic, index }: { topic: string; index: number }) => {
  const color = index % 2 ? "bg-sky-50" : "bg-sky-100";
  const className = "w-full hover:bg-sky-200 hover:text-black px-2 " + color;
  return (
    <Link className={className} style={{ display: 'inline-block' }} to={`/topic/${index}`}>
      {topic + index}
    </Link>
  );
};
