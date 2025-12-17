import React from "react";
import { ApolloProvider } from "@apollo/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/home";
import NavBar from "./components/NavBar.jsx";
import PersonalPage from "./pages/personal.jsx";
import Blog from "./pages/blog.jsx";
import CreateBlogForm from "./components/createBlog.jsx";

function App() {
  return (
    <>
      <ApolloProvider>
        <NavBar />
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/personal" element={<PersonalPage />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/createBlog" element={<CreateBlogForm />} />
          </Routes>
        </Router>
      </ApolloProvider>
    </>
  );
}

export default App;
