import React from "react";

interface InsertQuestionProps {
    tableName: string | undefined;
}

export const InsertQuestion: React.FC<InsertQuestionProps> = ({  tableName  }) => {
    return (
        <>
            <p>
                User: {tableName}
            </p>
        </>
    )
}