import React, { useState, useEffect } from 'react';
import Post from './post';
import Pagination from './pagination';
import './App.css';
import PostService from '../../services/post/PostService';
import CreatePost from './CreatePost';
import { useAppSelector } from '../../store';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPrevPage, setHasPrevPage] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

  const onCreatePost = async () => {

  };

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
        {isLoggedIn ? (
          <>
            {!isExpanded ? (
              <div 
                className="w-full max-w-lg p-4 bg-white shadow-lg rounded-lg cursor-pointer m-6"
                onClick={() => setIsExpanded(true)}
              >
                <p className="text-gray-600">{"What's on your mind?"}</p>
              </div>
            ) : (
              <CreatePost setIsExpanded={setIsExpanded} onCreatePost={onCreatePost} />
            )}
          </>
        ) : (
          <div className="w-full max-w-lg p-4 bg-white shadow-lg rounded-lg cursor-pointer m-6">
                <p className="text-gray-600">{"Please Login to Create Posts."}</p>
          </div>
        )}
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
