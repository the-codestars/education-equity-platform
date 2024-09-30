// src/api/analytics.js
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api';

/**
 * Log an event to the analytics system.
 * @param {string} eventType - The type of event.
 * @param {Object} eventData - Additional data for the event.
 */
export const logEvent = async (eventType, eventData = {}) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/analytics/log`, {
      event_type: eventType,
      event_data: eventData,
    });
    return response.data;
  } catch (error) {
    console.error('Error logging event:', error);
  }
};

/**
 * Fetch analytics dashboard data.
 * @param {Object} params - Query parameters for filters.
 */
export const getDashboardData = async (params = {}) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/analytics/dashboard`, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
  }
};
