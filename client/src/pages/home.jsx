import React from "react";
import CreateBlogPost from "../components/createBlogPost";
import PageHeading from "../components/pageHeading";

function Home() {
  return (
    <>
      <div className="h-screen ">     
          {/* <PageHeading /> */}
          <CreateBlogPost />
      </div>
      
    </>
  );
}

export default Home;
