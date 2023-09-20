import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { RedirectBtn } from '../Others/RedirectBtn';
import { Question } from './InterfaceQuiz';
import { handleNetworkError } from '../Authentication/Login/handlers/networkErrorFunctions';

export const Quiz: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState<number>(0);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [previousQuestionAnswered, setPreviousQuestionAnswered] = useState<boolean>(
    false
  );

  useEffect(() => {
    axios
      .get('http://localhost:3001/quiz')
      .then((response) => {
        setQuestions(response.data.quizeData);
      })
      .catch((error) => {
        handleNetworkError(error);
      });

    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedOption('');
    setIsCorrect(null);
    setScore(0);
    setPreviousQuestionAnswered(false);
  };

  const handleNextQuestion = () => {
    if (selectedOption === questions[currentQuestion].correctAnswer) {
      setIsCorrect(true);
      setScore(score + 1);
    } else {
      setIsCorrect(false);
    }

    setCurrentQuestion(currentQuestion + 1);
    setSelectedOption('');
    setPreviousQuestionAnswered(true);
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setIsCorrect(null);
      setSelectedOption('');
      setPreviousQuestionAnswered(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="container">
        <div className="right-side">
          <h1>Musisz być zalogowany, aby rozpocząć quiz.</h1>
        </div>
      </div>
    );
  }

  if (currentQuestion >= questions.length) {
    return (
      <div className="container">
        <div className="right-side">
          <h1>Quiz zakończony!</h1>
          <h2>Zdobyłeś: {score} pkt</h2>
          <button onClick={handleRestartQuiz}>Zagraj jeszcze raz</button>
          <RedirectBtn to="/after-login">Menu główne</RedirectBtn>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container">
        <div className="right-side">
          <h1>Pytanie {currentQuestion + 1}:</h1>
          <p>{questions[currentQuestion].question}</p>

          <label>
            <input
              type="radio"
              name="option"
              value="A"
              checked={selectedOption === 'A'}
              onChange={() => setSelectedOption('A')}
            />
            {questions[currentQuestion].optionA}
          </label>

          <br />

          <label>
            <input
              type="radio"
              name="option"
              value="B"
              checked={selectedOption === 'B'}
              onChange={() => setSelectedOption('B')}
            />
            {questions[currentQuestion].optionB}
          </label>

          <br />

          <label>
            <input
              type="radio"
              name="option"
              value="C"
              checked={selectedOption === 'C'}
              onChange={() => setSelectedOption('C')}
            />
            {questions[currentQuestion].optionC}
          </label>

          <br />

          <button onClick={handleNextQuestion}>Następne pytanie</button>
          {previousQuestionAnswered && (
            <button onClick={handlePreviousQuestion}>Cofnij pytanie</button>
          )}

          <RedirectBtn to="/after-login">Menu główne</RedirectBtn>
        </div>
      </div>
      <div className="answers">
        {isCorrect && <p>Odpowiedź poprawna!</p>}
        {!isCorrect && isCorrect !== null && (
          <>
            <p>Odpowiedź niepoprawna.</p>
            Dla pytania:
            <br />
            {questions[currentQuestion - 1].question}
            <p>Poprawna odpowiedź to: {questions[currentQuestion - 1].correctAnswer}</p>
          </>
        )}
      </div>
    </>
  );
};
