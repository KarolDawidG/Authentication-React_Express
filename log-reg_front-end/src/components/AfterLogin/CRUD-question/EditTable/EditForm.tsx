import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../InsertInTable/Input/Input";
import { EditFormProps } from "../../../Utils/Interfaces/EditFormProps";

import axios from "axios";

export const EditForm: React.FC<EditFormProps> = ({
  question,
  onClose,  
  tableName,
}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    question: question.question,
    optionA: question.optionA,
    optionB: question.optionB,
    optionC: question.optionC,
    correctAnswer: question.correctAnswer,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.put(
        `http://localhost:3001/create-question/${tableName}/${question.id}`,
        formData,
      );

      setFormData({
        question: "",
        optionA: "",
        optionB: "",
        optionC: "",
        correctAnswer: "",
      });

      navigate(0);
    } catch (error) {
      console.error("Błąd podczas dodawania pytania:", error);
    }
  };

  return (
<>
    <div className="rectangle-overlay">
      <div className="rectangle-content">
        
        <form onSubmit={handleSubmit}>

          
            <Input
              label="Pytanie "
              name="question"
              value={formData.question}
              onChange={handleChange}
            />
            <Input
              label="Opcja A"
              name="optionA"
              value={formData.optionA}
              onChange={handleChange}
            />
            <Input
              label="Opcja B"
              name="optionB"
              value={formData.optionB}
              onChange={handleChange}
            />
            <Input
              label="Opcja C"
              name="optionC"
              value={formData.optionC}
              onChange={handleChange}
            />

            <label className="edit-question-label">
              {" "}
              Poprawna odpowiedź:
              {["A", "B", "C"].map((option) => (
                <span key={option}>
                  <input
                    type="radio"
                    name="correctAnswer"
                    value={option}
                    checked={formData.correctAnswer === option}
                    onChange={handleChange}
                    required
                  />{" "}
                  {option}
                </span>
              ))}
            </label>
            <button className="btn btn-primary" type="submit">Zmień pytanie</button>
          
        </form>

        <button className="btn btn-danger" onClick={onClose}>Zamknij</button>
      </div>
    </div>
</>

  );
};
