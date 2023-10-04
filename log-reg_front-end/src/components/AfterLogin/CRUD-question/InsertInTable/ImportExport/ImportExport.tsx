import React, { useState } from "react";
import { ExportData } from "./ExportData";
import { ImportData } from "./ImportData";

interface ImportExportProps {
  tableName: string | undefined;
}

export const ImportExport: React.FC<ImportExportProps> = ({ tableName }) => {
  const [exportVisible, setExportVisible] = useState(false);
  const [importVisible, setImportVisible] = useState(false);

  const handleExportClick = () => {
    setExportVisible(true);
  };

  const handleImportClick = () => {
    setImportVisible(true);
  };

  return (
    <div className="export-import-panel">
      <div className="export-import-panel__menu">
        <button onClick={handleImportClick}>Import</button>
        <button onClick={handleExportClick}>Eksport</button>
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
    </div>
  );
};
