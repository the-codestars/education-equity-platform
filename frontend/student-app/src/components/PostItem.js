// src/components/PostItem.js

import React, { useState, useContext } from "react";
import axios from "axios";
import AddCommentForm from "./AddCommentForm";
import CommentList from "./CommentList";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { AuthContext } from "../contexts/AuthContext";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const PostItem = ({ post, refreshPosts }) => {
  const [voting, setVoting] = useState(false);
  const [voteError, setVoteError] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [currentVotes, setCurrentVotes] = useState(
    typeof post.votes === "number" ? post.votes : 0
  ); // Initialize with post.votes or 0

  const { token } = useContext(AuthContext); // Access token from AuthContext

  const handleVote = async (voteType) => {
    setVoting(true);
    setVoteError("");

    try {
      await axios.post(
        `${API_BASE_URL}/forum/posts/${post.id}/vote?vote=${voteType}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      // Update vote count based on voteType
      setCurrentVotes((prevVotes) =>
        voteType === "upvote" ? prevVotes + 1 : prevVotes - 1
      );
    } catch (err) {
      setVoteError("Failed to register your vote. Please try again.");
      console.error("Error voting on post:", err);
    } finally {
      setVoting(false);
      // Optionally, refresh posts to get the latest vote count from the server
      // refreshPosts();
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow-md mb-6">
      <h2 className="text-2xl font-bold text-primary">{post.title}</h2>
      <p className="mt-2 text-gray-700">{post.content}</p>
      {post.image_url && (
        <img
          src={post.image_url}
          alt="Post"
          className="mt-4 w-full h-auto rounded"
        />
      )}
      <div className="flex items-center mt-4 space-x-4">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleVote("upvote")}
            className={`flex items-center text-gray-600 hover:text-primary ${
              voting ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={voting}
          >
            <FaThumbsUp className="mr-1" />
            Upvote
          </button>
          <span className="text-gray-800">{currentVotes}</span>
        </div>
        {/* Optional: Add a downvote button */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleVote("downvote")}
            className={`flex items-center text-gray-600 hover:text-primary ${
              voting ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={voting}
          >
            <FaThumbsDown className="mr-1" />
            Downvote
          </button>
        </div>
        <button
          onClick={() => setShowComments(!showComments)}
          className="text-gray-600 hover:text-primary"
        >
          {showComments ? "Hide Comments" : "Show Comments"} (
          {post.comments.length})
        </button>
      </div>
      {voteError && <p className="text-red-500 mt-2">{voteError}</p>}
      {showComments && (
        <div className="mt-4">
          <CommentList comments={post.comments} />
          <AddCommentForm postId={post.id} refreshPosts={refreshPosts} />
        </div>
      )}
    </div>
  );
};

export default PostItem;
