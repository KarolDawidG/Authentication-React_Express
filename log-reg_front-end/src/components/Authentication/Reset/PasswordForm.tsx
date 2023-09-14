import { backgroundColor, preventSpace } from "../../Utils/FormsUtils/forms-utils";
import "../../../css/styles.css";

interface PassForm {
  password: string;
  setPassword: (password: string) => void;
  label: string;
}

export const PasswordForm = ({ password, setPassword, label }: PassForm) => {

  return (
    <>
        <label htmlFor="password">{label}</label>
          <input
            className="login-form__input"
            type="password"
            id="password"
            value={password}
            minLength={8}
            style={{ backgroundColor: `${backgroundColor(password.length, 8)}` }}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={preventSpace}
            required
          />

    </>
  );
};
