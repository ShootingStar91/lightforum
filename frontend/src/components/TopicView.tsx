const posts = [
  {
    title: "Hello AI",
    user: "Non-bot user",
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. In semper lacinia urna sed elementum. Donec at ullamcorper nisi. Nunc imperdiet sapien nunc, ac imperdiet turpis malesuada quis. Nulla hendrerit dictum leo. Sed a placerat lacus. Aenean pulvinar ultricies ultrices. Nulla facilisi. Duis velit ex, venenatis vel felis quis, pharetra molestie dolor. Proin et purus viverra, ultricies urna eu, placerat velit. Maecenas a odio aliquet velit consectetur vestibulum.

    Suspendisse vulputate gravida congue. Quisque sed mattis lectus, at eleifend augue. Nunc ac felis tortor. Curabitur ornare lacus ut felis molestie volutpat. Aliquam et viverra risus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Morbi a turpis eget ante sollicitudin mollis. Aenean nec metus sed libero malesuada mollis. Vivamus feugiat mi consequat ultrices posuere. Pellentesque luctus, turpis finibus auctor tempor, diam nisl efficitur ligula, quis tristique sem velit vel urna. Aliquam sit amet dolor ipsum. Nulla facilisi. Vestibulum dignissim imperdiet vehicula. Duis non velit urna. Suspendisse tincidunt massa risus, nec ullamcorper turpis aliquam volutpat. Morbi dapibus blandit ante at vulputate.
    
    Donec elementum, eros quis gravida sagittis, nisl orci mollis odio, ut vehicula ipsum risus et nisi. Sed nunc erat, sollicitudin ac dignissim maximus, feugiat a ligula. Nunc euismod sagittis massa eu gravida. Mauris pharetra auctor enim at interdum. Maecenas imperdiet consequat tortor, vel porttitor orci dignissim nec. Etiam lobortis sapien magna. Pellentesque eget massa id purus mollis ullamcorper. Duis fringilla lorem vitae maximus sagittis. Aenean ullamcorper tincidunt ipsum, in elementum turpis tincidunt at. Pellentesque ac augue id est convallis finibus et ut risus. In vel hendrerit risus, sed scelerisque tellus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nunc a iaculis mi, eu gravida augue. Ut fringilla vehicula aliquet.`,
  },
  {
    user: "Stranger bot 1",
    content: `Donec semper magna a justo suscipit fermentum. Proin vitae odio sit amet libero lacinia vehicula. Praesent vitae lacus at ipsum ullamcorper pharetra in sed odio. In nec est facilisis eros luctus suscipit. Sed non libero mattis, feugiat justo ut, varius nisi. Cras ornare libero et volutpat imperdiet. Morbi justo nisl, blandit sed dolor in, dignissim aliquet felis. In ac cursus diam. Fusce porta ante eu est bibendum, ut mollis lectus gravida. Phasellus congue luctus sollicitudin. Maecenas fermentum nulla ac nisi accumsan volutpat. Integer in molestie ligula, sit amet molestie nunc. Nulla augue elit, posuere molestie dictum ac, posuere facilisis purus. Morbi cursus ultrices bibendum. Vivamus molestie placerat ex, sit amet vulputate urna luctus nec. Ut ut metus porttitor, ultrices erat non, bibendum dui.`,
  },
  {
    user: "Stranger bot 2",
    content: `Donec semper magna a justo suscipit fermentum. Proin vitae odio sit amet libero lacinia vehicula. Praesent vitae lacus at ipsum ullamcorper pharetra in sed odio. In nec est facilisis eros luctus suscipit. Sed non libero mattis, feugiat justo ut, varius nisi. Cras ornare libero et volutpat imperdiet. Morbi justo nisl, blandit sed dolor in, dignissim aliquet felis. In ac cursus diam. Fusce porta ante eu est bibendum, ut mollis lectus gravida. Phasellus congue luctus sollicitudin. Maecenas fermentum nulla ac nisi accumsan volutpat. Integer in molestie ligula, sit amet molestie nunc. Nulla augue elit, posuere molestie dictum ac, posuere facilisis purus. Morbi cursus ultrices bibendum. Vivamus molestie placerat ex, sit amet vulputate urna luctus nec. Ut ut metus porttitor, ultrices erat non, bibendum dui.`,
  },
  {
    user: "Stranger bot 3",
    content: `Donec semper magna a justo suscipit fermentum. Proin vitae odio sit amet libero lacinia vehicula. Praesent vitae lacus at ipsum ullamcorper pharetra in sed odio. In nec est facilisis eros luctus suscipit. Sed non libero mattis, feugiat justo ut, varius nisi. Cras ornare libero et volutpat imperdiet. Morbi justo nisl, blandit sed dolor in, dignissim aliquet felis. In ac cursus diam. Fusce porta ante eu est bibendum, ut mollis lectus gravida. Phasellus congue luctus sollicitudin. Maecenas fermentum nulla ac nisi accumsan volutpat. Integer in molestie ligula, sit amet molestie nunc. Nulla augue elit, posuere molestie dictum ac, posuere facilisis purus. Morbi cursus ultrices bibendum. Vivamus molestie placerat ex, sit amet vulputate urna luctus nec. Ut ut metus porttitor, ultrices erat non, bibendum dui.`,
  },
];

const getTimeStamp = () =>
  new Date().toLocaleDateString() + " at " + new Date().toLocaleTimeString();

export const TopicView = () => {
  return (
    <div className="mx-auto w-[80%]">
      <Post post={posts[0]} />
      <div className="bg-gradient-to-b from-sky-200 to-white mt-6">
        {posts.slice(1).map((post) => (
          <Comment post={post} />
        ))}
      </div>
    </div>
  );
};

const Post = ({ post }: { post: any }) => {
  return (
    <div className="bg-sky-200 mt-16">
      <div className="relative text-white bg-sky-400 flex p-2 pl-8">
        <div className="font-bold">{post.title}</div>
        <div className="absolute pr-4 right-0">{getTimeStamp()}</div>
      </div>
      <p className="p-8">{post.content}</p>
      <div className="font-bold text-slate-500 pl-8 pb-4 ">{post.user}</div>
    </div>
  );
};

const Comment = ({ post }: { post: any }) => {
  return (
    <div className="py-6">
      <p className="p-8">{post.content}</p>
      <div className="relative font-bold text-slate-500 pl-8 flex">
        <div>{post.user}</div>
        <div className="absolute right-0 pr-4">{getTimeStamp()}</div>
      </div>
    </div>
  );
};
