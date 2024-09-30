// src/api/forum.js
import axiosInstance from './axios';

/**
 * Fetch all forum topics.
 * GET /forums
 */
export const getForums = async () => {
  const response = await axiosInstance.get('/forums');
  return response.data;
};

/**
 * Fetch a single forum by ID.
 * GET /forums/{forum_id}
 * @param {string} forumId - The ID of the forum to fetch.
 */
export const getForumById = async (forumId) => {
  const response = await axiosInstance.get(`/forums/${forumId}`);
  return response.data;
};

/**
 * Create a new forum topic.
 * POST /forums
 * @param {Object} forumData - The data for the new forum.
 */
export const createForum = async (forumData) => {
  const response = await axiosInstance.post('/forums', forumData);
  return response.data;
};

/**
 * Update an existing forum.
 * PUT /forums/{forum_id}
 * @param {string} forumId - The ID of the forum to update.
 * @param {Object} forumData - The updated forum data.
 */
export const updateForum = async (forumId, forumData) => {
  const response = await axiosInstance.put(`/forums/${forumId}`, forumData);
  return response.data;
};

/**
 * Delete a forum.
 * DELETE /forums/{forum_id}
 * @param {string} forumId - The ID of the forum to delete.
 */
export const deleteForum = async (forumId) => {
  const response = await axiosInstance.delete(`/forums/${forumId}`);
  return response.data;
};

/**
 * Fetch all posts within a forum.
 * GET /forums/{forum_id}/posts
 * @param {string} forumId - The ID of the forum.
 */
export const getPosts = async (forumId) => {
  const response = await axiosInstance.get(`/forums/${forumId}/posts`);
  return response.data;
};

/**
 * Create a new post within a forum.
 * POST /forums/{forum_id}/posts
 * @param {string} forumId - The ID of the forum.
 * @param {Object} postData - The data for the new post.
 */
export const createPost = async (forumId, postData) => {
  const response = await axiosInstance.post(`/forums/${forumId}/posts`, postData);
  return response.data;
};

/**
 * Fetch a single post by ID.
 * GET /posts/{post_id}
 * @param {string} postId - The ID of the post to fetch.
 */
export const getPostById = async (postId) => {
  const response = await axiosInstance.get(`/posts/${postId}`);
  return response.data;
};

/**
 * Update an existing post.
 * PUT /posts/{post_id}
 * @param {string} postId - The ID of the post to update.
 * @param {Object} postData - The updated post data.
 */
export const updatePost = async (postId, postData) => {
  const response = await axiosInstance.put(`/posts/${postId}`, postData);
  return response.data;
};

/**
 * Delete a post.
 * DELETE /posts/{post_id}
 * @param {string} postId - The ID of the post to delete.
 */
export const deletePost = async (postId) => {
  const response = await axiosInstance.delete(`/posts/${postId}`);
  return response.data;
};

/**
 * Add a comment to a post.
 * POST /posts/{post_id}/comments
 * @param {string} postId - The ID of the post.
 * @param {Object} commentData - The data for the new comment.
 */
export const addComment = async (postId, commentData) => {
  const response = await axiosInstance.post(`/posts/${postId}/comments`, commentData);
  return response.data;
};

/**
 * Vote on a post.
 * POST /posts/{post_id}/vote
 * @param {string} postId - The ID of the post.
 * @param {Object} voteData - The vote data (e.g., { type: 'upvote' }).
 */
export const votePost = async (postId, voteData) => {
  const response = await axiosInstance.post(`/posts/${postId}/vote`, voteData);
  return response.data;
};
