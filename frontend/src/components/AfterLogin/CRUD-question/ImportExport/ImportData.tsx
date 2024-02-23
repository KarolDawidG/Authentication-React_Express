import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ImportExport.css";
import "bootstrap/dist/css/bootstrap.css";
import { ImportExportProps } from "./helpers/ImportExportProps";
import { notify } from "../../../Others/Notify";
import { IMPORT_DATA } from "../../../Utils/links";

export const ImportData: React.FC<ImportExportProps> = ({
  tableName,
  onClose,
}) => {
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
        notify("Invalid data format!");
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
      await axios.post(`${IMPORT_DATA}/${tableName}`, jsonData);
    } catch (error) {
      console.error("Error while adding a question: ", error);
    }
  };

  return (
    <div className="rectangle-overlay">
      <div className="rectangle-content">
        <div className="container-sm">
          <div className="row">
            <div className="col-md-6">
              <input
                type="file"
                accept=".txt"
                onChange={handleFileInputChange}
              />
              <button className="btn btn-primary" onClick={handleParseData}>
                Process the data
              </button>
              <button className="btn btn-danger" onClick={onClose}>
                Close
              </button>
            </div>
            <div className="col-md-6">
              <p className="h5">
                Data should follow the pattern:
                <br />
              </p>
              <p>
                Sample question
                <br />
                Answer A<br />
                Answer B<br />
                Answer C<br />
                A<br />
                <br />
                Next question
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
