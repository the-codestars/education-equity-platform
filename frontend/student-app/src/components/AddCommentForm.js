// src/components/AddCommentForm.js

import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext"; // Import AuthContext

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const AddCommentForm = ({ postId, refreshPosts }) => {
  const { token } = useContext(AuthContext); // Access token from AuthContext

  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) {
      setError("Comment cannot be empty.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    const commentData = {
      content,
    };

    try {
      await axios.post(
        `${API_BASE_URL}/forum/posts/${postId}/comments`,
        commentData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      setSuccess("Comment added successfully!");
      setContent("");
      refreshPosts(); // Refresh posts to show the new comment
    } catch (err) {
      setError("Failed to add comment. Please try again.");
      console.error("Error adding comment:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4">
      {error && <p className="text-red-500 mb-2">{error}</p>}
      {success && <p className="text-green-500 mb-2">{success}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-primary"
            placeholder="Add a comment..."
            rows="3"
          ></textarea>
        </div>
        <button
          type="submit"
          className={`bg-primary text-white py-1 px-4 rounded hover:bg-red-700 transition duration-200 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Posting..." : "Post Comment"}
        </button>
      </form>
    </div>
  );
};

export default AddCommentForm;
