// src/components/CreatePost.js
import React, { useContext, useState, useEffect } from 'react';
import { ForumContext } from '../context/ForumContext';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const CreatePost = () => {
  const { forumId } = useParams();
  const { currentForum, handleCreatePost, fetchForumById } = useContext(ForumContext);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentForum && forumId) {
      fetchForumById(forumId);
    }
  }, [currentForum, forumId, fetchForumById]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await handleCreatePost(forumId, {
        title: data.title,
        content: data.content,
      });
      toast.success('Post created successfully.');
      reset();
      navigate(`/forums/${forumId}`);
    } catch (err) {
      toast.error('Failed to create post.');
    } finally {
      setLoading(false);
    }
  };

  if (!currentForum) {
    return <div>Loading forum details...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded mt-8">
      <h2 className="text-2xl font-bold mb-6">Create New Post in "{currentForum.title}"</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700">
            Post Title
          </label>
          <input
            id="title"
            type="text"
            {...register('title', { required: 'Post title is required' })}
            className="w-full px-3 py-2 border rounded"
            placeholder="Enter post title"
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="content" className="block text-gray-700">
            Content
          </label>
          <textarea
            id="content"
            {...register('content', { required: 'Content is required' })}
            className="w-full px-3 py-2 border rounded"
            rows="6"
            placeholder="Enter post content"
          ></textarea>
          {errors.content && (
            <p className="text-red-500 text-sm">{errors.content.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? 'Creating...' : 'Create Post'}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
