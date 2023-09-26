import React, { useState, useEffect } from "react";
import axios from "axios";
import { RedirectBtn } from "../../Others/RedirectBtn";
import { Question } from "./InterfaceQuiz";
import { handleNetworkError } from "../../Authentication/Login/handlers/networkErrorFunctions";
import "./Quiz.css";
import { BeLogin } from "../../Authentication/Login/BeLogin";
import { Option } from "./Utils/Option";
import { QUIZ } from "../../Utils/links";

export const Quiz: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState<number>(0);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [previousQuestionAnswered, setPreviousQuestionAnswered] =
    useState<boolean>(false);

  const handleFetch = async () => {
    try {
      const res = await axios.get(QUIZ);
      const data = res.data;
      setQuestions(data.quizeData);
    } catch (error: any) {
      handleNetworkError(error);
    }
  };

  useEffect(() => {
    try {
      handleFetch();
    } catch (error: any) {
      handleNetworkError(error);
    }

    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedOption("");
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
    setSelectedOption("");
    setPreviousQuestionAnswered(true);
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setIsCorrect(null);
      setSelectedOption("");
      setPreviousQuestionAnswered(false);
    }
  };

  if (!isAuthenticated) {
    return <BeLogin />;
  }

  if (currentQuestion >= questions.length) {
    return (
      <div className="container">
        <div className="quiz-finished">
          <h1>Quiz zakończony!</h1>
          <h2>Zdobyłeś: {score} pkt</h2>
          <button className="restart-button" onClick={handleRestartQuiz}>
            Zagraj jeszcze raz
          </button>
          <RedirectBtn to="/after-login">Menu główne</RedirectBtn>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container">
        <div className="quiz-question-container">
          <h1>Pytanie {currentQuestion + 1}:</h1>
          <p className="quiz-question">{questions[currentQuestion].question}</p>

          <Option
            label={questions[currentQuestion].optionA}
            value="A"
            selected={selectedOption === "A"}
            onChange={() => setSelectedOption("A")}
          />

          <br />

          <Option
            label={questions[currentQuestion].optionB}
            value="B"
            selected={selectedOption === "B"}
            onChange={() => setSelectedOption("B")}
          />

          <br />

          <Option
            label={questions[currentQuestion].optionC}
            value="C"
            selected={selectedOption === "C"}
            onChange={() => setSelectedOption("C")}
          />
          <br />
        </div>

        <div className="answers">
          {isCorrect && <p className="correct-answer">Odpowiedź poprawna!</p>}
          {!isCorrect && isCorrect !== null && (
            <>
              <p className="incorrect-answer">Odpowiedź niepoprawna.</p>
              <br />
              <p className="incorrect-answer_p">
                {questions[currentQuestion - 1].question}
              </p>
              <p className="incorrect-answer_p">
                Poprawna odpowiedź to:{" "}
                {questions[currentQuestion - 1].correctAnswer}
              </p>
            </>
          )}

          <div className="btn">
            <button className="next-button" onClick={handleNextQuestion}>Następne</button>
            {previousQuestionAnswered && (
            <button className="previous-button" onClick={handlePreviousQuestion}>Cofnij</button>)}
          </div>

          <RedirectBtn to="/after-login">Menu główne</RedirectBtn>
        </div>
      </div>
    </>
  );
};
