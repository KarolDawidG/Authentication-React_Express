import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ImportExport.css";
import { ImportExportProps } from "./ImportExportProps";

export const ExportData: React.FC<ImportExportProps> = ({
  tableName,
  onClose,
}) => {
  const [tableData, setTableData] = useState([]);
  const [fileName, setFileName] = useState("tableData.txt");

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/export/${tableName}`,
      );
      const { data } = response;
      setTableData(data.tableData);
    } catch (error) {
      console.error("Błąd podczas dodawania pytania:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [tableName, fetchData]);

  const saveDataToFile = () => {
    fetchData();
    const txtData = tableData
      .map((item: any) => {
        return `${item.question}\n${item.optionA}\n${item.optionB}\n${item.optionC}\n${item.correctAnswer}\n\n`;
      })
      .join("");

    const blob = new Blob([txtData], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;

    a.click();

    window.URL.revokeObjectURL(url);
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
        <button onClick={saveDataToFile}>Zapisz do pliku</button>
        <button onClick={onClose}>Zamknij</button>
      </div>
    </div>
  );
};
