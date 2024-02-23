import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../InsertInTable/Input/Input";
import { EditFormProps } from "../../../Utils/Interfaces/EditFormProps";
import "./EditForm.css";

import axios from "axios";
import { EDIT_FORM } from "../../../Utils/links";

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
        `${EDIT_FORM}/${tableName}/${question.id}`,
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
    <div className="overlay">
      <div className="content--">
        <div className="container-sm">
          <div className="row">
            <div className="col-md-6">
              <form onSubmit={handleSubmit}>
                <Input
                  label="Question"
                  name="question"
                  value={formData.question}
                  onChange={handleChange}
                />
                <Input
                  label="Option A"
                  name="optionA"
                  value={formData.optionA}
                  onChange={handleChange}
                />
                <Input
                  label="Option B"
                  name="optionB"
                  value={formData.optionB}
                  onChange={handleChange}
                />
                <Input
                  label="Option C"
                  name="optionC"
                  value={formData.optionC}
                  onChange={handleChange}
                />

                <label className="col-md-6">
                  Correct answer:
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

                <button className="btn btn-primary" type="submit">
                  Change the question
                </button>
              </form>

              <button className="btn btn-danger" onClick={onClose}>
                Close
              </button>
            </div>
            <div className="col-md-6">
              <p className="h5">
                If you want to edit a question, feel free to make any changes
                you desire!
              </p>

              <p>Just remember to save all your changes!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
