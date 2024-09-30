// src/pages/MentorProfile.js
import React, { useContext, useState } from 'react';
import { MentorContext } from '../context/MentorContext';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const MentorProfile = () => {
  const { profile, loading, updateProfile, updateProfileImage } = useContext(MentorContext);
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      full_name: '',
      date_of_birth: '',
      expertise: '',
      years_of_experience: '',
      education: '',
      certifications: '',
      bio: '',
    },
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [updating, setUpdating] = useState(false);

  React.useEffect(() => {
    if (profile) {
      reset({
        full_name: profile.full_name || '',
        date_of_birth: profile.date_of_birth || '',
        expertise: profile.expertise.join(', ') || '',
        years_of_experience: profile.years_of_experience || '',
        education: profile.education || '',
        certifications: profile.certifications.join(', ') || '',
        bio: profile.bio || '',
      });
      setImagePreview(profile.profile_image_url || null);
    }
  }, [profile, reset]);

  const onSubmit = async (data) => {
    setUpdating(true);
    const updatedData = {
      full_name: data.full_name,
      date_of_birth: data.date_of_birth,
      expertise: data.expertise.split(',').map((item) => item.trim()),
      years_of_experience: parseInt(data.years_of_experience, 10),
      education: data.education,
      certifications: data.certifications.split(',').map((item) => item.trim()),
      bio: data.bio,
    };

    try {
      await updateProfile(updatedData);
      toast.success('Profile updated successfully.');
    } catch (error) {
      toast.error('Failed to update profile. Please try again.');
    } finally {
      setUpdating(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = async () => {
    if (!imageFile) return;
    setUpdating(true);
    try {
      await updateProfileImage(imageFile);
      toast.success('Profile image updated successfully.');
      setImageFile(null);
    } catch (error) {
      toast.error('Failed to update profile image. Please try again.');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded mt-8">
      <h2 className="text-2xl font-bold mb-6">Mentor Profile</h2>

      {/* Profile Image Section */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Profile Image</h3>
        <div className="flex items-center">
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover mr-4"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mr-4">
              <span className="text-gray-500">No Image</span>
            </div>
          )}
          <div>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {imageFile && (
              <button
                onClick={handleImageUpload}
                className="mt-2 bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600"
                disabled={updating}
              >
                {updating ? 'Uploading...' : 'Upload Image'}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Profile Information Form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name */}
          <div>
            <label className="block text-gray-700">Full Name</label>
            <input
              type="text"
              {...register('full_name', { required: 'Full name is required' })}
              className="w-full px-3 py-2 border rounded"
            />
            {errors.full_name && (
              <p className="text-red-500 text-sm">{errors.full_name.message}</p>
            )}
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-gray-700">Date of Birth</label>
            <input
              type="date"
              {...register('date_of_birth', { required: 'Date of birth is required' })}
              className="w-full px-3 py-2 border rounded"
            />
            {errors.date_of_birth && (
              <p className="text-red-500 text-sm">{errors.date_of_birth.message}</p>
            )}
          </div>

          {/* Expertise */}
          <div>
            <label className="block text-gray-700">Expertise</label>
            <input
              type="text"
              placeholder="e.g., Mathematics, Physics"
              {...register('expertise')}
              className="w-full px-3 py-2 border rounded"
            />
            <p className="text-gray-500 text-sm">Separate expertise areas with commas.</p>
          </div>

          {/* Years of Experience */}
          <div>
            <label className="block text-gray-700">Years of Experience</label>
            <input
              type="number"
              min="0"
              {...register('years_of_experience', { required: 'Years of experience is required' })}
              className="w-full px-3 py-2 border rounded"
            />
            {errors.years_of_experience && (
              <p className="text-red-500 text-sm">{errors.years_of_experience.message}</p>
            )}
          </div>

          {/* Education */}
          <div className="md:col-span-2">
            <label className="block text-gray-700">Education</label>
            <input
              type="text"
              {...register('education')}
              className="w-full px-3 py-2 border rounded"
              placeholder="e.g., B.Sc. in Computer Science"
            />
          </div>

          {/* Certifications */}
          <div className="md:col-span-2">
            <label className="block text-gray-700">Certifications</label>
            <input
              type="text"
              placeholder="e.g., AWS Certified Solutions Architect"
              {...register('certifications')}
              className="w-full px-3 py-2 border rounded"
            />
            <p className="text-gray-500 text-sm">Separate certifications with commas.</p>
          </div>

          {/* Bio */}
          <div className="md:col-span-2">
            <label className="block text-gray-700">Bio</label>
            <textarea
              {...register('bio')}
              className="w-full px-3 py-2 border rounded"
              rows="4"
              placeholder="Tell us something about yourself..."
            ></textarea>
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          disabled={updating}
        >
          {updating ? 'Updating...' : 'Update Profile'}
        </button>
      </form>
    </div>
  );
};

export default MentorProfile;
