// src/pages/NotificationsPage.js
import React, { useEffect, useState } from 'react';
import { collection, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { toast } from 'react-toastify';

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'notifications'), orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const notifs = [];
      querySnapshot.forEach((doc) => {
        notifs.push({ id: doc.id, ...doc.data() });
      });
      setNotifications(notifs);
    });

    return () => unsubscribe();
  }, []);

  const markAsRead = async (id) => {
    try {
      const notifRef = doc(db, 'notifications', id);
      await updateDoc(notifRef, { read: true });
      toast.success('Notification marked as read.');
    } catch (error) {
      console.error('Error marking notification as read:', error);
      toast.error('Failed to mark as read.');
    }
  };

  const deleteNotification = async (id) => {
    try {
      const notifRef = doc(db, 'notifications', id);
      await deleteDoc(notifRef);
      toast.success('Notification deleted.');
    } catch (error) {
      console.error('Error deleting notification:', error);
      toast.error('Failed to delete notification.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded mt-8">
      <h2 className="text-2xl font-bold mb-6">Your Notifications</h2>

      {notifications.length > 0 ? (
        <ul className="space-y-4">
          {notifications.map((notif) => (
            <li
              key={notif.id}
              className={`p-4 border rounded flex justify-between items-center ${
                !notif.read ? 'bg-blue-100' : 'bg-gray-100'
              }`}
            >
              <div>
                <p className="text-gray-700">{notif.message}</p>
                <p className="text-gray-500 text-sm">
                  {notif.timestamp?.toDate().toLocaleString()}
                </p>
              </div>
              <div className="flex space-x-2">
                {!notif.read && (
                  <button
                    onClick={() => markAsRead(notif.id)}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                  >
                    Mark as Read
                  </button>
                )}
                <button
                  onClick={() => deleteNotification(notif.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No notifications available.</p>
      )}
    </div>
  );
};

export default NotificationsPage;
