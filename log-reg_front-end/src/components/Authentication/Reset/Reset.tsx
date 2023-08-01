import { useState, useEffect } from "react";
import {  useParams } from "react-router-dom";
import { notify } from "../../Others/Notify";
import axios from "axios";
import { INTERNET_DISCONNECTED } from "../../Utils/links";
import { RedirectBtn } from "../../Others/RedirectBtn";
import { backgroundColor, preventSpace } from "../../../components/Utils/FormsUtils/forms-utils";


export const Reset = () => {
  const [password, setPassword] = useState("");
  const { id, token } = useParams();
  


  const handleResetLink = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/reset/${id}/${token}`);

      if (response.status === 200) {
        notify(response.data);
      } else {
        notify(response.data.message);
      }
    } catch (error:any) {
      notify(error.response.data);
    }
  };

    const handleSubmit = async (e:any) => {
      e.preventDefault();
  
      try {
        const response = await axios.post(`http://localhost:3001/reset/${id}/${token}`, {
          password,
        });
  
        if (response.status === 200) {
            notify(response.data);
        } else {
            notify(response.data.message);
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
      handleResetLink();
    }, []);

    return (
       <>
        <div className="center-side">
            <h1 className="regist__title">Reset</h1>
        </div>
        <div className="container">
                <div className="right-side">
                <form onSubmit={handleSubmit}>
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

