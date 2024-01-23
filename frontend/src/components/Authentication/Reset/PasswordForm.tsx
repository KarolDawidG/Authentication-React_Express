import {
  backgroundColor,
  preventSpace,
} from "../../Utils/FormsUtils/forms-utils";
import "bootstrap/dist/css/bootstrap.css";

interface PassForm {
  password: string;
  setPassword: (password: string) => void;
  label: string;
}

export const PasswordForm = ({ password, setPassword, label }: PassForm) => {
  return (
    <>
      <label className="p-2 text-white" htmlFor="password">
        {label}
      </label>
      <input
        className="form-control"
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
