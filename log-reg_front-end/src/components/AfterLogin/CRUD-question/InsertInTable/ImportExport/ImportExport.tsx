import React, { useState } from "react";
import { ExportData } from "./ExportData";
import { ImportData } from "./ImportData";
import { InsertQuestion } from "../InsertQuestion/InsertQuestion";
import 'bootstrap/dist/css/bootstrap.css';

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
    <div className="container-sm">
      <div className="btn-group" role="group" aria-label="Import Export Button">
        <button className="btn btn-lg btn-primary" onClick={handleImportClick}>Import</button>
        <button className="btn btn-lg btn-secondary" onClick={handleExportClick}>Eksport</button>
        <button className="btn btn-lg btn-success" onClick={handleInsertClick}>Insert</button>
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
    </div>
  );
};
