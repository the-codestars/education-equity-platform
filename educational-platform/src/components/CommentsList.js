// src/components/CommentsList.js
import React from 'react';

const CommentsList = ({ comments }) => {
  return (
    <ul className="space-y-4">
      {comments.map((comment) => (
        <li key={comment.id} className="p-4 border rounded">
          <p className="text-gray-700">{comment.content}</p>
          <p className="text-gray-500 text-sm mt-2">By {comment.author.full_name}</p>
        </li>
      ))}
    </ul>
  );
};

export default CommentsList;
