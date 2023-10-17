import React, { useState } from "react";
import axios from "axios";
import "./ImportExport.css";
import "bootstrap/dist/css/bootstrap.css";
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
              <label>File name: </label>
              <input
                type="text"
                value={fileName}
                onChange={handleFileNameChange}
              />
              <button className="btn btn-primary" onClick={fetchData}>
                Save to file
              </button>
              <button className="btn btn-danger" onClick={onClose}>
                Close
              </button>
            </div>

            <div className="col-md-6">
              <p className="h5">
                All data will be saved in a txt file in the following format:
              </p>
              <p>
                Sample question
                <br />
                Answer A<br />
                Answer B<br />
                Answer C<br />
                A<br />
                <br />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
