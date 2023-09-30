import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import './InsertInTable.css';
import {RedirectBtn} from "../../../Others/RedirectBtn";
import {removeFirstCharacter, removePart, replaceCharacter} from "../ShowTables/utils/stringHelpers";
import axios from "axios";
import {handleNetworkError} from "../../../Authentication/Login/handlers/networkErrorFunctions";
import {QuestionTable} from "./QuestionTable";
import {QuestionsListProps} from "../../../Utils/Interfaces/QuestionListProps";
import {InsertQuestion} from "./InsertQuestion";

export const Insert = () => {
    const { username, tableName } = useParams();
    const nazwaTabeli = tableName && username ? replaceCharacter(removeFirstCharacter(removePart(tableName, username))) : '';
    const [questionsList, setQuestionsList] = useState<QuestionsListProps[] | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`http://localhost:3001/create-question/${tableName}`);
                const { data: { quizzesList: questionsList } } = res;
                setQuestionsList(questionsList);
            } catch (error: any) {
                handleNetworkError(error);
            }
        };
        fetchData();
    }, [tableName]);


    return (
        <>
            <div className="insert-container">
                <p className="insert__p">Zalogowany uzytkownik: {username}</p>
                <p className="insert__p">Nazwa tabeli: {nazwaTabeli}</p>
            </div>
            <QuestionTable questionsList={questionsList} tableName={tableName}/>
            <InsertQuestion tableName={tableName}/>
            <RedirectBtn to="/crud-question?">Cofnij</RedirectBtn>
        </>
    );
};


