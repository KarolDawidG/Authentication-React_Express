import React, { useState } from "react";
import { LabelInput } from "../InsertInTable/Input/LabelInput";
import "./EditForm.css";
import { EditFormProps } from "./EditFormProps";
import axios from "axios";

export const EditForm: React.FC<EditFormProps> = ({question, onClose, tableName}) => {
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
      await axios.post(
        `http://localhost:3001/create-question/${tableName}`,
        formData,
      );
      setFormData({
        question: "",
        optionA: "",
        optionB: "",
        optionC: "",
        correctAnswer: "",
      });
    } catch (error) {
      console.error("Błąd podczas dodawania pytania:", error);
    }
  };

  return (
    <div className="edit-form">
      <div className="rectangle-overlay">
        <div className="rectangle-content">

          <form onSubmit={handleSubmit}>

            <LabelInput
              label="Pytanie"
              name="question"
              value={formData.question}
              onChange={handleChange}
              required
            />

            <LabelInput
              label="Opcja A"
              name="optionA"
              value={formData.optionA}
              onChange={handleChange}
              required
            />

            <LabelInput
              label="Opcja B"
              name="optionB"
              value={formData.optionB}
              onChange={handleChange}
              required
            />

            <LabelInput
              label="Opcja C"
              name="optionC"
              value={formData.optionC}
              onChange={handleChange}
              required
            />

            <label className="insert-question-label">
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
            <button type="submit">Zmień pytanie</button>
           
          </form>
          <button onClick={onClose}>Zamknij</button>
        </div>
      </div>
    </div>
  );
};

