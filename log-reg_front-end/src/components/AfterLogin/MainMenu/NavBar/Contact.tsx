import "bootstrap/dist/css/bootstrap.css";
import axios  from "axios";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./Contact.css";
import { useState } from "react";
import { notify } from "../../../Others/Notify";
import { ContactProps } from "../../../Utils/Interfaces/ContactProps";
import { ENDPOINT_CONTACT } from "../../../Utils/links";
import { handleAxiosError } from "../../../Utils/handlers/axiosErrorHandler";

export const Contact: React.FC<ContactProps> = ({ onClose }) => {
  const [formState, setFormState] = useState<ContactProps>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.post(ENDPOINT_CONTACT, formState);
      notify('An E-mail has been sent!');
      setFormState({ name: '', email: '', subject: '', message: '' });
      onClose?.();
    } catch (error) {
      handleAxiosError(error);
    }
  };

  return (
    <div className="contact-overlay">
      <div className="content-contact">
        <div className="container-sm">
          <div className="row">
          <form className="col-md-6" onSubmit={handleSubmit}>

              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={formState.name}
                onChange={handleChange}
                placeholder="your name"
              
                required
              ></input>

              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={formState.email}
                onChange={handleChange}
                placeholder="your email"
                
                required
              ></input>

              <label htmlFor="subject" className="form-label">
                Subject
              </label>
              <input
                type="text"
                className="form-control"
                id="subject"
                name="subject"
                value={formState.subject}
                onChange={handleChange}
                placeholder="subject"
                
                required
              ></input>

              <label htmlFor="message" className="form-label">
                Message
              </label>
              <textarea
                rows={3}
                className="form-control"
                id="message"
                name="message"
                value={formState.message}
                onChange={handleChange}
                placeholder="your message"
                required
              ></textarea>

            <input type="submit" className="btn btn-primary" value="Send Message" />
            <button className="btn btn-danger" onClick={onClose}>Close</button>
          </form>

          <div className="col-md-6">
            <div className="mb-3">
              <div className="d-flex">
                <i className="bi bi-telephone-outbound-fill"></i>
                <p>Contact: +48 555 666 777</p>
              </div>
            
              <div className="d-flex">
                <i className="bi bi-envelope-fill"></i>
                <p>E-mail: examle@email.com</p>
              </div>

              <div className="d-flex">
                <i className="bi bi-browser-chrome"></i>
                <p>Website: https://github.com/KarolDawidG</p>
              </div>
            </div>
          </div>
        </div>
      </div>
        </div>
    </div>
  );
};

