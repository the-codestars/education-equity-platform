// src/components/EditForum.js
import React, { useContext, useEffect, useState } from 'react';
import { ForumContext } from '../context/ForumContext';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const EditForum = () => {
  const { forumId } = useParams();
  const { currentForum, handleUpdateForum, fetchForumById } = useContext(ForumContext);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentForum && forumId) {
      fetchForumById(forumId);
    }
  }, [currentForum, forumId, fetchForumById]);

  useEffect(() => {
    if (currentForum) {
      reset({
        title: currentForum.title,
        description: currentForum.description,
      });
    }
  }, [currentForum, reset]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await handleUpdateForum(forumId, {
        title: data.title,
        description: data.description,
      });
      toast.success('Forum updated successfully.');
      navigate(`/forums/${forumId}`);
    } catch (err) {
      toast.error('Failed to update forum.');
    } finally {
      setLoading(false);
    }
  };

  if (!currentForum) {
    return <div>Loading forum details...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded mt-8">
      <h2 className="text-2xl font-bold mb-6">Edit Forum "{currentForum.title}"</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700">
            Forum Title
          </label>
          <input
            id="title"
            type="text"
            {...register('title', { required: 'Forum title is required' })}
            className="w-full px-3 py-2 border rounded"
            placeholder="Enter forum title"
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            {...register('description', { required: 'Description is required' })}
            className="w-full px-3 py-2 border rounded"
            rows="4"
            placeholder="Enter forum description"
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? 'Updating...' : 'Update Forum'}
        </button>
      </form>
    </div>
  );
};

export default EditForum;
