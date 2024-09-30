// src/pages/MeetingsPage.js
import React, { useContext, useEffect } from 'react';
import { MeetingContext } from '../context/MeetingContext';
import { toast } from 'react-toastify';
import useNotification from '../hooks/useNotification';

const MeetingsPage = () => {
  const { upcomingMeetings, pastMeetings, loading, error, handleCancelMeeting, refreshMeetings } = useContext(MeetingContext);
  const { sendNotification } = useNotification();

  useEffect(() => {
    const now = new Date();

    upcomingMeetings.forEach((meeting) => {
      const meetingTime = new Date(meeting.start_time);
      const timeDifference = meetingTime - now;
      const reminderTime = 15 * 60 * 1000; // 15 minutes before

      if (timeDifference > 0 && timeDifference <= reminderTime) {
        sendNotification('Meeting Reminder', {
          body: `You have a meeting titled "${meeting.topic}" scheduled at ${meetingTime.toLocaleTimeString()}.`,
          icon: '/path-to-icon.png', // Optional: Path to an icon image
        });
      }
    });
  }, [upcomingMeetings, sendNotification]);

  const onCancel = async (meetingId) => {
    const confirm = window.confirm('Are you sure you want to cancel this meeting?');
    if (!confirm) return;
  
    const success = await handleCancelMeeting(meetingId);
    if (success) {
      toast.success('Meeting cancelled successfully.');
    } else {
      toast.error('Failed to cancel the meeting.');
    }
  };
  

  // Inside MeetingsPage.js

if (loading) {
  return (
    <div className="flex items-center justify-center h-screen">
      <svg
        className="animate-spin -ml-1 mr-3 h-10 w-10 text-blue-500"
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
      <span>Loading meetings...</span>
    </div>
  );
}


  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded mt-8">
      <h2 className="text-2xl font-bold mb-6">Your Meetings</h2>

      {/* Upcoming Meetings */}
      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Upcoming Meetings</h3>
        {upcomingMeetings.length > 0 ? (
          <ul className="space-y-4">
            {upcomingMeetings.map((meeting) => (
              <li key={meeting.id} className="p-4 border rounded flex justify-between items-center">
                <div>
                  <h4 className="text-lg font-bold">{meeting.topic}</h4>
                  <p className="text-gray-600">
                    <strong>Date & Time:</strong>{' '}
                    {new Date(meeting.start_time).toLocaleString()}
                  </p>
                  <p className="text-gray-600">
                    <strong>Duration:</strong> {meeting.duration} minutes
                  </p>
                  <p className="text-gray-600">
                    <strong>Meeting Link:</strong>{' '}
                    <a href={meeting.meeting_link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                      Join Meeting
                    </a>
                  </p>
                </div>
                <button
  onClick={() => onCancel(meeting.id)}
  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
  aria-label={`Cancel meeting titled ${meeting.topic}`}
>
  Cancel
</button>

              </li>
            ))}
          </ul>
        ) : (
          <p>No upcoming meetings scheduled.</p>
        )}
      </section>

      {/* Past Meetings */}
      <section>
        <h3 className="text-xl font-semibold mb-4">Past Meetings</h3>
        {pastMeetings.length > 0 ? (
          <ul className="space-y-4">
            {pastMeetings.map((meeting) => (
              <li key={meeting.id} className="p-4 border rounded">
                <h4 className="text-lg font-bold">{meeting.topic}</h4>
                <p className="text-gray-600">
                  <strong>Date & Time:</strong>{' '}
                  {new Date(meeting.start_time).toLocaleString()}
                </p>
                <p className="text-gray-600">
                  <strong>Duration:</strong> {meeting.duration} minutes
                </p>
                <p className="text-gray-600">
                  <strong>Meeting Link:</strong>{' '}
                  <a href={meeting.meeting_link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                    View Recording
                  </a>
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No past meetings available.</p>
        )}
      </section>

      {/* Refresh Button */}
      <button
        onClick={refreshMeetings}
        className="mt-6 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Refresh Meetings
      </button>
      
    </div>
  );
};

export default MeetingsPage;
