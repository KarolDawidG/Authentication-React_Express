import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {RedirectBtn} from "../../../Others/RedirectBtn";
import {removeFirstCharacter, removePart, replaceCharacter} from "../ShowTables/utils/stringHelpers";
import axios from "axios";
import {handleNetworkError} from "../../../Authentication/Login/handlers/networkErrorFunctions";
import {QuestionTable} from "./Table/QuestionTable";
import {QuestionsListProps} from "../../../Utils/Interfaces/QuestionListProps";
import {InsertQuestion} from "./InsertQuestion/InsertQuestion";
import { Header } from "./Headers/Header";

export const InsertMain = () => {
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
            <Header username={username} nazwaTabeli={nazwaTabeli}/>
            <QuestionTable questionsList={questionsList} tableName={tableName}/>
            <InsertQuestion tableName={tableName}/>
            <RedirectBtn to="/crud-question?">Cofnij</RedirectBtn>
        </>
    );
};


