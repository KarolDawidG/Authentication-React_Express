import React, { useState } from "react";
import { ExportData } from "./ExportData";
import { ImportData } from "./ImportData";
import { InsertQuestion } from "../InsertQuestion/InsertQuestion";

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
    <div className="export-import-panel">
      <div className="export-import-panel__menu">
        <button onClick={handleImportClick}>Import</button>
        <button onClick={handleExportClick}>Eksport</button>
        <button onClick={handleInsertClick}>Insert</button>
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
