import React, { useState } from "react";
import { ExportData } from "./ExportData";
import { ImportData } from "./ImportData";
import { InsertQuestion } from "../InsertQuestion/InsertQuestion";
import 'bootstrap/dist/css/bootstrap.css';
import { RedirectBtn } from "../../../../Others/RedirectBtn";

interface ImportExportProps {
  tableName: string | undefined;
}

export const ImportExport: React.FC<ImportExportProps> = ({ tableName }) => {
  const [exportVisible, setExportVisible] = useState(false);
  const [importVisible, setImportVisible] = useState(false);
  const [insertVisible, setInsertVisible] = useState(false);

  const handleExportClick = () => {
    setExportVisible(true);
  };

  const handleImportClick = () => {
    setImportVisible(true);
  };

  const handleInsertClick = () => {
    setInsertVisible(true);
  };

  return (
    <>
      <div className="btn-group" role="group" aria-label="Import Export Button">
        <RedirectBtn to="/crud-question?">Back</RedirectBtn>
        <button className="btn btn-lg btn-outline-primary" onClick={handleImportClick}>Import</button>
        <button className="btn btn-lg btn-outline-secondary" onClick={handleExportClick}>Eksport</button>
        <button className="btn btn-lg btn-outline-success" onClick={handleInsertClick}>Insert</button>
        
      </div>
      {exportVisible && (
        <ExportData
          tableName={tableName}
          onClose={() => setExportVisible(false)}
        />
      )}
      {importVisible && (
        <ImportData
          tableName={tableName}
          onClose={() => setImportVisible(false)}
        />
      )}
      {insertVisible && (
        <InsertQuestion
          tableName={tableName}
          onClose={() => setInsertVisible(false)}
        />
      )}
    </>
  );
};
