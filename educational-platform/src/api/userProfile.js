// src/api/userProfile.js
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api';

/**
 * Fetch the authenticated user's profile.
 * GET /user/profile
 * @returns {Object} - The user's profile data.
 */
export const getUserProfile = async () => {
  const response = await axios.get(`${API_BASE_URL}/user/profile`, {
    headers: {
      'Content-Type': 'application/json',
      // Include Authorization header if required
      // 'Authorization': `Bearer ${token}`,
    },
  });
  return response.data;
};

/**
 * Update the authenticated user's profile.
 * PUT /user/profile
 * @param {Object} profileData - The data to update the user's profile.
 * @returns {Object} - The updated user profile data.
 */
export const updateUserProfile = async (profileData) => {
  const response = await axios.put(`${API_BASE_URL}/user/profile`, profileData, {
    headers: {
      'Content-Type': 'application/json',
      // Include Authorization header if required
      // 'Authorization': `Bearer ${token}`,
    },
  });
  return response.data;
};

/**
 * Upload a new profile picture for the authenticated user.
 * POST /user/profile/picture
 * @param {FormData} formData - The form data containing the image file.
 * @returns {Object} - The updated profile picture URL.
 */
export const uploadProfilePicture = async (formData) => {
  const response = await axios.post(`${API_BASE_URL}/user/profile/picture`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      // Include Authorization header if required
      // 'Authorization': `Bearer ${token}`,
    },
  });
  return response.data;
};
