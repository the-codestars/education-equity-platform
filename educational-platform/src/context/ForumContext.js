// src/context/ForumContext.js
import React, { createContext, useState, useEffect } from 'react';
import {
  getForums,
  getForumById,
  createForum,
  updateForum,
  deleteForum,
  getPosts,
  createPost,
  getPostById,
  updatePost,
  deletePost,
  addComment,
  votePost,
} from '../api/forum';

export const ForumContext = createContext();

const ForumProvider = ({ children }) => {
  const [forums, setForums] = useState([]);
  const [currentForum, setCurrentForum] = useState(null);
  const [posts, setPosts] = useState([]);
  const [currentPost, setCurrentPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all forums
  const fetchForums = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getForums();
      setForums(data.forums);
    } catch (err) {
      console.error('Error fetching forums:', err);
      setError('Failed to fetch forums.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch a single forum by ID
  const fetchForumById = async (forumId) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getForumById(forumId);
      setCurrentForum(data.forum);
    } catch (err) {
      console.error('Error fetching forum:', err);
      setError('Failed to fetch forum.');
    } finally {
      setLoading(false);
    }
  };

  // Create a new forum
  const handleCreateForum = async (forumData) => {
    setLoading(true);
    setError(null);
    try {
      const newForum = await createForum(forumData);
      setForums((prevForums) => [...prevForums, newForum.forum]);
    } catch (err) {
      console.error('Error creating forum:', err);
      setError('Failed to create forum.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update an existing forum
  const handleUpdateForum = async (forumId, forumData) => {
    setLoading(true);
    setError(null);
    try {
      const updatedForum = await updateForum(forumId, forumData);
      setForums((prevForums) =>
        prevForums.map((forum) => (forum.id === forumId ? updatedForum.forum : forum))
      );
      if (currentForum && currentForum.id === forumId) {
        setCurrentForum(updatedForum.forum);
      }
    } catch (err) {
      console.error('Error updating forum:', err);
      setError('Failed to update forum.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Delete a forum
  const handleDeleteForum = async (forumId) => {
    setLoading(true);
    setError(null);
    try {
      await deleteForum(forumId);
      setForums((prevForums) => prevForums.filter((forum) => forum.id !== forumId));
      if (currentForum && currentForum.id === forumId) {
        setCurrentForum(null);
        setPosts([]);
      }
    } catch (err) {
      console.error('Error deleting forum:', err);
      setError('Failed to delete forum.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Fetch posts within a forum
  const fetchPosts = async (forumId) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getPosts(forumId);
      setPosts(data.posts);
    } catch (err) {
      console.error('Error fetching posts:', err);
      setError('Failed to fetch posts.');
    } finally {
      setLoading(false);
    }
  };

  // Create a new post
  const handleCreatePost = async (forumId, postData) => {
    setLoading(true);
    setError(null);
    try {
      const newPost = await createPost(forumId, postData);
      setPosts((prevPosts) => [...prevPosts, newPost.post]);
    } catch (err) {
      console.error('Error creating post:', err);
      setError('Failed to create post.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Fetch a single post by ID
  const fetchPostById = async (postId) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getPostById(postId);
      setCurrentPost(data.post);
    } catch (err) {
      console.error('Error fetching post:', err);
      setError('Failed to fetch post.');
    } finally {
      setLoading(false);
    }
  };

  // Update an existing post
  const handleUpdatePost = async (postId, postData) => {
    setLoading(true);
    setError(null);
    try {
      const updatedPost = await updatePost(postId, postData);
      setPosts((prevPosts) =>
        prevPosts.map((post) => (post.id === postId ? updatedPost.post : post))
      );
      if (currentPost && currentPost.id === postId) {
        setCurrentPost(updatedPost.post);
      }
    } catch (err) {
      console.error('Error updating post:', err);
      setError('Failed to update post.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Delete a post
  const handleDeletePost = async (postId) => {
    setLoading(true);
    setError(null);
    try {
      await deletePost(postId);
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
      if (currentPost && currentPost.id === postId) {
        setCurrentPost(null);
      }
    } catch (err) {
      console.error('Error deleting post:', err);
      setError('Failed to delete post.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Add a comment to a post
  const handleAddComment = async (postId, commentData) => {
    setLoading(true);
    setError(null);
    try {
      const newComment = await addComment(postId, commentData);
      setCurrentPost((prevPost) => ({
        ...prevPost,
        comments: [...prevPost.comments, newComment.comment],
      }));
    } catch (err) {
      console.error('Error adding comment:', err);
      setError('Failed to add comment.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Vote on a post
  const handleVotePost = async (postId, voteData) => {
    setLoading(true);
    setError(null);
    try {
      const updatedPost = await votePost(postId, voteData);
      setPosts((prevPosts) =>
        prevPosts.map((post) => (post.id === postId ? updatedPost.post : post))
      );
      if (currentPost && currentPost.id === postId) {
        setCurrentPost(updatedPost.post);
      }
    } catch (err) {
      console.error('Error voting on post:', err);
      setError('Failed to vote on post.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchForums();
  }, []);

  return (
    <ForumContext.Provider
      value={{
        forums,
        currentForum,
        posts,
        currentPost,
        loading,
        error,
        fetchForumById,
        handleCreateForum,
        handleUpdateForum,
        handleDeleteForum,
        fetchPosts,
        handleCreatePost,
        fetchPostById,
        handleUpdatePost,
        handleDeletePost,
        handleAddComment,
        handleVotePost,
        refreshForums: fetchForums,
      }}
    >
      {children}
    </ForumContext.Provider>
  );
};

export default ForumProvider;
