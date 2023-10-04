import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LabelInput } from "../InsertInTable/Input/LabelInput";
import "./EditForm.css";
import { EditFormProps } from "./EditFormProps";
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
    <div className="rectangle-overlay">
      <div className="rectangle-content">
        <form onSubmit={handleSubmit}>
          <div className="label-input">
            <LabelInput
              label="Pytanie "
              name="question"
              value={formData.question}
              onChange={handleChange}
            />
            <LabelInput
              label="Opcja A"
              name="optionA"
              value={formData.optionA}
              onChange={handleChange}
            />
            <LabelInput
              label="Opcja B"
              name="optionB"
              value={formData.optionB}
              onChange={handleChange}
            />
            <LabelInput
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
            <button type="submit">Zmień pytanie</button>
          </div>
        </form>
        <button onClick={onClose}>Zamknij</button>
      </div>
    </div>
  );
};
