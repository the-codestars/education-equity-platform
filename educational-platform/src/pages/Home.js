// src/pages/Home.js
import React from 'react';
import RealTimeData from '../components/RealTimeData';

const Home = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-center mt-8">Welcome to EduPlatform</h1>
      <RealTimeData />
    </div>
  );
};

export default Home;
