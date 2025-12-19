import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_POST } from "../../utils/mutations";
import { ArrowUpTrayIcon } from "@heroicons/react/24/solid";

export default function CreatePostForm() {
  const [text, setText] = useState("");
  const [picture, setPicture] = useState("");
  const [addPost, { error }] = useMutation(CREATE_POST);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await addPost({
        variables: { userId, text, picture },
      });
      setText("");
    } catch (error) {
      console.error("Error with handling the submit of post: ", error);
    }
  };

  return (
    <>
      <div
        className="flex justify-center p-4 items-center"
        onSubmit={handleSubmit}
      >
        <h3>Add New Post</h3>
        <input
          id="post"
          name="Add new Post"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="block min-w-0 grow border-2 py-1.5 pr-3 pl-1 text-base rounded-lg"
        />
        <button type="submit"> Post</button>
      </div>
    </>
  );
}
