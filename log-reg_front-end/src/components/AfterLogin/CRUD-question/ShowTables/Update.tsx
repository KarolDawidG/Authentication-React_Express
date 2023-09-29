import React from "react";

interface UpdatingMessageProps {
    isUpdating: boolean;
    onClose: () => void;
    tableName: string;
}

export const Updating: React.FC<UpdatingMessageProps> = ({ isUpdating, onClose, tableName  }) => {
    const handleFinish = () => {
        onClose();
    };

    return (
        <div className="updating-box" style={{ display: isUpdating ? "block" : "none" }}>
            <p>Updating table: {tableName}</p>
            <button onClick={handleFinish}>Zakoncz</button>
        </div>
    );
};

