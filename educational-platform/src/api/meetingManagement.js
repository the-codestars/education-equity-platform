// src/api/meetingManagement.js
import axiosInstance from './axios';

/**
 * Fetch upcoming meetings for the authenticated user.
 * GET /meetings/upcoming
 */
export const getUpcomingMeetings = async () => {
  const response = await axiosInstance.get('/meetings/upcoming');
  return response.data;
};

/**
 * Fetch past meetings for the authenticated user.
 * GET /meetings/past
 */
export const getPastMeetings = async () => {
  const response = await axiosInstance.get('/meetings/past');
  return response.data;
};

/**
 * Cancel a scheduled meeting.
 * DELETE /meetings/{meeting_id}
 * @param {string} meetingId - The ID of the meeting to cancel.
 */
export const cancelMeeting = async (meetingId) => {
  const response = await axiosInstance.delete(`/meetings/${meetingId}`);
  return response.data;
};
