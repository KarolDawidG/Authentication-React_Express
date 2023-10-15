import React, { useState } from "react";
import axios from "axios";
import { RedirectBtn } from "../../Others/RedirectBtn";
import { notify } from "../../Others/Notify";
import { ENDPOINT_EMAIL, LINK_RESET } from "../../Utils/links";
import { handleNetworkError } from "../Login/handlers/networkErrorFunctions";
import { NavBarMenu } from "../../NavBarMenu/NavBarMenu";
import "bootstrap/dist/css/bootstrap.css";
import "./ResetEmail.css";
import { Footer } from "../../AfterLogin/MainMenu/Footer/Footer";

interface FormState {
  email: string;
}

export const ResetEmail: React.FC = () => {
  const [formState, setFormState] = useState<FormState>({
    email: "",
  });
  const [link, setLink] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
    setLink(LINK_RESET);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const dataToSend = { ...formState, link };
      const response = await axios.post(ENDPOINT_EMAIL, dataToSend);

      if (response.status === 200) {
        setFormState({ email: "" });
        setLink("");
        notify(response.data);
      } else {
        notify(response.data.message);
      }
    } catch (error: any) {
      handleNetworkError(error);
    }
  };

  return (
    <>
      <NavBarMenu />
      <div className="container-sm center-content">
        <div className="row">
          <div className="col">
          <h1 className="display-4 animated-title">Zresetuj hasło</h1>
            <form className="form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="progress-bar bg-success" htmlFor="email">
                  Email:{" "}
                </label>
                <input
                  className="form-control"
                  type="email"
                  id="email"
                  placeholder="example@mail.com"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" className="btn btn-outline-danger">
                Wyślij e-mail!
              </button>
            </form>

            <RedirectBtn to="/">Menu</RedirectBtn>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};
