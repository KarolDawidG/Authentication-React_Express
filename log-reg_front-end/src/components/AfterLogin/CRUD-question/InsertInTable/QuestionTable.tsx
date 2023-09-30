import React from "react";
import { QuestionsListProps } from "../../../Utils/Interfaces/QuestionListProps";
import axios from "axios";
import {handleNetworkError} from "../../../Authentication/Login/handlers/networkErrorFunctions";
import {useNavigate} from "react-router-dom";

interface QuestionTableProps {
    questionsList: QuestionsListProps[] | null;
    tableName: string | undefined;
}

export const QuestionTable: React.FC<QuestionTableProps> = ({ questionsList, tableName  }) => {
    const navigate = useNavigate();

    const handleDelete = async (tableName:string | undefined, id: number) => {
        try {
            await axios.delete(`http://localhost:3001/create-question/${tableName}/${id}`);
            navigate(0);
        } catch (error: any) {
            handleNetworkError(error);
        }
    };

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Pytanie</th>
          <th>1</th>
          <th>2</th>
          <th>3</th>
          <th>Answer</th>
            <th>Delete</th>
        </tr>
      </thead>
        <tbody>
        {questionsList ? (
            questionsList.map((question) => (
                <tr key={question.id}>
                    <td>{question.id}</td>
                    <td>{question.question}</td>
                    <td>{question.optionA}</td>
                    <td>{question.optionB}</td>
                    <td>{question.optionC}</td>
                    <td>{question.correctAnswer}</td>
                    <td>
                        <button onClick={() => handleDelete(tableName ,question.id)}>Delete</button>
                    </td>
                </tr>
            ))
        ) : (
            <tr>
                <td colSpan={6}>Brak pyta? do wy?wietlenia.</td>
            </tr>
        )}
        </tbody>

    </table>
  );
};
