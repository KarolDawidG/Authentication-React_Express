import { useState, useEffect } from "react";
import {  useParams, useNavigate } from "react-router-dom";
import { notify } from "../../Others/Notify";
import axios from "axios";
import { INTERNET_DISCONNECTED, ENDPOINT_RESET} from "../../Utils/links";
import { RedirectBtn } from "../../Others/RedirectBtn";
import { PasswordForm } from "./PasswordForm";
import { PasswordStatus } from "./PasswordStatus";


export const Reset = () => {
  const [password, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const { id, token } = useParams();
  const [passwordsMatch, setPasswordsMatch] = useState(false);
  const redirect = useNavigate();

    const handleSubmit = async (e:any) => {
      e.preventDefault();
  
      try {
        const response = await axios.post(`${ENDPOINT_RESET}/${id}/${token}`, {
          password,password2,
        });
  
        if (response.status === 200) {
          notify('Password has been reset successfully.');
          setTimeout(() => redirect(`/`), 2000);
      }
        
      } catch (error: any) {
        if (error) {
          notify(error.response.data);
        } else {
          notify(INTERNET_DISCONNECTED);
        }
      }
    };
  
  useEffect(() => {
    const handleResetLink = async () => {
      try {
        const response = await axios.get(`${ENDPOINT_RESET}/${id}/${token}`);

        if (response.status !== 200) {
          notify(response.data.message);
      }
      
      } catch (error:any) {
        notify(error.response.data);
      }
    };

    handleResetLink(); 

    setPasswordsMatch(password === password2);
  }, [id, token, password, password2]); 

    return (
       <>
        <div className="center-side">
            <h1 className="regist__title">Reset</h1>
        </div>
        <div className="container">
                <div className="right-side">
                <form onSubmit={handleSubmit}>
            <label htmlFor="password1">Podaj nowe hasło:</label>
                <PasswordForm
                  password={password}
                  setPassword={setPassword1}
                  label="Hasło:"
                />
                <PasswordForm
                  password={password2}
                  setPassword={setPassword2}
                  label="Powtórz hasło:"
                />
            <button
              className="login-form__submit"
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
                </div>
            <div className="left-side">
                <div className="regist__buttons">
                    <RedirectBtn to="/">Menu</RedirectBtn>
                    <RedirectBtn to="/login">Login</RedirectBtn>  
                </div>
            </div>
                
        </div>
       </>
    );
  };

