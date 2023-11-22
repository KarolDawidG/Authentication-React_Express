import { QuestionsListProps } from "../../../Utils/Interfaces/QuestionListProps";

export interface QuestionTableProps {
    questionsList: QuestionsListProps[] | null;
    tableName: string | undefined;
  }