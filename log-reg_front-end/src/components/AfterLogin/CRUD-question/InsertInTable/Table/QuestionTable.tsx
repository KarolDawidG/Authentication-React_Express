import React from "react";
import { QuestionsListProps } from "../../../../Utils/Interfaces/QuestionListProps";
import axios from "axios";
import { handleNetworkError } from "../../../../Authentication/Login/handlers/networkErrorFunctions";
import { useNavigate } from "react-router-dom";
import "./QuestionTable.css";

interface QuestionTableProps {
  questionsList: QuestionsListProps[] | null;
  tableName: string | undefined;
}

export const QuestionTable: React.FC<QuestionTableProps> = ({ questionsList, tableName }) => {
  const navigate = useNavigate();

  const handleDelete = async (tableName: string | undefined, id: number) => {
    try {
      await axios.delete(`http://localhost:3001/create-question/${tableName}/${id}`);
      navigate(0);
    } catch (error: any) {
      handleNetworkError(error);
    }
  };

  return (
    <div className="question-table"> 
      <table className="question-table__table">
        <thead>
          <tr className="question-table__row question-table__header"> 
            <th>Indeks</th>
            <th className="question-table__cell">Pytanie</th>
            <th className="question-table__cell">A</th>
            <th className="question-table__cell">B</th>
            <th className="question-table__cell">C</th>
            <th className="question-table__cell">Answer</th>
            <th className="question-table__cell">Delete</th>
          </tr>
        </thead>
        <tbody>
          {questionsList ? (
            questionsList.map((question, index) => (
              <tr key={question.id} className="question-table__row">
                <td className="question-table__cell">{index + 1}</td>
                <td className="question-table__cell">{question.question}</td>
                <td className="question-table__cell">{question.optionA}</td>
                <td className="question-table__cell">{question.optionB}</td>
                <td className="question-table__cell">{question.optionC}</td>
                <td className="question-table__cell">{question.correctAnswer}</td>
                <td className="question-table__cell">
                  <button className="question-table__button" onClick={() => handleDelete(tableName, question.id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr className="question-table__row">
              <td className="question-table__cell" colSpan={6}>Brak pytań do wyświetlenia.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
