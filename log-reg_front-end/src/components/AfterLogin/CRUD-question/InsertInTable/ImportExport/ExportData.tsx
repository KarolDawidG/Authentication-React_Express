import React, { useState } from "react";
import axios from "axios";
import "./ImportExport.css";
import { ImportExportProps } from "./ImportExportProps";
import { saveDataToFile } from "./helpers/saveDataToFile ";

export const ExportData: React.FC<ImportExportProps> = ({
  tableName,
  onClose,
}) => {
  const [fileName, setFileName] = useState("tableData.txt");

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/export/${tableName}`,
      );
      saveDataToFile(response.data.tableData, fileName, onClose);
    } catch (error) {
      console.error("Błąd podczas dodawania pytania:", error);
    }
  };

  const handleFileNameChange = (event: any) => {
    setFileName(event.target.value);
  };

  return (
    <div className="rectangle-overlay">
      <div className="rectangle-content">
          <label>Nazwa pliku:</label>
          <input type="text" value={fileName} onChange={handleFileNameChange} />
        <button onClick={fetchData}>Zapisz do pliku</button>
        <button onClick={onClose}>Zamknij</button>
      </div>
    </div>
  );
};
