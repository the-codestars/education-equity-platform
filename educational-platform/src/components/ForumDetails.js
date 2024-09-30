// src/components/ForumDetails.js
import React, { useContext, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ForumContext } from '../context/ForumContext';
import { toast } from 'react-toastify';

const ForumDetails = () => {
  const { forumId } = useParams();
  const { currentForum, posts, loading, error, fetchForumById, fetchPosts, handleDeletePost } = useContext(ForumContext);

  useEffect(() => {
    if (forumId) {
      fetchForumById(forumId);
      fetchPosts(forumId);
    }
  }, [forumId, fetchForumById, fetchPosts]);

  const onDeletePost = async (postId) => {
    const confirm = window.confirm('Are you sure you want to delete this post?');
    if (!confirm) return;

    try {
      await handleDeletePost(postId);
      toast.success('Post deleted successfully.');
    } catch (err) {
      toast.error('Failed to delete post.');
    }
  };

  if (loading) {
    return <div>Loading forum...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!currentForum) {
    return <div>Forum not found.</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-bold">{currentForum.title}</h2>
        <Link
          to={`/forums/${forumId}/create-post`}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Create Post
        </Link>
      </div>
      <p className="text-gray-700 mb-6">{currentForum.description}</p>

      <h3 className="text-2xl font-semibold mb-4">Posts</h3>

      {posts.length > 0 ? (
        <ul className="space-y-4">
          {posts.map((post) => (
            <li key={post.id} className="p-4 border rounded flex justify-between items-center">
              <div>
                <Link to={`/posts/${post.id}`} className="text-xl font-semibold text-blue-500 hover:underline">
                  {post.title}
                </Link>
                <p className="text-gray-600">By {post.author.full_name}</p>
              </div>
              <div className="flex space-x-2">
                <Link
                  to={`/posts/${post.id}/edit`}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                >
                  Edit
                </Link>
                <button
                  onClick={() => onDeletePost(post.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No posts available in this forum.</p>
      )}
    </div>
  );
};

export default ForumDetails;
