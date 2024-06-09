import React, { useState, useEffect } from 'react';
import Pagination from './pagination';
import './App.css';
import PostService from '../../services/post/PostService';
import CreatePost from './CreatePost';
import { useAppSelector } from '../../store';
import Post from '../../components/widgets/posts/Post';
import useCustomNavigate from '../../hooks/useCustomNavigate';
import Skeleton from '../../components/basic/Skeleton';
import { ROUTE_PATHS } from '../../constants';

const App = () => {
  const navigate = useCustomNavigate();
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPrevPage, setHasPrevPage] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const isEmailVerified = useAppSelector((state) => state.auth.userDetails?.isEmailVerified);

  const onCreatePost = async () => {

  };

  useEffect(() => {
    fetchPosts(page);
  }, [page]);

  const fetchPosts = async (page) => {
      setLoading(true);
      const data = await PostService.getPosts(page, 10);
      setPosts(data.posts);
      setTotalPosts(data.totalPosts);
      setHasNextPage(data.hasNextPage);
      setHasPrevPage(data.hasPrevPage);
      setLoading(false);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  if (loading) {
    return (
      <div className="App w-full mx-auto">
        <div className="flex flex-col items-center">
          <div className="animate-pulse bg-gray-300 w-full max-w-lg p-4  shadow-lg rounded-lg cursor-pointer m-6"/>
          {[...Array(3)].map((_, index) => (
              <Skeleton key={index} type="post" />
            ))}
        </div>
      </div>
    );
  }

  return (
    <div className="App w-full mx-auto">
      <div className='flex flex-col items-center'>
        {isLoggedIn ? isEmailVerified ? (
          <>
            {!isExpanded ? (
              <div 
                className="w-full max-w-lg p-4 bg-white shadow-lg rounded-lg cursor-pointer m-6"
                onClick={() => setIsExpanded(true)}
              >
                <p className="text-gray-600">{"What's on your mind?"}</p>
              </div>
            ) : (
              <CreatePost fetchPosts={fetchPosts} setIsExpanded={setIsExpanded} onCreatePost={onCreatePost} />
            )}
          </>
        ) : (<>
        <div onClick={()=>{navigate(ROUTE_PATHS.notemailverified)}} className="w-full max-w-lg p-4 bg-white shadow-lg rounded-lg cursor-pointer m-6">
                <p className="text-gray-600">{"Verify Your Email To Create Posts"}</p>
          </div>
        </>) : (
          <div onClick={()=>{navigate("/login")}} className="w-full max-w-lg p-4 bg-white shadow-lg rounded-lg cursor-pointer m-6">
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
