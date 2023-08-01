import React, { useState } from 'react';
import axios from 'axios';
import { RedirectBtn } from '../../Others/RedirectBtn';
import { notify } from "../../Others/Notify";
import { INTERNET_DISCONNECTED , LINK_RESET} from '../../Utils/links';

interface FormState {
  email: string;

}

export const ResetEmail: React.FC = () => {
  const [formState, setFormState] = useState<FormState>({
    email: '',
  });
  const [link, setLink] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
    setLink(LINK_RESET);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const dataToSend = { ...formState, link };
      const response = await axios.post('http://localhost:3001/forgot', dataToSend);

      if (response.status === 200) {
        setFormState({ email: '' });
        setLink(''); 
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

  return (
    <>
      <div className="container">
          <div className="right-side">
            <form  onSubmit={handleSubmit}>
              <h1>Reset hasła</h1>
                  <label htmlFor="email">
                    Email
                  </label>
                      <input
                        type="email"
                        id="email"
                        placeholder="example@mail.com"
                        name="email"
                        value={formState.email}
                        onChange={handleChange}
                        required
                      /><br /><br />
                <input type="submit" className="login-form__submit" value="Send Message" />
            </form>
          </div>

          <div className="left-side">
                <div className="regist__buttons">
                  <RedirectBtn to="/">Menu</RedirectBtn>
                  <RedirectBtn to="/regist">Regist</RedirectBtn>
                </div>
          </div>
      </div>
    </>
  );
};
