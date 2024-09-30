// src/context/StudentContext.js
import React, { createContext, useState, useEffect } from 'react';
import { getStudentProfile, updateStudentProfile, updateStudentProfileImage } from '../api/student';

export const StudentContext = createContext();

const StudentProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getStudentProfile();
        setProfile(data);
      } catch (error) {
        console.error('Error fetching student profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const refreshProfile = async () => {
    setLoading(true);
    try {
      const data = await getStudentProfile();
      setProfile(data);
    } catch (error) {
      console.error('Error refreshing student profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updatedData) => {
    try {
      const data = await updateStudentProfile(updatedData);
      setProfile(data);
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  };

  const updateProfileImage = async (file) => {
    try {
      const data = await updateStudentProfileImage(file);
      setProfile((prevProfile) => ({
        ...prevProfile,
        profile_image_url: data.profile_image_url,
      }));
    } catch (error) {
      console.error('Error updating profile image:', error);
      throw error;
    }
  };

  return (
    <StudentContext.Provider
      value={{
        profile,
        loading,
        refreshProfile,
        updateProfile,
        updateProfileImage,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};

export default StudentProvider;
