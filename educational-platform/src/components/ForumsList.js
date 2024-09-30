// src/components/ForumsList.js
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ForumContext } from '../context/ForumContext';
import { toast } from 'react-toastify';

const ForumsList = () => {
  const { forums, loading, error, handleDeleteForum, refreshForums } = useContext(ForumContext);

  const onDelete = async (forumId) => {
    const confirm = window.confirm('Are you sure you want to delete this forum?');
    if (!confirm) return;

    try {
      await handleDeleteForum(forumId);
      toast.success('Forum deleted successfully.');
    } catch (err) {
      toast.error('Failed to delete forum.');
    }
  };

 // Inside ForumsList.js

if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <svg
          className="animate-spin h-8 w-8 text-blue-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
          ></path>
        </svg>
        <span className="ml-2">Loading forums...</span>
      </div>
    );
  }
  

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Forum Topics</h2>
        <Link
          to="/forums/create"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Create Forum
        </Link>
        <button
          onClick={refreshForums}
          className="ml-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Refresh
        </button>
      </div>

      {forums.length > 0 ? (
        <ul className="space-y-4">
          {forums.map((forum) => (
            <li key={forum.id} className="p-4 border rounded flex justify-between items-center">
              <div>
                <Link to={`/forums/${forum.id}`} className="text-xl font-semibold text-blue-500 hover:underline">
                  {forum.title}
                </Link>
                <p className="text-gray-600">{forum.description}</p>
              </div>
              <div className="flex space-x-2">
                <Link
                  to={`/forums/${forum.id}/edit`}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                >
                  Edit
                </Link>
                <button
                  onClick={() => onDelete(forum.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No forums available. Create a new forum to get started.</p>
      )}
      
    </div>
  );
};

export default ForumsList;
