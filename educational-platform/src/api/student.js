// src/api/student.js
import axiosInstance from './axios';

/**
 * Fetch the current student's profile.
 * GET /students/me
 */
export const getStudentProfile = async () => {
  const response = await axiosInstance.get('/students/me');
  return response.data;
};

/**
 * Update the current student's profile.
 * PUT /students/me
 * @param {Object} data - The profile data to update.
 */
export const updateStudentProfile = async (data) => {
  const response = await axiosInstance.put('/students/me', data);
  return response.data;
};

/**
 * Update the current student's profile image.
 * PUT /students/me/profile_image
 * @param {File} file - The profile image file.
 */
export const updateStudentProfileImage = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await axiosInstance.put('/students/me/profile_image', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};
