import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Question } from "./Utils/InterfaceQuiz";
import "bootstrap/dist/css/bootstrap.css";
import "./Quiz.css";
import { BeLogin } from "../../Authentication/Login/BeLogin";
import { Option } from "./Utils/Option";
import { RedirectBtn } from "../../Others/RedirectBtn";
import { handleNetworkError } from "../../Utils/handlers/networkErrorFunctions";
import { NavBar } from "../MainMenu/NavBar/NavBar";
import { Header } from "../MainMenu/Headers/Header";
import {
  replaceCharacter,
  removeFirstCharacter,
  removePart,
} from "../CRUD-question/MenuCrud/ShowTables/utils/stringHelpers";
import { Footer } from "../MainMenu/Footer/Footer";
import { quizStrings } from "./Utils/QuizStrings";
import { AnswerOption } from "./Utils/AnswerOption";

export const Quiz: React.FC = () => {
  const { tableName } = useParams<string>();
  const user = localStorage.getItem("user");
  const [testName, setTestName] = useState<string>("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState<number>(0);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [previousQuestionAnswered, setPreviousQuestionAnswered] =
    useState<boolean>(false);

  const handleTestName = useCallback(() => {
    const tableNameValue = tableName || "";
    const userNameValue = user || "";
    setTestName(() =>
      replaceCharacter(
        removeFirstCharacter(removePart(tableNameValue, userNameValue)),
      ),
    );
  }, [tableName, user]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    handleTestName();
    setIsAuthenticated(!!token);
    axios
      .get(`http://localhost:3001/quiz/${tableName}`)
      .then((response) => {
        setQuestions(response.data.quizeData);
      })
      .catch((error) => {
        handleNetworkError(error);
      });
  }, [tableName, handleTestName]);

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
        <NavBar />
        <Header nazwaTabeli={testName} />
        <div className="container-sm d-flex justify-content-center align-items-center vh-10">
          <div className="text-center text-danger">
            <h1>{quizStrings.end}</h1>
            <p className="h2">{quizStrings.score} {score}!</p>
            <button
              className="btn btn-outline-danger btn-lg"
              onClick={handleRestartQuiz}
            >
              {quizStrings.again}
            </button>
            <RedirectBtn to="/after-login">Menu</RedirectBtn>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <NavBar />
      <Header nazwaTabeli={testName} />
      <div className="container-sm">
        <div className="row">
          {questions.length > 0 && (
            <div className="col-md-6">
              <h1 className="text-white ">{quizStrings.question} {currentQuestion + 1}:</h1>
              <p className="quiz-question text-white">
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

          <div className="col-md-6">
            {isCorrect && <p className="correct-answer">{quizStrings.correct}</p>}
            {!isCorrect && isCorrect !== null && (
              <>
                <p className="incorrect-answer">{quizStrings.incorrect}</p>
                <br />
                <p className="incorrect-answer_p">
                  {questions[currentQuestion - 1].question}
                </p>
                <p className="incorrect-answer_p text-white">
                  {quizStrings.whichAnswer}{" "}
                  {questions[currentQuestion - 1].correctAnswer}
                </p>
              </>
            )}

            <div className="btn">
              <button
                className="btn btn-outline-success btn-lg"
                onClick={handleNextQuestion}
              >
                {quizStrings.next}
              </button>
              {previousQuestionAnswered && (
                <button
                  className="btn btn-outline-danger btn-lg"
                  onClick={handlePreviousQuestion}
                >
                  {quizStrings.back}
                </button>
              )}
              <RedirectBtn to="/after-login">Menu</RedirectBtn>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
