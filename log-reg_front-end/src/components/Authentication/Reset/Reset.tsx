import { useState } from "react";
import { ToastContainer } from 'react-toastify';
import { notify } from "../../Others/Notify";
import axios from "axios";
import { INTERNET_DISCONNECTED, reset } from "../../Utils/links";
import { RedirectBtn } from "../../Others/RedirectBtn";
import { backgroundColor, preventSpace, validateEmail } from "../../../components/Utils/FormsUtils/forms-utils";

export const Reset = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    const handleSubmit = async (e:any) => {
      e.preventDefault();
  
      try {
        const response = await axios.post(reset, {
            email,
            password,
          });
  
        if (response.status === 200) {
            notify(response.data);
        } else {
            notify(response.data);
        }
      } catch (error: any) {
        if (error.response) {
          notify(error.response.data.message);
        } else {
          notify(INTERNET_DISCONNECTED);
        }
      }
    };
  
    return (
       <>
        <div className="center-side">
            <h1 className="regist__title">Reset</h1>
        </div>
        <div className="container">
            <ToastContainer/> 
                <div className="right-side">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">Podaj adres email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            style={{ backgroundColor: validateEmail(email) ? "lightcoral" : "grey" }}
                            onChange={(e) => setEmail(e.target.value)}
                            onKeyDown={preventSpace}
                            required
                        /><br /><br />
            
                    <label htmlFor="password">Podaj nowe hasło:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            minLength={8}
                            style={{backgroundColor: `${backgroundColor(password.length, 8)}`}}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyDown={preventSpace}
                            required
                        /><br /><br />
            
                    <button className="login-form__submit" type="submit">Resetuj hasło</button>
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

