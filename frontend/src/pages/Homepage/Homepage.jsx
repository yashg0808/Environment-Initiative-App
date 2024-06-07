import React, { useState, useEffect } from 'react';
import Post from './post';
import Pagination from './pagination';
import './App.css';
import PostService from '../../services/post/PostService';

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
      const data = await PostService.getPosts(page, 10);
      console.log(data)
      setPosts(data.posts);
      setTotalPosts(data.totalPosts);
      setHasNextPage(data.hasNextPage);
      setHasPrevPage(data.hasPrevPage);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div className="App w-full mx-auto">
      <div className='flex flex-col items-center'>
        {posts.map(post => (
          <Post key={post._id} post={post} />
        ))}
      </div>
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
