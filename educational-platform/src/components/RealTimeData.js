// src/components/RealTimeData.js
import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';

const RealTimeData = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'liveUpdates'), orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
      });
      setData(items);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded mt-8">
      <h2 className="text-2xl font-bold mb-4">Live Updates</h2>
      <ul className="space-y-2">
        {data.map((item) => (
          <li key={item.id} className="p-4 bg-gray-100 rounded">
            <p className="text-gray-700">{item.content}</p>
            <span className="text-sm text-gray-500">
              {new Date(item.timestamp?.toDate()).toLocaleString()}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RealTimeData;
