import React, { useState } from "react";
import axios from "axios";
import "./ImportExport.css";
import "bootstrap/dist/css/bootstrap.css";
import { ImportExportProps } from "./ImportExportProps";
import { saveDataToFilePdf } from "./helpers/saveDataToFilePdf";

export const ExportDataPdf: React.FC<ImportExportProps> = ({
  tableName,
  onClose,
}) => {
  const [fileName, setFileName] = useState("quiz.pdf");
  const [pdfData, setPdfData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/export/${tableName}`,
      );
      setPdfData(response.data.tableData);
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
                Generate PDF file
              </button>
            
              <button className="btn btn-danger" onClick={onClose}>
                Close
              </button>

              {pdfData && saveDataToFilePdf(pdfData, fileName)}
            </div>

            <div className="col-md-6">
              <p className="h5">
                PDF Creator
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
