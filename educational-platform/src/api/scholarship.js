// src/api/scholarship.js
import axiosInstance from './axios';

/**
 * Get scholarship guidance based on user input.
 * GET /scholarships/guidance
 * @param {Object} params - Query parameters for guidance.
 * @returns {Object} - AI-based scholarship guidance data.
 */
export const getScholarshipGuidance = async (params) => {
  const response = await axiosInstance.get('/scholarships/guidance', { params });
  return response.data;
};
