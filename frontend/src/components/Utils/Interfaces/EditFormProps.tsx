export interface EditFormProps {
  question: {
    id: string;
    question: string;
    optionA: string;
    optionB: string;
    optionC: string;
    correctAnswer: string;
  };
  onClose: () => void;
  tableName?: string;
}
