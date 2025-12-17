import React from "react";
import CreateBlogForm from "../components/createBlog";
import { PlusIcon } from "@heroicons/react/24/solid";

function CreateBlogPost() {
  return (
    <>
      <a href="/createBlog">
        Create Blog
        <PlusIcon aria-hidden="true" className="block size-6" />
      </a>
    </>
  );
}

export default CreateBlogPost;
