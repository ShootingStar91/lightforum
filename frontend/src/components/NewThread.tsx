import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router";
import { newThread } from "../api";

export const NewThread = () => {
  const { forumId: forumIdParam } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const sendMutation = useMutation({
    mutationFn: newThread,
    onSuccess: ({ id }) => {
      navigate(`/thread/${id}`)
      return queryClient.invalidateQueries(["threads"])
    }
  });

  if (!forumIdParam) return null;
  const forumId = parseInt(forumIdParam);

  const send = () => {
    sendMutation.mutate({ title, content, forumId, userId: 1 });
  };

  return (
    <div>
      <h3>Post a new thread</h3>
      <div className="mt-4">
        <input
          className="text-left p-2 w-full"
          onChange={(event) => setTitle(event.target.value)}
          value={title}
          type="text"
        />
      </div>
      <div className="my-4">
        <textarea
          className="text-left p-2 w-full h-24"
          onChange={(event) => setContent(event.target.value)}
          value={content}
        />
      </div>
      <button onClick={() => send()}>Post</button>
    </div>
  );
};
