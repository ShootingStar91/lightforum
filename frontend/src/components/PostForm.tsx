import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { postMutation } from "../api";

export const PostForm = ({
  threadId,
  title,
}: {
  threadId: number;
  title: string;
}) => {
  const [text, setText] = useState("");
  const queryClient = useQueryClient();
  const sendMutation = useMutation({
    mutationFn: postMutation,
    onSuccess: () => queryClient.invalidateQueries(["thread", threadId]),
  });

  const sendPost = () => {
    sendMutation.mutate({ content: text, threadId, userId: 1 });
    setText("");
  };

  return (
    <div className="mt-6 bg-sky-200">
      <div className="bg-sky-400 text-white p-2">
        <div>{title}</div>
      </div>
      <textarea
        onChange={(event) => setText(event.target.value)}
        value={text}
        className="p-2 mx-auto h-32 w-[100%] text-left"
      />
      <div className="flex justify-end">
        <button onClick={() => sendPost()}>Send</button>
      </div>
    </div>
  );
};
