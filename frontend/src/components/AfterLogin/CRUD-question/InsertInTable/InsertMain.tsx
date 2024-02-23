import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  removeFirstCharacter,
  removePart,
  replaceCharacter,
} from "../MenuCrud/ShowTables/utils/stringHelpers";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import { handleNetworkError } from "../../../Utils/handlers/networkErrorFunctions";
import { QuestionTable } from "./Table/QuestionTable";
import { QuestionsListProps } from "../../../Utils/Interfaces/QuestionListProps";
import { Header } from "../../MainMenu/Headers/Header";
import { ImportExport } from "../ImportExport/ImportExport";
import { NavBar } from "../../MainMenu/NavBar/NavBar";
import { Footer } from "../../MainMenu/Footer/Footer";
import { CREATE_QUESTION } from "../../../Utils/links";

export const InsertMain = () => {
  const { username, tableName } = useParams();
  const nazwaTabeli =
    tableName && username
      ? replaceCharacter(removeFirstCharacter(removePart(tableName, username)))
      : "";
  const [questionsList, setQuestionsList] = useState<
    QuestionsListProps[] | null
  >(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${CREATE_QUESTION}/${tableName}`,
        );
        const {
          data: { quizzesList: questionsList },
        } = res;
        setQuestionsList(questionsList);
      } catch (error: any) {
        handleNetworkError(error);
      }
    };
    fetchData();
  }, [tableName]);

  return (
    <>
      <NavBar />
      <Header nazwaTabeli={nazwaTabeli} />
      <div className="container-sm">
        <QuestionTable questionsList={questionsList} tableName={tableName} />
        <ImportExport tableName={tableName} />
      </div>
      <Footer />
    </>
  );
};
