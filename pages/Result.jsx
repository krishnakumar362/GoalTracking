import React from 'react';
import { useLocation } from 'react-router-dom';

const Result = () => {
  const location = useLocation();
  const { score } = location.state;

  return (
    <div className="result-container">
      <h2>Your Score: {score}</h2>
      <button className='result-quiz' onClick={() => window.location.href = '/'}>Restart Quiz</button>
    </div>
  );
};

export default Result;
