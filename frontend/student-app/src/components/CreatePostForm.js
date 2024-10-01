// src/components/CreatePostForm.js

import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext"; // Import AuthContext

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const CreatePostForm = ({ refreshPosts }) => {
  const { token } = useContext(AuthContext); // Access token from AuthContext

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [subforum, setSubforum] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const postData = {
      title,
      content,
      subforum,
      image_url: imageUrl,
    };

    try {
      await axios.post(`${API_BASE_URL}/forum/posts`, postData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      setSuccess("Post created successfully!");
      setTitle("");
      setContent("");
      setSubforum("");
      setImageUrl("");
      refreshPosts(); // Refresh the posts list to include the new post
    } catch (err) {
      setError("Failed to create post. Please try again.");
      console.error("Error creating post:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow-md mb-6">
      <h3 className="text-xl font-semibold text-primary mb-4">
        Create a New Post
      </h3>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      {success && <p className="text-green-500 mb-2">{success}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-primary"
            placeholder="Enter post title"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="content">
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-primary"
            placeholder="Enter post content"
            rows="4"
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="subforum">
            Subforum (optional)
          </label>
          <input
            type="text"
            id="subforum"
            value={subforum}
            onChange={(e) => setSubforum(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-primary"
            placeholder="Enter subforum name"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="imageUrl">
            Image URL (optional)
          </label>
          <input
            type="url"
            id="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-primary"
            placeholder="Enter image URL"
          />
        </div>
        <button
          type="submit"
          className={`w-full bg-primary text-white py-2 rounded hover:bg-red-700 transition duration-200 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Post"}
        </button>
      </form>
    </div>
  );
};

export default CreatePostForm;
