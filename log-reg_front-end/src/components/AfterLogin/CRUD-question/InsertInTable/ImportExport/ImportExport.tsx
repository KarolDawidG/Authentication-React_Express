import './ImportExport.css';

interface ImportExportProps {
    tableName: string | undefined;
  }

export const ImportExport: React.FC<ImportExportProps> = ({
    tableName,
  }) => {

    return(
    <div className="export-import-panel">
        <div className="export-import-panel__menu">
            <p>{tableName}</p>
            <button>Import</button>
            <button>Eksport</button>
        </div>
    </div>
    )
}