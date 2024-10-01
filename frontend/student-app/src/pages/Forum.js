// src/pages/Forum.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import PostItem from "../components/PostItem";
import CreatePostForm from "../components/CreatePostForm";
import { FaPlus } from "react-icons/fa";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const Forum = () => {
  const [posts, setPosts] = useState([]);
  const [skip, setSkip] = useState(0);
  const [limit] = useState(10); // Number of posts per page
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [hasMore, setHasMore] = useState(true); // To check if more posts are available
  const [showCreateForm, setShowCreateForm] = useState(false); // State to toggle Create Post Form

  // Fetch forum posts
  const fetchPosts = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.get(
        `${API_BASE_URL}/forum/posts?skip=${skip}&limit=${limit}`,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );
      if (response.data.length < limit) {
        setHasMore(false);
      }
      setPosts((prevPosts) => [...prevPosts, ...response.data]);
    } catch (err) {
      setError("Failed to fetch forum posts. Please try again later.");
      console.error("Error fetching posts:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skip]);

  const refreshPosts = () => {
    // Reset posts and fetch again
    setPosts([]);
    setSkip(0);
    setHasMore(true);
    setShowCreateForm(false); // Hide the form after refresh
  };

  const loadMore = () => {
    setSkip((prevSkip) => prevSkip + limit);
  };

  const toggleCreateForm = () => {
    setShowCreateForm((prev) => !prev);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-primary">Forum</h1>
        <button
          onClick={toggleCreateForm}
          className="flex items-center bg-primary text-white py-2 px-4 rounded hover:bg-red-700 transition duration-200"
        >
          <FaPlus className="mr-2" />
          {showCreateForm ? "Close" : "Create New Post"}
        </button>
      </div>

      {/* Create Post Form */}
      {showCreateForm && <CreatePostForm refreshPosts={refreshPosts} />}

      {/* Display Posts */}
      {loading && posts.length === 0 ? (
        <p>Loading posts...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          {posts.length === 0 ? (
            <p>No posts available.</p>
          ) : (
            posts.map((post) => (
              <PostItem key={post.id} post={post} refreshPosts={refreshPosts} />
            ))
          )}

          {/* Load More Button */}
          {hasMore && (
            <div className="text-center mt-4">
              <button
                onClick={loadMore}
                className="bg-primary text-white py-2 px-4 rounded hover:bg-red-700 transition duration-200"
                disabled={loading}
              >
                {loading ? "Loading..." : "Load More"}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Forum;
