// src/components/CommentList.js

import React from "react";

const CommentList = ({ comments }) => {
  if (comments.length === 0) {
    return <p className="text-gray-600">No comments yet.</p>;
  }

  return (
    <div className="mt-4">
      {comments.map((comment) => (
        <div key={comment.id} className="border-b border-gray-200 py-2">
          <p className="text-gray-800">{comment.content}</p>
          <p className="text-sm text-gray-500 mt-1">
            By {comment.author_name} on{" "}
            {new Date(comment.created_at).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
};

export default CommentList;
