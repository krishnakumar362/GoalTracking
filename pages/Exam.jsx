import React, { useState } from 'react';
import { questions } from '../components/questions';
import { useNavigate } from 'react-router-dom';

const Exam = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const navigate = useNavigate();

  const handleAnswer = () => {
    if (selectedOption === questions[currentQuestion].answer) {
      setScore(score + 1);
    }
    setSelectedOption('');
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      navigate('/result', { state: { score } });
    }
  };

  return (
    <div className="quiz-container">
      <h3 className="exam-set">Prepration for IIT Exam.

      </h3>
      <h2 className='quextion-quiz'>Question {currentQuestion + 1}</h2>
      <p className='question-name'>{questions[currentQuestion].question}</p>
      <div className="options">
        {questions[currentQuestion].options.map((option, index) => (
          <button
            key={index}
            className={`option-button ${selectedOption === option ? 'selected' : ''}`}
            onClick={() => setSelectedOption(option)}
          >
            {option}
          </button>
        ))}
      </div>
      <button className=" next-butt" onClick={handleAnswer} disabled={!selectedOption}>
        Next..
      </button>
    </div>
  );
};

export default Exam;
