// src/components/Voting.js
import React, { useContext } from 'react';
import { ForumContext } from '../context/ForumContext';
import { toast } from 'react-toastify';

const Voting = ({ postId, upvotes, downvotes }) => {
  const { handleVotePost } = useContext(ForumContext);

  const onVote = async (type) => {
    try {
      await handleVotePost(postId, { type });
      toast.success(`Post ${type}d successfully.`);
    } catch (err) {
      toast.error(`Failed to ${type} post.`);
    }
  };

  return (
    <div className="flex space-x-4">
      <button
        onClick={() => onVote('upvote')}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Upvote ({upvotes})
      </button>
      <button
        onClick={() => onVote('downvote')}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Downvote ({downvotes})
      </button>
    </div>
  );
};

export default Voting;
