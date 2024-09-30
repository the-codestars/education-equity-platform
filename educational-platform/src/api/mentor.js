// src/api/mentor.js
import axiosInstance from './axios';

/**
 * Fetch the current mentor's profile.
 * GET /mentors/me
 */
export const getMentorProfile = async () => {
  const response = await axiosInstance.get('/mentors/me');
  return response.data;
};

/**
 * Update the current mentor's profile.
 * PUT /mentors/me
 * @param {Object} data - The profile data to update.
 */
export const updateMentorProfile = async (data) => {
  const response = await axiosInstance.put('/mentors/me', data);
  return response.data;
};

/**
 * Update the current mentor's profile image.
 * PUT /mentors/me/profile_image
 * @param {File} file - The profile image file.
 */
export const updateMentorProfileImage = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await axiosInstance.put('/mentors/me/profile_image', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};
