// src/context/UserProfileContext.js
import React, { createContext, useState, useEffect } from 'react';
import { getUserProfile, updateUserProfile, uploadProfilePicture } from '../api/userProfile';
import { toast } from 'react-toastify';

export const UserProfileContext = createContext();

const UserProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getUserProfile();
        setProfile(data.profile);
      } catch (err) {
        console.error('Error fetching user profile:', err);
        setError('Failed to fetch user profile.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  /**
   * Update the user's profile.
   * @param {Object} updatedData - The data to update the profile with.
   */
  const handleUpdateProfile = async (updatedData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await updateUserProfile(updatedData);
      setProfile(data.profile);
      toast.success('Profile updated successfully.');
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('Failed to update profile.');
      toast.error('Failed to update profile.');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Upload a new profile picture.
   * @param {File} imageFile - The image file to upload.
   */
  const handleUploadProfilePicture = async (imageFile) => {
    setLoading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append('profile_picture', imageFile);

      const data = await uploadProfilePicture(formData);
      setProfile((prevProfile) => ({
        ...prevProfile,
        profile_picture: data.profile_picture,
      }));
      toast.success('Profile picture updated successfully.');
    } catch (err) {
      console.error('Error uploading profile picture:', err);
      setError('Failed to upload profile picture.');
      toast.error('Failed to upload profile picture.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserProfileContext.Provider
      value={{
        profile,
        loading,
        error,
        handleUpdateProfile,
        handleUploadProfilePicture,
      }}
    >
      {children}
    </UserProfileContext.Provider>
  );
};

export default UserProfileProvider;
