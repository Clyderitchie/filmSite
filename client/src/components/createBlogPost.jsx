import React from "react";
import { PlusIcon } from "@heroicons/react/24/solid";

function CreatePostButton() {
  return (
    <>
      <div className="p-4 border-2 m-3 max-w-fit min-w-fit rounded-lg">
        <a href="/createPost" className="text-center inline-flex">
          Create New Post
          <PlusIcon aria-hidden="true" className="block size-6" />
        </a>
      </div>
    </>
  );
}

export default CreatePostButton;
