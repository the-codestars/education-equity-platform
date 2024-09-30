// src/pages/Register.js
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../context/AuthContext';

const Register = () => {
  const { register: registerUser } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('email', data.email);
    formData.append('full_name', data.full_name);
    formData.append('date_of_birth', data.date_of_birth);
    formData.append('password', data.password);
    formData.append('role', data.role);
    if (data.bio) formData.append('bio', data.bio);
    if (data.profile_image) formData.append('file', data.profile_image[0]);

    try {
      await registerUser(formData);
    } catch (error) {
      alert('Registration failed. Please check your inputs.');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4">Register</h2>

        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            {...register('email', { required: 'Email is required' })}
            className="w-full px-3 py-2 border rounded"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-4">
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

        <div className="mb-4">
          <label className="block text-gray-700">Date of Birth</label>
          <input
            type="date"
            {...register('date_of_birth', { required: 'Date of birth is required' })}
            className="w-full px-3 py-2 border rounded"
          />
          {errors.date_of_birth && (
            <p className="text-red-500 text-sm">
              {errors.date_of_birth.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            {...register('password', { required: 'Password is required' })}
            className="w-full px-3 py-2 border rounded"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Role</label>
          <select
            {...register('role', { required: 'Role is required' })}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="">Select Role</option>
            <option value="student">Student</option>
            <option value="mentor">Mentor</option>
          </select>
          {errors.role && (
            <p className="text-red-500 text-sm">{errors.role.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Bio (Optional)</label>
          <textarea
            {...register('bio')}
            className="w-full px-3 py-2 border rounded"
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Profile Image (Optional)</label>
          <input
            type="file"
            accept="image/*"
            {...register('profile_image')}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
