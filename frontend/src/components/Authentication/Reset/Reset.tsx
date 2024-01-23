import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { notify } from "../../Others/Notify";
import axios from "axios";
import { ENDPOINT_RESET } from "../../Utils/links";
import { RedirectBtn } from "../../Others/RedirectBtn";
import { PasswordForm } from "./PasswordForm";
import { PasswordStatus } from "./PasswordStatus";
import { handleNetworkError } from "../../Utils/handlers/networkErrorFunctions";
import { NavBarMenu } from "../../NavBarMenu/NavBarMenu";
import "bootstrap/dist/css/bootstrap.css";
import { Footer } from "../../AfterLogin/MainMenu/Footer/Footer";

export const Reset = () => {
  const [password, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const { id, token } = useParams();
  const [passwordsMatch, setPasswordsMatch] = useState(false);
  const redirect = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${ENDPOINT_RESET}/${id}/${token}`, {
        password,
        password2,
      });

      if (response.status === 200) {
        notify("Password has been reset successfully.");
        setTimeout(() => redirect(`/`), 2000);
      }
    } catch (error: any) {
      handleNetworkError(error);
    }
  };

  useEffect(() => {
    const handleResetLink = async () => {
      try {
        const response = await axios.get(`${ENDPOINT_RESET}/${id}/${token}`);
        if (response.status !== 200) {
          notify(response.data.message);
        }
      } catch (error: any) {
        handleNetworkError(error);
      }
    };
    handleResetLink();
    setPasswordsMatch(password === password2);
  }, [id, token, password, password2]);

  return (
    <>
      <NavBarMenu />
      <div className="container-sm center-content">
        <h1 className="display-4 animated-title">Zresetuj hasło</h1>
        <div className="row">
          <form className="form" onSubmit={handleSubmit}>
            <PasswordForm
              password={password}
              setPassword={setPassword1}
              label="Hasło: "
            />
            <PasswordForm
              password={password2}
              setPassword={setPassword2}
              label="Powtórz hasło: "
            />
            <button
              className="btn btn-danger"
              type="submit"
              disabled={!passwordsMatch}
            >
              Resetuj hasło
            </button>
            <PasswordStatus
              password={password}
              password2={password2}
              passwordsMatch={passwordsMatch}
            />
          </form>
          <RedirectBtn to="/">Menu główne</RedirectBtn>
        </div>
      </div>
      <Footer />
    </>
  );
};
