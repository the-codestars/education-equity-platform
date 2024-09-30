// src/components/EditPost.js
import React, { useContext, useEffect, useState } from 'react';
import { ForumContext } from '../context/ForumContext';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const EditPost = () => {
  const { postId } = useParams();
  const { currentPost, handleUpdatePost, fetchPostById } = useContext(ForumContext);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentPost && postId) {
      fetchPostById(postId);
    }
  }, [currentPost, postId, fetchPostById]);

  useEffect(() => {
    if (currentPost) {
      reset({
        title: currentPost.title,
        content: currentPost.content,
      });
    }
  }, [currentPost, reset]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await handleUpdatePost(postId, {
        title: data.title,
        content: data.content,
      });
      toast.success('Post updated successfully.');
      navigate(`/posts/${postId}`);
    } catch (err) {
      toast.error('Failed to update post.');
    } finally {
      setLoading(false);
    }
  };

  if (!currentPost) {
    return <div>Loading post details...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded mt-8">
      <h2 className="text-2xl font-bold mb-6">Edit Post "{currentPost.title}"</h2>

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
          {loading ? 'Updating...' : 'Update Post'}
        </button>
      </form>
    </div>
  );
};

export default EditPost;
