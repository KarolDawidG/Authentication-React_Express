import React, {  useState } from "react";
import axios from "axios";
import "./ImportExport.css";
import { ImportExportProps } from "./ImportExportProps";

interface MyData {
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  correctAnswer: string;
}

export const ExportData: React.FC<ImportExportProps> = ({tableName, onClose}) => {
  const [fileName, setFileName] = useState("tableData.txt");

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/export/${tableName}`,
      );
      saveDataToFile(response.data.tableData);
    } catch (error) {
      console.error("Błąd podczas dodawania pytania:", error);
    }
  };

  const saveDataToFile = (txtData: MyData[]) => {
    const txtDataString = txtData
      .map((item: MyData) => {
        return `${item.question}\n${item.optionA}\n${item.optionB}\n${item.optionC}\n${item.correctAnswer}\n\n`;
      })
      .join("");
  
    const blob = new Blob([txtDataString], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
  
    a.click();
  
    window.URL.revokeObjectURL(url);
    onClose();

  };
  
  const handleFileNameChange = (event: any) => {
    setFileName(event.target.value);
  };

  return (
    <div className="rectangle-overlay">
      <div className="rectangle-content">
        <div>
          <label>Nazwa pliku:</label>
          <input type="text" value={fileName} onChange={handleFileNameChange} />
        </div>
        <button onClick={fetchData}>Zapisz do pliku</button>
        <button onClick={onClose}>Zamknij</button>
      </div>
    </div>
  );
};