import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Input } from "../Input/Input";
import { ImportExportProps } from "../ImportExport/ImportExportProps";
import 'bootstrap/dist/css/bootstrap.css';

export const InsertQuestion: React.FC<ImportExportProps> = ({
  tableName,
  onClose,
}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    question: "",
    optionA: "",
    optionB: "",
    optionC: "",
    correctAnswer: "",
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
      await axios.post(`http://localhost:3001/create-question/${tableName}`, formData);

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
        <button className="btn btn-primary" type="submit">Dodaj pytanie</button>
      </form>

    <button className="btn btn-danger" onClick={onClose}>Zamknij</button>
      </div>
    </div>
  );
};
