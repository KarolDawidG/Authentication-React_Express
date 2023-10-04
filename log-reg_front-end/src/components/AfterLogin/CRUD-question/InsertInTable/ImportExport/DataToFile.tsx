import React, { useEffect, useState } from "react";
import axios from "axios";
import './DataToFile.css';

interface ImportExportProps {
    tableName: string | undefined;
    onClose: () => void;
  }

export const DataToFile: React.FC<ImportExportProps> = ({tableName, onClose}) => {
  const [tableData, setTableData] = useState([]);
  const [fileName, setFileName] = useState("tableData.txt");

  useEffect(() => {
    
    axios.get(`http://localhost:3001/import/${tableName}`)
      .then((response) => {
        const { data } = response;
        setTableData(data.tableData);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [tableName]);

  const saveDataToFile = () => {
    const txtData = tableData.map((item:any) => {
      return `Question: ${item.question}\nOption A: ${item.optionA}\nOption B: ${item.optionB}\nOption C: ${item.optionC}\nCorrect Answer: ${item.correctAnswer}\n\n`;
    }).join("");

    const blob = new Blob([txtData], { type: "text/plain" });

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;

    a.click();

    window.URL.revokeObjectURL(url);
  };

  const handleFileNameChange = (event:any) => {
    setFileName(event.target.value);
  };

  return (
    <div className="rectangle-overlay">
        <div className="rectangle-content">
            <div>
                <label>Nazwa pliku:</label>
                <input
                    type="text"
                    value={fileName}
                    onChange={handleFileNameChange}
                />
            </div>
        <button onClick={saveDataToFile}>Zapisz do pliku</button>
        <button onClick={onClose}>Zamknij</button>
      </div>
    </div>
  );
};
