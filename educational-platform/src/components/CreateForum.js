// src/components/CreateForum.js
import React, { useContext, useState } from 'react';
import { ForumContext } from '../context/ForumContext';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const CreateForum = () => {
  const { handleCreateForum } = useContext(ForumContext);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await handleCreateForum({
        title: data.title,
        description: data.description,
      });
      toast.success('Forum created successfully.');
      reset();
    } catch (err) {
      toast.error('Failed to create forum.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded mt-8">
      <h2 className="text-2xl font-bold mb-6">Create New Forum</h2>

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
          {loading ? 'Creating...' : 'Create Forum'}
        </button>
      </form>
    </div>
  );
};

export default CreateForum;
