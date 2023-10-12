import React, { useState } from "react";
import axios from "axios";
import "./ImportExport.css";
import 'bootstrap/dist/css/bootstrap.css';
import { ImportExportProps } from "./ImportExportProps";
import { saveDataToFile } from "./helpers/saveDataToFile";

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
        <div className="container-sm">
          <div className="row">
            <div className="col-md-6">
              <label>Nazwa pliku:</label>
              <input type="text" value={fileName} onChange={handleFileNameChange} />
              <button className="btn btn-primary" onClick={fetchData}>Zapisz do pliku</button>
              <button className="btn btn-danger" onClick={onClose}>Zamknij</button>
            </div>
            
            <div className="col-md-6">
              <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, enim odit. Earum dicta, voluptate est amet laborum magni modi neque magnam, at deleniti, recusandae nisi eaque mollitia. Provident, nisi commodi.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
