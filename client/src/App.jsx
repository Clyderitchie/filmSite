import React, { useState } from "react";
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { setContext } from "@apollo/client/link/context";

import Home from "./pages/home";
import NavBar from "./components/NavBar.jsx";
import PersonalPage from "./pages/personal.jsx";
import Blog from "./pages/blog.jsx";
import CreatePostForm from './pages/createPostForm.jsx';
import LoginPage from "./pages/login.jsx";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <>
      <ApolloProvider client={client}>
        <NavBar />
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/personal" element={<PersonalPage />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/createPost" element={<CreatePostForm />} />
            <Route
              path="/login"
              element={<LoginPage handleLogin={handleLogin} />}
            />
          </Routes>
        </Router>
      </ApolloProvider>
    </>
  );
}

export default App;
