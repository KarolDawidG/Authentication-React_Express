import React, { useState } from "react";
import { QuestionsListProps } from "../../../../Utils/Interfaces/QuestionListProps";
import axios from "axios";
import { handleNetworkError } from "../../../../Authentication/Login/handlers/networkErrorFunctions";
import { useNavigate } from "react-router-dom";
import "./QuestionTable.css";
import 'bootstrap/dist/css/bootstrap.css';
import { EditForm } from "../../EditTable/EditForm";
import { TableColumn } from "./helpers/TableColumn";

interface QuestionTableProps {
  questionsList: QuestionsListProps[] | null;
  tableName: string | undefined;
}


export const QuestionTable: React.FC<QuestionTableProps> = ({
  questionsList,
  tableName,
}) => {
  
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<
    | any
    | {
        id: string;
        question: string;
        optionA: string;
        optionB: string;
        optionC: string;
        correctAnswer: string;
      }
  >();

  const navigate = useNavigate();

  const handleEditClick = (question: any) => {
    setIsEditFormVisible(true);
    setSelectedQuestion(question);
  };

  const handleDelete = async (tableName: string | undefined, id: number) => {
    try {
      await axios.delete(
        `http://localhost:3001/create-question/${tableName}/${id}`,
      );
      navigate(0);
    } catch (error: any) {
      handleNetworkError(error);
    }
  };

  return (
    <>
      <p className="p-3 mb-2 bg-success text-white"> Lista pytań: </p>
      <div className="question-table my-custom-scrollbar">
        <table className="table table-hover">
          <thead>
            <tr className=" question-table__header">
              <th>No</th>
              <th >Pytanie</th>
              <th >A</th>
              <th >B</th>
              <th >C</th>
              <th >Odp.</th>
              <th >Delete</th>
              <th >Update</th>
            </tr>
          </thead>
          <tbody>
            {questionsList ? (
              questionsList.map((question, index) => (
                <tr key={question.id} >
                  <td >{index + 1}</td>

                  <TableColumn value={question.question} title={question.question} placement="top" />
                  <TableColumn value={question.optionA} title={question.optionA} placement="top" />
                  <TableColumn value={question.optionB} title={question.optionB} placement="top" />
                  <TableColumn value={question.optionC} title={question.optionC} placement="top" />
                  
                  <td >{question.correctAnswer}</td>
                  <td >
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(tableName, question.id)}
                    >
                      Delete
                    </button>
                  </td>
                  <td >
                    <button
                      className="btn btn-success"
                      onClick={() => handleEditClick(question)}
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td>
                  Brak pytań do wyświetlenia.
                </td>
              </tr>
            )}
            {isEditFormVisible && (
              <EditForm
                question={selectedQuestion}
                tableName={tableName}
                onClose={() => setIsEditFormVisible(false)}
              />
            )}
          </tbody>
          <caption><p className="text-info">List of questions</p></caption>
        </table>
      </div>
    </>
    
  );
};
