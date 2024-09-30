// src/pages/ProfilePage.js
import React, { useContext, useState } from 'react';
import { UserProfileContext } from '../context/UserProfileContext';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const ProfilePage = () => {
  const { profile, loading, error, handleUpdateProfile, handleUploadProfilePicture } = useContext(UserProfileContext);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const onSubmit = (data) => {
    handleUpdateProfile(data);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type and size
      const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!validTypes.includes(file.type)) {
        toast.error('Only JPEG, PNG, and GIF files are allowed.');
        return;
      }
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error('Image size should be less than 5MB.');
        return;
      }
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleImageUpload = async () => {
    if (selectedImage) {
      setUploading(true);
      await handleUploadProfilePicture(selectedImage);
      setUploading(false);
      setSelectedImage(null);
      setImagePreview(null);
    }
  };
// Inside ProfilePage.js

{uploading && (
    <div className="flex items-center space-x-2">
      <svg
        className="animate-spin h-5 w-5 text-blue-500"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v8H4z"
        ></path>
      </svg>
      <span>Uploading...</span>
    </div>
  )}
  
  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading profile...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center mt-4">{error}</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded mt-8">
      <h2 className="text-2xl font-bold mb-6">My Profile</h2>

      {/* Profile Information Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="full_name" className="block text-gray-700">
            Full Name
          </label>
          <input
            id="full_name"
            type="text"
            defaultValue={profile.full_name}
            {...register('full_name', { required: 'Full name is required' })}
            className="w-full px-3 py-2 border rounded"
            placeholder="Enter your full name"
          />
          {errors.full_name && (
            <p className="text-red-500 text-sm mt-1">{errors.full_name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-gray-700">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            defaultValue={profile.email}
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^\S+@\S+$/i,
                message: 'Invalid email address',
              },
            })}
            className="w-full px-3 py-2 border rounded"
            placeholder="Enter your email address"
            readOnly
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="bio" className="block text-gray-700">
            Bio
          </label>
          <textarea
            id="bio"
            defaultValue={profile.bio}
            {...register('bio', { required: 'Bio is required' })}
            className="w-full px-3 py-2 border rounded"
            rows="4"
            placeholder="Tell us something about yourself"
          ></textarea>
          {errors.bio && (
            <p className="text-red-500 text-sm mt-1">{errors.bio.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Update Profile
        </button>
      </form>

      {/* Profile Picture Section */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Profile Picture</h3>
        <div className="flex items-center space-x-6">
          <img
            src={profile.profile_picture || '/default-avatar.png'}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover"
          />
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mb-2"
            />
            {imagePreview && (
              <div className="mb-2">
                <p className="text-gray-700">Preview:</p>
                <img src={imagePreview} alt="Preview" className="w-24 h-24 rounded-full object-cover" />
              </div>
            )}
            {selectedImage && (
              <button
                onClick={handleImageUpload}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                disabled={uploading}
              >
                {uploading ? 'Uploading...' : 'Upload Picture'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
