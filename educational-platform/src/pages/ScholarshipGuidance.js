// src/pages/ScholarshipGuidance.js
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { ScholarshipContext } from '../context/ScholarshipContext';
import { toast } from 'react-toastify';

const ScholarshipGuidance = () => {
  const { guidance, loading, error, fetchGuidance } = useContext(ScholarshipContext);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    // Prepare parameters based on user input
    const params = {
      academic_level: data.academic_level,
      field_of_study: data.field_of_study,
      interests: data.interests,
      financial_need: data.financial_need,
      location: data.location,
    };

    try {
      await fetchGuidance(params);
      toast.success('Scholarship guidance fetched successfully.');
    } catch (err) {
      toast.error('Failed to fetch scholarship guidance.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded mt-8">
      <h2 className="text-2xl font-bold mb-6">Scholarship Guidance</h2>

      {/* Scholarship Guidance Form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Academic Level */}
          <div>
            <label className="block text-gray-700">Academic Level</label>
            <select
              {...register('academic_level', { required: 'Academic level is required' })}
              className="w-full px-3 py-2 border rounded"
            >
              <option value="">Select Academic Level</option>
              <option value="high_school">High School</option>
              <option value="undergraduate">Undergraduate</option>
              <option value="graduate">Graduate</option>
              <option value="postgraduate">Postgraduate</option>
            </select>
            {errors.academic_level && (
              <p className="text-red-500 text-sm">{errors.academic_level.message}</p>
            )}
          </div>

          {/* Field of Study */}
          <div>
            <label className="block text-gray-700">Field of Study</label>
            <input
              type="text"
              {...register('field_of_study', { required: 'Field of study is required' })}
              className="w-full px-3 py-2 border rounded"
              placeholder="e.g., Computer Science, Biology"
            />
            {errors.field_of_study && (
              <p className="text-red-500 text-sm">{errors.field_of_study.message}</p>
            )}
          </div>

          {/* Interests */}
          <div>
            <label className="block text-gray-700">Interests</label>
            <input
              type="text"
              {...register('interests')}
              className="w-full px-3 py-2 border rounded"
              placeholder="e.g., AI, Environmental Science"
            />
            <p className="text-gray-500 text-sm">Separate interests with commas.</p>
          </div>

          {/* Financial Need */}
          <div>
            <label className="block text-gray-700">Financial Need</label>
            <select
              {...register('financial_need', { required: 'Financial need is required' })}
              className="w-full px-3 py-2 border rounded"
            >
              <option value="">Select Financial Need</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            {errors.financial_need && (
              <p className="text-red-500 text-sm">{errors.financial_need.message}</p>
            )}
          </div>

          {/* Location */}
          <div>
            <label className="block text-gray-700">Location</label>
            <input
              type="text"
              {...register('location')}
              className="w-full px-3 py-2 border rounded"
              placeholder="e.g., New York, USA"
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? 'Fetching Guidance...' : 'Get Scholarship Guidance'}
        </button>
      </form>

      {/* Display Error Message */}
      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      {/* Display Scholarship Guidance */}
      {guidance && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Scholarship Recommendations</h3>
          <ul className="space-y-4">
            {guidance.scholarships && guidance.scholarships.length > 0 ? (
              guidance.scholarships.map((scholarship) => (
                <li key={scholarship.id} className="p-4 border rounded">
                  <h4 className="text-lg font-bold">{scholarship.name}</h4>
                  <p className="text-gray-700">{scholarship.description}</p>
                  <p className="text-gray-600">
                    <strong>Amount:</strong> {scholarship.amount}
                  </p>
                  <p className="text-gray-600">
                    <strong>Deadline:</strong> {new Date(scholarship.deadline).toLocaleDateString()}
                  </p>
                  <a
                    href={scholarship.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    Apply Now
                  </a>
                </li>
              ))
            ) : (
              <p>No scholarships found based on your criteria.</p>
            )}
          </ul>
        </div>
      )}
      // Inside ScholarshipGuidance.js

{loading && (
  <div className="mt-4 flex items-center justify-center">
    <svg
      className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-500"
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
    <span>Loading...</span>
  </div>
)}

    </div>
  );
};

export default ScholarshipGuidance;
