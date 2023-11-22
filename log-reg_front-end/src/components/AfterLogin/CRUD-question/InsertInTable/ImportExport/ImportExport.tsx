import React, { useState } from "react";
import { ExportDataTxt } from "./ExportDataTxt";
import { ExportDataPdf } from "./ExportDataPdf";
import { ImportData } from "./ImportData";
import { InsertQuestion } from "../InsertQuestion/InsertQuestion";
import "bootstrap/dist/css/bootstrap.css";
import { RedirectBtn } from "../../../../Others/RedirectBtn";

interface ImportExportProps {
  tableName: string | undefined;
}

export const ImportExport: React.FC<ImportExportProps> = ({ tableName }) => {
  const [exportVisible, setExportVisible] = useState(false);
  const [exportVisiblePdf, setExportVisiblePdf] = useState(false);
  const [importVisible, setImportVisible] = useState(false);
  const [insertVisible, setInsertVisible] = useState(false);

  const handleExportClick = () => {
    setExportVisible(true);
  };

  const handleExportClickPdf = () => {
    setExportVisiblePdf(true);
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
        <button
          className="btn btn-sm btn-outline-primary"
          onClick={handleImportClick}
        >
          Import
        </button>
        <button
          className="btn btn-sm btn-outline-secondary"
          onClick={handleExportClick}
        >
          Eksport Txt
        </button>
        <button
          className="btn btn-sm btn-outline-secondary"
          onClick={handleExportClickPdf}
        >
          Eksport Pdf
        </button>
        <button
          className="btn btn-sm btn-outline-success"
          onClick={handleInsertClick}
        >
          Insert
        </button>
      </div>
      {exportVisible && (
        <ExportDataTxt
          tableName={tableName}
          onClose={() => setExportVisible(false)}
        />
      )}
      {exportVisiblePdf && (
        <ExportDataPdf
          tableName={tableName}
          onClose={() => setExportVisiblePdf(false)}
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
