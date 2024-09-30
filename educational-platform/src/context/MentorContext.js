// src/context/MeetingContext.js
import React, { createContext, useState, useEffect } from 'react';
import { getUpcomingMeetings, getPastMeetings, cancelMeeting } from '../api/meetingManagement';

export const MeetingContext = createContext();

const MeetingProvider = ({ children }) => {
  const [upcomingMeetings, setUpcomingMeetings] = useState([]);
  const [pastMeetings, setPastMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMeetings = async () => {
      setLoading(true);
      setError(null);
      try {
        const [upcoming, past] = await Promise.all([
          getUpcomingMeetings(),
          getPastMeetings(),
        ]);
        setUpcomingMeetings(upcoming.meetings);
        setPastMeetings(past.meetings);
      } catch (err) {
        console.error('Error fetching meetings:', err);
        setError('Failed to fetch meetings. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchMeetings();
  }, []);

  const removeUpcomingMeeting = (meetingId) => {
    setUpcomingMeetings((prevMeetings) =>
      prevMeetings.filter((meeting) => meeting.id !== meetingId)
    );
  };

  const removePastMeeting = (meetingId) => {
    setPastMeetings((prevMeetings) =>
      prevMeetings.filter((meeting) => meeting.id !== meetingId)
    );
  };

  const handleCancelMeeting = async (meetingId) => {
    try {
      await cancelMeeting(meetingId);
      removeUpcomingMeeting(meetingId);
      // Optionally, you can add the meeting to pastMeetings if needed
      return true;
    } catch (err) {
      console.error('Error cancelling meeting:', err);
      return false;
    }
  };

  return (
    <MeetingContext.Provider
      value={{
        upcomingMeetings,
        pastMeetings,
        loading,
        error,
        handleCancelMeeting,
        refreshMeetings: () => {
          // Function to refresh meetings by refetching
          const fetchMeetings = async () => {
            setLoading(true);
            setError(null);
            try {
              const [upcoming, past] = await Promise.all([
                getUpcomingMeetings(),
                getPastMeetings(),
              ]);
              setUpcomingMeetings(upcoming.meetings);
              setPastMeetings(past.meetings);
            } catch (err) {
              console.error('Error fetching meetings:', err);
              setError('Failed to fetch meetings. Please try again.');
            } finally {
              setLoading(false);
            }
          };

          fetchMeetings();
        },
      }}
    >
      {children}
    </MeetingContext.Provider>
  );
};

export default MeetingProvider;
