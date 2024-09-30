// src/api/meeting.js
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api';

/**
 * Schedule a new meeting.
 * POST /meetings/schedule
 * @param {Object} meetingDetails - Details of the meeting to schedule.
 * @returns {Object} - The scheduled meeting data including the meeting link.
 */
export const scheduleMeeting = async (meetingDetails) => {
  const response = await axios.post(`${API_BASE_URL}/meetings/schedule`, meetingDetails, {
    headers: {
      'Content-Type': 'application/json',
      // Include Authorization header if authentication is required
      // 'Authorization': `Bearer ${token}`,
    },
  });
  return response.data;
};
