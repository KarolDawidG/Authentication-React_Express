import React, { useState } from "react";
import { DataToFile } from "./DataToFile";
import { LoadDataFromFile } from "./LoadDataFromFile";

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
        <DataToFile
            tableName={tableName}
            onClose={() => setExportVisible(false)}
        />
      )}
        {importVisible && (
        <LoadDataFromFile
            onClose={() => setImportVisible(false)}/>
    )}
    </div>
  );
};
