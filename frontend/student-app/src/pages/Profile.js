// src/pages/Profile.js

import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext"; // Adjust the path if necessary

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const Profile = () => {
  const { token } = useContext(AuthContext); // Retrieve token from AuthContext
  const [profile, setProfile] = useState({
    interests: [],
    education_level: "",
    bio: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [updating, setUpdating] = useState(false);
  const [updateError, setUpdateError] = useState("");

  // Fetch current profile data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/students/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });
        // Assuming the response data structure matches the profile state
        setProfile({
          interests: response.data.interests || [],
          education_level: response.data.education_level || "",
          bio: response.data.bio || "",
        });
      } catch (err) {
        setError("Failed to fetch profile data. Please try again later.");
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
    setSuccess("");
    setUpdateError("");
  };

  // Handle interests change (assuming comma-separated values)
  const handleInterestsChange = (e) => {
    const { value } = e.target;
    const interestsArray = value.split(",").map((interest) => interest.trim());
    setProfile((prevProfile) => ({
      ...prevProfile,
      interests: interestsArray,
    }));
    setSuccess("");
    setUpdateError("");
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    setUpdateError("");
    setSuccess("");

    // Prepare the data to send
    const updateData = {
      interests: profile.interests,
      education_level: profile.education_level,
      bio: profile.bio,
    };

    try {
      const response = await axios.put(
        `${API_BASE_URL}/students/me`,
        updateData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      // Assuming the response contains the updated profile
      setProfile({
        interests: response.data.interests || [],
        education_level: response.data.education_level || "",
        bio: response.data.bio || "",
      });
      setSuccess("Profile updated successfully!");
    } catch (err) {
      setUpdateError("Failed to update profile. Please try again.");
      console.error("Error updating profile:", err);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold text-primary mb-4">Profile</h1>
        <p>Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold text-primary mb-4">Profile</h1>
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-primary mb-6">Profile</h1>
      <div className="bg-white p-6 rounded shadow-md">
        {/* Profile Information */}
        <div className="mb-6">
          <p>
            <strong>Interests:</strong>{" "}
            {profile.interests.length > 0
              ? profile.interests.join(", ")
              : "N/A"}
          </p>
          <p>
            <strong>Education Level:</strong> {profile.education_level || "N/A"}
          </p>
          <p>
            <strong>Bio:</strong> {profile.bio || "N/A"}
          </p>
          {/* Add more profile fields as needed */}
        </div>

        {/* Edit Profile Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="interests">
              Interests (separated by commas)
            </label>
            <input
              type="text"
              id="interests"
              name="interests"
              value={profile.interests.join(", ")}
              onChange={handleInterestsChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-primary"
              placeholder="e.g., Coding, Mathematics, Physics"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 mb-2"
              htmlFor="education_level"
            >
              Education Level
            </label>
            <select
              id="education_level"
              name="education_level"
              value={profile.education_level}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-primary"
              required
            >
              <option value="" disabled>
                Select your education level
              </option>
              <option value="High School">High School</option>
              <option value="Associate Degree">Associate Degree</option>
              <option value="Bachelor's Degree">Bachelor's Degree</option>
              <option value="Master's Degree">Master's Degree</option>
              <option value="Doctorate">Doctorate</option>
              {/* Add more options as needed */}
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="bio">
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              value={profile.bio}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-primary"
              placeholder="Tell us about yourself"
              rows="4"
            ></textarea>
          </div>

          {/* Success and Error Messages */}
          {success && <div className="mb-4 text-green-500">{success}</div>}
          {updateError && (
            <div className="mb-4 text-red-500">{updateError}</div>
          )}

          <button
            type="submit"
            className={`w-full bg-primary text-white py-2 rounded hover:bg-red-700 transition duration-200 ${
              updating ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={updating}
          >
            {updating ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
