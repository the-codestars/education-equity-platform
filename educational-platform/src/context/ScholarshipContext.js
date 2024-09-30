// src/context/ScholarshipContext.js
import React, { createContext, useState } from 'react';
import { getScholarshipGuidance } from '../api/scholarship';

export const ScholarshipContext = createContext();

const ScholarshipProvider = ({ children }) => {
  const [guidance, setGuidance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchGuidance = async (params) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getScholarshipGuidance(params);
      setGuidance(data);
    } catch (err) {
      console.error('Error fetching scholarship guidance:', err);
      setError('Failed to fetch scholarship guidance. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScholarshipContext.Provider value={{ guidance, loading, error, fetchGuidance }}>
      {children}
    </ScholarshipContext.Provider>
  );
};

export default ScholarshipProvider;
