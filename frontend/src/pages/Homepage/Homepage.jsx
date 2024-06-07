// src/App.js

import React, { useState, useEffect } from 'react';
import Post from './post';
import Pagination from './pagination';
import './App.css';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPrevPage, setHasPrevPage] = useState(false);

  useEffect(() => {
    fetchPosts(page);
  }, [page]);

  const fetchPosts = async (page) => {
    try {
      const response = await fetch(`http://localhost:8000/api/v1/post?page=${page}&limit=10`);
      const data = await response.json();
      if (data.success) {
        setPosts(data.data.posts);
        setTotalPosts(data.data.totalPosts);
        setHasNextPage(data.data.hasNextPage);
        setHasPrevPage(data.data.hasPrevPage);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div className="App">
      <h1>Posts</h1>
      {posts.map(post => (
        <Post key={post._id} post={post} />
      ))}
      <Pagination
        page={page}
        hasNextPage={hasNextPage}
        hasPrevPage={hasPrevPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default App;
