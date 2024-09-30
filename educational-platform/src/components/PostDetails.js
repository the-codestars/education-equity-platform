// src/components/PostDetails.js
import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ForumContext } from '../context/ForumContext';
import { toast } from 'react-toastify';

const PostDetails = () => {
  const { postId } = useParams();
  const {
    currentPost,
    loading,
    error,
    fetchPostById,
    handleUpdatePost,
    handleAddComment,
    handleVotePost,
  } = useContext(ForumContext);
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    if (postId) {
      fetchPostById(postId);
    }
  }, [postId, fetchPostById]);

  const onSubmitComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) {
      toast.error('Comment cannot be empty.');
      return;
    }

    try {
      await handleAddComment(postId, { content: commentText });
      toast.success('Comment added successfully.');
      setCommentText('');
    } catch (err) {
      toast.error('Failed to add comment.');
    }
  };

  const onVote = async (type) => {
    try {
      await handleVotePost(postId, { type }); // type can be 'upvote' or 'downvote'
      toast.success(`Post ${type}d successfully.`);
    } catch (err) {
      toast.error(`Failed to ${type} post.`);
    }
  };

  if (loading) {
    return <div>Loading post...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!currentPost) {
    return <div>Post not found.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-bold">{currentPost.title}</h2>
        <Link
          to={`/posts/${postId}/edit`}
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
        >
          Edit Post
        </Link>
      </div>
      <p className="text-gray-700 mb-4">{currentPost.content}</p>
      <p className="text-gray-600 mb-4">By {currentPost.author.full_name}</p>

      {/* Voting Buttons */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => onVote('upvote')}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Upvote ({currentPost.upvotes})
        </button>
        <button
          onClick={() => onVote('downvote')}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Downvote ({currentPost.downvotes})
        </button>
      </div>

      {/* Comments Section */}
      <div>
        <h3 className="text-2xl font-semibold mb-4">Comments</h3>
        {currentPost.comments.length > 0 ? (
          <ul className="space-y-4">
            {currentPost.comments.map((comment) => (
              <li key={comment.id} className="p-4 border rounded">
                <p className="text-gray-700">{comment.content}</p>
                <p className="text-gray-500 text-sm mt-2">By {comment.author.full_name}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No comments yet. Be the first to comment!</p>
        )}

        {/* Add Comment Form */}
        <form onSubmit={onSubmitComment} className="mt-6">
          <label htmlFor="comment" className="block text-gray-700 mb-2">
            Add a Comment
          </label>
          <textarea
            id="comment"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            rows="3"
            placeholder="Write your comment here..."
          ></textarea>
          <button
            type="submit"
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Submit Comment
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostDetails;
