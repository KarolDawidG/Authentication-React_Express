import { Routes, Route } from "react-router-dom";
// import { NotFoundView } from './components/views/menu-views/NotFoundView'; todo
import { Menu } from "./Menu";
import { Login } from "./components/Authentication/Login/Login";
import { Regist } from "./components/Authentication/Register/Regist";
import { AdminPanel } from "./components/Authentication/Admin/AdminPanel";
import { Users } from "./components/UsersList/Users";
import { Reset } from "./components/Authentication/Reset/Reset";
import { BeLogin } from "./components/Authentication/Login/BeLogin";
import { CorrectLogin } from "./components/AfterLogin/CorrectLogin";
import { ToastContainer } from "react-toastify";
import { ResetEmail } from "./components/Authentication/Reset/ResetEmail";

// import LogRocket from 'logrocket';   todo

export const App = () => {
  return (
    <><ToastContainer limit={3} />
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/login" element={<Login />} />
        <Route path="/regist" element={<Regist />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/after-login" element={<CorrectLogin />} />
        <Route path="/users" element={<Users />} />
        <Route path="/reset/:id/:token" element={<Reset />} />
        <Route path="/reset-email" element={<ResetEmail/>} />
        <Route path="/be-login" element={<BeLogin/>} />
      </Routes>
    </>
  );
};
