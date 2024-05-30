import React from 'react';

const CircularRating = ({ rating }) => {
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const percentage = rating * 10;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center mt-2">
      <svg className="w-20 h-20" viewBox="0 0 120 120">
        <circle
          className="text-gray-300"
          strokeWidth="10"
          stroke="#333333"
          fill="transparent"
          r="50"
          cx="60"
          cy="60"
        />
        <circle
          className="text-blue-500"
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          stroke="#8000FF"
          fill="transparent"
          r="50"
          cx="60"
          cy="60"
          transform="rotate(-90 60 60)"
        />
      </svg>
      <span className="absolute text-xl font-bold text-white">{rating.toFixed(1)}</span>
    </div>
  );
};

export default CircularRating;
