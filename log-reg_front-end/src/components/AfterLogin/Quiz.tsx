import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { RedirectBtn } from '../Others/RedirectBtn';

interface Question {
  id: number;
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  correctAnswer: string;
}

export const Quiz: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  useEffect(() => {
    axios.get('http://localhost:3001/quiz')
      .then((response) => {
        setQuestions(response.data.quizeData);
      })
      .catch((error) => {
        console.error('Błąd podczas pobierania pytań:', error);
      });
  }, []);

  const handleNextQuestion = () => {

    if (selectedOption === questions[currentQuestion].correctAnswer) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }

    setCurrentQuestion(currentQuestion + 1);
    setSelectedOption('');
  };

  if (currentQuestion >= questions.length) {
    return (
      <div>
        <h1>Quiz zakończony!</h1>
      </div>
    );
  }

  return (
    <div className='right-side'>
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
      {isCorrect && <p>Odpowiedź poprawna!</p>}
      {!isCorrect && isCorrect !== null && <p>Odpowiedź niepoprawna. Poprawna odpowiedź to: {questions[currentQuestion].correctAnswer}</p>}

      <RedirectBtn to='/after-login'>Menu główne</RedirectBtn>
    </div>
  );
};