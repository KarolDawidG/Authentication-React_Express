import React, { useState } from "react";
import {DataToFile} from "./DataToFile";

interface ImportExportProps {
  tableName: string | undefined;
}

export const ImportExport: React.FC<ImportExportProps> = ({
  tableName,
}) => {
  const [dataToFileVisible, setDataToFileVisible] = useState(false);

  const handleExportClick = () => {
    setDataToFileVisible(true);
  };

  return (
    <div className="export-import-panel">
      <div className="export-import-panel__menu">
        <button>Import</button>
        <button onClick={handleExportClick}>Eksport</button>
      </div>
      {dataToFileVisible && 
        <DataToFile tableName={tableName}
                    onClose={() => setDataToFileVisible(false)} 
        />} 
    </div>
  );
};
