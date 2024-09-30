// src/pages/ScheduleMeeting.js
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { scheduleMeeting } from '../api/meeting';
import { toast } from 'react-toastify';

const ScheduleMeeting = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [meetingLink, setMeetingLink] = useState(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    setMeetingLink(null);
    try {
      const meetingDetails = {
        topic: data.topic,
        start_time: data.start_time,
        duration: parseInt(data.duration, 10), // Duration in minutes
        host_email: data.host_email,
      };
      const response = await scheduleMeeting(meetingDetails);
      setMeetingLink(response.meeting_link);
      toast.success('Meeting scheduled successfully!');
      reset();
    } catch (error) {
      console.error('Error scheduling meeting:', error);
      toast.error('Failed to schedule meeting. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded mt-8">
      <h2 className="text-2xl font-bold mb-6">Schedule a Virtual Meeting</h2>

      {/* Meeting Scheduling Form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="topic" className="block text-gray-700">
            Meeting Topic
          </label>
          <input
            id="topic"
            type="text"
            {...register('topic', { required: 'Meeting topic is required' })}
            className="w-full px-3 py-2 border rounded"
            placeholder="e.g., Career Guidance Session"
          />
          {errors.topic && (
            <p className="text-red-500 text-sm">{errors.topic.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="start_time" className="block text-gray-700">
            Start Time
          </label>
          <input
            id="start_time"
            type="datetime-local"
            {...register('start_time', { required: 'Start time is required' })}
            className="w-full px-3 py-2 border rounded"
          />
          {errors.start_time && (
            <p className="text-red-500 text-sm">{errors.start_time.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="duration" className="block text-gray-700">
            Duration (minutes)
          </label>
          <input
            id="duration"
            type="number"
            {...register('duration', {
              required: 'Duration is required',
              min: { value: 1, message: 'Duration must be at least 1 minute' },
            })}
            className="w-full px-3 py-2 border rounded"
            placeholder="e.g., 30"
          />
          {errors.duration && (
            <p className="text-red-500 text-sm">{errors.duration.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="host_email" className="block text-gray-700">
            Host Email
          </label>
          <input
            id="host_email"
            type="email"
            {...register('host_email', {
              required: 'Host email is required',
              pattern: {
                value: /^\S+@\S+$/i,
                message: 'Invalid email address',
              },
            })}
            className="w-full px-3 py-2 border rounded"
            placeholder="e.g., host@example.com"
          />
          {errors.host_email && (
            <p className="text-red-500 text-sm">{errors.host_email.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? 'Scheduling...' : 'Schedule Meeting'}
        </button>
      </form>

      {/* Display Meeting Link */}
      {meetingLink && (
        <div className="mt-6 p-4 bg-green-100 text-green-700 rounded">
          <h3 className="text-lg font-semibold mb-2">Meeting Scheduled Successfully!</h3>
          <p>
            <strong>Meeting Link:</strong>{' '}
            <a href={meetingLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
              {meetingLink}
            </a>
          </p>
        </div>
        <label htmlFor="topic" className="block text-gray-700">
        Meeting Topic
      </label>
      <input
        id="topic"
        type="text"
        {...register('topic', { required: 'Meeting topic is required' })}
        className="w-full px-3 py-2 border rounded"
        placeholder="e.g., Career Guidance Session"
        aria-invalid={errors.topic ? 'true' : 'false'}
      />
      {errors.topic && (
        <p className="text-red-500 text-sm" role="alert">
          {errors.topic.message}
        </p>
      )}
      
      )}
    </div>
  );
};

export default ScheduleMeeting;
