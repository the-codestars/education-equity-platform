// src/pages/ViewAssignment.js

import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext"; // Adjust the path if necessary

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const ViewAssignment = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { token } = useContext(AuthContext); // Retrieve token from AuthContext

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        console.log("Here");
        const response = await axios.get(`${API_BASE_URL}/assignments`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });

        setAssignments(response.data); // Adjust based on your API's response structure
      } catch (err) {
        setError("Failed to fetch assignments. Please try again later.");
        console.error("Error fetching assignments:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, [token]);

  if (loading) {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold text-primary mb-4">
          View Assignments
        </h1>
        <p>Loading assignments...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold text-primary mb-4">
          View Assignments
        </h1>
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-primary mb-6">View Assignments</h1>
      {assignments.length === 0 ? (
        <p>No assignments available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">#</th>
                <th className="py-2 px-4 border-b">Title</th>
                <th className="py-2 px-4 border-b">Description</th>
                <th className="py-2 px-4 border-b">Due Date</th>
                {/* Add more headers as needed */}
              </tr>
            </thead>
            <tbody>
              {assignments.map((assignment, index) => (
                <tr key={assignment.id} className="text-center">
                  <td className="py-2 px-4 border-b">{index + 1}</td>
                  <td className="py-2 px-4 border-b">{assignment.title}</td>
                  <td className="py-2 px-4 border-b">
                    {assignment.description}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {new Date(assignment.due_date).toLocaleDateString()}
                  </td>
                  {/* Add more cells as needed */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ViewAssignment;
