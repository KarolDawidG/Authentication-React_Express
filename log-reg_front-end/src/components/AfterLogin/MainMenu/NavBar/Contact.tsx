import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./Contact.css";

interface Props {
  onClose: () => void;
}

export const Contack: React.FC<Props> = ({ onClose }) => {
  return (
    <div className="contact-overlay">
      <div className="content-contact">
        <div className="container-sm">
          <div className="row">
          <div className="col-md-6">
              <label htmlFor="exampleInput" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInput"
                placeholder="your name"
              ></input>

              <label htmlFor="exampleInput" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInput"
                placeholder="your email"
              ></input>

              <label htmlFor="exampleInput" className="form-label">
                Subject
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInput"
                placeholder="subject"
              ></input>

              <label htmlFor="exampleInput" className="form-label">
                Message
              </label>
              <textarea
                rows={3}
                className="form-control"
                id="exampleInput"
                placeholder="your message"
              ></textarea>

            <button className="btn btn-primary">Send</button>
            <button className="btn btn-danger" onClick={onClose}>Close</button>
          </div>

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
