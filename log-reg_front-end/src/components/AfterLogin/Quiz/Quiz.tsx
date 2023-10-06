import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Question } from "./InterfaceQuiz";
import "./Quiz.css";
import { BeLogin } from "../../Authentication/Login/BeLogin";
import { Option } from "./Utils/Option";
import { RedirectBtn } from "../../Others/RedirectBtn";
import { handleNetworkError } from "../../Authentication/Login/handlers/networkErrorFunctions";
import { NavBar } from "../MainMenu/NavBar/NavBar";
import { Header } from "../MainMenu/Headers/Header";
enum AnswerOption {
  A = "A",
  B = "B",
  C = "C",
}

export const Quiz: React.FC = () => {
  const { tableName } = useParams();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState<number>(0);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [previousQuestionAnswered, setPreviousQuestionAnswered] =
    useState<boolean>(false);

    useEffect(() => {
      const token = localStorage.getItem("token");
      setIsAuthenticated(!!token);
      axios
        .get(`http://localhost:3001/quiz/${tableName}`)
        .then((response) => {
          setQuestions(response.data.quizeData);
        })
        .catch((error) => {
          handleNetworkError(error);
        });
    }, [tableName]);

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
<>
    <NavBar/>
    <Header/>
      <div className="container">
        <div className="quiz-finished">
          <h1>Quiz zakończony!</h1>
          <h2>Zdobyłeś: {score} pkt</h2>
          <button className="restart-button" onClick={handleRestartQuiz}>
            Zagraj jeszcze raz
          </button>
          <RedirectBtn to="/after-login">Menu</RedirectBtn>
        </div>
      </div>
</>
    );
  }

  return (
  <>
    <NavBar/>
    <Header/>
      <div className="container">
        {questions.length > 0 && (
          <div className="quiz-question-container">
            <h1>Pytanie {currentQuestion + 1}:</h1>
            <p className="quiz-question">
              {questions[currentQuestion].question}
            </p>

            <Option
              label={questions[currentQuestion].optionA}
              value={AnswerOption.A}
              selected={selectedOption === AnswerOption.A}
              onChange={() => setSelectedOption(AnswerOption.A)}
            />

            <br />

            <Option
              label={questions[currentQuestion].optionB}
              value={AnswerOption.B}
              selected={selectedOption === AnswerOption.B}
              onChange={() => setSelectedOption(AnswerOption.B)}
            />

            <br />

            <Option
              label={questions[currentQuestion].optionC}
              value={AnswerOption.C}
              selected={selectedOption === AnswerOption.C}
              onChange={() => setSelectedOption(AnswerOption.C)}
            />
            <br />
          </div>
        )}

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
            <button className="next-button" onClick={handleNextQuestion}>
              Następne
            </button>
            {previousQuestionAnswered && (
              <button
                className="previous-button"
                onClick={handlePreviousQuestion}
              >
                Cofnij
              </button>
            )}
          </div>

          <RedirectBtn to="/after-login">Back</RedirectBtn>
        </div>
      </div>
  </>
  );
};
