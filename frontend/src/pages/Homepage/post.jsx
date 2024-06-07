// src/components/Post.js

import React, { useState } from 'react';
import LikeService from '../../services/like/LikeService';
import ApiError from '../../services/ApiError'
import CommentService from '../../services/comment/CommentService';


const Post = ({ post }) => {
  const [likes, setLikes] = useState(post.likes);
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [comments, setComments] = useState(post.comments);
  const [isCommenting, setIsCommenting] = useState(false);
  const [newComment, setNewComment] = useState('');

  const handleLike = async  () => {

   
    // Here you would also make an API call to update the like status in the backend

    const response= await LikeService.likePostService(post._id);
    if(response instanceof ApiError){
      console.log(response.errorMessage);
    }else{
      setLikes(isLiked ? likes - 1 : likes + 1);
      setIsLiked(!isLiked);
    }

  };

  const handleComment = () => {
    setIsCommenting(!isCommenting);
  };

  const handleCommentSubmit = async (e)  => {
    e.preventDefault();
    if (newComment.trim() === '') return;

    setComments(comments + 1);
    setNewComment('');
    setIsCommenting(false);
    // Here you would also make an API call to add the new comment to the backend
    const response= await CommentService.addNewCommentService(post._id,newComment);
    
  };

  return (
    <div className="post">
      <div className="post-header">
        <h3>{post.author ? post.author.name : "Anonymous"}</h3>
        <p>{new Date(post.createdAt).toLocaleDateString()}</p>
      </div>
      <div className="post-content">
        
        {post.images.length > 0 && (
          <img src={"https://i.redd.it/zj0etb1tyss71.jpg"} alt="Post" className="post-image" id="img" />
          // post.images[0].url
          
        )}
        <p>{post.content}</p>
        <div className="post-tags">
          {post.tags.map((tag, index) => (
            <span key={index} className="tag">#{tag}</span>
          ))}
        </div>
      </div>
      <div className="post-actions">
        <button onClick={handleLike}>
          {isLiked ? "Unlike" : "Like"} ({likes})
        </button>
        <button onClick={handleComment}>
          Comment ({comments})
        </button>
      </div>
      {isCommenting && (
        <div className="comment-section">
          <form onSubmit={handleCommentSubmit}>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Post;
