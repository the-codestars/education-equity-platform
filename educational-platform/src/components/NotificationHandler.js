// src/components/NotificationHandler.js
import React, { useEffect } from 'react';
import { getToken } from 'firebase/messaging';
import { messaging } from '../firebase';

const NotificationHandler = () => {
  useEffect(() => {
    const requestPermission = async () => {
      try {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
          console.log('Notification permission granted.');

          // Get FCM token
          const token = await getToken(messaging, { vapidKey: 'YOUR_PUBLIC_VAPID_KEY' });
          if (token) {
            console.log('FCM Token:', token);
            // Send the token to your backend server to store it for sending notifications
            // Example:
            // await fetch('/api/save-token', {
            //   method: 'POST',
            //   headers: { 'Content-Type': 'application/json' },
            //   body: JSON.stringify({ token }),
            // });
          } else {
            console.warn('No registration token available. Request permission to generate one.');
          }
        } else {
          console.warn('Unable to get permission to notify.');
        }
      } catch (error) {
        console.error('Error getting permission for notifications:', error);
      }
    };

    requestPermission();
  }, []);

  return null; // This component doesn't render anything
};

export default NotificationHandler;
