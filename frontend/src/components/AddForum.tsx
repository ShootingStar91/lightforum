import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { newForum } from "../api";
import { useNavigate } from "react-router";

const inputStyle = "text-left w-full p-4";

export const AddForum = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: newForum,
    onSuccess: () => {
      navigate('/forum')
      return queryClient.invalidateQueries(["forums"])
    },
  });

  const createForum = () => {
    mutation.mutate({ title, description });
  };

  return (
    <div className="mt-2">
      <h1>Add a new forum</h1>
      <h3 className="mt-8">Title</h3>
      <input
        type="text"
        value={title}
        className={inputStyle}
        onChange={(event) => setTitle(event.target.value)}
      />
      <h3>Description</h3>
      <input
        type="text"
        value={description}
        className={inputStyle}
        onChange={(event) => setDescription(event.target.value)}
      />
      <button className="mt-12 mx-auto" onClick={() => createForum()}>
        Create forum
      </button>
    </div>
  );
};
