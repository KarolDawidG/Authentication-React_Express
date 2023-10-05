import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ImportExport.css";
import { notify } from "../../../../Others/Notify";
import { ImportExportProps } from "./ImportExportProps";

export const ImportData: React.FC<ImportExportProps> = ({tableName, onClose}) => {
  const [fileData, setFileData] = useState<string>("");
  const navigate = useNavigate();

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const fileContents = e.target?.result as string;
        setFileData(fileContents);
      };
      reader.readAsText(file);
    }
  };

  const handleParseData = () => {
    const lines = fileData.split("\n");
    const jsonData = [];

    for (let i = 0; i < lines.length; i += 6) {
      const question = lines[i]?.trim() || "";
      const optionA = lines[i + 1]?.trim() || "";
      const optionB = lines[i + 2]?.trim() || "";
      const optionC = lines[i + 3]?.trim() || "";
      const correctAnswer = lines[i + 4]?.trim() || "";
      const postString = lines[i + 5]?.trim() || "";

      if (postString !== "") {
        notify("Błądny format danych!");
        return;
      }

      const dataObject = {
        question,
        optionA,
        optionB,
        optionC,
        correctAnswer,
        postString,
      };

      jsonData.push(dataObject);
    }
    saveDataToServer(jsonData);

    setTimeout(() => {
      navigate(0);
    }, 1000);

    onClose();
  };

  const saveDataToServer = async (jsonData: any) => {
    try {
      await axios.post(`http://localhost:3001/import/${tableName}`, jsonData);
    } catch (error) {
      console.error("Błąd podczas dodawania pytania:", error);
    }
  };

  return (
    <div className="rectangle-overlay">
      <div className="rectangle-content">
        <input type="file" accept=".txt" onChange={handleFileInputChange} />
        <button onClick={handleParseData}>Przetwórz dane</button>
        <button onClick={onClose}>Zamknij</button>
      </div>
    </div>
  );
};
